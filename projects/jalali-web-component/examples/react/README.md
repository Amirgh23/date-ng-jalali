# Jalali Date Picker - React Integration Guide

Complete guide for using the Jalali Date Picker Web Component in React applications.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Basic Usage](#basic-usage)
4. [Props and Events](#props-and-events)
5. [State Management Patterns](#state-management-patterns)
6. [Form Integration](#form-integration)
7. [Accessibility](#accessibility)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)
10. [API Reference](#api-reference)

## Installation

### 1. Install the Web Component Package

```bash
npm install @jalali-web-component/core
```

### 2. Import and Register the Web Component

In your main application file (e.g., `main.tsx` or `index.tsx`):

```tsx
import { JalaliDatePickerElement } from '@jalali-web-component/core';

// Register the web component
customElements.define('jalali-date-picker', JalaliDatePickerElement);
```

### 3. Import the React Wrapper

```tsx
import { JalaliDatePickerReact } from './JalaliDatePickerReact';
```

## Quick Start

### Basic Example

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <JalaliDatePickerReact
      selectedDate={date}
      onDateSelect={(detail) => setDate(detail.date)}
      locale="fa"
      theme="light"
    />
  );
}

export default App;
```

## Basic Usage

### Single Date Selection

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function SingleDateExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <JalaliDatePickerReact
        selectedDate={selectedDate}
        onDateSelect={(detail) => {
          setSelectedDate(detail.date);
          console.log('Selected date:', detail.date);
          console.log('Jalali date:', detail.jalaliDate);
          console.log('Gregorian date:', detail.gregorianDate);
        }}
        locale="fa"
        theme="light"
        selectionMode="single"
      />
      <p>Selected: {selectedDate?.toLocaleDateString('fa-IR')}</p>
    </div>
  );
}
```

### Date Range Selection

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';
import { DateRange } from './types';

function RangeSelectionExample() {
  const [range, setRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  return (
    <div>
      <JalaliDatePickerReact
        selectedRange={range}
        onRangeSelect={(detail) => {
          setRange(detail.range);
          console.log('Range selected:', detail.range);
        }}
        locale="fa"
        theme="light"
        selectionMode="range"
      />
      <p>
        From: {range.start?.toLocaleDateString('fa-IR')}
        <br />
        To: {range.end?.toLocaleDateString('fa-IR')}
      </p>
    </div>
  );
}
```

### Multiple Dates Selection

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function MultipleSelectionExample() {
  const [dates, setDates] = useState<Date[]>([]);

  return (
    <div>
      <JalaliDatePickerReact
        selectedDates={dates}
        onMultipleSelect={(detail) => {
          setDates(detail.dates);
          console.log('Selected dates:', detail.dates);
        }}
        locale="fa"
        theme="light"
        selectionMode="multiple"
      />
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date.toLocaleDateString('fa-IR')}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Props and Events

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedDate` | `Date \| null` | `null` | Selected date (controlled component) |
| `onDateSelect` | `(detail: DateSelectDetail) => void` | - | Callback when date is selected |
| `selectedRange` | `DateRange` | `{ start: null, end: null }` | Selected date range |
| `onRangeSelect` | `(detail: RangeSelectDetail) => void` | - | Callback when range is selected |
| `selectedDates` | `Date[]` | `[]` | Selected dates array |
| `onMultipleSelect` | `(detail: MultipleSelectDetail) => void` | - | Callback when multiple dates are selected |
| `calendarType` | `'jalali' \| 'gregorian' \| 'hijri'` | `'jalali'` | Calendar system to use |
| `locale` | `'fa' \| 'en'` | `'fa'` | Language and locale |
| `theme` | `string` | `'light'` | Theme name |
| `selectionMode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode |
| `disabled` | `boolean` | `false` | Disable the picker |
| `onLocaleChange` | `(detail: LocaleChangeDetail) => void` | - | Callback when locale changes |
| `onThemeChange` | `(detail: ThemeChangeDetail) => void` | - | Callback when theme changes |
| `onError` | `(error: Error) => void` | - | Callback when an error occurs |
| `className` | `string` | - | CSS class name |
| `style` | `React.CSSProperties` | - | Inline styles |
| `ref` | `React.Ref<HTMLElement>` | - | Ref to the web component element |

### Events

#### dateSelect

Emitted when a single date is selected.

```tsx
<JalaliDatePickerReact
  onDateSelect={(detail) => {
    console.log('Date:', detail.date);
    console.log('Jalali:', detail.jalaliDate);
    console.log('Gregorian:', detail.gregorianDate);
    console.log('Hijri:', detail.hijriDate);
  }}
/>
```

#### rangeSelect

Emitted when a date range is selected.

```tsx
<JalaliDatePickerReact
  onRangeSelect={(detail) => {
    console.log('Start:', detail.range.start);
    console.log('End:', detail.range.end);
  }}
/>
```

#### multipleSelect

Emitted when multiple dates are selected.

```tsx
<JalaliDatePickerReact
  onMultipleSelect={(detail) => {
    console.log('Dates:', detail.dates);
  }}
/>
```

#### localeChange

Emitted when the locale changes.

```tsx
<JalaliDatePickerReact
  onLocaleChange={(detail) => {
    console.log('New locale:', detail.locale);
  }}
/>
```

#### themeChange

Emitted when the theme changes.

```tsx
<JalaliDatePickerReact
  onThemeChange={(detail) => {
    console.log('New theme:', detail.theme);
  }}
/>
```

## State Management Patterns

### Controlled Component Pattern

The component is fully controlled by React state:

```tsx
function ControlledExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <JalaliDatePickerReact
      selectedDate={date}
      onDateSelect={(detail) => setDate(detail.date)}
    />
  );
}
```

### Uncontrolled Component Pattern

The component manages its own state internally:

```tsx
function UncontrolledExample() {
  const pickerRef = useRef<HTMLElement>(null);

  const handleGetValue = () => {
    if (pickerRef.current) {
      const value = (pickerRef.current as any).value;
      console.log('Selected date:', value);
    }
  };

  return (
    <>
      <JalaliDatePickerReact ref={pickerRef} />
      <button onClick={handleGetValue}>Get Value</button>
    </>
  );
}
```

### Using useCallback for Performance

Optimize event handlers with `useCallback`:

```tsx
function OptimizedExample() {
  const [date, setDate] = useState<Date | null>(null);

  const handleDateSelect = useCallback((detail: DateSelectDetail) => {
    setDate(detail.date);
  }, []);

  return (
    <JalaliDatePickerReact
      selectedDate={date}
      onDateSelect={handleDateSelect}
    />
  );
}
```

### Using useReducer for Complex State

For complex state management:

```tsx
interface State {
  singleDate: Date | null;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  multipleDates: Date[];
}

type Action =
  | { type: 'SET_SINGLE_DATE'; payload: Date | null }
  | { type: 'SET_RANGE'; payload: { start: Date | null; end: Date | null } }
  | { type: 'SET_MULTIPLE_DATES'; payload: Date[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SINGLE_DATE':
      return { ...state, singleDate: action.payload };
    case 'SET_RANGE':
      return {
        ...state,
        rangeStart: action.payload.start,
        rangeEnd: action.payload.end,
      };
    case 'SET_MULTIPLE_DATES':
      return { ...state, multipleDates: action.payload };
    default:
      return state;
  }
}

function ComplexStateExample() {
  const [state, dispatch] = useReducer(reducer, {
    singleDate: null,
    rangeStart: null,
    rangeEnd: null,
    multipleDates: [],
  });

  return (
    <JalaliDatePickerReact
      selectedDate={state.singleDate}
      onDateSelect={(detail) =>
        dispatch({ type: 'SET_SINGLE_DATE', payload: detail.date })
      }
    />
  );
}
```

## Form Integration

### Basic Form Integration

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: null as Date | null,
    eventDate: null as Date | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.birthDate || !formData.eventDate) {
      alert('Please select both dates');
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
      </div>

      <div>
        <label>Birth Date:</label>
        <JalaliDatePickerReact
          selectedDate={formData.birthDate}
          onDateSelect={(detail) =>
            setFormData({ ...formData, birthDate: detail.date })
          }
        />
      </div>

      <div>
        <label>Event Date:</label>
        <JalaliDatePickerReact
          selectedDate={formData.eventDate}
          onDateSelect={(detail) =>
            setFormData({ ...formData, eventDate: detail.date })
          }
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Form Validation

```tsx
function FormWithValidation() {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>('');

  const handleDateSelect = (detail: DateSelectDetail) => {
    const today = new Date();
    if (detail.date > today) {
      setError('Date cannot be in the future');
      return;
    }
    setDate(detail.date);
    setError('');
  };

  return (
    <div>
      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={handleDateSelect}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

## Accessibility

### ARIA Labels

```tsx
<JalaliDatePickerReact
  selectedDate={date}
  onDateSelect={(detail) => setDate(detail.date)}
  aria-label="Select a date"
  aria-describedby="date-help"
/>
<p id="date-help">Please select your preferred date</p>
```

### Keyboard Navigation

The component supports full keyboard navigation:

- **Arrow Keys**: Navigate between dates
- **Enter**: Select a date
- **Escape**: Close the picker
- **Tab**: Move to next element

### Screen Reader Support

The component includes proper ARIA labels and semantic HTML for screen reader compatibility.

## Common Patterns

### Syncing Multiple Pickers

```tsx
function SyncedPickers() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <h3>Picker 1</h3>
      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
      />

      <h3>Picker 2 (Synced)</h3>
      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
      />
    </div>
  );
}
```

### Conditional Rendering

```tsx
function ConditionalExample() {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <button onClick={() => setShowPicker(!showPicker)}>
        {showPicker ? 'Hide' : 'Show'} Picker
      </button>

      {showPicker && (
        <JalaliDatePickerReact
          selectedDate={date}
          onDateSelect={(detail) => setDate(detail.date)}
        />
      )}
    </div>
  );
}
```

### Dynamic Theme Switching

```tsx
function DynamicThemeExample() {
  const [theme, setTheme] = useState('light');
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="glassmorphism">Glassmorphism</option>
      </select>

      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
        theme={theme}
      />
    </div>
  );
}
```

### Locale Switching

```tsx
function LocaleSwitchingExample() {
  const [locale, setLocale] = useState<'fa' | 'en'>('fa');
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <button onClick={() => setLocale(locale === 'fa' ? 'en' : 'fa')}>
        Switch to {locale === 'fa' ? 'English' : 'Persian'}
      </button>

      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
        locale={locale}
      />
    </div>
  );
}
```

## Troubleshooting

### Web Component Not Registered

**Problem**: "jalali-date-picker is not a known element"

**Solution**: Make sure to register the web component before using it:

```tsx
import { JalaliDatePickerElement } from '@jalali-web-component/core';

customElements.define('jalali-date-picker', JalaliDatePickerElement);
```

### Events Not Firing

**Problem**: Event callbacks are not being called

**Solution**: Ensure the event listener is properly attached:

```tsx
<JalaliDatePickerReact
  selectedDate={date}
  onDateSelect={(detail) => {
    console.log('Event fired:', detail);
    setDate(detail.date);
  }}
/>
```

### Ref Not Working

**Problem**: Ref is undefined or not accessible

**Solution**: Use the ref correctly:

```tsx
const pickerRef = useRef<HTMLElement>(null);

<JalaliDatePickerReact ref={pickerRef} />

// Access the element
if (pickerRef.current) {
  const value = (pickerRef.current as any).value;
}
```

### Styling Issues

**Problem**: Styles are not applied correctly

**Solution**: The component uses Shadow DOM for encapsulation. To style the component from outside:

```tsx
<JalaliDatePickerReact
  style={{
    width: '100%',
    maxWidth: '400px',
  }}
/>
```

## API Reference

### JalaliDatePickerReact Component

#### Props

See [Props and Events](#props-and-events) section above.

#### Methods (via ref)

```tsx
const pickerRef = useRef<HTMLElement>(null);

// Get the selected date
const value = (pickerRef.current as any).value;

// Reset the picker
(pickerRef.current as any).reset();

// Open the picker
(pickerRef.current as any).open();

// Close the picker
(pickerRef.current as any).close();

// Set a date
(pickerRef.current as any).setDate(new Date());

// Set a range
(pickerRef.current as any).setRange(new Date(), new Date());

// Add a date (for multiple selection)
(pickerRef.current as any).addDate(new Date());

// Remove a date (for multiple selection)
(pickerRef.current as any).removeDate(new Date());
```

### Types

All TypeScript types are exported from `./types.ts`:

```tsx
import {
  JalaliDatePickerReactProps,
  DateSelectDetail,
  RangeSelectDetail,
  MultipleSelectDetail,
  LocaleChangeDetail,
  ThemeChangeDetail,
  DateValue,
  DateRange,
} from './types';
```

## Examples

See the `App.tsx` file for comprehensive examples including:

1. Single date selection
2. Date range selection
3. Multiple dates selection
4. Form integration
5. Uncontrolled component usage
6. Dynamic theme switching
7. Locale switching

## License

MIT
