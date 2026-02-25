# Custom Events Quick Reference

## Event Summary Table

| Event | Trigger | Detail Fields | Use Case |
|-------|---------|---------------|----------|
| `dateSelect` | Single date selected | `date`, `jalaliDate`, `gregorianDate`, `hijriDate` | Track single date selections |
| `rangeSelect` | Date range selected | `start`, `end`, `startJalali`, `endJalali` | Track date range selections |
| `multipleSelect` | Multiple dates selected | `dates`, `count`, `jalaliDates` | Track multiple date selections |
| `localeChange` | Locale changed | `locale`, `direction` | Update UI language/direction |
| `themeChange` | Theme changed | `theme`, `colors` | Update theme-dependent UI |
| `error` | Error occurs | `code`, `message`, `timestamp` | Handle errors gracefully |

## Quick Code Snippets

### Listen to All Events
```javascript
const picker = document.querySelector('jalali-date-picker');

picker.addEventListener('dateSelect', (e) => {
  console.log('Date selected:', e.detail.jalaliDate);
});

picker.addEventListener('rangeSelect', (e) => {
  console.log('Range selected:', e.detail.startJalali, '-', e.detail.endJalali);
});

picker.addEventListener('multipleSelect', (e) => {
  console.log('Multiple dates:', e.detail.count);
});

picker.addEventListener('localeChange', (e) => {
  console.log('Locale:', e.detail.locale, 'Direction:', e.detail.direction);
});

picker.addEventListener('themeChange', (e) => {
  console.log('Theme:', e.detail.theme);
});

picker.addEventListener('error', (e) => {
  console.error('Error:', e.detail.message);
});
```

### Single Event Listener
```javascript
const picker = document.querySelector('jalali-date-picker');

picker.addEventListener('dateSelect', (e) => {
  const { date, jalaliDate, gregorianDate, hijriDate } = e.detail;
  console.log(`Selected: ${jalaliDate} (${gregorianDate})`);
});
```

### Event Delegation
```javascript
document.addEventListener('dateSelect', (e) => {
  if (e.target.tagName === 'JALALI-DATE-PICKER') {
    console.log('Date selected from picker:', e.detail.jalaliDate);
  }
});
```

### Prevent Default (Cancel Event)
```javascript
picker.addEventListener('dateSelect', (e) => {
  if (isInvalidDate(e.detail.date)) {
    e.preventDefault();
    console.log('Date selection cancelled');
  }
});
```

### React Integration
```jsx
import { useEffect, useRef } from 'react';

export function DatePickerComponent() {
  const pickerRef = useRef(null);

  useEffect(() => {
    const picker = pickerRef.current;
    
    const handleDateSelect = (e) => {
      console.log('Selected:', e.detail.jalaliDate);
    };

    picker?.addEventListener('dateSelect', handleDateSelect);
    
    return () => {
      picker?.removeEventListener('dateSelect', handleDateSelect);
    };
  }, []);

  return <jalali-date-picker ref={pickerRef}></jalali-date-picker>;
}
```

### Vue Integration
```vue
<template>
  <jalali-date-picker
    @dateSelect="onDateSelect"
    @rangeSelect="onRangeSelect"
    @localeChange="onLocaleChange"
    @themeChange="onThemeChange"
    @error="onError"
  ></jalali-date-picker>
</template>

<script>
export default {
  methods: {
    onDateSelect(e) {
      console.log('Selected:', e.detail.jalaliDate);
    },
    onRangeSelect(e) {
      console.log('Range:', e.detail.startJalali, '-', e.detail.endJalali);
    },
    onLocaleChange(e) {
      console.log('Locale:', e.detail.locale);
    },
    onThemeChange(e) {
      console.log('Theme:', e.detail.theme);
    },
    onError(e) {
      console.error('Error:', e.detail.message);
    }
  }
}
</script>
```

### Angular Integration
```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  template: `<jalali-date-picker #picker></jalali-date-picker>`
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

## Event Detail Examples

### dateSelect Detail
```javascript
{
  date: Date(2024-01-15),
  jalaliDate: "1402/10/25",
  gregorianDate: "2024-01-15",
  hijriDate: "1445/07/05"
}
```

### rangeSelect Detail
```javascript
{
  start: Date(2024-01-01),
  end: Date(2024-01-31),
  startJalali: "1402/10/11",
  endJalali: "1402/11/11"
}
```

### multipleSelect Detail
```javascript
{
  dates: [Date(2024-01-01), Date(2024-01-15), Date(2024-01-31)],
  count: 3,
  jalaliDates: ["1402/10/11", "1402/10/25", "1402/11/11"]
}
```

### localeChange Detail
```javascript
{
  locale: "en",
  direction: "ltr"
}
```

### themeChange Detail
```javascript
{
  theme: "dark",
  colors: {
    "--primary-color": "#007bff",
    "--secondary-color": "#6c757d",
    // ... more CSS variables
  }
}
```

### error Detail
```javascript
{
  code: "INVALID_DATE",
  message: "Invalid date provided",
  timestamp: 1705334400000
}
```

## Event Properties

All events have these properties:
- `bubbles: true` - Events propagate up the DOM
- `composed: true` - Events cross Shadow DOM boundary
- `cancelable: true` - Can be prevented with `preventDefault()`

## Error Codes

| Code | Meaning |
|------|---------|
| `INVALID_DATE` | Date object is invalid |
| `INVALID_RANGE` | Date range is invalid |
| `INVALID_LOCALE` | Locale is not supported |
| `INVALID_THEME` | Theme is not available |
| `INVALID_CALENDAR_TYPE` | Calendar type is not supported |
| `INITIALIZATION_FAILED` | Component initialization failed |

## Best Practices

1. **Always check event.detail** - Ensure detail object exists before accessing properties
2. **Use event delegation** - Listen on document for events from multiple pickers
3. **Clean up listeners** - Remove event listeners when component unmounts
4. **Handle errors** - Always listen to 'error' event for error handling
5. **Use preventDefault()** - Cancel events when validation fails
6. **Type your events** - Use TypeScript for better type safety

## TypeScript Types

```typescript
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

interface LocaleChangeDetail {
  locale: 'fa' | 'en';
  direction: 'rtl' | 'ltr';
}

interface ThemeChangeDetail {
  theme: string;
  colors: Record<string, string>;
}

interface ErrorDetail {
  code: string;
  message: string;
  timestamp: number;
}
```
