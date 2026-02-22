# راهنمای جامع پیاده‌سازی سیستم استایل‌دهی مشابه PrimeNG
## برای کتابخانه تقویم جلالی Angular

---

## فهرست مطالب

1. [معماری کلی](#معماری-کلی)
2. [ساختار فایل‌ها و پوشه‌ها](#ساختار-فایل‌ها)
3. [حالت استایل‌دار (Styled Mode)](#حالت-استایل‌دار)
4. [حالت بدون استایل (Unstyled Mode)](#حالت-بدون-استایل)
5. [Pass Through API](#pass-through-api)
6. [تم‌بندی پویا (Dynamic Theming)](#تم‌بندی-پویا)
7. [CSS Layers](#css-layers)
8. [مثال‌های کاربردی](#مثال‌های-کاربردی)

---

## معماری کلی

### نمای کلی سیستم

```
jalali-date-picker/
├── src/
│   ├── lib/
│   │   ├── themes/                    # تم‌های از پیش تعریف شده
│   │   │   ├── base/                  # استایل‌های پایه
│   │   │   ├── lara-light/            # تم روشن پیشفرض
│   │   │   ├── lara-dark/             # تم تاریک پیشفرض
│   │   │   └── ...                    # تم‌های دیگر
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── theme.model.ts     # مدل‌های تم
│   │   │   ├── services/
│   │   │   │   └── theme.service.ts   # سرویس مدیریت تم
│   │   │   └── config/
│   │   │       └── primeng-config.ts  # تنظیمات سراسری
│   │   └── components/
│   │       └── calendar/
│   │           ├── calendar.component.ts
│   │           └── calendar.component.scss
│   └── public-api.ts
```

---

## ساختار فایل‌ها

### 1. ساختار پوشه themes

```
themes/
├── base/
│   ├── _variables.scss              # متغیرهای پایه
│   ├── _mixins.scss                 # Mixins مشترک
│   ├── _reset.scss                  # Reset CSS
│   └── _typography.scss             # تایپوگرافی
├── lara-light/
│   ├── theme.scss                   # فایل اصلی تم
│   ├── _variables.scss              # متغیرهای تم
│   └── components/
│       ├── _calendar.scss           # استایل تقویم
│       ├── _datepicker.scss         # استایل date picker
│       └── _common.scss             # استایل‌های مشترک
├── lara-dark/
│   └── ...                          # مشابه lara-light
└── index.scss                       # Export تمام تم‌ها
```

---

## حالت استایل‌دار

### مرحله 1: تعریف متغیرهای پایه

**فایل: `themes/base/_variables.scss`**

```scss
// Primary Colors
$primaryColor: #3B82F6 !default;
$primaryLightColor: #BFDBFE !default;
$primaryDarkColor: #1E40AF !default;
$primaryTextColor: #ffffff !default;

// Surface Colors
$surfaceColor: #ffffff !default;
$surfaceHoverColor: #f8fafc !default;
$surfaceActiveColor: #f1f5f9 !default;

// Text Colors
$textColor: #1e293b !default;
$textSecondaryColor: #64748b !default;
$textMutedColor: #94a3b8 !default;

// Border Colors
$borderColor: #e2e8f0 !default;
$borderRadius: 6px !default;

// State Colors
$successColor: #10b981 !default;
$warningColor: #f59e0b !default;
$errorColor: #ef4444 !default;
$infoColor: #3b82f6 !default;

// Spacing
$spacing-xs: 0.25rem !default;
$spacing-sm: 0.5rem !default;
$spacing-md: 1rem !default;
$spacing-lg: 1.5rem !default;
$spacing-xl: 2rem !default;

// Typography
$fontSize: 1rem !default;
$fontFamily: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !default;
$fontWeight: 400 !default;

// Shadows
$shadowSm: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !default;
$shadowMd: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !default;
$shadowLg: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !default;

// Transitions
$transitionDuration: 0.2s !default;
$transitionTimingFunction: cubic-bezier(0.4, 0, 0.2, 1) !default;

// Z-index
$zIndexDropdown: 1000 !default;
$zIndexModal: 1100 !default;
$zIndexTooltip: 1200 !default;
```

### مرحله 2: تبدیل به CSS Custom Properties

**فایل: `themes/base/_css-variables.scss`**

```scss
@use 'variables' as *;

:root {
  // Primary Colors
  --primary-color: #{$primaryColor};
  --primary-light-color: #{$primaryLightColor};
  --primary-dark-color: #{$primaryDarkColor};
  --primary-text-color: #{$primaryTextColor};

  // Surface Colors
  --surface-color: #{$surfaceColor};
  --surface-hover-color: #{$surfaceHoverColor};
  --surface-active-color: #{$surfaceActiveColor};

  // Text Colors
  --text-color: #{$textColor};
  --text-secondary-color: #{$textSecondaryColor};
  --text-muted-color: #{$textMutedColor};

  // Border
  --border-color: #{$borderColor};
  --border-radius: #{$borderRadius};

  // State Colors
  --success-color: #{$successColor};
  --warning-color: #{$warningColor};
  --error-color: #{$errorColor};
  --info-color: #{$infoColor};

  // Spacing
  --spacing-xs: #{$spacing-xs};
  --spacing-sm: #{$spacing-sm};
  --spacing-md: #{$spacing-md};
  --spacing-lg: #{$spacing-lg};
  --spacing-xl: #{$spacing-xl};

  // Typography
  --font-size: #{$fontSize};
  --font-family: #{$fontFamily};
  --font-weight: #{$fontWeight};

  // Shadows
  --shadow-sm: #{$shadowSm};
  --shadow-md: #{$shadowMd};
  --shadow-lg: #{$shadowLg};

  // Transitions
  --transition-duration: #{$transitionDuration};
  --transition-timing-function: #{$transitionTimingFunction};

  // Z-index
  --z-index-dropdown: #{$zIndexDropdown};
  --z-index-modal: #{$zIndexModal};
  --z-index-tooltip: #{$zIndexTooltip};
}
```

### مرحله 3: ایجاد تم Lara Light

**فایل: `themes/lara-light/theme.scss`**

```scss
@use '../base/variables' as base;
@use '../base/css-variables';
@use '../base/reset';
@use '../base/typography';

// Override variables for Lara Light
$primaryColor: #3B82F6;
$surfaceColor: #ffffff;
$textColor: #1e293b;

// Import component styles
@use 'components/calendar';
@use 'components/datepicker';
@use 'components/common';

// CSS Layer for better specificity control
@layer jalali-calendar {
  @include css-variables.generate();
  @include reset.apply();
  @include typography.apply();
}
```

### مرحله 4: استایل کامپوننت تقویم

**فایل: `themes/lara-light/components/_calendar.scss`**

```scss
.p-jalali-calendar {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);

  // Header
  .p-calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: var(--spacing-md);
  }

  .p-calendar-title {
    font-weight: 600;
    color: var(--text-color);
  }

  .p-calendar-nav-button {
    background: transparent;
    border: none;
    color: var(--text-secondary-color);
    cursor: pointer;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    transition: all var(--transition-duration) var(--transition-timing-function);

    &:hover {
      background: var(--surface-hover-color);
      color: var(--primary-color);
    }

    &:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  // Days Grid
  .p-calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-xs);
  }

  .p-calendar-day-header {
    text-align: center;
    font-weight: 600;
    color: var(--text-secondary-color);
    padding: var(--spacing-sm);
    font-size: 0.875rem;
  }

  .p-calendar-day {
    text-align: center;
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-duration) var(--transition-timing-function);
    position: relative;

    &:hover:not(.p-disabled):not(.p-selected) {
      background: var(--surface-hover-color);
    }

    &.p-selected {
      background: var(--primary-color);
      color: var(--primary-text-color);
      font-weight: 600;
    }

    &.p-today {
      border: 2px solid var(--primary-color);
    }

    &.p-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &.p-other-month {
      color: var(--text-muted-color);
    }

    &:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  }

  // Range Selection
  .p-calendar-day.p-range-start {
    background: var(--primary-color);
    color: var(--primary-text-color);
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  .p-calendar-day.p-range-end {
    background: var(--primary-color);
    color: var(--primary-text-color);
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  .p-calendar-day.p-in-range {
    background: var(--primary-light-color);
    color: var(--primary-dark-color);
  }
}
```

---


## حالت بدون استایل

### مرحله 1: تعریف مدل PassThrough

**فایل: `core/models/passthrough.model.ts`**

```typescript
export interface PassThroughOptions {
  /**
   * استایل‌های inline
   */
  style?: { [key: string]: any };
  
  /**
   * کلاس‌های CSS
   */
  class?: string | string[] | { [key: string]: boolean };
  
  /**
   * Attributes اضافی
   */
  attrs?: { [key: string]: any };
}

export interface CalendarPassThroughOptions {
  /**
   * المان ریشه
   */
  root?: PassThroughOptions;
  
  /**
   * هدر تقویم
   */
  header?: PassThroughOptions;
  
  /**
   * عنوان تقویم
   */
  title?: PassThroughOptions;
  
  /**
   * دکمه‌های ناوبری
   */
  navButton?: PassThroughOptions;
  
  /**
   * دکمه قبلی
   */
  prevButton?: PassThroughOptions;
  
  /**
   * دکمه بعدی
   */
  nextButton?: PassThroughOptions;
  
  /**
   * گرید روزها
   */
  daysGrid?: PassThroughOptions;
  
  /**
   * هدر روزها
   */
  dayHeader?: PassThroughOptions;
  
  /**
   * سلول روز
   */
  day?: PassThroughOptions;
  
  /**
   * روز انتخاب شده
   */
  selectedDay?: PassThroughOptions;
  
  /**
   * روز امروز
   */
  today?: PassThroughOptions;
  
  /**
   * روز غیرفعال
   */
  disabledDay?: PassThroughOptions;
  
  /**
   * روز ماه دیگر
   */
  otherMonthDay?: PassThroughOptions;
}
```

### مرحله 2: پیاده‌سازی در کامپوننت

**فایل: `components/calendar/calendar.component.ts`**

```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CalendarPassThroughOptions, PassThroughOptions } from '../../core/models/passthrough.model';

@Component({
  selector: 'p-jalali-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JalaliCalendarComponent {
  /**
   * حالت استایل‌دهی
   * - 'styled': استفاده از تم‌های پیشفرض
   * - 'unstyled': بدون استایل پیشفرض
   */
  @Input() styleMode: 'styled' | 'unstyled' = 'styled';
  
  /**
   * استایل inline برای المان ریشه
   */
  @Input() style?: { [key: string]: any };
  
  /**
   * کلاس CSS برای المان ریشه
   */
  @Input() styleClass?: string;
  
  /**
   * Pass Through Options
   */
  @Input() pt?: CalendarPassThroughOptions;
  
  /**
   * دریافت استایل برای یک المان خاص
   */
  getElementStyle(elementKey: keyof CalendarPassThroughOptions): any {
    if (this.styleMode === 'unstyled' && this.pt && this.pt[elementKey]) {
      return this.pt[elementKey]?.style;
    }
    return null;
  }
  
  /**
   * دریافت کلاس برای یک المان خاص
   */
  getElementClass(elementKey: keyof CalendarPassThroughOptions): string {
    const baseClass = this.styleMode === 'styled' ? `p-calendar-${elementKey}` : '';
    const ptClass = this.pt && this.pt[elementKey]?.class;
    
    if (!ptClass) return baseClass;
    
    if (typeof ptClass === 'string') {
      return `${baseClass} ${ptClass}`.trim();
    }
    
    if (Array.isArray(ptClass)) {
      return `${baseClass} ${ptClass.join(' ')}`.trim();
    }
    
    if (typeof ptClass === 'object') {
      const classes = Object.keys(ptClass).filter(key => ptClass[key]);
      return `${baseClass} ${classes.join(' ')}`.trim();
    }
    
    return baseClass;
  }
  
  /**
   * دریافت attributes برای یک المان خاص
   */
  getElementAttrs(elementKey: keyof CalendarPassThroughOptions): any {
    if (this.styleMode === 'unstyled' && this.pt && this.pt[elementKey]) {
      return this.pt[elementKey]?.attrs;
    }
    return null;
  }
}
```

### مرحله 3: استفاده در Template

**فایل: `components/calendar/calendar.component.html`**

```html
<div 
  [class]="getElementClass('root')"
  [style]="style || getElementStyle('root')"
  [attr.data-pc-name]="'calendar'"
  [attr.data-pc-section]="'root'">
  
  <!-- Header -->
  <div 
    [class]="getElementClass('header')"
    [style]="getElementStyle('header')"
    [attr.data-pc-section]="'header'">
    
    <!-- Previous Button -->
    <button
      type="button"
      [class]="getElementClass('prevButton')"
      [style]="getElementStyle('prevButton')"
      (click)="previousMonth()"
      [attr.aria-label]="'ماه قبلی'">
      ←
    </button>
    
    <!-- Title -->
    <span
      [class]="getElementClass('title')"
      [style]="getElementStyle('title')">
      {{ currentMonthName }} {{ currentYear }}
    </span>
    
    <!-- Next Button -->
    <button
      type="button"
      [class]="getElementClass('nextButton')"
      [style]="getElementStyle('nextButton')"
      (click)="nextMonth()"
      [attr.aria-label]="'ماه بعدی'">
      →
    </button>
  </div>
  
  <!-- Days Grid -->
  <div 
    [class]="getElementClass('daysGrid')"
    [style]="getElementStyle('daysGrid')"
    [attr.data-pc-section]="'daysGrid'">
    
    <!-- Day Headers -->
    <div
      *ngFor="let dayName of dayNames"
      [class]="getElementClass('dayHeader')"
      [style]="getElementStyle('dayHeader')">
      {{ dayName }}
    </div>
    
    <!-- Days -->
    <div
      *ngFor="let day of days"
      [class]="getDayClass(day)"
      [style]="getElementStyle('day')"
      (click)="selectDay(day)"
      [attr.aria-selected]="day.selected"
      [attr.aria-disabled]="day.disabled">
      {{ day.value }}
    </div>
  </div>
</div>
```

---

## Pass Through API

### مثال استفاده با Tailwind CSS

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-demo',
  template: `
    <p-jalali-calendar
      styleMode="unstyled"
      [pt]="{
        root: {
          class: 'bg-white rounded-lg shadow-lg p-4'
        },
        header: {
          class: 'flex justify-between items-center mb-4 pb-2 border-b'
        },
        title: {
          class: 'text-lg font-semibold text-gray-800'
        },
        navButton: {
          class: 'px-3 py-1 rounded hover:bg-gray-100 transition-colors'
        },
        daysGrid: {
          class: 'grid grid-cols-7 gap-1'
        },
        dayHeader: {
          class: 'text-center font-medium text-gray-600 text-sm py-2'
        },
        day: {
          class: 'text-center py-2 rounded cursor-pointer hover:bg-blue-50 transition-colors'
        },
        selectedDay: {
          class: 'bg-blue-500 text-white font-semibold'
        },
        today: {
          class: 'border-2 border-blue-500'
        },
        disabledDay: {
          class: 'opacity-50 cursor-not-allowed pointer-events-none'
        }
      }">
    </p-jalali-calendar>
  `
})
export class CalendarDemoComponent {}
```

### مثال استفاده با PrimeFlex

```typescript
@Component({
  selector: 'app-calendar-demo',
  template: `
    <p-jalali-calendar
      styleMode="unstyled"
      [pt]="{
        root: {
          class: 'surface-card border-round shadow-2 p-3'
        },
        header: {
          class: 'flex justify-content-between align-items-center mb-3 pb-2 border-bottom-1 surface-border'
        },
        title: {
          class: 'text-xl font-semibold text-900'
        },
        navButton: {
          class: 'p-2 border-round hover:surface-hover transition-colors transition-duration-150'
        },
        daysGrid: {
          class: 'grid'
        },
        day: {
          class: 'text-center p-2 border-round cursor-pointer hover:surface-100 transition-all transition-duration-150'
        },
        selectedDay: {
          class: 'bg-primary text-primary-contrast font-semibold'
        }
      }">
    </p-jalali-calendar>
  `
})
export class CalendarDemoComponent {}
```

---

## تم‌بندی پویا

### مرحله 1: سرویس مدیریت تم

**فایل: `core/services/theme.service.ts`**

```typescript
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Theme {
  name: string;
  displayName: string;
  cssFile: string;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<Theme | null>(null);
  private themeLink: HTMLLinkElement | null = null;
  
  private availableThemes: Theme[] = [
    {
      name: 'lara-light-blue',
      displayName: 'Lara Light Blue',
      cssFile: 'lara-light-blue.css',
      isDark: false
    },
    {
      name: 'lara-dark-blue',
      displayName: 'Lara Dark Blue',
      cssFile: 'lara-dark-blue.css',
      isDark: true
    },
    {
      name: 'lara-light-green',
      displayName: 'Lara Light Green',
      cssFile: 'lara-light-green.css',
      isDark: false
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }
  
  /**
   * دریافت تم فعلی
   */
  getCurrentTheme(): Observable<Theme | null> {
    return this.currentTheme$.asObservable();
  }
  
  /**
   * دریافت لیست تم‌های موجود
   */
  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }
  
  /**
   * تغییر تم
   */
  switchTheme(themeName: string): void {
    const theme = this.availableThemes.find(t => t.name === themeName);
    
    if (!theme) {
      console.error(`Theme "${themeName}" not found`);
      return;
    }
    
    if (isPlatformBrowser(this.platformId)) {
      this.loadTheme(theme);
      this.saveThemePreference(themeName);
      this.currentTheme$.next(theme);
    }
  }
  
  /**
   * بارگذاری فایل CSS تم
   */
  private loadTheme(theme: Theme): void {
    const head = document.getElementsByTagName('head')[0];
    
    // حذف لینک قبلی
    if (this.themeLink) {
      head.removeChild(this.themeLink);
    }
    
    // ایجاد لینک جدید
    this.themeLink = document.createElement('link');
    this.themeLink.rel = 'stylesheet';
    this.themeLink.type = 'text/css';
    this.themeLink.href = `assets/themes/${theme.cssFile}`;
    this.themeLink.id = 'jalali-calendar-theme';
    
    head.appendChild(this.themeLink);
  }
  
  /**
   * ذخیره تنظیمات تم
   */
  private saveThemePreference(themeName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jalali-calendar-theme', themeName);
    }
  }
  
  /**
   * بارگذاری تنظیمات ذخیره شده
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('jalali-calendar-theme');
    
    if (savedTheme) {
      this.switchTheme(savedTheme);
    } else {
      // تم پیشفرض
      this.switchTheme('lara-light-blue');
    }
  }
  
  /**
   * تغییر متغیرهای CSS در زمان اجرا
   */
  updateCSSVariable(variable: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.setProperty(variable, value);
    }
  }
  
  /**
   * دریافت مقدار متغیر CSS
   */
  getCSSVariable(variable: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variable);
    }
    return '';
  }
}
```

### مرحله 2: کامپوننت انتخاب تم

```typescript
import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../core/services/theme.service';

@Component({
  selector: 'p-theme-selector',
  template: `
    <div class="theme-selector">
      <label for="theme-select">انتخاب تم:</label>
      <select 
        id="theme-select"
        [(ngModel)]="selectedTheme"
        (change)="onThemeChange()">
        <option 
          *ngFor="let theme of themes" 
          [value]="theme.name">
          {{ theme.displayName }}
        </option>
      </select>
    </div>
  `
})
export class ThemeSelectorComponent implements OnInit {
  themes: Theme[] = [];
  selectedTheme: string = '';
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themes = this.themeService.getAvailableThemes();
    
    this.themeService.getCurrentTheme().subscribe(theme => {
      if (theme) {
        this.selectedTheme = theme.name;
      }
    });
  }
  
  onThemeChange() {
    this.themeService.switchTheme(this.selectedTheme);
  }
}
```

---

## CSS Layers

### استفاده از CSS Layers

**فایل: `themes/lara-light/theme.scss`**

```scss
// تعریف لایه‌ها
@layer jalali-calendar.base, jalali-calendar.components, jalali-calendar.utilities;

// لایه پایه
@layer jalali-calendar.base {
  @use '../base/reset';
  @use '../base/typography';
  @use '../base/css-variables';
}

// لایه کامپوننت‌ها
@layer jalali-calendar.components {
  @use 'components/calendar';
  @use 'components/datepicker';
}

// لایه utilities
@layer jalali-calendar.utilities {
  .p-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  .p-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
```

### Override استایل‌ها با CSS Layers

```scss
// در فایل styles.scss پروژه
@layer jalali-calendar.components {
  .p-jalali-calendar {
    // Override استایل‌های پیشفرض
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .p-calendar-day.p-selected {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}
```

---

