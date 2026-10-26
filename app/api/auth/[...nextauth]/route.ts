import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, getUserByEmail } from "@/lib/db";
import { notifyFeishu } from "@/lib/feishu-notify";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("请输入邮箱和密码");
        }

        const user = await getUserByEmail(credentials.email);
        if (!user) {
          throw new Error("用户不存在");
        }

        if (!user.password) {
          throw new Error("请使用社交账号登录");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("密码错误");
        }

        // 未验证用户要求先验证邮箱（注册后由前端弹醒目验证引导弹窗）
        if (!user.emailVerified && user.status !== 'active') {
          throw new Error('EMAIL_NOT_VERIFIED');
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    }),
    // OAuth provider 仅在配置了凭据时注册，避免空凭据导致登录跳回
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })]
      : []),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      
      try {
        // 检查用户是否存在
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          // 创建新用户
          const newUser = await createUser({
            email: user.email,
            name: user.name || '',
            image: user.image || '',
            provider: account?.provider,
            providerId: account?.providerAccountId,
          });
          // 关键事件 → 飞书：新用户注册
          notifyFeishu({
            title: '🎉 VoiceWove 新用户注册',
            level: 'info',
            desc: `OAuth 登录并自动注册（${account?.provider ?? 'unknown'}）`,
            fields: [
              { label: '邮箱', value: user.email ?? '—' },
              { label: '昵称', value: user.name || '—' },
            ],
          }).catch(() => {});
          return true;
        }
        
        return true;
      } catch (error) {
        console.error('Error during OAuth sign in:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 如果是相对路径，添加 baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // 如果是同一域名下的 URL，允许重定向
      else if (url.startsWith(baseUrl)) {
        return url;
      }
      // 默认重定向到工具台（onboarding 直通）
      return `${baseUrl}/app`;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST }; 