/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);
const { GET } = require('../src/app/api/cms/status/route.ts');
for (const key of ['CMS_AUTH_SECRET', 'CMS_DINGTALK_APP_KEY', 'CMS_DINGTALK_APP_SECRET', 'CMS_DINGTALK_CORP_ID', 'CMS_GITHUB_TOKEN']) process.env[key] = 'fake-test-value';
let now = 0;
const originalNow = Date.now;
Date.now = () => now;
let calls = 0;
let finish;
global.fetch = async (_url, options) => {
  calls++;
  assert.equal(options.headers.Authorization, `Bearer ${process.env.CMS_GITHUB_TOKEN}`);
  assert.equal(options.redirect, 'error');
  assert.ok(options.signal instanceof AbortSignal);
  return new Promise((resolve, reject) => { finish = value => value instanceof Error ? reject(value) : resolve(new Response('', { status: value })); });
};
async function expectStatus(response, expected) {
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { components: [{ name: 'Git Gateway', status: expected }] });
}
(async () => {
  const first = Array.from({ length: 30 }, () => GET());
  assert.equal(calls, 1);
  now = 120_000; // Even a slow in-flight probe is shared, not duplicated.
  first.push(GET());
  assert.equal(calls, 1);
  finish(200);
  for (const response of await Promise.all(first)) await expectStatus(response, 'operational');
  await expectStatus(await GET(), 'operational');
  assert.equal(calls, 1);
  now += 60_000;
  const failures = Array.from({ length: 30 }, () => GET());
  assert.equal(calls, 2);
  finish(new Error('provider error with secret detail'));
  for (const response of await Promise.all(failures)) await expectStatus(response, 'major_outage');
  await expectStatus(await GET(), 'major_outage');
  assert.equal(calls, 2);
  now += 60_000;
  const rejected = GET();
  finish(403);
  await expectStatus(await rejected, 'major_outage');
  await expectStatus(await GET(), 'major_outage');
  assert.equal(calls, 3);
  process.env.CMS_GITHUB_TOKEN = 'rotated-test-token';
  const rotated = GET();
  assert.equal(calls, 4);
  finish(200);
  await expectStatus(await rotated, 'operational');
  delete process.env.CMS_AUTH_SECRET;
  await expectStatus(await GET(), 'major_outage');
  assert.equal(calls, 4);
  process.env.CMS_AUTH_SECRET = 'restored-test-secret';
  const restored = GET();
  assert.equal(calls, 5);
  finish(200);
  await expectStatus(await restored, 'operational');
  // A late old-token response must not overwrite the new-token cache.
  process.env.CMS_GITHUB_TOKEN = 'old-inflight-token';
  const oldRequest = GET();
  const finishOld = finish;
  process.env.CMS_GITHUB_TOKEN = 'new-inflight-token';
  const newRequest = GET();
  finish(403);
  await expectStatus(await newRequest, 'major_outage');
  finishOld(200);
  await expectStatus(await oldRequest, 'operational');
  await expectStatus(await GET(), 'major_outage');
  assert.equal(calls, 7);
  console.log('CMS status: coalescing, success/failure TTL, HTTP errors, token rotation, missing config and redaction passed (mocked; no external requests).');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => { Date.now = originalNow; });
