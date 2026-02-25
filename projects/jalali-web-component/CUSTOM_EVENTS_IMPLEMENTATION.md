# Custom Events Implementation Summary

## Overview
Comprehensive custom event system has been implemented for the Jalali Date Picker Web Component with proper event detail structures, event bubbling, and composition support for Shadow DOM.

## Implemented Events

### 1. dateSelect Event
**When Emitted:** When a single date is selected in 'single' selection mode

**Event Detail Structure:**
```typescript
{
  date: Date,                    // JavaScript Date object
  jalaliDate: string,            // Format: "YYYY/MM/DD"
  gregorianDate: string,         // Format: "YYYY-MM-DD"
  hijriDate: string              // Format: "YYYY/MM/DD"
}
```

**Usage Example:**
```javascript
picker.addEventListener('dateSelect', (e) => {
  console.log('Selected date:', e.detail.date);
  console.log('Jalali:', e.detail.jalaliDate);
  console.log('Gregorian:', e.detail.gregorianDate);
  console.log('Hijri:', e.detail.hijriDate);
});
```

### 2. rangeSelect Event
**When Emitted:** When a date range is selected in 'range' selection mode

**Event Detail Structure:**
```typescript
{
  start: Date,                   // Start date of range
  end: Date,                     // End date of range
  startJalali: string,           // Format: "YYYY/MM/DD"
  endJalali: string              // Format: "YYYY/MM/DD"
}
```

**Usage Example:**
```javascript
picker.addEventListener('rangeSelect', (e) => {
  console.log('Range start:', e.detail.start);
  console.log('Range end:', e.detail.end);
  console.log('Jalali range:', e.detail.startJalali, '-', e.detail.endJalali);
});
```

**Implementation Details:**
- Automatically swaps dates if start is after end
- Emitted when both start and end dates are selected
- Supports programmatic range setting via `setRange()` method

### 3. multipleSelect Event
**When Emitted:** When dates are added/removed in 'multiple' selection mode

**Event Detail Structure:**
```typescript
{
  dates: Date[],                 // Array of selected dates
  count: number,                 // Number of selected dates
  jalaliDates: string[]          // Array of Jalali date strings
}
```

**Usage Example:**
```javascript
picker.addEventListener('multipleSelect', (e) => {
  console.log('Selected dates:', e.detail.dates);
  console.log('Count:', e.detail.count);
  console.log('Jalali dates:', e.detail.jalaliDates);
});
```

### 4. localeChange Event
**When Emitted:** When locale changes (via property, attribute, or method)

**Event Detail Structure:**
```typescript
{
  locale: 'fa' | 'en',           // New locale code
  direction: 'rtl' | 'ltr'       // Text direction for the locale
}
```

**Usage Example:**
```javascript
picker.addEventListener('localeChange', (e) => {
  console.log('Locale changed to:', e.detail.locale);
  console.log('Direction:', e.detail.direction);
});
```

**Triggers:**
- Setting `picker.locale = 'en'`
- Setting `picker.setAttribute('locale', 'en')`
- Changing locale via UI controls

### 5. themeChange Event
**When Emitted:** When theme changes (via property, attribute, or method)

**Event Detail Structure:**
```typescript
{
  theme: string,                 // Theme name
  colors: object                 // CSS variables object with color definitions
}
```

**Usage Example:**
```javascript
picker.addEventListener('themeChange', (e) => {
  console.log('Theme changed to:', e.detail.theme);
  console.log('Colors:', e.detail.colors);
});
```

**Triggers:**
- Setting `picker.theme = 'dark'`
- Setting `picker.setAttribute('theme', 'dark')`
- Changing theme via UI controls

### 6. error Event
**When Emitted:** When an error occurs (invalid date, invalid range, etc.)

**Event Detail Structure:**
```typescript
{
  code: string,                  // Error code (e.g., 'INVALID_DATE')
  message: string,               // Human-readable error message
  timestamp: number              // Unix timestamp when error occurred
}
```

**Usage Example:**
```javascript
picker.addEventListener('error', (e) => {
  console.error(`Error [${e.detail.code}]: ${e.detail.message}`);
  console.log('Occurred at:', new Date(e.detail.timestamp));
});
```

## Event Properties

All custom events have the following properties configured:

| Property | Value | Purpose |
|----------|-------|---------|
| `bubbles` | `true` | Events propagate up the DOM tree |
| `composed` | `true` | Events cross Shadow DOM boundary |
| `cancelable` | `true` | Events can be prevented with `preventDefault()` |

## Implementation Details

### Event Emission Methods

The following private methods handle event emission:

1. **emitDateSelectEvent(date: Date)** - Emits dateSelect event
2. **emitRangeSelectEvent(start: Date, end: Date)** - Emits rangeSelect event
3. **emitMultipleSelectEvent(dates: Date[])** - Emits multipleSelect event
4. **emitLocaleChangeEvent(locale: 'fa' | 'en')** - Emits localeChange event
5. **emitThemeChangeEvent(theme: string)** - Emits themeChange event
6. **emitEvent(eventName: string, detail: any)** - Generic event dispatcher
7. **emitError(code: string, message: string)** - Emits error event

### Integration Points

Events are emitted at the following points:

#### Date Selection
- `selectDate()` method - Emits appropriate event based on selection mode
- `setDate()` method - Emits dateSelect event
- `setRange()` method - Emits rangeSelect event
- `addDate()` method - Emits multipleSelect event
- `removeDate()` method - Emits multipleSelect event

#### Locale Changes
- `locale` property setter - Emits localeChange event
- `attributeChangedCallback()` for 'locale' attribute - Emits localeChange event

#### Theme Changes
- `theme` property setter - Emits themeChange event
- `attributeChangedCallback()` for 'theme' attribute - Emits themeChange event
- Theme selector button click handler - Emits themeChange event

#### Error Handling
- Invalid date validation - Emits error event with 'INVALID_DATE' code
- Invalid range validation - Emits error event with 'INVALID_RANGE' code

## Testing

Comprehensive test suite included in `jalali-date-picker.element.spec.ts`:

### Test Coverage

1. **dateSelect Event Tests**
   - Event emission on date selection
   - All date formats included in detail
   - Event bubbling and composition

2. **rangeSelect Event Tests**
   - Event emission on range selection
   - All range formats included in detail
   - Date swapping when start > end

3. **multipleSelect Event Tests**
   - Event emission on multiple date selection
   - Jalali dates included in detail
   - Multiple event emissions for multiple additions

4. **localeChange Event Tests**
   - Event emission on locale change
   - Direction included in detail
   - Attribute-based locale changes

5. **themeChange Event Tests**
   - Event emission on theme change
   - Colors included in detail
   - Attribute-based theme changes

6. **error Event Tests**
   - Error event emission
   - Timestamp accuracy
   - Error code and message

7. **Event Properties Tests**
   - Bubbles property verification
   - Composed property verification
   - Cancelable property verification

8. **Event Emission Order Tests**
   - Correct event sequence for range selection
   - Multiple events for multiple selections

## Usage Examples

### Single Date Selection
```html
<jalali-date-picker id="picker" selection-mode="single"></jalali-date-picker>

<script>
  const picker = document.getElementById('picker');
  
  picker.addEventListener('dateSelect', (e) => {
    console.log('Selected:', e.detail.jalaliDate);
  });
  
  picker.setDate(new Date());
</script>
```

### Range Selection
```html
<jalali-date-picker id="picker" selection-mode="range"></jalali-date-picker>

<script>
  const picker = document.getElementById('picker');
  
  picker.addEventListener('rangeSelect', (e) => {
    console.log('Range:', e.detail.startJalali, '-', e.detail.endJalali);
  });
  
  picker.setRange(new Date(2024, 0, 1), new Date(2024, 0, 31));
</script>
```

### Multiple Selection
```html
<jalali-date-picker id="picker" selection-mode="multiple"></jalali-date-picker>

<script>
  const picker = document.getElementById('picker');
  
  picker.addEventListener('multipleSelect', (e) => {
    console.log('Selected dates:', e.detail.count);
  });
  
  picker.addDate(new Date(2024, 0, 1));
  picker.addDate(new Date(2024, 0, 15));
</script>
```

### Locale and Theme Changes
```html
<jalali-date-picker id="picker"></jalali-date-picker>

<script>
  const picker = document.getElementById('picker');
  
  picker.addEventListener('localeChange', (e) => {
    console.log('Locale:', e.detail.locale, 'Direction:', e.detail.direction);
  });
  
  picker.addEventListener('themeChange', (e) => {
    console.log('Theme:', e.detail.theme);
  });
  
  picker.locale = 'en';
  picker.theme = 'dark';
</script>
```

### Error Handling
```html
<jalali-date-picker id="picker"></jalali-date-picker>

<script>
  const picker = document.getElementById('picker');
  
  picker.addEventListener('error', (e) => {
    console.error(`Error: ${e.detail.message}`);
  });
  
  // This will trigger an error event
  picker.setDate(new Date('invalid'));
</script>
```

## Browser Compatibility

All custom events are compatible with:
- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+

The `composed: true` property ensures events properly cross Shadow DOM boundaries in all supported browsers.

## Files Modified

1. **jalali-date-picker.element.ts**
   - Added `emitRangeSelectEvent()` method
   - Added `emitLocaleChangeEvent()` method
   - Added `emitThemeChangeEvent()` method
   - Enhanced `emitDateSelectEvent()` with all date formats
   - Enhanced `emitMultipleSelectEvent()` with jalaliDates
   - Enhanced `emitError()` with timestamp
   - Updated `selectDate()` to emit rangeSelect for range mode
   - Updated `locale` setter to emit localeChange
   - Updated `theme` setter to emit themeChange
   - Updated `setRange()` to emit rangeSelect
   - Updated `attributeChangedCallback()` to emit events on attribute changes
   - Updated theme selector button handler to emit themeChange

2. **jalali-date-picker.element.spec.ts** (New)
   - Comprehensive test suite for all custom events
   - 30+ test cases covering all event scenarios
   - Tests for event properties (bubbles, composed, cancelable)
   - Tests for event emission order and timing

## Compliance with Requirements

✅ All 6 custom events implemented
✅ Proper event detail structures with all required fields
✅ Events bubble and are composed for Shadow DOM
✅ Events are cancelable
✅ Comprehensive test coverage
✅ Proper error handling with timestamps
✅ Locale and theme change events integrated
✅ All events properly typed and documented
