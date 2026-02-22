# 🎨 راهنمای کامل Pass Through System

## معرفی

سیستم Pass Through الهام گرفته از PrimeNG، امکان کنترل کامل بر روی استایل‌دهی و ظاهر کامپوننت‌ها را فراهم می‌کند.

## 🚀 شروع سریع

### نصب

```bash
npm install jalali-date-picker
```

### استفاده پایه

```typescript
import { Component } from '@angular/core';
import { JalaliCalendarComponent } from 'jalali-date-picker';

@Component({
  imports: [JalaliCalendarComponent],
  template: `
    <jalali-calendar [(selectedDate)]="date"></jalali-calendar>
  `
})
export class AppComponent {
  date = new Date();
}
```

## 📚 مفاهیم اصلی

### 1. Styled Mode (حالت پیش‌فرض)

کامپوننت با استایل‌های از پیش تعریف شده نمایش داده می‌شود.

```scss
// styles.scss
@import 'jalali-date-picker/themes/styled/lara-light-blue';
```

### 2. Unstyled Mode

کامپوننت بدون هیچ استایل بصری نمایش داده می‌شود.

```html
<jalali-calendar [unstyled]="true"></jalali-calendar>
```

### 3. Pass Through (PT)

API برای سفارشی‌سازی عمیق هر المان کامپوننت.

```typescript
const pt: CalendarPassThroughOptions = {
  root: { class: 'my-calendar' },
  dayCell: { class: 'my-day' }
};
```

## 🎯 انواع Pass Through

### 1. PT استاتیک

```typescript
pt: {
  root: {
    class: 'custom-calendar',
    style: { maxWidth: '400px' }
  }
}
```

### 2. PT پویا (با توابع)

```typescript
pt: {
  dayCell: (options) => {
    const date = options.context?.date;
    return {
      class: {
        'weekend': date?.getDay() === 5
      }
    };
  }
}
```

### 3. PT ترکیبی

```typescript
pt: {
  root: { class: 'base-calendar' },
  dayCell: (options) => ({
    class: ['day', { special: isSpecial(options.context.date) }]
  })
}
```

## 📖 API Reference

### CalendarPassThroughOptions

```typescript
interface CalendarPassThroughOptions {
  root?: PassThroughType;
  header?: PassThroughType;
  headerLeft?: PassThroughType;
  headerRight?: PassThroughType;
  title?: PassThroughType;
  monthName?: PassThroughType;
  yearName?: PassThroughType;
  previousButton?: PassThroughType;
  nextButton?: PassThroughType;
  todayButton?: PassThroughType;
  grid?: PassThroughType;
  dayHeader?: PassThroughType;
  dayCell?: PassThroughType;
  dayNumber?: PassThroughType;
  holidayDot?: PassThroughType;
  selectionIndicator?: PassThroughType;
  footer?: PassThroughType;
}
```

### PassThroughElementOptions

```typescript
interface PassThroughElementOptions {
  class?: string | string[] | { [key: string]: boolean };
  style?: { [key: string]: any };
  attrs?: { [key: string]: any };
  data?: { [key: string]: any };
}
```

### PassThroughMethodOptions

```typescript
interface PassThroughMethodOptions {
  instance: any;        // کامپوننت
  props: any;          // Input ها
  state: any;          // State
  context?: any;       // Context (مثلاً date)
}
```

## 💡 مثال‌های کاربردی

### مثال 1: Tailwind CSS

```typescript
const tailwindPT: CalendarPassThroughOptions = {
  root: {
    class: 'bg-white rounded-xl shadow-lg p-6'
  },
  dayCell: {
    class: [
      'aspect-square flex items-center justify-center',
      'rounded-lg cursor-pointer transition-all',
      'hover:bg-blue-50'
    ]
  }
};
```

```html
<jalali-calendar 
  [unstyled]="true"
  [pt]="tailwindPT"
  [(selectedDate)]="date">
</jalali-calendar>
```

### مثال 2: Bootstrap

```typescript
const bootstrapPT: CalendarPassThroughOptions = {
  root: { class: 'card shadow-lg' },
  header: { class: 'card-header' },
  dayCell: { class: 'btn btn-outline-secondary btn-sm' }
};
```

### مثال 3: Material Design

```typescript
const materialPT: CalendarPassThroughOptions = {
  root: { class: 'mat-elevation-z8 mat-card' },
  dayCell: { class: 'mat-button' }
};
```

### مثال 4: Custom با Gradient

```typescript
const gradientPT: CalendarPassThroughOptions = {
  root: {
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem'
    }
  },
  dayCell: (options) => ({
    style: {
      backgroundColor: options.context?.date?.getDay() === 5 
        ? 'rgba(255, 255, 255, 0.3)' 
        : 'rgba(255, 255, 255, 0.1)'
    }
  })
};
```

### مثال 5: Conditional Styling

```typescript
const conditionalPT: CalendarPassThroughOptions = {
  dayCell: (options) => {
    const date = options.context?.date;
    const isWeekend = date?.getDay() === 5;
    const isHoliday = checkHoliday(date);
    const isPast = date < new Date();
    
    return {
      class: {
        'weekend': isWeekend,
        'holiday': isHoliday,
        'past': isPast,
        'future': !isPast
      },
      style: {
        opacity: isPast ? '0.5' : '1',
        fontWeight: isHoliday ? 'bold' : 'normal'
      },
      data: {
        weekend: isWeekend,
        holiday: isHoliday
      }
    };
  }
};
```

### مثال 6: Form Integration

```typescript
@Component({
  template: `
    <form [formGroup]="form">
      <jalali-calendar
        formControlName="birthDate"
        [pt]="formPT">
      </jalali-calendar>
    </form>
  `
})
export class FormComponent {
  form = this.fb.group({
    birthDate: [null, Validators.required]
  });
  
  formPT: CalendarPassThroughOptions = {
    root: {
      class: {
        'invalid': this.form.get('birthDate')?.invalid,
        'valid': this.form.get('birthDate')?.valid
      }
    }
  };
}
```

## 🎨 استفاده با فریمورک‌های مختلف

### Tailwind CSS

```bash
npm install -D tailwindcss
```

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/jalali-date-picker/**/*.{html,ts}"
  ]
}
```

```html
<jalali-calendar 
  [unstyled]="true"
  [pt]="tailwindClasses">
</jalali-calendar>
```

### Bootstrap

```bash
npm install bootstrap
```

```scss
// styles.scss
@import 'bootstrap/scss/bootstrap';
```

```html
<jalali-calendar 
  [unstyled]="true"
  [pt]="bootstrapClasses">
</jalali-calendar>
```

### Material Design

```bash
npm install @angular/material
```

```html
<jalali-calendar 
  [unstyled]="true"
  [pt]="materialClasses">
</jalali-calendar>
```

## 🔧 تنظیمات پیشرفته

### Global PT Configuration

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
      }
    })
  ]
};
```

### Theme Switching

```typescript
@Component({
  template: `
    <button (click)="switchTheme()">تغییر تم</button>
    <jalali-calendar [pt]="currentPT"></jalali-calendar>
  `
})
export class ThemeSwitcherComponent {
  isDark = false;
  
  lightPT: CalendarPassThroughOptions = {
    root: { class: 'light-theme' }
  };
  
  darkPT: CalendarPassThroughOptions = {
    root: { class: 'dark-theme' }
  };
  
  get currentPT() {
    return this.isDark ? this.darkPT : this.lightPT;
  }
  
  switchTheme() {
    this.isDark = !this.isDark;
  }
}
```

### Responsive PT

```typescript
const responsivePT: CalendarPassThroughOptions = {
  root: {
    class: [
      'calendar',
      'sm:max-w-sm',
      'md:max-w-md',
      'lg:max-w-lg'
    ]
  }
};
```

## 📊 Performance Tips

### 1. استفاده از Static PT

```typescript
// ✅ خوب - فقط یک بار ایجاد می‌شود
const pt: CalendarPassThroughOptions = {
  root: { class: 'calendar' }
};

// ❌ بد - هر بار render دوباره ایجاد می‌شود
[pt]="{ root: { class: 'calendar' } }"
```

### 2. Memoization برای PT Functions

```typescript
import { memoize } from 'lodash-es';

const getDayCellPT = memoize((date: Date) => ({
  class: {
    'weekend': date.getDay() === 5
  }
}));

pt: {
  dayCell: (options) => getDayCellPT(options.context.date)
}
```

### 3. Conditional PT Loading

```typescript
@Component({
  template: `
    <jalali-calendar [pt]="shouldCustomize ? customPT : undefined">
    </jalali-calendar>
  `
})
```

## 🐛 Troubleshooting

### مشکل: Classes اعمال نمی‌شوند

```typescript
// ❌ اشتباه
pt: { root: 'my-class' }

// ✅ درست
pt: { root: { class: 'my-class' } }
```

### مشکل: Styles override نمی‌شوند

```scss
// استفاده از CSS Layers
@layer jdp-overrides {
  .my-calendar {
    background: red !important;
  }
}
```

### مشکل: PT Function کار نمی‌کند

```typescript
// ❌ اشتباه - return فراموش شده
pt: {
  dayCell: (options) => {
    { class: 'my-class' }
  }
}

// ✅ درست
pt: {
  dayCell: (options) => {
    return { class: 'my-class' };
  }
}
```

## 📚 منابع بیشتر

- [راهنمای پیاده‌سازی](./PRIMENG-STYLE-IMPLEMENTATION-GUIDE.md)
- [مثال‌های کاربردی](./PRIMENG-STYLE-USAGE-EXAMPLES.md)
- [وضعیت پیاده‌سازی](./PT-IMPLEMENTATION-COMPLETE.md)
- [Demo Component](./PT-USAGE-DEMO.component.ts)

## 🤝 مشارکت

برای گزارش مشکلات یا پیشنهادات:
- GitHub Issues
- Pull Requests

## 📄 License

MIT

---

**نسخه**: 1.0.0  
**آخرین به‌روزرسانی**: 2024  
**وضعیت**: ✅ Production Ready
