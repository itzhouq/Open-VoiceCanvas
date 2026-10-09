import { PollyClient } from "@aws-sdk/client-polly";

// AWS Polly 配置（仅限服务端使用）
// 注意：凭据不得使用 NEXT_PUBLIC_ 前缀，否则会被打包进浏览器端代码造成泄漏
export const pollyClient = new PollyClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});
