# Assignment 6 - Node.js HTTP Server
## FreshWave Laundry Services

### How to Run

1. Make sure Node.js is installed on your computer
2. Open terminal in this folder
3. Run the server:
   ```
   node server.js
   ```
4. Open your browser and visit:
   - http://localhost:3000/home     → Home page
   - http://localhost:3000/about    → About page
   - http://localhost:3000/contact  → Contact page
   - http://localhost:3000/anything → 404 error page

### Project Structure
```
assignment6/
├── server.js          ← Main Node.js server (http module)
├── README.md          ← This file
└── pages/
    ├── home.html      ← Home page (served at /home)
    ├── about.html     ← About page (served at /about)
    └── contact.html   ← Contact page (served at /contact)
```

### Features
- Built with Node.js built-in `http` module (no Express)
- Routes: `/`, `/home`, `/about`, `/contact`
- Async file reading with `fs.readFile`
- 404 error handling for invalid routes
- 200 OK status for valid routes
- CSS styled pages with laundry theme
- Fully commented code
