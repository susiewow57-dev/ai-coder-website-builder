/**
 * AI CODER AGENT - Website Builder
 * Main server file
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Agent from './src/agent.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Agent
const agent = new Agent();

// Routes

/**
 * Home page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

/**
 * Generate website
 * POST /api/generate
 */
app.post('/api/generate', async (req, res) => {
  try {
    const { name, type, description, pages, theme, features } = req.body;

    console.log(`\n🤖 AI CODER: Generating website "${name}"...`);

    const result = await agent.generateWebsite({
      name,
      type,
      description,
      pages,
      theme,
      features,
    });

    res.json({
      success: true,
      message: 'Website generated successfully!',
      data: result,
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Get website code
 * GET /api/website/:id
 */
app.get('/api/website/:id', (req, res) => {
  try {
    const website = agent.getWebsite(req.params.id);
    if (!website) {
      return res.status(404).json({ success: false, error: 'Website not found' });
    }
    res.json({ success: true, data: website });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Get all generated websites
 * GET /api/websites
 */
app.get('/api/websites', (req, res) => {
  try {
    const websites = agent.getAllWebsites();
    res.json({ success: true, data: websites });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Get templates
 * GET /api/templates
 */
app.get('/api/templates', (req, res) => {
  const templates = agent.getTemplates();
  res.json({ success: true, templates });
});

/**
 * Get themes
 * GET /api/themes
 */
app.get('/api/themes', (req, res) => {
  const themes = agent.getThemes();
  res.json({ success: true, themes });
});

/**
 * Get features
 * GET /api/features
 */
app.get('/api/features', (req, res) => {
  const features = agent.getFeatures();
  res.json({ success: true, features });
});

/**
 * Health check
 * GET /health
 */
app.get('/health', (req, res) => {
  res.json({ status: '✅ AI CODER AGENT is active and ready!', timestamp: new Date() });
});

/**
 * Download website code
 * GET /api/download/:id
 */
app.get('/api/download/:id', (req, res) => {
  try {
    const website = agent.getWebsite(req.params.id);
    if (!website) {
      return res.status(404).json({ success: false, error: 'Website not found' });
    }

    const zipContent = agent.generateZipContent(website);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${website.name}.zip"`);
    res.send(zipContent);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║     🤖 AI CODER AGENT - Website Builder    ║
║                                            ║
║  Server running on: http://localhost:${PORT}  ║
║  API: http://localhost:${PORT}/api/generate   ║
║                                            ║
║  Status: ✅ Ready to generate websites!    ║
╚════════════════════════════════════════════╝
  `);
});
