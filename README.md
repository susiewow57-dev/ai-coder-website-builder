# 🤖 AI CODER AGENT - Website Builder

An intelligent AI Coder Agent that automatically generates complete websites with HTML, CSS, and JavaScript code generation.

## ✨ Features

✅ **AI-Powered Code Generation** - Automatic HTML/CSS/JS generation
✅ **Multiple Website Types** - Portfolio, Business, Blog, E-Commerce
✅ **6+ Professional Themes** - Modern, Dark, Ocean, Sunset, Forest, Minimal
✅ **Customizable Pages** - Home, About, Contact, Portfolio, Services
✅ **Advanced Features** - Dark mode, animations, contact forms, and more
✅ **Responsive Design** - Mobile-friendly code generation
✅ **SEO Optimized** - Generated with best practices
✅ **Download Code** - Export generated websites as ZIP
✅ **REST API** - Full API for programmatic access

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/susiewow57-dev/ai-coder-website-builder.git
cd ai-coder-website-builder
npm install
```

### Run the Agent

```bash
npm start
```

Visit: **http://localhost:3000**

## 📖 How to Use

1. **Fill in website details** (name, type, description)
2. **Select pages** you want to generate
3. **Choose a theme** for your website
4. **Select features** (dark mode, animations, etc.)
5. **Click "Generate Website"**
6. **Download or preview** your generated code

## 🎯 API Endpoints

### Generate Website
```bash
POST /api/generate
```

### Get All Websites
```bash
GET /api/websites
```

### Get Specific Website
```bash
GET /api/website/:id
```

### Download Website Code
```bash
GET /api/download/:id
```

## 📁 File Structure

```
ai-coder-website-builder/
├── public/
│   ├── main.html      # UI
│   ├── style.css      # Styles
│   └── index.js       # Frontend
├── src/
│   ├── agent.js       # Main agent
│   ├── gen.js         # Code generator
│   ├── tpl.js         # Templates
│   └── theme.js       # Themes
├── app.js             # Server
└── package.json
```

## 📝 License

MIT
