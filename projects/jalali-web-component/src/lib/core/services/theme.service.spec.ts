import { ThemeService } from './theme.service';
import { ALL_THEMES, DEFAULT_THEME, DEFAULT_DARK_THEME_CONFIG } from './themes-data';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    service = new ThemeService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initialization', () => {
    it('should create service instance', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with default theme', () => {
      const theme = service.getCurrentTheme();
      expect(theme).toBeTruthy();
      expect(theme.name).toBeDefined();
    });

    it('should have current palette', () => {
      const palette = service.getCurrentPalette();
      expect(palette).toBeTruthy();
      expect(palette.primary).toBeDefined();
      expect(palette.secondary).toBeDefined();
    });
  });

  describe('Theme Management', () => {
    it('should get all themes', () => {
      const themes = service.getThemes();
      expect(themes.length).toBe(21);
      expect(themes).toEqual(ALL_THEMES);
    });

    it('should get all theme names', () => {
      const names = service.getThemeNames();
      expect(names.length).toBe(21);
      expect(names).toContain('light');
      expect(names).toContain('dark');
      expect(names).toContain('glassmorphism');
    });

    it('should get theme by name', () => {
      const theme = service.getTheme('light');
      expect(theme).toBeTruthy();
      expect(theme?.name).toBe('light');
      expect(theme?.isDark).toBe(false);
    });

    it('should return null for non-existent theme', () => {
      const theme = service.getTheme('non-existent');
      expect(theme).toBeNull();
    });

    it('should set theme by name', () => {
      service.setTheme('dark');
      const currentTheme = service.getCurrentTheme();
      expect(currentTheme.name).toBe('dark');
    });

    it('should not set invalid theme', () => {
      const originalTheme = service.getCurrentTheme();
      service.setTheme('invalid-theme');
      const currentTheme = service.getCurrentTheme();
      expect(currentTheme.name).toBe(originalTheme.name);
    });

    it('should persist theme to localStorage', () => {
      service.setTheme('glassmorphism');
      const stored = localStorage.getItem('jalali-theme-config');
      expect(stored).toBe(JSON.stringify('glassmorphism'));
    });

    it('should load theme from localStorage on initialization', () => {
      localStorage.setItem('jalali-theme-config', JSON.stringify('ocean'));
      const newService = new ThemeService();
      expect(newService.getCurrentTheme().name).toBe('ocean');
    });
  });

  describe('Color Palette', () => {
    it('should get current palette', () => {
      const palette = service.getCurrentPalette();
      expect(palette.primary).toBeDefined();
      expect(palette.secondary).toBeDefined();
      expect(palette.accent).toBeDefined();
      expect(palette.background).toBeDefined();
      expect(palette.surface).toBeDefined();
      expect(palette.text).toBeDefined();
      expect(palette.textSecondary).toBeDefined();
      expect(palette.border).toBeDefined();
      expect(palette.success).toBeDefined();
      expect(palette.warning).toBeDefined();
      expect(palette.error).toBeDefined();
      expect(palette.info).toBeDefined();
    });

    it('should set custom palette', () => {
      const customPalette = {
        primary: '#ff0000',
        secondary: '#00ff00',
        accent: '#0000ff',
        background: '#ffffff',
        surface: '#f0f0f0',
        text: '#000000',
        textSecondary: '#666666',
        border: '#cccccc',
        success: '#00ff00',
        warning: '#ffff00',
        error: '#ff0000',
        info: '#0000ff'
      };

      service.setPalette(customPalette);
      const palette = service.getCurrentPalette();
      expect(palette.primary).toBe('#ff0000');
      expect(palette.secondary).toBe('#00ff00');
    });

    it('should get color by key', () => {
      const color = service.getColor('primary');
      expect(color).toBeDefined();
      expect(typeof color).toBe('string');
    });

    it('should set color by key', () => {
      service.setColor('primary', '#ff0000');
      expect(service.getColor('primary')).toBe('#ff0000');
    });

    it('should get preset palettes for light themes', () => {
      const lightPalettes = service.getPresetPalettes(false);
      expect(lightPalettes.length).toBeGreaterThan(0);
      lightPalettes.forEach(palette => {
        const theme = ALL_THEMES.find(t => t.colors === palette);
        expect(theme?.isDark).toBe(false);
      });
    });

    it('should get preset palettes for dark themes', () => {
      const darkPalettes = service.getPresetPalettes(true);
      expect(darkPalettes.length).toBeGreaterThan(0);
      darkPalettes.forEach(palette => {
        const theme = ALL_THEMES.find(t => t.colors === palette);
        expect(theme?.isDark).toBe(true);
      });
    });
  });

  describe('Dark Mode', () => {
    it('should detect dark mode', () => {
      const isDark = service.isDark();
      expect(typeof isDark).toBe('boolean');
    });

    it('should toggle dark mode', () => {
      const initialDarkMode = service.isDark();
      service.toggleDarkMode();
      expect(service.isDark()).toBe(!initialDarkMode);
    });

    it('should set dark mode', () => {
      service.setDarkMode(true);
      expect(service.isDark()).toBe(true);

      service.setDarkMode(false);
      expect(service.isDark()).toBe(false);
    });

    it('should persist dark mode to localStorage', () => {
      service.setDarkMode(true);
      const stored = localStorage.getItem('jalali-dark-mode');
      expect(stored).toBe('true');

      service.setDarkMode(false);
      const stored2 = localStorage.getItem('jalali-dark-mode');
      expect(stored2).toBe('false');
    });

    it('should load dark mode from localStorage on initialization', () => {
      localStorage.setItem('jalali-dark-mode', 'true');
      const newService = new ThemeService();
      expect(newService.isDark()).toBe(true);
    });
  });

  describe('Theme Properties', () => {
    it('should check if theme is dark', () => {
      service.setTheme('dark');
      expect(service.isThemeDark()).toBe(true);

      service.setTheme('light');
      expect(service.isThemeDark()).toBe(false);
    });

    it('should get themes by dark mode flag', () => {
      const darkThemes = service.getThemesByDarkMode(true);
      expect(darkThemes.length).toBeGreaterThan(0);
      darkThemes.forEach(theme => {
        expect(theme.isDark).toBe(true);
      });

      const lightThemes = service.getThemesByDarkMode(false);
      expect(lightThemes.length).toBeGreaterThan(0);
      lightThemes.forEach(theme => {
        expect(theme.isDark).toBe(false);
      });
    });
  });

  describe('CSS Variables Generation', () => {
    it('should generate CSS variables string', () => {
      const cssVars = service.generateCSSVariables();
      expect(cssVars).toBeTruthy();
      expect(cssVars).toContain('--primary');
      expect(cssVars).toContain('--secondary');
      expect(cssVars).toContain('--accent');
    });

    it('should generate CSS variables object', () => {
      const cssVarsObj = service.generateCSSVariablesObject();
      expect(cssVarsObj).toBeTruthy();
      expect(cssVarsObj['--primary']).toBeDefined();
      expect(cssVarsObj['--secondary']).toBeDefined();
      expect(cssVarsObj['--accent']).toBeDefined();
    });

    it('should convert camelCase to kebab-case in CSS variables', () => {
      const cssVarsObj = service.generateCSSVariablesObject();
      expect(cssVarsObj['--text-secondary']).toBeDefined();
      expect(cssVarsObj['--text-secondary']).toBe(service.getColor('textSecondary'));
    });

    it('should get CSS variables string for style tag', () => {
      const cssString = service.getCSSVariablesString();
      expect(cssString).toContain(':root');
      expect(cssString).toContain('--primary');
    });

    it('should create style element with CSS variables', () => {
      const styleElement = service.createStyleElement();
      expect(styleElement).toBeInstanceOf(HTMLStyleElement);
      expect(styleElement.textContent).toContain(':root');
      expect(styleElement.textContent).toContain('--primary');
    });
  });

  describe('Theme Application', () => {
    it('should apply theme to element', () => {
      const element = document.createElement('div');
      service.setTheme('dark');
      service.applyThemeToElement(element);

      expect(element.getAttribute('data-theme')).toBe('dark');
      expect(element.getAttribute('data-dark-mode')).toBeDefined();
      expect(element.style.getPropertyValue('--primary')).toBeTruthy();
    });

    it('should apply theme to root element', () => {
      service.setTheme('glassmorphism');
      service.applyThemeToRoot();

      const root = document.documentElement;
      expect(root.getAttribute('data-theme')).toBe('glassmorphism');
      expect(root.style.getPropertyValue('--primary')).toBeTruthy();
    });

    it('should inject CSS variables into document', () => {
      service.injectCSSVariables();

      const styleElement = document.getElementById('jalali-theme-variables');
      expect(styleElement).toBeTruthy();
      expect(styleElement?.textContent).toContain(':root');
    });

    it('should replace existing CSS variables style element', () => {
      service.injectCSSVariables();
      const firstElement = document.getElementById('jalali-theme-variables');

      service.setTheme('dark');
      service.injectCSSVariables();
      const secondElement = document.getElementById('jalali-theme-variables');

      expect(firstElement).not.toBe(secondElement);
      expect(document.querySelectorAll('#jalali-theme-variables').length).toBe(1);
    });
  });

  describe('Theme Reset', () => {
    it('should reset theme to default', () => {
      service.setTheme('dark');
      service.resetTheme();

      const theme = service.getCurrentTheme();
      expect(theme.name).toBe(DEFAULT_THEME.name);
    });

    it('should clear stored theme', () => {
      service.setTheme('ocean');
      service.clearStoredTheme();

      expect(localStorage.getItem('jalali-theme-config')).toBeNull();
      expect(localStorage.getItem('jalali-dark-mode')).toBeNull();
    });
  });

  describe('Color Validation', () => {
    it('should validate valid color', () => {
      expect(service.isValidColor('#ff0000')).toBe(true);
      expect(service.isValidColor('red')).toBe(true);
      expect(service.isValidColor('rgb(255, 0, 0)')).toBe(true);
    });

    it('should reject invalid color', () => {
      expect(service.isValidColor('invalid-color')).toBe(false);
      expect(service.isValidColor('xyz')).toBe(false);
    });
  });

  describe('Contrast Color', () => {
    it('should get white contrast color for dark background', () => {
      const contrast = service.getContrastColor('#000000');
      expect(contrast).toBe('#ffffff');
    });

    it('should get black contrast color for light background', () => {
      const contrast = service.getContrastColor('#ffffff');
      expect(contrast).toBe('#000000');
    });

    it('should handle hex colors with and without hash', () => {
      const contrast1 = service.getContrastColor('#ff0000');
      const contrast2 = service.getContrastColor('ff0000');
      expect(contrast1).toBe(contrast2);
    });

    it('should calculate contrast for various colors', () => {
      const darkContrast = service.getContrastColor('#333333');
      const lightContrast = service.getContrastColor('#cccccc');

      expect(typeof darkContrast).toBe('string');
      expect(typeof lightContrast).toBe('string');
      expect(['#000000', '#ffffff']).toContain(darkContrast);
      expect(['#000000', '#ffffff']).toContain(lightContrast);
    });
  });

  describe('All 21 Themes', () => {
    it('should have all 21 themes available', () => {
      const themes = service.getThemes();
      expect(themes.length).toBe(21);
    });

    it('should be able to set each theme', () => {
      const themeNames = [
        'light', 'dark', 'scifi', 'glassmorphism', 'hud', 'win95', 'minimal',
        'aurora', 'desert', 'forest', 'ocean', 'sunset', 'midnight', 'luxury',
        'gradient', 'neon', 'terminal', 'monochrome', 'paper', 'pastel', 'rose'
      ];

      themeNames.forEach(name => {
        service.setTheme(name);
        expect(service.getCurrentTheme().name).toBe(name);
      });
    });

    it('should have valid color palettes for all themes', () => {
      const themes = service.getThemes();
      themes.forEach(theme => {
        expect(theme.colors.primary).toBeTruthy();
        expect(theme.colors.secondary).toBeTruthy();
        expect(theme.colors.accent).toBeTruthy();
        expect(theme.colors.background).toBeTruthy();
        expect(theme.colors.text).toBeTruthy();
      });
    });

    it('should have correct isDark flag for all themes', () => {
      const darkThemes = ['dark', 'scifi', 'hud', 'aurora', 'forest', 'ocean', 'midnight', 'luxury', 'neon', 'terminal'];
      const lightThemes = ['light', 'glassmorphism', 'win95', 'minimal', 'desert', 'sunset', 'gradient', 'monochrome', 'paper', 'pastel', 'rose'];

      darkThemes.forEach(name => {
        const theme = service.getTheme(name);
        expect(theme?.isDark).toBe(true);
      });

      lightThemes.forEach(name => {
        const theme = service.getTheme(name);
        expect(theme?.isDark).toBe(false);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle localStorage errors gracefully', () => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = jasmine.createSpy('setItem').and.throwError('Storage error');

      expect(() => {
        service.setTheme('dark');
      }).not.toThrow();

      Storage.prototype.setItem = originalSetItem;
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('jalali-theme-config', 'invalid-json');
      expect(() => {
        const newService = new ThemeService();
        expect(newService).toBeTruthy();
      }).not.toThrow();
    });

    it('should maintain palette consistency after theme change', () => {
      service.setTheme('dark');
      const darkPalette = service.getCurrentPalette();

      service.setTheme('light');
      const lightPalette = service.getCurrentPalette();

      expect(darkPalette).not.toEqual(lightPalette);
    });
  });

  describe('Integration Tests', () => {
    it('should work with multiple service instances', () => {
      const service1 = new ThemeService();
      const service2 = new ThemeService();

      service1.setTheme('dark');
      service2.setTheme('light');

      expect(service1.getCurrentTheme().name).toBe('dark');
      expect(service2.getCurrentTheme().name).toBe('light');
    });

    it('should sync theme across instances via localStorage', () => {
      const service1 = new ThemeService();
      service1.setTheme('ocean');

      const service2 = new ThemeService();
      expect(service2.getCurrentTheme().name).toBe('ocean');
    });

    it('should generate consistent CSS variables', () => {
      service.setTheme('glassmorphism');
      const vars1 = service.generateCSSVariablesObject();
      const vars2 = service.generateCSSVariablesObject();

      expect(vars1).toEqual(vars2);
    });
  });
});
