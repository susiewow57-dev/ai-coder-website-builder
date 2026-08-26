/**
 * AI CODER - Main Agent Class
 * Generates complete websites with AI logic
 */

import { v4 as uuidv4 } from 'uuid';
import Gen from './gen.js';
import Tpl from './tpl.js';
import Theme from './theme.js';

export default class Agent {
  constructor() {
    this.gen = new Gen();
    this.tpl = new Tpl();
    this.theme = new Theme();
    this.websites = [];
    this.features = {
      'responsive-design': { name: 'Responsive Design', description: 'Mobile-friendly layout' },
      'dark-mode': { name: 'Dark Mode', description: 'Dark theme toggle' },
      'animations': { name: 'Animations', description: 'Smooth animations' },
      'contact-form': { name: 'Contact Form', description: 'Working contact form' },
      'search': { name: 'Search', description: 'Search functionality' },
      'newsletter': { name: 'Newsletter', description: 'Newsletter signup' },
      'testimonials': { name: 'Testimonials', description: 'Customer testimonials' },
      'blog': { name: 'Blog', description: 'Blog section' },
      'gallery': { name: 'Gallery', description: 'Image gallery' },
      'team': { name: 'Team', description: 'Team members section' },
    };
  }

  /**
   * Main method: Generate a complete website
   */
  async generateWebsite(config) {
    const {
      name,
      type = 'portfolio',
      description = '',
      pages = ['home'],
      theme = 'modern',
      features = [],
    } = config;

    const id = uuidv4();
    console.log(`✅ Assigned ID: ${id}`);

    // Step 1: Generate structure
    console.log(`\n📐 Step 1: Generating website structure...`);
    const structure = this.genStruct(name, type, pages);

    // Step 2: Generate code
    console.log(`🔧 Step 2: Generating code files...`);
    const code = this.gen.generate(structure, theme, features);

    // Step 3: Apply theme
    console.log(`🎨 Step 3: Applying theme "${theme}"...`);
    const themeStyles = this.theme.getStyles(theme);

    // Step 4: Create website object
    const website = {
      id,
      name,
      type,
      description,
      pages,
      theme,
      features,
      structure,
      code,
      themeStyles,
      createdAt: new Date(),
      status: 'ready',
    };

    this.websites.push(website);
    console.log(`✨ Website "${name}" generated successfully!\n`);

    return {
      id: website.id,
      name: website.name,
      type: website.type,
      pages: website.pages,
      theme: website.theme,
      features: website.features,
      files: Object.keys(website.code),
      createdAt: website.createdAt,
    };
  }

  /**
   * Generate website structure
   */
  genStruct(name, type, pages) {
    return {
      name,
      type,
      pages: pages.map(page => ({
        name: page,
        tpl: this.tpl.get(page, type),
        route: `/${page === 'home' ? '' : page}`,
      })),
      nav: this.genNav(pages),
      footer: this.genFooter(name),
    };
  }

  /**
   * Generate navigation menu
   */
  genNav(pages) {
    return pages.map(page => ({
      name: page.charAt(0).toUpperCase() + page.slice(1),
      href: page === 'home' ? '/' : `/${page}`,
      active: page === 'home',
    }));
  }

  /**
   * Generate footer
   */
  genFooter(siteName) {
    return {
      copyright: `© 2024 ${siteName}. All rights reserved.`,
      links: [
        { text: 'Privacy', href: '#' },
        { text: 'Terms', href: '#' },
        { text: 'Contact', href: '#' },
      ],
      social: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
    };
  }

  /**
   * Get a specific website
   */
  getWebsite(id) {
    return this.websites.find(w => w.id === id);
  }

  /**
   * Get all websites
   */
  getAllWebsites() {
    return this.websites.map(w => ({
      id: w.id,
      name: w.name,
      type: w.type,
      pages: w.pages,
      theme: w.theme,
      createdAt: w.createdAt,
    }));
  }

  /**
   * Get available templates
   */
  getTemplates() {
    return this.tpl.getAll();
  }

  /**
   * Get available themes
   */
  getThemes() {
    return this.theme.getAll();
  }

  /**
   * Get available features
   */
  getFeatures() {
    return Object.entries(this.features).map(([key, value]) => ({
      id: key,
      ...value,
    }));
  }

  /**
   * Generate ZIP content for download
   */
  generateZipContent(website) {
    return Buffer.from(`
Website: ${website.name}
Type: ${website.type}
Pages: ${website.pages.join(', ')}
Theme: ${website.theme}

Generated: ${website.createdAt}

Files:
${Object.keys(website.code).join('\n')}
    `);
  }
}
