import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeConfig, ColorPalette, THEMES, DEFAULT_THEME, DEFAULT_PALETTE, DEFAULT_DARK_PALETTE, PRESET_PALETTES, PRESET_DARK_PALETTES } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeConfig>(DEFAULT_THEME);
  private colorPalette = new BehaviorSubject<ColorPalette>(DEFAULT_PALETTE);

  currentTheme$: Observable<ThemeConfig> = this.currentTheme.asObservable();
  colorPalette$: Observable<ColorPalette> = this.colorPalette.asObservable();

  constructor() {
    this.loadSavedSettings();
  }

  /**
   * بارگذاری تنظیمات از localStorage
   */
  loadSavedSettings() {
    const savedTheme = localStorage.getItem('jalali-datepicker-theme');
    const savedPalette = localStorage.getItem('jalali-datepicker-palette');

    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        this.setTheme(parsed);
      } catch (error) {
        console.error('Invalid theme configuration in localStorage:', error);
      }
    }

    if (savedPalette) {
      try {
        const parsed = JSON.parse(savedPalette);
        this.setPalette(parsed);
      } catch (error) {
        console.error('Invalid color palette in localStorage:', error);
      }
    }
  }

  /**
   * تنظیم تم
   */
  setTheme(theme: ThemeConfig) {
    this.currentTheme.next(theme);
    localStorage.setItem('jalali-datepicker-theme', JSON.stringify(theme));
    this.applyTheme(theme);
  }

  /**
   * تنظیم پالت رنگی
   */
  setPalette(palette: ColorPalette) {
    this.colorPalette.next(palette);
    localStorage.setItem('jalali-datepicker-palette', JSON.stringify(palette));
    this.applyPalette(palette);
  }

  /**
   * دریافت تم فعلی
   */
  getCurrentTheme(): ThemeConfig {
    return this.currentTheme.value;
  }

  /**
   * دریافت پالت رنگ فعلی
   */
  getCurrentPalette(): ColorPalette {
    return this.colorPalette.value;
  }

  /**
   * دریافت لیست تم‌های پیشرفته
   */
  getThemes(): ThemeConfig[] {
    return THEMES;
  }

  /**
   * دریافت لیست پالت‌های رنگی
   */
  getPresetPalettes(isDark = false): ColorPalette[] {
    return isDark ? PRESET_DARK_PALETTES : PRESET_PALETTES;
  }

  /**
   * تغییر تم روشن/تاریک
   */
  toggleDarkMode(): void {
    const current = this.getCurrentTheme();
    if (current.isDark) {
      // تغییر به تم روشن
      const lightTheme = THEMES.find(t => t.name === 'light') || DEFAULT_THEME;
      this.setTheme(lightTheme);
      this.setPalette(DEFAULT_PALETTE);
    } else {
      // تغییر به تم تاریک
      const darkTheme = THEMES.find(t => t.name === 'dark') || {
        ...DEFAULT_THEME,
        name: 'dark',
        displayName: 'تم تاریک',
        isDark: true,
        colors: DEFAULT_DARK_PALETTE
      };
      this.setTheme(darkTheme);
      this.setPalette(DEFAULT_DARK_PALETTE);
    }
  }

  /**
   * اعمال تم به DOM
   */
  private applyTheme(theme: ThemeConfig) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.name);

    // اضافه/حذف کلاس dark-mode
    if (theme.isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // اعمال رنگ‌های تم به CSS variables
    this.applyPalette(theme.colors);
  }

  /**
   * اعمال رنگ‌ها به DOM
   */
  private applyPalette(palette: ColorPalette) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', palette.primary);
    root.style.setProperty('--secondary-color', palette.secondary);
    root.style.setProperty('--accent-color', palette.accent);
    root.style.setProperty('--background', palette.background);
    root.style.setProperty('--text-color', palette.text);
  }

  /**
   * تنظیم رنگ اصلی
   */
  setPrimaryColor(color: string) {
    const currentPalette = this.getCurrentPalette();
    this.setPalette({
      ...currentPalette,
      primary: color
    });
  }

  /**
   * تنظیم رنگ ثانویه
   */
  setSecondaryColor(color: string) {
    const currentPalette = this.getCurrentPalette();
    this.setPalette({
      ...currentPalette,
      secondary: color
    });
  }

  /**
   * تنظیم رنگ تأکیدی
   */
  setAccentColor(color: string) {
    const currentPalette = this.getCurrentPalette();
    this.setPalette({
      ...currentPalette,
      accent: color
    });
  }

  /**
   * دریافت پالت رنگ پیش‌فرض
   */
  getDefaultPalette(isDark = false): ColorPalette {
    return isDark ? DEFAULT_DARK_PALETTE : DEFAULT_PALETTE;
  }

  /**
   * ریست تنظیمات تم
   */
  resetTheme(): void {
    this.setTheme(DEFAULT_THEME);
    this.setPalette(DEFAULT_PALETTE);
  }
}
