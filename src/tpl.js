/**
 * Template Engine
 * Page templates for different website types
 */

export default class Tpl {
  constructor() {
    this.templates = {
      home: {
        name: 'Home',
        content: `
<section class="hero">
    <div class="container">
        <h1>Welcome to Your Website</h1>
        <p>Built with AI Technology</p>
        <button class="cta-btn">Get Started</button>
    </div>
</section>

<section class="features">
    <div class="container">
        <h2>Features</h2>
        <div class="features-grid">
            <div class="feature">
                <h3>⚡ Fast</h3>
                <p>Lightning quick performance</p>
            </div>
            <div class="feature">
                <h3>📱 Responsive</h3>
                <p>Works on all devices</p>
            </div>
            <div class="feature">
                <h3>🎨 Beautiful</h3>
                <p>Modern design</p>
            </div>
        </div>
    </div>
</section>
        `,
      },
      about: {
        name: 'About',
        content: `
<section class="about">
    <div class="container">
        <h1>About Us</h1>
        <p>We are passionate about creating amazing digital experiences.</p>
        <div class="about-content">
            <h2>Our Mission</h2>
            <p>To provide innovative solutions that transform ideas into reality.</p>
        </div>
    </div>
</section>
        `,
      },
      contact: {
        name: 'Contact',
        content: `
<section class="contact">
    <div class="container">
        <h1>Contact Us</h1>
        <form class="contact-form">
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <textarea placeholder="Your Message" rows="5" required><\/textarea>
            <button type="submit">Send Message</button>
        </form>
    </div>
</section>
        `,
      },
      portfolio: {
        name: 'Portfolio',
        content: `
<section class="portfolio">
    <div class="container">
        <h1>Our Work</h1>
        <div class="portfolio-grid">
            <div class="portfolio-item">
                <img src="placeholder.jpg" alt="Project">
                <h3>Project 1</h3>
            </div>
            <div class="portfolio-item">
                <img src="placeholder.jpg" alt="Project">
                <h3>Project 2</h3>
            </div>
            <div class="portfolio-item">
                <img src="placeholder.jpg" alt="Project">
                <h3>Project 3</h3>
            </div>
        </div>
    </div>
</section>
        `,
      },
      services: {
        name: 'Services',
        content: `
<section class="services">
    <div class="container">
        <h1>Services</h1>
        <div class="services-grid">
            <div class="service">
                <h3>Web Design</h3>
                <p>Custom responsive designs</p>
            </div>
            <div class="service">
                <h3>Development</h3>
                <p>Full-stack development</p>
            </div>
            <div class="service">
                <h3>Consulting</h3>
                <p>Professional guidance</p>
            </div>
        </div>
    </div>
</section>
        `,
      },
    };
  }

  get(name, type) {
    return this.templates[name] || this.templates.home;
  }

  getAll() {
    return Object.entries(this.templates).map(([key, tpl]) => ({
      id: key,
      name: tpl.name,
    }));
  }
}
