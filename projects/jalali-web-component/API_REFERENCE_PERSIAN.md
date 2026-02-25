# مرجع API - کامپوننت وب Jalali Date Picker

**[English](./API_REFERENCE.md) | فارسی**

## فهرست مطالب

- [نمای کلی](#نمای-کلی)
- [نصب](#نصب)
- [استفاده پایه](#استفاده-پایه)
- [ویژگی‌ها](#ویژگی‌ها)
- [متدها](#متدها)
- [رویدادهای سفارشی](#رویدادهای-سفارشی)
- [متغیرهای CSS](#متغیرهای-css)
- [تعریف‌های نوع](#تعریف‌های-نوع)
- [مثال‌ها](#مثال‌ها)

---

## نمای کلی

کامپوننت وب Jalali Date Picker یک عنصر سفارشی استاندارد برای انتخاب تاریخ در سیستم تقویم جلالی است. این کامپوننت از سه سیستم تقویم پشتیبانی می‌کند: جلالی، میلادی و قمری.

**ویژگی‌ها:**
- ✅ سه سیستم تقویم (جلالی، میلادی، قمری)
- ✅ سه حالت انتخاب (تک‌انتخاب، محدوده، چند‌انتخاب)
- ✅ پشتیبانی دوزبانه (فارسی/انگلیسی)
- ✅ پشتیبانی RTL/LTR
- ✅ تم‌های قابل سفارشی‌سازی
- ✅ Shadow DOM encapsulation
- ✅ سازگار با WCAG 2.1
- ✅ بهینه‌سازی شده برای عملکرد
- ✅ مستقل از فریم‌ورک

---

## نصب

### NPM
```bash
npm install jalali-web-component
```

### CDN
```html
<script src="https://cdn.example.com/jalali-date-picker.js"></script>
```

### Import
```javascript
import 'jalali-web-component';
```

---

## استفاده پایه

### HTML
```html
<jalali-date-picker
  locale="fa"
  theme="light"
  selection-mode="single"
></jalali-date-picker>
```

### JavaScript
```javascript
const picker = document.querySelector('jalali-date-picker');

// گوش دادن به انتخاب تاریخ
picker.addEventListener('dateSelect', (e) => {
  console.log('تاریخ انتخاب‌شده:', e.detail.jalaliDate);
});

// تنظیم تاریخ برنامه‌ای
picker.setDate(new Date());
```

### React
```jsx
import { useRef, useEffect } from 'react';

export function DatePicker() {
  const pickerRef = useRef(null);

  useEffect(() => {
    const picker = pickerRef.current;
    const handleDateSelect = (e) => {
      console.log('انتخاب‌شده:', e.detail.jalaliDate);
    };

    picker?.addEventListener('dateSelect', handleDateSelect);
    return () => picker?.removeEventListener('dateSelect', handleDateSelect);
  }, []);

  return <jalali-date-picker ref={pickerRef} locale="fa"></jalali-date-picker>;
}
```

### Vue
```vue
<template>
  <jalali-date-picker
    ref="picker"
    locale="fa"
    @dateSelect="onDateSelect"
  ></jalali-date-picker>
</template>

<script>
export default {
  methods: {
    onDateSelect(e) {
      console.log('انتخاب‌شده:', e.detail.jalaliDate);
    }
  }
}
</script>
```

---

## ویژگی‌ها

### جدول مرجع ویژگی‌ها

| ویژگی | Attribute | نوع | پیش‌فرض | توضیح |
|-------|-----------|------|---------|--------|
| `selectedDate` | `selected-date` | `Date \| null` | `null` | تاریخ انتخاب‌شده فعلی |
| `selectedRange` | - | `{start: Date, end: Date}` | `{start: null, end: null}` | محدوده تاریخ انتخاب‌شده |
| `selectedDates` | - | `Date[]` | `[]` | آرایه تاریخ‌های انتخاب‌شده |
| `calendarType` | `calendar-type` | `'jalali' \| 'gregorian' \| 'hijri'` | `'jalali'` | سیستم تقویم برای نمایش |
| `locale` | `locale` | `'fa' \| 'en'` | `'fa'` | زبان و جهت |
| `theme` | `theme` | `string` | `'light'` | نام تم |
| `selectionMode` | `selection-mode` | `'single' \| 'range' \| 'multiple'` | `'single'` | حالت انتخاب تاریخ |
| `disabled` | `disabled` | `boolean` | `false` | غیرفعال کردن انتخاب تاریخ |
| `value` | - | `string` | `''` | رشته ISO تاریخ انتخاب‌شده |

### جزئیات ویژگی‌ها

#### selectedDate
```javascript
// دریافت تاریخ انتخاب‌شده
const date = picker.selectedDate;

// تنظیم تاریخ انتخاب‌شده
picker.selectedDate = new Date('2024-01-15');

// پاک کردن انتخاب
picker.selectedDate = null;
```

#### selectedRange
```javascript
// دریافت محدوده انتخاب‌شده
const range = picker.selectedRange;
console.log(range.start, range.end);

// تنظیم محدوده
picker.selectedRange = {
  start: new Date('2024-01-01'),
  end: new Date('2024-01-31')
};
```

#### locale
```javascript
// دریافت زبان فعلی
const lang = picker.locale; // 'fa'

// تغییر زبان
picker.locale = 'en'; // انگلیسی، LTR
picker.locale = 'fa'; // فارسی، RTL
```

#### theme
```javascript
// دریافت تم فعلی
const currentTheme = picker.theme;

// تغییر تم
picker.theme = 'light';
picker.theme = 'dark';
picker.theme = 'glassmorphism';
```

---

## متدها

### جدول مرجع متدها

| متد | پارامترها | بازگشت | توضیح |
|-----|-----------|--------|--------|
| `open()` | - | `void` | باز کردن انتخاب‌کننده تاریخ |
| `close()` | - | `void` | بستن انتخاب‌کننده تاریخ |
| `reset()` | - | `void` | پاک کردن تمام انتخاب‌ها |
| `setDate(date)` | `Date` | `void` | تنظیم یک تاریخ |
| `setRange(start, end)` | `Date, Date` | `void` | تنظیم محدوده تاریخ |
| `addDate(date)` | `Date` | `void` | اضافه کردن تاریخ به انتخاب چند‌گانه |
| `removeDate(date)` | `Date` | `void` | حذف تاریخ از انتخاب چند‌گانه |

### جزئیات متدها

#### setDate(date)
```javascript
// تنظیم یک تاریخ
picker.setDate(new Date('2024-01-15'));

// رویداد: dateSelect
```

#### setRange(start, end)
```javascript
// تنظیم محدوده تاریخ
picker.setRange(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);

// اگر start > end، خودکار تعویض می‌شود
```

#### addDate(date)
```javascript
// اضافه کردن تاریخ به انتخاب چند‌گانه
picker.addDate(new Date('2024-01-15'));

// تاریخ‌های تکراری نادیده گرفته می‌شوند
```

#### removeDate(date)
```javascript
// حذف تاریخ از انتخاب چند‌گانه
picker.removeDate(new Date('2024-01-15'));
```

---

## رویدادهای سفارشی

### جدول مرجع رویدادها

| رویداد | فعال‌کننده | جزئیات | Bubbles | Composed |
|--------|-----------|--------|---------|----------|
| `dateSelect` | انتخاب تاریخ تک | `{date, jalaliDate, gregorianDate, hijriDate}` | ✅ | ✅ |
| `rangeSelect` | انتخاب محدوده تاریخ | `{start, end, startJalali, endJalali}` | ✅ | ✅ |
| `multipleSelect` | انتخاب تاریخ‌های چند‌گانه | `{dates, count, jalaliDates}` | ✅ | ✅ |
| `localeChange` | تغییر زبان | `{locale, direction}` | ✅ | ✅ |
| `themeChange` | تغییر تم | `{theme, colors}` | ✅ | ✅ |
| `error` | بروز خطا | `{code, message, timestamp}` | ✅ | ✅ |

### جزئیات رویدادها

#### dateSelect
```javascript
picker.addEventListener('dateSelect', (e) => {
  const {
    date,           // Date object
    jalaliDate,     // "1402/10/25"
    gregorianDate,  // "2024-01-15"
    hijriDate       // "1445/07/05"
  } = e.detail;
});
```

#### rangeSelect
```javascript
picker.addEventListener('rangeSelect', (e) => {
  const {
    start,          // Date object
    end,            // Date object
    startJalali,    // "1402/10/11"
    endJalali       // "1402/11/11"
  } = e.detail;
});
```

#### localeChange
```javascript
picker.addEventListener('localeChange', (e) => {
  const {
    locale,         // 'fa' یا 'en'
    direction       // 'rtl' یا 'ltr'
  } = e.detail;
});
```

---

## متغیرهای CSS

### متغیرهای رنگ

#### رنگ‌های اصلی
```css
jalali-date-picker {
  --primary-color: #007bff;
  --primary-50: #f0f7ff;
  --primary-100: #e0effe;
  --primary-200: #c7e0fd;
  --primary-300: #a4c9fc;
  --primary-400: #7aaffa;
  --primary-500: #4a90f9;
  --primary-600: #0066ff;
  --primary-700: #0052cc;
  --primary-800: #003d99;
  --primary-900: #002966;
}
```

#### رنگ‌های معنایی
```css
jalali-date-picker {
  --success-color: #28a745;
  --warning-color: #ffc107;
  --error-color: #dc3545;
  --info-color: #17a2b8;
}
```

#### رنگ‌های پس‌زمینه و متن
```css
jalali-date-picker {
  --background: #ffffff;
  --background-secondary: #f8f9fa;
  --text-color: #000000;
  --text-secondary: #6c757d;
  --text-disabled: #cccccc;
}
```

### متغیرهای اندازه

#### Border Radius
```css
jalali-date-picker {
  --border-radius: 8px;
  --border-radius-sm: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
}
```

#### فاصله‌گذاری
```css
jalali-date-picker {
  --padding-xs: 4px;
  --padding-sm: 8px;
  --padding-md: 12px;
  --padding-base: 16px;
  --padding-lg: 20px;
  --padding-xl: 24px;
  
  --margin-xs: 4px;
  --margin-sm: 8px;
  --margin-md: 12px;
  --margin-base: 16px;
  --margin-lg: 20px;
  --margin-xl: 24px;
}
```

#### تقویم‌خاص
```css
jalali-date-picker {
  --calendar-cell-size: 40px;
  --calendar-cell-gap: 8px;
  --calendar-padding: 16px;
  --calendar-header-height: 48px;
}
```

### متغیرهای فونت

#### اندازه فونت
```css
jalali-date-picker {
  --font-size-xs: 11px;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-md: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
}
```

#### وزن فونت
```css
jalali-date-picker {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
}
```

### متغیرهای انیمیشن

```css
jalali-date-picker {
  --transition-duration-fast: 0.1s;
  --transition-duration-base: 0.2s;
  --transition-duration-slow: 0.3s;
  --transition-duration-slower: 0.5s;
  
  --transition-timing: ease;
  --transition-timing-linear: linear;
  --transition-timing-ease-in: ease-in;
  --transition-timing-ease-out: ease-out;
  --transition-timing-ease-in-out: ease-in-out;
}
```

---

## تعریف‌های نوع

### رابط‌های TypeScript

```typescript
// انواع انتخاب تاریخ
interface DateSelectDetail {
  date: Date;
  jalaliDate: string;
  gregorianDate: string;
  hijriDate: string;
}

interface RangeSelectDetail {
  start: Date;
  end: Date;
  startJalali: string;
  endJalali: string;
}

interface MultipleSelectDetail {
  dates: Date[];
  count: number;
  jalaliDates: string[];
}

// انواع زبان و تم
interface LocaleChangeDetail {
  locale: 'fa' | 'en';
  direction: 'rtl' | 'ltr';
}

interface ThemeChangeDetail {
  theme: string;
  colors: Record<string, string>;
}

// نوع خطا
interface ErrorDetail {
  code: string;
  message: string;
  timestamp: number;
}

// انواع کامپوننت
type CalendarType = 'jalali' | 'gregorian' | 'hijri';
type Locale = 'fa' | 'en';
type SelectionMode = 'single' | 'range' | 'multiple';
type Theme = 'light' | 'dark' | 'glassmorphism';
```

---

## مثال‌ها

### مثال 1: انتخاب تاریخ تک
```html
<jalali-date-picker
  id="singlePicker"
  locale="fa"
  selection-mode="single"
></jalali-date-picker>

<script>
const picker = document.getElementById('singlePicker');

picker.addEventListener('dateSelect', (e) => {
  console.log('انتخاب‌شده:', e.detail.jalaliDate);
  console.log('میلادی:', e.detail.gregorianDate);
});
</script>
```

### مثال 2: انتخاب محدوده تاریخ
```html
<jalali-date-picker
  id="rangePicker"
  locale="fa"
  selection-mode="range"
></jalali-date-picker>

<script>
const picker = document.getElementById('rangePicker');

picker.addEventListener('rangeSelect', (e) => {
  console.log('از:', e.detail.startJalali);
  console.log('تا:', e.detail.endJalali);
});

// تنظیم محدوده برنامه‌ای
picker.setRange(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
</script>
```

### مثال 3: انتخاب تاریخ‌های چند‌گانه
```html
<jalali-date-picker
  id="multiplePicker"
  locale="fa"
  selection-mode="multiple"
></jalali-date-picker>

<script>
const picker = document.getElementById('multiplePicker');

picker.addEventListener('multipleSelect', (e) => {
  console.log('تاریخ‌های انتخاب‌شده:', e.detail.count);
  console.log('تاریخ‌های جلالی:', e.detail.jalaliDates);
});

// اضافه کردن تاریخ‌ها برنامه‌ای
picker.addDate(new Date('2024-01-01'));
picker.addDate(new Date('2024-01-15'));
picker.addDate(new Date('2024-01-31'));
</script>
```

### مثال 4: تم سفارشی
```html
<jalali-date-picker
  id="themedPicker"
  locale="fa"
  theme="dark"
></jalali-date-picker>

<style>
  jalali-date-picker {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --background: #1f2937;
    --text-color: #f3f4f6;
    --border-radius: 12px;
    --padding-base: 20px;
  }
</style>

<script>
const picker = document.getElementById('themedPicker');

picker.addEventListener('themeChange', (e) => {
  console.log('تم تغییر یافت:', e.detail.theme);
});
</script>
```

### مثال 5: پشتیبانی دوزبانه
```html
<button id="toggleLang">تغییر زبان</button>
<jalali-date-picker
  id="bilingualPicker"
  locale="fa"
></jalali-date-picker>

<script>
const picker = document.getElementById('bilingualPicker');
const toggleBtn = document.getElementById('toggleLang');

toggleBtn.addEventListener('click', () => {
  picker.locale = picker.locale === 'fa' ? 'en' : 'fa';
});

picker.addEventListener('localeChange', (e) => {
  console.log('زبان:', e.detail.locale);
  console.log('جهت:', e.detail.direction);
});
</script>
```

### مثال 6: مدیریت خطا
```html
<jalali-date-picker id="errorPicker"></jalali-date-picker>

<script>
const picker = document.getElementById('errorPicker');

picker.addEventListener('error', (e) => {
  console.error(`خطا [${e.detail.code}]: ${e.detail.message}`);
  
  switch (e.detail.code) {
    case 'INVALID_DATE':
      console.log('لطفاً یک تاریخ معتبر انتخاب کنید');
      break;
    case 'INVALID_RANGE':
      console.log('محدوده تاریخ نامعتبر است');
      break;
    default:
      console.log('خطای نامشخص');
  }
});
</script>
```

### مثال 7: React Integration
```jsx
import { useRef, useEffect, useState } from 'react';
import 'jalali-web-component';

export function JalaliDatePickerWrapper() {
  const pickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const picker = pickerRef.current;
    if (!picker) return;

    const handleDateSelect = (e) => {
      setSelectedDate(e.detail.jalaliDate);
    };

    picker.addEventListener('dateSelect', handleDateSelect);
    return () => picker.removeEventListener('dateSelect', handleDateSelect);
  }, []);

  return (
    <div>
      <jalali-date-picker
        ref={pickerRef}
        locale="fa"
        selection-mode="single"
      ></jalali-date-picker>
      {selectedDate && <p>انتخاب‌شده: {selectedDate}</p>}
    </div>
  );
}
```

### مثال 8: Vue Integration
```vue
<template>
  <div>
    <jalali-date-picker
      ref="picker"
      :locale="locale"
      :selection-mode="selectionMode"
      @dateSelect="onDateSelect"
      @rangeSelect="onRangeSelect"
      @localeChange="onLocaleChange"
      @error="onError"
    ></jalali-date-picker>
    <p v-if="selectedDate">انتخاب‌شده: {{ selectedDate }}</p>
  </div>
</template>

<script>
import 'jalali-web-component';

export default {
  data() {
    return {
      locale: 'fa',
      selectionMode: 'single',
      selectedDate: null
    };
  },
  methods: {
    onDateSelect(e) {
      this.selectedDate = e.detail.jalaliDate;
    },
    onRangeSelect(e) {
      console.log('محدوده:', e.detail.startJalali, '-', e.detail.endJalali);
    },
    onLocaleChange(e) {
      console.log('زبان تغییر یافت:', e.detail.locale);
    },
    onError(e) {
      console.error('خطا:', e.detail.message);
    }
  }
};
</script>
```

---

## منابع اضافی

- [مرجع API انگلیسی](./API_REFERENCE.md)
- [CSS Variables Guide](./CSS_VARIABLES_GUIDE.md)
- [Custom Events Reference](./CUSTOM_EVENTS_QUICK_REFERENCE.md)
- [Getting Started](./GETTING_STARTED.md)

---

**آخرین به‌روزرسانی:** 2024
**نسخه:** 1.0.0
