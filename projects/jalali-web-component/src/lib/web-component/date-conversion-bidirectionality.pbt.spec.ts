import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { JalaliDatePickerElement } from './jalali-date-picker.element';
import { JalaliCalendarUtils } from '../core/utils/jalali-calendar.utils';

/**
 * **Validates: Requirements 3.1, 12.2**
 * 
 * Property-Based Tests for Date Conversion Bidirectionality
 * 
 * These tests verify that date conversions between different calendar systems
 * are bidirectional and consistent. For any date in one system, converting to
 * another system and back should yield the same date.
 */
describe('Date Conversion Bidirectionality - Property-Based Tests', () => {
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
   * Property 1: Gregorian → Jalali → Gregorian Bidirectionality
   * 
   * For any Gregorian date, converting to Jalali and back should yield
   * the same Gregorian date (within the same day).
   */
  it('should maintain bidirectionality: Gregorian → Jalali → Gregorian', () => {
    fc.assert(
      fc.property(
        fc.date({
          min: new Date(1900, 0, 1),
          max: new Date(2100, 11, 31)
        }),
        (gregorianDate: Date) => {
          // Convert Gregorian to Jalali
          const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
          
          // Convert back to Gregorian
          const convertedBack = JalaliCalendarUtils.jalaliToGregorian(
            jalaliDate.year,
            jalaliDate.month,
            jalaliDate.day
          );

          // Check that the day is the same (allowing for timezone differences)
          expect(gregorianDate.getFullYear()).toBe(convertedBack.getFullYear());
          expect(gregorianDate.getMonth()).toBe(convertedBack.getMonth());
          expect(gregorianDate.getDate()).toBe(convertedBack.getDate());
        }
      ),
      { numRuns: 1000 }
    );
  });

  /**
   * Property 2: Jalali → Gregorian → Jalali Bidirectionality
   * 
   * For any Jalali date, converting to Gregorian and back should yield
   * the same Jalali date.
   */
  it('should maintain bidirectionality: Jalali → Gregorian → Jalali', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 1300, max: 1500 }), // Jalali year
          fc.integer({ min: 1, max: 12 }),      // Jalali month
          fc.integer({ min: 1, max: 31 })       // Jalali day
        ),
        ([jYear, jMonth, jDay]: [number, number, number]) => {
          // Validate the Jalali date is reasonable
          if (jMonth <= 6 && jDay > 31) return; // First 6 months have 31 days
          if (jMonth > 6 && jMonth < 12 && jDay > 30) return; // Months 7-11 have 30 days
          if (jMonth === 12 && jDay > 29) return; // Month 12 has 29 days (or 30 in leap years)

          // Convert Jalali to Gregorian
          const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(jYear, jMonth, jDay);

          // Convert back to Jalali
          const convertedBack = JalaliCalendarUtils.gregorianToJalali(gregorianDate);

          // Check that the Jalali date is the same
          expect(jYear).toBe(convertedBack.year);
          expect(jMonth).toBe(convertedBack.month);
          expect(jDay).toBe(convertedBack.day);
        }
      ),
      { numRuns: 1000 }
    );
  });

  /**
   * Property 3: Gregorian → Hijri → Gregorian Bidirectionality
   * 
   * For any Gregorian date, converting to Hijri and back should yield
   * the same Gregorian date (within the same day).
   */
  it('should maintain bidirectionality: Gregorian → Hijri → Gregorian', () => {
    fc.assert(
      fc.property(
        fc.date({
          min: new Date(1900, 0, 1),
          max: new Date(2100, 11, 31)
        }),
        (gregorianDate: Date) => {
          // Convert Gregorian to Hijri
          const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);

          // Convert back to Gregorian
          const convertedBack = JalaliCalendarUtils.hijriToGregorian(
            hijriDate.year,
            hijriDate.month,
            hijriDate.day
          );

          // Check that the day is the same (allowing for timezone differences)
          expect(gregorianDate.getFullYear()).toBe(convertedBack.getFullYear());
          expect(gregorianDate.getMonth()).toBe(convertedBack.getMonth());
          expect(gregorianDate.getDate()).toBe(convertedBack.getDate());
        }
      ),
      { numRuns: 1000 }
    );
  });

  /**
   * Property 4: Jalali → Hijri → Jalali Bidirectionality
   * 
   * For any Jalali date, converting to Hijri and back should yield
   * the same Jalali date.
   */
  it('should maintain bidirectionality: Jalali → Hijri → Jalali', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 1300, max: 1500 }), // Jalali year
          fc.integer({ min: 1, max: 12 }),      // Jalali month
          fc.integer({ min: 1, max: 31 })       // Jalali day
        ),
        ([jYear, jMonth, jDay]: [number, number, number]) => {
          // Validate the Jalali date is reasonable
          if (jMonth <= 6 && jDay > 31) return;
          if (jMonth > 6 && jMonth < 12 && jDay > 30) return;
          if (jMonth === 12 && jDay > 29) return;

          // Convert Jalali to Gregorian first
          const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(jYear, jMonth, jDay);

          // Convert Gregorian to Hijri
          const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);

          // Convert Hijri back to Gregorian
          const gregorianBack = JalaliCalendarUtils.hijriToGregorian(
            hijriDate.year,
            hijriDate.month,
            hijriDate.day
          );

          // Convert back to Jalali
          const convertedBack = JalaliCalendarUtils.gregorianToJalali(gregorianBack);

          // Check that the Jalali date is the same
          expect(jYear).toBe(convertedBack.year);
          expect(jMonth).toBe(convertedBack.month);
          expect(jDay).toBe(convertedBack.day);
        }
      ),
      { numRuns: 1000 }
    );
  });

  /**
   * Property 5: Hijri → Gregorian → Hijri Bidirectionality
   * 
   * For any Hijri date, converting to Gregorian and back should yield
   * the same Hijri date.
   */
  it('should maintain bidirectionality: Hijri → Gregorian → Hijri', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.integer({ min: 1300, max: 1500 }), // Hijri year
          fc.integer({ min: 1, max: 12 }),      // Hijri month
          fc.integer({ min: 1, max: 30 })       // Hijri day
        ),
        ([hYear, hMonth, hDay]: [number, number, number]) => {
          // Convert Hijri to Gregorian
          const gregorianDate = JalaliCalendarUtils.hijriToGregorian(hYear, hMonth, hDay);

          // Convert back to Hijri
          const convertedBack = JalaliCalendarUtils.gregorianToHijri(gregorianDate);

          // Check that the Hijri date is the same
          expect(hYear).toBe(convertedBack.year);
          expect(hMonth).toBe(convertedBack.month);
          expect(hDay).toBe(convertedBack.day);
        }
      ),
      { numRuns: 1000 }
    );
  });

  /**
   * Property 6: Date Conversion Consistency Across Multiple Years
   * 
   * Verify that date conversions are consistent across a wide range of years
   * and don't have edge case failures.
   */
  it('should maintain consistency across multiple years', () => {
    fc.assert(
      fc.property(
        fc.date({
          min: new Date(1600, 0, 1),
          max: new Date(2200, 11, 31)
        }),
        (gregorianDate: Date) => {
          // Convert to Jalali
          const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);

          // Verify Jalali date components are valid
          expect(jalaliDate.year).toBeGreaterThan(0);
          expect(jalaliDate.month).toBeGreaterThanOrEqual(1);
          expect(jalaliDate.month).toBeLessThanOrEqual(12);
          expect(jalaliDate.day).toBeGreaterThanOrEqual(1);
          expect(jalaliDate.day).toBeLessThanOrEqual(31);

          // Convert back and verify
          const convertedBack = JalaliCalendarUtils.jalaliToGregorian(
            jalaliDate.year,
            jalaliDate.month,
            jalaliDate.day
          );

          expect(gregorianDate.getFullYear()).toBe(convertedBack.getFullYear());
          expect(gregorianDate.getMonth()).toBe(convertedBack.getMonth());
          expect(gregorianDate.getDate()).toBe(convertedBack.getDate());
        }
      ),
      { numRuns: 1000 }
    );
  });

  /**
   * Property 7: Leap Year Handling in Conversions
   * 
   * Verify that leap years are handled correctly in date conversions.
   */
  it('should handle leap years correctly in conversions', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1900, max: 2100 }),
        (year: number) => {
          // Test February 29 in leap years
          const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

          if (isLeapYear) {
            const leapDate = new Date(year, 1, 29, 12, 0, 0, 0); // Feb 29
            const jalaliDate = JalaliCalendarUtils.gregorianToJalali(leapDate);
            const convertedBack = JalaliCalendarUtils.jalaliToGregorian(
              jalaliDate.year,
              jalaliDate.month,
              jalaliDate.day
            );

            expect(leapDate.getFullYear()).toBe(convertedBack.getFullYear());
            expect(leapDate.getMonth()).toBe(convertedBack.getMonth());
            expect(leapDate.getDate()).toBe(convertedBack.getDate());
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Boundary Date Conversions
   * 
   * Verify that boundary dates (first and last days of months/years) are
   * converted correctly.
   */
  it('should handle boundary dates correctly', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1900, max: 2100 }),
        fc.integer({ min: 0, max: 11 }),
        (year: number, month: number) => {
          // Test first day of month
          const firstDay = new Date(year, month, 1, 12, 0, 0, 0);
          const jalaliFirst = JalaliCalendarUtils.gregorianToJalali(firstDay);
          const convertedFirstBack = JalaliCalendarUtils.jalaliToGregorian(
            jalaliFirst.year,
            jalaliFirst.month,
            jalaliFirst.day
          );

          expect(firstDay.getFullYear()).toBe(convertedFirstBack.getFullYear());
          expect(firstDay.getMonth()).toBe(convertedFirstBack.getMonth());
          expect(firstDay.getDate()).toBe(convertedFirstBack.getDate());

          // Test last day of month
          const lastDay = new Date(year, month + 1, 0, 12, 0, 0, 0);
          const jalaliLast = JalaliCalendarUtils.gregorianToJalali(lastDay);
          const convertedLastBack = JalaliCalendarUtils.jalaliToGregorian(
            jalaliLast.year,
            jalaliLast.month,
            jalaliLast.day
          );

          expect(lastDay.getFullYear()).toBe(convertedLastBack.getFullYear());
          expect(lastDay.getMonth()).toBe(convertedLastBack.getMonth());
          expect(lastDay.getDate()).toBe(convertedLastBack.getDate());
        }
      ),
      { numRuns: 500 }
    );
  });
});
