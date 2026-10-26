// ═══════════════════════════════════════════════
// Assignment 6 : Creating a Simple Node.js Server
// Using built-in 'http' module (no Express)
// HTML embedded directly - works on Vercel + locally
// ═══════════════════════════════════════════════

const http = require('http');
const PORT = process.env.PORT || 3000;

// ── Shared CSS styles ──
const CSS = `
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',sans-serif;background:#f0f4ff;color:#1a1a2e;min-height:100vh}
    nav{background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.08);padding:0 6%;height:68px;
        display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
    .logo{font-weight:800;font-size:1.4rem}.logo span{color:#2B7FFF}
    .nav-links{display:flex;gap:2rem;list-style:none}
    .nav-links a{text-decoration:none;font-weight:600;font-size:.92rem;color:#444;
        padding:.4rem 0;border-bottom:2px solid transparent;transition:all .2s}
    .nav-links a:hover,.nav-links a.active{color:#2B7FFF;border-bottom-color:#2B7FFF}
    .btn{display:inline-block;padding:.85rem 2.2rem;background:#2B7FFF;color:#fff;
        border-radius:50px;text-decoration:none;font-weight:700;font-size:1rem;
        box-shadow:0 6px 20px rgba(43,127,255,.35);transition:all .2s}
    .btn:hover{background:#1a6ee0;transform:translateY(-2px)}
    footer{background:#0f172a;color:#94a3b8;padding:2rem 6%;text-align:center;font-size:.85rem}
    .fl{color:#fff;font-weight:700}.fl span{color:#2B7FFF}
  </style>`;

// ── HTML Pages ──
const PAGES = {

  // HOME PAGE
  home: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>FreshWave - Home</title>${CSS}
  <style>
    .hero{display:flex;align-items:center;justify-content:space-between;
          min-height:calc(100vh - 68px);padding:3rem 6%;gap:3rem;
          background:linear-gradient(135deg,#f0f4ff 0%,#fff 100%)}
    .hero-left{flex:1;max-width:540px}
    .hero-left h1{font-size:clamp(2rem,4vw,3rem);font-weight:800;line-height:1.15;margin-bottom:1rem}
    .hero-left h1 .blue{color:#2B7FFF}
    .hero-left p{font-size:1rem;color:#5a6480;line-height:1.8;margin-bottom:2rem}
    .hero-right{flex:1;display:flex;align-items:center;justify-content:center}
    .hero-img{width:100%;max-width:420px;height:340px;background:linear-gradient(135deg,#ddeeff,#c0d8ff);
              border-radius:24px;display:flex;align-items:center;justify-content:center;
              font-size:8rem;box-shadow:0 16px 48px rgba(43,127,255,.18)}
    .ach{background:linear-gradient(90deg,#2B7FFF,#1a6ee0);padding:2rem 6%;
         display:flex;align-items:center;gap:3rem;flex-wrap:wrap}
    .ach h3{color:#fff;font-size:1.1rem;font-weight:700}
    .ach-d{width:2px;height:40px;background:rgba(255,255,255,.3)}
    .ach-item{text-align:center;color:#fff}
    .ach-item .num{font-size:1.8rem;font-weight:800}
    .ach-item .lbl{font-size:.8rem;opacity:.85}
    .section{padding:4rem 6%}
    .section h2{font-size:1.8rem;font-weight:800;text-align:center;margin-bottom:.5rem}
    .sub{text-align:center;color:#5a6480;margin-bottom:2.5rem}
    .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem}
    .card{background:#fff;border-radius:18px;padding:1.8rem;box-shadow:0 4px 18px rgba(0,0,0,.07);
          text-align:center;transition:all .2s}
    .card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(43,127,255,.15)}
    .card .icon{font-size:2.4rem;margin-bottom:.8rem}
    .card h4{font-weight:700;margin-bottom:.4rem}
    .card p{font-size:.85rem;color:#5a6480;line-height:1.6}
  </style></head><body>
  <nav>
    <div class="logo">Fresh<span>Wave</span></div>
    <ul class="nav-links">
      <li><a href="/home" class="active">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  <section class="hero">
    <div class="hero-left">
      <h1>Revitalize Your Clothes<br>with Expert<br><span class="blue">Laundry Services!</span></h1>
      <p>From premium dry cleaning to swift wash and fold, we deliver care and convenience. Schedule a pickup and rediscover the freshness of your clothes today!</p>
      <a href="/contact" class="btn">📅 Book a Service Today!</a>
    </div>
    <div class="hero-right"><div class="hero-img">🧺</div></div>
  </section>
  <div class="ach">
    <h3>Our Achievements</h3><div class="ach-d"></div>
    <div class="ach-item"><div class="num">15+</div><div class="lbl">Laundry Services</div></div>
    <div class="ach-d"></div>
    <div class="ach-item"><div class="num">240+</div><div class="lbl">Happy Customers</div></div>
    <div class="ach-d"></div>
    <div class="ach-item"><div class="num">2+ Yrs</div><div class="lbl">Experience</div></div>
  </div>
  <section class="section">
    <h2>Our Services</h2><p class="sub">Everything your clothes need</p>
    <div class="cards">
      <div class="card"><div class="icon">👔</div><h4>Dry Cleaning</h4><p>Expert care for delicate and formal wear.</p></div>
      <div class="card"><div class="icon">👕</div><h4>Wash & Fold</h4><p>Fresh, clean clothes folded neatly on time.</p></div>
      <div class="card"><div class="icon">🔲</div><h4>Ironing</h4><p>Crisp, wrinkle-free clothes every time.</p></div>
      <div class="card"><div class="icon">🚚</div><h4>Pickup & Delivery</h4><p>We come to your door, 7 days a week.</p></div>
    </div>
  </section>
  <footer><div class="fl">Fresh<span>Wave</span></div>
  <p style="margin-top:.5rem">© 2024 FreshWave Laundry Services. All rights reserved.</p></footer>
  </body></html>`,

  // ABOUT PAGE
  about: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>FreshWave - About</title>${CSS}
  <style>
    .page-header{background:linear-gradient(135deg,#2B7FFF,#1a6ee0);padding:4rem 6%;text-align:center;color:#fff}
    .page-header h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.6rem}
    .page-header p{font-size:1rem;opacity:.9;max-width:500px;margin:0 auto}
    .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;padding:4rem 6%;align-items:center}
    .about-img{background:linear-gradient(135deg,#ddeeff,#c0d8ff);border-radius:24px;height:320px;
               display:flex;align-items:center;justify-content:center;font-size:7rem}
    .about-text h2{font-size:1.8rem;font-weight:800;margin-bottom:1rem}
    .about-text h2 span{color:#2B7FFF}
    .about-text p{color:#5a6480;line-height:1.8;margin-bottom:1rem;font-size:.95rem}
    .values{background:#fff;padding:4rem 6%}
    .values h2{font-size:1.8rem;font-weight:800;text-align:center;margin-bottom:.5rem}
    .sub{text-align:center;color:#5a6480;margin-bottom:2.5rem}
    .vgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem}
    .vcard{padding:2rem;border:2px solid #e8edf5;border-radius:18px;text-align:center;transition:all .2s}
    .vcard:hover{border-color:#2B7FFF;transform:translateY(-4px)}
    .vcard .icon{font-size:2.4rem;margin-bottom:.8rem}
    .vcard h4{font-weight:700;margin-bottom:.4rem}
    .vcard p{font-size:.85rem;color:#5a6480;line-height:1.6}
    @media(max-width:700px){.about-grid{grid-template-columns:1fr}}
  </style></head><body>
  <nav>
    <div class="logo">Fresh<span>Wave</span></div>
    <ul class="nav-links">
      <li><a href="/home">Home</a></li>
      <li><a href="/about" class="active">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  <div class="page-header"><h1>About FreshWave</h1>
  <p>Learn about our story, values, and the team behind your freshest clothes.</p></div>
  <div class="about-grid">
    <div class="about-img">🧺</div>
    <div class="about-text">
      <h2>Who We <span>Are</span></h2>
      <p>FreshWave has been delivering top-quality laundry services since 2022. We started with a simple mission: make laundry effortless for every household.</p>
      <p>We use eco-friendly detergents and energy-efficient machines to protect your clothes and the planet.</p>
      <p>With over 240+ happy customers and 15+ services, FreshWave is your most trusted laundry partner.</p>
    </div>
  </div>
  <div class="values">
    <h2>Our Core Values</h2><p class="sub">What drives us every single day</p>
    <div class="vgrid">
      <div class="vcard"><div class="icon">🏆</div><h4>Premium Quality</h4><p>We never compromise on the quality of care your clothes receive.</p></div>
      <div class="vcard"><div class="icon">🌿</div><h4>Eco-Friendly</h4><p>Green cleaning solutions to protect your clothes and the planet.</p></div>
      <div class="vcard"><div class="icon">⚡</div><h4>Fast Turnaround</h4><p>24-hour turnaround without cutting corners on quality.</p></div>
      <div class="vcard"><div class="icon">💰</div><h4>Affordable</h4><p>Competitive pricing with zero hidden charges. Always transparent.</p></div>
    </div>
  </div>
  <footer><div class="fl">Fresh<span>Wave</span></div>
  <p style="margin-top:.5rem">© 2024 FreshWave Laundry Services. All rights reserved.</p></footer>
  </body></html>`,

  // CONTACT PAGE
  contact: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>FreshWave - Contact</title>${CSS}
  <style>
    .page-header{background:linear-gradient(135deg,#2B7FFF,#1a6ee0);padding:4rem 6%;text-align:center;color:#fff}
    .page-header h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.6rem}
    .page-header p{font-size:1rem;opacity:.9;max-width:500px;margin:0 auto}
    .cgrid{display:grid;grid-template-columns:1fr 1.4fr;gap:3rem;padding:4rem 6%;align-items:start}
    .info h2{font-size:1.4rem;font-weight:800;margin-bottom:1.5rem}
    .info h2 span{color:#2B7FFF}
    .icard{display:flex;align-items:flex-start;gap:1rem;background:#fff;border-radius:16px;
           padding:1.2rem;margin-bottom:1rem;box-shadow:0 4px 16px rgba(0,0,0,.07)}
    .ic{font-size:1.6rem;width:48px;height:48px;background:#e8f0ff;border-radius:12px;
        display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .icard h4{font-weight:700;font-size:.92rem;margin-bottom:.2rem}
    .icard p{font-size:.85rem;color:#5a6480}
    .form-box{background:#fff;border-radius:20px;padding:2.5rem;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .form-box h2{font-size:1.4rem;font-weight:800;margin-bottom:.4rem}
    .form-box p{color:#5a6480;font-size:.88rem;margin-bottom:1.8rem}
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
    label{display:block;font-size:.82rem;font-weight:600;margin-bottom:.3rem}
    input,select,textarea{width:100%;padding:.75rem 1rem;border:2px solid #e8edf5;border-radius:10px;
        font-size:.9rem;font-family:'Segoe UI',sans-serif;outline:none;transition:border-color .2s;background:#f8faff}
    input:focus,select:focus,textarea:focus{border-color:#2B7FFF;background:#fff}
    textarea{resize:none;height:100px;margin-bottom:1rem}
    .btn-s{width:100%;padding:.85rem;background:#2B7FFF;color:#fff;border:none;border-radius:50px;
           font-size:1rem;font-weight:700;cursor:pointer;transition:all .2s;
           box-shadow:0 4px 16px rgba(43,127,255,.3)}
    .btn-s:hover{background:#1a6ee0;transform:translateY(-1px)}
    .success{display:none;text-align:center;padding:1rem;background:#f0fdf4;border-radius:10px;
             color:#16a34a;font-weight:600;margin-top:1rem}
    @media(max-width:700px){.cgrid{grid-template-columns:1fr}.frow{grid-template-columns:1fr}}
  </style></head><body>
  <nav>
    <div class="logo">Fresh<span>Wave</span></div>
    <ul class="nav-links">
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact" class="active">Contact</a></li>
    </ul>
  </nav>
  <div class="page-header"><h1>Contact Us</h1>
  <p>Get in touch — we'd love to hear from you and help you book a service!</p></div>
  <div class="cgrid">
    <div class="info">
      <h2>Get In <span>Touch</span></h2>
      <div class="icard"><div class="ic">📧</div><div><h4>Email Us</h4><p>hello@freshwave.com</p></div></div>
      <div class="icard"><div class="ic">📞</div><div><h4>Call Us</h4><p>+1 800 123 4567</p></div></div>
      <div class="icard"><div class="ic">📍</div><div><h4>Location</h4><p>New York, NY 10001, USA</p></div></div>
      <div class="icard"><div class="ic">🕐</div><div><h4>Working Hours</h4><p>Mon–Sat: 8AM – 8PM<br>Sunday: 10AM – 5PM</p></div></div>
    </div>
    <div class="form-box">
      <h2>Book a Service</h2>
      <p>Fill in the form and we'll get back to you within 24 hours.</p>
      <div class="frow">
        <div><label>Full Name</label><input type="text" id="fn" placeholder="e.g. Tony Smith"/></div>
        <div><label>Phone</label><input type="tel" id="fp" placeholder="+1 234 567 8900"/></div>
      </div>
      <div style="margin-bottom:1rem"><label>Email</label><input type="email" id="fe" placeholder="tony@email.com"/></div>
      <div style="margin-bottom:1rem">
        <label>Service Type</label>
        <select id="fs">
          <option value="">-- Select a service --</option>
          <option>Wash & Fold</option><option>Dry Cleaning</option>
          <option>Ironing</option><option>Stain Removal</option><option>Pickup & Delivery</option>
        </select>
      </div>
      <label>Message (optional)</label>
      <textarea id="fm" placeholder="Any special instructions..."></textarea>
      <button class="btn-s" onclick="sub()">📅 Book Now</button>
      <div class="success" id="ok">✅ Thank you! We will contact you within 24 hours.</div>
    </div>
  </div>
  <footer><div class="fl">Fresh<span>Wave</span></div>
  <p style="margin-top:.5rem">© 2024 FreshWave Laundry Services. All rights reserved.</p></footer>
  <script>
    function sub(){
      const n=document.getElementById('fn').value.trim();
      const p=document.getElementById('fp').value.trim();
      const e=document.getElementById('fe').value.trim();
      const s=document.getElementById('fs').value;
      if(!n||!p||!e||!s){alert('⚠️ Please fill in all required fields!');return;}
      document.getElementById('ok').style.display='block';
      ['fn','fp','fe','fm'].forEach(id=>document.getElementById(id).value='');
      document.getElementById('fs').value='';
    }
  </script>
  </body></html>`,

  // 404 PAGE
  notFound: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>404 - Not Found</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',sans-serif;background:#f0f4ff;min-height:100vh;
         display:flex;flex-direction:column;align-items:center;justify-content:center;
         text-align:center;padding:2rem;gap:1rem}
    .code{font-size:6rem;font-weight:900;color:#2B7FFF;line-height:1}
    h1{font-size:1.8rem;color:#1a1a2e}p{color:#5a6480}
    a{margin-top:1rem;display:inline-block;padding:.75rem 2rem;background:#2B7FFF;
      color:#fff;border-radius:50px;text-decoration:none;font-weight:600}
    a:hover{background:#1a6ee0}
  </style></head><body>
  <div style="font-size:3rem">🔍</div>
  <div class="code">404</div>
  <h1>Page Not Found</h1>
  <p>The page you are looking for does not exist.</p>
  <a href="/home">← Go Back Home</a>
  </body></html>`
};

// ── Route Map ──
const ROUTES = {
  '/':        'home',
  '/home':    'home',
  '/about':   'about',
  '/contact': 'contact',
};

// ── Request Handler ──
function handler(req, res) {
  const url = req.url.split('?')[0];
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${url}`);

  const page = ROUTES[url];
  if (page) {
    // 200 OK — serve the matching page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(PAGES[page]);
  } else {
    // 404 Not Found — serve error page
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(PAGES.notFound);
  }
}

// ── Export for Vercel serverless ──
module.exports = handler;

// ── Start local server when run with node ──
if (require.main === module) {
  const server = http.createServer(handler);
  server.listen(PORT, () => {
    console.log('═══════════════════════════════════════');
    console.log('  🚀 FreshWave Server is running!');
    console.log(`  🌐 http://localhost:${PORT}/home`);
    console.log(`  🌐 http://localhost:${PORT}/about`);
    console.log(`  🌐 http://localhost:${PORT}/contact`);
    console.log('═══════════════════════════════════════');
  });
}
