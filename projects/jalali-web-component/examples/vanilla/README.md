# Jalali Date Picker - Vanilla JavaScript Integration

Complete guide for using the Jalali Date Picker Web Component in vanilla JavaScript without any framework dependencies.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Event Handling](#event-handling)
- [State Management](#state-management)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The Jalali Date Picker Web Component is a standards-based custom element that works seamlessly in vanilla JavaScript. It provides:

- **No Framework Required**: Pure Web Components API
- **Shadow DOM Encapsulation**: Styles don't leak to parent
- **Custom Events**: Full event-driven architecture
- **Multiple Selection Modes**: Single, range, and multiple dates
- **Internationalization**: Persian and English support
- **21 Built-in Themes**: Customizable appearance
- **Three Calendar Systems**: Jalali, Gregorian, and Hijri

## Installation

### 1. Include the Web Component

```html
<!DOCTYPE html>
<html>
<head>
  <script src="path/to/jalali-date-picker.js"></script>
</head>
<body>
  <jalali-date-picker></jalali-date-picker>
</body>
</html>
```

### 2. Via NPM (if published)

```bash
npm install jalali-date-picker
```

```javascript
import 'jalali-date-picker';
```

## Quick Start

### Basic Usage

```html
<!-- Simple date picker -->
<jalali-date-picker
  id="my-picker"
  locale="fa"
  theme="light"
  calendar-type="jalali">
</jalali-date-picker>

<script>
  const picker = document.getElementById('my-picker');

  // Listen to date selection
  picker.addEventListener('dateSelect', (event) => {
    console.log('Selected date:', event.detail.date);
  });

  // Get selected date
  console.log('Current value:', picker.value);
</script>
```

### Setting a Date Programmatically

```javascript
const picker = document.getElementById('my-picker');

// Set a specific date
picker.setDate(new Date(2024, 0, 15));

// Get the selected date
const selectedDate = picker.selectedDate;
console.log(selectedDate);
```

## API Reference

### Attributes

Attributes can be set on the HTML element:

```html
<jalali-date-picker
  selected-date="2024-01-15"
  calendar-type="jalali"
  locale="fa"
  theme="light"
  selection-mode="single"
  disabled>
</jalali-date-picker>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `selected-date` | string (ISO) | null | Initial selected date |
| `calendar-type` | 'jalali' \| 'gregorian' \| 'hijri' | 'jalali' | Calendar system to use |
| `locale` | 'fa' \| 'en' | 'fa' | Language and direction |
| `theme` | string | 'light' | Theme name |
| `selection-mode` | 'single' \| 'range' \| 'multiple' | 'single' | Selection mode |
| `disabled` | boolean | false | Disable the picker |

### Properties

Access and modify properties via JavaScript:

```javascript
const picker = document.getElementById('my-picker');

// Read/Write Properties
picker.selectedDate = new Date();
picker.calendarType = 'jalali';
picker.locale = 'fa';
picker.theme = 'dark';
picker.selectionMode = 'range';
picker.disabled = false;

// Read-only Properties
console.log(picker.value);           // ISO string of selected date
console.log(picker.selectedRange);   // { start, end }
console.log(picker.selectedDates);   // Array of dates
```

### Methods

#### `setDate(date: Date): void`

Set a single date programmatically.

```javascript
picker.setDate(new Date(2024, 0, 15));
```

#### `setRange(start: Date, end: Date): void`

Set a date range programmatically.

```javascript
const start = new Date(2024, 0, 1);
const end = new Date(2024, 0, 31);
picker.setRange(start, end);
```

#### `addDate(date: Date): void`

Add a date to multiple selection mode.

```javascript
picker.addDate(new Date(2024, 0, 15));
```

#### `removeDate(date: Date): void`

Remove a date from multiple selection mode.

```javascript
picker.removeDate(new Date(2024, 0, 15));
```

#### `open(): void`

Open the date picker (if it has a modal/dropdown).

```javascript
picker.open();
```

#### `close(): void`

Close the date picker.

```javascript
picker.close();
```

#### `reset(): void`

Reset the picker to its initial state.

```javascript
picker.reset();
```

## Examples

### Example 1: Single Date Selection

```html
<jalali-date-picker
  id="birth-date"
  selection-mode="single"
  locale="fa"
  theme="light">
</jalali-date-picker>

<p>Selected: <span id="output"></span></p>

<script>
  const picker = document.getElementById('birth-date');
  const output = document.getElementById('output');

  picker.addEventListener('dateSelect', (event) => {
    const { date, jalaliDate } = event.detail;
    output.textContent = `${jalaliDate} (${date.toLocaleDateString('fa-IR')})`;
  });
</script>
```

### Example 2: Date Range Selection

```html
<jalali-date-picker
  id="travel-dates"
  selection-mode="range"
  locale="fa"
  theme="light">
</jalali-date-picker>

<div>
  <p>Start: <span id="start-date"></span></p>
  <p>End: <span id="end-date"></span></p>
  <p>Duration: <span id="duration"></span> days</p>
</div>

<script>
  const picker = document.getElementById('travel-dates');

  picker.addEventListener('rangeSelect', (event) => {
    const { range } = event.detail;
    const { start, end } = range;

    document.getElementById('start-date').textContent = start.toLocaleDateString('fa-IR');
    document.getElementById('end-date').textContent = end.toLocaleDateString('fa-IR');

    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    document.getElementById('duration').textContent = days;
  });
</script>
```

### Example 3: Multiple Dates Selection

```html
<jalali-date-picker
  id="event-dates"
  selection-mode="multiple"
  locale="fa"
  theme="light">
</jalali-date-picker>

<div id="selected-dates"></div>

<script>
  const picker = document.getElementById('event-dates');
  const container = document.getElementById('selected-dates');

  picker.addEventListener('multipleSelect', (event) => {
    const { dates } = event.detail;

    container.innerHTML = dates
      .map(date => `<span class="date-tag">${date.toLocaleDateString('fa-IR')}</span>`)
      .join('');
  });
</script>
```

### Example 4: Programmatic Control

```html
<button id="today-btn">Set Today</button>
<button id="next-week-btn">Set Next Week</button>
<button id="reset-btn">Reset</button>

<jalali-date-picker id="controlled-picker"></jalali-date-picker>

<script>
  const picker = document.getElementById('controlled-picker');

  document.getElementById('today-btn').addEventListener('click', () => {
    picker.setDate(new Date());
  });

  document.getElementById('next-week-btn').addEventListener('click', () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    picker.setDate(nextWeek);
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    picker.reset();
  });
</script>
```

### Example 5: Theme Switching

```html
<select id="theme-select">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="glassmorphism">Glassmorphism</option>
  <option value="gradient">Gradient</option>
</select>

<jalali-date-picker id="themed-picker" theme="light"></jalali-date-picker>

<script>
  const picker = document.getElementById('themed-picker');
  const select = document.getElementById('theme-select');

  select.addEventListener('change', (event) => {
    picker.theme = event.target.value;
  });
</script>
```

### Example 6: Locale Switching

```html
<select id="locale-select">
  <option value="fa">فارسی</option>
  <option value="en">English</option>
</select>

<jalali-date-picker id="locale-picker" locale="fa"></jalali-date-picker>

<script>
  const picker = document.getElementById('locale-picker');
  const select = document.getElementById('locale-select');

  select.addEventListener('change', (event) => {
    picker.locale = event.target.value;
  });
</script>
```

### Example 7: Form Integration

```html
<form id="booking-form">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div>
    <label for="check-in">Check-in Date:</label>
    <jalali-date-picker
      id="check-in"
      selection-mode="single"
      locale="fa">
    </jalali-date-picker>
  </div>

  <div>
    <label for="check-out">Check-out Date:</label>
    <jalali-date-picker
      id="check-out"
      selection-mode="single"
      locale="fa">
    </jalali-date-picker>
  </div>

  <button type="submit">Book</button>
</form>

<script>
  const form = document.getElementById('booking-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const checkIn = document.getElementById('check-in').selectedDate;
    const checkOut = document.getElementById('check-out').selectedDate;

    if (!name || !checkIn || !checkOut) {
      alert('Please fill in all fields');
      return;
    }

    const formData = {
      name,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString()
    };

    console.log('Booking data:', formData);
    // Send to server...
  });
</script>
```

## Event Handling

### dateSelect Event

Fired when a single date is selected.

```javascript
picker.addEventListener('dateSelect', (event) => {
  const {
    date,              // JavaScript Date object
    jalaliDate,        // Jalali date string
    gregorianDate,     // Gregorian date string
    hijriDate          // Hijri date string
  } = event.detail;

  console.log('Selected:', date);
});
```

### rangeSelect Event

Fired when a date range is selected.

```javascript
picker.addEventListener('rangeSelect', (event) => {
  const { range } = event.detail;
  const { start, end } = range;

  console.log('Range:', start, 'to', end);
});
```

### multipleSelect Event

Fired when multiple dates are selected.

```javascript
picker.addEventListener('multipleSelect', (event) => {
  const { dates } = event.detail;

  console.log('Selected dates:', dates);
});
```

### localeChange Event

Fired when locale is changed.

```javascript
picker.addEventListener('localeChange', (event) => {
  const { locale } = event.detail;

  console.log('Locale changed to:', locale);
});
```

### themeChange Event

Fired when theme is changed.

```javascript
picker.addEventListener('themeChange', (event) => {
  const { theme } = event.detail;

  console.log('Theme changed to:', theme);
});
```

## State Management

### Reactive State Pattern

```javascript
// Create a simple state object
const state = {
  selectedDate: null,
  locale: 'fa',
  theme: 'light'
};

const picker = document.getElementById('my-picker');

// Update state on date selection
picker.addEventListener('dateSelect', (event) => {
  state.selectedDate = event.detail.date;
  render();
});

// Update picker when state changes
function updateLocale(newLocale) {
  state.locale = newLocale;
  picker.locale = newLocale;
  render();
}

function render() {
  // Update UI based on state
  console.log('Current state:', state);
}
```

### Multiple Pickers Synchronization

```javascript
const picker1 = document.getElementById('picker1');
const picker2 = document.getElementById('picker2');

// Sync selection between pickers
picker1.addEventListener('dateSelect', (event) => {
  picker2.setDate(event.detail.date);
});

picker2.addEventListener('dateSelect', (event) => {
  picker1.setDate(event.detail.date);
});
```

## Best Practices

### 1. Always Check for Date Validity

```javascript
picker.addEventListener('dateSelect', (event) => {
  const { date } = event.detail;

  if (date instanceof Date && !isNaN(date)) {
    // Date is valid
    console.log('Valid date:', date);
  }
});
```

### 2. Use Proper Event Delegation

```javascript
// Good: Listen to specific picker
const picker = document.getElementById('my-picker');
picker.addEventListener('dateSelect', handleDateSelect);

// Avoid: Global event listeners
document.addEventListener('dateSelect', handleDateSelect); // May not work
```

### 3. Clean Up Event Listeners

```javascript
function setupPicker() {
  const picker = document.getElementById('my-picker');

  const handler = (event) => {
    console.log('Date selected:', event.detail.date);
  };

  picker.addEventListener('dateSelect', handler);

  // Clean up when done
  return () => {
    picker.removeEventListener('dateSelect', handler);
  };
}

const cleanup = setupPicker();
// Later...
cleanup();
```

### 4. Handle Disabled State

```javascript
const picker = document.getElementById('my-picker');

// Disable picker
picker.disabled = true;

// Check if disabled
if (picker.disabled) {
  console.log('Picker is disabled');
}
```

### 5. Use Proper Date Formatting

```javascript
const date = new Date(2024, 0, 15);

// Format for display
const display = date.toLocaleDateString('fa-IR');

// Format for API
const iso = date.toISOString();

// Format for storage
const timestamp = date.getTime();
```

### 6. Validate Date Ranges

```javascript
const start = new Date(2024, 0, 1);
const end = new Date(2024, 0, 31);

if (start <= end) {
  picker.setRange(start, end);
} else {
  console.error('Invalid range: start must be before end');
}
```

## Troubleshooting

### Issue: Web Component Not Rendering

**Solution**: Ensure the script is loaded before using the component.

```html
<!-- ✓ Correct -->
<script src="jalali-date-picker.js"></script>
<jalali-date-picker></jalali-date-picker>

<!-- ✗ Wrong -->
<jalali-date-picker></jalali-date-picker>
<script src="jalali-date-picker.js"></script>
```

### Issue: Events Not Firing

**Solution**: Make sure you're listening to the correct event name and the picker is in the DOM.

```javascript
// ✓ Correct
const picker = document.getElementById('my-picker');
picker.addEventListener('dateSelect', (event) => {
  console.log('Event fired:', event.detail);
});

// ✗ Wrong - picker not found
const picker = document.getElementById('non-existent');
picker.addEventListener('dateSelect', ...); // Error!
```

### Issue: Styles Not Applied

**Solution**: The component uses Shadow DOM for style encapsulation. Use CSS variables to customize:

```css
jalali-date-picker {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #28a745;
}
```

### Issue: Locale Not Changing

**Solution**: Set locale before or after initialization:

```javascript
// Before initialization
const picker = document.createElement('jalali-date-picker');
picker.locale = 'en';
document.body.appendChild(picker);

// After initialization
const picker = document.getElementById('my-picker');
picker.locale = 'en';
```

### Issue: Date Not Persisting

**Solution**: Use `selectedDate` property or `setDate()` method:

```javascript
// ✓ Correct
picker.selectedDate = new Date(2024, 0, 15);
// or
picker.setDate(new Date(2024, 0, 15));

// ✗ Wrong - attribute only
picker.setAttribute('selected-date', '2024-01-15');
```

## Browser Support

- Chrome/Edge: 67+
- Firefox: 63+
- Safari: 10.1+
- IE: Not supported (Web Components)

## Performance Tips

1. **Lazy Load**: Load the component only when needed
2. **Debounce Events**: Debounce rapid event firing
3. **Memoize Calculations**: Cache date calculations
4. **Use CSS Variables**: For efficient theme switching

## Additional Resources

- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_dom)

## License

MIT
