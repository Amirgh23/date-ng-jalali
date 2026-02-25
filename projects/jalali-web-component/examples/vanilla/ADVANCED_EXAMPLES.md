# Advanced Examples - Jalali Date Picker Vanilla JavaScript

This document provides advanced usage patterns and real-world scenarios for the Jalali Date Picker Web Component.

## Table of Contents

- [Custom State Management](#custom-state-management)
- [Advanced Event Handling](#advanced-event-handling)
- [Date Validation](#date-validation)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)
- [Integration Patterns](#integration-patterns)
- [Error Handling](#error-handling)

## Custom State Management

### Redux-like State Management

```javascript
// Simple Redux-like state management
class DatePickerStore {
  constructor() {
    this.state = {
      selectedDate: null,
      selectedRange: { start: null, end: null },
      selectedDates: [],
      locale: 'fa',
      theme: 'light',
      calendarType: 'jalali'
    };
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  dispatch(action) {
    switch (action.type) {
      case 'SET_DATE':
        this.state.selectedDate = action.payload;
        break;
      case 'SET_RANGE':
        this.state.selectedRange = action.payload;
        break;
      case 'ADD_DATE':
        this.state.selectedDates.push(action.payload);
        break;
      case 'REMOVE_DATE':
        this.state.selectedDates = this.state.selectedDates.filter(
          d => d.getTime() !== action.payload.getTime()
        );
        break;
      case 'SET_LOCALE':
        this.state.locale = action.payload;
        break;
      case 'SET_THEME':
        this.state.theme = action.payload;
        break;
    }
    this.notifyListeners();
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return { ...this.state };
  }
}

// Usage
const store = new DatePickerStore();

store.subscribe((state) => {
  console.log('State updated:', state);
});

const picker = document.getElementById('my-picker');

picker.addEventListener('dateSelect', (event) => {
  store.dispatch({
    type: 'SET_DATE',
    payload: event.detail.date
  });
});
```

### Observable Pattern

```javascript
// Observable pattern for reactive updates
class DatePickerObservable {
  constructor() {
    this.observers = [];
    this.value = null;
  }

  subscribe(observer) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(o => o !== observer);
    };
  }

  setValue(value) {
    this.value = value;
    this.notifyObservers();
  }

  notifyObservers() {
    this.observers.forEach(observer => observer(this.value));
  }
}

// Usage
const dateObservable = new DatePickerObservable();

dateObservable.subscribe((date) => {
  console.log('Date changed:', date);
  updateUI(date);
});

const picker = document.getElementById('my-picker');

picker.addEventListener('dateSelect', (event) => {
  dateObservable.setValue(event.detail.date);
});
```

## Advanced Event Handling

### Event Debouncing

```javascript
// Debounce rapid events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const picker = document.getElementById('my-picker');

const handleDateSelect = debounce((event) => {
  console.log('Date selected (debounced):', event.detail.date);
  // Perform expensive operation
  saveToServer(event.detail.date);
}, 500);

picker.addEventListener('dateSelect', handleDateSelect);
```

### Event Throttling

```javascript
// Throttle events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const picker = document.getElementById('my-picker');

const handleDateSelect = throttle((event) => {
  console.log('Date selected (throttled):', event.detail.date);
}, 1000);

picker.addEventListener('dateSelect', handleDateSelect);
```

### Event Delegation

```javascript
// Handle events from multiple pickers
const container = document.getElementById('pickers-container');

container.addEventListener('dateSelect', (event) => {
  const picker = event.target;
  console.log('Date selected from picker:', picker.id, event.detail.date);
});

// Works for all jalali-date-picker elements within container
```

## Date Validation

### Custom Validation Rules

```javascript
class DateValidator {
  constructor() {
    this.rules = [];
  }

  addRule(name, validator) {
    this.rules.push({ name, validator });
  }

  validate(date) {
    const errors = [];
    for (const rule of this.rules) {
      if (!rule.validator(date)) {
        errors.push(rule.name);
      }
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Usage
const validator = new DateValidator();

// Add validation rules
validator.addRule('not-past', (date) => date >= new Date());
validator.addRule('not-weekend', (date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
});
validator.addRule('business-hours', (date) => {
  const hour = date.getHours();
  return hour >= 9 && hour <= 17;
});

const picker = document.getElementById('my-picker');

picker.addEventListener('dateSelect', (event) => {
  const result = validator.validate(event.detail.date);
  if (!result.isValid) {
    console.error('Validation failed:', result.errors);
    picker.reset();
  }
});
```

### Range Validation

```javascript
class RangeValidator {
  constructor(minDate, maxDate) {
    this.minDate = minDate;
    this.maxDate = maxDate;
  }

  isValidRange(start, end) {
    return (
      start >= this.minDate &&
      end <= this.maxDate &&
      start <= end
    );
  }

  isValidDate(date) {
    return date >= this.minDate && date <= this.maxDate;
  }
}

// Usage
const today = new Date();
const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
const validator = new RangeValidator(today, nextYear);

const picker = document.getElementById('my-picker');

picker.addEventListener('rangeSelect', (event) => {
  const { range } = event.detail;
  if (!validator.isValidRange(range.start, range.end)) {
    console.error('Invalid range');
    picker.reset();
  }
});
```

## Performance Optimization

### Lazy Loading

```javascript
// Lazy load the web component
async function loadDatePicker() {
  if (!customElements.get('jalali-date-picker')) {
    const script = document.createElement('script');
    script.src = 'jalali-date-picker.js';
    document.head.appendChild(script);
    
    return new Promise((resolve) => {
      script.onload = resolve;
    });
  }
}

// Usage
document.getElementById('load-picker-btn').addEventListener('click', async () => {
  await loadDatePicker();
  const picker = document.createElement('jalali-date-picker');
  document.body.appendChild(picker);
});
```

### Memoization

```javascript
// Memoize date calculations
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Memoized date calculation
const calculateDaysBetween = memoize((start, end) => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((end - start) / msPerDay);
});

// Usage
console.log(calculateDaysBetween(new Date(2024, 0, 1), new Date(2024, 0, 31))); // Calculated
console.log(calculateDaysBetween(new Date(2024, 0, 1), new Date(2024, 0, 31))); // From cache
```

### Virtual Scrolling (for large date lists)

```javascript
class VirtualDateList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleItems = [];
    this.render();
  }

  render() {
    const containerHeight = this.container.clientHeight;
    const scrollTop = this.container.scrollTop;
    
    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.ceil((scrollTop + containerHeight) / this.itemHeight);
    
    this.visibleItems = this.items.slice(startIndex, endIndex);
    
    this.container.innerHTML = this.visibleItems
      .map((item, index) => `
        <div class="date-item" style="transform: translateY(${(startIndex + index) * this.itemHeight}px)">
          ${item.toLocaleDateString('fa-IR')}
        </div>
      `)
      .join('');
  }
}
```

## Accessibility

### ARIA Labels and Roles

```javascript
const picker = document.getElementById('my-picker');

// Add ARIA attributes
picker.setAttribute('role', 'application');
picker.setAttribute('aria-label', 'Date picker');
picker.setAttribute('aria-describedby', 'date-picker-help');

// Add help text
const help = document.createElement('div');
help.id = 'date-picker-help';
help.textContent = 'Select a date using the calendar interface';
help.style.display = 'none';
document.body.appendChild(help);
```

### Keyboard Navigation

```javascript
const picker = document.getElementById('my-picker');

picker.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      // Navigate to previous week
      event.preventDefault();
      navigatePreviousWeek();
      break;
    case 'ArrowDown':
      // Navigate to next week
      event.preventDefault();
      navigateNextWeek();
      break;
    case 'ArrowLeft':
      // Navigate to previous day
      event.preventDefault();
      navigatePreviousDay();
      break;
    case 'ArrowRight':
      // Navigate to next day
      event.preventDefault();
      navigateNextDay();
      break;
    case 'Enter':
      // Select current date
      event.preventDefault();
      selectCurrentDate();
      break;
    case 'Escape':
      // Close picker
      event.preventDefault();
      picker.close();
      break;
  }
});
```

### Focus Management

```javascript
class FocusManager {
  constructor(picker) {
    this.picker = picker;
    this.focusableElements = [];
  }

  trapFocus(event) {
    const focusableElements = this.picker.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  enable() {
    this.picker.addEventListener('keydown', (e) => this.trapFocus(e));
  }
}

// Usage
const focusManager = new FocusManager(picker);
focusManager.enable();
```

## Integration Patterns

### With Form Validation

```javascript
class FormWithDatePicker {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.picker = this.form.querySelector('jalali-date-picker');
    this.errors = {};
    this.setupValidation();
  }

  setupValidation() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate();
      if (Object.keys(this.errors).length === 0) {
        this.submit();
      }
    });
  }

  validate() {
    this.errors = {};

    // Validate date picker
    if (!this.picker.selectedDate) {
      this.errors.date = 'Date is required';
    }

    this.displayErrors();
  }

  displayErrors() {
    const errorContainer = this.form.querySelector('.errors');
    if (errorContainer) {
      errorContainer.innerHTML = Object.values(this.errors)
        .map(error => `<p class="error">${error}</p>`)
        .join('');
    }
  }

  submit() {
    const formData = new FormData(this.form);
    formData.append('date', this.picker.selectedDate.toISOString());
    
    fetch('/api/submit', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  }
}

// Usage
const form = new FormWithDatePicker('my-form');
```

### With Local Storage

```javascript
class PersistentDatePicker {
  constructor(pickerId, storageKey) {
    this.picker = document.getElementById(pickerId);
    this.storageKey = storageKey;
    this.loadFromStorage();
    this.setupAutoSave();
  }

  loadFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const date = new Date(stored);
        this.picker.setDate(date);
      } catch (e) {
        console.error('Failed to load date from storage:', e);
      }
    }
  }

  setupAutoSave() {
    this.picker.addEventListener('dateSelect', (event) => {
      localStorage.setItem(this.storageKey, event.detail.date.toISOString());
    });
  }

  clear() {
    localStorage.removeItem(this.storageKey);
    this.picker.reset();
  }
}

// Usage
const persistent = new PersistentDatePicker('my-picker', 'selected-date');
```

### With API Integration

```javascript
class APIDatePicker {
  constructor(pickerId, apiEndpoint) {
    this.picker = document.getElementById(pickerId);
    this.apiEndpoint = apiEndpoint;
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.picker.addEventListener('dateSelect', (event) => {
      this.sendToAPI(event.detail.date);
    });
  }

  async sendToAPI(date) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: date.toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      console.error('Failed to send date to API:', error);
    }
  }
}

// Usage
const apiPicker = new APIDatePicker('my-picker', '/api/dates');
```

## Error Handling

### Comprehensive Error Handling

```javascript
class SafeDatePicker {
  constructor(pickerId) {
    this.picker = document.getElementById(pickerId);
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.picker.addEventListener('dateSelect', (event) => {
      try {
        this.handleDateSelect(event);
      } catch (error) {
        this.handleError(error);
      }
    });
  }

  handleDateSelect(event) {
    const { date } = event.detail;

    if (!(date instanceof Date)) {
      throw new Error('Invalid date object');
    }

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date value');
    }

    // Process date
    console.log('Date processed:', date);
  }

  handleError(error) {
    console.error('Error:', error.message);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = 'An error occurred while processing the date';
    document.body.appendChild(errorDiv);

    // Auto-remove error message after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Usage
const safePicker = new SafeDatePicker('my-picker');
```

### Retry Logic

```javascript
class RetryableDatePicker {
  constructor(pickerId, maxRetries = 3) {
    this.picker = document.getElementById(pickerId);
    this.maxRetries = maxRetries;
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.picker.addEventListener('dateSelect', (event) => {
      this.processWithRetry(event.detail.date, 0);
    });
  }

  async processWithRetry(date, attempt) {
    try {
      await this.processDate(date);
    } catch (error) {
      if (attempt < this.maxRetries) {
        console.log(`Retry attempt ${attempt + 1}/${this.maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        return this.processWithRetry(date, attempt + 1);
      } else {
        console.error('Max retries exceeded:', error);
      }
    }
  }

  async processDate(date) {
    // Simulate async operation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(date);
        } else {
          reject(new Error('Processing failed'));
        }
      }, 1000);
    });
  }
}

// Usage
const retryablePicker = new RetryableDatePicker('my-picker');
```

---

These advanced patterns demonstrate how to build sophisticated applications with the Jalali Date Picker Web Component in vanilla JavaScript.
