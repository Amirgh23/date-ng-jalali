import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ALL_THEMES,
  ColorPalette,
  DEFAULT_DARK_PALETTE,
  DEFAULT_PALETTE,
  DEFAULT_THEME,
  PRESET_DARK_PALETTES,
  PRESET_PALETTES,
  ThemeConfig,
} from '../models/theme.model';

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
    if (typeof localStorage === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('jalali-datepicker-theme');
    const savedPalette = localStorage.getItem('jalali-datepicker-palette');

    // Theme is persisted primarily by name (string). We also accept the older JSON form.
    if (savedTheme) {
      try {
        let themeName: string | null = null;
        if (savedTheme.trim().startsWith('{')) {
          const parsed = JSON.parse(savedTheme) as Partial<ThemeConfig>;
          themeName = typeof parsed?.name === 'string' ? parsed.name : null;
        } else {
          themeName = savedTheme;
        }

        if (themeName) {
          const found = ALL_THEMES.find(t => t.name === themeName);
          if (found) {
            this.currentTheme.next(found);
          }
        }
      } catch {
        // If localStorage is corrupted, ignore and keep defaults.
      }
    }

    if (savedPalette) {
      try {
        const parsed = JSON.parse(savedPalette) as ColorPalette;
        if (parsed && typeof parsed.primary === 'string') {
          this.colorPalette.next(parsed);
        }
      } catch {
        // ignore
      }
    } else {
      // Ensure palette follows the theme by default.
      this.colorPalette.next(this.currentTheme.value.colors);
    }
  }

  /**
   * تنظیم تم
   */
  setTheme(theme: ThemeConfig) {
    this.currentTheme.next(theme);
    this.colorPalette.next(theme.colors);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jalali-datepicker-theme', theme.name);
      localStorage.setItem('jalali-datepicker-palette', JSON.stringify(theme.colors));
    }
  }

  /**
   * تنظیم پالت رنگی
   */
  setPalette(palette: ColorPalette) {
    this.colorPalette.next(palette);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jalali-datepicker-palette', JSON.stringify(palette));
    }
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
    return ALL_THEMES;
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
      const lightTheme = ALL_THEMES.find(t => t.name === 'light') || DEFAULT_THEME;
      this.setTheme(lightTheme);
    } else {
      // تغییر به تم تاریک
      const darkTheme = ALL_THEMES.find(t => t.name === 'dark') || {
        ...DEFAULT_THEME,
        name: 'dark',
        displayName: 'تم تاریک',
        isDark: true,
        colors: DEFAULT_DARK_PALETTE
      };
      this.setTheme(darkTheme);
    }
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
