/**
 * Unit Tests for Vanilla JavaScript Integration
 * Tests for utility functions, state management, and event handling
 */

// Mock Web Component for testing
class MockJalaliDatePickerElement extends HTMLElement {
  constructor() {
    super();
    this._selectedDate = null;
    this._selectedRange = { start: null, end: null };
    this._selectedDates = [];
    this._locale = 'fa';
    this._theme = 'light';
    this._calendarType = 'jalali';
    this._selectionMode = 'single';
    this._disabled = false;
  }

  get selectedDate() {
    return this._selectedDate;
  }

  set selectedDate(value) {
    this._selectedDate = value;
  }

  get selectedRange() {
    return this._selectedRange;
  }

  set selectedRange(value) {
    this._selectedRange = value;
  }

  get selectedDates() {
    return this._selectedDates;
  }

  set selectedDates(value) {
    this._selectedDates = value;
  }

  get locale() {
    return this._locale;
  }

  set locale(value) {
    this._locale = value;
    this.dispatchEvent(new CustomEvent('localeChange', { detail: { locale: value } }));
  }

  get theme() {
    return this._theme;
  }

  set theme(value) {
    this._theme = value;
    this.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: value } }));
  }

  get calendarType() {
    return this._calendarType;
  }

  set calendarType(value) {
    this._calendarType = value;
  }

  get selectionMode() {
    return this._selectionMode;
  }

  set selectionMode(value) {
    this._selectionMode = value;
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = value;
  }

  get value() {
    return this._selectedDate ? this._selectedDate.toISOString() : null;
  }

  setDate(date) {
    this._selectedDate = date;
    this.dispatchEvent(new CustomEvent('dateSelect', {
      detail: {
        date,
        jalaliDate: '1402/10/25',
        gregorianDate: '2024-01-15',
        hijriDate: '1445/07/05'
      }
    }));
  }

  setRange(start, end) {
    this._selectedRange = { start, end };
    this.dispatchEvent(new CustomEvent('rangeSelect', {
      detail: { range: { start, end } }
    }));
  }

  addDate(date) {
    if (!this._selectedDates.some(d => d.getTime() === date.getTime())) {
      this._selectedDates.push(date);
      this.dispatchEvent(new CustomEvent('multipleSelect', {
        detail: { dates: [...this._selectedDates] }
      }));
    }
  }

  removeDate(date) {
    this._selectedDates = this._selectedDates.filter(d => d.getTime() !== date.getTime());
    this.dispatchEvent(new CustomEvent('multipleSelect', {
      detail: { dates: [...this._selectedDates] }
    }));
  }

  reset() {
    this._selectedDate = null;
    this._selectedRange = { start: null, end: null };
    this._selectedDates = [];
  }

  open() {
    // Mock implementation
  }

  close() {
    // Mock implementation
  }
}

// Register mock component
if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', MockJalaliDatePickerElement);
}

// ============================================================================
// Test Suite: Utility Functions
// ============================================================================

describe('Utility Functions', () => {
  describe('formatDate', () => {
    test('should format date in Persian locale', () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date, 'fa');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    test('should format date in English locale', () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date, 'en');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    test('should return "No date selected" for null', () => {
      const result = formatDate(null);
      expect(result).toBe('No date selected');
    });

    test('should handle undefined date', () => {
      const result = formatDate(undefined);
      expect(result).toBe('No date selected');
    });
  });

  describe('daysBetween', () => {
    test('should calculate days between two dates', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 31);
      const result = daysBetween(start, end);
      expect(result).toBe(30);
    });

    test('should return 0 for same date', () => {
      const date = new Date(2024, 0, 15);
      const result = daysBetween(date, date);
      expect(result).toBe(0);
    });

    test('should return 0 if start or end is null', () => {
      const date = new Date(2024, 0, 15);
      expect(daysBetween(null, date)).toBe(0);
      expect(daysBetween(date, null)).toBe(0);
      expect(daysBetween(null, null)).toBe(0);
    });

    test('should handle negative differences', () => {
      const start = new Date(2024, 0, 31);
      const end = new Date(2024, 0, 1);
      const result = daysBetween(start, end);
      expect(result).toBeLessThan(0);
    });
  });

  describe('addDays', () => {
    test('should add days to a date', () => {
      const date = new Date(2024, 0, 1);
      const result = addDays(date, 10);
      expect(result.getDate()).toBe(11);
    });

    test('should handle month overflow', () => {
      const date = new Date(2024, 0, 25);
      const result = addDays(date, 10);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(4);
    });

    test('should handle negative days', () => {
      const date = new Date(2024, 0, 15);
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(10);
    });

    test('should not modify original date', () => {
      const date = new Date(2024, 0, 15);
      const original = date.getTime();
      addDays(date, 10);
      expect(date.getTime()).toBe(original);
    });
  });

  describe('getRandomDate', () => {
    test('should return a date', () => {
      const result = getRandomDate();
      expect(result instanceof Date).toBe(true);
    });

    test('should return date within range', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 31);
      const result = getRandomDate(start, end);

      expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
    });

    test('should use default range if not provided', () => {
      const result = getRandomDate();
      expect(result instanceof Date).toBe(true);
      expect(!isNaN(result.getTime())).toBe(true);
    });
  });
});

// ============================================================================
// Test Suite: State Management
// ============================================================================

describe('State Management', () => {
  beforeEach(() => {
    AppState.locale = 'fa';
    AppState.theme = 'light';
    AppState.calendarType = 'jalali';
    AppState.totalSelections = 0;
    AppState.eventCount = 0;
  });

  test('should initialize with default values', () => {
    expect(AppState.locale).toBe('fa');
    expect(AppState.theme).toBe('light');
    expect(AppState.calendarType).toBe('jalali');
  });

  test('should update state values', () => {
    AppState.update('locale', 'en');
    expect(AppState.locale).toBe('en');
  });

  test('should increment totalSelections on update', () => {
    const initial = AppState.totalSelections;
    AppState.update('locale', 'en');
    expect(AppState.totalSelections).toBe(initial + 1);
  });

  test('should handle multiple updates', () => {
    AppState.update('locale', 'en');
    AppState.update('theme', 'dark');
    AppState.update('calendarType', 'gregorian');

    expect(AppState.locale).toBe('en');
    expect(AppState.theme).toBe('dark');
    expect(AppState.calendarType).toBe('gregorian');
  });
});

// ============================================================================
// Test Suite: Event Logging
// ============================================================================

describe('Event Logging', () => {
  let eventLog;

  beforeEach(() => {
    // Create mock event log
    eventLog = document.createElement('div');
    eventLog.id = 'event-log';
    document.body.appendChild(eventLog);
  });

  afterEach(() => {
    document.body.removeChild(eventLog);
  });

  test('should log events to event log', () => {
    logEvent('test', 'Test message', 'info');
    expect(eventLog.children.length).toBeGreaterThan(0);
  });

  test('should create event log entry with correct class', () => {
    logEvent('test', 'Test message', 'success');
    const entry = eventLog.firstChild;
    expect(entry.classList.contains('event-log-entry')).toBe(true);
    expect(entry.classList.contains('success')).toBe(true);
  });

  test('should include event type in log', () => {
    logEvent('dateSelect', 'Date selected', 'success');
    const entry = eventLog.firstChild;
    expect(entry.textContent).toContain('dateSelect');
  });

  test('should include message in log', () => {
    logEvent('test', 'Test message', 'info');
    const entry = eventLog.firstChild;
    expect(entry.textContent).toContain('Test message');
  });

  test('should limit log entries to 50', () => {
    for (let i = 0; i < 60; i++) {
      logEvent('test', `Message ${i}`, 'info');
    }
    expect(eventLog.children.length).toBeLessThanOrEqual(50);
  });

  test('should increment event count', () => {
    const initial = AppState.eventCount;
    logEvent('test', 'Test', 'info');
    expect(AppState.eventCount).toBe(initial + 1);
  });
});

// ============================================================================
// Test Suite: Web Component Integration
// ============================================================================

describe('Web Component Integration', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    picker.id = 'test-picker';
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should create web component', () => {
    expect(picker instanceof MockJalaliDatePickerElement).toBe(true);
  });

  test('should set and get selectedDate', () => {
    const date = new Date(2024, 0, 15);
    picker.selectedDate = date;
    expect(picker.selectedDate).toEqual(date);
  });

  test('should set and get locale', () => {
    picker.locale = 'en';
    expect(picker.locale).toBe('en');
  });

  test('should set and get theme', () => {
    picker.theme = 'dark';
    expect(picker.theme).toBe('dark');
  });

  test('should set and get calendarType', () => {
    picker.calendarType = 'gregorian';
    expect(picker.calendarType).toBe('gregorian');
  });

  test('should set and get disabled', () => {
    picker.disabled = true;
    expect(picker.disabled).toBe(true);
  });

  test('should return value as ISO string', () => {
    const date = new Date(2024, 0, 15);
    picker.selectedDate = date;
    expect(picker.value).toBe(date.toISOString());
  });

  test('should return null value when no date selected', () => {
    picker.selectedDate = null;
    expect(picker.value).toBeNull();
  });
});

// ============================================================================
// Test Suite: Event Handling
// ============================================================================

describe('Event Handling', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    picker.id = 'test-picker';
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should emit dateSelect event', (done) => {
    picker.addEventListener('dateSelect', (event) => {
      expect(event.detail.date).toBeDefined();
      expect(event.detail.jalaliDate).toBeDefined();
      done();
    });

    picker.setDate(new Date(2024, 0, 15));
  });

  test('should emit rangeSelect event', (done) => {
    picker.addEventListener('rangeSelect', (event) => {
      expect(event.detail.range).toBeDefined();
      expect(event.detail.range.start).toBeDefined();
      expect(event.detail.range.end).toBeDefined();
      done();
    });

    picker.setRange(new Date(2024, 0, 1), new Date(2024, 0, 31));
  });

  test('should emit multipleSelect event', (done) => {
    picker.addEventListener('multipleSelect', (event) => {
      expect(event.detail.dates).toBeDefined();
      expect(Array.isArray(event.detail.dates)).toBe(true);
      done();
    });

    picker.addDate(new Date(2024, 0, 15));
  });

  test('should emit localeChange event', (done) => {
    picker.addEventListener('localeChange', (event) => {
      expect(event.detail.locale).toBe('en');
      done();
    });

    picker.locale = 'en';
  });

  test('should emit themeChange event', (done) => {
    picker.addEventListener('themeChange', (event) => {
      expect(event.detail.theme).toBe('dark');
      done();
    });

    picker.theme = 'dark';
  });
});

// ============================================================================
// Test Suite: Date Selection Modes
// ============================================================================

describe('Date Selection Modes', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should support single date selection', () => {
    picker.selectionMode = 'single';
    const date = new Date(2024, 0, 15);
    picker.setDate(date);
    expect(picker.selectedDate).toEqual(date);
  });

  test('should support range selection', () => {
    picker.selectionMode = 'range';
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 0, 31);
    picker.setRange(start, end);
    expect(picker.selectedRange.start).toEqual(start);
    expect(picker.selectedRange.end).toEqual(end);
  });

  test('should support multiple dates selection', () => {
    picker.selectionMode = 'multiple';
    const date1 = new Date(2024, 0, 15);
    const date2 = new Date(2024, 0, 20);
    picker.addDate(date1);
    picker.addDate(date2);
    expect(picker.selectedDates.length).toBe(2);
  });

  test('should not add duplicate dates in multiple mode', () => {
    picker.selectionMode = 'multiple';
    const date = new Date(2024, 0, 15);
    picker.addDate(date);
    picker.addDate(date);
    expect(picker.selectedDates.length).toBe(1);
  });

  test('should remove date from multiple selection', () => {
    picker.selectionMode = 'multiple';
    const date = new Date(2024, 0, 15);
    picker.addDate(date);
    expect(picker.selectedDates.length).toBe(1);
    picker.removeDate(date);
    expect(picker.selectedDates.length).toBe(0);
  });
});

// ============================================================================
// Test Suite: Picker Methods
// ============================================================================

describe('Picker Methods', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should reset picker', () => {
    picker.setDate(new Date(2024, 0, 15));
    expect(picker.selectedDate).toBeDefined();
    picker.reset();
    expect(picker.selectedDate).toBeNull();
  });

  test('should open picker', () => {
    expect(() => picker.open()).not.toThrow();
  });

  test('should close picker', () => {
    expect(() => picker.close()).not.toThrow();
  });

  test('should set date programmatically', () => {
    const date = new Date(2024, 0, 15);
    picker.setDate(date);
    expect(picker.selectedDate).toEqual(date);
  });

  test('should set range programmatically', () => {
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 0, 31);
    picker.setRange(start, end);
    expect(picker.selectedRange.start).toEqual(start);
    expect(picker.selectedRange.end).toEqual(end);
  });

  test('should add date programmatically', () => {
    picker.selectionMode = 'multiple';
    const date = new Date(2024, 0, 15);
    picker.addDate(date);
    expect(picker.selectedDates).toContain(date);
  });

  test('should remove date programmatically', () => {
    picker.selectionMode = 'multiple';
    const date = new Date(2024, 0, 15);
    picker.addDate(date);
    picker.removeDate(date);
    expect(picker.selectedDates).not.toContain(date);
  });
});

// ============================================================================
// Test Suite: Locale Support
// ============================================================================

describe('Locale Support', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should support Persian locale', () => {
    picker.locale = 'fa';
    expect(picker.locale).toBe('fa');
  });

  test('should support English locale', () => {
    picker.locale = 'en';
    expect(picker.locale).toBe('en');
  });

  test('should emit localeChange event when locale changes', (done) => {
    picker.addEventListener('localeChange', (event) => {
      expect(event.detail.locale).toBe('en');
      done();
    });

    picker.locale = 'en';
  });
});

// ============================================================================
// Test Suite: Theme Support
// ============================================================================

describe('Theme Support', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should support light theme', () => {
    picker.theme = 'light';
    expect(picker.theme).toBe('light');
  });

  test('should support dark theme', () => {
    picker.theme = 'dark';
    expect(picker.theme).toBe('dark');
  });

  test('should emit themeChange event when theme changes', (done) => {
    picker.addEventListener('themeChange', (event) => {
      expect(event.detail.theme).toBe('dark');
      done();
    });

    picker.theme = 'dark';
  });

  test('should support multiple themes', () => {
    const themes = ['light', 'dark', 'glassmorphism', 'gradient', 'minimal'];
    themes.forEach(theme => {
      picker.theme = theme;
      expect(picker.theme).toBe(theme);
    });
  });
});

// ============================================================================
// Test Suite: Calendar Types
// ============================================================================

describe('Calendar Types', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should support Jalali calendar', () => {
    picker.calendarType = 'jalali';
    expect(picker.calendarType).toBe('jalali');
  });

  test('should support Gregorian calendar', () => {
    picker.calendarType = 'gregorian';
    expect(picker.calendarType).toBe('gregorian');
  });

  test('should support Hijri calendar', () => {
    picker.calendarType = 'hijri';
    expect(picker.calendarType).toBe('hijri');
  });
});

// ============================================================================
// Test Suite: Disabled State
// ============================================================================

describe('Disabled State', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should enable picker by default', () => {
    expect(picker.disabled).toBe(false);
  });

  test('should disable picker', () => {
    picker.disabled = true;
    expect(picker.disabled).toBe(true);
  });

  test('should enable disabled picker', () => {
    picker.disabled = true;
    picker.disabled = false;
    expect(picker.disabled).toBe(false);
  });
});

// ============================================================================
// Test Suite: Integration Scenarios
// ============================================================================

describe('Integration Scenarios', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should handle rapid date changes', () => {
    const dates = [
      new Date(2024, 0, 1),
      new Date(2024, 0, 15),
      new Date(2024, 0, 31)
    ];

    dates.forEach(date => {
      picker.setDate(date);
    });

    expect(picker.selectedDate).toEqual(dates[dates.length - 1]);
  });

  test('should handle locale and theme changes together', () => {
    picker.locale = 'en';
    picker.theme = 'dark';

    expect(picker.locale).toBe('en');
    expect(picker.theme).toBe('dark');
  });

  test('should handle reset after multiple selections', () => {
    picker.selectionMode = 'multiple';
    picker.addDate(new Date(2024, 0, 1));
    picker.addDate(new Date(2024, 0, 15));
    picker.addDate(new Date(2024, 0, 31));

    expect(picker.selectedDates.length).toBe(3);

    picker.reset();

    expect(picker.selectedDates.length).toBe(0);
  });

  test('should maintain state across property changes', () => {
    const date = new Date(2024, 0, 15);
    picker.setDate(date);

    picker.locale = 'en';
    picker.theme = 'dark';

    expect(picker.selectedDate).toEqual(date);
  });
});

// ============================================================================
// Test Suite: Edge Cases
// ============================================================================

describe('Edge Cases', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    document.body.appendChild(picker);
  });

  afterEach(() => {
    document.body.removeChild(picker);
  });

  test('should handle null date', () => {
    picker.selectedDate = null;
    expect(picker.selectedDate).toBeNull();
  });

  test('should handle undefined date', () => {
    picker.selectedDate = undefined;
    expect(picker.selectedDate).toBeUndefined();
  });

  test('should handle very old dates', () => {
    const oldDate = new Date(1900, 0, 1);
    picker.setDate(oldDate);
    expect(picker.selectedDate).toEqual(oldDate);
  });

  test('should handle future dates', () => {
    const futureDate = new Date(2100, 0, 1);
    picker.setDate(futureDate);
    expect(picker.selectedDate).toEqual(futureDate);
  });

  test('should handle leap year dates', () => {
    const leapDate = new Date(2024, 1, 29); // Feb 29, 2024
    picker.setDate(leapDate);
    expect(picker.selectedDate).toEqual(leapDate);
  });
});

// ============================================================================
// Export for test runner
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatDate,
    daysBetween,
    addDays,
    getRandomDate,
    logEvent,
    AppState
  };
}
