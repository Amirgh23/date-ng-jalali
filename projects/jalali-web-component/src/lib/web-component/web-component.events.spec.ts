import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - Event Tests', () => {
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

  describe('dateSelect Event', () => {
    it('should emit dateSelect event when date is selected', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          expect(e).toBeDefined();
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should include date in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.date).toBeDefined();
          expect(event.detail.date instanceof Date).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should include jalaliDate in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.jalaliDate).toBeDefined();
          expect(typeof event.detail.jalaliDate).toBe('string');
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should include gregorianDate in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.gregorianDate).toBeDefined();
          expect(typeof event.detail.gregorianDate).toBe('string');
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should include hijriDate in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.hijriDate).toBeDefined();
          expect(typeof event.detail.hijriDate).toBe('string');
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should emit dateSelect only in single selection mode', () => {
      element.selectionMode = 'single';
      const listener = vi.fn();

      element.addEventListener('dateSelect', listener);

      (element as any).selectDate(new Date(2024, 0, 15));

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(listener).toHaveBeenCalled();
          resolve();
        }, 100);
      });
    });

    it('should bubble from shadow DOM', () => {
      const parentListener = vi.fn();
      document.body.addEventListener('dateSelect', parentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', () => {
          setTimeout(() => {
            expect(parentListener).toHaveBeenCalled();
            document.body.removeEventListener('dateSelect', parentListener);
            resolve();
          }, 100);
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should be cancelable', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.cancelable).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });
  });

  describe('rangeSelect Event', () => {
    it('should emit rangeSelect event when range is selected', () => {
      element.selectionMode = 'range';
      return new Promise<void>((resolve) => {
        element.addEventListener('rangeSelect', (e: Event) => {
          expect(e).toBeDefined();
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 31));
      });
    });

    it('should include start date in event detail', () => {
      element.selectionMode = 'range';
      return new Promise<void>((resolve) => {
        element.addEventListener('rangeSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.start).toBeDefined();
          expect(event.detail.start instanceof Date).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 31));
      });
    });

    it('should include end date in event detail', () => {
      element.selectionMode = 'range';
      return new Promise<void>((resolve) => {
        element.addEventListener('rangeSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.end).toBeDefined();
          expect(event.detail.end instanceof Date).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 31));
      });
    });

    it('should include startJalali in event detail', () => {
      element.selectionMode = 'range';
      return new Promise<void>((resolve) => {
        element.addEventListener('rangeSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.startJalali).toBeDefined();
          expect(typeof event.detail.startJalali).toBe('string');
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 31));
      });
    });

    it('should include endJalali in event detail', () => {
      element.selectionMode = 'range';
      return new Promise<void>((resolve) => {
        element.addEventListener('rangeSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.endJalali).toBeDefined();
          expect(typeof event.detail.endJalali).toBe('string');
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 31));
      });
    });

    it('should bubble from shadow DOM', () => {
      element.selectionMode = 'range';
      const parentListener = vi.fn();
      document.body.addEventListener('rangeSelect', parentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('rangeSelect', () => {
          setTimeout(() => {
            expect(parentListener).toHaveBeenCalled();
            document.body.removeEventListener('rangeSelect', parentListener);
            resolve();
          }, 100);
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 31));
      });
    });
  });

  describe('multipleSelect Event', () => {
    it('should emit multipleSelect event when date is added to selection', () => {
      element.selectionMode = 'multiple';
      return new Promise<void>((resolve) => {
        element.addEventListener('multipleSelect', (e: Event) => {
          expect(e).toBeDefined();
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should include dates array in event detail', () => {
      element.selectionMode = 'multiple';
      return new Promise<void>((resolve) => {
        element.addEventListener('multipleSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.dates).toBeDefined();
          expect(Array.isArray(event.detail.dates)).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should include count in event detail', () => {
      element.selectionMode = 'multiple';
      return new Promise<void>((resolve) => {
        element.addEventListener('multipleSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.count).toBeDefined();
          expect(typeof event.detail.count).toBe('number');
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should include jalaliDates in event detail', () => {
      element.selectionMode = 'multiple';
      return new Promise<void>((resolve) => {
        element.addEventListener('multipleSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.jalaliDates).toBeDefined();
          expect(Array.isArray(event.detail.jalaliDates)).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should update count when multiple dates are selected', () => {
      element.selectionMode = 'multiple';
      let callCount = 0;

      return new Promise<void>((resolve) => {
        element.addEventListener('multipleSelect', (e: Event) => {
          const event = e as CustomEvent;
          callCount++;

          if (callCount === 2) {
            expect(event.detail.count).toBe(2);
            resolve();
          }
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should bubble from shadow DOM', () => {
      element.selectionMode = 'multiple';
      const parentListener = vi.fn();
      document.body.addEventListener('multipleSelect', parentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('multipleSelect', () => {
          setTimeout(() => {
            expect(parentListener).toHaveBeenCalled();
            document.body.removeEventListener('multipleSelect', parentListener);
            resolve();
          }, 100);
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });
  });

  describe('localeChange Event', () => {
    it('should emit localeChange event when locale changes', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          expect(e).toBeDefined();
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should include locale in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.locale).toBe('en');
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should include direction in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.direction).toBeDefined();
          expect(['rtl', 'ltr']).toContain(event.detail.direction);
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should emit with rtl direction for Persian locale', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.direction).toBe('rtl');
          resolve();
        });

        element.locale = 'fa';
      });
    });

    it('should emit with ltr direction for English locale', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.direction).toBe('ltr');
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should bubble from shadow DOM', () => {
      const parentListener = vi.fn();
      document.body.addEventListener('localeChange', parentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', () => {
          setTimeout(() => {
            expect(parentListener).toHaveBeenCalled();
            document.body.removeEventListener('localeChange', parentListener);
            resolve();
          }, 100);
        });

        element.locale = 'en';
      });
    });
  });

  describe('themeChange Event', () => {
    it('should emit themeChange event when theme changes', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('themeChange', (e: Event) => {
          expect(e).toBeDefined();
          resolve();
        });

        element.theme = 'dark';
      });
    });

    it('should include theme in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('themeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.theme).toBe('dark');
          resolve();
        });

        element.theme = 'dark';
      });
    });

    it('should include colors in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('themeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.colors).toBeDefined();
          expect(typeof event.detail.colors).toBe('object');
          resolve();
        });

        element.theme = 'dark';
      });
    });

    it('should bubble from shadow DOM', () => {
      const parentListener = vi.fn();
      document.body.addEventListener('themeChange', parentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('themeChange', () => {
          setTimeout(() => {
            expect(parentListener).toHaveBeenCalled();
            document.body.removeEventListener('themeChange', parentListener);
            resolve();
          }, 100);
        });

        element.theme = 'dark';
      });
    });
  });

  describe('error Event', () => {
    it('should emit error event on invalid date', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('error', (e: Event) => {
          expect(e).toBeDefined();
          resolve();
        });

        (element as any).selectDate(new Date('invalid'));
      });
    });

    it('should include error code in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('error', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.code).toBeDefined();
          expect(typeof event.detail.code).toBe('string');
          resolve();
        });

        (element as any).selectDate(new Date('invalid'));
      });
    });

    it('should include error message in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('error', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.message).toBeDefined();
          expect(typeof event.detail.message).toBe('string');
          resolve();
        });

        (element as any).selectDate(new Date('invalid'));
      });
    });

    it('should include timestamp in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('error', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.timestamp).toBeDefined();
          expect(typeof event.detail.timestamp).toBe('number');
          resolve();
        });

        (element as any).selectDate(new Date('invalid'));
      });
    });

    it('should bubble from shadow DOM', () => {
      const parentListener = vi.fn();
      document.body.addEventListener('error', parentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('error', () => {
          setTimeout(() => {
            expect(parentListener).toHaveBeenCalled();
            document.body.removeEventListener('error', parentListener);
            resolve();
          }, 100);
        });

        (element as any).selectDate(new Date('invalid'));
      });
    });
  });

  describe('Event Detail Validation', () => {
    it('should have valid date format in dateSelect detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          const { date, jalaliDate, gregorianDate, hijriDate } = event.detail;

          expect(date instanceof Date).toBe(true);
          expect(/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(jalaliDate)).toBe(true);
          expect(/^\d{4}-\d{2}-\d{2}$/.test(gregorianDate)).toBe(true);
          expect(/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(hijriDate)).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should have valid date format in rangeSelect detail', () => {
      element.selectionMode = 'range';
      return new Promise<void>((resolve) => {
        element.addEventListener('rangeSelect', (e: Event) => {
          const event = e as CustomEvent;
          const { start, end, startJalali, endJalali } = event.detail;

          expect(start instanceof Date).toBe(true);
          expect(end instanceof Date).toBe(true);
          expect(/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(startJalali)).toBe(true);
          expect(/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(endJalali)).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 1));
        (element as any).selectDate(new Date(2024, 0, 31));
      });
    });

    it('should have valid date format in multipleSelect detail', () => {
      element.selectionMode = 'multiple';
      return new Promise<void>((resolve) => {
        element.addEventListener('multipleSelect', (e: Event) => {
          const event = e as CustomEvent;
          const { dates, jalaliDates, count } = event.detail;

          expect(Array.isArray(dates)).toBe(true);
          expect(Array.isArray(jalaliDates)).toBe(true);
          expect(dates.length).toBe(count);
          expect(dates.length).toBe(jalaliDates.length);

          dates.forEach((date: Date) => {
            expect(date instanceof Date).toBe(true);
          });

          jalaliDates.forEach((date: string) => {
            expect(/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)).toBe(true);
          });

          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });
  });

  describe('Event Bubbling from Shadow DOM', () => {
    it('should have composed flag set to true', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.composed).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should have bubbles flag set to true', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.bubbles).toBe(true);
          resolve();
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should reach parent elements', () => {
      const container = document.createElement('div');
      container.appendChild(element);
      document.body.appendChild(container);

      const parentListener = vi.fn();
      container.addEventListener('dateSelect', parentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', () => {
          setTimeout(() => {
            expect(parentListener).toHaveBeenCalled();
            document.body.removeChild(container);
            resolve();
          }, 100);
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should reach document level', () => {
      const documentListener = vi.fn();
      document.addEventListener('dateSelect', documentListener);

      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', () => {
          setTimeout(() => {
            expect(documentListener).toHaveBeenCalled();
            document.removeEventListener('dateSelect', documentListener);
            resolve();
          }, 100);
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });
  });

  describe('Event Listener Management', () => {
    it('should allow multiple listeners for same event', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      element.addEventListener('dateSelect', listener1);
      element.addEventListener('dateSelect', listener2);

      return new Promise<void>((resolve) => {
        element.addEventListener('dateSelect', () => {
          setTimeout(() => {
            expect(listener1).toHaveBeenCalled();
            expect(listener2).toHaveBeenCalled();
            resolve();
          }, 100);
        });

        (element as any).selectDate(new Date(2024, 0, 15));
      });
    });

    it('should allow removing event listeners', () => {
      const listener = vi.fn();
      element.addEventListener('dateSelect', listener);
      element.removeEventListener('dateSelect', listener);

      (element as any).selectDate(new Date(2024, 0, 15));

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(listener).not.toHaveBeenCalled();
          resolve();
        }, 100);
      });
    });

    it('should support once option for event listeners', () => {
      const listener = vi.fn();
      element.addEventListener('dateSelect', listener, { once: true });

      (element as any).selectDate(new Date(2024, 0, 15));
      (element as any).selectDate(new Date(2024, 0, 20));

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(listener).toHaveBeenCalledTimes(1);
          resolve();
        }, 100);
      });
    });
  });
});
