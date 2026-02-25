import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - Property Tests', () => {
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

  describe('selectedDate Property', () => {
    it('should get selectedDate', () => {
      const date = new Date(2024, 0, 15);
      element.selectedDate = date;

      expect(element.selectedDate).toEqual(date);
    });

    it('should set selectedDate', () => {
      const date = new Date(2024, 0, 15);
      element.selectedDate = date;

      expect(element.selectedDate).toEqual(date);
    });

    it('should update attribute when selectedDate is set', () => {
      const date = new Date(2024, 0, 15);
      element.selectedDate = date;

      expect(element.getAttribute('selected-date')).toBe(date.toISOString());
    });

    it('should remove attribute when selectedDate is set to null', () => {
      element.selectedDate = new Date(2024, 0, 15);
      element.selectedDate = null;

      expect(element.getAttribute('selected-date')).toBeNull();
    });

    it('should initialize as null', () => {
      expect(element.selectedDate).toBeNull();
    });

    it('should handle different date formats', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date('2024-01-15');

      element.selectedDate = date1;
      expect(element.selectedDate?.getTime()).toBe(date1.getTime());
    });

    it('should trigger re-render when selectedDate changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.selectedDate = new Date(2024, 0, 15);

      expect(renderSpy).toHaveBeenCalled();
    });

    it('should maintain selectedDate across attribute changes', () => {
      const date = new Date(2024, 0, 15);
      element.selectedDate = date;
      element.locale = 'en';

      expect(element.selectedDate).toEqual(date);
    });
  });

  describe('selectedRange Property', () => {
    it('should get selectedRange', () => {
      const range = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      };
      element.selectedRange = range;

      expect(element.selectedRange).toEqual(range);
    });

    it('should set selectedRange', () => {
      const range = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      };
      element.selectedRange = range;

      expect(element.selectedRange.start).toEqual(range.start);
      expect(element.selectedRange.end).toEqual(range.end);
    });

    it('should initialize with null values', () => {
      expect(element.selectedRange.start).toBeNull();
      expect(element.selectedRange.end).toBeNull();
    });

    it('should handle range with null start', () => {
      const range = {
        start: null,
        end: new Date(2024, 0, 31),
      };
      element.selectedRange = range;

      expect(element.selectedRange.start).toBeNull();
      expect(element.selectedRange.end).toEqual(range.end);
    });

    it('should handle range with null end', () => {
      const range = {
        start: new Date(2024, 0, 1),
        end: null,
      };
      element.selectedRange = range;

      expect(element.selectedRange.start).toEqual(range.start);
      expect(element.selectedRange.end).toBeNull();
    });

    it('should trigger re-render when selectedRange changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.selectedRange = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      };

      expect(renderSpy).toHaveBeenCalled();
    });
  });

  describe('selectedDates Property', () => {
    it('should get selectedDates', () => {
      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      element.selectedDates = dates;

      expect(element.selectedDates).toEqual(dates);
    });

    it('should set selectedDates', () => {
      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      element.selectedDates = dates;

      expect(element.selectedDates.length).toBe(2);
    });

    it('should initialize as empty array', () => {
      expect(element.selectedDates).toEqual([]);
    });

    it('should handle multiple dates', () => {
      const dates = [
        new Date(2024, 0, 1),
        new Date(2024, 0, 15),
        new Date(2024, 0, 31),
      ];
      element.selectedDates = dates;

      expect(element.selectedDates.length).toBe(3);
    });

    it('should trigger re-render when selectedDates changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.selectedDates = [new Date(2024, 0, 1)];

      expect(renderSpy).toHaveBeenCalled();
    });

    it('should maintain order of dates', () => {
      const dates = [
        new Date(2024, 0, 31),
        new Date(2024, 0, 1),
        new Date(2024, 0, 15),
      ];
      element.selectedDates = dates;

      expect(element.selectedDates[0]).toEqual(dates[0]);
      expect(element.selectedDates[1]).toEqual(dates[1]);
      expect(element.selectedDates[2]).toEqual(dates[2]);
    });
  });

  describe('calendarType Property', () => {
    it('should get calendarType', () => {
      element.calendarType = 'gregorian';

      expect(element.calendarType).toBe('gregorian');
    });

    it('should set calendarType to jalali', () => {
      element.calendarType = 'jalali';

      expect(element.calendarType).toBe('jalali');
    });

    it('should set calendarType to gregorian', () => {
      element.calendarType = 'gregorian';

      expect(element.calendarType).toBe('gregorian');
    });

    it('should set calendarType to hijri', () => {
      element.calendarType = 'hijri';

      expect(element.calendarType).toBe('hijri');
    });

    it('should initialize as jalali', () => {
      expect(element.calendarType).toBe('jalali');
    });

    it('should update attribute when calendarType changes', () => {
      element.calendarType = 'gregorian';

      expect(element.getAttribute('calendar-type')).toBe('gregorian');
    });

    it('should trigger re-render when calendarType changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.calendarType = 'gregorian';

      expect(renderSpy).toHaveBeenCalled();
    });
  });

  describe('locale Property', () => {
    it('should get locale', () => {
      element.locale = 'en';

      expect(element.locale).toBe('en');
    });

    it('should set locale to fa', () => {
      element.locale = 'fa';

      expect(element.locale).toBe('fa');
    });

    it('should set locale to en', () => {
      element.locale = 'en';

      expect(element.locale).toBe('en');
    });

    it('should initialize as fa', () => {
      expect(element.locale).toBe('fa');
    });

    it('should update attribute when locale changes', () => {
      element.locale = 'en';

      expect(element.getAttribute('locale')).toBe('en');
    });

    it('should update direction attribute based on locale', () => {
      element.locale = 'fa';
      expect(element.getAttribute('dir')).toBe('rtl');

      element.locale = 'en';
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should emit localeChange event when locale changes', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.locale).toBe('en');
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should trigger re-render when locale changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.locale = 'en';

      expect(renderSpy).toHaveBeenCalled();
    });
  });

  describe('theme Property', () => {
    it('should get theme', () => {
      element.theme = 'dark';

      expect(element.theme).toBe('dark');
    });

    it('should set theme', () => {
      element.theme = 'dark';

      expect(element.theme).toBe('dark');
    });

    it('should initialize as light', () => {
      expect(element.theme).toBe('light');
    });

    it('should update attribute when theme changes', () => {
      element.theme = 'dark';

      expect(element.getAttribute('theme')).toBe('dark');
    });

    it('should emit themeChange event when theme changes', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('themeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.theme).toBe('dark');
          resolve();
        });

        element.theme = 'dark';
      });
    });

    it('should trigger re-render when theme changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.theme = 'dark';

      expect(renderSpy).toHaveBeenCalled();
    });

    it('should support multiple themes', () => {
      const themes = ['light', 'dark', 'glassmorphism'];

      themes.forEach((theme) => {
        element.theme = theme;
        expect(element.theme).toBe(theme);
      });
    });
  });

  describe('selectionMode Property', () => {
    it('should get selectionMode', () => {
      element.selectionMode = 'range';

      expect(element.selectionMode).toBe('range');
    });

    it('should set selectionMode to single', () => {
      element.selectionMode = 'single';

      expect(element.selectionMode).toBe('single');
    });

    it('should set selectionMode to range', () => {
      element.selectionMode = 'range';

      expect(element.selectionMode).toBe('range');
    });

    it('should set selectionMode to multiple', () => {
      element.selectionMode = 'multiple';

      expect(element.selectionMode).toBe('multiple');
    });

    it('should initialize as single', () => {
      expect(element.selectionMode).toBe('single');
    });

    it('should update attribute when selectionMode changes', () => {
      element.selectionMode = 'range';

      expect(element.getAttribute('selection-mode')).toBe('range');
    });

    it('should trigger re-render when selectionMode changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.selectionMode = 'range';

      expect(renderSpy).toHaveBeenCalled();
    });
  });

  describe('disabled Property', () => {
    it('should get disabled state', () => {
      element.disabled = true;

      expect(element.disabled).toBe(true);
    });

    it('should set disabled to true', () => {
      element.disabled = true;

      expect(element.disabled).toBe(true);
    });

    it('should set disabled to false', () => {
      element.disabled = false;

      expect(element.disabled).toBe(false);
    });

    it('should initialize as false', () => {
      expect(element.disabled).toBe(false);
    });

    it('should add disabled attribute when set to true', () => {
      element.disabled = true;

      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should remove disabled attribute when set to false', () => {
      element.disabled = true;
      element.disabled = false;

      expect(element.hasAttribute('disabled')).toBe(false);
    });

    it('should trigger re-render when disabled changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.disabled = true;

      expect(renderSpy).toHaveBeenCalled();
    });

    it('should prevent date selection when disabled', () => {
      element.disabled = true;
      const errorListener = vi.fn();

      element.addEventListener('error', errorListener);

      // Try to select a date
      (element as any).selectDate(new Date(2024, 0, 15));

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(element.selectedDate).toBeNull();
          resolve();
        }, 100);
      });
    });
  });

  describe('value Property (Read-only)', () => {
    it('should return ISO string of selectedDate', () => {
      const date = new Date(2024, 0, 15);
      element.selectedDate = date;

      expect(element.value).toBe(date.toISOString());
    });

    it('should return empty string when no date selected', () => {
      expect(element.value).toBe('');
    });

    it('should update when selectedDate changes', () => {
      const date1 = new Date(2024, 0, 15);
      element.selectedDate = date1;
      const value1 = element.value;

      const date2 = new Date(2024, 0, 20);
      element.selectedDate = date2;
      const value2 = element.value;

      expect(value1).not.toBe(value2);
    });

    it('should be read-only', () => {
      const date = new Date(2024, 0, 15);
      element.selectedDate = date;

      // Attempting to set value should not change it (in strict mode it would throw)
      try {
        (element as any).value = 'invalid';
      } catch (e) {
        // Expected in strict mode
      }

      expect(element.value).toBe(date.toISOString());
    });
  });

  describe('Property Synchronization with Attributes', () => {
    it('should sync selectedDate property with attribute', () => {
      const date = new Date(2024, 0, 15);
      element.setAttribute('selected-date', date.toISOString());

      expect(element.selectedDate).toEqual(date);
    });

    it('should sync calendarType property with attribute', () => {
      element.setAttribute('calendar-type', 'gregorian');

      expect(element.calendarType).toBe('gregorian');
    });

    it('should sync locale property with attribute', () => {
      element.setAttribute('locale', 'en');

      expect(element.locale).toBe('en');
    });

    it('should sync theme property with attribute', () => {
      element.setAttribute('theme', 'dark');

      expect(element.theme).toBe('dark');
    });

    it('should sync selectionMode property with attribute', () => {
      element.setAttribute('selection-mode', 'range');

      expect(element.selectionMode).toBe('range');
    });

    it('should sync disabled property with attribute', () => {
      element.setAttribute('disabled', '');

      expect(element.disabled).toBe(true);
    });

    it('should update attribute when property changes', () => {
      element.locale = 'en';

      expect(element.getAttribute('locale')).toBe('en');
    });

    it('should maintain sync across multiple changes', () => {
      element.locale = 'en';
      expect(element.getAttribute('locale')).toBe('en');

      element.setAttribute('locale', 'fa');
      expect(element.locale).toBe('fa');

      element.locale = 'en';
      expect(element.getAttribute('locale')).toBe('en');
    });
  });

  describe('Property Getters and Setters', () => {
    it('should have getter for selectedDate', () => {
      const descriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(element),
        'selectedDate'
      );

      expect(descriptor?.get).toBeDefined();
    });

    it('should have setter for selectedDate', () => {
      const descriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(element),
        'selectedDate'
      );

      expect(descriptor?.set).toBeDefined();
    });

    it('should have getter for locale', () => {
      const descriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(element),
        'locale'
      );

      expect(descriptor?.get).toBeDefined();
    });

    it('should have setter for locale', () => {
      const descriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(element),
        'locale'
      );

      expect(descriptor?.set).toBeDefined();
    });

    it('should have getter for theme', () => {
      const descriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(element),
        'theme'
      );

      expect(descriptor?.get).toBeDefined();
    });

    it('should have setter for theme', () => {
      const descriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(element),
        'theme'
      );

      expect(descriptor?.set).toBeDefined();
    });
  });
});
