// ═══════════════════════════════════════════════
// Assignment 6 : Creating a Simple Node.js Server
// Using built-in 'http' module (no Express)
// Compatible with Vercel serverless deployment
// ═══════════════════════════════════════════════

const http = require('http');  // Built-in Node.js HTTP module
const fs   = require('fs');    // File system module to read HTML files
const path = require('path');  // Path module for cross-platform file paths

// ── Server Configuration ──
const PORT = process.env.PORT || 3000;

// ── Route Map: URL path → HTML file ──
const ROUTES = {
  '/':        'home.html',
  '/home':    'home.html',
  '/about':   'about.html',
  '/contact': 'contact.html',
};

// ── Helper: Read and serve an HTML file asynchronously ──
function serveFile(filePath, res) {
  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

// ── Helper: Serve 404 page ──
function serve404(res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>404 - Not Found</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',sans-serif;background:#f0f4ff;min-height:100vh;
         display:flex;flex-direction:column;align-items:center;justify-content:center;
         text-align:center;padding:2rem;gap:1rem}
    .code{font-size:6rem;font-weight:900;color:#2B7FFF;line-height:1}
    h1{font-size:1.8rem;color:#1a1a2e}
    p{color:#5a6480}
    a{margin-top:1rem;display:inline-block;padding:.75rem 2rem;background:#2B7FFF;
      color:#fff;border-radius:50px;text-decoration:none;font-weight:600}
    a:hover{background:#1a6ee0}
  </style>
</head>
<body>
  <div>🔍</div>
  <div class="code">404</div>
  <h1>Page Not Found</h1>
  <p>The page you are looking for does not exist.</p>
  <a href="/home">← Go Back Home</a>
</body>
</html>`;
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(html);
}

// ── Request Handler (also exported for Vercel) ──
function handler(req, res) {
  const url = req.url.split('?')[0];
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${url}`);

  if (ROUTES[url]) {
    serveFile(ROUTES[url], res);
  } else {
    serve404(res);
  }
}

// ── Export handler for Vercel serverless ──
module.exports = handler;

// ── Also start local server when running with node ──
if (require.main === module) {
  const server = http.createServer(handler);
  server.listen(PORT, () => {
    console.log('═══════════════════════════════════════');
    console.log('  🚀 FreshWave Server is running!');
    console.log(`  🌐 http://localhost:${PORT}`);
    console.log('───────────────────────────────────────');
    console.log(`  → http://localhost:${PORT}/home`);
    console.log(`  → http://localhost:${PORT}/about`);
    console.log(`  → http://localhost:${PORT}/contact`);
    console.log('═══════════════════════════════════════');
  });
}
