import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

/**
 * **Validates: Requirements 6.1, 6.2, 6.3, 12.2**
 * 
 * Property-Based Tests for Event Emission
 * 
 * These tests verify that events are emitted correctly for all user actions,
 * that event details match the selected dates, and that events bubble from
 * the Shadow DOM.
 */
describe('Event Emission - Property-Based Tests', () => {
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

  /**
   * Property 1: Every Date Selection Emits an Event
   * 
   * For every date selection in single mode, a dateSelect event should be
   * emitted.
   */
  it('should emit dateSelect event for every date selection', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 1, maxLength: 10 }
        ),
        (dates: Date[]) => {
          element.selectionMode = 'single';

          let eventCount = 0;
          element.addEventListener('dateSelect', () => {
            eventCount++;
          });

          // Select each date
          dates.forEach((date) => {
            element.setDate(date);
          });

          // Should emit one event per selection
          expect(eventCount).toBe(dates.length);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 2: Event Detail Matches Selected Date
   * 
   * The event detail should contain the correct date information that was
   * selected.
   */
  it('should include correct date in event detail', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';

          return new Promise<void>((resolve) => {
            element.addEventListener('dateSelect', (e: Event) => {
              const event = e as CustomEvent;
              const detail = event.detail;

              // Verify date in detail
              expect(detail.date).toBeDefined();
              expect(detail.date instanceof Date).toBe(true);
              expect(detail.date.getFullYear()).toBe(date.getFullYear());
              expect(detail.date.getMonth()).toBe(date.getMonth());
              expect(detail.date.getDate()).toBe(date.getDate());

              resolve();
            });

            element.setDate(date);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 3: Event Detail Includes Calendar Conversions
   * 
   * The event detail should include Jalali, Gregorian, and Hijri date
   * representations.
   */
  it('should include calendar conversions in event detail', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';

          return new Promise<void>((resolve) => {
            element.addEventListener('dateSelect', (e: Event) => {
              const event = e as CustomEvent;
              const detail = event.detail;

              // Verify calendar conversions
              expect(detail.jalaliDate).toBeDefined();
              expect(typeof detail.jalaliDate).toBe('string');

              expect(detail.gregorianDate).toBeDefined();
              expect(typeof detail.gregorianDate).toBe('string');

              expect(detail.hijriDate).toBeDefined();
              expect(typeof detail.hijriDate).toBe('string');

              resolve();
            });

            element.setDate(date);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 4: Range Selection Emits rangeSelect Event
   * 
   * When a range is selected, a rangeSelect event should be emitted with
   * the correct range information.
   */
  it('should emit rangeSelect event with correct range', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([start, end]: [Date, Date]) => {
          element.selectionMode = 'range';

          return new Promise<void>((resolve) => {
            element.addEventListener('rangeSelect', (e: Event) => {
              const event = e as CustomEvent;
              const detail = event.detail;

              // Verify range in detail
              expect(detail.range).toBeDefined();
              expect(detail.range.start).toBeDefined();
              expect(detail.range.end).toBeDefined();

              resolve();
            });

            element.setRange(start, end);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 5: Multiple Selection Emits multipleSelect Event
   * 
   * When dates are added in multiple mode, a multipleSelect event should
   * be emitted with the array of selected dates.
   */
  it('should emit multipleSelect event with correct dates', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 1, maxLength: 10 }
        ),
        (dates: Date[]) => {
          element.selectionMode = 'multiple';

          let eventCount = 0;
          element.addEventListener('multipleSelect', (e: Event) => {
            const event = e as CustomEvent;
            const detail = event.detail;

            // Verify dates array in detail
            expect(detail.dates).toBeDefined();
            expect(Array.isArray(detail.dates)).toBe(true);

            eventCount++;
          });

          // Add each date
          dates.forEach((date) => {
            element.addDate(date);
          });

          // Should emit one event per addition
          expect(eventCount).toBe(dates.length);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 6: Events Bubble from Shadow DOM
   * 
   * Custom events should bubble from the Shadow DOM and be catchable on
   * parent elements.
   */
  it('should bubble events from Shadow DOM', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';

          const container = document.createElement('div');
          container.appendChild(element);
          document.body.appendChild(container);

          return new Promise<void>((resolve) => {
            // Listen on parent container
            container.addEventListener('dateSelect', (e: Event) => {
              expect(e).toBeDefined();
              expect((e as CustomEvent).detail).toBeDefined();

              document.body.removeChild(container);
              resolve();
            });

            element.setDate(date);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 7: Locale Change Event Is Emitted
   * 
   * When the locale is changed, a localeChange event should be emitted.
   */
  it('should emit localeChange event when locale changes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('fa', 'en'),
        (locale: 'fa' | 'en') => {
          return new Promise<void>((resolve) => {
            element.addEventListener('localeChange', (e: Event) => {
              const event = e as CustomEvent;
              const detail = event.detail;

              // Verify locale in detail
              expect(detail.locale).toBe(locale);

              resolve();
            });

            element.locale = locale;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Theme Change Event Is Emitted
   * 
   * When the theme is changed, a themeChange event should be emitted.
   */
  it('should emit themeChange event when theme changes', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-z-]+$/),
        (theme: string) => {
          return new Promise<void>((resolve) => {
            element.addEventListener('themeChange', (e: Event) => {
              const event = e as CustomEvent;
              const detail = event.detail;

              // Verify theme in detail
              expect(detail.theme).toBe(theme);

              resolve();
            });

            element.theme = theme;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: Event Composition Flag Is Set
   * 
   * Events should have the composed flag set to true so they bubble through
   * Shadow DOM boundaries.
   */
  it('should have composed flag set for Shadow DOM bubbling', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';

          return new Promise<void>((resolve) => {
            element.addEventListener('dateSelect', (e: Event) => {
              const event = e as CustomEvent;

              // Verify composed flag
              expect(event.composed).toBe(true);

              resolve();
            });

            element.setDate(date);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 10: Events Are Cancelable
   * 
   * Custom events should be cancelable, allowing listeners to prevent
   * default behavior.
   */
  it('should emit cancelable events', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';

          return new Promise<void>((resolve) => {
            element.addEventListener('dateSelect', (e: Event) => {
              const event = e as CustomEvent;

              // Verify cancelable flag
              expect(event.cancelable).toBe(true);

              resolve();
            });

            element.setDate(date);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 11: Multiple Events Are Emitted for Complex Operations
   * 
   * Complex operations like setting a range should emit appropriate events.
   */
  it('should emit appropriate events for complex operations', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([start, end]: [Date, Date]) => {
          element.selectionMode = 'range';

          let rangeSelectEmitted = false;

          element.addEventListener('rangeSelect', () => {
            rangeSelectEmitted = true;
          });

          element.setRange(start, end);

          // Verify event was emitted
          expect(rangeSelectEmitted).toBe(true);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 12: Event Detail Is Consistent Across Multiple Listeners
   * 
   * Multiple listeners should receive the same event detail.
   */
  it('should provide consistent event detail to multiple listeners', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';

          const details: any[] = [];

          return new Promise<void>((resolve) => {
            // Add multiple listeners
            element.addEventListener('dateSelect', (e: Event) => {
              details.push((e as CustomEvent).detail);
            });

            element.addEventListener('dateSelect', (e: Event) => {
              details.push((e as CustomEvent).detail);
            });

            element.addEventListener('dateSelect', (e: Event) => {
              details.push((e as CustomEvent).detail);

              // Verify all details are the same
              expect(details[0]).toEqual(details[1]);
              expect(details[1]).toEqual(details[2]);

              resolve();
            });

            element.setDate(date);
          });
        }
      ),
      { numRuns: 500 }
    );
  });
});
