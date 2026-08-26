/**
 * AI CODER - Main Agent Class
 * Generates complete websites with AI logic
 */

import { v4 as uuidv4 } from 'uuid';
import CodeGenerator from './code-generator.js';
import TemplateEngine from './templates.js';
import ThemeManager from './themes.js';

export default class AICoder {
  constructor() {
    this.codeGenerator = new CodeGenerator();
    this.templateEngine = new TemplateEngine();
    this.themeManager = new ThemeManager();
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
    const structure = this.generateStructure(name, type, pages);

    // Step 2: Generate code
    console.log(`🔧 Step 2: Generating code files...`);
    const codeFiles = this.codeGenerator.generateCode(structure, theme, features);

    // Step 3: Apply theme
    console.log(`🎨 Step 3: Applying theme "${theme}"...`);
    const themeStyles = this.themeManager.getThemeStyles(theme);

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
      codeFiles,
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
      files: Object.keys(website.codeFiles),
      createdAt: website.createdAt,
    };
  }

  /**
   * Generate website structure
   */
  generateStructure(name, type, pages) {
    return {
      name,
      type,
      pages: pages.map(page => ({
        name: page,
        template: this.templateEngine.getTemplate(page, type),
        route: `/${page === 'home' ? '' : page}`,
      })),
      navigation: this.generateNavigation(pages),
      footer: this.generateFooter(name),
    };
  }

  /**
   * Generate navigation menu
   */
  generateNavigation(pages) {
    return pages.map(page => ({
      name: page.charAt(0).toUpperCase() + page.slice(1),
      href: page === 'home' ? '/' : `/${page}`,
      active: page === 'home',
    }));
  }

  /**
   * Generate footer
   */
  generateFooter(siteName) {
    return {
      copyright: `© 2024 ${siteName}. All rights reserved.`,
      links: [
        { text: 'Privacy Policy', href: '#' },
        { text: 'Terms of Service', href: '#' },
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
    return this.templateEngine.getAllTemplates();
  }

  /**
   * Get available themes
   */
  getThemes() {
    return this.themeManager.getAllThemes();
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
    // Simplified - in production, use 'adm-zip' library
    return Buffer.from(`
Website: ${website.name}
Type: ${website.type}
Pages: ${website.pages.join(', ')}
Theme: ${website.theme}

Generated: ${website.createdAt}

Files:
${Object.keys(website.codeFiles).join('\n')}
    `);
  }
}
