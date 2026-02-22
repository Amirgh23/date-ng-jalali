# راهنمای پیکربندی تم

## ذخیره خودکار تم کاربر

به صورت پیش‌فرض، تقویم جلالی تم انتخابی کاربر را در `localStorage` ذخیره می‌کند. این یعنی:

- وقتی کاربر یک تم را انتخاب می‌کند، در دفعات بعدی همان تم نمایش داده می‌شود
- تم در مرورگر کاربر ذخیره می‌شود و بین session‌ها حفظ می‌شود
- هر برنامه می‌تواند تم مستقل خود را داشته باشد

## تنظیم تم پیش‌فرض توسط برنامه‌نویس

برنامه‌نویسان می‌توانند تم پیش‌فرض برنامه خود را تنظیم کنند:

### روش 1: در app.config.ts (Angular Standalone)

```typescript
import { ApplicationConfig } from '@angular/core';
import { JALALI_THEME_CONFIG } from 'jalali-date-picker';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: JALALI_THEME_CONFIG,
      useValue: {
        defaultTheme: 'dark',           // تم پیش‌فرض: 'light', 'dark', 'neon', 'hud', etc.
        storageKey: 'my-app-theme',     // کلید ذخیره‌سازی (اختیاری)
        enablePersistence: true         // فعال/غیرفعال کردن ذخیره‌سازی (اختیاری)
      }
    }
  ]
};
```

### روش 2: در main.ts

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { JALALI_THEME_CONFIG } from 'jalali-date-picker';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: JALALI_THEME_CONFIG,
      useValue: {
        defaultTheme: 'neon',
        storageKey: 'my-custom-theme-key',
        enablePersistence: true
      }
    }
  ]
});
```

### روش 3: در NgModule (Angular Classic)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JALALI_THEME_CONFIG } from 'jalali-date-picker';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: JALALI_THEME_CONFIG,
      useValue: {
        defaultTheme: 'luxury',
        enablePersistence: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## گزینه‌های پیکربندی

### defaultTheme (string)
تم پیش‌فرضی که وقتی کاربر هنوز تمی انتخاب نکرده، نمایش داده می‌شود.

**تم‌های موجود:**
- `'light'` - روشن (پیش‌فرض)
- `'dark'` - تاریک
- `'neon'` - نئون
- `'hud'` - نمایشگر
- `'scifi'` - علمی-تخیلی
- `'glassmorphism'` - شیشه‌ای
- `'terminal'` - ترمینال
- `'gradient'` - گرادیانت
- `'luxury'` - لوکس
- `'win95'` - ویندوز ۹۵
- `'minimal'` - مینیمال
- `'aurora'` - شفق
- `'desert'` - صحرا
- `'forest'` - جنگل
- `'ocean'` - اقیانوس
- `'sunset'` - غروب
- `'midnight'` - نیمه‌شب
- `'monochrome'` - تک‌رنگ
- `'paper'` - کاغذی
- `'pastel'` - پاستلی
- `'rose'` - گل رز

### storageKey (string)
کلید استفاده شده برای ذخیره تم در localStorage.

**پیش‌فرض:** `'jalali-theme'`

**کاربرد:** اگر چند برنامه مختلف در یک دامنه دارید، می‌توانید کلیدهای مختلف استفاده کنید:
```typescript
{
  storageKey: 'admin-panel-theme'  // برای پنل ادمین
}
```

### enablePersistence (boolean)
فعال یا غیرفعال کردن ذخیره‌سازی تم در localStorage.

**پیش‌فرض:** `true`

**کاربرد:** اگر نمی‌خواهید تم ذخیره شود:
```typescript
{
  enablePersistence: false  // تم در هر بار بارگذاری به پیش‌فرض برمی‌گردد
}
```

## اولویت تم‌ها

سیستم تم با این اولویت کار می‌کند:

1. **تم ذخیره شده کاربر** (در localStorage) - بالاترین اولویت
2. **تم پیش‌فرض برنامه‌نویس** (از config)
3. **تم پیش‌فرض کتابخانه** ('light')

## مثال‌های کاربردی

### مثال 1: برنامه با تم تاریک پیش‌فرض

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: JALALI_THEME_CONFIG,
      useValue: { defaultTheme: 'dark' }
    }
  ]
};
```

### مثال 2: برنامه گیمینگ با تم Neon

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: JALALI_THEME_CONFIG,
      useValue: { 
        defaultTheme: 'neon',
        storageKey: 'gaming-app-theme'
      }
    }
  ]
};
```

### مثال 3: برنامه بدون ذخیره‌سازی

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: JALALI_THEME_CONFIG,
      useValue: { 
        defaultTheme: 'minimal',
        enablePersistence: false  // همیشه minimal نمایش داده می‌شود
      }
    }
  ]
};
```

### مثال 4: چند برنامه در یک دامنه

```typescript
// Admin Panel - app.config.ts
{
  provide: JALALI_THEME_CONFIG,
  useValue: { 
    defaultTheme: 'dark',
    storageKey: 'admin-theme'
  }
}

// User Dashboard - app.config.ts
{
  provide: JALALI_THEME_CONFIG,
  useValue: { 
    defaultTheme: 'light',
    storageKey: 'user-theme'
  }
}
```

## استفاده از ThemeService

برنامه‌نویسان می‌توانند به صورت برنامه‌نویسی تم را تغییر دهند:

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from 'jalali-date-picker';

@Component({
  selector: 'app-settings',
  template: `
    <button (click)="setDarkTheme()">تم تاریک</button>
    <button (click)="setNeonTheme()">تم نئون</button>
    <button (click)="resetTheme()">بازنشانی</button>
  `
})
export class SettingsComponent {
  private themeService = inject(ThemeService);

  setDarkTheme() {
    this.themeService.setTheme('dark');
  }

  setNeonTheme() {
    this.themeService.setTheme('neon');
  }

  resetTheme() {
    this.themeService.resetTheme(); // برمی‌گردد به تم پیش‌فرض
  }
}
```

## نکات مهم

1. ✅ تم کاربر به صورت خودکار ذخیره می‌شود
2. ✅ برنامه‌نویس می‌تواند تم پیش‌فرض تنظیم کند
3. ✅ هر برنامه می‌تواند کلید ذخیره‌سازی مستقل داشته باشد
4. ✅ می‌توان ذخیره‌سازی را غیرفعال کرد
5. ✅ تم کاربر اولویت بالاتری از تم پیش‌فرض دارد
