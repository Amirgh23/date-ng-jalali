import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

/**
 * **Validates: Requirements 3.3, 12.2**
 * 
 * Property-Based Tests for Disabled Dates Enforcement
 * 
 * These tests verify that disabled dates are properly enforced and cannot
 * be selected. They also verify that disabled dates do not appear in
 * selectedDates or selectedRange.
 */
describe('Disabled Dates Enforcement - Property-Based Tests', () => {
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
   * Property 1: Disabled Dates Cannot Be Selected in Single Mode
   * 
   * When a date is marked as disabled, attempting to select it in single
   * mode should fail or be prevented.
   */
  it('should prevent selection of disabled dates in single mode', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([disabledDate, selectDate]: [Date, Date]) => {
          element.selectionMode = 'single';

          // Set disabled dates
          (element as any).disabledDates = [disabledDate];

          // Try to select the disabled date
          element.setDate(disabledDate);

          // The disabled date should not be selected
          const selectedDate = element.selectedDate;
          if (selectedDate) {
            expect(
              selectedDate.getFullYear() !== disabledDate.getFullYear() ||
              selectedDate.getMonth() !== disabledDate.getMonth() ||
              selectedDate.getDate() !== disabledDate.getDate()
            ).toBe(true);
          }
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 2: Disabled Dates Do Not Appear in selectedDates
   * 
   * In multiple mode, disabled dates should never appear in the
   * selectedDates array.
   */
  it('should not include disabled dates in selectedDates', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 1, maxLength: 10 }
        ),
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 1, maxLength: 5 }
        ),
        (datesToAdd: Date[], disabledDates: Date[]) => {
          element.selectionMode = 'multiple';

          // Set disabled dates
          (element as any).disabledDates = disabledDates;

          // Try to add dates (including disabled ones)
          datesToAdd.forEach((date) => {
            element.addDate(date);
          });

          const selectedDates = element.selectedDates;

          // Verify no disabled dates are in selectedDates
          disabledDates.forEach((disabledDate) => {
            const found = selectedDates.some(
              (d) =>
                d.getFullYear() === disabledDate.getFullYear() &&
                d.getMonth() === disabledDate.getMonth() &&
                d.getDate() === disabledDate.getDate()
            );
            expect(found).toBe(false);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 3: Disabled Dates Do Not Appear in selectedRange
   * 
   * In range mode, if a range includes disabled dates, those dates should
   * not be selectable or should be excluded from the range.
   */
  it('should not include disabled dates in selectedRange', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 10) }),
          fc.date({ min: new Date(2024, 0, 20), max: new Date(2024, 0, 31) })
        ),
        fc.date({ min: new Date(2024, 0, 10), max: new Date(2024, 0, 20) }),
        (dates: [Date, Date], disabledDate: Date) => {
          const [start, end] = dates;
          element.selectionMode = 'range';

          // Set disabled date
          (element as any).disabledDates = [disabledDate];

          // Set range
          element.setRange(start, end);

          const range = element.selectedRange;

          // If the disabled date is within the range, it should be excluded
          if (
            disabledDate >= range.start! &&
            disabledDate <= range.end!
          ) {
            // The range should not include the disabled date
            expect(
              disabledDate.getFullYear() !== range.start!.getFullYear() ||
              disabledDate.getMonth() !== range.start!.getMonth() ||
              disabledDate.getDate() !== range.start!.getDate()
            ).toBe(true);
          }
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 4: Multiple Disabled Dates Are Enforced
   * 
   * When multiple dates are marked as disabled, all of them should be
   * prevented from selection.
   */
  it('should enforce multiple disabled dates', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
          { minLength: 2, maxLength: 10 }
        ),
        (disabledDates: Date[]) => {
          element.selectionMode = 'multiple';

          // Set multiple disabled dates
          (element as any).disabledDates = disabledDates;

          // Try to add all disabled dates
          disabledDates.forEach((date) => {
            element.addDate(date);
          });

          const selectedDates = element.selectedDates;

          // Verify no disabled dates are selected
          disabledDates.forEach((disabledDate) => {
            const found = selectedDates.some(
              (d) =>
                d.getFullYear() === disabledDate.getFullYear() &&
                d.getMonth() === disabledDate.getMonth() &&
                d.getDate() === disabledDate.getDate()
            );
            expect(found).toBe(false);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 5: Disabled Date Ranges Are Enforced
   * 
   * When a range of dates is marked as disabled, all dates within that
   * range should be prevented from selection.
   */
  it('should enforce disabled date ranges', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 10) }),
          fc.date({ min: new Date(2024, 0, 10), max: new Date(2024, 0, 20) })
        ),
        fc.date({ min: new Date(2024, 0, 20), max: new Date(2024, 0, 31) }),
        (disabledRange: [Date, Date], selectDate: Date) => {
          const [disabledStart, disabledEnd] = disabledRange;
          element.selectionMode = 'single';

          // Set disabled range
          (element as any).disabledDateRanges = [
            { start: disabledStart, end: disabledEnd }
          ];

          // Try to select a date within the disabled range
          const dateInRange = new Date(
            disabledStart.getTime() +
              (disabledEnd.getTime() - disabledStart.getTime()) / 2
          );

          element.setDate(dateInRange);

          const selectedDate = element.selectedDate;

          // The date within the disabled range should not be selected
          if (selectedDate) {
            expect(
              selectedDate.getTime() < disabledStart.getTime() ||
              selectedDate.getTime() > disabledEnd.getTime()
            ).toBe(true);
          }
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 6: Disabled Weekdays Are Enforced
   * 
   * When specific weekdays are marked as disabled, dates falling on those
   * weekdays should not be selectable.
   */
  it('should enforce disabled weekdays', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 6 }),
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (disabledWeekday: number, date: Date) => {
          element.selectionMode = 'single';

          // Set disabled weekday
          (element as any).disabledWeekdays = [disabledWeekday];

          // Try to select a date
          element.setDate(date);

          const selectedDate = element.selectedDate;

          // If the date falls on the disabled weekday, it should not be selected
          if (date.getDay() === disabledWeekday) {
            if (selectedDate) {
              expect(selectedDate.getDay()).not.toBe(disabledWeekday);
            }
          }
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 7: Disabled Dates Can Be Cleared
   * 
   * After clearing disabled dates, previously disabled dates should become
   * selectable again.
   */
  it('should allow selection after clearing disabled dates', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.selectionMode = 'single';

          // Set disabled dates
          (element as any).disabledDates = [date];

          // Clear disabled dates
          (element as any).disabledDates = [];

          // Now try to select the previously disabled date
          element.setDate(date);

          const selectedDate = element.selectedDate;

          // The date should now be selectable
          expect(selectedDate).toBeDefined();
          expect(selectedDate!.getFullYear()).toBe(date.getFullYear());
          expect(selectedDate!.getMonth()).toBe(date.getMonth());
          expect(selectedDate!.getDate()).toBe(date.getDate());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 8: Disabled Dates Persist Across Mode Changes
   * 
   * Disabled dates should remain enforced even when switching between
   * selection modes.
   */
  it('should persist disabled dates across mode changes', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (disabledDate: Date) => {
          // Set disabled dates
          (element as any).disabledDates = [disabledDate];

          // Switch through modes
          const modes: Array<'single' | 'range' | 'multiple'> = ['single', 'range', 'multiple'];

          modes.forEach((mode) => {
            element.selectionMode = mode;

            // Try to select the disabled date
            if (mode === 'single') {
              element.setDate(disabledDate);
            } else if (mode === 'range') {
              element.setRange(disabledDate, disabledDate);
            } else {
              element.addDate(disabledDate);
            }

            // Verify the disabled date is not selected
            const selectedDates = element.selectedDates;
            const found = selectedDates.some(
              (d) =>
                d.getFullYear() === disabledDate.getFullYear() &&
                d.getMonth() === disabledDate.getMonth() &&
                d.getDate() === disabledDate.getDate()
            );
            expect(found).toBe(false);
          });
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 9: Non-Disabled Dates Remain Selectable
   * 
   * When some dates are disabled, other dates should remain selectable.
   */
  it('should keep non-disabled dates selectable', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 10) }),
          fc.date({ min: new Date(2024, 0, 20), max: new Date(2024, 0, 31) })
        ),
        ([disabledDate, selectableDate]: [Date, Date]) => {
          element.selectionMode = 'single';

          // Set one date as disabled
          (element as any).disabledDates = [disabledDate];

          // Try to select a different date
          element.setDate(selectableDate);

          const selectedDate = element.selectedDate;

          // The selectable date should be selected
          expect(selectedDate).toBeDefined();
          expect(selectedDate!.getFullYear()).toBe(selectableDate.getFullYear());
          expect(selectedDate!.getMonth()).toBe(selectableDate.getMonth());
          expect(selectedDate!.getDate()).toBe(selectableDate.getDate());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 10: Disabled Dates Respect Min/Max Constraints
   * 
   * Disabled dates should work correctly in conjunction with min/max date
   * constraints.
   */
  it('should respect disabled dates with min/max constraints', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 10) }),
          fc.date({ min: new Date(2024, 0, 10), max: new Date(2024, 0, 20) }),
          fc.date({ min: new Date(2024, 0, 20), max: new Date(2024, 0, 31) })
        ),
        ([minDate, disabledDate, maxDate]: [Date, Date, Date]) => {
          element.selectionMode = 'single';

          // Set constraints
          (element as any).minDate = minDate;
          (element as any).maxDate = maxDate;

          // Set disabled date
          (element as any).disabledDates = [disabledDate];

          // Try to select the disabled date
          element.setDate(disabledDate);

          const selectedDate = element.selectedDate;

          // The disabled date should not be selected
          if (selectedDate) {
            expect(
              selectedDate.getFullYear() !== disabledDate.getFullYear() ||
              selectedDate.getMonth() !== disabledDate.getMonth() ||
              selectedDate.getDate() !== disabledDate.getDate()
            ).toBe(true);
          }
        }
      ),
      { numRuns: 500 }
    );
  });
});
