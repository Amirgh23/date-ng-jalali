# Getting Started with Jalali Web Component

## 🌍 Language / زبان

- [English](#english)
- [فارسی](#فارسی)

---

# English

## Quick Start Guide

Welcome to the Jalali Web Component! This guide will help you get started with date picking in Jalali, Gregorian, and Hijri calendars.

### Installation

```bash
npm install @jalali-web-component/core
```

### Basic Setup

#### 1. Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script src="path/to/jalali-date-picker.js"></script>
</head>
<body>
  <jalali-date-picker id="my-picker" locale="en" theme="light"></jalali-date-picker>

  <script>
    const picker = document.getElementById('my-picker');
    
    picker.addEventListener('dateSelect', (event) => {
      console.log('Selected date:', event.detail.date);
      console.log('Jalali date:', event.detail.jalaliDate);
    });
  </script>
</body>
</html>
```

#### 2. React

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
        locale="en"
        theme="light"
      />
      <p>Selected: {date?.toLocaleDateString('en-US')}</p>
    </div>
  );
}

export default App;
```

#### 3. Vue 3

```vue
<template>
  <div>
    <JalaliDatePickerVue
      v-model="date"
      locale="en"
      theme="light"
    />
    <p v-if="date">Selected: {{ date.toLocaleDateString('en-US') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

### Common Use Cases

#### Single Date Selection

```javascript
const picker = document.getElementById('my-picker');

picker.addEventListener('dateSelect', (event) => {
  const { date, jalaliDate, gregorianDate } = event.detail;
  console.log('Date:', date);
  console.log('Jalali:', jalaliDate);
  console.log('Gregorian:', gregorianDate);
});
```

#### Date Range Selection

```html
<jalali-date-picker
  id="range-picker"
  selection-mode="range"
  locale="en"
></jalali-date-picker>

<script>
  const picker = document.getElementById('range-picker');
  
  picker.addEventListener('rangeSelect', (event) => {
    const { start, end } = event.detail.range;
    console.log('From:', start);
    console.log('To:', end);
  });
</script>
```

#### Multiple Dates Selection

```html
<jalali-date-picker
  id="multi-picker"
  selection-mode="multiple"
  locale="en"
></jalali-date-picker>

<script>
  const picker = document.getElementById('multi-picker');
  
  picker.addEventListener('multipleSelect', (event) => {
    console.log('Selected dates:', event.detail.dates);
  });
</script>
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `locale` | 'fa' \| 'en' | 'fa' | Language (Persian or English) |
| `theme` | string | 'light' | Theme name (light, dark, etc.) |
| `calendar-type` | 'jalali' \| 'gregorian' \| 'hijri' | 'jalali' | Calendar system |
| `selection-mode` | 'single' \| 'range' \| 'multiple' | 'single' | Selection mode |
| `disabled` | boolean | false | Disable the picker |

### Troubleshooting

#### Issue: Component Not Showing

**Solution**: Ensure the script is loaded before using the component.

```html
<!-- ✓ Correct -->
<script src="jalali-date-picker.js"></script>
<jalali-date-picker></jalali-date-picker>

<!-- ✗ Wrong -->
<jalali-date-picker></jalali-date-picker>
<script src="jalali-date-picker.js"></script>
```

#### Issue: Events Not Firing

**Solution**: Make sure the picker is in the DOM and event listener is attached correctly.

```javascript
// ✓ Correct
const picker = document.getElementById('my-picker');
if (picker) {
  picker.addEventListener('dateSelect', (event) => {
    console.log('Event fired:', event.detail);
  });
}
```

#### Issue: Locale Not Changing

**Solution**: Set locale as an attribute or property.

```javascript
// ✓ Correct
picker.locale = 'en';
// or
picker.setAttribute('locale', 'en');
```

#### Issue: Styles Not Applied

**Solution**: The component uses Shadow DOM. Use CSS variables to customize.

```css
jalali-date-picker {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### Next Steps

- Check out the [examples](./examples/) directory for more detailed examples
- Read the [README.md](./README.md) for complete API documentation
- Explore [CSS Variables Guide](./CSS_VARIABLES_GUIDE.md) for styling
- See [Custom Events Reference](./CUSTOM_EVENTS_QUICK_REFERENCE.md) for event details

---

# فارسی

## راهنمای شروع سریع

خوش آمدید به Jalali Web Component! این راهنما شما را در شروع کار با انتخاب تاریخ در تقویم‌های جلالی، میلادی و هجری یاری می‌رساند.

### نصب

```bash
npm install @jalali-web-component/core
```

### راه‌اندازی اولیه

#### 1. جاوا اسکریپت خالص (Vanilla)

```html
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="UTF-8">
  <script src="path/to/jalali-date-picker.js"></script>
</head>
<body>
  <jalali-date-picker id="my-picker" locale="fa" theme="light"></jalali-date-picker>

  <script>
    const picker = document.getElementById('my-picker');
    
    picker.addEventListener('dateSelect', (event) => {
      console.log('تاریخ انتخاب شده:', event.detail.date);
      console.log('تاریخ جلالی:', event.detail.jalaliDate);
    });
  </script>
</body>
</html>
```

#### 2. React

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div dir="rtl">
      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
        locale="fa"
        theme="light"
      />
      <p>تاریخ انتخاب شده: {date?.toLocaleDateString('fa-IR')}</p>
    </div>
  );
}

export default App;
```

#### 3. Vue 3

```vue
<template>
  <div dir="rtl">
    <JalaliDatePickerVue
      v-model="date"
      locale="fa"
      theme="light"
    />
    <p v-if="date">تاریخ انتخاب شده: {{ date.toLocaleDateString('fa-IR') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';

const date = ref<Date | null>(null);
</script>
```

### موارد استفاده رایج

#### انتخاب یک تاریخ

```javascript
const picker = document.getElementById('my-picker');

picker.addEventListener('dateSelect', (event) => {
  const { date, jalaliDate, gregorianDate } = event.detail;
  console.log('تاریخ:', date);
  console.log('جلالی:', jalaliDate);
  console.log('میلادی:', gregorianDate);
});
```

#### انتخاب بازه تاریخی

```html
<jalali-date-picker
  id="range-picker"
  selection-mode="range"
  locale="fa"
></jalali-date-picker>

<script>
  const picker = document.getElementById('range-picker');
  
  picker.addEventListener('rangeSelect', (event) => {
    const { start, end } = event.detail.range;
    console.log('از:', start);
    console.log('تا:', end);
  });
</script>
```

#### انتخاب چندین تاریخ

```html
<jalali-date-picker
  id="multi-picker"
  selection-mode="multiple"
  locale="fa"
></jalali-date-picker>

<script>
  const picker = document.getElementById('multi-picker');
  
  picker.addEventListener('multipleSelect', (event) => {
    console.log('تاریخ‌های انتخاب شده:', event.detail.dates);
  });
</script>
```

### گزینه‌های تنظیم

| گزینه | نوع | پیش‌فرض | توضیح |
|-------|------|---------|--------|
| `locale` | 'fa' \| 'en' | 'fa' | زبان (فارسی یا انگلیسی) |
| `theme` | string | 'light' | نام تم (روشن، تاریک، و غیره) |
| `calendar-type` | 'jalali' \| 'gregorian' \| 'hijri' | 'jalali' | سیستم تقویم |
| `selection-mode` | 'single' \| 'range' \| 'multiple' | 'single' | حالت انتخاب |
| `disabled` | boolean | false | غیرفعال کردن انتخاب‌کننده |

### حل مشکلات رایج

#### مشکل: کامپوننت نمایش داده نمی‌شود

**راه‌حل**: اطمینان حاصل کنید که اسکریپت قبل از استفاده از کامپوننت بارگذاری شده است.

```html
<!-- ✓ صحیح -->
<script src="jalali-date-picker.js"></script>
<jalali-date-picker></jalali-date-picker>

<!-- ✗ غلط -->
<jalali-date-picker></jalali-date-picker>
<script src="jalali-date-picker.js"></script>
```

#### مشکل: رویدادها فعال نمی‌شوند

**راه‌حل**: اطمینان حاصل کنید که انتخاب‌کننده در DOM است و شنونده رویداد به درستی متصل است.

```javascript
// ✓ صحیح
const picker = document.getElementById('my-picker');
if (picker) {
  picker.addEventListener('dateSelect', (event) => {
    console.log('رویداد فعال شد:', event.detail);
  });
}
```

#### مشکل: زبان تغییر نمی‌کند

**راه‌حل**: زبان را به عنوان ویژگی یا خاصیت تنظیم کنید.

```javascript
// ✓ صحیح
picker.locale = 'fa';
// یا
picker.setAttribute('locale', 'fa');
```

#### مشکل: سبک‌ها اعمال نمی‌شوند

**راه‌حل**: کامپوننت از Shadow DOM استفاده می‌کند. برای سفارشی‌سازی از متغیرهای CSS استفاده کنید.

```css
jalali-date-picker {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### مراحل بعدی

- نمونه‌های بیشتری را در دایرکتوری [examples](./examples/) بررسی کنید
- [README.md](./README.md) را برای مستندات کامل API بخوانید
- [راهنمای متغیرهای CSS](./CSS_VARIABLES_GUIDE.md) را برای سبک‌دهی بررسی کنید
- [مرجع رویدادهای سفارشی](./CUSTOM_EVENTS_QUICK_REFERENCE.md) را برای جزئیات رویدادها ببینید
