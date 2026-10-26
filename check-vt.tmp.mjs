import { Client } from '@neondatabase/serverless';
const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_f0GdBTYQ9gjc@ep-falling-surf-atr7ubqw-pooler.c-9.us-east-1.aws.neon.tech/neondb' });
await client.connect();
const t = await client.query(`SELECT identifier, expires FROM "VerificationToken" WHERE identifier='onboarding-test-1026@voicewove.com'`);
console.log('VerificationToken:', t.rows.length, '条', t.rows[0] ? '| 过期: ' + t.rows[0].expires : '');
await client.end();
