/**
 * Code Generator
 * Generates HTML, CSS, JS files for websites
 */

export default class Gen {
  generate(struct, theme, features) {
    const files = {};

    // Generate HTML files
    struct.pages.forEach(page => {
      files[`${page.name}.html`] = this.html(page, struct, theme);
    });

    // Generate CSS
    files['style.css'] = this.css(theme);

    // Generate JavaScript
    files['index.js'] = this.js(features);

    return files;
  }

  html(page, struct, theme) {
    const navHTML = struct.nav
      .map(nav => `<li><a href="${nav.href}">${nav.name}</a></li>`)
      .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${struct.name} - ${page.name}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">${struct.name}</div>
            <ul class="nav-menu">
                ${navHTML}
            </ul>
        </div>
    </nav>

    <main>
        ${page.tpl.content}
    </main>

    <footer class="footer">
        <div class="container">
            <p>${struct.footer.copyright}</p>
            <div class="footer-links">
                ${struct.footer.links.map(link => `<a href="${link.href}">${link.text}</a>`).join(' | ')}
            </div>
        </div>
    </footer>

    <script src="index.js"><\/script>
</body>
</html>`;
  }

  css(theme) {
    return `/* AI Generated Stylesheet */

:root {
    --primary: ${theme.primaryColor};
    --secondary: ${theme.secondaryColor};
    --text: ${theme.textColor};
    --bg: ${theme.bgColor};
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text);
    background: var(--bg);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    background: var(--primary);
    color: white;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-menu a:hover {
    opacity: 0.8;
}

/* Main Content */
main {
    min-height: calc(100vh - 200px);
    padding: 2rem 0;
}

/* Footer */
.footer {
    background: var(--primary);
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 3rem;
}

.footer-links a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
}

.footer-links a:hover {
    text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }

    .navbar .container {
        flex-direction: column;
    }
}`;
  }

  js(features) {
    return `/**
 * AI Generated JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Website loaded!');

    ${features.includes('dark-mode') ? this.darkMode() : ''}
    ${features.includes('animations') ? this.animations() : ''}
    ${features.includes('contact-form') ? this.form() : ''}
});
`;
  }

  darkMode() {
    return `
// Dark Mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
`;
  }

  animations() {
    return `
// Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
`;
  }

  form() {
    return `
// Form handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });
}
`;
  }
}
