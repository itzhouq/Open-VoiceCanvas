import { createId } from '@paralleldrive/cuid2';
import { PrismaClient } from '@prisma/client';

// 统一走 Prisma（本地 TCP Postgres 与 Neon 均可连接）
// 注：上游曾用 Neon serverless HTTP 驱动做裸 SQL，本地开发环境不可用
const prisma = new PrismaClient();

export async function query(query: string, values: any[] = []) {
  // 兼容保留：裸 SQL 查询入口已不再使用 Neon HTTP 驱动
  try {
    const result = await prisma.$queryRawUnsafe(query, ...values);
    return Array.isArray(result) ? result : [result];
  } catch (error: any) {
    console.error('数据库查询错误:', error);
    throw error;
  }
}

// 用户相关的数据库操作
export async function createUser(data: {
  email: string;
  password?: string;
  name?: string;
  image?: string;
  provider?: string;
  providerId?: string;
}) {
  try {
    console.log('开始创建用户...');
    console.log('用户数据:', { ...data, password: data.password ? '***' : undefined });

    const { email, password, name, image, provider, providerId } = data;
    const id = createId();

    // 先检查用户是否已存在
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log('用户已存在:', existingUser);
      return existingUser;
    }

    // 判断是否是社交登录
    const isOAuthLogin = !!provider && !!providerId;

    // 使用 Prisma 创建用户
    // 社交登录的用户直接验证邮箱，密码注册的用户需要验证
    const user = await prisma.users.create({
      data: {
        id,
        email,
        password,
        name: name || null,
        image: image || null,
        provider,
        provider_id: providerId,
        emailVerified: isOAuthLogin ? new Date() : null,
        status: isOAuthLogin ? 'active' : 'pending'
      }
    });

    console.log('用户创建成功，返回数据:', user);
    return user;
  } catch (error: any) {
    console.error('创建用户失败:', error);
    // 如果是唯一约束冲突，返回特定错误
    if (error.message?.includes('unique constraint') || error.code === '23505') {
      throw new Error('该邮箱已被注册');
    }
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    console.log('通过邮箱查询用户:', email);
    const user = await prisma.users.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('查询用户失败:', error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error('查询用户失败:', error);
    throw error;
  }
}

// 更新用户的字符配额
export async function updateCharacterQuota(userId: string, usedCharacters: number) {
  try {
    console.log('更新用户字符配额:', { userId, usedCharacters });

    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { characterQuota: true }
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    if (!user.characterQuota) {
      await prisma.characterQuota.create({
        data: {
          userId: userId,
          permanentQuota: 0,
          temporaryQuota: 0,
          usedCharacters: usedCharacters,
          lastUpdated: new Date()
        }
      });
    } else {
      const newUsedCharacters = user.characterQuota.usedCharacters + usedCharacters;

      await prisma.characterQuota.update({
        where: { userId: userId },
        data: {
          usedCharacters: newUsedCharacters,
          lastUpdated: new Date()
        }
      });
    }

    await prisma.users.update({
      where: { id: userId },
      data: {
        lastUsedAt: new Date()
      }
    });

    console.log('字符配额更新成功');
    return true;
  } catch (error) {
    console.error('更新字符配额失败:', error);
    throw error;
  }
}
