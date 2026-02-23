# 📅 Jalali Date Picker | تقویم جلالی

<div dir="rtl">

[English](#english-documentation) | [فارسی](#مستندات-فارسی)

</div>

---

## مستندات فارسی

<div dir="rtl">

### 🌟 معرفی

کامپوننت Angular حرفه‌ای برای انتخاب تاریخ با پشتیبانی از سه تقویم جلالی (شمسی)، میلادی و قمری همراه با ۲۱ تم زیبا و پشتیبانی کامل از RTL.

### ✨ ویژگی‌ها

- 📅 **سه سیستم تقویم**: جلالی (شمسی)، میلادی (گرگوریان)، قمری (هجری)
- 🎨 **۲۱ تم از پیش ساخته**: از کلاسیک تا مدرن، نئون، شیشه‌ای و...
- 🌍 **دوزبانه**: فارسی و انگلیسی با تبدیل خودکار RTL/LTR
- ♿ **دسترسی‌پذیری کامل**: ARIA labels، ناوبری با کیبورد، سازگار با صفحه‌خوان
- ⚡ **عملکرد بالا**: OnPush change detection، کش‌گذاری هوشمند
- 🎯 **حالت‌های انتخاب**: تک تاریخ، محدوده، چند تاریخ
- 🔧 **قابل سفارشی‌سازی**: Pass-through API برای کنترل کامل استایل
- 🎭 **تم‌های متنوع**: Light، Dark، Glassmorphism، Neon، HUD، Terminal و...
- 📱 **ریسپانسیو**: سازگار با موبایل، تبلت و دسکتاپ
- 🚀 **سبک**: بدون وابستگی اضافی

### 📦 نصب

```bash
npm install @lomineuro/jalali-date-picker
```

### 🚀 شروع سریع

#### ۱. وارد کردن استایل‌ها

در فایل `angular.json` یا `styles.scss`:

```scss
@import '@lomineuro/jalali-date-picker/themes/index.scss';
```

#### ۲. استفاده ساده

```typescript
import { Component } from '@angular/core';
import { JalaliDatePickerComponent } from '@lomineuro/jalali-date-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JalaliDatePickerComponent],
  template: `
    <jalali-date-picker
      [(selectedDate)]="selectedDate"
      [locale]="'fa'"
      (dateSelect)="onDateSelect($event)">
    </jalali-date-picker>
  `
})
export class AppComponent {
  selectedDate = new Date();
  
  onDateSelect(date: Date) {
    console.log('تاریخ انتخاب شده:', date);
  }
}
```

### 📖 راهنمای استفاده

#### انتخاب محدوده تاریخ

```typescript
import { DateRange } from '@lomineuro/jalali-date-picker';

@Component({
  template: `
    <jalali-date-picker
      selectionMode="range"
      [selectedRange]="dateRange"
      (rangeSelect)="onRangeSelect($event)">
    </jalali-date-picker>
  `
})
export class MyComponent {
  dateRange: DateRange = { start: null, end: null };
  
  onRangeSelect(range: DateRange) {
    console.log('از:', range.start, 'تا:', range.end);
  }
}
```

#### انتخاب چند تاریخ

```typescript
@Component({
  template: `
    <jalali-date-picker
      selectionMode="multiple"
      [selectedDates]="dates"
      (multipleSelect)="onMultipleSelect($event)">
    </jalali-date-picker>
  `
})
export class MyComponent {
  dates: Date[] = [];
  
  onMultipleSelect(dates: Date[]) {
    console.log('تاریخ‌های انتخاب شده:', dates);
  }
}
```

#### تغییر تقویم

```html
<jalali-date-picker
  [calendarType]="'jalali'"
  [locale]="'fa'">
</jalali-date-picker>

<!-- تقویم میلادی -->
<jalali-date-picker
  [calendarType]="'gregorian'"
  [locale]="'en'">
</jalali-date-picker>

<!-- تقویم قمری -->
<jalali-date-picker
  [calendarType]="'hijri'"
  [locale]="'ar'">
</jalali-date-picker>
```

#### محدود کردن تاریخ‌ها

```typescript
@Component({
  template: `
    <jalali-date-picker
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabledDates]="disabledDates">
    </jalali-date-picker>
  `
})
export class MyComponent {
  minDate = new Date(2024, 0, 1);  // ۱ ژانویه ۲۰۲۴
  maxDate = new Date(2024, 11, 31); // ۳۱ دسامبر ۲۰۲۴
  disabledDates = [
    new Date(2024, 5, 15),
    new Date(2024, 5, 16)
  ];
}
```

### 🎨 تم‌ها

کامپوننت با ۲۱ تم از پیش ساخته ارائه می‌شود:

#### تم‌های کلاسیک
- `light` - روشن کلاسیک
- `dark` - تیره کلاسیک
- `minimal` - مینیمال

#### تم‌های مدرن
- `glassmorphism` - شیشه‌ای
- `gradient` - گرادیانت
- `modern` - مدرن

#### تم‌های خاص
- `neon` - نئون
- `hud` - HUD
- `terminal` - ترمینال
- `scifi` - علمی-تخیلی
- `win95` - ویندوز ۹۵

#### تم‌های رنگی
- `ocean` - اقیانوس
- `forest` - جنگل
- `sunset` - غروب
- `aurora` - شفق
- `desert` - کویر
- `midnight` - نیمه‌شب
- `rose` - گل سرخ
- `pastel` - پاستلی
- `luxury` - لوکس
- `monochrome` - تک‌رنگ
- `paper` - کاغذی

#### استفاده از تم

```html
<jalali-date-picker
  [theme]="'glassmorphism'">
</jalali-date-picker>
```

### 🔧 API مرجع

#### ورودی‌ها (Inputs)

| ویژگی | نوع | پیش‌فرض | توضیحات |
|-------|-----|---------|---------|
| `selectedDate` | `Date` | `new Date()` | تاریخ انتخاب شده |
| `selectionMode` | `'single' \| 'range' \| 'multiple'` | `'single'` | حالت انتخاب |
| `selectedRange` | `DateRange` | `null` | محدوده انتخاب شده |
| `selectedDates` | `Date[]` | `[]` | تاریخ‌های انتخاب شده (چندگانه) |
| `calendarType` | `'jalali' \| 'gregorian' \| 'hijri'` | `'jalali'` | نوع تقویم |
| `minDate` | `Date` | `null` | حداقل تاریخ قابل انتخاب |
| `maxDate` | `Date` | `null` | حداکثر تاریخ قابل انتخاب |
| `disabledDates` | `Date[]` | `[]` | تاریخ‌های غیرفعال |
| `locale` | `'fa' \| 'en' \| 'ar' \| 'ku'` | `'fa'` | زبان نمایش |
| `theme` | `string` | `'light'` | تم ظاهری |
| `disabled` | `boolean` | `false` | غیرفعال کردن کامپوننت |
| `placeholder` | `string` | `''` | متن placeholder |
| `zIndex` | `number` | `9999` | z-index پنل تقویم |
| `showThemeSelector` | `boolean` | `true` | نمایش انتخابگر تم |
| `showColorPicker` | `boolean` | `true` | نمایش انتخابگر رنگ |
| `showCalendarSwitch` | `boolean` | `true` | نمایش سوئیچ تقویم |

#### خروجی‌ها (Outputs)

| رویداد | نوع | توضیحات |
|--------|-----|---------|
| `dateSelect` | `EventEmitter<Date>` | هنگام انتخاب تاریخ |
| `rangeSelect` | `EventEmitter<DateRange>` | هنگام انتخاب محدوده |
| `multipleSelect` | `EventEmitter<Date[]>` | هنگام انتخاب چند تاریخ |
| `localeChange` | `EventEmitter<SupportedLocale>` | هنگام تغییر زبان |
| `themeChange` | `EventEmitter<string>` | هنگام تغییر تم |
| `calendarTypeChange` | `EventEmitter<CalendarType>` | هنگام تغییر نوع تقویم |

### 🎯 سفارشی‌سازی پیشرفته

#### Pass-Through API

برای کنترل کامل استایل‌ها:

```typescript
const customPT = {
  root: { class: 'my-custom-class' },
  input: { class: 'my-input-class' },
  panel: { class: 'my-panel-class' }
};
```

```html
<jalali-date-picker
  [pt]="customPT"
  [unstyled]="false">
</jalali-date-picker>
```

#### تم سفارشی

```scss
// در فایل styles.scss
.my-custom-theme {
  --primary-color: #your-color;
  --background: #your-bg;
  --text-color: #your-text;
  // ...
}
```

### 🌍 پشتیبانی از زبان‌ها

- `fa` - فارسی (پیش‌فرض)
- `en` - انگلیسی
- `ar` - عربی
- `ku` - کردی

تبدیل خودکار RTL/LTR بر اساس زبان انتخابی.

### ♿ دسترسی‌پذیری

- ✅ ARIA labels کامل
- ✅ ناوبری با کیبورد (فلش‌ها، Enter، Escape)
- ✅ سازگار با صفحه‌خوان
- ✅ Focus management
- ✅ مطابق با WCAG 2.1

### ⚡ بهینه‌سازی عملکرد

- OnPush change detection strategy
- کش‌گذاری هوشمند تبدیل تاریخ
- Lazy loading برای تم‌ها
- Virtual scrolling برای لیست‌های بزرگ
- Tree-shakeable (sideEffects: false)

### 📱 ریسپانسیو

کامپوننت به طور خودکار با اندازه‌های مختلف صفحه سازگار می‌شود:

- موبایل: < 600px
- تبلت: 600px - 1024px
- دسکتاپ: > 1024px

### 🔨 ساخت و انتشار

#### ساخت کتابخانه

```bash
ng build jalali-date-picker
```

#### انتشار در npm

```bash
cd dist/jalali-date-picker
npm publish
```

### 🧪 تست

```bash
ng test jalali-date-picker
```

### 📄 مجوز

MIT License - استفاده آزاد در پروژه‌های تجاری و غیرتجاری

### 🤝 مشارکت

مشارکت‌ها خوشایند است! لطفاً:

1. Fork کنید
2. برنچ feature بسازید (`git checkout -b feature/AmazingFeature`)
3. تغییرات را commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. Push کنید (`git push origin feature/AmazingFeature`)
5. Pull Request باز کنید

### 📞 پشتیبانی

- 📧 ایمیل: amirghafarian7879@gmail.com
- 🐛 گزارش باگ: [GitHub Issues](https://github.com/lomineuro/jalali-date-picker/issues)
- 📦 npm: [@lomineuro/jalali-date-picker](https://npmjs.com/package/@lomineuro/jalali-date-picker)

### 👨‍💻 سازنده

**Amirreza Ghafarian**
- 📧 Email: amirghafarian7879@gmail.com
- 🏢 Organization: [@lomineuro](https://npmjs.com/org/lomineuro)

### 🙏 تشکر

ساخته شده با ❤️ برای جامعه توسعه‌دهندگان ایرانی

</div>

---

## English Documentation

### 🌟 Introduction

A professional Angular component for date selection supporting three calendar systems: Jalali (Persian), Gregorian, and Hijri, with 21 beautiful themes and full RTL support.

### ✨ Features

- 📅 **Three Calendar Systems**: Jalali (Solar), Gregorian, Hijri (Lunar)
- 🎨 **21 Pre-built Themes**: From classic to modern, neon, glassmorphism, and more
- 🌍 **Bilingual**: Persian and English with automatic RTL/LTR conversion
- ♿ **Full Accessibility**: ARIA labels, keyboard navigation, screen reader compatible
- ⚡ **High Performance**: OnPush change detection, smart caching
- 🎯 **Selection Modes**: Single date, range, multiple dates
- 🔧 **Highly Customizable**: Pass-through API for complete style control
- 🎭 **Diverse Themes**: Light, Dark, Glassmorphism, Neon, HUD, Terminal, and more
- 📱 **Responsive**: Mobile, tablet, and desktop compatible
- 🚀 **Lightweight**: No additional dependencies

### 📦 Installation

```bash
npm install @lomineuro/jalali-date-picker
```

### 🚀 Quick Start

#### 1. Import Styles

In `angular.json` or `styles.scss`:

```scss
@import '@lomineuro/jalali-date-picker/themes/index.scss';
```

#### 2. Basic Usage

```typescript
import { Component } from '@angular/core';
import { JalaliDatePickerComponent } from '@lomineuro/jalali-date-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JalaliDatePickerComponent],
  template: `
    <jalali-date-picker
      [(selectedDate)]="selectedDate"
      [locale]="'en'"
      (dateSelect)="onDateSelect($event)">
    </jalali-date-picker>
  `
})
export class AppComponent {
  selectedDate = new Date();
  
  onDateSelect(date: Date) {
    console.log('Selected date:', date);
  }
}
```

### 📖 Usage Guide

#### Date Range Selection

```typescript
import { DateRange } from '@lomineuro/jalali-date-picker';

@Component({
  template: `
    <jalali-date-picker
      selectionMode="range"
      [selectedRange]="dateRange"
      (rangeSelect)="onRangeSelect($event)">
    </jalali-date-picker>
  `
})
export class MyComponent {
  dateRange: DateRange = { start: null, end: null };
  
  onRangeSelect(range: DateRange) {
    console.log('From:', range.start, 'To:', range.end);
  }
}
```

#### Multiple Date Selection

```typescript
@Component({
  template: `
    <jalali-date-picker
      selectionMode="multiple"
      [selectedDates]="dates"
      (multipleSelect)="onMultipleSelect($event)">
    </jalali-date-picker>
  `
})
export class MyComponent {
  dates: Date[] = [];
  
  onMultipleSelect(dates: Date[]) {
    console.log('Selected dates:', dates);
  }
}
```

#### Calendar Type

```html
<!-- Jalali Calendar -->
<jalali-date-picker
  [calendarType]="'jalali'"
  [locale]="'fa'">
</jalali-date-picker>

<!-- Gregorian Calendar -->
<jalali-date-picker
  [calendarType]="'gregorian'"
  [locale]="'en'">
</jalali-date-picker>

<!-- Hijri Calendar -->
<jalali-date-picker
  [calendarType]="'hijri'"
  [locale]="'ar'">
</jalali-date-picker>
```

#### Date Restrictions

```typescript
@Component({
  template: `
    <jalali-date-picker
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabledDates]="disabledDates">
    </jalali-date-picker>
  `
})
export class MyComponent {
  minDate = new Date(2024, 0, 1);  // January 1, 2024
  maxDate = new Date(2024, 11, 31); // December 31, 2024
  disabledDates = [
    new Date(2024, 5, 15),
    new Date(2024, 5, 16)
  ];
}
```

### 🎨 Themes

The component comes with 21 pre-built themes:

#### Classic Themes
- `light` - Classic Light
- `dark` - Classic Dark
- `minimal` - Minimal

#### Modern Themes
- `glassmorphism` - Glassmorphism
- `gradient` - Gradient
- `modern` - Modern

#### Special Themes
- `neon` - Neon
- `hud` - HUD
- `terminal` - Terminal
- `scifi` - Sci-Fi
- `win95` - Windows 95

#### Colorful Themes
- `ocean` - Ocean
- `forest` - Forest
- `sunset` - Sunset
- `aurora` - Aurora
- `desert` - Desert
- `midnight` - Midnight
- `rose` - Rose
- `pastel` - Pastel
- `luxury` - Luxury
- `monochrome` - Monochrome
- `paper` - Paper

#### Using Themes

```html
<jalali-date-picker
  [theme]="'glassmorphism'">
</jalali-date-picker>
```

### 🔧 API Reference

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectedDate` | `Date` | `new Date()` | Currently selected date |
| `selectionMode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode |
| `selectedRange` | `DateRange` | `null` | Selected date range |
| `selectedDates` | `Date[]` | `[]` | Selected dates (multiple mode) |
| `calendarType` | `'jalali' \| 'gregorian' \| 'hijri'` | `'jalali'` | Calendar type |
| `minDate` | `Date` | `null` | Minimum selectable date |
| `maxDate` | `Date` | `null` | Maximum selectable date |
| `disabledDates` | `Date[]` | `[]` | Disabled dates |
| `locale` | `'fa' \| 'en' \| 'ar' \| 'ku'` | `'fa'` | Display language |
| `theme` | `string` | `'light'` | Visual theme |
| `disabled` | `boolean` | `false` | Disable component |
| `placeholder` | `string` | `''` | Placeholder text |
| `zIndex` | `number` | `9999` | Calendar panel z-index |
| `showThemeSelector` | `boolean` | `true` | Show theme selector |
| `showColorPicker` | `boolean` | `true` | Show color picker |
| `showCalendarSwitch` | `boolean` | `true` | Show calendar switch |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `dateSelect` | `EventEmitter<Date>` | Emitted when date is selected |
| `rangeSelect` | `EventEmitter<DateRange>` | Emitted when range is selected |
| `multipleSelect` | `EventEmitter<Date[]>` | Emitted when multiple dates selected |
| `localeChange` | `EventEmitter<SupportedLocale>` | Emitted when locale changes |
| `themeChange` | `EventEmitter<string>` | Emitted when theme changes |
| `calendarTypeChange` | `EventEmitter<CalendarType>` | Emitted when calendar type changes |

### 🎯 Advanced Customization

#### Pass-Through API

For complete style control:

```typescript
const customPT = {
  root: { class: 'my-custom-class' },
  input: { class: 'my-input-class' },
  panel: { class: 'my-panel-class' }
};
```

```html
<jalali-date-picker
  [pt]="customPT"
  [unstyled]="false">
</jalali-date-picker>
```

#### Custom Theme

```scss
// In styles.scss
.my-custom-theme {
  --primary-color: #your-color;
  --background: #your-bg;
  --text-color: #your-text;
  // ...
}
```

### 🌍 Language Support

- `fa` - Persian (default)
- `en` - English
- `ar` - Arabic
- `ku` - Kurdish

Automatic RTL/LTR conversion based on selected language.

### ♿ Accessibility

- ✅ Complete ARIA labels
- ✅ Keyboard navigation (arrows, Enter, Escape)
- ✅ Screen reader compatible
- ✅ Focus management
- ✅ WCAG 2.1 compliant

### ⚡ Performance Optimization

- OnPush change detection strategy
- Smart date conversion caching
- Lazy loading for themes
- Virtual scrolling for large lists
- Tree-shakeable (sideEffects: false)

### 📱 Responsive

Component automatically adapts to different screen sizes:

- Mobile: < 600px
- Tablet: 600px - 1024px
- Desktop: > 1024px

### 🔨 Build & Publish

#### Build Library

```bash
ng build jalali-date-picker
```

#### Publish to npm

```bash
cd dist/jalali-date-picker
npm publish
```

### 🧪 Testing

```bash
ng test jalali-date-picker
```

### 📄 License

MIT License - Free to use in commercial and non-commercial projects

### 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📞 Support

- 📧 Email: amirghafarian7879@gmail.com
- 🐛 Report bugs: [GitHub Issues](https://github.com/lomineuro/jalali-date-picker/issues)
- 📦 npm: [@lomineuro/jalali-date-picker](https://npmjs.com/package/@lomineuro/jalali-date-picker)

### 👨‍💻 Author

**Amirreza Ghafarian**
- 📧 Email: amirghafarian7879@gmail.com
- 🏢 Organization: [@lomineuro](https://npmjs.com/org/lomineuro)

### 🙏 Acknowledgments

Built with ❤️ for the Iranian developer community

---

## Version History

### v1.0.0 (2026-02-23)
- ✨ Initial release
- 📅 Three calendar systems support
- 🎨 21 pre-built themes
- 🌍 Bilingual support (Persian & English)
- ♿ Full accessibility
- ⚡ High performance optimizations
