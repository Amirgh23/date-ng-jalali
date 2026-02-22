# 🚀 راهنمای سریع تکمیل بخش‌های باقی‌مانده

این راهنما گام‌به‌گام نحوه تکمیل تمام بخش‌های نیمه‌کاره را توضیح می‌دهد.

---

## 1️⃣ تکمیل کامپوننت‌ها با PT

### الگوی کلی برای هر کامپوننت:

```typescript
// 1. اضافه کردن imports
import { 
  ComponentNamePassThroughOptions, 
  PassThroughMethodOptions 
} from '../../core/models/pass-through.model';
import { StyleClassService } from '../../core/services/style-class.service';

// 2. اضافه کردن Input ها
@Input() unstyled: boolean = false;
@Input() pt?: ComponentNamePassThroughOptions;
@Input() styleClass?: string;
@Input() style?: { [key: string]: any };

// 3. اضافه کردن service به constructor
constructor(
  private styleClassService: StyleClassService,
  // ... other services
) {}

// 4. اضافه کردن متد getPTOptions
private getPTOptions(elementName: keyof ComponentNamePassThroughOptions, context?: any) {
  const ptOption = this.pt?.[elementName];
  if (!ptOption) return undefined;
  
  const methodOptions: PassThroughMethodOptions = {
    instance: this,
    props: { unstyled: this.unstyled, styleClass: this.styleClass, style: this.style },
    state: { /* component state */ },
    context
  };
  
  return this.styleClassService.resolvePassThrough(ptOption, methodOptions);
}

// 5. اضافه کردن متدهای PT برای هر المان
getRootClasses(): string {
  const ptOptions = this.getPTOptions('root');
  return this.styleClassService.getElementClasses(
    'jdp-component-name',
    ptOptions,
    { 'jdp-unstyled': this.unstyled, [this.styleClass || '']: !!this.styleClass }
  );
}

getRootStyles(): { [key: string]: any } {
  const ptOptions = this.getPTOptions('root');
  return this.styleClassService.getElementStyles(this.style, ptOptions);
}

// 6. به‌روزرسانی template
<div [class]="getRootClasses()" [ngStyle]="getRootStyles()">
  <!-- content -->
</div>
```

---

### A. ThemeSelector Component

**فایل: `theme-selector.component.ts`**

```typescript
// 1. اضافه کردن به pass-through.model.ts
export interface ThemeSelectorPassThroughOptions {
  root?: PassThroughType;
  header?: PassThroughType;
  title?: PassThroughType;
  closeButton?: PassThroughType;
  grid?: PassThroughType;
  card?: PassThroughType;
  preview?: PassThroughType;
  info?: PassThroughType;
  name?: PassThroughType;
  type?: PassThroughType;
}

// 2. به‌روزرسانی کامپوننت
import { ThemeSelectorPassThroughOptions, PassThroughMethodOptions } from '../../core/models/pass-through.model';
import { StyleClassService } from '../../core/services/style-class.service';

@Component({
  selector: 'jalali-theme-selector',
  // ...
})
export class ThemeSelectorComponent {
  @Input() unstyled: boolean = false;
  @Input() pt?: ThemeSelectorPassThroughOptions;
  @Input() styleClass?: string;
  @Input() style?: { [key: string]: any };
  
  constructor(
    private themeService: ThemeService,
    private styleClassService: StyleClassService,
    private cdr: ChangeDetectorRef
  ) {}
  
  // متدهای PT
  private getPTOptions(elementName: keyof ThemeSelectorPassThroughOptions, context?: any) {
    const ptOption = this.pt?.[elementName];
    if (!ptOption) return undefined;
    
    const methodOptions: PassThroughMethodOptions = {
      instance: this,
      props: { unstyled: this.unstyled },
      state: { currentTheme: this.currentTheme },
      context
    };
    
    return this.styleClassService.resolvePassThrough(ptOption, methodOptions);
  }
  
  getRootClasses(): string {
    const ptOptions = this.getPTOptions('root');
    return this.styleClassService.getElementClasses('jdp-theme-selector', ptOptions);
  }
  
  getCardClasses(theme: ThemeConfig): string {
    const ptOptions = this.getPTOptions('card', { theme });
    return this.styleClassService.getElementClasses(
      'jdp-theme-card',
      ptOptions,
      { 'jdp-theme-card--active': this.currentTheme?.name === theme.name }
    );
  }
  
  // ... سایر متدها
}

// 3. به‌روزرسانی template
template: `
  <div [class]="getRootClasses()" [ngStyle]="getRootStyles()">
    <div [class]="getHeaderClasses()">
      <h3 [class]="getTitleClasses()">انتخاب تم</h3>
      @if (showCloseButton) {
        <button [class]="getCloseButtonClasses()" (click)="close()">×</button>
      }
    </div>
    
    <div [class]="getGridClasses()">
      @for (theme of themes; track theme.name) {
        <div [class]="getCardClasses(theme)" (click)="selectTheme(theme)">
          <div [class]="getPreviewClasses(theme)">
            <!-- preview content -->
          </div>
          <div [class]="getInfoClasses()">
            <span [class]="getNameClasses()">{{ theme.displayName }}</span>
            <span [class]="getTypeClasses()">{{ theme.isDark ? 'تاریک' : 'روشن' }}</span>
          </div>
        </div>
      }
    </div>
  </div>
`
```

---

### B. ColorPicker Component

**مشابه ThemeSelector با المان‌های:**
- root
- header
- colorGrid
- colorSwatch
- input
- preview

---

### C. CalendarSwitch Component

**مشابه ThemeSelector با المان‌های:**
- root
- button (برای هر نوع تقویم)
- activeIndicator

---

### D. DayInfoModal Component

**مشابه ThemeSelector با المان‌های:**
- root (modal overlay)
- dialog
- header
- title
- closeButton
- content
- footer

---

## 2️⃣ ایجاد تم‌های اضافی

### الگوی کلی برای تم جدید:

```scss
// themes/styled/theme-name.scss
@use '../base/variables' as *;
@use '../base/css-variables';
@use '../base/layers';
@use '../base/mixins' as *;

// Theme-specific overrides
$primary-500: #color;
$primary-600: #color;
// ...

:root,
[data-theme="theme-name"] {
  --jdp-primary-500: #{$primary-500};
  // ...
}

@layer jdp-components {
  // Component styles
  .jdp-calendar {
    // ...
  }
}
```

### A. Material Light Theme

```scss
// themes/styled/material-light.scss
@use '../base/variables' as *;
@use '../base/css-variables';
@use '../base/layers';
@use '../base/mixins' as *;

// Material Design colors
$primary-500: #6366f1; // Indigo
$primary-600: #4f46e5;
$primary-700: #4338ca;

$surface-0: #ffffff;
$surface-50: #fafafa;
$surface-100: #f5f5f5;

$border-radius: 4px; // Material uses smaller radius

:root,
[data-theme="material-light"] {
  --jdp-primary-500: #{$primary-500};
  --jdp-primary-600: #{$primary-600};
  --jdp-border-radius: #{$border-radius};
  
  // Material elevation shadows
  --jdp-shadow-md: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
}

@layer jdp-components {
  [data-theme="material-light"] {
    .jdp-calendar {
      font-family: 'Roboto', sans-serif;
      
      &-day-cell {
        border-radius: 50%; // Material uses circular cells
        
        &:hover {
          background: rgba(99, 102, 241, 0.08);
        }
        
        &--selected {
          background: var(--jdp-primary-500);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      }
    }
  }
}
```

### B. Material Dark Theme

```scss
// themes/styled/material-dark.scss
// مشابه material-light با رنگ‌های تاریک
$surface-0: #121212;
$surface-50: #1e1e1e;
// ...
```

### C. Bootstrap Light Theme

```scss
// themes/styled/bootstrap-light.scss
$primary-500: #0d6efd; // Bootstrap primary
$border-radius: 0.375rem; // Bootstrap border radius
// ...
```

### D. Bootstrap Dark Theme

```scss
// themes/styled/bootstrap-dark.scss
$surface-0: #212529;
$primary-500: #0d6efd;
// ...
```

---

## 3️⃣ ThemeService Integration

**فایل: `theme.service.ts`**

```typescript
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ThemeDefinition {
  name: string;
  displayName: string;
  cssFile: string;
  isDark: boolean;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_LINK_ID = 'jdp-theme-link';
  
  private themes: ThemeDefinition[] = [
    { name: 'lara-light-blue', displayName: 'Lara Light Blue', cssFile: 'lara-light-blue.css', isDark: false },
    { name: 'lara-dark-blue', displayName: 'Lara Dark Blue', cssFile: 'lara-dark-blue.css', isDark: true },
    { name: 'material-light', displayName: 'Material Light', cssFile: 'material-light.css', isDark: false },
    { name: 'material-dark', displayName: 'Material Dark', cssFile: 'material-dark.css', isDark: true },
    { name: 'bootstrap-light', displayName: 'Bootstrap Light', cssFile: 'bootstrap-light.css', isDark: false },
    { name: 'bootstrap-dark', displayName: 'Bootstrap Dark', cssFile: 'bootstrap-dark.css', isDark: true },
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  switchTheme(themeName: string): Promise<void> {
    const theme = this.themes.find(t => t.name === themeName);
    if (!theme) return Promise.reject('Theme not found');
    
    if (!isPlatformBrowser(this.platformId)) return Promise.resolve();
    
    return this.loadThemeCSS(theme);
  }
  
  private loadThemeCSS(theme: ThemeDefinition): Promise<void> {
    return new Promise((resolve, reject) => {
      const head = document.head;
      let link = document.getElementById(this.THEME_LINK_ID) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.id = this.THEME_LINK_ID;
        link.rel = 'stylesheet';
        head.appendChild(link);
      }
      
      link.onload = () => {
        document.documentElement.setAttribute('data-theme', theme.name);
        resolve();
      };
      
      link.onerror = () => reject('Failed to load theme');
      link.href = `assets/themes/${theme.cssFile}`;
    });
  }
  
  updateCSSVariables(vars: { [key: string]: string }): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(`--jdp-${key}`, value);
    });
  }
}
```

---

## 4️⃣ Global PT Configuration

**فایل: `config.ts`**

```typescript
import { InjectionToken, Provider } from '@angular/core';
import { GlobalPassThroughOptions } from './models/pass-through.model';

export const JALALI_DATE_PICKER_CONFIG = new InjectionToken<JalaliDatePickerConfig>(
  'JALALI_DATE_PICKER_CONFIG'
);

export interface JalaliDatePickerConfig {
  pt?: GlobalPassThroughOptions;
  unstyled?: boolean;
  theme?: string;
}

export function provideJalaliDatePicker(config: JalaliDatePickerConfig): Provider {
  return {
    provide: JALALI_DATE_PICKER_CONFIG,
    useValue: config
  };
}
```

**استفاده:**

```typescript
// app.config.ts
import { provideJalaliDatePicker } from 'jalali-date-picker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideJalaliDatePicker({
      pt: {
        calendar: {
          root: { class: 'global-calendar' }
        }
      },
      unstyled: false,
      theme: 'lara-light-blue'
    })
  ]
};
```

**در کامپوننت:**

```typescript
constructor(
  @Optional() @Inject(JALALI_DATE_PICKER_CONFIG) private config: JalaliDatePickerConfig
) {
  if (config?.pt) {
    this.pt = { ...config.pt.calendar, ...this.pt };
  }
}
```

---

## 5️⃣ Unit Tests

### الگوی کلی:

```typescript
// component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from './component';

describe('Component', () => {
  let component: Component;
  let fixture: ComponentFixture<Component>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Component]
    }).compileComponents();
    
    fixture = TestBed.createComponent(Component);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('Pass Through', () => {
    it('should apply PT classes to root', () => {
      component.pt = { root: { class: 'custom' } };
      fixture.detectChanges();
      
      const root = fixture.nativeElement.querySelector('.jdp-component');
      expect(root.classList.contains('custom')).toBe(true);
    });
    
    it('should apply PT styles', () => {
      component.pt = { root: { style: { color: 'red' } } };
      fixture.detectChanges();
      
      const root = fixture.nativeElement.querySelector('.jdp-component');
      expect(root.style.color).toBe('red');
    });
    
    it('should resolve PT functions', () => {
      component.pt = {
        root: (options) => ({ class: 'dynamic' })
      };
      fixture.detectChanges();
      
      const root = fixture.nativeElement.querySelector('.jdp-component');
      expect(root.classList.contains('dynamic')).toBe(true);
    });
  });
});
```

### StyleClassService Tests:

```typescript
// style-class.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { StyleClassService } from './style-class.service';

describe('StyleClassService', () => {
  let service: StyleClassService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleClassService);
  });
  
  describe('mergeClasses', () => {
    it('should merge string classes', () => {
      const result = service.mergeClasses('class1', 'class2');
      expect(result).toBe('class1 class2');
    });
    
    it('should merge array classes', () => {
      const result = service.mergeClasses(['class1', 'class2']);
      expect(result).toBe('class1 class2');
    });
    
    it('should merge object classes', () => {
      const result = service.mergeClasses({ class1: true, class2: false });
      expect(result).toBe('class1');
    });
    
    it('should merge mixed classes', () => {
      const result = service.mergeClasses('class1', ['class2'], { class3: true });
      expect(result).toBe('class1 class2 class3');
    });
  });
  
  describe('mergeStyles', () => {
    it('should merge style objects', () => {
      const result = service.mergeStyles({ color: 'red' }, { fontSize: '16px' });
      expect(result).toEqual({ color: 'red', fontSize: '16px' });
    });
  });
});
```

---

## 6️⃣ Storybook Setup

```bash
npx storybook@latest init
```

**فایل: `calendar.stories.ts`**

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { JalaliCalendarComponent } from './jalali-calendar.component';

const meta: Meta<JalaliCalendarComponent> = {
  title: 'Components/Calendar',
  component: JalaliCalendarComponent,
  tags: ['autodocs'],
  argTypes: {
    unstyled: { control: 'boolean' },
    calendarType: {
      control: 'select',
      options: ['jalali', 'gregorian', 'hijri']
    }
  }
};

export default meta;
type Story = StoryObj<JalaliCalendarComponent>;

export const Default: Story = {
  args: {
    selectedDate: new Date()
  }
};

export const Unstyled: Story = {
  args: {
    unstyled: true,
    selectedDate: new Date()
  }
};

export const WithPassThrough: Story = {
  args: {
    selectedDate: new Date(),
    pt: {
      root: { class: 'custom-calendar' },
      dayCell: { class: 'custom-day' }
    }
  }
};

export const DarkMode: Story = {
  args: {
    selectedDate: new Date()
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};
```

---

## 7️⃣ API Documentation

```bash
npm install --save-dev typedoc
```

**فایل: `typedoc.json`**

```json
{
  "entryPoints": ["projects/jalali-date-picker/src/public-api.ts"],
  "out": "docs",
  "exclude": ["**/*.spec.ts"],
  "excludePrivate": true,
  "excludeProtected": true,
  "readme": "README.md",
  "name": "Jalali Date Picker",
  "theme": "default"
}
```

**در package.json:**

```json
{
  "scripts": {
    "docs": "typedoc"
  }
}
```

---

## 📋 چک‌لیست تکمیل

### کامپوننت‌ها
- [ ] ThemeSelector PT
- [ ] ColorPicker PT
- [ ] CalendarSwitch PT
- [ ] DayInfoModal PT

### تم‌ها
- [ ] Material Light
- [ ] Material Dark
- [ ] Bootstrap Light
- [ ] Bootstrap Dark

### ویژگی‌ها
- [ ] ThemeService Integration
- [ ] Global PT Configuration
- [ ] Unit Tests (حداقل 80% coverage)
- [ ] Storybook Stories
- [ ] API Documentation

---

## ⏱️ زمان‌بندی پیشنهادی

| کار | زمان |
|-----|------|
| ThemeSelector PT | 2 ساعت |
| ColorPicker PT | 2 ساعت |
| CalendarSwitch PT | 1 ساعت |
| DayInfoModal PT | 1 ساعت |
| Material Themes | 3 ساعت |
| Bootstrap Themes | 3 ساعت |
| ThemeService | 3 ساعت |
| Global PT Config | 2 ساعت |
| Unit Tests | 8 ساعت |
| Storybook | 4 ساعت |
| API Docs | 2 ساعت |
| **جمع کل** | **31 ساعت** |

---

## 🎯 اولویت‌بندی

### فاز 1 (ضروری - 6 ساعت)
1. ThemeSelector PT
2. ColorPicker PT
3. CalendarSwitch PT
4. DayInfoModal PT

### فاز 2 (مهم - 9 ساعت)
5. Material Themes
6. Bootstrap Themes
7. ThemeService Integration

### فاز 3 (توصیه شده - 16 ساعت)
8. Global PT Config
9. Unit Tests
10. Storybook
11. API Docs

---

**با تکمیل این راهنما، کتابخانه 100% کامل خواهد شد! 🎉**
