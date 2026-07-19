const adminHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow,noarchive" />
    <title>HAILAN 内容管理</title>
  </head>
  <body>
    <noscript>内容管理后台需要启用 JavaScript。</noscript>
    <script defer src="https://unpkg.com/decap-cms@3.12.2/dist/decap-cms.js"></script>
  </body>
</html>`;

export function GET() {
  return new Response(adminHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
