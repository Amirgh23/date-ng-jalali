# راهنمای جامع پیاده‌سازی سیستم استایل‌دهی مشابه PrimeNG
## برای کتابخانه تقویم جلالی Angular

---

## فهرست مطالب

1. [معماری کلی](#معماری-کلی)
2. [ساختار فایل‌ها و پوشه‌ها](#ساختار-فایل‌ها-و-پوشه‌ها)
3. [حالت استایل‌دار (Styled Mode)](#حالت-استایل‌دار-styled-mode)
4. [حالت بدون استایل (Unstyled Mode)](#حالت-بدون-استایل-unstyled-mode)
5. [سیستم Pass Through (PT)](#سیستم-pass-through-pt)
6. [تم‌بندی پویا (Dynamic Theming)](#تم‌بندی-پویا-dynamic-theming)
7. [CSS Layers و Cascade Control](#css-layers-و-cascade-control)
8. [مثال‌های کاربردی](#مثال‌های-کاربردی)
9. [بهترین شیوه‌ها (Best Practices)](#بهترین-شیوه‌ها-best-practices)

---

## معماری کلی

### نمای کلی سیستم

```
┌─────────────────────────────────────────────────────────┐
│           Jalali Calendar Library                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐      ┌──────────────────┐       │
│  │  Styled Mode     │      │  Unstyled Mode   │       │
│  │  ─────────────   │      │  ──────────────  │       │
│  │  • Pre-built     │      │  • No styles     │       │
│  │    themes        │      │  • PT API        │       │
│  │  • CSS vars      │      │  • Full control  │       │
│  │  • SCSS vars     │      │  • Utility-first │       │
│  └──────────────────┘      └──────────────────┘       │
│           │                         │                  │
│           └─────────┬───────────────┘                  │
│                     │                                  │
│           ┌─────────▼─────────┐                       │
│           │   Theme Service   │                       │
│           │   ─────────────   │                       │
│           │   • Load themes   │                       │
│           │   • Switch themes │                       │
│           │   • CSS injection │                       │
│           └───────────────────┘                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```


---

## ساختار فایل‌ها و پوشه‌ها

### ساختار پیشنهادی

```
projects/jalali-date-picker/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── calendar/
│   │   │   │   ├── jalali-calendar.component.ts
│   │   │   │   ├── jalali-calendar.component.html
│   │   │   │   └── jalali-calendar.component.scss (base styles only)
│   │   │   └── date-picker/
│   │   │       ├── jalali-date-picker.component.ts
│   │   │       └── ...
│   │   │
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── theme.model.ts
│   │   │   │   └── pass-through.model.ts
│   │   │   └── services/
│   │   │       ├── theme.service.ts
│   │   │       └── style-class.service.ts
│   │   │
│   │   └── themes/
│   │       ├── base/
│   │       │   ├── _variables.scss
│   │       │   ├── _mixins.scss
│   │       │   ├── _reset.scss
│   │       │   └── _typography.scss
│   │       │
│   │       ├── styled/
│   │       │   ├── lara-light-blue/
│   │       │   │   ├── theme.scss
│   │       │   │   └── _variables.scss
│   │       │   ├── lara-dark-blue/
│   │       │   │   ├── theme.scss
│   │       │   │   └── _variables.scss
│   │       │   ├── material-light/
│   │       │   └── bootstrap-light/
│   │       │
│   │       ├── unstyled/
│   │       │   └── base.scss (minimal structural styles)
│   │       │
│   │       └── index.scss (exports all themes)
│   │
│   └── public-api.ts
│
└── README.md
```


---

## حالت استایل‌دار (Styled Mode)

### 1. تعریف متغیرهای پایه (Base Variables)

**فایل: `themes/base/_variables.scss`**

```scss
// Design Tokens - Primary Colors
$primary-50: #f0f9ff !default;
$primary-100: #e0f2fe !default;
$primary-200: #bae6fd !default;
$primary-300: #7dd3fc !default;
$primary-400: #38bdf8 !default;
$primary-500: #0ea5e9 !default;
$primary-600: #0284c7 !default;
$primary-700: #0369a1 !default;
$primary-800: #075985 !default;
$primary-900: #0c4a6e !default;

// Surface Colors
$surface-0: #ffffff !default;
$surface-50: #f8fafc !default;
$surface-100: #f1f5f9 !default;
$surface-200: #e2e8f0 !default;
$surface-300: #cbd5e1 !default;
$surface-400: #94a3b8 !default;
$surface-500: #64748b !default;
$surface-600: #475569 !default;
$surface-700: #334155 !default;
$surface-800: #1e293b !default;
$surface-900: #0f172a !default;

// Text Colors
$text-color: $surface-700 !default;
$text-color-secondary: $surface-500 !default;
$text-color-muted: $surface-400 !default;

// Component Specific
$border-radius: 6px !default;
$border-color: $surface-200 !default;
$focus-ring: 0 0 0 0.2rem rgba($primary-500, 0.2) !default;
$transition-duration: 0.2s !default;

// Typography
$font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !default;
$font-size-base: 1rem !default;
$font-size-sm: 0.875rem !default;
$font-size-lg: 1.125rem !default;

// Spacing
$spacing-xs: 0.25rem !default;
$spacing-sm: 0.5rem !default;
$spacing-md: 1rem !default;
$spacing-lg: 1.5rem !default;
$spacing-xl: 2rem !default;

// Z-index
$z-index-dropdown: 1000 !default;
$z-index-modal: 1050 !default;
$z-index-tooltip: 1100 !default;
```


### 2. تبدیل به CSS Custom Properties

**فایل: `themes/base/_css-variables.scss`**

```scss
@use './variables' as *;

:root {
  // Primary Colors
  --primary-50: #{$primary-50};
  --primary-100: #{$primary-100};
  --primary-200: #{$primary-200};
  --primary-300: #{$primary-300};
  --primary-400: #{$primary-400};
  --primary-500: #{$primary-500};
  --primary-600: #{$primary-600};
  --primary-700: #{$primary-700};
  --primary-800: #{$primary-800};
  --primary-900: #{$primary-900};
  
  // Surface Colors
  --surface-0: #{$surface-0};
  --surface-50: #{$surface-50};
  --surface-100: #{$surface-100};
  --surface-200: #{$surface-200};
  --surface-300: #{$surface-300};
  --surface-400: #{$surface-400};
  --surface-500: #{$surface-500};
  --surface-600: #{$surface-600};
  --surface-700: #{$surface-700};
  --surface-800: #{$surface-800};
  --surface-900: #{$surface-900};
  
  // Text Colors
  --text-color: #{$text-color};
  --text-color-secondary: #{$text-color-secondary};
  --text-color-muted: #{$text-color-muted};
  
  // Component Properties
  --border-radius: #{$border-radius};
  --border-color: #{$border-color};
  --focus-ring: #{$focus-ring};
  --transition-duration: #{$transition-duration};
  
  // Typography
  --font-family: #{$font-family};
  --font-size-base: #{$font-size-base};
  --font-size-sm: #{$font-size-sm};
  --font-size-lg: #{$font-size-lg};
  
  // Spacing
  --spacing-xs: #{$spacing-xs};
  --spacing-sm: #{$spacing-sm};
  --spacing-md: #{$spacing-md};
  --spacing-lg: #{$spacing-lg};
  --spacing-xl: #{$spacing-xl};
}
```


### 3. ایجاد تم‌های مختلف

**فایل: `themes/styled/lara-light-blue/theme.scss`**

```scss
@use '../../base/variables' as base;
@use '../../base/css-variables';
@use '../../base/reset';
@use '../../base/typography';

// Override base variables for this theme
$primary-500: #3b82f6;
$primary-600: #2563eb;
$primary-700: #1d4ed8;

// Generate CSS custom properties with overrides
:root {
  --primary-500: #{$primary-500};
  --primary-600: #{$primary-600};
  --primary-700: #{$primary-700};
}

// Import component styles with CSS Layer
@layer jalali-calendar {
  @import './components/calendar';
  @import './components/date-picker';
  @import './components/time-picker';
}
```

**فایل: `themes/styled/lara-light-blue/components/_calendar.scss`**

```scss
.jc-calendar {
  background: var(--surface-0);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  font-family: var(--font-family);
  color: var(--text-color);
  
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--border-color);
  }
  
  &-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-color);
  }
  
  &-nav-button {
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-xs) var(--spacing-sm);
    cursor: pointer;
    transition: all var(--transition-duration);
    
    &:hover {
      background: var(--surface-50);
      border-color: var(--primary-500);
    }
    
    &:focus {
      outline: none;
      box-shadow: var(--focus-ring);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-xs);
  }
  
  &-day-header {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-color-secondary);
    padding: var(--spacing-sm);
  }
  
  &-day-cell {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-duration);
    font-size: var(--font-size-base);
    
    &:hover:not(&--disabled):not(&--selected) {
      background: var(--surface-100);
    }
    
    &--today {
      border: 2px solid var(--primary-500);
    }
    
    &--selected {
      background: var(--primary-500);
      color: white;
      font-weight: 600;
    }
    
    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    &--other-month {
      color: var(--text-color-muted);
    }
    
    &--weekend {
      color: #ef4444;
    }
    
    &--holiday {
      background: #fef2f2;
      color: #dc2626;
    }
    
    &:focus {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
}
```


### 4. تم Dark Mode

**فایل: `themes/styled/lara-dark-blue/theme.scss`**

```scss
@use '../../base/variables' as base;

// Dark theme color overrides
$surface-0: #1e293b;
$surface-50: #334155;
$surface-100: #475569;
$surface-200: #64748b;
$surface-700: #e2e8f0;
$surface-800: #f1f5f9;
$surface-900: #f8fafc;

$text-color: #f1f5f9;
$text-color-secondary: #cbd5e1;
$border-color: #475569;

:root[data-theme="dark"],
.jc-theme-dark {
  --surface-0: #{$surface-0};
  --surface-50: #{$surface-50};
  --surface-100: #{$surface-100};
  --surface-200: #{$surface-200};
  --surface-700: #{$surface-700};
  --surface-800: #{$surface-800};
  --surface-900: #{$surface-900};
  
  --text-color: #{$text-color};
  --text-color-secondary: #{$text-color-secondary};
  --border-color: #{$border-color};
}

@layer jalali-calendar {
  @import './components/calendar';
  @import './components/date-picker';
}
```


---

## حالت بدون استایل (Unstyled Mode)

### 1. استایل‌های ساختاری حداقلی

**فایل: `themes/unstyled/base.scss`**

```scss
// Only structural styles, no visual styling
.jc-calendar {
  display: block;
  box-sizing: border-box;
  
  &-header {
    display: flex;
  }
  
  &-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  &-day-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// Reset browser defaults
.jc-calendar * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

### 2. فعال‌سازی Unstyled Mode

**در کامپوننت:**

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'jc-calendar',
  templateUrl: './jalali-calendar.component.html',
  styleUrls: ['./jalali-calendar.component.scss'],
  host: {
    '[class.jc-unstyled]': 'unstyled'
  }
})
export class JalaliCalendarComponent {
  @Input() unstyled: boolean = false;
  
  // ... rest of component
}
```

**در angular.json:**

```json
{
  "styles": [
    "node_modules/jalali-date-picker/themes/unstyled/base.scss"
  ]
}
```


---

## سیستم Pass Through (PT)

### 1. تعریف مدل‌های PT

**فایل: `core/models/pass-through.model.ts`**

```typescript
/**
 * Pass Through Options for Calendar Component
 * Allows deep customization of internal elements
 */
export interface CalendarPassThroughOptions {
  /**
   * Root element of calendar
   */
  root?: PassThroughElementOptions;
  
  /**
   * Header section containing navigation
   */
  header?: PassThroughElementOptions;
  
  /**
   * Title displaying current month/year
   */
  title?: PassThroughElementOptions;
  
  /**
   * Previous month navigation button
   */
  previousButton?: PassThroughElementOptions;
  
  /**
   * Next month navigation button
   */
  nextButton?: PassThroughElementOptions;
  
  /**
   * Grid container for days
   */
  grid?: PassThroughElementOptions;
  
  /**
   * Day header cells (weekday names)
   */
  dayHeader?: PassThroughElementOptions;
  
  /**
   * Individual day cell
   */
  dayCell?: PassThroughElementOptions;
  
  /**
   * Footer section
   */
  footer?: PassThroughElementOptions;
}

/**
 * Options for individual element customization
 */
export interface PassThroughElementOptions {
  /**
   * CSS class(es) to add
   */
  class?: string | string[] | { [key: string]: boolean };
  
  /**
   * Inline styles
   */
  style?: { [key: string]: any };
  
  /**
   * HTML attributes
   */
  attrs?: { [key: string]: any };
  
  /**
   * Data attributes
   */
  data?: { [key: string]: any };
}

/**
 * Method-based PT options (for dynamic values)
 */
export interface CalendarPassThroughMethodOptions {
  /**
   * Current component instance
   */
  instance: any;
  
  /**
   * Current props
   */
  props: any;
  
  /**
   * Current state
   */
  state: any;
  
  /**
   * Context data (e.g., day data for dayCell)
   */
  context?: any;
}

export type PassThroughType<T = any> = 
  | T 
  | ((options: CalendarPassThroughMethodOptions) => T);
```


### 2. سرویس مدیریت Style Class

**فایل: `core/services/style-class.service.ts`**

```typescript
import { Injectable } from '@angular/core';
import { PassThroughElementOptions, CalendarPassThroughMethodOptions } from '../models/pass-through.model';

@Injectable({
  providedIn: 'root'
})
export class StyleClassService {
  
  /**
   * Resolve PT options (handle both static and function-based)
   */
  resolvePassThrough<T>(
    pt: T | ((options: CalendarPassThroughMethodOptions) => T),
    options: CalendarPassThroughMethodOptions
  ): T {
    if (typeof pt === 'function') {
      return pt(options);
    }
    return pt;
  }
  
  /**
   * Merge multiple class sources into single string
   */
  mergeClasses(...classes: (string | string[] | { [key: string]: boolean } | undefined)[]): string {
    const result: string[] = [];
    
    for (const cls of classes) {
      if (!cls) continue;
      
      if (typeof cls === 'string') {
        result.push(cls);
      } else if (Array.isArray(cls)) {
        result.push(...cls);
      } else if (typeof cls === 'object') {
        for (const [key, value] of Object.entries(cls)) {
          if (value) {
            result.push(key);
          }
        }
      }
    }
    
    return result.join(' ');
  }
  
  /**
   * Merge multiple style objects
   */
  mergeStyles(...styles: ({ [key: string]: any } | undefined)[]): { [key: string]: any } {
    return Object.assign({}, ...styles.filter(s => s));
  }
  
  /**
   * Get classes for an element from PT options
   */
  getElementClasses(
    baseClass: string,
    ptOptions?: PassThroughElementOptions,
    conditionalClasses?: { [key: string]: boolean }
  ): string {
    return this.mergeClasses(
      baseClass,
      conditionalClasses,
      ptOptions?.class
    );
  }
  
  /**
   * Get styles for an element from PT options
   */
  getElementStyles(
    baseStyle?: { [key: string]: any },
    ptOptions?: PassThroughElementOptions
  ): { [key: string]: any } {
    return this.mergeStyles(baseStyle, ptOptions?.style);
  }
  
  /**
   * Get all attributes for an element from PT options
   */
  getElementAttrs(
    ptOptions?: PassThroughElementOptions
  ): { [key: string]: any } {
    const attrs: { [key: string]: any } = {};
    
    if (ptOptions?.attrs) {
      Object.assign(attrs, ptOptions.attrs);
    }
    
    if (ptOptions?.data) {
      for (const [key, value] of Object.entries(ptOptions.data)) {
        attrs[`data-${key}`] = value;
      }
    }
    
    return attrs;
  }
}
```


### 3. پیاده‌سازی PT در کامپوننت

**فایل: `components/calendar/jalali-calendar.component.ts`**

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { CalendarPassThroughOptions, CalendarPassThroughMethodOptions } from '../../core/models/pass-through.model';
import { StyleClassService } from '../../core/services/style-class.service';

@Component({
  selector: 'jc-calendar',
  templateUrl: './jalali-calendar.component.html',
  styleUrls: ['./jalali-calendar.component.scss']
})
export class JalaliCalendarComponent implements OnInit {
  
  /**
   * Enable unstyled mode
   */
  @Input() unstyled: boolean = false;
  
  /**
   * Pass Through options for deep customization
   */
  @Input() pt?: CalendarPassThroughOptions;
  
  /**
   * Additional CSS class for root element
   */
  @Input() styleClass?: string;
  
  /**
   * Inline styles for root element
   */
  @Input() style?: { [key: string]: any };
  
  // Component state
  currentMonth: number = 1;
  currentYear: number = 1402;
  days: any[] = [];
  
  constructor(private styleClassService: StyleClassService) {}
  
  ngOnInit() {
    this.generateCalendar();
  }
  
  /**
   * Get PT options for a specific element
   */
  private getPTOptions(elementName: keyof CalendarPassThroughOptions, context?: any) {
    const ptOption = this.pt?.[elementName];
    
    if (!ptOption) return undefined;
    
    const methodOptions: CalendarPassThroughMethodOptions = {
      instance: this,
      props: {
        unstyled: this.unstyled,
        styleClass: this.styleClass,
        style: this.style
      },
      state: {
        currentMonth: this.currentMonth,
        currentYear: this.currentYear
      },
      context
    };
    
    return this.styleClassService.resolvePassThrough(ptOption, methodOptions);
  }
  
  /**
   * Get classes for root element
   */
  getRootClasses(): string {
    const ptOptions = this.getPTOptions('root');
    
    return this.styleClassService.getElementClasses(
      'jc-calendar',
      ptOptions,
      {
        'jc-unstyled': this.unstyled,
        [this.styleClass || '']: !!this.styleClass
      }
    );
  }
  
  /**
   * Get styles for root element
   */
  getRootStyles(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementStyles(this.style, ptOptions);
  }
  
  /**
   * Get attributes for root element
   */
  getRootAttrs(): { [key: string]: any } {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementAttrs(ptOptions);
  }
  
  /**
   * Get classes for day cell
   */
  getDayCellClasses(day: any): string {
    const ptOptions = this.getPTOptions('dayCell', { day });
    
    return this.styleClassService.getElementClasses(
      'jc-calendar-day-cell',
      ptOptions,
      {
        'jc-calendar-day-cell--today': day.isToday,
        'jc-calendar-day-cell--selected': day.isSelected,
        'jc-calendar-day-cell--disabled': day.isDisabled,
        'jc-calendar-day-cell--weekend': day.isWeekend,
        'jc-calendar-day-cell--holiday': day.isHoliday,
        'jc-calendar-day-cell--other-month': day.isOtherMonth
      }
    );
  }
  
  /**
   * Get styles for day cell
   */
  getDayCellStyles(day: any): { [key: string]: any } {
    const ptOptions = this.getPTOptions('dayCell', { day });
    return this.styleClassService.getElementStyles(undefined, ptOptions);
  }
  
  private generateCalendar() {
    // Calendar generation logic
  }
}
```


### 4. استفاده از PT در Template

**فایل: `components/calendar/jalali-calendar.component.html`**

```html
<div 
  [class]="getRootClasses()"
  [ngStyle]="getRootStyles()"
  [attr]="getRootAttrs()">
  
  <!-- Header -->
  <div 
    [class]="getHeaderClasses()"
    [ngStyle]="getHeaderStyles()">
    
    <!-- Previous Button -->
    <button
      type="button"
      [class]="getPreviousButtonClasses()"
      [ngStyle]="getPreviousButtonStyles()"
      (click)="previousMonth()"
      [disabled]="!canGoPrevious()">
      <i class="jc-icon jc-icon-chevron-left"></i>
    </button>
    
    <!-- Title -->
    <div 
      [class]="getTitleClasses()"
      [ngStyle]="getTitleStyles()">
      {{ getMonthName() }} {{ currentYear }}
    </div>
    
    <!-- Next Button -->
    <button
      type="button"
      [class]="getNextButtonClasses()"
      [ngStyle]="getNextButtonStyles()"
      (click)="nextMonth()"
      [disabled]="!canGoNext()">
      <i class="jc-icon jc-icon-chevron-right"></i>
    </button>
  </div>
  
  <!-- Grid -->
  <div 
    [class]="getGridClasses()"
    [ngStyle]="getGridStyles()">
    
    <!-- Day Headers -->
    <div 
      *ngFor="let dayName of dayNames"
      [class]="getDayHeaderClasses()"
      [ngStyle]="getDayHeaderStyles()">
      {{ dayName }}
    </div>
    
    <!-- Day Cells -->
    <div
      *ngFor="let day of days"
      [class]="getDayCellClasses(day)"
      [ngStyle]="getDayCellStyles(day)"
      [attr.data-date]="day.date"
      [attr.aria-selected]="day.isSelected"
      [attr.aria-disabled]="day.isDisabled"
      (click)="selectDay(day)"
      (keydown.enter)="selectDay(day)"
      (keydown.space)="selectDay(day)"
      tabindex="0"
      role="button">
      {{ day.day }}
    </div>
  </div>
  
  <!-- Footer (if needed) -->
  <div 
    *ngIf="showFooter"
    [class]="getFooterClasses()"
    [ngStyle]="getFooterStyles()">
    <ng-content select="[footer]"></ng-content>
  </div>
</div>
```


---

## تم‌بندی پویا (Dynamic Theming)

### 1. سرویس مدیریت تم

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
  previewColors?: {
    primary: string;
    surface: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private readonly THEME_STORAGE_KEY = 'jc-theme';
  private readonly THEME_LINK_ID = 'jc-theme-link';
  
  private currentThemeSubject = new BehaviorSubject<Theme | null>(null);
  public currentTheme$: Observable<Theme | null> = this.currentThemeSubject.asObservable();
  
  // Available themes
  private themes: Theme[] = [
    {
      name: 'lara-light-blue',
      displayName: 'Lara Light Blue',
      cssFile: 'lara-light-blue/theme.css',
      isDark: false,
      previewColors: { primary: '#3b82f6', surface: '#ffffff' }
    },
    {
      name: 'lara-dark-blue',
      displayName: 'Lara Dark Blue',
      cssFile: 'lara-dark-blue/theme.css',
      isDark: true,
      previewColors: { primary: '#3b82f6', surface: '#1e293b' }
    },
    {
      name: 'material-light',
      displayName: 'Material Light',
      cssFile: 'material-light/theme.css',
      isDark: false,
      previewColors: { primary: '#6366f1', surface: '#ffffff' }
    },
    {
      name: 'bootstrap-light',
      displayName: 'Bootstrap Light',
      cssFile: 'bootstrap-light/theme.css',
      isDark: false,
      previewColors: { primary: '#0d6efd', surface: '#ffffff' }
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSavedTheme();
    }
  }
  
  /**
   * Get all available themes
   */
  getThemes(): Theme[] {
    return [...this.themes];
  }
  
  /**
   * Get current active theme
   */
  getCurrentTheme(): Theme | null {
    return this.currentThemeSubject.value;
  }
  
  /**
   * Switch to a different theme
   */
  switchTheme(themeName: string): Promise<void> {
    const theme = this.themes.find(t => t.name === themeName);
    
    if (!theme) {
      return Promise.reject(new Error(`Theme "${themeName}" not found`));
    }
    
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }
    
    return this.loadTheme(theme);
  }
  
  /**
   * Load theme CSS file
   */
  private loadTheme(theme: Theme): Promise<void> {
    return new Promise((resolve, reject) => {
      const head = document.head;
      let themeLink = document.getElementById(this.THEME_LINK_ID) as HTMLLinkElement;
      
      // Create link element if doesn't exist
      if (!themeLink) {
        themeLink = document.createElement('link');
        themeLink.id = this.THEME_LINK_ID;
        themeLink.rel = 'stylesheet';
        themeLink.type = 'text/css';
        head.appendChild(themeLink);
      }
      
      // Handle load event
      themeLink.onload = () => {
        this.currentThemeSubject.next(theme);
        this.saveTheme(theme.name);
        this.updateDataThemeAttribute(theme);
        resolve();
      };
      
      // Handle error event
      themeLink.onerror = () => {
        reject(new Error(`Failed to load theme: ${theme.name}`));
      };
      
      // Set href to trigger load
      const baseUrl = this.getThemeBaseUrl();
      themeLink.href = `${baseUrl}/${theme.cssFile}`;
    });
  }
  
  /**
   * Update data-theme attribute on document
   */
  private updateDataThemeAttribute(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme.name);
      
      if (theme.isDark) {
        document.documentElement.classList.add('jc-theme-dark');
        document.documentElement.classList.remove('jc-theme-light');
      } else {
        document.documentElement.classList.add('jc-theme-light');
        document.documentElement.classList.remove('jc-theme-dark');
      }
    }
  }
  
  /**
   * Save theme preference to localStorage
   */
  private saveTheme(themeName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.THEME_STORAGE_KEY, themeName);
      } catch (e) {
        console.warn('Failed to save theme preference', e);
      }
    }
  }
  
  /**
   * Load saved theme from localStorage
   */
  private loadSavedTheme(): void {
    try {
      const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
      
      if (savedTheme) {
        this.switchTheme(savedTheme).catch(() => {
          // Fallback to default theme
          this.switchTheme('lara-light-blue');
        });
      } else {
        // Load default theme
        this.switchTheme('lara-light-blue');
      }
    } catch (e) {
      console.warn('Failed to load saved theme', e);
      this.switchTheme('lara-light-blue');
    }
  }
  
  /**
   * Get base URL for theme files
   */
  private getThemeBaseUrl(): string {
    // This should be configurable based on your build setup
    return 'assets/themes';
  }
  
  /**
   * Update CSS custom properties dynamically
   */
  updateCSSVariables(variables: { [key: string]: string }): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const root = document.documentElement;
    
    for (const [key, value] of Object.entries(variables)) {
      root.style.setProperty(`--${key}`, value);
    }
  }
  
  /**
   * Get current CSS variable value
   */
  getCSSVariable(variableName: string): string {
    if (!isPlatformBrowser(this.platformId)) return '';
    
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${variableName}`)
      .trim();
  }
}
```


### 2. کامپوننت انتخاب تم

**فایل: `components/theme-selector/theme-selector.component.ts`**

```typescript
import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../core/services/theme.service';

@Component({
  selector: 'jc-theme-selector',
  template: `
    <div class="jc-theme-selector">
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
      
      <!-- Preview -->
      <div class="jc-theme-preview" *ngIf="currentTheme">
        <div 
          class="jc-theme-preview-color"
          [style.background-color]="currentTheme.previewColors?.primary">
        </div>
        <div 
          class="jc-theme-preview-color"
          [style.background-color]="currentTheme.previewColors?.surface">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .jc-theme-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }
    
    .jc-theme-preview {
      display: flex;
      gap: 0.5rem;
    }
    
    .jc-theme-preview-color {
      width: 2rem;
      height: 2rem;
      border-radius: 0.25rem;
      border: 1px solid #ccc;
    }
  `]
})
export class ThemeSelectorComponent implements OnInit {
  
  themes: Theme[] = [];
  selectedTheme: string = '';
  currentTheme: Theme | null = null;
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themes = this.themeService.getThemes();
    
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
      if (theme) {
        this.selectedTheme = theme.name;
      }
    });
  }
  
  onThemeChange() {
    this.themeService.switchTheme(this.selectedTheme)
      .catch(error => {
        console.error('Failed to switch theme:', error);
      });
  }
}
```


---

## CSS Layers و Cascade Control

### 1. استفاده از CSS Layers

**فایل: `themes/base/_layers.scss`**

```scss
// Define layer order (lower layers have lower priority)
@layer reset, base, components, utilities, overrides;

// Reset layer - browser defaults
@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  button {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
}

// Base layer - typography, colors
@layer base {
  :root {
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    color: var(--text-color);
  }
}

// Components layer - all component styles
@layer components {
  // Component styles will be imported here
}

// Utilities layer - utility classes
@layer utilities {
  .jc-text-center { text-align: center; }
  .jc-text-right { text-align: right; }
  .jc-text-left { text-align: left; }
  
  .jc-mt-1 { margin-top: var(--spacing-xs); }
  .jc-mt-2 { margin-top: var(--spacing-sm); }
  .jc-mt-3 { margin-top: var(--spacing-md); }
  
  .jc-hidden { display: none; }
  .jc-visible { display: block; }
}

// Overrides layer - user customizations
@layer overrides {
  // User can add custom styles here
}
```

### 2. استفاده در تم‌ها

**فایل: `themes/styled/lara-light-blue/theme.scss`**

```scss
@use '../../base/layers';
@use '../../base/variables' as *;
@use '../../base/css-variables';

// All component styles go into components layer
@layer components {
  @import './components/calendar';
  @import './components/date-picker';
  @import './components/time-picker';
}
```

### 3. Override توسط کاربر

کاربران می‌توانند به راحتی استایل‌ها را override کنند:

```scss
// در فایل styles.scss پروژه
@import 'jalali-date-picker/themes/lara-light-blue/theme';

// Override در لایه overrides
@layer overrides {
  .jc-calendar {
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .jc-calendar-day-cell--selected {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}
```


---

## مثال‌های کاربردی

### 1. استفاده پایه (Styled Mode)

**در angular.json:**

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/jalali-date-picker/themes/lara-light-blue/theme.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

**در کامپوننت:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <jc-calendar
      [(ngModel)]="selectedDate"
      [locale]="'fa'"
      styleClass="my-custom-calendar">
    </jc-calendar>
  `
})
export class AppComponent {
  selectedDate: Date = new Date();
}
```

### 2. بازنویسی متغیرهای SCSS

**در styles.scss:**

```scss
// Override variables before importing theme
$primary-500: #8b5cf6;
$primary-600: #7c3aed;
$border-radius: 12px;
$spacing-md: 1.5rem;

@import 'jalali-date-picker/themes/lara-light-blue/theme';

// Additional custom styles
.my-custom-calendar {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

### 3. استفاده از Pass Through

```typescript
import { Component } from '@angular/core';
import { CalendarPassThroughOptions } from 'jalali-date-picker';

@Component({
  selector: 'app-calendar-demo',
  template: `
    <jc-calendar
      [unstyled]="true"
      [pt]="passThrough"
      [(ngModel)]="selectedDate">
    </jc-calendar>
  `
})
export class CalendarDemoComponent {
  selectedDate: Date = new Date();
  
  passThrough: CalendarPassThroughOptions = {
    root: {
      class: 'bg-white rounded-lg shadow-lg p-4',
      style: { maxWidth: '400px' }
    },
    header: {
      class: 'flex justify-between items-center mb-4 pb-2 border-b'
    },
    title: {
      class: 'text-xl font-bold text-gray-800'
    },
    previousButton: {
      class: 'px-3 py-1 rounded hover:bg-gray-100 transition-colors',
      attrs: { 'aria-label': 'ماه قبل' }
    },
    nextButton: {
      class: 'px-3 py-1 rounded hover:bg-gray-100 transition-colors',
      attrs: { 'aria-label': 'ماه بعد' }
    },
    grid: {
      class: 'grid grid-cols-7 gap-1'
    },
    dayHeader: {
      class: 'text-center text-sm font-semibold text-gray-600 p-2'
    },
    dayCell: {
      class: 'aspect-square flex items-center justify-center rounded cursor-pointer hover:bg-blue-50 transition-colors',
      style: { minHeight: '40px' }
    }
  };
}
```

### 4. Pass Through با توابع پویا

```typescript
passThrough: CalendarPassThroughOptions = {
  dayCell: (options) => {
    const day = options.context?.day;
    
    return {
      class: [
        'aspect-square flex items-center justify-center rounded cursor-pointer',
        {
          'bg-blue-500 text-white font-bold': day?.isSelected,
          'bg-red-50 text-red-600': day?.isHoliday,
          'text-gray-400': day?.isOtherMonth,
          'ring-2 ring-blue-500': day?.isToday,
          'opacity-50 cursor-not-allowed': day?.isDisabled
        }
      ],
      style: {
        minHeight: '40px',
        fontSize: day?.isToday ? '1.1rem' : '1rem'
      },
      data: {
        date: day?.date,
        holiday: day?.isHoliday
      }
    };
  }
};
```


### 5. تغییر تم در زمان اجرا

```typescript
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'jalali-date-picker';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <!-- Theme Switcher -->
      <div class="theme-switcher">
        <button 
          *ngFor="let theme of themes"
          (click)="switchTheme(theme.name)"
          [class.active]="currentTheme?.name === theme.name">
          {{ theme.displayName }}
        </button>
      </div>
      
      <!-- Calendar -->
      <jc-calendar [(ngModel)]="selectedDate"></jc-calendar>
    </div>
  `
})
export class AppComponent implements OnInit {
  selectedDate: Date = new Date();
  themes: any[] = [];
  currentTheme: any = null;
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themes = this.themeService.getThemes();
    
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }
  
  switchTheme(themeName: string) {
    this.themeService.switchTheme(themeName)
      .then(() => {
        console.log('Theme switched successfully');
      })
      .catch(error => {
        console.error('Failed to switch theme:', error);
      });
  }
}
```

### 6. تغییر متغیرهای CSS به صورت پویا

```typescript
import { Component } from '@angular/core';
import { ThemeService } from 'jalali-date-picker';

@Component({
  selector: 'app-custom-theme',
  template: `
    <div class="custom-theme-editor">
      <h3>ویرایشگر تم سفارشی</h3>
      
      <div class="color-picker">
        <label>رنگ اصلی:</label>
        <input 
          type="color" 
          [(ngModel)]="primaryColor"
          (change)="updatePrimaryColor()">
      </div>
      
      <div class="color-picker">
        <label>رنگ پس‌زمینه:</label>
        <input 
          type="color" 
          [(ngModel)]="surfaceColor"
          (change)="updateSurfaceColor()">
      </div>
      
      <div class="size-picker">
        <label>شعاع گوشه:</label>
        <input 
          type="range" 
          min="0" 
          max="20" 
          [(ngModel)]="borderRadius"
          (input)="updateBorderRadius()">
        <span>{{ borderRadius }}px</span>
      </div>
      
      <jc-calendar [(ngModel)]="selectedDate"></jc-calendar>
    </div>
  `
})
export class CustomThemeComponent {
  selectedDate: Date = new Date();
  primaryColor: string = '#3b82f6';
  surfaceColor: string = '#ffffff';
  borderRadius: number = 6;
  
  constructor(private themeService: ThemeService) {}
  
  updatePrimaryColor() {
    this.themeService.updateCSSVariables({
      'primary-500': this.primaryColor,
      'primary-600': this.adjustColor(this.primaryColor, -10),
      'primary-700': this.adjustColor(this.primaryColor, -20)
    });
  }
  
  updateSurfaceColor() {
    this.themeService.updateCSSVariables({
      'surface-0': this.surfaceColor
    });
  }
  
  updateBorderRadius() {
    this.themeService.updateCSSVariables({
      'border-radius': `${this.borderRadius}px`
    });
  }
  
  private adjustColor(color: string, percent: number): string {
    // Logic to darken/lighten color
    // Implementation details...
    return color;
  }
}
```

### 7. استفاده با Tailwind CSS (Unstyled Mode)

**در tailwind.config.js:**

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/jalali-date-picker/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      }
    }
  }
}
```

**در کامپوننت:**

```typescript
@Component({
  selector: 'app-tailwind-calendar',
  template: `
    <jc-calendar
      [unstyled]="true"
      [pt]="tailwindPT"
      [(ngModel)]="selectedDate">
    </jc-calendar>
  `
})
export class TailwindCalendarComponent {
  selectedDate: Date = new Date();
  
  tailwindPT: CalendarPassThroughOptions = {
    root: {
      class: 'bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md mx-auto'
    },
    header: {
      class: 'flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700'
    },
    title: {
      class: 'text-2xl font-bold text-gray-900 dark:text-white'
    },
    previousButton: {
      class: 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
    },
    nextButton: {
      class: 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
    },
    grid: {
      class: 'grid grid-cols-7 gap-2'
    },
    dayHeader: {
      class: 'text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2'
    },
    dayCell: {
      class: [
        'aspect-square flex items-center justify-center',
        'rounded-lg cursor-pointer transition-all duration-200',
        'hover:bg-primary-50 dark:hover:bg-primary-900/20',
        'focus:outline-none focus:ring-2 focus:ring-primary-500'
      ]
    }
  };
}
```


---

## بهترین شیوه‌ها (Best Practices)

### 1. نام‌گذاری کلاس‌ها

```scss
// ✅ استفاده از پیشوند مشخص (jc = Jalali Calendar)
.jc-calendar { }
.jc-calendar-header { }
.jc-calendar-day-cell { }

// ✅ استفاده از BEM methodology
.jc-calendar { }
.jc-calendar__header { }
.jc-calendar__day-cell { }
.jc-calendar__day-cell--selected { }
.jc-calendar__day-cell--disabled { }

// ❌ نام‌های عمومی که ممکن است تداخل داشته باشند
.calendar { }
.header { }
.cell { }
```

### 2. سازماندهی متغیرها

```scss
// ✅ گروه‌بندی منطقی متغیرها
// Colors
$primary-500: #3b82f6 !default;
$surface-0: #ffffff !default;

// Typography
$font-family: sans-serif !default;
$font-size-base: 1rem !default;

// Spacing
$spacing-md: 1rem !default;

// ❌ متغیرهای نامرتب و بدون دسته‌بندی
$color1: #3b82f6 !default;
$size: 1rem !default;
$space: 1rem !default;
```

### 3. استفاده از !default

```scss
// ✅ همیشه از !default استفاده کنید تا قابل override باشد
$primary-500: #3b82f6 !default;
$border-radius: 6px !default;

// ❌ بدون !default قابل override نیست
$primary-500: #3b82f6;
```

### 4. CSS Custom Properties برای مقادیر پویا

```scss
// ✅ استفاده از CSS variables برای مقادیری که ممکن است در runtime تغییر کنند
.jc-calendar {
  background: var(--surface-0);
  color: var(--text-color);
  border-radius: var(--border-radius);
}

// ❌ استفاده از مقادیر ثابت
.jc-calendar {
  background: #ffffff;
  color: #1e293b;
  border-radius: 6px;
}
```

### 5. Accessibility

```typescript
// ✅ همیشه ARIA attributes را اضافه کنید
getDayCellAttrs(day: any): any {
  return {
    'role': 'button',
    'tabindex': day.isDisabled ? -1 : 0,
    'aria-selected': day.isSelected,
    'aria-disabled': day.isDisabled,
    'aria-label': this.getDayAriaLabel(day)
  };
}

// ✅ پشتیبانی از keyboard navigation
@HostListener('keydown', ['$event'])
handleKeyDown(event: KeyboardEvent) {
  switch(event.key) {
    case 'ArrowRight':
      this.navigateDay(1);
      break;
    case 'ArrowLeft':
      this.navigateDay(-1);
      break;
    case 'Enter':
    case ' ':
      this.selectCurrentDay();
      break;
  }
}
```

### 6. Performance

```scss
// ✅ استفاده از CSS containment
.jc-calendar {
  contain: layout style paint;
}

// ✅ استفاده از will-change برای انیمیشن‌ها
.jc-calendar-day-cell {
  transition: all 0.2s;
  
  &:hover {
    will-change: transform, background-color;
    transform: scale(1.05);
  }
}

// ✅ استفاده از transform به جای top/left
.jc-dropdown {
  transform: translateY(10px);
  // به جای: top: 10px;
}
```

### 7. RTL Support

```scss
// ✅ پشتیبانی از RTL
.jc-calendar {
  direction: rtl;
  
  &-nav-button {
    // استفاده از logical properties
    margin-inline-start: 0.5rem;
    // به جای: margin-left یا margin-right
  }
}

// ✅ استفاده از start/end به جای left/right
.jc-calendar-header {
  text-align: start;
  padding-inline-start: 1rem;
}
```

### 8. Dark Mode

```scss
// ✅ پشتیبانی از dark mode با CSS variables
:root {
  --surface-0: #ffffff;
  --text-color: #1e293b;
}

:root[data-theme="dark"],
.jc-theme-dark {
  --surface-0: #1e293b;
  --text-color: #f1f5f9;
}

.jc-calendar {
  background: var(--surface-0);
  color: var(--text-color);
}

// ✅ یا استفاده از prefers-color-scheme
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --surface-0: #1e293b;
    --text-color: #f1f5f9;
  }
}
```


### 9. Testing Styles

```typescript
// ✅ تست کلاس‌های PT
describe('JalaliCalendarComponent - Pass Through', () => {
  it('should apply PT classes to root element', () => {
    const pt: CalendarPassThroughOptions = {
      root: { class: 'custom-root' }
    };
    
    component.pt = pt;
    fixture.detectChanges();
    
    const rootElement = fixture.nativeElement.querySelector('.jc-calendar');
    expect(rootElement.classList.contains('custom-root')).toBe(true);
  });
  
  it('should apply PT styles to day cells', () => {
    const pt: CalendarPassThroughOptions = {
      dayCell: { style: { fontSize: '20px' } }
    };
    
    component.pt = pt;
    fixture.detectChanges();
    
    const dayCell = fixture.nativeElement.querySelector('.jc-calendar-day-cell');
    expect(dayCell.style.fontSize).toBe('20px');
  });
});

// ✅ تست theme service
describe('ThemeService', () => {
  it('should switch theme successfully', async () => {
    await service.switchTheme('lara-dark-blue');
    
    expect(service.getCurrentTheme()?.name).toBe('lara-dark-blue');
    expect(document.documentElement.getAttribute('data-theme')).toBe('lara-dark-blue');
  });
  
  it('should update CSS variables', () => {
    service.updateCSSVariables({ 'primary-500': '#ff0000' });
    
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary-500');
    
    expect(value.trim()).toBe('#ff0000');
  });
});
```

### 10. Documentation

```typescript
/**
 * Jalali Calendar Component
 * 
 * @example
 * // Basic usage with styled mode
 * <jc-calendar [(ngModel)]="date"></jc-calendar>
 * 
 * @example
 * // Unstyled mode with Tailwind CSS
 * <jc-calendar 
 *   [unstyled]="true"
 *   [pt]="{ root: { class: 'bg-white rounded-lg p-4' } }"
 *   [(ngModel)]="date">
 * </jc-calendar>
 * 
 * @example
 * // Custom styling with styleClass
 * <jc-calendar 
 *   styleClass="my-calendar"
 *   [style]="{ maxWidth: '400px' }"
 *   [(ngModel)]="date">
 * </jc-calendar>
 */
@Component({
  selector: 'jc-calendar',
  // ...
})
export class JalaliCalendarComponent {
  
  /**
   * Enable unstyled mode (no default styles applied)
   * @default false
   */
  @Input() unstyled: boolean = false;
  
  /**
   * Pass Through options for deep customization
   * @see CalendarPassThroughOptions
   */
  @Input() pt?: CalendarPassThroughOptions;
  
  /**
   * Additional CSS class for root element
   */
  @Input() styleClass?: string;
  
  /**
   * Inline styles for root element
   */
  @Input() style?: { [key: string]: any };
}
```


---

## نقشه راه پیاده‌سازی (Implementation Roadmap)

### فاز 1: پایه‌گذاری (Foundation)

**هدف:** ایجاد ساختار پایه و متغیرهای اصلی

- [ ] ایجاد ساختار پوشه‌های themes
- [ ] تعریف متغیرهای SCSS پایه (_variables.scss)
- [ ] تبدیل متغیرها به CSS Custom Properties
- [ ] ایجاد mixins و utilities پایه
- [ ] تنظیم CSS Layers

**زمان تخمینی:** 2-3 روز

### فاز 2: Styled Mode

**هدف:** پیاده‌سازی تم‌های از پیش تعریف شده

- [ ] طراحی و پیاده‌سازی تم Lara Light
- [ ] طراحی و پیاده‌سازی تم Lara Dark
- [ ] طراحی تم‌های اضافی (Material, Bootstrap)
- [ ] تست تم‌ها در مرورگرهای مختلف
- [ ] بهینه‌سازی CSS (minification, tree-shaking)

**زمان تخمینی:** 5-7 روز

### فاز 3: Unstyled Mode & Pass Through

**هدف:** پیاده‌سازی سیستم PT و حالت unstyled

- [ ] تعریف مدل‌های TypeScript برای PT
- [ ] پیاده‌سازی StyleClassService
- [ ] اضافه کردن پشتیبانی PT به کامپوننت‌ها
- [ ] ایجاد استایل‌های ساختاری حداقلی
- [ ] تست PT با فریمورک‌های مختلف (Tailwind, Bootstrap)

**زمان تخمینی:** 4-5 روز

### فاز 4: Dynamic Theming

**هدف:** پیاده‌سازی تم‌بندی پویا

- [ ] پیاده‌سازی ThemeService
- [ ] ایجاد کامپوننت ThemeSelector
- [ ] پیاده‌سازی بارگذاری پویا CSS
- [ ] ذخیره‌سازی تم در localStorage
- [ ] پشتیبانی از SSR

**زمان تخمینی:** 3-4 روز

### فاز 5: Documentation & Examples

**هدف:** مستندسازی کامل و ایجاد مثال‌ها

- [ ] نوشتن مستندات API
- [ ] ایجاد مثال‌های کاربردی
- [ ] ایجاد Storybook یا demo app
- [ ] نوشتن راهنمای migration
- [ ] ایجاد ویدیوهای آموزشی

**زمان تخمینی:** 5-7 روز

### فاز 6: Testing & Optimization

**هدف:** تست و بهینه‌سازی نهایی

- [ ] نوشتن unit tests
- [ ] نوشتن integration tests
- [ ] تست accessibility (WCAG)
- [ ] تست performance
- [ ] بهینه‌سازی bundle size
- [ ] تست در مرورگرهای مختلف

**زمان تخمینی:** 4-5 روز

**زمان کل تخمینی:** 23-31 روز کاری


---

## چک‌لیست نهایی (Final Checklist)

### استایل‌دهی

- [ ] متغیرهای SCSS با !default تعریف شده‌اند
- [ ] CSS Custom Properties برای تمام مقادیر مهم وجود دارد
- [ ] تم‌های light و dark پیاده‌سازی شده‌اند
- [ ] CSS Layers به درستی تنظیم شده است
- [ ] نام‌گذاری کلاس‌ها consistent و با پیشوند است
- [ ] استایل‌های unstyled mode حداقلی هستند

### Pass Through

- [ ] مدل‌های TypeScript کامل تعریف شده‌اند
- [ ] StyleClassService پیاده‌سازی شده است
- [ ] تمام کامپوننت‌ها از PT پشتیبانی می‌کنند
- [ ] PT با توابع پویا کار می‌کند
- [ ] مستندات PT کامل است

### Theme Service

- [ ] ThemeService پیاده‌سازی شده است
- [ ] بارگذاری پویا CSS کار می‌کند
- [ ] ذخیره‌سازی در localStorage فعال است
- [ ] SSR support وجود دارد
- [ ] رویدادهای تغییر تم emit می‌شوند

### Accessibility

- [ ] ARIA attributes اضافه شده‌اند
- [ ] Keyboard navigation کار می‌کند
- [ ] Focus management صحیح است
- [ ] Screen reader support وجود دارد
- [ ] Color contrast مناسب است (WCAG AA)

### Performance

- [ ] CSS minified است
- [ ] Tree-shaking فعال است
- [ ] Bundle size بهینه است
- [ ] CSS containment استفاده شده است
- [ ] Lazy loading برای تم‌ها وجود دارد

### Documentation

- [ ] API documentation کامل است
- [ ] مثال‌های کاربردی وجود دارد
- [ ] Migration guide نوشته شده است
- [ ] Best practices مستند شده‌اند
- [ ] Troubleshooting guide وجود دارد

### Testing

- [ ] Unit tests نوشته شده‌اند
- [ ] Integration tests وجود دارد
- [ ] Visual regression tests انجام شده است
- [ ] Cross-browser testing انجام شده است
- [ ] Accessibility testing انجام شده است

---

## منابع و مراجع

### مستندات PrimeNG

- [PrimeNG Theming](https://primeng.org/theming)
- [PrimeNG Unstyled Mode](https://primeng.org/unstyled)
- [PrimeNG Pass Through](https://primeng.org/passthrough)

### استانداردها

- [CSS Cascade Layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### ابزارها

- [Sass Documentation](https://sass-lang.com/documentation)
- [PostCSS](https://postcss.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## نتیجه‌گیری

این راهنما یک رویکرد جامع برای پیاده‌سازی سیستم استایل‌دهی مشابه PrimeNG ارائه می‌دهد. با پیروی از این دستورالعمل‌ها، شما می‌توانید:

1. **انعطاف‌پذیری بالا:** کاربران می‌توانند بین styled و unstyled mode انتخاب کنند
2. **شخصی‌سازی عمیق:** سیستم PT امکان کنترل کامل بر روی هر المان را فراهم می‌کند
3. **تم‌بندی پویا:** تغییر تم در runtime بدون reload صفحه
4. **سازگاری:** کار با هر فریمورک CSS (Tailwind, Bootstrap, و...)
5. **Performance:** بهینه‌سازی شده برای سرعت و حجم کم
6. **Accessibility:** پشتیبانی کامل از استانداردهای دسترسی

**نکته مهم:** این راهنما یک نقطه شروع است. بسته به نیازهای خاص پروژه، ممکن است نیاز به تنظیمات و بهبودهای بیشتری داشته باشید.

موفق باشید! 🚀
