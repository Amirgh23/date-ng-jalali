import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - State Management', () => {
  let element: JalaliDatePickerElement;

  beforeEach(() => {
    element = new JalaliDatePickerElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (element && element.parentNode) {
      document.body.removeChild(element);
    }
  });

  describe('State Validation', () => {
    it('should reject invalid date in selectedDate setter', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_DATE');
        done();
      });

      element.selectedDate = new Date('invalid');
    });

    it('should reject invalid range start date', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_DATE');
        done();
      });

      element.selectedRange = {
        start: new Date('invalid'),
        end: new Date(2024, 0, 15),
      };
    });

    it('should reject invalid range end date', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_DATE');
        done();
      });

      element.selectedRange = {
        start: new Date(2024, 0, 1),
        end: new Date('invalid'),
      };
    });

    it('should reject range where start is after end', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_RANGE');
        done();
      });

      element.selectedRange = {
        start: new Date(2024, 0, 15),
        end: new Date(2024, 0, 1),
      };
    });

    it('should reject invalid date in selectedDates array', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_DATE');
        done();
      });

      element.selectedDates = [
        new Date(2024, 0, 1),
        new Date('invalid'),
      ];
    });

    it('should reject invalid calendar type', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_CALENDAR_TYPE');
        done();
      });

      element.calendarType = 'invalid' as any;
    });

    it('should reject invalid locale', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_LOCALE');
        done();
      });

      element.locale = 'invalid' as any;
    });

    it('should reject invalid theme', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBe('INVALID_THEME');
        done();
      });

      element.theme = '';
    });
  });

  describe('State Consistency', () => {
    it('should maintain selectedRange consistency', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 15);

      element.selectedRange = { start, end };

      expect(element.selectedRange.start).toEqual(start);
      expect(element.selectedRange.end).toEqual(end);
    });

    it('should maintain selectedDates array consistency', () => {
      const dates = [
        new Date(2024, 0, 1),
        new Date(2024, 0, 15),
        new Date(2024, 0, 20),
      ];

      element.selectedDates = dates;

      expect(element.selectedDates).toEqual(dates);
      expect(element.selectedDates.length).toBe(3);
    });
  });

  describe('Disabled State', () => {
    it('should allow date selection when enabled', () => {
      element.disabled = false;
      element.selectionMode = 'single';
      const testDate = new Date(2024, 0, 15);

      element.setDate(testDate);

      expect(element.selectedDate).toEqual(testDate);
    });

    it('should set disabled attribute when disabled is true', () => {
      element.disabled = true;

      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should remove disabled attribute when disabled is false', () => {
      element.disabled = true;
      element.disabled = false;

      expect(element.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('Property Getters and Setters', () => {
    it('should get and set selectedDate', () => {
      const testDate = new Date(2024, 0, 15);
      element.selectedDate = testDate;

      expect(element.selectedDate).toEqual(testDate);
    });

    it('should get and set calendarType', () => {
      element.calendarType = 'gregorian';

      expect(element.calendarType).toBe('gregorian');
    });

    it('should get and set locale', () => {
      element.locale = 'en';

      expect(element.locale).toBe('en');
    });

    it('should get and set theme', () => {
      element.theme = 'dark';

      expect(element.theme).toBe('dark');
    });

    it('should get and set selectionMode', () => {
      element.selectionMode = 'range';

      expect(element.selectionMode).toBe('range');
    });

    it('should get and set disabled', () => {
      element.disabled = true;

      expect(element.disabled).toBe(true);
    });

    it('should get value as ISO string', () => {
      const testDate = new Date(2024, 0, 15);
      element.selectedDate = testDate;

      expect(element.value).toBe(testDate.toISOString());
    });

    it('should return empty string for value when no date selected', () => {
      element.selectedDate = null;

      expect(element.value).toBe('');
    });
  });

  describe('Public Methods', () => {
    it('should set date using setDate method', () => {
      const testDate = new Date(2024, 0, 15);
      element.setDate(testDate);

      expect(element.selectedDate).toEqual(testDate);
    });

    it('should set range using setRange method', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 15);

      element.setRange(start, end);

      expect(element.selectedRange.start).toEqual(start);
      expect(element.selectedRange.end).toEqual(end);
    });

    it('should swap dates in setRange if start is after end', () => {
      const start = new Date(2024, 0, 15);
      const end = new Date(2024, 0, 1);

      element.setRange(start, end);

      expect(element.selectedRange.start).toEqual(end);
      expect(element.selectedRange.end).toEqual(start);
    });

    it('should add date using addDate method', () => {
      element.selectionMode = 'multiple';
      const date = new Date(2024, 0, 15);

      element.addDate(date);

      expect(element.selectedDates).toContain(date);
    });

    it('should remove date using removeDate method', () => {
      element.selectionMode = 'multiple';
      const date = new Date(2024, 0, 15);

      element.addDate(date);
      element.removeDate(date);

      expect(element.selectedDates).not.toContain(date);
    });

    it('should reset all state using reset method', () => {
      element.selectedDate = new Date(2024, 0, 15);
      element.selectedRange = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 20),
      };
      element.selectedDates = [new Date(2024, 0, 10)];

      element.reset();

      expect(element.selectedDate).toBeNull();
      expect(element.selectedRange.start).toBeNull();
      expect(element.selectedRange.end).toBeNull();
      expect(element.selectedDates.length).toBe(0);
    });

    it('should remove selected-date attribute when reset', () => {
      element.selectedDate = new Date(2024, 0, 15);
      element.reset();

      expect(element.hasAttribute('selected-date')).toBe(false);
    });
  });

  describe('Multiple Selection', () => {
    it('should not add duplicate dates', () => {
      element.selectionMode = 'multiple';
      const date = new Date(2024, 0, 15);

      element.addDate(date);
      element.addDate(date);

      expect(element.selectedDates.length).toBe(1);
    });

    it('should add multiple different dates', () => {
      element.selectionMode = 'multiple';
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 0, 15);

      element.addDate(date1);
      element.addDate(date2);

      expect(element.selectedDates.length).toBe(2);
      expect(element.selectedDates).toContain(date1);
      expect(element.selectedDates).toContain(date2);
    });
  });

  describe('Range Selection', () => {
    it('should maintain range consistency', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 15);

      element.selectedRange = { start, end };

      expect(element.selectedRange.start).toEqual(start);
      expect(element.selectedRange.end).toEqual(end);
    });

    it('should allow null values in range', () => {
      element.selectedRange = { start: null, end: null };

      expect(element.selectedRange.start).toBeNull();
      expect(element.selectedRange.end).toBeNull();
    });
  });

  describe('Attribute Synchronization', () => {
    it('should handle observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toContain('selected-date');
      expect(observed).toContain('calendar-type');
      expect(observed).toContain('locale');
      expect(observed).toContain('theme');
      expect(observed).toContain('selection-mode');
      expect(observed).toContain('disabled');
    });
  });

  describe('Error Handling', () => {
    it('should emit error event with code and message', (done) => {
      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        expect(event.detail.code).toBeDefined();
        expect(event.detail.message).toBeDefined();
        expect(event.detail.timestamp).toBeDefined();
        expect(typeof event.detail.timestamp).toBe('number');
        done();
      });

      element.selectedDate = new Date('invalid');
    });

    it('should include timestamp in error detail', (done) => {
      const beforeTime = Date.now();

      element.addEventListener('error', (e: Event) => {
        const event = e as CustomEvent;
        const afterTime = Date.now();

        expect(event.detail.timestamp).toBeGreaterThanOrEqual(beforeTime);
        expect(event.detail.timestamp).toBeLessThanOrEqual(afterTime);
        done();
      });

      element.selectedDate = new Date('invalid');
    });
  });

  describe('State Snapshot and Optimization', () => {
    it('should track state changes', (done) => {
      const date1 = new Date(2024, 0, 15);
      element.selectedDate = date1;

      requestAnimationFrame(() => {
        const date2 = new Date(2024, 0, 16);
        element.selectedDate = date2;

        requestAnimationFrame(() => {
          expect(element.selectedDate).toEqual(date2);
          done();
        });
      });
    });

    it('should handle multiple property changes', () => {
      element.selectedDate = new Date(2024, 0, 15);
      element.theme = 'dark';
      element.locale = 'en';
      element.calendarType = 'gregorian';

      expect(element.selectedDate).toEqual(new Date(2024, 0, 15));
      expect(element.theme).toBe('dark');
      expect(element.locale).toBe('en');
      expect(element.calendarType).toBe('gregorian');
    });
  });
});
