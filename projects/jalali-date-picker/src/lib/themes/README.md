# راهنمای تم‌های Jalali Date Picker

این پوشه شامل سیستم تم‌بندی کامل برای کتابخانه تقویم جلالی است.

## ساختار پوشه‌ها

```
themes/
├── base/                    # فایل‌های پایه و مشترک
│   ├── _variables.scss      # متغیرهای SCSS
│   ├── _css-variables.scss  # CSS Custom Properties
│   ├── _layers.scss         # CSS Cascade Layers
│   └── _mixins.scss         # Mixins قابل استفاده مجدد
│
├── styled/                  # تم‌های از پیش طراحی شده
│   ├── lara-light-blue.scss
│   ├── lara-dark-blue.scss
│   ├── material-light.scss
│   └── bootstrap-light.scss
│
└── unstyled/               # حداقل استایل‌های ساختاری
    └── base.scss
```

## نحوه استفاده

### 1. استفاده از تم آماده

در فایل `styles.scss` یا `angular.json`:

```scss
@import 'jalali-date-picker/themes/styled/lara-light-blue';
```

یا در `angular.json`:

```json
{
  "styles": [
    "node_modules/jalali-date-picker/themes/styled/lara-light-blue.scss"
  ]
}
```

### 2. سفارشی‌سازی متغیرها

```scss
// Override variables قبل از import
$primary-500: #8b5cf6;
$border-radius: 12px;

@import 'jalali-date-picker/themes/styled/lara-light-blue';
```

### 3. استفاده از Unstyled Mode

```scss
@import 'jalali-date-picker/themes/unstyled/base';
```

```typescript
<jalali-calendar [unstyled]="true"></jalali-calendar>
```

### 4. ایجاد تم سفارشی

```scss
@use 'jalali-date-picker/themes/base/variables' as *;
@use 'jalali-date-picker/themes/base/css-variables';
@use 'jalali-date-picker/themes/base/layers';
@use 'jalali-date-picker/themes/base/mixins' as *;

// Override متغیرها
$primary-500: #your-color;

// تعریف CSS variables سفارشی
:root {
  --jdp-primary-500: #{$primary-500};
}

// استایل‌های کامپوننت در layer
@layer jdp-components {
  .jdp-calendar {
    // استایل‌های سفارشی شما
  }
}
```

## متغیرهای موجود

### رنگ‌ها

- `--jdp-primary-{50-900}`: رنگ‌های اصلی
- `--jdp-surface-{0-900}`: رنگ‌های سطح
- `--jdp-text-color`: رنگ متن اصلی
- `--jdp-text-color-secondary`: رنگ متن ثانویه
- `--jdp-border-color`: رنگ حاشیه

### فاصله‌گذاری

- `--jdp-spacing-xs`: 0.25rem
- `--jdp-spacing-sm`: 0.5rem
- `--jdp-spacing-md`: 1rem
- `--jdp-spacing-lg`: 1.5rem
- `--jdp-spacing-xl`: 2rem

### تایپوگرافی

- `--jdp-font-family`: فونت پیش‌فرض
- `--jdp-font-size-{xs,sm,base,lg,xl,2xl}`: اندازه‌های فونت
- `--jdp-font-weight-{light,normal,medium,semibold,bold}`: وزن فونت

### سایه‌ها

- `--jdp-shadow-{sm,md,lg,xl,2xl}`: سایه‌های مختلف

### انیمیشن

- `--jdp-transition-duration`: مدت زمان انتقال
- `--jdp-animation-duration-{fast,normal,slow}`: مدت زمان انیمیشن

## CSS Layers

تم‌ها از CSS Layers برای کنترل بهتر Cascade استفاده می‌کنند:

1. `jdp-reset`: ریست مرورگر
2. `jdp-base`: استایل‌های پایه
3. `jdp-components`: استایل‌های کامپوننت
4. `jdp-utilities`: کلاس‌های کمکی
5. `jdp-overrides`: override های کاربر (بالاترین اولویت)

### Override در لایه مناسب

```scss
@layer jdp-overrides {
  .jdp-calendar {
    border-radius: 20px;
  }
}
```

## Mixins موجود

```scss
@use 'jalali-date-picker/themes/base/mixins' as *;

.my-element {
  @include focus-ring;
  @include transition(background-color, transform);
  @include hover-effect;
  @include disabled-state;
}
```

### لیست Mixins:

- `focus-ring()`: حلقه focus
- `transition()`: انتقال‌ها
- `hover-effect()`: افکت hover
- `button-reset()`: ریست دکمه
- `disabled-state()`: حالت غیرفعال
- `truncate()`: کوتاه کردن متن
- `line-clamp($lines)`: محدود کردن خطوط
- `custom-scrollbar()`: اسکرول‌بار سفارشی
- `breakpoint($size)`: Responsive
- `rtl()`: پشتیبانی RTL
- `dark-mode()`: حالت تاریک
- `center-content()`: مرکز کردن محتوا
- `glass-morphism()`: افکت شیشه‌ای

## تم‌های موجود

### Lara Light Blue
تم روشن با رنگ آبی - الهام گرفته از PrimeNG Lara

```scss
@import 'jalali-date-picker/themes/styled/lara-light-blue';
```

### Lara Dark Blue (در حال توسعه)
نسخه تاریک تم Lara

### Material Light (در حال توسعه)
تم Material Design

### Bootstrap Light (در حال توسعه)
تم Bootstrap

## Responsive Design

تمام تم‌ها responsive هستند و از breakpoint های زیر استفاده می‌کنند:

- `xs`: < 576px
- `sm`: ≥ 576px
- `md`: ≥ 768px
- `lg`: ≥ 992px
- `xl`: ≥ 1200px
- `xxl`: ≥ 1400px

## RTL Support

تم‌ها از RTL پشتیبانی می‌کنند:

```html
<html dir="rtl">
```

یا

```html
<div class="rtl">
  <jalali-calendar></jalali-calendar>
</div>
```

## Dark Mode

### روش 1: Data Attribute

```html
<html data-theme="dark">
```

### روش 2: Class

```html
<html class="dark-mode">
```

### روش 3: System Preference

تم‌ها به صورت خودکار از `prefers-color-scheme` پشتیبانی می‌کنند.

## مثال‌های پیشرفته

### ترکیب چند تم

```scss
// تم پایه
@import 'jalali-date-picker/themes/styled/lara-light-blue';

// Override در لایه overrides
@layer jdp-overrides {
  .special-calendar {
    --jdp-primary-500: #8b5cf6;
    --jdp-border-radius: 16px;
  }
}
```

### استفاده با CSS-in-JS

```typescript
import { ThemeService } from 'jalali-date-picker';

themeService.updateCSSVariables({
  'jdp-primary-500': '#8b5cf6',
  'jdp-border-radius': '16px'
});
```

## Performance

- تم‌ها برای Tree-shaking بهینه شده‌اند
- CSS Variables امکان تغییر تم بدون reload را فراهم می‌کنند
- Lazy Loading برای تم‌های اضافی

## مشارکت

برای ایجاد تم جدید:

1. فایل جدید در `styled/` ایجاد کنید
2. از ساختار `lara-light-blue.scss` پیروی کنید
3. متغیرهای مورد نیاز را override کنید
4. در `public-api.ts` export کنید

## پشتیبانی

- مستندات کامل: `PRIMENG-STYLE-IMPLEMENTATION-GUIDE.md`
- مثال‌ها: `PRIMENG-STYLE-USAGE-EXAMPLES.md`
- وضعیت: `PRIMENG-IMPLEMENTATION-STATUS.md`
