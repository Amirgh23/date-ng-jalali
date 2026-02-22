import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeConfig, ColorPalette } from '../models/theme.model';

const DEFAULT_PALETTE: ColorPalette = {
  primary: '#3b82f6', secondary: '#6366f1', accent: '#f59e0b', background: '#ffffff',
  surface: '#f9fafb', text: '#1f2937', textSecondary: '#6b7280', border: '#e5e7eb',
  success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6'
};

const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: '#60a5fa', secondary: '#818cf8', accent: '#fbbf24', background: '#1f2937',
  surface: '#111827', text: '#f3f4f6', textSecondary: '#d1d5db', border: '#374151',
  success: '#34d399', warning: '#fcd34d', error: '#f87171', info: '#60a5fa'
};

const DEFAULT_THEME: ThemeConfig = { name: 'light', displayName: 'تم روشن', isDark: false, colors: DEFAULT_PALETTE };
const DARK_THEME: ThemeConfig = { name: 'dark', displayName: 'تم تاریک', isDark: true, colors: DEFAULT_DARK_PALETTE };
const ALL_THEMES: ThemeConfig[] = [DEFAULT_THEME, DARK_THEME];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeConfig>(DEFAULT_THEME);
  private colorPalette = new BehaviorSubject<ColorPalette>(DEFAULT_PALETTE);
  currentTheme$ = this.currentTheme.asObservable();
  colorPalette$ = this.colorPalette.asObservable();

  constructor() { this.loadThemeFromStorage(); }

  private loadThemeFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem('jalali-theme');
    if (saved) { const theme = ALL_THEMES.find(t => t.name === saved); if (theme) this.currentTheme.next(theme); }
  }

  getCurrentTheme(): ThemeConfig { return this.currentTheme.value; }
  setTheme(name: string): void {
    const theme = ALL_THEMES.find(t => t.name === name);
    if (theme) { this.currentTheme.next(theme); this.colorPalette.next(theme.colors); localStorage.setItem('jalali-theme', name); }
  }
  getCurrentPalette(): ColorPalette { return this.colorPalette.value; }
  setPalette(palette: ColorPalette): void { this.colorPalette.next(palette); }
  getThemes(): ThemeConfig[] { return ALL_THEMES; }
  getPresetPalettes(isDark = false): ColorPalette[] {
    return [isDark ? DEFAULT_DARK_PALETTE : DEFAULT_PALETTE,
      { primary: isDark ? '#34d399' : '#10b981', secondary: isDark ? '#10b981' : '#059669', accent: isDark ? '#fcd34d' : '#f59e0b', background: isDark ? '#1f2937' : '#ffffff', surface: isDark ? '#111827' : '#f9fafb', text: isDark ? '#f3f4f6' : '#1f2937', textSecondary: isDark ? '#d1d5db' : '#6b7280', border: isDark ? '#374151' : '#e5e7eb', success: isDark ? '#34d399' : '#10b981', warning: isDark ? '#fcd34d' : '#f59e0b', error: isDark ? '#f87171' : '#ef4444', info: isDark ? '#60a5fa' : '#3b82f6' },
      { primary: isDark ? '#f87171' : '#ef4444', secondary: isDark ? '#ef4444' : '#dc2626', accent: isDark ? '#fcd34d' : '#f59e0b', background: isDark ? '#1f2937' : '#ffffff', surface: isDark ? '#111827' : '#f9fafb', text: isDark ? '#f3f4f6' : '#1f2937', textSecondary: isDark ? '#d1d5db' : '#6b7280', border: isDark ? '#374151' : '#e5e7eb', success: isDark ? '#34d399' : '#10b981', warning: isDark ? '#fcd34d' : '#f59e0b', error: isDark ? '#f87171' : '#ef4444', info: isDark ? '#60a5fa' : '#3b82f6' }
    ];
  }
  toggleDarkMode(): void { const current = this.getCurrentTheme(); this.setTheme(current.isDark ? 'light' : 'dark'); }
  resetTheme(): void { this.setTheme('light'); this.setPalette(DEFAULT_PALETTE); }
}
