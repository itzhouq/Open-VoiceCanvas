import { NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createVerificationTokenAndSendEmail } from '@/lib/verification';
import { sendUserRegistrationNotification } from '@/lib/discord-service';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    console.log('开始处理注册请求...');
    const body = await req.json();
    console.log('请求体:', { ...body, password: '***' });
    
    const { email, password, name } = registerSchema.parse(body);
    console.log('数据验证通过');

    // 检查邮箱是否已存在
    console.log('检查邮箱是否存在:', email);
    const existingUser = await getUserByEmail(email);
    console.log('现有用户检查结果:', existingUser);
    
    if (existingUser) {
      console.log('邮箱已被注册');
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 密码加密
    console.log('开始密码加密');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('密码加密完成');

    // 创建用户
    console.log('开始创建用户...');
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
    });
    console.log('用户创建结果:', user);

    if (!user) {
      throw new Error('用户创建失败');
    }

    // 邮件验证开关：EMAIL_VERIFICATION_ENABLED=true 时走验证邮件流程；
    // 未开启（如 Resend 域名未验证期间）直接激活账号，避免注册漏斗死胡同
    let emailSent = false;
    if (process.env.EMAIL_VERIFICATION_ENABLED === 'true') {
      try {
        console.log('创建验证令牌并发送验证邮件...');
        await createVerificationTokenAndSendEmail(user.id, email, name);
        emailSent = true;
        console.log('验证邮件发送成功');
      } catch (emailError) {
        console.error('发送验证邮件失败:', emailError);
      }
    } else {
      try {
        await prisma.users.update({
          where: { id: user.id },
          data: { status: 'active', emailVerified: new Date() },
        });
        console.log('邮件验证未开启，账号已直接激活');
      } catch (activateError) {
        console.error('直接激活失败:', activateError);
      }
    }

    // 验证用户是否真的创建成功
    const createdUser = await getUserByEmail(email);
    if (!createdUser) {
      throw new Error('用户创建后无法查询到');
    }

    // 发送Discord通知
    try {
      console.log('发送Discord注册通知...用户数据:', {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      });
      
      await sendUserRegistrationNotification({
        id: user.id,
        name: user.name || undefined,
        email: user.email,
        image: user.image
      });
      console.log('Discord注册通知发送成功');
    } catch (discordError) {
      console.error('发送Discord注册通知失败:', discordError);
      // 即使Discord通知失败，不影响注册流程
    }

    return NextResponse.json(
      {
        message: emailSent
          ? '注册成功，请查收验证邮件激活账户'
          : '注册成功，账号已激活，请直接登录',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        redirect: emailSent
          ? '/auth/login?registered=true&verification=email'
          : '/auth/login?registered=true'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('注册错误:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '输入数据验证失败', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
} 