// Verify the public HTTP contract, including pricing/crawlability regressions.
// Start the app first. Override GEO_TRIAL_CHARACTERS/GEO_TRIAL_DAYS when testing
// a server started with a different trial configuration.
import assert from 'node:assert/strict';

const base = process.env.GEO_BASE_URL || 'http://127.0.0.1:3015';
const trialCharacters = Number(process.env.GEO_TRIAL_CHARACTERS || 10000);
const trialDays = Number(process.env.GEO_TRIAL_DAYS || 7);
const requested = process.argv.slice(2);
const landingPaths = ['/free-text-to-speech', '/voice-cloning', '/ai-story-voiceover', '/ai-podcast-generator'];
const publicPaths = ['/', '/pricing', ...landingPaths, '/app', '/story', '/cloning', '/design', '/podcast', '/terms', '/privacy', '/cookies'];
const accountPaths = ['/auth/login', '/auth/resend-verification', '/forgot-password', '/reset-password', '/verify-email', '/profile'];
const paths = requested.length ? requested : [...publicPaths, ...accountPaths, '/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt'];
let failures = 0;

function decode(text) {
  return text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function visibleText(html) {
  return decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, decode(value)]));
}

function numericPattern(number) {
  return String(number).split('').join('[,\\s]?');
}

function checkTrial(answer) {
  assert.match(answer, new RegExp(`\\b${numericPattern(trialCharacters)}(?:[-\\s]+(?:free|speech-synthesis|synthesis|trial))?\\s+characters\\b`, 'i'), 'Trial answer must state the configured character allowance');
  assert.match(answer, new RegExp(`\\b${trialDays}(?:-day\\b|\\s+days?\\b)`, 'i'), 'Trial answer must state the configured expiry');
}

function textAtAnchor(html, id) {
  const match = html.match(new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)<\\/\\1>`, 'i'));
  assert.ok(match, `Missing public trial detail anchor: #${id}`);
  return visibleText(match[2]);
}

for (const path of paths) {
  try {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(45000) });
    const html = await response.text();
    assert.equal(response.status, 200, `HTTP ${response.status}`);

    if (publicPaths.includes(path) || accountPaths.includes(path)) {
      const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
      const text = visibleText(html);
      const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag));
      const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag));
      assert.ok(title.length > 0, 'Page needs a title');
      assert.doesNotMatch(title, /VoiceWove.*VoiceWove/, 'Brand suffix must not repeat');
      assert.equal(links.find(link => link.rel === 'canonical')?.href, `https://voicewove.com${path === '/' ? '' : path}`, 'Canonical must identify this page');
      if (accountPaths.includes(path)) {
        for (const name of ['robots', 'googlebot']) {
          assert.match(metas.find(meta => meta.name === name)?.content || '', /noindex/, `${name} must exclude account pages from indexing`);
        }
      } else {
        assert.doesNotMatch(metas.find(meta => meta.name === 'robots')?.content || '', /noindex/, 'Public pages must remain indexable');
        assert.doesNotMatch(text, /\{amount\}|\{days\}/, 'Trial placeholders must be resolved');
      }

      if (path === '/' || path === '/pricing') {
        checkTrial(`${textAtAnchor(html, 'trial-allowance')}. ${textAtAnchor(html, 'trial-duration')}`);
        checkTrial(textAtAnchor(html, 'trial-details'));
        assert.match(text, /10[,\s]?000 characters\s+\$\s*6(?:\.00)?\b/i, '$6 pack must display the 10,000 characters granted by billing');
        assert.doesNotMatch(text, /100K characters/i, 'Legacy tenfold pack claim must be removed');
      }
      if (path === '/voice-cloning') {
        assert.doesNotMatch(title, /free voice cloning/i, 'Title must distinguish cloning credits from the TTS trial');
        assert.match(text, /\$\s*3\b/, 'Cloning entry cost must be visible');
      }
      if (path === '/ai-story-voiceover' || path === '/ai-podcast-generator') {
        assert.match(text, /WAV/, 'Complete-track export format must be visible');
      }
      if (path === '/ai-podcast-generator') {
        assert.match(text, /twice|double|2\s*[×x]|2\s+times/i, 'Podcast page must disclose the full-episode character multiplier');
      }
      const schema = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(([, value]) => JSON.parse(value));
      if (landingPaths.includes(path)) {
        const faqs = schema.filter(item => item['@type'] === 'FAQPage');
        assert.equal(faqs.length, 1, 'Each landing page must publish one FAQPage matching its visible answers');
        assert.ok(faqs[0].mainEntity.length >= 8, 'Core decision questions must remain covered');
        const trial = faqs[0].mainEntity.find(question => /\btrial\b|\bfree\b/i.test(question.name));
        assert.ok(trial, 'A trial FAQ is required');
        checkTrial(trial.acceptedAnswer.text);
      }
      for (const item of schema.filter(item => item['@type'] === 'FAQPage')) {
        assert.ok(item.mainEntity.length >= 5, 'Decision pages need useful public answers');
        for (const question of item.mainEntity) {
          assert.ok(text.includes(question.name), `Structured question missing from visible text: ${question.name}`);
          assert.ok(text.includes(question.acceptedAnswer.text.replace(/\s+/g, ' ')), `Structured answer differs from visible text: ${question.name}`);
        }
      }
    } else if (path === '/robots.txt') {
      assert.match(html, /Disallow: \/api\//i);
      assert.doesNotMatch(html, /Disallow: \/(?:app|auth|forgot-password|reset-password|verify-email)/i, 'Search engines must be able to see account noindex and public tool pages');
    } else if (path === '/sitemap.xml') {
      for (const route of publicPaths) assert.ok(html.includes(`https://voicewove.com${route === '/' ? '<' : route + '<'}`), `Missing public canonical: ${route}`);
      for (const route of accountPaths) assert.ok(!html.includes(`https://voicewove.com${route}<`), `Account page in sitemap: ${route}`);
    } else if (path === '/llms.txt' || path === '/llms-full.txt') {
      assert.match(response.headers.get('content-type') || '', /text\/plain/);
      for (const route of ['/pricing', ...landingPaths]) assert.ok(html.includes(`https://voicewove.com${route}`), `Missing public source: ${route}`);
      assert.doesNotMatch(html, /John Doe|StripeM-Inner|client-side exception|\$59\.9\/year|1000 characters free/, 'AI-readable summaries must not retain obsolete claims');
      if (path === '/llms-full.txt') {
        checkTrial(html.match(/^- Trial: (.+)$/m)?.[1] || '');
        assert.match(html, /USD 6 for 10,000/, 'The summary must state the correct $6 pack allowance');
        assert.match(html, /Monthly subscription: USD 5\.99, 100,000 characters per month/);
        assert.match(html, /Annual subscription: USD 49\.90, 1,500,000 characters per year/);
        assert.match(html, /credits: USD 3 for 1/, 'The summary must distinguish paid voice credits');
        assert.match(html, /podcast generation uses 2 times/, 'The summary must disclose podcast batch billing');
      }
    } else {
      assert.fail(`No verification contract registered for ${path}`);
    }
    console.log(`PASS ${path}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${path}: ${error.message}`);
  }
}
console.log(`${paths.length - failures}/${paths.length} routes passed`);
if (failures) process.exitCode = 1;
