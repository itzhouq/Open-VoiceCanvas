# VoiceWove Clarity 行为分析 · 首次导出（2026-10-26）

> 窗口：近 3 天（numOfDays=3）｜4 发配额全用（overall/by-url/by-source/by-url-device）
> 原始 JSON + 本报告同目录入库。token 已存 `~/.keys/clarity-export-tokens.env`（VOICEWOVE）。

## TL;DR

**修复后的验证漏斗开始工作了，且零 UX 摩擦信号：**

1. **3 条 `verify-email?token=` 会话** = 三个验证链接被真实点击——醒目弹窗 → 邮件 → 点击的引导闭环在跑
2. **`/app?welcome=1` 会话出现** = 新 onboarding 直通流程被走到
3. **死点击 0 / 愤怒点击 0 / 错误点击 0**——昨天修的流程没有产生新摩擦
4. 来源里出现 **wx.mail.qq.com**（QQ 邮箱内点击）——用户从邮件回流的第一手证据

## 总体（近 3 天，扣除机器人）

| 指标 | 值 | 判读 |
|---|---|---|
| 会话 | 16（另有 18 bot 全部来自 Vercel preview URL） | 人效干净 |
| 独立用户 | 14 | — |
| 页/会话 | 3.19 | 浏览深度尚可 |
| 平均滚动深度 | 51.4% | — |
| 死点击 / 愤怒点击 / 错误点击 | **0 / 0 / 0** | ✅ 无 UX 痛点信号 |
| 快速回退 | 1 会话 6 次 | 单点，观察 |
| 参与时长 | total 339s / active 39s（11.5%） | 偏低——多数会话是浏览后离开（新站正常） |

## 行为路径亮点

- `verify-email?token=` ×3 会话（活跃 1-8s，快速通过）——验证链接点击即走，符合预期
- `/app?welcome=1` ×1（6s 活跃）——新用户直通流被触发
- `/cloning` 活跃 67s（全站最长单页）——用户真的在工具里操作
- `/profile` 滚动 92% + 42s——个人中心有内容被看
- bot-only 全部是 Vercel preview 域名（18 会话）——见下方待办

## 来源

direct 12 · 站内 3 · **wx.mail.qq.com 1**（邮件回流）· google 1 · v2ex 2

## 建议 / 待办

1. **Vercel preview 污染根治**（skill 红线）：前端 Clarity 脚本加 hostname 校验（与 NEXT_PUBLIC_SITE_URL 比对），preview 构建不再上报——18 个 bot 会话全是它贡献的
2. 每天跑一次增量（4 发），攒时间序列；重点盯 verify-email 会话量（= 验证弹窗→邮件点击的转化代理指标）
3. 样本量仍小（16 会话），不下转化结论；GSC（定量）+ Clarity（定性）双通道持续积累
