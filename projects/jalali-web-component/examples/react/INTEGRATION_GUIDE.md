# Jalali Date Picker - React Integration Guide

## Overview

This guide provides comprehensive information about integrating the Jalali Date Picker Web Component into React applications. The web component is framework-agnostic and works seamlessly with React through a provided wrapper component.

## Architecture

### Web Component vs React Wrapper

The Jalali Date Picker is implemented as a Web Component (Custom Element) that can be used directly in any framework. However, for optimal React integration, we provide a wrapper component (`JalaliDatePickerReact`) that:

1. **Handles React Props**: Converts React props to web component properties
2. **Manages Events**: Bridges web component custom events to React callbacks
3. **Provides TypeScript Support**: Full type safety for React developers
4. **Supports Refs**: Allows direct access to the web component element
5. **Optimizes Re-renders**: Uses `useCallback` and `useEffect` for performance

### Component Hierarchy

```
React App
  ↓
JalaliDatePickerReact (wrapper)
  ↓
jalali-date-picker (web component)
  ↓
Shadow DOM (encapsulated styles and template)
```

## Installation and Setup

### Step 1: Install Dependencies

```bash
npm install @jalali-web-component/core react react-dom
npm install --save-dev @types/react @types/react-dom typescript
```

### Step 2: Register the Web Component

In your application's entry point (e.g., `main.tsx`):

```tsx
import { JalaliDatePickerElement } from '@jalali-web-component/core';

// Register the web component globally
customElements.define('jalali-date-picker', JalaliDatePickerElement);
```

### Step 3: Import the React Wrapper

```tsx
import { JalaliDatePickerReact } from './JalaliDatePickerReact';
```

## Usage Patterns

### Pattern 1: Controlled Component

The most common pattern in React. The parent component controls the date state:

```tsx
import React, { useState } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function MyComponent() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <JalaliDatePickerReact
      selectedDate={date}
      onDateSelect={(detail) => setDate(detail.date)}
    />
  );
}
```

**Advantages:**
- Full control over state
- Easy to validate and transform data
- Predictable behavior
- Easy to test

**Disadvantages:**
- More boilerplate code
- Need to manage state

### Pattern 2: Uncontrolled Component

The web component manages its own state internally:

```tsx
import React, { useRef } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function MyComponent() {
  const pickerRef = useRef<HTMLElement>(null);

  const handleSubmit = () => {
    if (pickerRef.current) {
      const value = (pickerRef.current as any).value;
      console.log('Selected date:', value);
    }
  };

  return (
    <>
      <JalaliDatePickerReact ref={pickerRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

**Advantages:**
- Less boilerplate
- Simpler for simple use cases
- Good for form integration

**Disadvantages:**
- Less control
- Harder to validate
- Harder to test

### Pattern 3: Hybrid Pattern

Combine controlled and uncontrolled patterns:

```tsx
import React, { useState, useRef } from 'react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

function MyComponent() {
  const [date, setDate] = useState<Date | null>(null);
  const pickerRef = useRef<HTMLElement>(null);

  const handleReset = () => {
    setDate(null);
    if (pickerRef.current) {
      (pickerRef.current as any).reset();
    }
  };

  return (
    <>
      <JalaliDatePickerReact
        ref={pickerRef}
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
      />
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
```

## Event Handling

### Single Date Selection

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

### Range Selection

```tsx
<JalaliDatePickerReact
  selectionMode="range"
  onRangeSelect={(detail) => {
    console.log('Start:', detail.range.start);
    console.log('End:', detail.range.end);
  }}
/>
```

### Multiple Dates Selection

```tsx
<JalaliDatePickerReact
  selectionMode="multiple"
  onMultipleSelect={(detail) => {
    console.log('Dates:', detail.dates);
  }}
/>
```

### Locale Changes

```tsx
<JalaliDatePickerReact
  onLocaleChange={(detail) => {
    console.log('New locale:', detail.locale);
  }}
/>
```

### Theme Changes

```tsx
<JalaliDatePickerReact
  onThemeChange={(detail) => {
    console.log('New theme:', detail.theme);
  }}
/>
```

### Error Handling

```tsx
<JalaliDatePickerReact
  onError={(error) => {
    console.error('Error:', error.message);
  }}
/>
```

## State Management

### Using useState

Simple state management for single values:

```tsx
const [date, setDate] = useState<Date | null>(null);
```

### Using useReducer

Complex state management:

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Using Context API

Global state management:

```tsx
const DateContext = React.createContext<Date | null>(null);

function Provider({ children }) {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DateContext.Provider value={date}>
      {children}
    </DateContext.Provider>
  );
}
```

### Using External State Management

With Redux, Zustand, or other libraries:

```tsx
const date = useSelector(state => state.date);
const dispatch = useDispatch();

<JalaliDatePickerReact
  selectedDate={date}
  onDateSelect={(detail) => dispatch(setDate(detail.date))}
/>
```

## Form Integration

### Basic Form

```tsx
function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: null as Date | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.birthDate) {
      alert('Please select a date');
      return;
    }
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />
      <JalaliDatePickerReact
        selectedDate={formData.birthDate}
        onDateSelect={(detail) =>
          setFormData({ ...formData, birthDate: detail.date })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Form with Validation

```tsx
function ValidatedForm() {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState('');

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
    <>
      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={handleDateSelect}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
```

### Form with React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';

function HookFormExample() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      birthDate: null,
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <JalaliDatePickerReact
            selectedDate={field.value}
            onDateSelect={(detail) => field.onChange(detail.date)}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Performance Optimization

### Using useCallback

Memoize event handlers to prevent unnecessary re-renders:

```tsx
const handleDateSelect = useCallback((detail: DateSelectDetail) => {
  setDate(detail.date);
}, []);

<JalaliDatePickerReact onDateSelect={handleDateSelect} />
```

### Using useMemo

Memoize computed values:

```tsx
const formattedDate = useMemo(() => {
  return date?.toLocaleDateString('fa-IR');
}, [date]);
```

### Using React.memo

Memoize the component:

```tsx
const DatePickerWrapper = React.memo(JalaliDatePickerReact);
```

## Accessibility

### ARIA Labels

```tsx
<JalaliDatePickerReact
  aria-label="Select your birth date"
  aria-describedby="birth-date-help"
/>
<p id="birth-date-help">Please select your date of birth</p>
```

### Keyboard Navigation

The component supports:
- Arrow keys for date navigation
- Enter to select
- Escape to close
- Tab for focus management

### Screen Reader Support

The component includes proper semantic HTML and ARIA labels for screen reader compatibility.

## Testing

### Unit Testing

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { JalaliDatePickerReact } from './JalaliDatePickerReact';

describe('JalaliDatePickerReact', () => {
  it('should call onDateSelect when date is selected', async () => {
    const onDateSelect = vi.fn();
    const { container } = render(
      <JalaliDatePickerReact onDateSelect={onDateSelect} />
    );

    const element = container.querySelector('jalali-date-picker');
    const detail = {
      date: new Date(2024, 0, 15),
      jalaliDate: '1402/10/25',
      gregorianDate: '2024/01/15',
      hijriDate: '1445/07/05',
    };

    const event = new CustomEvent('dateSelect', { detail });
    element?.dispatchEvent(event);

    await waitFor(() => {
      expect(onDateSelect).toHaveBeenCalledWith(detail);
    });
  });
});
```

### Integration Testing

```tsx
function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <>
      <JalaliDatePickerReact
        selectedDate={date}
        onDateSelect={(detail) => setDate(detail.date)}
        data-testid="date-picker"
      />
      <p data-testid="selected-date">
        {date?.toLocaleDateString('fa-IR')}
      </p>
    </>
  );
}

describe('App', () => {
  it('should update selected date display', async () => {
    const { getByTestId } = render(<App />);
    const picker = getByTestId('date-picker');
    const display = getByTestId('selected-date');

    // Simulate date selection
    const detail = {
      date: new Date(2024, 0, 15),
      jalaliDate: '1402/10/25',
      gregorianDate: '2024/01/15',
      hijriDate: '1445/07/05',
    };

    const event = new CustomEvent('dateSelect', { detail });
    picker.dispatchEvent(event);

    await waitFor(() => {
      expect(display.textContent).toContain('1402/10/25');
    });
  });
});
```

## Troubleshooting

### Issue: Web Component Not Registered

**Error**: "jalali-date-picker is not a known element"

**Solution**: Ensure the web component is registered before rendering:

```tsx
import { JalaliDatePickerElement } from '@jalali-web-component/core';

customElements.define('jalali-date-picker', JalaliDatePickerElement);
```

### Issue: Events Not Firing

**Error**: Event callbacks are not being called

**Solution**: Check that the event listener is properly attached and the event name is correct:

```tsx
<JalaliDatePickerReact
  onDateSelect={(detail) => {
    console.log('Event fired:', detail);
  }}
/>
```

### Issue: Ref Not Working

**Error**: Ref is undefined

**Solution**: Use the ref correctly with useRef:

```tsx
const pickerRef = useRef<HTMLElement>(null);

<JalaliDatePickerReact ref={pickerRef} />

// Access later
if (pickerRef.current) {
  const value = (pickerRef.current as any).value;
}
```

### Issue: Styling Not Applied

**Problem**: Styles are not applied to the component

**Solution**: The component uses Shadow DOM for encapsulation. Style from outside using:

```tsx
<JalaliDatePickerReact
  style={{
    width: '100%',
    maxWidth: '400px',
  }}
/>
```

## Best Practices

1. **Use Controlled Components**: For most cases, use controlled components for better control and testability.

2. **Memoize Callbacks**: Use `useCallback` for event handlers to prevent unnecessary re-renders.

3. **Handle Errors**: Always provide an `onError` callback to handle errors gracefully.

4. **Validate Input**: Validate dates before passing them to the component.

5. **Use TypeScript**: Leverage TypeScript types for better development experience.

6. **Test Thoroughly**: Write unit and integration tests for your components.

7. **Optimize Performance**: Use `React.memo` and `useMemo` for performance-critical components.

8. **Accessibility**: Always include ARIA labels and ensure keyboard navigation works.

9. **Documentation**: Document your component usage and props.

10. **Keep It Simple**: Don't over-engineer; use the simplest pattern that works for your use case.

## Examples

See the `App.tsx` file for comprehensive examples including:

1. Single date selection
2. Date range selection
3. Multiple dates selection
4. Form integration
5. Uncontrolled component usage
6. Dynamic theme switching
7. Locale switching

## API Reference

### JalaliDatePickerReact Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedDate` | `Date \| null` | `null` | Selected date |
| `onDateSelect` | `(detail: DateSelectDetail) => void` | - | Date select callback |
| `selectedRange` | `DateRange` | - | Selected range |
| `onRangeSelect` | `(detail: RangeSelectDetail) => void` | - | Range select callback |
| `selectedDates` | `Date[]` | - | Selected dates |
| `onMultipleSelect` | `(detail: MultipleSelectDetail) => void` | - | Multiple select callback |
| `calendarType` | `'jalali' \| 'gregorian' \| 'hijri'` | `'jalali'` | Calendar type |
| `locale` | `'fa' \| 'en'` | `'fa'` | Locale |
| `theme` | `string` | `'light'` | Theme |
| `selectionMode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode |
| `disabled` | `boolean` | `false` | Disabled state |
| `onLocaleChange` | `(detail: LocaleChangeDetail) => void` | - | Locale change callback |
| `onThemeChange` | `(detail: ThemeChangeDetail) => void` | - | Theme change callback |
| `onError` | `(error: Error) => void` | - | Error callback |
| `className` | `string` | - | CSS class |
| `style` | `React.CSSProperties` | - | Inline styles |
| `ref` | `React.Ref<HTMLElement>` | - | Element ref |

## License

MIT
