/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, ...args) {
  return resolve.call(this, request.startsWith('@/') ? path.join(root, 'src', request.slice(2)) : request, ...args);
};
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);
process.env.CMS_AUTH_SECRET = 'test-only-secret-that-is-at-least-32-characters';
process.env.CMS_GITHUB_TOKEN = 'fake-repository-token';
process.env.CMS_DINGTALK_APP_KEY = 'fake-app';
process.env.CMS_DINGTALK_APP_SECRET = 'fake-secret';
process.env.CMS_DINGTALK_CORP_ID = 'ding4bbd7f547b8ade69ee0f45d8e4f7c288';
const { NextRequest } = require('next/server');
const auth = require('../src/lib/cms-auth.ts');
const gateway = require('../src/app/api/cms/git/github/[...path]/route.ts');
const authorize = require('../src/app/api/cms/dingtalk/authorize/route.ts');
const callback = require('../src/app/api/cms/dingtalk/callback/route.ts');
const tokenEndpoint = require('../src/app/api/cms/dingtalk/token/route.ts');
const sha = 'a'.repeat(40);
const baseSha = 'c'.repeat(40);
let currentBaseSha = baseSha;
let mainFiles = [{ filename: 'src/components/Header.tsx' }];
let member = true;
let userId = '0850131661836093';
let changedPath = 'content/products/lvt.json';
let comparisonStatus = 'ahead';
let previousPath;
let treeMode = '100644';
let treeTruncated = false;
let fileCount = 1;
let mergeStatus = 200;
let forwarded = 0;
let codeUsed = false;
global.fetch = async (url, options = {}) => {
  const value = String(url);
  if (value.includes('/oauth2/userAccessToken')) {
    if (codeUsed) return Response.json({ message: 'code already used' }, { status: 400 });
    codeUsed = true;
    return Response.json({ accessToken: 'fake-user-token' });
  }
  if (value.endsWith('/contact/users/me')) return Response.json({ unionId: 'fake-union', nick: 'Test' });
  if (value.includes('/oauth2/accessToken')) return Response.json({ accessToken: 'fake-company-token' });
  if (value.includes('/getbyunionid')) return Response.json(member ? { errcode: 0, result: { contact_type: 0, userid: userId } } : { errcode: 60121 });
  if (value.endsWith('/pulls/1') && !options.method) return Response.json({ base: { ref: 'main' }, head: { sha, ref: 'cms/products/lvt', repo: { full_name: 'hailan-world/website' } } });
  if (value.endsWith('/git/ref/heads/main')) return Response.json({ object: { sha: currentBaseSha } });
  if (value.includes(`/compare/${sha}...${baseSha}`)) return Response.json({ status: 'diverged', files: mainFiles });
  if (value.includes('/compare/')) return Response.json({ status: comparisonStatus, base_commit: { sha: baseSha }, files: Array.from({ length: fileCount }, () => ({ filename: changedPath, previous_filename: previousPath })) });
  if (value.includes('/git/trees/') && !options.method) return Response.json({ truncated: treeTruncated, tree: [{ path: changedPath, type: 'blob', mode: treeMode }] });
  assert.equal(options.headers.get('Authorization'), 'Bearer fake-repository-token');
  forwarded++;
  if (value.endsWith('/pulls/1/merge')) {
    assert.deepEqual(JSON.parse(Buffer.from(options.body).toString()), { sha, merge_method: 'squash' });
    return Response.json({ sha, merged: mergeStatus === 200 }, { status: mergeStatus });
  }
  return Response.json({ sha, merged: true });
};
function token(role = 'editor', sub = userId) {
  return auth.signCmsToken({ kind: 'cms_session', sub, unionId: 'fake-union', role, name: 'Test', email: 'test@example.invalid', iss: 'hailan-cms', aud: 'hailan-cms-gateway' }, 300);
}
async function request(method, route, body = {}, bearer = token()) {
  const req = new NextRequest(`https://hailanworld.com/api/cms/git/github/${route}`, {
    method, headers: { authorization: `Bearer ${bearer}`, 'content-type': 'application/json' },
    ...(method === 'GET' ? {} : { body: JSON.stringify(body) }),
  });
  return gateway[method](req, { params: Promise.resolve({ path: route.split('/') }) });
}
(async () => {
  assert.equal((await request('GET', 'branches/main', {}, 'invalid')).status, 401);
  assert.equal((await request('PUT', 'pulls/1/merge', { sha, merge_method: 'squash' })).status, 403);
  assert.equal((await request('PATCH', 'git/refs/heads/main', { sha })).status, 403);
  assert.equal((await request('PATCH', 'git/refs/main', { sha })).status, 403);
  assert.equal((await request('POST', 'git/refs', { ref: 'refs/tags/release', sha })).status, 403);
  assert.equal((await request('POST', 'merges', { base: 'main', head: sha })).status, 403);
  assert.equal((await request('PUT', 'contents/package.json', { branch: 'main' })).status, 403);
  assert.equal((await request('GET', 'branches/main', {}, token('publisher'))).status, 401);
  assert.equal(forwarded, 0);
  member = false;
  assert.equal((await request('GET', 'branches/main')).status, 401);
  member = true;
  assert.equal((await request('POST', 'git/blobs', { content: 'draft', encoding: 'utf-8' })).status, 200);
  changedPath = 'src/app/api/injected.ts';
  assert.equal((await request('POST', 'git/refs', { ref: 'refs/heads/cms/products/lvt', sha })).status, 403);
  changedPath = 'content/products/lvt.json';
  assert.equal((await request('POST', 'git/refs', { ref: 'refs/heads/cms/products/lvt', sha })).status, 200);
  userId = '635933485526245649';
  assert.equal((await request('POST', 'git/blobs', { content: 'draft' }, token('publisher'))).status, 403);
  assert.equal((await request('PUT', 'pulls/1/merge', { sha, merge_method: 'squash' }, token('publisher'))).status, 200);
  assert.equal((await request('PUT', 'pulls/1/merge', { sha: 'b'.repeat(40), merge_method: 'squash' }, token('publisher'))).status, 403);
  comparisonStatus = 'diverged';
  assert.equal((await request('PUT', 'pulls/1/merge', { sha, merge_method: 'squash' }, token('publisher'))).status, 200);
  // Do not weaken role, path, mode, truncation, ancestry, or SHA protections.
  const publish = () => request('PUT', 'pulls/1/merge', { sha, merge_method: 'squash' }, token('publisher'));
  // Renames, directory-rename inference, deletes, and mode changes on main
  // must never redirect a draft into protected files or change content modes.
  for (const files of [
    [{ filename: 'src/protected.js', previous_filename: 'content/news/test.md' }],
    [{ filename: 'content/news/other.md', status: 'removed' }],
    [{ filename: 'content/products/lvt.json', status: 'modified' }],
    [{ filename: 'src/.gitkeep', previous_filename: 'content/news/.gitkeep', status: 'renamed' }],
    [{ filename: 'content/news/.gitkeep', status: 'removed' }],
    [{ filename: 'content/news', status: 'modified' }],
    [{ filename: 'src/moved.ts', status: 'renamed' }],
    Array.from({ length: 300 }, () => ({ filename: 'src/other.ts' })),
  ]) {
    mainFiles = files;
    assert.equal((await publish()).status, 403);
  }
  mainFiles = [{ filename: 'src/components/Header.tsx' }];
  currentBaseSha = 'd'.repeat(40);
  assert.equal((await publish()).status, 403);
  currentBaseSha = baseSha;

  changedPath = 'src/app/api/injected.ts';
  assert.equal((await publish()).status, 403);
  changedPath = 'content/products/lvt.json';
  previousPath = 'package.json';
  assert.equal((await publish()).status, 403);
  previousPath = undefined;
  treeMode = '120000';
  assert.equal((await publish()).status, 403);
  treeMode = '100644';
  treeTruncated = true;
  assert.equal((await publish()).status, 403);
  treeTruncated = undefined;
  assert.equal((await publish()).status, 403);
  treeTruncated = false;
  fileCount = 300;
  assert.equal((await publish()).status, 403);
  fileCount = 1;
  comparisonStatus = 'behind';
  assert.equal((await publish()).status, 403);
  comparisonStatus = 'diverged';
  assert.equal((await request('PUT', 'pulls/1/merge', { sha: 'b'.repeat(40), merge_method: 'squash' }, token('publisher'))).status, 403);
  assert.equal((await request('PUT', 'pulls/1/merge', { sha, merge_method: 'merge' }, token('publisher'))).status, 403);
  // Real GitHub owns conflict and changed-head detection; preserve its failures.
  for (const status of [405, 409]) {
    mergeStatus = status;
    assert.equal((await publish()).status, status);
  }
  mergeStatus = 200;
  userId = '0850131661836093';
  assert.equal((await request('PUT', 'pulls/1/merge', { sha, merge_method: 'squash' })).status, 403);
  assert.equal((await request('PATCH', 'git/refs/heads/cms/products/lvt', { sha, force: true })).status, 403);
  assert.equal((await request('POST', 'git/refs', { ref: 'refs/heads/cms/products/lvt', sha })).status, 403);
  userId = '635933485526245649';
  comparisonStatus = 'ahead';
  assert.equal((await request('POST', 'issues/1/labels', { labels: ['decap-cms/pending_publish'] }, token('publisher'))).status, 200);
  userId = '0850131661836093';
  assert.equal((await request('POST', 'issues/1/labels', { labels: ['decap-cms/pending_publish'] })).status, 403);
  assert.equal((await request('POST', 'issues/1/labels', { labels: ['decap-cms/pending_review'] })).status, 200);
  assert.equal((await request('PATCH', 'git/refs/heads/cms/products/lvt', { sha, force: true })).status, 200);
  const verifier = 'v'.repeat(64);
  const login = new URL('https://hailanworld.com/api/cms/dingtalk/authorize');
  login.search = new URLSearchParams({ client_id: 'hailan-cms', redirect_uri: 'https://hailanworld.com/admin/', response_type: 'code', state: 'test-state', code_challenge: auth.pkceChallenge(verifier), code_challenge_method: 'S256' }).toString();
  const start = authorize.GET(new NextRequest(login));
  assert.equal(start.status, 307);
  const providerURL = new URL(start.headers.get('location'));
  assert.equal(providerURL.searchParams.get('scope'), 'openid corpid');
  assert.equal(providerURL.searchParams.get('corpId'), process.env.CMS_DINGTALK_CORP_ID);
  const state = new URL(start.headers.get('location')).searchParams.get('state');
  const callbackURL = `https://hailanworld.com/api/cms/dingtalk/callback?authCode=one-use-code&state=${state}`;
  assert.equal((await callback.GET(new NextRequest(callbackURL))).status, 401);
  const finish = await callback.GET(new NextRequest(callbackURL, { headers: { cookie: `cms_oauth_nonce=${start.cookies.get('cms_oauth_nonce').value}` } }));
  assert.equal(finish.status, 307);
  const code = new URL(finish.headers.get('location')).searchParams.get('code');
  const exchange = code_verifier => tokenEndpoint.POST(new NextRequest('https://hailanworld.com/api/cms/dingtalk/token', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ client_id: 'hailan-cms', grant_type: 'authorization_code', redirect_uri: 'https://hailanworld.com/admin/', code, code_verifier }),
  }));
  assert.equal((await exchange('wrong')).status, 400);
  assert.equal(codeUsed, false);
  const granted = await exchange(verifier);
  assert.equal(granted.status, 200);
  const session = auth.cmsSessionFromAuthorization(`Bearer ${(await granted.json()).access_token}`);
  assert.equal(session.sub, userId);
  assert.equal((await exchange(verifier)).status, 400);
  console.log('CMS security: gateway roles, browser-bound state, PKCE and provider-code replay checks passed (mocked; no external requests).');
})().catch(error => { console.error(error); process.exitCode = 1; });
