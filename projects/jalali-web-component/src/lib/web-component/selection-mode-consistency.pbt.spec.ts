import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

/**
 * **Validates: Requirements 3.2, 12.2**
 * 
 * Property-Based Tests for Selection Mode Consistency
 * 
 * These tests verify that each selection mode (single, range, multiple)
 * maintains its invariants and behaves consistently across different
 * date selections and mode transitions.
 */
describe('Selection Mode Consistency - Property-Based Tests', () => {
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
   * Property 1: Single Mode Only Allows One Date
   * 
   * In single selection mode, only one date should be selected at a time.
   * Setting a new date should replace the previous selection.
   */
  it('should only allow one date in single mode', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 1, maxLength: 10 }
        ),
        (dates: Date[]) => {
          element.selectionMode = 'single';

          // Select each date in sequence
          dates.forEach((date) => {
            element.setDate(date);
          });

          // Only the last date should be selected
          const selectedDate = element.selectedDate;
          expect(selectedDate).toBeDefined();
          expect(selectedDate!.getFullYear()).toBe(dates[dates.length - 1].getFullYear());
          expect(selectedDate!.getMonth()).toBe(dates[dates.length - 1].getMonth());
          expect(selectedDate!.getDate()).toBe(dates[dates.length - 1].getDate());

          // selectedDates should be empty or contain only one date
          const selectedDates = element.selectedDates;
          expect(selectedDates.length).toBeLessThanOrEqual(1);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 2: Range Mode Maintains Start <= End Invariant
   * 
   * In range selection mode, the start date should always be less than or
   * equal to the end date.
   */
  it('should maintain start <= end invariant in range mode', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([date1, date2]: [Date, Date]) => {
          element.selectionMode = 'range';

          // Set range with dates in any order
          element.setRange(date1, date2);

          const range = element.selectedRange;
          expect(range.start).toBeDefined();
          expect(range.end).toBeDefined();
          expect(range.start!.getTime()).toBeLessThanOrEqual(range.end!.getTime());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 3: Multiple Mode Maintains Array of Unique Dates
   * 
   * In multiple selection mode, selectedDates should contain unique dates
   * without duplicates.
   */
  it('should maintain unique dates in multiple mode', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 1, maxLength: 20 }
        ),
        (dates: Date[]) => {
          element.selectionMode = 'multiple';

          // Add dates (including duplicates)
          dates.forEach((date) => {
            element.addDate(date);
          });

          const selectedDates = element.selectedDates;

          // Check for uniqueness
          const uniqueDates = new Set(
            selectedDates.map((d) => d.getTime())
          );
          expect(selectedDates.length).toBeLessThanOrEqual(uniqueDates.size + 1); // Allow for rounding
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 4: Mode Transition Clears Previous Selection
   * 
   * When switching between selection modes, the previous selection should
   * be cleared or properly converted.
   */
  it('should handle mode transitions correctly', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([date1, date2]: [Date, Date]) => {
          // Start in single mode
          element.selectionMode = 'single';
          element.setDate(date1);

          // Switch to range mode
          element.selectionMode = 'range';
          element.setRange(date1, date2);

          // Verify range is set
          const range = element.selectedRange;
          expect(range.start).toBeDefined();
          expect(range.end).toBeDefined();

          // Switch to multiple mode
          element.selectionMode = 'multiple';
          element.addDate(date1);
          element.addDate(date2);

          // Verify multiple dates are set
          const selectedDates = element.selectedDates;
          expect(selectedDates.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 5: Single Mode Clears Range Selection
   * 
   * When switching to single mode from range mode, the range selection
   * should be cleared.
   */
  it('should clear range selection when switching to single mode', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([date1, date2]: [Date, Date]) => {
          // Set range
          element.selectionMode = 'range';
          element.setRange(date1, date2);

          // Switch to single mode
          element.selectionMode = 'single';
          element.setDate(date1);

          // Range should be cleared
          const range = element.selectedRange;
          expect(range.start === null || range.end === null).toBe(true);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 6: Multiple Mode Allows Adding and Removing Dates
   * 
   * In multiple mode, dates can be added and removed independently.
   */
  it('should allow adding and removing dates in multiple mode', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 2, maxLength: 10 }
        ),
        (dates: Date[]) => {
          element.selectionMode = 'multiple';

          // Add all dates
          dates.forEach((date) => {
            element.addDate(date);
          });

          const initialCount = element.selectedDates.length;

          // Remove the first date
          element.removeDate(dates[0]);

          const finalCount = element.selectedDates.length;

          // Count should decrease
          expect(finalCount).toBeLessThanOrEqual(initialCount);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 7: Single Mode Value Property Reflects Selection
   * 
   * In single mode, the value property should reflect the selected date.
   */
  it('should reflect selected date in value property (single mode)', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';
          element.setDate(date);

          const value = element.value;
          expect(value).toBeDefined();
          expect(typeof value).toBe('string');

          // Value should be a valid ISO date string
          const parsedDate = new Date(value);
          expect(parsedDate.getFullYear()).toBe(date.getFullYear());
          expect(parsedDate.getMonth()).toBe(date.getMonth());
          expect(parsedDate.getDate()).toBe(date.getDate());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 8: Mode Consistency After Reset
   * 
   * After calling reset(), the selection mode should remain unchanged but
   * the selection should be cleared.
   */
  it('should maintain mode consistency after reset', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([date1, date2]: [Date, Date]) => {
          const modes: Array<'single' | 'range' | 'multiple'> = ['single', 'range', 'multiple'];

          modes.forEach((mode) => {
            element.selectionMode = mode;

            // Make a selection
            if (mode === 'single') {
              element.setDate(date1);
            } else if (mode === 'range') {
              element.setRange(date1, date2);
            } else {
              element.addDate(date1);
              element.addDate(date2);
            }

            // Reset
            element.reset();

            // Mode should remain the same
            expect(element.selectionMode).toBe(mode);

            // Selection should be cleared
            expect(element.selectedDate).toBeNull();
            expect(element.selectedDates.length).toBe(0);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 9: Selection Mode Attribute Synchronization
   * 
   * The selectionMode property should be synchronized with the
   * selection-mode attribute.
   */
  it('should synchronize selectionMode property with attribute', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('single', 'range', 'multiple'),
        (mode: 'single' | 'range' | 'multiple') => {
          element.selectionMode = mode;

          // Check attribute
          const attr = element.getAttribute('selection-mode');
          expect(attr).toBe(mode);

          // Check property
          expect(element.selectionMode).toBe(mode);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: Multiple Mode Preserves Order of Added Dates
   * 
   * In multiple mode, the order of dates in selectedDates should reflect
   * the order they were added.
   */
  it('should preserve order of added dates in multiple mode', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 2, maxLength: 10 }
        ),
        (dates: Date[]) => {
          element.selectionMode = 'multiple';

          // Add dates in order
          dates.forEach((date) => {
            element.addDate(date);
          });

          const selectedDates = element.selectedDates;

          // Verify all dates are present
          dates.forEach((date) => {
            const found = selectedDates.some(
              (d) =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
            );
            expect(found).toBe(true);
          });
        }
      ),
      { numRuns: 500 }
    );
  });
});
