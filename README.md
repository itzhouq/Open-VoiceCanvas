# Open-VoiceWove

Open-VoiceWove 是基于 Next.js 14 构建的语音合成与克隆平台，提供文字转语音 (TTS)、语音克隆、语音设计，以及多角色故事和双人播客制作。具体输入格式、输出格式与额度规则见各功能页和价格页。

> 🌐 在线体验：**https://voicewove.com** · 作者：[itzhouq](https://itzhouq.cn) · X：[@itzhouq2026](https://x.com/itzhouq2026)

![Banner](public/images/og-image.png)

## 🌟 主要功能

### 🎙️ 核心语音服务
- **语音引擎**: 包含 OpenAI TTS、AWS Polly、MiniMax 的适配代码；网站当前开放的引擎、语言和声音以工具内的选择项为准。
- **多语言使用**: 在工具中选择可用语言和声音，先用短文本测试发音及效果。
- **语音克隆**: 上传音频样本即可快速克隆声音，打造个性化语音助手。
- **语音设计**: 自定义音色参数（语速、音调、音量等），创造独一无二的声音。

### 🎨 创意工坊
- **播客生成**: 自动生成多人对话形式的播客音频。
- **故事创作**: 智能生成配音故事，支持长文本处理。
- **实时预览**: 支持文本到语音的实时流式播放和音频可视化波形展示。

### 🛡️ 企业级特性
- **用户认证**: 完善的注册/登录系统，支持 GitHub、Google 第三方登录。
- **订阅支付**: 当前结账使用 Creem，支持按月/年订阅及一次性购买字符包、克隆/设计次数。
- **配额管理**: 精确的字符数和克隆声音数量配额控制。
- **国际化**: 原生支持多语言界面 (i18n)。

## 🛠️ 技术栈

### 前端
- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: TypeScript
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **组件库**: [shadcn/ui](https://ui.shadcn.com/), Radix UI
- **动画**: Framer Motion
- **状态管理**: React Hooks

### 后端 & 基础设施
- **数据库**: PostgreSQL (适配 Neon/Supabase)
- **ORM**: [Prisma](https://www.prisma.io/)
- **认证**: [NextAuth.js](https://next-auth.js.org/) (Auth.js)
- **支付**: Creem API（仓库保留部分旧支付适配代码）
- **邮件**: Resend
- **存储**: AWS S3 / Vercel Blob (用于音频存储)

### AI 服务集成
- **OpenAI**: TTS 模型
- **AWS**: Polly 服务
- **MiniMax**: 中文语音优化
- **DeepSeek / Qwen**: 文本处理与生成支持

## � 快速开始

### 环境要求
- Node.js 18+
- PostgreSQL 数据库
- 已启用服务的 API Keys（MiniMax、Creem 等）

### 1. 克隆项目
```bash
git clone https://github.com/itzhouq/Open-VoiceCanvas.git
cd Open-VoiceWove
```

### 2. 安装依赖
```bash
npm install
# 或者
yarn install
# 或者
pnpm install
```

### 3. 配置环境变量
复制 `.env.example` 文件为 `.env`，并填入你的 API 密钥和配置信息：

```bash
cp .env.example .env
```

关键配置项说明：
- `DATABASE_URL`: PostgreSQL 连接字符串
- `NEXTAUTH_SECRET`: NextAuth 加密密钥
- `OPENAI_API_KEY`: OpenAI 接口密钥
- `CREEM_API_KEY`: 当前支付服务的 API 密钥
- `AWS_ACCESS_KEY_ID`: AWS 访问密钥 (用于 Polly)

### 4. 数据库迁移
使用 Prisma 同步数据库结构：

```bash
npx prisma generate
npx prisma db push
```

### 5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## � 项目结构

```
Open-VoiceWove/
├── app/                 # Next.js App Router 页面与 API
│   ├── api/             # 后端 API 路由
│   ├── auth/            # 认证相关页面
│   ├── cloning/         # 语音克隆页面
│   ├── design/          # 语音设计页面
│   ├── podcast/         # 播客生成页面
│   └── ...
├── components/          # React 组件
│   ├── ui/              # 基础 UI 组件 (shadcn)
│   └── ...              # 业务组件
├── lib/                 # 工具函数与库配置
│   ├── i18n/            # 国际化配置
│   ├── prisma.ts        # 数据库客户端
│   └── ...
├── prisma/              # 数据库 Schema 与迁移
├── public/              # 静态资源
└── scripts/             # 维护与工具脚本
```

## � 脚本命令

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run start`: 运行生产版本
- `npm run lint`: 代码风格检查
- `npm run db:analyze`: 数据库分析脚本
- `npm run check:geo`: 对运行中的本地站点检查公开页面、试用与套餐事实、FAQ、索引和 AI 摘要；默认地址为 `http://127.0.0.1:3015`，可通过 `GEO_BASE_URL` 覆盖。

## 产品事实维护

- 公开套餐价格与发放数量由 `lib/product-catalog.ts` 维护，计费处理与页面共用同一套额度映射。
- `lib/trial-offer.ts` 读取 `TRIAL_TEMPORARY_QUOTA` 和 `TRIAL_DAYS`，页面与服务端试用权益使用同一配置。
- 文字转语音和克隆工具下载 MP3；故事与播客的整段合并输出为 WAV。
- 播客首次整段生成消耗确认对白字符数的两倍，单段编辑或重生成按该段字符数计算。
- 创建克隆/设计声音消耗独立次数；生成语音另计字符额度。具体声音使用限制与数据处理规则见网站条款、隐私政策及工具提示。
- `/llms.txt` 和 `/llms-full.txt` 由路由生成，不应重新放入过期的静态页面快照。

## 🤝 贡献

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

[MIT](LICENSE) © itzhouq · 基于 [ItusiAI/Open-VoiceCanvas](https://github.com/ItusiAI/Open-VoiceCanvas) (MIT) 二次开发
