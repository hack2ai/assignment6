# 🌊 FreshWave — Node.js HTTP Server

> A simple yet powerful **Node.js HTTP server** built with zero dependencies — using only Node.js built-in modules. Serves multiple HTML pages with routing, error handling, and async file reading.

---

## 🚀 Live Demo

🌐 **[View Live →](https://assignment6-xxxx.onrender.com)**

&nbsp;&nbsp;&nbsp;&nbsp;**GitHub Repo →** https://github.com/hack2ai/assignment6

---

## 🛠️ Languages & Tools Used

### 💻 Languages
| Language | Usage |
|----------|-------|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **JavaScript** | Server logic, routing, file handling |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML5** | Structure of all 3 web pages |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS3** | Styling and responsive design |

### ⚙️ Runtime & Tools
| Tool | Purpose |
|------|---------|
| 🟢 **Node.js v18+** | JavaScript runtime to run the server |
| 📦 **npm** | Package manager (no external packages used) |
| 🐙 **Git & GitHub** | Version control and code hosting |
| ☁️ **Render.com** | Cloud deployment platform |
| 🖥️ **VS Code** | Code editor |

### 📦 Node.js Built-in Modules
| Module | Purpose |
|--------|---------|
| `http` | Create and manage the HTTP server |
| `fs` | Asynchronously read HTML files from disk |
| `path` | Handle file paths across different operating systems |

> ⚠️ **No external npm packages used** — 100% built with Node.js core modules only!

---

## 📸 Pages Preview

| Route | Page | Description |
|-------|------|-------------|
| `/home` | 🏠 Home | Hero section, services, achievements |
| `/about` | 👥 About | Team, values, company story |
| `/contact` | 📬 Contact | Booking form, contact info |
| `/*` | ❌ 404 | Custom not found error page |

---

## ✨ Features

- ✅ **Zero dependencies** — only Node.js built-in `http`, `fs`, `path` modules
- ✅ **Routing** — `/home`, `/about`, `/contact` routes
- ✅ **HTTP status codes** — `200 OK` for valid, `404 Not Found` for invalid routes
- ✅ **Async file reading** — non-blocking `fs.readFile()` for performance
- ✅ **Custom 404 page** — styled error page for unknown routes
- ✅ **Dynamic PORT** — uses `process.env.PORT` for cloud deployment
- ✅ **Fully commented** — clean, readable, well-documented code

---

## 🗂️ Project Structure

```
assignment6/
├── 📄 server.js        ← Main Node.js server (http module)
├── 📄 package.json     ← Project config & start script
├── 📄 README.md        ← You are here
├── 🌐 home.html        ← Home page (/home)
├── 🌐 about.html       ← About page (/about)
└── 🌐 contact.html     ← Contact page (/contact)
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/hack2ai/assignment6.git

# 2. Navigate into the project
cd assignment6

# 3. Start the server
node server.js
```

### Open in Browser

```
http://localhost:3000/home
http://localhost:3000/about
http://localhost:3000/contact
```

---

## 🔌 API Routes

| Method | Route | Status Code | Description |
|--------|-------|-------------|-------------|
| `GET` | `/` | `200 OK` | Redirects to home page |
| `GET` | `/home` | `200 OK` | Serves home.html |
| `GET` | `/about` | `200 OK` | Serves about.html |
| `GET` | `/contact` | `200 OK` | Serves contact.html |
| `GET` | `/*` | `404 Not Found` | Custom error page |

---

## 🧠 How It Works

```
Client Request
      │
      ▼
  HTTP Server (http.createServer)
      │
      ▼
  Route Matching (ROUTES object)
      │
      ├── ✅ Match Found → fs.readFile() → 200 OK + HTML
      │
      └── ❌ No Match   → Custom 404 Page
```

---

## 📝 Key Concepts Used

- **`http.createServer()`** — Creates the HTTP server
- **`fs.readFile()`** — Asynchronously reads HTML files (non-blocking)
- **`process.env.PORT`** — Dynamic port for cloud deployment
- **`res.writeHead()`** — Sets HTTP status codes and headers
- **Route mapping object** — Clean, modular routing without Express

---

## 👨‍💻 Author

**hack2ai**
- GitHub: [@hack2ai](https://github.com/hack2ai)

---

## 📄 License

This project is for educational purposes — **Assignment 6** of the Web Development course.

---

<div align="center">
  <strong>⭐ Made with ❤️ using Node.js ⭐</strong>
</div>
