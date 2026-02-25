import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

/**
 * **Validates: Requirements 3.3, 12.2**
 * 
 * Property-Based Tests for Range Validation
 * 
 * These tests verify that date ranges are validated correctly and maintain
 * the invariant that start date <= end date. They also verify that ranges
 * contain all dates between start and end, and no dates outside the bounds.
 */
describe('Range Validation - Property-Based Tests', () => {
  let element: JalaliDatePickerElement;

  beforeEach(() => {
    element = new JalaliDatePickerElement();
    document.body.appendChild(element);
    element.selectionMode = 'range';
  });

  afterEach(() => {
    if (element && element.parentNode) {
      document.body.removeChild(element);
    }
  });

  /**
   * Property 1: Start Date Always <= End Date
   * 
   * For any date range, the start date should always be less than or equal
   * to the end date. If a range is set with start > end, it should be
   * automatically corrected.
   */
  it('should maintain invariant: start date <= end date', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2000, 0, 1), max: new Date(2100, 11, 31) }),
          fc.date({ min: new Date(2000, 0, 1), max: new Date(2100, 11, 31) })
        ),
        ([date1, date2]: [Date, Date]) => {
          const start = date1 < date2 ? date1 : date2;
          const end = date1 < date2 ? date2 : date1;

          element.setRange(start, end);
          const range = element.selectedRange;

          expect(range.start).toBeLessThanOrEqual(range.end!);
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 2: Range Contains All Dates Between Start and End
   * 
   * For any date range, all dates between start and end (inclusive) should
   * be considered part of the range.
   */
  it('should contain all dates between start and end', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([start, end]: [Date, Date]) => {
          element.setRange(start, end);
          const range = element.selectedRange;

          // Generate a date between start and end
          const midDate = new Date(start.getTime() + (end.getTime() - start.getTime()) / 2);

          // Verify the date is within the range
          expect(midDate.getTime()).toBeGreaterThanOrEqual(range.start!.getTime());
          expect(midDate.getTime()).toBeLessThanOrEqual(range.end!.getTime());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 3: Range Does Not Contain Dates Outside Bounds
   * 
   * For any date range, dates outside the specified bounds should not be
   * considered part of the range.
   */
  it('should not contain dates outside the specified bounds', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 10), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 20) })
        ),
        ([start, end]: [Date, Date]) => {
          element.setRange(start, end);
          const range = element.selectedRange;

          // Generate a date before the range
          const beforeDate = new Date(start.getTime() - 86400000); // 1 day before

          // Generate a date after the range
          const afterDate = new Date(end.getTime() + 86400000); // 1 day after

          // Verify dates are outside the range
          expect(beforeDate.getTime()).toBeLessThan(range.start!.getTime());
          expect(afterDate.getTime()).toBeGreaterThan(range.end!.getTime());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 4: Range Boundaries Are Inclusive
   * 
   * The start and end dates of a range should be inclusive (part of the range).
   */
  it('should have inclusive boundaries', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([start, end]: [Date, Date]) => {
          element.setRange(start, end);
          const range = element.selectedRange;

          // Start date should be in range
          expect(range.start!.getTime()).toBeGreaterThanOrEqual(start.getTime());
          expect(range.start!.getTime()).toBeLessThanOrEqual(end.getTime());

          // End date should be in range
          expect(range.end!.getTime()).toBeGreaterThanOrEqual(start.getTime());
          expect(range.end!.getTime()).toBeLessThanOrEqual(end.getTime());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 5: Range Duration Is Consistent
   * 
   * The duration of a range (end - start) should be consistent and non-negative.
   */
  it('should maintain consistent range duration', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([start, end]: [Date, Date]) => {
          element.setRange(start, end);
          const range = element.selectedRange;

          const duration = range.end!.getTime() - range.start!.getTime();

          // Duration should be non-negative
          expect(duration).toBeGreaterThanOrEqual(0);

          // Duration should match the original range (within tolerance)
          const originalDuration = end.getTime() - start.getTime();
          expect(Math.abs(duration - originalDuration)).toBeLessThan(1000); // 1 second tolerance
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 6: Single Day Range Is Valid
   * 
   * A range where start and end are the same day should be valid.
   */
  it('should allow single day ranges', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 11, 31) }),
        (date: Date) => {
          element.setRange(date, date);
          const range = element.selectedRange;

          expect(range.start).toBeDefined();
          expect(range.end).toBeDefined();
          expect(range.start!.getTime()).toBe(range.end!.getTime());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 7: Range Handles Reversed Dates
   * 
   * When setting a range with reversed dates (end before start), the range
   * should automatically correct the order.
   */
  it('should handle reversed dates by correcting order', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 15) }),
          fc.date({ min: new Date(2024, 0, 15), max: new Date(2024, 0, 31) })
        ),
        ([date1, date2]: [Date, Date]) => {
          // Intentionally set with reversed order
          element.setRange(date2, date1);
          const range = element.selectedRange;

          // Should be corrected to start <= end
          expect(range.start!.getTime()).toBeLessThanOrEqual(range.end!.getTime());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 8: Range Across Multiple Months
   * 
   * Ranges spanning multiple months should be handled correctly.
   */
  it('should handle ranges across multiple months', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 0, max: 10 }),
          fc.integer({ min: 1, max: 28 })
        ),
        ([monthOffset, day]: [number, number]) => {
          const start = new Date(2024, monthOffset, day);
          const end = new Date(2024, monthOffset + 1, day);

          element.setRange(start, end);
          const range = element.selectedRange;

          expect(range.start!.getTime()).toBeLessThanOrEqual(range.end!.getTime());
          expect(range.start!.getMonth()).toBeLessThanOrEqual(range.end!.getMonth());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 9: Range Across Multiple Years
   * 
   * Ranges spanning multiple years should be handled correctly.
   */
  it('should handle ranges across multiple years', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 2000, max: 2099 }),
          fc.integer({ min: 1, max: 28 })
        ),
        ([year, day]: [number, number]) => {
          const start = new Date(year, 0, day);
          const end = new Date(year + 1, 11, day);

          element.setRange(start, end);
          const range = element.selectedRange;

          expect(range.start!.getTime()).toBeLessThanOrEqual(range.end!.getTime());
          expect(range.start!.getFullYear()).toBeLessThanOrEqual(range.end!.getFullYear());
        }
      ),
      { numRuns: 500 }
    );
  });

  /**
   * Property 10: Range Validation With Min/Max Constraints
   * 
   * When min and max dates are set, ranges should respect these constraints.
   */
  it('should respect min/max constraints in ranges', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.date({ min: new Date(2024, 0, 1), max: new Date(2024, 0, 10) }),
          fc.date({ min: new Date(2024, 0, 10), max: new Date(2024, 0, 20) }),
          fc.date({ min: new Date(2024, 0, 20), max: new Date(2024, 0, 31) })
        ),
        ([minDate, rangeStart, maxDate]: [Date, Date, Date]) => {
          // Set constraints
          (element as any).minDate = minDate;
          (element as any).maxDate = maxDate;

          // Set range within constraints
          element.setRange(minDate, maxDate);
          const range = element.selectedRange;

          // Range should be within constraints
          expect(range.start!.getTime()).toBeGreaterThanOrEqual(minDate.getTime());
          expect(range.end!.getTime()).toBeLessThanOrEqual(maxDate.getTime());
        }
      ),
      { numRuns: 500 }
    );
  });
});
