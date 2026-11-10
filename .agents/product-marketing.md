# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-11-10

## Current factual baseline

Public prices and entitlement maps now live in `lib/product-catalog.ts`. Trial allowance and duration come from `lib/trial-offer.ts`, shared with the server quota logic; environment values can override the defaults. Marketing pages and generated `/llms-full.txt` must use these sources instead of copying numbers from old material.

Text-to-speech and cloning-workspace speech download as MP3; combined story and podcast audio downloads as WAV. Initial full-episode podcast generation consumes twice the confirmed dialogue character count; individual segment edits/regeneration use the segment count once. Clone/design credits are consumed when a voice is created, not reusable voice slots. The trial does not include a free clone/design credit under current account defaults.

Do not claim fixed language/voice counts without testing the enabled tools. Do not promise unrestricted commercial use or complete provider-side deletion: the cloning tool currently restricts cloned voices to personal, non-commercial use, and removing an account voice record does not prove erasure of all samples, provider models and backups. Refer to the Terms, tool restrictions and Privacy Policy.

Account counts, launch goals and payment-test results recorded below are historical launch context from October 2026, not current production verification. Current AI citation/mention rates have not been measured. Named competitor comparisons require current sources and a dated task-based test.

## Product Overview
**One-liner:** Browser-based text-to-speech, multi-character story narration, two-host podcasts and voice cloning for creators.
**What it does:** VoiceWove lets users prepare a script, select available voices, generate audio and download it. The story workflow supports separate narrator/character assignments; the podcast workflow supports editable host-and-guest dialogue from a topic or pasted text. Clone only an owned or authorized voice, with the recording requirements and usage restrictions shown in the tool.
**Product category:** AI Text-to-Speech / Voice AI (searched as "ai text to speech", "voice cloning online", "ai story voiceover")
**Product type:** SaaS (web app, no install; browser-only)
**Business model:** Account-based synthesis trial; monthly/annual subscriptions; one-time character packs and separate clone/design credits. Payments by Creem. Use the shared product configuration for current figures. Characters are not words or minutes of audio, and each workflow's quota rules must be stated.

## Target Audience
**Target companies:** Solo creators and small content teams; no company-size constraints (self-serve).
**Decision-makers:** The creator themselves (YouTuber, podcaster, indie author, educator, indie developer).
**Primary use case:** Produce natural multi-voice narration/audio without recording equipment or voice actors.
**Jobs to be done:**
- "Turn my written story into an audio drama with distinct voices, fast"
- "Narrate my videos/audiobook without using my own voice or hiring anyone"
- "Reuse my voice (or content) across languages I don't speak"
**Use cases:**
- YouTube story narration / Reddit-style dramas with a full cast
- Audiobook & e-learning narration; study notes to audio
- AI podcast episodes from topics or documents (NotebookLM-style, but controllable & exportable)
- Video dubbing and multilingual content repurposing

## Personas
B2C/self-serve — single decision-maker per purchase. See Target Audience.

## Problems & Pain Points
**Core problem:** Professional multi-voice audio is expensive and slow; free TTS tools sound robotic, cap length, and watermark output.
**Why alternatives fall short:**
- Document-to-podcast alternatives: compare current voice controls, input formats, exports and permissions using official sources and the same task; do not infer limitations from old comparisons
- Single-voice TTS: one narrator can't perform dialogue; robotic delivery
- Recording yourself: needs equipment, editing time, and confidence; no cross-language reach
- Hiring voice actors: $100s per project, days of turnaround, re-records on every edit
**What it costs them:** Hours of recording/editing per video; $50–$300 per voice-actor project; stalled channels and unfinished audiobook drafts.
**Emotional tension:** "My content is good but it sounds amateur" — embarrassment publishing with a bad voice, or fear of using their own voice on camera.

## Competitive Landscape
**Direct candidates to research:** ElevenLabs, Murf, Play.ht and Speechify. Do not claim superiority or missing capabilities without current evidence.
**Secondary candidates to research:** NotebookLM and script-generation assistants. Compare the specific task, voice controls, input/output formats, prices and permissions with a verification date.
**Indirect:** Manual recording + Audition/Descript — full control but heavy time and skill cost.
**Our angle to evaluate:** controllable multi-character workflow and one-time usage packs alongside subscriptions, with clear formats and usage conditions.

## Differentiation
**Key differentiators:**
- Multi-character voiceover as a first-class workflow (not a bolt-on)
- Test a cloned voice on a short passage in the selected target language before a longer project
- One-time packs that never expire (no forced subscription)
- Real free trial (10,000 chars, no card) with the same engine as paid tiers
- State the usage restrictions for the selected voice; payment buys quota, not rights to third-party voices or scripts
**How it works:** Story-first UX: paste script → assign voices per character → combined WAV export. Check each tool's available voices and formats separately.
**Why it helps:** Creators can revise a script and its voices in one workflow; speed and quality require measured examples, not blanket promises.
**Why customers choose us:** Price-to-features for solo creators; trial generosity; instant multi-voice capability.

## Objections
| Objection | Response |
|-----------|----------|
| "AI voices sound robotic" | Neural voices with natural intonation — try the free 10K-char trial on your own script before paying |
| "Is voice cloning legal/safe?" | Only clone voices you own or are authorized to use; follow the tool restrictions and Terms; ask support about the scope of a data-deletion request |
| "Why not just use (free tool X)?" | Free tools cap length, watermark output, and give you one robotic voice; the trial uses the full engine, no watermark |
| "What happens to my recording?" | Explain the processors and retention rules in the Privacy Policy; account-list deletion is not a guarantee of immediate provider-model erasure |

**Anti-persona:** Enterprises needing SSO/compliance pipelines; users wanting to clone celebrities or impersonate people (strictly prohibited, enforced).

## Switching Dynamics
**Push:** Robotic free tools; expensive voice actors; editing grind; one-voice limitation.
**Pull:** Narrator/character voice assignment, an account-based synthesis trial, and one-time usage packs. Test the selected voice and language before a longer project.
**Habit:** Sticking with free TTS bookmarks or manual recording workflows.
**Anxiety:** "Will it sound natural on MY script?"; payment trust on a new site (mitigated: Creem MoR, visible pricing, free trial first).

## Customer Language
**How they describe the problem:**
- "my tts sounds like a robot"
- "i need different voices for each character"
- "don't want to use my own voice on youtube"
- "how do i make an audiobook without recording"
**How they describe us:**
- "ai story voiceover" / "voice cloning online" / "free text to speech" / "ai podcast generator"
**Words to use:** voice(s), narration, story, characters, clone, natural, MP3, export, free trial
**Words to avoid:** enterprise, platform-grade (jargon-y), "revolutionary", "cutting-edge" (empty)
**Glossary:**
| Term | Meaning |
|------|---------|
| Character pack | One-time purchase of synthesis characters (never expires) |
| Clone/design credit | A credit consumed when a voice is created; deleting a saved voice does not restore it |
| Story voiceover | Multi-character narration of a script |

## Brand Voice
| Attribute | Means | Doesn't mean | Example line |
|-----------|-------|--------------|--------------|
| Creator-first | Talk to solo creators as peers | Corporate enterprise-speak | "Hear your story come alive" |
| Concrete | Real numbers, real workflows | Vague superlatives | "10,000 free characters, no credit card" |
| Honest | Show trial/pricing plainly; failures shared publicly | Hype or fake urgency | "Start free — the trial uses the full engine" |
| Lightweight | Fast, browser-based, zero-install | Feature-dump docs | "No microphone, no editing software" |

**Tone by context:**
- Support: plain, fast, personal (founder answers)
- Launch: build-in-public narrative, data included
- Errors: state what happened, what to do, no blame
- Sales: benefit + concrete proof, no pressure
- Social: first-person indie-hacker voice, progress public
**Terms to use:** story voiceover, multi-character voiceover, clone/design credits
**Never use:** "unlimited" (we meter), "free forever" (trial model), celebrity-name cloning references

## Proof Points
**Historical launch records (October 2026):** A real $3 payment/refund lifecycle was recorded as verified, along with Google brand verification and Creem KYC approval. These are historical records, not current production checks. Fixed voice/language counts have been removed pending tool-specific verification.
**Customers:** Early — production account base is new (sprint started 2026-10-16).
**Testimonials:** To be collected (template testimonials removed for compliance — do not invent).
**Value themes:**
| Theme | Proof |
|-------|-------|
| Instant multi-voice | Story tool assigns voices per character, single export |
| Generous free tier | 10,000 chars / 7 days, no card |
| Output and permissions | MP3 from TTS/cloning, combined WAV from stories/podcasts; follow the rights and restrictions for the selected voice |
| Trust | Real KYC'd payments via Creem MoR; public privacy/terms |

## Goals
**Business goal:** Validate indie SaaS revenue; 100 registered users in first 30 days (started 2026-10-16), then first non-founder paying customer.
**Conversion action:** Register → free trial (10,000 chars) → first paid pack/subscription.
**Current metrics:** 1 user (founder, live-verified account); payment rails live; 4 SEO landing pages indexed-in-progress; Clarity + CF Web Analytics installed.

## Paid Ads (optional)
Not currently running ads. Skip until organic signal exists.

## Learnings
*Decisions and tested lessons. Newest first.*
| Date | Learning | Evidence | Applies to | Status |
|------|----------|----------|------------|--------|
| 2026-10-15 | Real $3 payment + refund via Creem verified end-to-end (grant & clawback) | DB rows: payment paid→refunded, clones +1→0 | Trust copy; support runbook | active |
| 2026-10-15 | Fake template testimonials get KYC rejected — never reinstate without attributable customers | Creem review rejection + pass after removal | Landing pages, all marketing | active |
| 2026-10-15 | Free-text-to-speech / story-voiceover angle outperforms generic "TTS platform" framing for SEO | WordScout KD 5–7 on long-tails vs high KD head terms | Landing pages, content | watch |

## Changelog
*Newest first. One line per revision: what changed and why.*
- v2 (2026-11-10) — Aligned quota sources, output formats, podcast billing and consumed voice credits; removed unsupported competitor and permission claims. Historical launch measurements are not current verification.
- v1 (2026-10-18) — Initial context. Drafted from codebase + launch data (fork→live in 5 days; pricing, competitors, brand voice, 30-day goal).
