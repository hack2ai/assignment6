// ═══════════════════════════════════════════════
// Assignment 6 : Creating a Simple Node.js Server
// Using built-in 'http' module (no Express)
// ═══════════════════════════════════════════════

const http = require('http');  // Built-in Node.js HTTP module
const fs   = require('fs');    // File system module to read HTML files
const path = require('path');  // Path module for cross-platform file paths

// ── Server Configuration ──
const PORT = process.env.PORT || 3000;
const HOSTNAME = 'localhost';

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

  // Use async fs.readFile to avoid blocking the event loop
  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
      // If file not found, send 500 internal error
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
      return;
    }
    // Send 200 OK with the HTML content
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

// ── Helper: Serve the 404 Not Found page ──
function serve404(res) {
  const notFoundHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>404 - Page Not Found</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Segoe UI', sans-serif;
          background: #f0f4ff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
          padding: 2rem;
        }
        .code  { font-size: 6rem; font-weight: 900; color: #2B7FFF; line-height: 1; }
        h1     { font-size: 1.8rem; color: #1a1a2e; }
        p      { color: #5a6480; font-size: 1rem; }
        .emoji { font-size: 3rem; margin-bottom: 0.5rem; }
        a {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.75rem 2rem;
          background: #2B7FFF;
          color: #fff;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
        }
        a:hover { background: #1a6ee0; }
      </style>
    </head>
    <body>
      <div class="emoji">🔍</div>
      <div class="code">404</div>
      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/home">← Go Back Home</a>
    </body>
    </html>
  `;
  // Send 404 status with error page
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(notFoundHTML);
}

// ══════════════════════════════════════════════
// Create the HTTP Server
// req = incoming request, res = outgoing response
// ══════════════════════════════════════════════
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0]; // Strip query strings

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${url}`);

  // Check if route exists in our route map
  if (ROUTES[url]) {
    serveFile(ROUTES[url], res); // Serve matching HTML file
  } else {
    serve404(res); // Handle invalid routes with 404
  }
});

// ── Start listening on PORT ──
server.listen(PORT, HOSTNAME, () => {
  console.log('═══════════════════════════════════════');
  console.log('  🚀 FreshWave Server is running!');
  console.log(`  🌐 http://${HOSTNAME}:${PORT}`);
  console.log('───────────────────────────────────────');
  console.log('  Routes available:');
  console.log(`  → http://${HOSTNAME}:${PORT}/home`);
  console.log(`  → http://${HOSTNAME}:${PORT}/about`);
  console.log(`  → http://${HOSTNAME}:${PORT}/contact`);
  console.log('═══════════════════════════════════════');
});
