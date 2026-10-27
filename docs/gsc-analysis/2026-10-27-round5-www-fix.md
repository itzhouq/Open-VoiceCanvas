# VoiceWove GSC 第 5 轮 · 收录闸门打开 + www 重复内容修复（2026-10-27）

> 窗口：10-01 → 10-26｜对比第 4 轮（10-23，数据至 10-22）｜API 导出 api-export-2026-10-27/

## TL;DR

**收录闸门打开——数据量级跃迁 + 挖出并修复了一个从未被发现的 www 重复内容问题。**

1. **日曝光 10 倍跃迁**：10-24 起日均 125（此前 10-30）——canonical 修复（10-18）+ 内容强化（10-20）+ 持续 sitemap 信号的累积效应，Google 在 10-23/24 前后对全站做了大规模收录
2. **查询池 21 → 160 词（7.6 倍）**，页面表 5 → 17 行——**全站 13+ 页面进入搜索视野**
3. **www 重复内容根除**：www.voicewove.com 一直返回 200（独立服务旧内容）而非 301——已改为 308 永久重定向到裸域，域名也终于正确挂到项目（顺带修掉了「每次部署都要手动 alias」的隐患）

## 页面全景（曝光降序）

| 页面 | 曝光 | 排名 | 判读 |
|---|---|---|---|
| /app | **144** | 78.4 | 新曝光王——工具主入口被大量词命中 |
| /podcast | **105** | 70.5 | podcast 簇持续扩张 |
| /voice-cloning | 31 | **77.7** | 内容强化后稳定在 77（强化前 82），待外链助推 |
| /（裸域） | 24 | 3.8 | 品牌词稳定 |
| /story | 14 | 71.1 | 新收录 |
| /ai-story-voiceover | 13 | **20.9** | 第 2 页边缘，随时可进首页 |
| /free-text-to-speech | 13 | 79.7 | 新收录 |
| /design | 7 | 62.0 | 排名第二好的工具页 |
| /cloning | 1 | 15.0 | 排名最好的工具页 |

⚠️ **www.voicewove.com 变体行占曝光约 15%**（voice-cloning 26 / cloning 14 / story 6 …）——已修复（308），预期未来几轮 www 行衰减归零、裸域曝光承接。

## 查询池（160 词）

- 头部：voice cloning（26 曝光/排名 90——仍是最大簇但没继续爬，需外链助推）
- podcast 簇全面开花：ai generated 9 / generative 8 / podcast ai 8 / artificial intelligence 7 / podcast about ai 4 …
- **TTS 簇新入场**：text to voice software 5 / text to speech software 4 / text to speech app 3 / apps 3——/free-text-to-speech 的新词源
- **非英语 13 词**：俄语 ×3 / 日语 / 阿拉伯语 ×2 / 捷克语 / 波斯语 / 中文「ai 播客」×2 等——40+ 语言卖点全球泛化
- 有点击的词仍只有 1（voice clone）——排名 65-105 区间点击为零是爬坡期正常形态

## 本轮修复：www 重复内容（隐藏 16 天）

排查 www 变体行时发现：`www.voicewove.com` 一直返回 **200**（独立服务旧内容）——不是 301。深挖发现 Vercel 上域名从未正确挂到 `voicewove` 项目：裸域是靠每次部署手动 `vercel alias set` 钉住的，www 由「域名同名占位项目」时代的绑定服务着旧内容。

修复（Vercel API）：
- `voicewove.com` → 正式挂到 `voicewove` 项目（此后每次 `vercel --prod` 自动获得域名，**手动 alias 时代结束**）
- `www.voicewove.com` → 挂为项目 redirect 域名（308 → 裸域），已验证全路径生效

## 下轮（10-31）重点

1. www 行是否如期衰减归零（重复内容修复的验证信号）
2. /voice-cloning 是否借外链突破 70
3. /ai-story-voiceover 能否从 20.9 进首页
4. /app 144 曝光背后的词簇构成（新曝光王的内容策略价值）
