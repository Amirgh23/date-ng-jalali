# قابلیت تغییر زبان / Language Toggle Feature

## خلاصه / Summary

یک دکمه تغییر زبان کوچک به هدر تقویم اضافه شده است که به کاربران اجازه می‌دهد بین زبان فارسی و انگلیسی جابجا شوند.

A small language toggle button has been added to the calendar header that allows users to switch between Persian and English languages.

---

## ویژگی‌ها / Features

### 1. دکمه تغییر زبان / Language Toggle Button
- **موقعیت**: در کنار دکمه انتخاب تم در هدر پنل تقویم
- **Position**: Next to the theme selector button in the calendar panel header

### 2. زبان‌های پشتیبانی‌شده / Supported Languages
- **فارسی (fa)**: زبان پیش‌فرض
- **English (en)**: زبان دوم
- **عربی (ar)**: قابل فعال‌سازی
- **کوردی (ku)**: قابل فعال‌سازی

### 3. نمایش زبان / Language Display
- **فارسی**: نمایش "فا"
- **English**: Display "EN"
- **عربی**: نمایش "عر"
- **کوردی**: نمایش "کو"

### 4. قابلیت‌های اضافی / Additional Features
- ذخیره‌سازی خودکار زبان انتخابی در localStorage
- تغییر خودکار جهت متن (RTL/LTR)
- به‌روزرسانی خودکار تمام متن‌های رابط کاربری
- پشتیبانی کامل از دسترسی‌پذیری (Accessibility)

---

## نحوه استفاده / Usage

### در کامپوننت / In Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <jalali-date-picker
      [locale]="currentLocale"
      (localeChange)="onLocaleChange($event)"
      [(ngModel)]="selectedDate">
    </jalali-date-picker>
  `
})
export class DemoComponent {
  currentLocale: 'fa' | 'en' = 'fa';
  selectedDate: Date = new Date();

  onLocaleChange(locale: 'fa' | 'en') {
    console.log('Language changed to:', locale);
    this.currentLocale = locale;
  }
}
```

### تنظیم زبان پیش‌فرض / Set Default Language

```typescript
<jalali-date-picker
  [locale]="'en'"
  [(ngModel)]="selectedDate">
</jalali-date-picker>
```

---

## جزئیات فنی / Technical Details

### 1. سرویس LocaleService

سرویس `LocaleService` مسئول مدیریت زبان است:

```typescript
export class LocaleService {
  // تنظیم زبان
  setLocale(locale: SupportedLocale): void
  
  // دریافت زبان فعلی
  getLocale(): SupportedLocale
  
  // ترجمه کلید
  translate(key: string): string
  
  // دریافت جهت متن
  getDirection(): 'rtl' | 'ltr'
}
```

### 2. ذخیره‌سازی / Storage

زبان انتخابی در localStorage با کلید `jalali-locale` ذخیره می‌شود:

```typescript
localStorage.setItem('jalali-locale', 'fa');
```

### 3. رویدادها / Events

```typescript
@Output() localeChange = new EventEmitter<SupportedLocale>();
```

---

## استایل‌ها / Styles

### دکمه زبان / Language Button

```css
.jdp-date-picker-lang-button {
  background: var(--background-light, #f9fafb);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.jdp-date-picker-lang-button:hover {
  background: var(--secondary-color, #6366f1);
  color: var(--background, white);
}
```

### متن زبان / Language Text

```css
.jdp-lang-text {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
}
```

---

## دسترسی‌پذیری / Accessibility

دکمه تغییر زبان کاملاً قابل دسترس است:

```html
<button 
  type="button"
  class="jdp-date-picker-lang-button"
  [attr.aria-label]="getLanguageLabel()"
  [title]="getLanguageLabel()"
  (click)="toggleLanguage()"
  (keydown.enter)="toggleLanguage()"
  (keydown.space)="toggleLanguage()">
  <span class="jdp-lang-text">{{ getLanguageShortName() }}</span>
</button>
```

### ویژگی‌های دسترسی‌پذیری:
- پشتیبانی از کیبورد (Enter و Space)
- برچسب‌های ARIA مناسب
- Tooltip با نام کامل زبان
- تغییر فوکوس واضح

---

## مثال‌های کاربردی / Use Cases

### 1. تغییر زبان به صورت برنامه‌نویسی

```typescript
// تغییر به انگلیسی
this.localeService.setLocale('en');

// تغییر به فارسی
this.localeService.setLocale('fa');
```

### 2. دریافت زبان فعلی

```typescript
const currentLocale = this.localeService.getLocale();
console.log('Current language:', currentLocale);
```

### 3. گوش دادن به تغییرات زبان

```typescript
this.localeService.currentLocale$.subscribe(locale => {
  console.log('Language changed to:', locale);
});
```

---

## تست / Testing

برای تست قابلیت تغییر زبان:

1. باز کردن تقویم
2. کلیک روی دکمه زبان (در کنار دکمه تم)
3. مشاهده تغییر زبان از فارسی به انگلیسی
4. کلیک مجدد برای بازگشت به فارسی

---

## یادداشت‌های توسعه / Development Notes

### فایل‌های تغییر یافته:
- `projects/jalali-date-picker/src/lib/components/date-picker/jalali-date-picker.component.ts`
  - اضافه شدن دکمه تغییر زبان به template
  - اضافه شدن متدهای `getLanguageShortName()` و `getLanguageLabel()`
  - به‌روزرسانی متد `toggleLanguage()`
  - اضافه شدن استایل‌های `.jdp-lang-text`

### سرویس‌های استفاده شده:
- `LocaleService`: مدیریت زبان و ترجمه
- `ChangeDetectorRef`: به‌روزرسانی رابط کاربری

---

## نسخه / Version

- **تاریخ اضافه شدن**: 2026-02-23
- **نسخه کتابخانه**: 1.0.0
- **وضعیت**: ✅ کامل و آماده استفاده

---

## پشتیبانی / Support

برای گزارش مشکلات یا پیشنهادات، لطفاً یک Issue در مخزن GitHub ایجاد کنید.

For bug reports or feature requests, please create an Issue in the GitHub repository.
