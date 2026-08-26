/**
 * Theme Manager
 * Manages website themes and color schemes
 */

export default class Theme {
  constructor() {
    this.themes = {
      modern: {
        name: 'Modern',
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        textColor: '#333',
        bgColor: '#ffffff',
      },
      dark: {
        name: 'Dark',
        primaryColor: '#1a1a1a',
        secondaryColor: '#333',
        textColor: '#fff',
        bgColor: '#0d0d0d',
      },
      ocean: {
        name: 'Ocean',
        primaryColor: '#0077be',
        secondaryColor: '#00b4d8',
        textColor: '#fff',
        bgColor: '#001d3d',
      },
      sunset: {
        name: 'Sunset',
        primaryColor: '#ff6b6b',
        secondaryColor: '#ffd93d',
        textColor: '#333',
        bgColor: '#fff5e6',
      },
      forest: {
        name: 'Forest',
        primaryColor: '#2d6a4f',
        secondaryColor: '#52b788',
        textColor: '#fff',
        bgColor: '#1b4332',
      },
      minimal: {
        name: 'Minimal',
        primaryColor: '#000000',
        secondaryColor: '#666',
        textColor: '#000',
        bgColor: '#ffffff',
      },
    };
  }

  getStyles(name) {
    return this.themes[name] || this.themes.modern;
  }

  getAll() {
    return Object.entries(this.themes).map(([key, theme]) => ({
      id: key,
      name: theme.name,
      colors: {
        primary: theme.primaryColor,
        secondary: theme.secondaryColor,
      },
    }));
  }
}
