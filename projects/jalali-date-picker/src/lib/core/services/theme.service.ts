import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeConfig, ColorPalette } from '../models/theme.model';

// Define palettes directly here to avoid caching issues
const DEFAULT_PALETTE: ColorPalette = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  accent: '#f59e0b',
  background: '#ffffff',
  surface: '#f9fafb',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: '#60a5fa',
  secondary: '#818cf8',
  accent: '#fbbf24',
  background: '#1f2937',
  surface: '#111827',
  text: '#f3f4f6',
  textSecondary: '#d1d5db',
  border: '#374151',
  success: '#34d399',
  warning: '#fcd34d',
  error: '#f87171',
  info: '#60a5fa',
};

// Define all themes directly here
const ALL_THEMES: ThemeConfig[] = [
  { name: 'light', displayName: 'روشن', isDark: false, colors: DEFAULT_PALETTE },
  { name: 'dark', displayName: 'تاریک', isDark: true, colors: DEFAULT_DARK_PALETTE },
  {
    name: 'scifi',
    displayName: 'علمی-تخیلی',
    isDark: true,
    colors: {
      primary: '#00ff00',
      secondary: '#00ffff',
      accent: '#ff00ff',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#00ff00',
      textSecondary: '#00cc00',
      border: '#00ff00',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
      info: '#00ffff',
    },
  },
  {
    name: 'glassmorphism',
    displayName: 'شیشه‌ای',
    isDark: false,
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#f0f4f8',
      surface: 'rgba(255, 255, 255, 0.8)',
      text: '#1f2937',
      textSecondary: '#4b5563',
      border: 'rgba(255, 255, 255, 0.5)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  {
    name: 'hud',
    displayName: 'نمایشگر',
    isDark: true,
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#ffff00',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#00ff00',
      textSecondary: '#00cc00',
      border: '#00ff00',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
      info: '#00ffff',
    },
  },
  {
    name: 'win95',
    displayName: 'ویندوز ۹۵',
    isDark: false,
    colors: {
      primary: '#000080',
      secondary: '#0000ff',
      accent: '#ffff00',
      background: '#c0c0c0',
      surface: '#dfdfdf',
      text: '#000000',
      textSecondary: '#808080',
      border: '#dfdfdf',
      success: '#008000',
      warning: '#ff8000',
      error: '#ff0000',
      info: '#0000ff',
    },
  },
  {
    name: 'minimal',
    displayName: 'مینیمال',
    isDark: false,
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#000000',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
    },
  },
  {
    name: 'aurora',
    displayName: 'شفق',
    isDark: true,
    colors: {
      primary: '#00d084',
      secondary: '#00b8a9',
      accent: '#8338ec',
      background: '#0a1428',
      surface: '#1a2332',
      text: '#e0f7fa',
      textSecondary: '#b3e5fc',
      border: '#00d084',
      success: '#00d084',
      warning: '#ffd60a',
      error: '#ff006e',
      info: '#00b8a9',
    },
  },
  {
    name: 'desert',
    displayName: 'صحرا',
    isDark: false,
    colors: {
      primary: '#d4a574',
      secondary: '#c9a961',
      accent: '#e8b44f',
      background: '#f5e6d3',
      surface: '#ede0d9',
      text: '#5d4e37',
      textSecondary: '#8b7355',
      border: '#d4a574',
      success: '#6b8e23',
      warning: '#cd853f',
      error: '#a0522d',
      info: '#d4a574',
    },
  },
  {
    name: 'forest',
    displayName: 'جنگل',
    isDark: true,
    colors: {
      primary: '#2d5016',
      secondary: '#3d5a1f',
      accent: '#7cb342',
      background: '#1b2d1f',
      surface: '#243329',
      text: '#c8e6c9',
      textSecondary: '#a5d6a7',
      border: '#558b2f',
      success: '#7cb342',
      warning: '#fbc02d',
      error: '#e53935',
      info: '#558b2f',
    },
  },
  {
    name: 'ocean',
    displayName: 'اقیانوس',
    isDark: true,
    colors: {
      primary: '#0277bd',
      secondary: '#01579b',
      accent: '#00bcd4',
      background: '#01579b',
      surface: '#0d47a1',
      text: '#b3e5fc',
      textSecondary: '#81d4fa',
      border: '#00bcd4',
      success: '#26a69a',
      warning: '#fbc02d',
      error: '#ef5350',
      info: '#00bcd4',
    },
  },
  {
    name: 'sunset',
    displayName: 'غروب',
    isDark: false,
    colors: {
      primary: '#ff6b6b',
      secondary: '#ff8c42',
      accent: '#ffd93d',
      background: '#fff5e1',
      surface: '#ffe8cc',
      text: '#6d3c1b',
      textSecondary: '#a0522d',
      border: '#ff8c42',
      success: '#6bcf7f',
      warning: '#ff8c42',
      error: '#ff6b6b',
      info: '#ff8c42',
    },
  },
  {
    name: 'midnight',
    displayName: 'نیمه‌شب',
    isDark: true,
    colors: {
      primary: '#1a237e',
      secondary: '#283593',
      accent: '#3f51b5',
      background: '#0d0d2b',
      surface: '#1a1a3e',
      text: '#e0e0ff',
      textSecondary: '#b0b0ff',
      border: '#3f51b5',
      success: '#66bb6a',
      warning: '#ffa726',
      error: '#ef5350',
      info: '#42a5f5',
    },
  },
  {
    name: 'luxury',
    displayName: 'لوکس',
    isDark: true,
    colors: {
      primary: '#d4af37',
      secondary: '#aa8c2c',
      accent: '#ffd700',
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#f5f5f5',
      textSecondary: '#d4af37',
      border: '#d4af37',
      success: '#66bb6a',
      warning: '#ffa726',
      error: '#ef5350',
      info: '#42a5f5',
    },
  },
  {
    name: 'gradient',
    displayName: 'گرادیانت',
    isDark: false,
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      background: '#f5f7fa',
      surface: '#ffffff',
      text: '#2d3748',
      textSecondary: '#718096',
      border: '#e2e8f0',
      success: '#48bb78',
      warning: '#ed8936',
      error: '#f56565',
      info: '#4299e1',
    },
  },
  {
    name: 'neon',
    displayName: 'نئون',
    isDark: true,
    colors: {
      primary: '#ff006e',
      secondary: '#00f5ff',
      accent: '#ffbe0b',
      background: '#0a0e27',
      surface: '#16213e',
      text: '#00f5ff',
      textSecondary: '#ffbe0b',
      border: '#ff006e',
      success: '#00ff00',
      warning: '#ffbe0b',
      error: '#ff006e',
      info: '#00f5ff',
    },
  },
  {
    name: 'terminal',
    displayName: 'ترمینال',
    isDark: true,
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#ffff00',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#00ff00',
      textSecondary: '#00cc00',
      border: '#00ff00',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
      info: '#00ffff',
    },
  },
  {
    name: 'monochrome',
    displayName: 'تک‌رنگ',
    isDark: false,
    colors: {
      primary: '#333333',
      secondary: '#666666',
      accent: '#999999',
      background: '#ffffff',
      surface: '#f0f0f0',
      text: '#000000',
      textSecondary: '#666666',
      border: '#cccccc',
      success: '#333333',
      warning: '#666666',
      error: '#000000',
      info: '#333333',
    },
  },
  {
    name: 'paper',
    displayName: 'کاغذی',
    isDark: false,
    colors: {
      primary: '#8b7355',
      secondary: '#a0826d',
      accent: '#c9a961',
      background: '#fef9f3',
      surface: '#faf6f1',
      text: '#3e2723',
      textSecondary: '#5d4037',
      border: '#d7ccc8',
      success: '#558b2f',
      warning: '#f57f17',
      error: '#c62828',
      info: '#01579b',
    },
  },
  {
    name: 'pastel',
    displayName: 'پاستلی',
    isDark: false,
    colors: {
      primary: '#b19cd9',
      secondary: '#ffb3ba',
      accent: '#ffffba',
      background: '#fffacd',
      surface: '#fff9e6',
      text: '#5a5a5a',
      textSecondary: '#8a8a8a',
      border: '#e6d9f0',
      success: '#baffc9',
      warning: '#ffffba',
      error: '#ffb3ba',
      info: '#bae1ff',
    },
  },
  {
    name: 'rose',
    displayName: 'گل رز',
    isDark: false,
    colors: {
      primary: '#e91e63',
      secondary: '#c2185b',
      accent: '#f06292',
      background: '#fce4ec',
      surface: '#f8bbd0',
      text: '#880e4f',
      textSecondary: '#ad1457',
      border: '#f48fb1',
      success: '#66bb6a',
      warning: '#ffa726',
      error: '#e91e63',
      info: '#42a5f5',
    },
  },
];

const DEFAULT_THEME = ALL_THEMES[0];
const DEFAULT_DARK_THEME_CONFIG = ALL_THEMES[1];

// Injection token for default theme configuration
export interface JalaliThemeConfig {
  defaultTheme?: string;
  storageKey?: string;
  enablePersistence?: boolean;
}

export const JALALI_THEME_CONFIG = new InjectionToken<JalaliThemeConfig>('JALALI_THEME_CONFIG');

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeConfig>(DEFAULT_THEME);
  private colorPalette = new BehaviorSubject<ColorPalette>(DEFAULT_PALETTE);
  currentTheme$ = this.currentTheme.asObservable();
  colorPalette$ = this.colorPalette.asObservable();

  private storageKey: string;
  private enablePersistence: boolean;

  constructor(@Optional() @Inject(JALALI_THEME_CONFIG) private config?: JalaliThemeConfig) {
    console.log('🚀 ThemeService constructor - ALL_THEMES.length:', ALL_THEMES.length);
    console.log(
      '🚀 ThemeService constructor - Theme names:',
      ALL_THEMES.map((t) => t.name),
    );
    this.storageKey = config?.storageKey || 'jalali-theme';
    this.enablePersistence = config?.enablePersistence !== false; // default true
    this.loadThemeFromStorage();
  }

  private loadThemeFromStorage(): void {
    // First, try to load from localStorage (user's last selection)
    if (this.enablePersistence && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const theme = ALL_THEMES.find((t) => t.name === saved);
        if (theme) {
          this.currentTheme.next(theme);
          this.colorPalette.next(theme.colors);
          return;
        }
      }
    }

    // If no saved theme, use developer's default theme from config
    if (this.config?.defaultTheme) {
      const theme = ALL_THEMES.find((t) => t.name === this.config.defaultTheme);
      if (theme) {
        this.currentTheme.next(theme);
        this.colorPalette.next(theme.colors);
        return;
      }
    }

    // Otherwise, use the library's default theme
    this.currentTheme.next(DEFAULT_THEME);
    this.colorPalette.next(DEFAULT_PALETTE);
  }

  getCurrentTheme(): ThemeConfig {
    return this.currentTheme.value;
  }

  setTheme(name: string): void {
    const theme = ALL_THEMES.find((t) => t.name === name);
    if (theme) {
      this.currentTheme.next(theme);
      this.colorPalette.next(theme.colors);

      // Save to localStorage if persistence is enabled
      if (this.enablePersistence && typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, name);
      }
    }
  }

  getCurrentPalette(): ColorPalette {
    return this.colorPalette.value;
  }

  setPalette(palette: ColorPalette): void {
    this.colorPalette.next(palette);
  }

  getThemes(): ThemeConfig[] {
    console.log('🔍 getThemes called - ALL_THEMES:', ALL_THEMES);
    console.log('🔍 getThemes called - ALL_THEMES.length:', ALL_THEMES.length);
    console.log(
      '🔍 getThemes called - Theme names:',
      ALL_THEMES.map((t) => t.name),
    );
    return ALL_THEMES;
  }

  getPresetPalettes(isDark = false): ColorPalette[] {
    return [
      isDark ? DEFAULT_DARK_PALETTE : DEFAULT_PALETTE,
      {
        primary: isDark ? '#34d399' : '#10b981',
        secondary: isDark ? '#10b981' : '#059669',
        accent: isDark ? '#fcd34d' : '#f59e0b',
        background: isDark ? '#1f2937' : '#ffffff',
        surface: isDark ? '#111827' : '#f9fafb',
        text: isDark ? '#f3f4f6' : '#1f2937',
        textSecondary: isDark ? '#d1d5db' : '#6b7280',
        border: isDark ? '#374151' : '#e5e7eb',
        success: isDark ? '#34d399' : '#10b981',
        warning: isDark ? '#fcd34d' : '#f59e0b',
        error: isDark ? '#f87171' : '#ef4444',
        info: isDark ? '#60a5fa' : '#3b82f6',
      },
      {
        primary: isDark ? '#f87171' : '#ef4444',
        secondary: isDark ? '#ef4444' : '#dc2626',
        accent: isDark ? '#fcd34d' : '#f59e0b',
        background: isDark ? '#1f2937' : '#ffffff',
        surface: isDark ? '#111827' : '#f9fafb',
        text: isDark ? '#f3f4f6' : '#1f2937',
        textSecondary: isDark ? '#d1d5db' : '#6b7280',
        border: isDark ? '#374151' : '#e5e7eb',
        success: isDark ? '#34d399' : '#10b981',
        warning: isDark ? '#fcd34d' : '#f59e0b',
        error: isDark ? '#f87171' : '#ef4444',
        info: isDark ? '#60a5fa' : '#3b82f6',
      },
      {
        primary: isDark ? '#818cf8' : '#6366f1',
        secondary: isDark ? '#a78bfa' : '#8b5cf6',
        accent: isDark ? '#fcd34d' : '#f59e0b',
        background: isDark ? '#1f2937' : '#ffffff',
        surface: isDark ? '#111827' : '#f9fafb',
        text: isDark ? '#f3f4f6' : '#1f2937',
        textSecondary: isDark ? '#d1d5db' : '#6b7280',
        border: isDark ? '#374151' : '#e5e7eb',
        success: isDark ? '#34d399' : '#10b981',
        warning: isDark ? '#fcd34d' : '#f59e0b',
        error: isDark ? '#f87171' : '#ef4444',
        info: isDark ? '#60a5fa' : '#3b82f6',
      },
    ];
  }

  toggleDarkMode(): void {
    const current = this.getCurrentTheme();
    this.setTheme(current.isDark ? 'light' : 'dark');
  }

  resetTheme(): void {
    // Reset to developer's default or library default
    const defaultThemeName = this.config?.defaultTheme || 'light';
    this.setTheme(defaultThemeName);

    const theme = ALL_THEMES.find((t) => t.name === defaultThemeName);
    if (theme) {
      this.setPalette(theme.colors);
    }
  }

  clearStoredTheme(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }
}
