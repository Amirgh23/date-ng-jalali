# API Reference Documentation Summary

## Files Created

### 1. **API_REFERENCE.md** (English)
Complete API documentation in English with:
- Overview and features
- Installation instructions
- Basic usage examples (HTML, JavaScript, React, Vue, Angular)
- Properties reference table with detailed explanations
- Methods reference table with code examples
- Custom events documentation with event details
- CSS variables guide (colors, sizes, fonts, animations, shadows, z-index)
- TypeScript type definitions
- 10 practical examples covering all use cases

### 2. **API_REFERENCE_PERSIAN.md** (فارسی)
Complete API documentation in Persian with:
- نمای کلی و ویژگی‌ها
- دستورالعمل نصب
- مثال‌های استفاده پایه
- جدول مرجع ویژگی‌ها با توضیحات
- جدول مرجع متدها با مثال‌های کد
- مستندات رویدادهای سفارشی
- راهنمای متغیرهای CSS
- تعریف‌های نوع TypeScript
- 8 مثال عملی

## Documentation Structure

### Properties (ویژگی‌ها)
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| selectedDate | Date \| null | null | Currently selected date |
| selectedRange | {start, end} | {null, null} | Selected date range |
| selectedDates | Date[] | [] | Array of selected dates |
| calendarType | 'jalali' \| 'gregorian' \| 'hijri' | 'jalali' | Calendar system |
| locale | 'fa' \| 'en' | 'fa' | Language and direction |
| theme | string | 'light' | Theme name |
| selectionMode | 'single' \| 'range' \| 'multiple' | 'single' | Selection mode |
| disabled | boolean | false | Disable selection |
| value | string | '' | ISO string of selected date |

### Methods (متدها)
- `open()` - Open the date picker
- `close()` - Close the date picker
- `reset()` - Clear all selections
- `setDate(date)` - Set single date
- `setRange(start, end)` - Set date range
- `addDate(date)` - Add date to multiple selection
- `removeDate(date)` - Remove date from multiple selection
- `getPerformanceMetrics()` - Get performance metrics
- `reportPerformanceMetrics()` - Log performance metrics

### Custom Events (رویدادهای سفارشی)
- `dateSelect` - Single date selected
- `rangeSelect` - Date range selected
- `multipleSelect` - Multiple dates selected
- `localeChange` - Locale changed
- `themeChange` - Theme changed
- `error` - Error occurs

### CSS Variables (متغیرهای CSS)

#### Color Variables
- Primary colors (--primary-color, --primary-50 to --primary-900)
- Secondary colors (--secondary-color, --secondary-50 to --secondary-900)
- Semantic colors (--success-color, --warning-color, --error-color, --info-color)
- Background colors (--background, --background-secondary, --background-tertiary)
- Text colors (--text-color, --text-secondary, --text-muted, --text-disabled)
- Interactive colors (--hover-bg, --selected-bg, --disabled-bg, --focus-ring)

#### Size Variables
- Border radius (--border-radius, --border-radius-sm to --border-radius-full)
- Padding (--padding-xs to --padding-2xl)
- Margin (--margin-xs to --margin-2xl)
- Gap (--gap-xs to --gap-xl)
- Calendar specific (--calendar-cell-size, --calendar-cell-gap, --calendar-padding, --calendar-header-height)

#### Font Variables
- Font family (--font-family, --font-family-mono, --font-family-serif)
- Font size (--font-size-xs to --font-size-3xl)
- Font weight (--font-weight-light to --font-weight-extrabold)
- Line height (--line-height-tight to --line-height-loose)
- Letter spacing (--letter-spacing-tight to --letter-spacing-wider)

#### Animation Variables
- Transition duration (--transition-duration-fast to --transition-duration-slower)
- Transition timing (--transition-timing, --transition-timing-linear, etc.)

#### Shadow Variables
- --shadow-sm to --shadow-2xl

#### Z-Index Variables
- --z-index-dropdown to --z-index-tooltip

## Framework Integration Examples

### React
```jsx
import { useRef, useEffect } from 'react';
import 'jalali-web-component';

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

## Key Features Documented

✅ **Three Calendar Systems**
- Jalali (Persian)
- Gregorian (Western)
- Hijri (Islamic)

✅ **Three Selection Modes**
- Single date selection
- Date range selection
- Multiple dates selection

✅ **Bilingual Support**
- Persian (فارسی) with RTL
- English with LTR

✅ **Customizable Themes**
- Light theme
- Dark theme
- Glassmorphism theme
- Custom CSS variables

✅ **Accessibility**
- WCAG 2.1 compliant
- Keyboard navigation
- Screen reader support
- Focus management

✅ **Performance**
- Shadow DOM encapsulation
- Lazy rendering
- Memoization
- Performance metrics

✅ **Framework Agnostic**
- Works with vanilla JavaScript
- React integration
- Vue integration
- Angular integration

## Usage Patterns

### Basic Single Date Selection
```html
<jalali-date-picker locale="fa" selection-mode="single"></jalali-date-picker>
```

### Date Range Selection
```html
<jalali-date-picker locale="fa" selection-mode="range"></jalali-date-picker>
```

### Multiple Dates Selection
```html
<jalali-date-picker locale="fa" selection-mode="multiple"></jalali-date-picker>
```

### Custom Theme
```html
<jalali-date-picker locale="fa" theme="dark"></jalali-date-picker>

<style>
  jalali-date-picker {
    --primary-color: #6366f1;
    --background: #1f2937;
    --text-color: #f3f4f6;
  }
</style>
```

### Bilingual Support
```javascript
const picker = document.querySelector('jalali-date-picker');
picker.locale = 'en'; // Switch to English
picker.locale = 'fa'; // Switch to Persian
```

## Error Handling

The component emits error events with the following codes:
- `INVALID_DATE` - Date object is invalid
- `INVALID_RANGE` - Date range is invalid
- `INVALID_LOCALE` - Locale is not supported
- `INVALID_THEME` - Theme is not available
- `INVALID_CALENDAR_TYPE` - Calendar type is not supported
- `INITIALIZATION_FAILED` - Component initialization failed

## Performance Metrics

The component provides performance monitoring:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **Bundle Size**

## Related Documentation

- [CSS Variables Guide](./CSS_VARIABLES_GUIDE.md)
- [Custom Events Reference](./CUSTOM_EVENTS_QUICK_REFERENCE.md)
- [Getting Started](./GETTING_STARTED.md)
- [README](./README.md)

## File Locations

- **English**: `projects/jalali-web-component/API_REFERENCE.md`
- **Persian**: `projects/jalali-web-component/API_REFERENCE_PERSIAN.md`

## Last Updated

2024

## Version

1.0.0
