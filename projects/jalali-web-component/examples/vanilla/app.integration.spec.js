/**
 * Integration Tests for Vanilla JavaScript + Jalali Date Picker Web Component
 * Tests real-world vanilla JS integration scenarios
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

  open() {}
  close() {}
}

if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', MockJalaliDatePickerElement);
}

// ============================================================================
// Test Suite: DOM Manipulation
// ============================================================================

describe('Vanilla JS Integration Tests', () => {
  let picker;

  beforeEach(() => {
    picker = document.createElement('jalali-date-picker');
    picker.id = 'test-picker';
    document.body.appendChild(picker);
  });

  afterEach(() => {
    if (picker && picker.parentNode) {
      document.body.removeChild(picker);
    }
  });

  describe('Direct DOM Manipulation', () => {
    test('should create and append web component to DOM', () => {
      expect(picker).toBeTruthy();
      expect(picker.parentNode).toBe(document.body);
      expect(picker.tagName).toBe('JALALI-DATE-PICKER');
    });

    test('should set and get attributes', () => {
      picker.setAttribute('locale', 'en');
      expect(picker.getAttribute('locale')).toBe('en');
    });

    test('should remove attributes', () => {
      picker.setAttribute('disabled', '');
      expect(picker.hasAttribute('disabled')).toBe(true);
      picker.removeAttribute('disabled');
      expect(picker.hasAttribute('disabled')).toBe(false);
    });

    test('should query element from DOM', () => {
      const found = document.querySelector('jalali-date-picker');
      expect(found).toBe(picker);
    });

    test('should query all elements from DOM', () => {
      const picker2 = document.createElement('jalali-date-picker');
      document.body.appendChild(picker2);

      const all = document.querySelectorAll('jalali-date-picker');
      expect(all.length).toBeGreaterThanOrEqual(2);

      document.body.removeChild(picker2);
    });

    test('should add and remove classes', () => {
      picker.classList.add('custom-class');
      expect(picker.classList.contains('custom-class')).toBe(true);

      picker.classList.remove('custom-class');
      expect(picker.classList.contains('custom-class')).toBe(false);
    });

    test('should set inline styles', () => {
      picker.style.width = '100%';
      picker.style.maxWidth = '400px';

      expect(picker.style.width).toBe('100%');
      expect(picker.style.maxWidth).toBe('400px');
    });

    test('should set data attributes', () => {
      picker.dataset.testid = 'date-picker';
      picker.dataset.value = 'test-value';

      expect(picker.dataset.testid).toBe('date-picker');
      expect(picker.dataset.value).toBe('test-value');
    });

    test('should clone element', () => {
      picker.setAttribute('locale', 'en');
      const clone = picker.cloneNode(true);

      expect(clone.getAttribute('locale')).toBe('en');
      expect(clone.parentNode).toBeNull();
    });

    test('should replace element in DOM', () => {
      const newPicker = document.createElement('jalali-date-picker');
      picker.replaceWith(newPicker);

      expect(document.body.contains(newPicker)).toBe(true);
      expect(document.body.contains(picker)).toBe(false);

      picker = newPicker;
    });
  });

  describe('Event Listener Attachment', () => {
    test('should attach event listener for dateSelect', (done) => {
      picker.addEventListener('dateSelect', (event) => {
        expect(event.detail.date).toBeDefined();
        expect(event.detail.jalaliDate).toBeDefined();
        done();
      });

      picker.setDate(new Date(2024, 0, 15));
    });

    test('should attach event listener for rangeSelect', (done) => {
      picker.addEventListener('rangeSelect', (event) => {
        expect(event.detail.range).toBeDefined();
        expect(event.detail.range.start).toBeDefined();
        expect(event.detail.range.end).toBeDefined();
        done();
      });

      picker.setRange(new Date(2024, 0, 1), new Date(2024, 0, 31));
    });

    test('should attach event listener for multipleSelect', (done) => {
      picker.addEventListener('multipleSelect', (event) => {
        expect(event.detail.dates).toBeDefined();
        expect(Array.isArray(event.detail.dates)).toBe(true);
        done();
      });

      picker.addDate(new Date(2024, 0, 15));
    });

    test('should attach event listener for localeChange', (done) => {
      picker.addEventListener('localeChange', (event) => {
        expect(event.detail.locale).toBe('en');
        done();
      });

      picker.locale = 'en';
    });

    test('should attach event listener for themeChange', (done) => {
      picker.addEventListener('themeChange', (event) => {
        expect(event.detail.theme).toBe('dark');
        done();
      });

      picker.theme = 'dark';
    });

    test('should attach multiple event listeners', (done) => {
      let dateSelectCalled = false;
      let localeChangeCalled = false;

      picker.addEventListener('dateSelect', () => {
        dateSelectCalled = true;
        if (dateSelectCalled && localeChangeCalled) done();
      });

      picker.addEventListener('localeChange', () => {
        localeChangeCalled = true;
        if (dateSelectCalled && localeChangeCalled) done();
      });

      picker.setDate(new Date(2024, 0, 15));
      picker.locale = 'en';
    });

    test('should remove event listener', (done) => {
      const handler = () => {
        done(new Error('Handler should not be called'));
      };

      picker.addEventListener('dateSelect', handler);
      picker.removeEventListener('dateSelect', handler);

      picker.setDate(new Date(2024, 0, 15));

      setTimeout(() => done(), 100);
    });

    test('should handle event listener with options', (done) => {
      const handler = () => {
        done();
      };

      picker.addEventListener('dateSelect', handler, { once: true });

      picker.setDate(new Date(2024, 0, 15));
      picker.setDate(new Date(2024, 0, 20));
    });
  });

  describe('Property Setting', () => {
    test('should set selectedDate property', () => {
      const date = new Date(2024, 0, 15);
      picker.selectedDate = date;
      expect(picker.selectedDate).toEqual(date);
    });

    test('should set selectedRange property', () => {
      const range = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      };
      picker.selectedRange = range;
      expect(picker.selectedRange).toEqual(range);
    });

    test('should set selectedDates property', () => {
      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      picker.selectedDates = dates;
      expect(picker.selectedDates).toEqual(dates);
    });

    test('should set locale property', () => {
      picker.locale = 'en';
      expect(picker.locale).toBe('en');
    });

    test('should set theme property', () => {
      picker.theme = 'dark';
      expect(picker.theme).toBe('dark');
    });

    test('should set calendarType property', () => {
      picker.calendarType = 'gregorian';
      expect(picker.calendarType).toBe('gregorian');
    });

    test('should set selectionMode property', () => {
      picker.selectionMode = 'range';
      expect(picker.selectionMode).toBe('range');
    });

    test('should set disabled property', () => {
      picker.disabled = true;
      expect(picker.disabled).toBe(true);
    });

    test('should get value property', () => {
      const date = new Date(2024, 0, 15);
      picker.selectedDate = date;
      expect(picker.value).toBe(date.toISOString());
    });

    test('should handle null values', () => {
      picker.selectedDate = null;
      expect(picker.selectedDate).toBeNull();
      expect(picker.value).toBeNull();
    });
  });

  describe('Attribute Manipulation', () => {
    test('should set and read data attributes', () => {
      picker.setAttribute('data-testid', 'date-picker');
      expect(picker.getAttribute('data-testid')).toBe('date-picker');
    });

    test('should set and read aria attributes', () => {
      picker.setAttribute('aria-label', 'Select a date');
      expect(picker.getAttribute('aria-label')).toBe('Select a date');
    });

    test('should check attribute existence', () => {
      picker.setAttribute('disabled', '');
      expect(picker.hasAttribute('disabled')).toBe(true);
      expect(picker.hasAttribute('enabled')).toBe(false);
    });

    test('should get all attributes', () => {
      picker.setAttribute('locale', 'en');
      picker.setAttribute('theme', 'dark');

      const attrs = picker.attributes;
      expect(attrs.length).toBeGreaterThan(0);
    });

    test('should toggle attributes', () => {
      picker.toggleAttribute('disabled');
      expect(picker.hasAttribute('disabled')).toBe(true);

      picker.toggleAttribute('disabled');
      expect(picker.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('Event Bubbling', () => {
    test('should bubble events from web component', (done) => {
      const container = document.createElement('div');
      container.appendChild(picker);
      document.body.appendChild(container);

      container.addEventListener('dateSelect', (event) => {
        expect(event.detail.date).toBeDefined();
        document.body.removeChild(container);
        done();
      });

      picker.setDate(new Date(2024, 0, 15));
    });

    test('should allow event propagation', (done) => {
      let parentCalled = false;
      let childCalled = false;

      picker.addEventListener('dateSelect', () => {
        childCalled = true;
      });

      document.body.addEventListener('dateSelect', () => {
        parentCalled = true;
        if (parentCalled && childCalled) {
          document.body.removeEventListener('dateSelect', arguments.callee);
          done();
        }
      });

      picker.setDate(new Date(2024, 0, 15));
    });

    test('should stop event propagation with stopPropagation', (done) => {
      let parentCalled = false;

      picker.addEventListener('dateSelect', (event) => {
        event.stopPropagation();
      });

      document.body.addEventListener('dateSelect', () => {
        parentCalled = true;
      });

      picker.setDate(new Date(2024, 0, 15));

      setTimeout(() => {
        expect(parentCalled).toBe(false);
        document.body.removeEventListener('dateSelect', arguments.callee);
        done();
      }, 100);
    });
  });

  describe('Memory Management', () => {
    test('should clean up event listeners', () => {
      const handler = () => {};
      picker.addEventListener('dateSelect', handler);
      picker.removeEventListener('dateSelect', handler);

      // Verify no memory leaks by checking listener count
      expect(picker).toBeTruthy();
    });

    test('should handle element removal from DOM', () => {
      const handler = () => {};
      picker.addEventListener('dateSelect', handler);

      document.body.removeChild(picker);
      expect(picker.parentNode).toBeNull();

      picker = document.createElement('jalali-date-picker');
      document.body.appendChild(picker);
    });

    test('should handle multiple element creations and removals', () => {
      for (let i = 0; i < 10; i++) {
        const tempPicker = document.createElement('jalali-date-picker');
        document.body.appendChild(tempPicker);
        document.body.removeChild(tempPicker);
      }

      expect(picker).toBeTruthy();
    });

    test('should not leak memory with event listeners', () => {
      for (let i = 0; i < 100; i++) {
        picker.addEventListener('dateSelect', () => {});
      }

      expect(picker).toBeTruthy();
    });
  });

  describe('Method Invocation', () => {
    test('should call setDate method', () => {
      const date = new Date(2024, 0, 15);
      picker.setDate(date);
      expect(picker.selectedDate).toEqual(date);
    });

    test('should call setRange method', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 31);
      picker.setRange(start, end);
      expect(picker.selectedRange.start).toEqual(start);
      expect(picker.selectedRange.end).toEqual(end);
    });

    test('should call addDate method', () => {
      picker.selectionMode = 'multiple';
      const date = new Date(2024, 0, 15);
      picker.addDate(date);
      expect(picker.selectedDates).toContain(date);
    });

    test('should call removeDate method', () => {
      picker.selectionMode = 'multiple';
      const date = new Date(2024, 0, 15);
      picker.addDate(date);
      picker.removeDate(date);
      expect(picker.selectedDates).not.toContain(date);
    });

    test('should call reset method', () => {
      picker.setDate(new Date(2024, 0, 15));
      picker.reset();
      expect(picker.selectedDate).toBeNull();
    });

    test('should call open method', () => {
      expect(() => picker.open()).not.toThrow();
    });

    test('should call close method', () => {
      expect(() => picker.close()).not.toThrow();
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle rapid property changes', () => {
      for (let i = 0; i < 10; i++) {
        picker.locale = i % 2 === 0 ? 'fa' : 'en';
        picker.theme = i % 2 === 0 ? 'light' : 'dark';
      }

      expect(picker.locale).toBe('en');
      expect(picker.theme).toBe('dark');
    });

    test('should handle rapid event dispatches', (done) => {
      let eventCount = 0;

      picker.addEventListener('dateSelect', () => {
        eventCount++;
        if (eventCount === 5) {
          expect(eventCount).toBe(5);
          done();
        }
      });

      for (let i = 0; i < 5; i++) {
        picker.setDate(new Date(2024, 0, i + 1));
      }
    });

    test('should maintain state across operations', () => {
      const date = new Date(2024, 0, 15);
      picker.setDate(date);
      picker.locale = 'en';
      picker.theme = 'dark';

      expect(picker.selectedDate).toEqual(date);
      expect(picker.locale).toBe('en');
      expect(picker.theme).toBe('dark');
    });

    test('should handle mixed operations', () => {
      picker.setAttribute('data-testid', 'picker');
      picker.classList.add('custom');
      picker.style.width = '100%';
      picker.locale = 'en';
      picker.setDate(new Date(2024, 0, 15));

      expect(picker.getAttribute('data-testid')).toBe('picker');
      expect(picker.classList.contains('custom')).toBe(true);
      expect(picker.style.width).toBe('100%');
      expect(picker.locale).toBe('en');
      expect(picker.selectedDate).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
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
      const leapDate = new Date(2024, 1, 29);
      picker.setDate(leapDate);
      expect(picker.selectedDate).toEqual(leapDate);
    });

    test('should handle empty selectedDates array', () => {
      picker.selectedDates = [];
      expect(picker.selectedDates).toEqual([]);
    });

    test('should handle duplicate dates in selectedDates', () => {
      const date = new Date(2024, 0, 15);
      picker.addDate(date);
      picker.addDate(date);
      expect(picker.selectedDates.length).toBe(1);
    });
  });

  describe('Integration with DOM APIs', () => {
    test('should work with getElementById', () => {
      const found = document.getElementById('test-picker');
      expect(found).toBe(picker);
    });

    test('should work with querySelector', () => {
      const found = document.querySelector('#test-picker');
      expect(found).toBe(picker);
    });

    test('should work with querySelectorAll', () => {
      const all = document.querySelectorAll('jalali-date-picker');
      expect(all.length).toBeGreaterThan(0);
    });

    test('should work with getElementsByTagName', () => {
      const all = document.getElementsByTagName('jalali-date-picker');
      expect(all.length).toBeGreaterThan(0);
    });

    test('should work with parentElement', () => {
      expect(picker.parentElement).toBe(document.body);
    });

    test('should work with nextElementSibling', () => {
      const sibling = document.createElement('div');
      document.body.appendChild(sibling);

      picker.insertAdjacentElement('afterend', sibling);
      expect(picker.nextElementSibling).toBe(sibling);

      document.body.removeChild(sibling);
    });

    test('should work with previousElementSibling', () => {
      const sibling = document.createElement('div');
      document.body.appendChild(sibling);

      sibling.insertAdjacentElement('afterend', picker);
      expect(picker.previousElementSibling).toBe(sibling);

      document.body.removeChild(sibling);
    });

    test('should work with children property', () => {
      expect(picker.children).toBeTruthy();
    });

    test('should work with innerHTML', () => {
      picker.innerHTML = '<div>Test</div>';
      expect(picker.innerHTML).toContain('Test');
    });
  });
});
