# API Reference - Jalali Date Picker Web Component

**English | [فارسی](./API_REFERENCE_PERSIAN.md)**

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
- [Methods](#methods)
- [Custom Events](#custom-events)
- [CSS Variables](#css-variables)
- [Type Definitions](#type-definitions)
- [Examples](#examples)

---

## Overview

The Jalali Date Picker Web Component is a standards-compliant custom element for selecting dates in the Jalali (Persian) calendar system. It supports three calendar systems: Jalali, Gregorian, and Hijri.

**Features:**
- ✅ Three calendar systems (Jalali, Gregorian, Hijri)
- ✅ Three selection modes (single, range, multiple)
- ✅ Bilingual support (Persian/English)
- ✅ RTL/LTR support
- ✅ Customizable themes
- ✅ Shadow DOM encapsulation
- ✅ Accessibility compliant (WCAG 2.1)
- ✅ Performance optimized
- ✅ Framework agnostic

---

## Installation

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

## Basic Usage

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

// Listen to date selection
picker.addEventListener('dateSelect', (e) => {
  console.log('Selected date:', e.detail.jalaliDate);
});

// Set a date programmatically
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
      console.log('Selected:', e.detail.jalaliDate);
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
      console.log('Selected:', e.detail.jalaliDate);
    }
  }
}
</script>
```

### Angular
```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  template: `<jalali-date-picker #picker locale="fa"></jalali-date-picker>`
})
export class DatePickerComponent {
  @ViewChild('picker') picker!: ElementRef;

  ngAfterViewInit() {
    this.picker.nativeElement.addEventListener('dateSelect', (e: CustomEvent) => {
      console.log('Selected:', e.detail.jalaliDate);
    });
  }
}
```

---

## Properties

### Attribute/Property Reference

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `selectedDate` | `selected-date` | `Date \| null` | `null` | Currently selected date |
| `selectedRange` | - | `{start: Date, end: Date}` | `{start: null, end: null}` | Selected date range |
| `selectedDates` | - | `Date[]` | `[]` | Array of selected dates |
| `calendarType` | `calendar-type` | `'jalali' \| 'gregorian' \| 'hijri'` | `'jalali'` | Calendar system to display |
| `locale` | `locale` | `'fa' \| 'en'` | `'fa'` | Language and direction |
| `theme` | `theme` | `string` | `'light'` | Theme name |
| `selectionMode` | `selection-mode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Date selection mode |
| `disabled` | `disabled` | `boolean` | `false` | Disable date selection |
| `value` | - | `string` | `''` | ISO string of selected date |

### Property Details

#### selectedDate
```javascript
// Get selected date
const date = picker.selectedDate;

// Set selected date
picker.selectedDate = new Date('2024-01-15');

// Clear selection
picker.selectedDate = null;
```

#### selectedRange
```javascript
// Get selected range
const range = picker.selectedRange;
console.log(range.start, range.end);

// Set selected range
picker.selectedRange = {
  start: new Date('2024-01-01'),
  end: new Date('2024-01-31')
};
```

#### selectedDates
```javascript
// Get all selected dates
const dates = picker.selectedDates;

// Add dates
picker.selectedDates = [
  new Date('2024-01-01'),
  new Date('2024-01-15'),
  new Date('2024-01-31')
];
```

#### calendarType
```javascript
// Get current calendar type
const type = picker.calendarType; // 'jalali'

// Switch calendar system
picker.calendarType = 'gregorian';
picker.calendarType = 'hijri';
picker.calendarType = 'jalali';
```

#### locale
```javascript
// Get current locale
const lang = picker.locale; // 'fa'

// Change language
picker.locale = 'en'; // English, LTR
picker.locale = 'fa'; // Persian, RTL
```

#### theme
```javascript
// Get current theme
const currentTheme = picker.theme;

// Change theme
picker.theme = 'light';
picker.theme = 'dark';
picker.theme = 'glassmorphism';
```

#### selectionMode
```javascript
// Get selection mode
const mode = picker.selectionMode;

// Change selection mode
picker.selectionMode = 'single';    // Single date
picker.selectionMode = 'range';     // Date range
picker.selectionMode = 'multiple';  // Multiple dates
```

#### disabled
```javascript
// Check if disabled
const isDisabled = picker.disabled;

// Disable/enable
picker.disabled = true;
picker.disabled = false;
```

#### value
```javascript
// Get ISO string of selected date
const isoString = picker.value;
// Returns: "2024-01-15T00:00:00.000Z" or ""
```

---

## Methods

### Method Reference

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `open()` | - | `void` | Open the date picker |
| `close()` | - | `void` | Close the date picker |
| `reset()` | - | `void` | Clear all selections |
| `setDate(date)` | `Date` | `void` | Set single date |
| `setRange(start, end)` | `Date, Date` | `void` | Set date range |
| `addDate(date)` | `Date` | `void` | Add date to multiple selection |
| `removeDate(date)` | `Date` | `void` | Remove date from multiple selection |
| `getPerformanceMetrics()` | - | `object` | Get performance metrics |
| `reportPerformanceMetrics()` | - | `void` | Log performance metrics |

### Method Details

#### open()
```javascript
// Open the date picker
picker.open();
```

#### close()
```javascript
// Close the date picker
picker.close();
```

#### reset()
```javascript
// Clear all selections and reset to initial state
picker.reset();
```

#### setDate(date)
```javascript
// Set a single date
picker.setDate(new Date('2024-01-15'));

// Emits: dateSelect event
```

#### setRange(start, end)
```javascript
// Set a date range
picker.setRange(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);

// Automatically swaps if start > end
picker.setRange(
  new Date('2024-01-31'),
  new Date('2024-01-01')
); // Swapped automatically

// Emits: rangeSelect event
```

#### addDate(date)
```javascript
// Add a date to multiple selection
picker.addDate(new Date('2024-01-15'));

// Duplicate dates are ignored
picker.addDate(new Date('2024-01-15')); // Not added
```

#### removeDate(date)
```javascript
// Remove a date from multiple selection
picker.removeDate(new Date('2024-01-15'));

// If date not found, nothing happens
```

#### getPerformanceMetrics()
```javascript
// Get performance metrics
const metrics = picker.getPerformanceMetrics();
console.log(metrics);
// {
//   lcp: 245.5,      // Largest Contentful Paint (ms)
//   fid: 12.3,       // First Input Delay (ms)
//   cls: 0.05,       // Cumulative Layout Shift
//   bundleSize: 45.2 // Bundle size (KB)
// }
```

#### reportPerformanceMetrics()
```javascript
// Log performance metrics to console
picker.reportPerformanceMetrics();
// Console output:
// Jalali Date Picker Performance Metrics: {
//   lcp: "245.50ms",
//   fid: "12.30ms",
//   cls: "0.0500",
//   bundleSize: "45.20KB"
// }
```

---

## Custom Events

### Event Reference

| Event | Trigger | Detail | Bubbles | Composed |
|-------|---------|--------|---------|----------|
| `dateSelect` | Single date selected | `{date, jalaliDate, gregorianDate, hijriDate}` | ✅ | ✅ |
| `rangeSelect` | Date range selected | `{start, end, startJalali, endJalali}` | ✅ | ✅ |
| `multipleSelect` | Multiple dates selected | `{dates, count, jalaliDates}` | ✅ | ✅ |
| `localeChange` | Locale changed | `{locale, direction}` | ✅ | ✅ |
| `themeChange` | Theme changed | `{theme, colors}` | ✅ | ✅ |
| `error` | Error occurs | `{code, message, timestamp}` | ✅ | ✅ |

### Event Details

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

#### multipleSelect
```javascript
picker.addEventListener('multipleSelect', (e) => {
  const {
    dates,          // [Date, Date, Date]
    count,          // 3
    jalaliDates     // ["1402/10/11", "1402/10/25", "1402/11/11"]
  } = e.detail;
});
```

#### localeChange
```javascript
picker.addEventListener('localeChange', (e) => {
  const {
    locale,         // 'fa' or 'en'
    direction       // 'rtl' or 'ltr'
  } = e.detail;
});
```

#### themeChange
```javascript
picker.addEventListener('themeChange', (e) => {
  const {
    theme,          // 'light'
    colors          // { '--primary-color': '#007bff', ... }
  } = e.detail;
});
```

#### error
```javascript
picker.addEventListener('error', (e) => {
  const {
    code,           // 'INVALID_DATE'
    message,        // 'Invalid date provided'
    timestamp       // 1705334400000
  } = e.detail;
});
```

### Error Codes

| Code | Meaning |
|------|---------|
| `INVALID_DATE` | Date object is invalid |
| `INVALID_RANGE` | Date range is invalid |
| `INVALID_LOCALE` | Locale is not supported |
| `INVALID_THEME` | Theme is not available |
| `INVALID_CALENDAR_TYPE` | Calendar type is not supported |
| `INITIALIZATION_FAILED` | Component initialization failed |

---

## CSS Variables

### Color Variables

#### Primary Colors
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

#### Secondary Colors
```css
jalali-date-picker {
  --secondary-color: #6c757d;
  --secondary-50: #f8f9fa;
  --secondary-100: #e9ecef;
  --secondary-200: #dee2e6;
  --secondary-300: #ced4da;
  --secondary-400: #adb5bd;
  --secondary-500: #6c757d;
  --secondary-600: #495057;
  --secondary-700: #343a40;
  --secondary-800: #212529;
  --secondary-900: #0d0d0d;
}
```

#### Semantic Colors
```css
jalali-date-picker {
  --success-color: #28a745;
  --warning-color: #ffc107;
  --error-color: #dc3545;
  --info-color: #17a2b8;
}
```

#### Background & Text
```css
jalali-date-picker {
  --background: #ffffff;
  --background-secondary: #f8f9fa;
  --background-tertiary: #e9ecef;
  --text-color: #000000;
  --text-secondary: #6c757d;
  --text-muted: #999999;
  --text-disabled: #cccccc;
}
```

### Size Variables

#### Border Radius
```css
jalali-date-picker {
  --border-radius: 8px;
  --border-radius-sm: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-full: 9999px;
}
```

#### Spacing
```css
jalali-date-picker {
  --padding-xs: 4px;
  --padding-sm: 8px;
  --padding-md: 12px;
  --padding-base: 16px;
  --padding-lg: 20px;
  --padding-xl: 24px;
  --padding-2xl: 32px;
  
  --margin-xs: 4px;
  --margin-sm: 8px;
  --margin-md: 12px;
  --margin-base: 16px;
  --margin-lg: 20px;
  --margin-xl: 24px;
  --margin-2xl: 32px;
  
  --gap-xs: 4px;
  --gap-sm: 8px;
  --gap-md: 12px;
  --gap-base: 16px;
  --gap-lg: 20px;
  --gap-xl: 24px;
}
```

#### Calendar Specific
```css
jalali-date-picker {
  --calendar-cell-size: 40px;
  --calendar-cell-gap: 8px;
  --calendar-padding: 16px;
  --calendar-header-height: 48px;
}
```

### Font Variables

#### Font Family
```css
jalali-date-picker {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'Courier New', Courier, monospace;
  --font-family-serif: Georgia, 'Times New Roman', serif;
}
```

#### Font Size
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

#### Font Weight
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

### Animation Variables

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

### Shadow Variables

```css
jalali-date-picker {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.2);
  --shadow-2xl: 0 16px 32px rgba(0, 0, 0, 0.25);
}
```

### Z-Index Variables

```css
jalali-date-picker {
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
}
```

---

## Type Definitions

### TypeScript Interfaces

```typescript
// Date Selection Types
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

// Locale & Theme Types
interface LocaleChangeDetail {
  locale: 'fa' | 'en';
  direction: 'rtl' | 'ltr';
}

interface ThemeChangeDetail {
  theme: string;
  colors: Record<string, string>;
}

// Error Type
interface ErrorDetail {
  code: string;
  message: string;
  timestamp: number;
}

// Component Types
type CalendarType = 'jalali' | 'gregorian' | 'hijri';
type Locale = 'fa' | 'en';
type SelectionMode = 'single' | 'range' | 'multiple';
type Theme = 'light' | 'dark' | 'glassmorphism';

// Performance Metrics
interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  bundleSize?: number;
}
```

---

## Examples

### Example 1: Single Date Selection
```html
<jalali-date-picker
  id="singlePicker"
  locale="fa"
  selection-mode="single"
></jalali-date-picker>

<script>
const picker = document.getElementById('singlePicker');

picker.addEventListener('dateSelect', (e) => {
  console.log('Selected:', e.detail.jalaliDate);
  console.log('Gregorian:', e.detail.gregorianDate);
});
</script>
```

### Example 2: Date Range Selection
```html
<jalali-date-picker
  id="rangePicker"
  locale="fa"
  selection-mode="range"
></jalali-date-picker>

<script>
const picker = document.getElementById('rangePicker');

picker.addEventListener('rangeSelect', (e) => {
  console.log('From:', e.detail.startJalali);
  console.log('To:', e.detail.endJalali);
});

// Set range programmatically
picker.setRange(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
</script>
```

### Example 3: Multiple Date Selection
```html
<jalali-date-picker
  id="multiplePicker"
  locale="fa"
  selection-mode="multiple"
></jalali-date-picker>

<script>
const picker = document.getElementById('multiplePicker');

picker.addEventListener('multipleSelect', (e) => {
  console.log('Selected dates:', e.detail.count);
  console.log('Jalali dates:', e.detail.jalaliDates);
});

// Add dates programmatically
picker.addDate(new Date('2024-01-01'));
picker.addDate(new Date('2024-01-15'));
picker.addDate(new Date('2024-01-31'));
</script>
```

### Example 4: Custom Theme
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
  console.log('Theme changed to:', e.detail.theme);
});
</script>
```

### Example 5: Bilingual Support
```html
<button id="toggleLang">Toggle Language</button>
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
  console.log('Language:', e.detail.locale);
  console.log('Direction:', e.detail.direction);
});
</script>
```

### Example 6: Error Handling
```html
<jalali-date-picker id="errorPicker"></jalali-date-picker>

<script>
const picker = document.getElementById('errorPicker');

picker.addEventListener('error', (e) => {
  console.error(`Error [${e.detail.code}]: ${e.detail.message}`);
  
  switch (e.detail.code) {
    case 'INVALID_DATE':
      console.log('Please select a valid date');
      break;
    case 'INVALID_RANGE':
      console.log('Invalid date range');
      break;
    default:
      console.log('Unknown error');
  }
});
</script>
```

### Example 7: Performance Monitoring
```html
<jalali-date-picker id="perfPicker"></jalali-date-picker>

<script>
const picker = document.getElementById('perfPicker');

// Get metrics
const metrics = picker.getPerformanceMetrics();
console.log('LCP:', metrics.lcp, 'ms');
console.log('FID:', metrics.fid, 'ms');
console.log('CLS:', metrics.cls);

// Report to console
picker.reportPerformanceMetrics();

// Send to analytics
fetch('/api/analytics', {
  method: 'POST',
  body: JSON.stringify(metrics)
});
</script>
```

### Example 8: React Integration
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

    const handleError = (e) => {
      console.error('Error:', e.detail.message);
    };

    picker.addEventListener('dateSelect', handleDateSelect);
    picker.addEventListener('error', handleError);

    return () => {
      picker.removeEventListener('dateSelect', handleDateSelect);
      picker.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div>
      <jalali-date-picker
        ref={pickerRef}
        locale="fa"
        selection-mode="single"
      ></jalali-date-picker>
      {selectedDate && <p>Selected: {selectedDate}</p>}
    </div>
  );
}
```

### Example 9: Vue Integration
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
    <p v-if="selectedDate">Selected: {{ selectedDate }}</p>
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
      console.log('Range:', e.detail.startJalali, '-', e.detail.endJalali);
    },
    onLocaleChange(e) {
      console.log('Locale changed to:', e.detail.locale);
    },
    onError(e) {
      console.error('Error:', e.detail.message);
    }
  }
};
</script>
```

### Example 10: Angular Integration
```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'jalali-web-component';

@Component({
  selector: 'app-date-picker',
  template: `
    <jalali-date-picker
      #picker
      locale="fa"
      selection-mode="single"
    ></jalali-date-picker>
    <p *ngIf="selectedDate">Selected: {{ selectedDate }}</p>
  `
})
export class DatePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;
  selectedDate: string | null = null;

  ngAfterViewInit() {
    const pickerElement = this.picker.nativeElement;

    pickerElement.addEventListener('dateSelect', (e: CustomEvent) => {
      this.selectedDate = e.detail.jalaliDate;
    });

    pickerElement.addEventListener('error', (e: CustomEvent) => {
      console.error('Error:', e.detail.message);
    });
  }
}
```

---

