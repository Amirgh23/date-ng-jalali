# State Management Implementation - Task 4.3

## Overview

Implemented comprehensive state management for the Jalali Date Picker Web Component with focus on:
- State synchronization between attributes and properties
- State validation
- Re-render optimization
- Proper error handling

## Key Features Implemented

### 1. State Synchronization (Attribute ↔ Property Sync)

**Bidirectional Synchronization:**
- Properties automatically update attributes when changed
- Attributes automatically update properties when changed
- Ensures consistency between DOM attributes and JavaScript properties

**Synchronized Properties:**
- `selectedDate` - Currently selected date
- `selectedRange` - Date range (start and end)
- `selectedDates` - Multiple selected dates
- `calendarType` - Calendar system (jalali, gregorian, hijri)
- `locale` - Language (fa, en)
- `theme` - Visual theme
- `selectionMode` - Selection mode (single, range, multiple)
- `disabled` - Disabled state

**Implementation Details:**
```typescript
// Property setter with attribute sync
set selectedDate(value: Date | null) {
  if (value && !this.isValidDate(value)) {
    this.emitError('INVALID_DATE', 'Invalid date provided');
    return;
  }
  this._selectedDate = value;
  this.scheduleRender();
}

// Attribute callback with property sync
attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
  if (oldValue === newValue) return;
  
  switch (name) {
    case 'selected-date':
      if (newValue) {
        const date = new Date(newValue);
        if (this.isValidDate(date)) {
          this._selectedDate = date;
        }
      } else {
        this._selectedDate = null;
      }
      break;
    // ... other attributes
  }
}
```

### 2. State Validation

**Comprehensive Validation:**
- Date validation (checks if date is valid)
- Range validation (ensures start ≤ end)
- Calendar type validation (jalali, gregorian, hijri)
- Locale validation (fa, en)
- Theme validation (non-empty string)
- Array validation (all dates in selectedDates are valid)

**Error Handling:**
- Emits error events with code, message, and timestamp
- Prevents invalid state from being set
- Graceful error recovery

**Error Codes:**
- `INVALID_DATE` - Invalid date provided
- `INVALID_RANGE` - Range start is after end
- `INVALID_CALENDAR_TYPE` - Invalid calendar type
- `INVALID_LOCALE` - Invalid locale
- `INVALID_THEME` - Invalid theme
- `INVALID_STATE` - State consistency violation

### 3. Re-render Optimization

**Scheduled Rendering:**
- Uses `requestAnimationFrame` for optimal rendering
- Batches multiple state changes into single render
- Prevents unnecessary renders when state hasn't changed

**State Snapshot Tracking:**
- Maintains snapshot of current state
- Compares snapshots to detect changes
- Only renders when state actually changes

**Implementation:**
```typescript
private scheduleRender(): void {
  if (this.renderScheduled) {
    return;
  }

  this.renderScheduled = true;

  requestAnimationFrame(() => {
    this.renderScheduled = false;

    if (this.hasStateChanged()) {
      this.syncStateWithAttributes();
      this.render();
      this.updateStateSnapshot();
    }
  });
}
```

### 4. State Consistency

**Consistency Checks:**
- `selectedDate` and `value` property stay in sync
- `selectedRange` maintains start ≤ end invariant
- `selectedDates` prevents duplicate dates
- All state changes are validated before application

**Public Methods:**
- `setDate(date)` - Set single date
- `setRange(start, end)` - Set date range (auto-swaps if needed)
- `addDate(date)` - Add to multiple selection (prevents duplicates)
- `removeDate(date)` - Remove from multiple selection
- `reset()` - Clear all selections

### 5. Error Handling

**Error Event Structure:**
```typescript
{
  code: string;        // Error code
  message: string;     // Human-readable message
  timestamp: number;   // When error occurred
}
```

**Error Emission:**
```typescript
element.addEventListener('error', (e: CustomEvent) => {
  console.error(`Error [${e.detail.code}]: ${e.detail.message}`);
});
```

## Test Coverage

**37 Unit Tests Covering:**

1. **State Validation (8 tests)**
   - Invalid date rejection
   - Invalid range validation
   - Invalid calendar type rejection
   - Invalid locale rejection
   - Invalid theme rejection
   - Array validation

2. **State Consistency (2 tests)**
   - Range consistency maintenance
   - Array consistency maintenance

3. **Disabled State (3 tests)**
   - Date selection prevention when disabled
   - Attribute synchronization
   - Attribute removal

4. **Property Getters/Setters (8 tests)**
   - All properties can be get and set
   - Value property returns ISO string
   - Empty value when no date selected

5. **Public Methods (7 tests)**
   - setDate, setRange, addDate, removeDate
   - Date swapping in setRange
   - Reset functionality
   - Attribute removal on reset

6. **Multiple Selection (2 tests)**
   - Duplicate prevention
   - Multiple date addition

7. **Range Selection (2 tests)**
   - Range consistency
   - Null value handling

8. **Attribute Synchronization (1 test)**
   - observedAttributes verification

9. **Error Handling (2 tests)**
   - Error event emission
   - Timestamp inclusion

10. **State Snapshot and Optimization (2 tests)**
    - State change tracking
    - Multiple property changes

## Files Modified/Created

1. **jalali-date-picker.element.ts** - Main web component with state management
2. **state-management.spec.ts** - Comprehensive unit tests (37 tests)
3. **vitest.config.ts** - Updated test configuration

## Performance Improvements

1. **Render Optimization:**
   - Batches state changes using requestAnimationFrame
   - Prevents redundant renders
   - Reduces DOM operations

2. **Memory Management:**
   - Proper cleanup in disconnectedCallback
   - No memory leaks from event listeners
   - Efficient state snapshot tracking

3. **CSS Containment:**
   - Uses `contain: layout style paint` for performance
   - Limits browser reflow/repaint scope

## Usage Examples

### Basic Usage
```typescript
const picker = document.querySelector('jalali-date-picker');

// Set date
picker.selectedDate = new Date(2024, 0, 15);

// Listen for changes
picker.addEventListener('dateSelect', (e) => {
  console.log('Selected:', e.detail.date);
});

// Handle errors
picker.addEventListener('error', (e) => {
  console.error(`Error: ${e.detail.message}`);
});
```

### Range Selection
```typescript
picker.selectionMode = 'range';
picker.setRange(new Date(2024, 0, 1), new Date(2024, 0, 31));

picker.addEventListener('rangeSelect', (e) => {
  console.log('Range:', e.detail.start, 'to', e.detail.end);
});
```

### Multiple Selection
```typescript
picker.selectionMode = 'multiple';
picker.addDate(new Date(2024, 0, 1));
picker.addDate(new Date(2024, 0, 15));

picker.addEventListener('multipleSelect', (e) => {
  console.log('Selected dates:', e.detail.dates);
});
```

### Attribute Synchronization
```html
<jalali-date-picker
  selected-date="2024-01-15T00:00:00.000Z"
  calendar-type="jalali"
  locale="fa"
  theme="dark"
  selection-mode="single"
  disabled>
</jalali-date-picker>
```

## Validation Examples

```typescript
// Invalid date - emits error
picker.selectedDate = new Date('invalid');

// Invalid range - emits error
picker.selectedRange = {
  start: new Date(2024, 0, 15),
  end: new Date(2024, 0, 1)  // start > end
};

// Invalid locale - emits error
picker.locale = 'invalid';

// Valid operations
picker.selectedDate = new Date(2024, 0, 15);  // OK
picker.locale = 'en';  // OK
picker.theme = 'dark';  // OK
```

## Summary

Task 4.3 successfully implements comprehensive state management for the Jalali Date Picker Web Component with:

✅ **State Synchronization** - Bidirectional attribute ↔ property sync
✅ **State Validation** - Comprehensive validation with error handling
✅ **Re-render Optimization** - Batched rendering with state snapshots
✅ **Error Handling** - Proper error events with codes and messages
✅ **Test Coverage** - 37 unit tests covering all functionality
✅ **Performance** - Optimized rendering and memory management

All tests pass successfully (37/37 ✓)
