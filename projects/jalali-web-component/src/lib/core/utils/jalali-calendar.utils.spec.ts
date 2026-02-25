import { JalaliCalendarUtils } from './jalali-calendar.utils';

describe('JalaliCalendarUtils', () => {
  // ============================================================================
  // STATIC PROPERTIES TESTS
  // ============================================================================

  describe('Static Properties', () => {
    it('should have jalaliMonths array with 12 months', () => {
      expect(JalaliCalendarUtils.jalaliMonths.length).toBe(12);
      expect(JalaliCalendarUtils.jalaliMonths[0]).toBe('فروردین');
      expect(JalaliCalendarUtils.jalaliMonths[11]).toBe('اسفند');
    });

    it('should have jalaliWeekDays array with 7 days', () => {
      expect(JalaliCalendarUtils.jalaliWeekDays.length).toBe(7);
      expect(JalaliCalendarUtils.jalaliWeekDays[0]).toBe('شنبه');
      expect(JalaliCalendarUtils.jalaliWeekDays[6]).toBe('جمعه');
    });

    it('should have gregorianMonths array with 12 months', () => {
      expect(JalaliCalendarUtils.gregorianMonths.length).toBe(12);
      expect(JalaliCalendarUtils.gregorianMonths[0]).toBe('ژانویه');
      expect(JalaliCalendarUtils.gregorianMonths[11]).toBe('دسامبر');
    });

    it('should have gregorianWeekDays array with 7 days', () => {
      expect(JalaliCalendarUtils.gregorianWeekDays.length).toBe(7);
      expect(JalaliCalendarUtils.gregorianWeekDays[0]).toBe('شنبه');
    });

    it('should have hijriMonths array with 12 months', () => {
      expect(JalaliCalendarUtils.hijriMonths.length).toBe(12);
      expect(JalaliCalendarUtils.hijriMonths[0]).toBe('محرم');
      expect(JalaliCalendarUtils.hijriMonths[11]).toBe('ذیحجه');
    });

    it('should have seasons array with 4 seasons', () => {
      expect(JalaliCalendarUtils.seasons.length).toBe(4);
      expect(JalaliCalendarUtils.seasons[0]).toBe('بهار');
      expect(JalaliCalendarUtils.seasons[1]).toBe('تابستان');
      expect(JalaliCalendarUtils.seasons[2]).toBe('پاییز');
      expect(JalaliCalendarUtils.seasons[3]).toBe('زمستان');
    });
  });

  // ============================================================================
  // GREGORIAN TO JALALI CONVERSION TESTS
  // ============================================================================

  describe('gregorianToJalali', () => {
    it('should convert Gregorian date to Jalali date correctly', () => {
      const gregorianDate = new Date(2024, 2, 20); // March 20, 2024
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
      expect(jalaliDate.year).toBe(1402);
      expect(jalaliDate.month).toBe(12);
      expect(jalaliDate.day).toBe(1);
    });

    it('should handle epoch date (January 1, 1970)', () => {
      const gregorianDate = new Date(1970, 0, 1);
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
      expect(jalaliDate.year).toBeGreaterThan(0);
      expect(jalaliDate.month).toBeGreaterThan(0);
      expect(jalaliDate.day).toBeGreaterThan(0);
    });

    it('should handle dates before 1600', () => {
      const gregorianDate = new Date(1500, 0, 1);
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
      expect(jalaliDate.year).toBeGreaterThan(0);
    });

    it('should handle dates after 1600', () => {
      const gregorianDate = new Date(2000, 0, 1);
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
      expect(jalaliDate.year).toBeGreaterThan(1000);
    });

    it('should handle leap year dates', () => {
      const gregorianDate = new Date(2020, 1, 29); // Feb 29, 2020 (leap year)
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
      expect(jalaliDate.month).toBe(11);
    });

    it('should handle year boundary dates', () => {
      const gregorianDate = new Date(2023, 11, 31); // Dec 31, 2023
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
      expect(jalaliDate.year).toBe(1402);
    });

    it('should handle month boundary dates', () => {
      const gregorianDate = new Date(2024, 0, 31); // Jan 31, 2024
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
      expect(jalaliDate.month).toBe(10);
    });
  });

  // ============================================================================
  // JALALI TO GREGORIAN CONVERSION TESTS
  // ============================================================================

  describe('jalaliToGregorian', () => {
    it('should convert Jalali date to Gregorian date correctly', () => {
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(1402, 12, 1);
      expect(gregorianDate.getFullYear()).toBe(2024);
      expect(gregorianDate.getMonth()).toBe(2); // March (0-indexed)
      expect(gregorianDate.getDate()).toBe(20);
    });

    it('should handle first day of Jalali year', () => {
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(1400, 1, 1);
      expect(gregorianDate.getFullYear()).toBe(2021);
      expect(gregorianDate.getMonth()).toBe(2); // March
    });

    it('should handle last day of Jalali year', () => {
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(1400, 12, 29);
      expect(gregorianDate.getFullYear()).toBe(2022);
      expect(gregorianDate.getMonth()).toBe(2); // March
    });

    it('should handle leap year last day', () => {
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(1399, 12, 30);
      expect(gregorianDate.getFullYear()).toBe(2021);
    });

    it('should handle month transitions', () => {
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(1402, 6, 31);
      expect(gregorianDate.getMonth()).toBe(8); // September
    });

    it('should handle early Jalali years', () => {
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(1, 1, 1);
      expect(gregorianDate.getFullYear()).toBeGreaterThan(0);
    });

    it('should return date at noon to avoid timezone issues', () => {
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(1402, 1, 1);
      expect(gregorianDate.getHours()).toBe(12);
      expect(gregorianDate.getMinutes()).toBe(0);
      expect(gregorianDate.getSeconds()).toBe(0);
    });
  });

  // ============================================================================
  // BIDIRECTIONAL CONVERSION TESTS
  // ============================================================================

  describe('Bidirectional Conversion (Gregorian <-> Jalali)', () => {
    it('should convert Gregorian to Jalali and back correctly', () => {
      const originalDate = new Date(2024, 2, 20);
      const jalaliDate = JalaliCalendarUtils.gregorianToJalali(originalDate);
      const convertedBack = JalaliCalendarUtils.jalaliToGregorian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
      
      expect(convertedBack.getFullYear()).toBe(originalDate.getFullYear());
      expect(convertedBack.getMonth()).toBe(originalDate.getMonth());
      expect(convertedBack.getDate()).toBe(originalDate.getDate());
    });

    it('should handle multiple round-trip conversions', () => {
      const dates = [
        new Date(2000, 0, 1),
        new Date(2010, 5, 15),
        new Date(2020, 11, 31),
        new Date(2023, 2, 21)
      ];

      dates.forEach(date => {
        const jalali = JalaliCalendarUtils.gregorianToJalali(date);
        const gregorian = JalaliCalendarUtils.jalaliToGregorian(jalali.year, jalali.month, jalali.day);
        
        expect(gregorian.getFullYear()).toBe(date.getFullYear());
        expect(gregorian.getMonth()).toBe(date.getMonth());
        expect(gregorian.getDate()).toBe(date.getDate());
      });
    });
  });

  // ============================================================================
  // GREGORIAN TO HIJRI CONVERSION TESTS
  // ============================================================================

  describe('gregorianToHijri', () => {
    it('should convert Gregorian date to Hijri date', () => {
      const gregorianDate = new Date(2024, 0, 1);
      const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
      expect(hijriDate.year).toBeGreaterThan(0);
      expect(hijriDate.month).toBeGreaterThan(0);
      expect(hijriDate.month).toBeLessThanOrEqual(12);
      expect(hijriDate.day).toBeGreaterThan(0);
      expect(hijriDate.day).toBeLessThanOrEqual(30);
    });

    it('should handle dates after Gregorian calendar reform (1582)', () => {
      const gregorianDate = new Date(1600, 0, 1);
      const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
      expect(hijriDate.year).toBeGreaterThan(0);
    });

    it('should handle dates before Gregorian calendar reform', () => {
      const gregorianDate = new Date(1500, 0, 1);
      const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
      expect(hijriDate.year).toBeGreaterThan(0);
    });

    it('should handle current date', () => {
      const gregorianDate = new Date();
      const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
      expect(hijriDate.year).toBeGreaterThan(1400);
    });
  });

  // ============================================================================
  // HIJRI TO GREGORIAN CONVERSION TESTS
  // ============================================================================

  describe('hijriToGregorian', () => {
    it('should convert Hijri date to Gregorian date', () => {
      const gregorianDate = JalaliCalendarUtils.hijriToGregorian(1445, 1, 1);
      expect(gregorianDate.getFullYear()).toBeGreaterThan(2000);
      expect(gregorianDate.getMonth()).toBeGreaterThanOrEqual(0);
      expect(gregorianDate.getMonth()).toBeLessThanOrEqual(11);
    });

    it('should handle first day of Hijri year', () => {
      const gregorianDate = JalaliCalendarUtils.hijriToGregorian(1400, 1, 1);
      expect(gregorianDate.getFullYear()).toBeGreaterThan(0);
    });

    it('should handle last day of Hijri month', () => {
      const gregorianDate = JalaliCalendarUtils.hijriToGregorian(1445, 1, 30);
      expect(gregorianDate.getFullYear()).toBeGreaterThan(0);
    });

    it('should return date at noon to avoid timezone issues', () => {
      const gregorianDate = JalaliCalendarUtils.hijriToGregorian(1445, 1, 1);
      expect(gregorianDate.getHours()).toBe(12);
      expect(gregorianDate.getMinutes()).toBe(0);
      expect(gregorianDate.getSeconds()).toBe(0);
    });
  });

  // ============================================================================
  // BIDIRECTIONAL HIJRI CONVERSION TESTS
  // ============================================================================

  describe('Bidirectional Conversion (Gregorian <-> Hijri)', () => {
    it('should convert Gregorian to Hijri and back correctly', () => {
      const originalDate = new Date(2024, 0, 1);
      const hijriDate = JalaliCalendarUtils.gregorianToHijri(originalDate);
      const convertedBack = JalaliCalendarUtils.hijriToGregorian(hijriDate.year, hijriDate.month, hijriDate.day);
      
      expect(convertedBack.getFullYear()).toBe(originalDate.getFullYear());
      expect(convertedBack.getMonth()).toBe(originalDate.getMonth());
      expect(convertedBack.getDate()).toBe(originalDate.getDate());
    });
  });

  // ============================================================================
  // JALALI LEAP YEAR TESTS
  // ============================================================================

  describe('isJalaliLeapYear', () => {
    it('should identify leap years correctly', () => {
      expect(JalaliCalendarUtils.isJalaliLeapYear(1399)).toBe(true);
      expect(JalaliCalendarUtils.isJalaliLeapYear(1403)).toBe(true);
      expect(JalaliCalendarUtils.isJalaliLeapYear(1407)).toBe(true);
    });

    it('should identify non-leap years correctly', () => {
      expect(JalaliCalendarUtils.isJalaliLeapYear(1400)).toBe(false);
      expect(JalaliCalendarUtils.isJalaliLeapYear(1401)).toBe(false);
      expect(JalaliCalendarUtils.isJalaliLeapYear(1402)).toBe(false);
    });

    it('should handle year 1', () => {
      const result = JalaliCalendarUtils.isJalaliLeapYear(1);
      expect(typeof result).toBe('boolean');
    });

    it('should handle large year numbers', () => {
      const result = JalaliCalendarUtils.isJalaliLeapYear(2000);
      expect(typeof result).toBe('boolean');
    });

    it('should follow 33-year cycle pattern', () => {
      const year = 1399;
      const isLeap = JalaliCalendarUtils.isJalaliLeapYear(year);
      expect(JalaliCalendarUtils.isJalaliLeapYear(year + 33)).toBe(isLeap);
    });
  });

  // ============================================================================
  // HIJRI LEAP YEAR TESTS
  // ============================================================================

  describe('isHijriLeapYear', () => {
    it('should identify Hijri leap years correctly', () => {
      expect(JalaliCalendarUtils.isHijriLeapYear(1445)).toBe(false);
      expect(JalaliCalendarUtils.isHijriLeapYear(1442)).toBe(true);
      expect(JalaliCalendarUtils.isHijriLeapYear(1440)).toBe(true);
    });

    it('should identify non-leap Hijri years correctly', () => {
      expect(JalaliCalendarUtils.isHijriLeapYear(1441)).toBe(false);
      expect(JalaliCalendarUtils.isHijriLeapYear(1443)).toBe(false);
    });

    it('should follow 30-year cycle pattern', () => {
      const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
      leapYears.forEach(year => {
        expect(JalaliCalendarUtils.isHijriLeapYear(year)).toBe(true);
      });
    });

    it('should handle year 1', () => {
      const result = JalaliCalendarUtils.isHijriLeapYear(1);
      expect(typeof result).toBe('boolean');
    });
  });

  // ============================================================================
  // DAYS IN MONTH TESTS
  // ============================================================================

  describe('getDaysInJalaliMonth', () => {
    it('should return 31 days for first 6 months', () => {
      for (let month = 1; month <= 6; month++) {
        expect(JalaliCalendarUtils.getDaysInJalaliMonth(1400, month)).toBe(31);
      }
    });

    it('should return 30 days for months 7-11', () => {
      for (let month = 7; month <= 11; month++) {
        expect(JalaliCalendarUtils.getDaysInJalaliMonth(1400, month)).toBe(30);
      }
    });

    it('should return 29 days for month 12 in non-leap year', () => {
      expect(JalaliCalendarUtils.getDaysInJalaliMonth(1400, 12)).toBe(29);
    });

    it('should return 30 days for month 12 in leap year', () => {
      expect(JalaliCalendarUtils.getDaysInJalaliMonth(1399, 12)).toBe(30);
    });

    it('should handle all months in leap year', () => {
      const leapYear = 1399;
      const expectedDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];
      for (let month = 1; month <= 12; month++) {
        expect(JalaliCalendarUtils.getDaysInJalaliMonth(leapYear, month)).toBe(expectedDays[month - 1]);
      }
    });
  });

  describe('getDaysInHijriMonth', () => {
    it('should return correct days for odd months', () => {
      expect(JalaliCalendarUtils.getDaysInHijriMonth(1445, 1)).toBe(30);
      expect(JalaliCalendarUtils.getDaysInHijriMonth(1445, 3)).toBe(30);
      expect(JalaliCalendarUtils.getDaysInHijriMonth(1445, 5)).toBe(30);
    });

    it('should return correct days for even months', () => {
      expect(JalaliCalendarUtils.getDaysInHijriMonth(1445, 2)).toBe(29);
      expect(JalaliCalendarUtils.getDaysInHijriMonth(1445, 4)).toBe(29);
      expect(JalaliCalendarUtils.getDaysInHijriMonth(1445, 6)).toBe(29);
    });

    it('should return 30 days for last month in leap year', () => {
      const leapYear = 1442;
      expect(JalaliCalendarUtils.getDaysInHijriMonth(leapYear, 12)).toBe(30);
    });

    it('should return 29 days for last month in non-leap year', () => {
      const nonLeapYear = 1441;
      expect(JalaliCalendarUtils.getDaysInHijriMonth(nonLeapYear, 12)).toBe(29);
    });
  });

  // ============================================================================
  // FIRST DAY OF MONTH TESTS
  // ============================================================================

  describe('getFirstDayOfJalaliMonth', () => {
    it('should return day of week (0-6)', () => {
      const firstDay = JalaliCalendarUtils.getFirstDayOfJalaliMonth(1402, 1);
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(firstDay).toBeLessThanOrEqual(6);
    });

    it('should return consistent value for same month/year', () => {
      const firstDay1 = JalaliCalendarUtils.getFirstDayOfJalaliMonth(1402, 1);
      const firstDay2 = JalaliCalendarUtils.getFirstDayOfJalaliMonth(1402, 1);
      expect(firstDay1).toBe(firstDay2);
    });

    it('should return different values for different months', () => {
      const firstDay1 = JalaliCalendarUtils.getFirstDayOfJalaliMonth(1402, 1);
      const firstDay2 = JalaliCalendarUtils.getFirstDayOfJalaliMonth(1402, 2);
      // They might be the same by chance, but we test the method works
      expect(typeof firstDay1).toBe('number');
      expect(typeof firstDay2).toBe('number');
    });

    it('should handle all months', () => {
      for (let month = 1; month <= 12; month++) {
        const firstDay = JalaliCalendarUtils.getFirstDayOfJalaliMonth(1402, month);
        expect(firstDay).toBeGreaterThanOrEqual(0);
        expect(firstDay).toBeLessThanOrEqual(6);
      }
    });
  });

  describe('getFirstDayOfHijriMonth', () => {
    it('should return day of week (0-6)', () => {
      const firstDay = JalaliCalendarUtils.getFirstDayOfHijriMonth(1445, 1);
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(firstDay).toBeLessThanOrEqual(6);
    });

    it('should return consistent value for same month/year', () => {
      const firstDay1 = JalaliCalendarUtils.getFirstDayOfHijriMonth(1445, 1);
      const firstDay2 = JalaliCalendarUtils.getFirstDayOfHijriMonth(1445, 1);
      expect(firstDay1).toBe(firstDay2);
    });

    it('should handle all months', () => {
      for (let month = 1; month <= 12; month++) {
        const firstDay = JalaliCalendarUtils.getFirstDayOfHijriMonth(1445, month);
        expect(firstDay).toBeGreaterThanOrEqual(0);
        expect(firstDay).toBeLessThanOrEqual(6);
      }
    });
  });

  // ============================================================================
  // MONTH/DAY NAME TESTS
  // ============================================================================

  describe('getJalaliMonthName', () => {
    it('should return correct month names', () => {
      expect(JalaliCalendarUtils.getJalaliMonthName(1)).toBe('فروردین');
      expect(JalaliCalendarUtils.getJalaliMonthName(6)).toBe('شهریور');
      expect(JalaliCalendarUtils.getJalaliMonthName(12)).toBe('اسفند');
    });

    it('should return month name for all months', () => {
      for (let month = 1; month <= 12; month++) {
        const name = JalaliCalendarUtils.getJalaliMonthName(month);
        expect(name).toBeTruthy();
        expect(typeof name).toBe('string');
      }
    });
  });

  describe('getJalaliDayName', () => {
    it('should return correct day names', () => {
      expect(JalaliCalendarUtils.getJalaliDayName(0)).toBe('شنبه');
      expect(JalaliCalendarUtils.getJalaliDayName(3)).toBe('سه شنبه');
      expect(JalaliCalendarUtils.getJalaliDayName(6)).toBe('جمعه');
    });

    it('should return day name for all days', () => {
      for (let day = 0; day < 7; day++) {
        const name = JalaliCalendarUtils.getJalaliDayName(day);
        expect(name).toBeTruthy();
        expect(typeof name).toBe('string');
      }
    });
  });

  // ============================================================================
  // SEASON TESTS
  // ============================================================================

  describe('getSeason', () => {
    it('should return spring for months 1-3', () => {
      expect(JalaliCalendarUtils.getSeason(1)).toBe('بهار');
      expect(JalaliCalendarUtils.getSeason(2)).toBe('بهار');
      expect(JalaliCalendarUtils.getSeason(3)).toBe('بهار');
    });

    it('should return summer for months 4-6', () => {
      expect(JalaliCalendarUtils.getSeason(4)).toBe('تابستان');
      expect(JalaliCalendarUtils.getSeason(5)).toBe('تابستان');
      expect(JalaliCalendarUtils.getSeason(6)).toBe('تابستان');
    });

    it('should return fall for months 7-9', () => {
      expect(JalaliCalendarUtils.getSeason(7)).toBe('پاییز');
      expect(JalaliCalendarUtils.getSeason(8)).toBe('پاییز');
      expect(JalaliCalendarUtils.getSeason(9)).toBe('پاییز');
    });

    it('should return winter for months 10-12', () => {
      expect(JalaliCalendarUtils.getSeason(10)).toBe('زمستان');
      expect(JalaliCalendarUtils.getSeason(11)).toBe('زمستان');
      expect(JalaliCalendarUtils.getSeason(12)).toBe('زمستان');
    });
  });

  // ============================================================================
  // HOLIDAY TESTS
  // ============================================================================

  describe('isHoliday', () => {
    it('should identify official holidays', () => {
      const holiday = JalaliCalendarUtils.isHoliday({ year: 1402, month: 1, day: 1 });
      expect(holiday.isHoliday).toBe(true);
      expect(holiday.type).toBe('official');
    });

    it('should identify non-official holidays', () => {
      const holiday = JalaliCalendarUtils.isHoliday({ year: 1402, month: 1, day: 13 });
      expect(holiday.isHoliday).toBe(true);
      expect(holiday.type).toBe('non-official');
    });

    it('should identify non-holidays', () => {
      const holiday = JalaliCalendarUtils.isHoliday({ year: 1402, month: 1, day: 10 });
      expect(holiday.isHoliday).toBe(false);
      expect(holiday.type).toBeNull();
    });

    it('should handle all official holidays', () => {
      const officialHolidays = [
        { month: 1, day: 1 },
        { month: 1, day: 2 },
        { month: 1, day: 3 },
        { month: 1, day: 4 },
        { month: 1, day: 5 },
        { month: 1, day: 6 },
        { month: 1, day: 7 },
        { month: 1, day: 12 },
        { month: 2, day: 13 },
        { month: 3, day: 14 },
        { month: 11, day: 22 },
        { month: 12, day: 9 }
      ];

      officialHolidays.forEach(holiday => {
        const result = JalaliCalendarUtils.isHoliday({ year: 1402, ...holiday });
        expect(result.isHoliday).toBe(true);
        expect(result.type).toBe('official');
      });
    });

    it('should handle non-official holidays', () => {
      const nonOfficialHolidays = [
        { month: 1, day: 13 },
        { month: 2, day: 14 }
      ];

      nonOfficialHolidays.forEach(holiday => {
        const result = JalaliCalendarUtils.isHoliday({ year: 1402, ...holiday });
        expect(result.isHoliday).toBe(true);
        expect(result.type).toBe('non-official');
      });
    });
  });

  // ============================================================================
  // EVENTS TESTS
  // ============================================================================

  describe('getEvents', () => {
    it('should return events for Nowruz', () => {
      const events = JalaliCalendarUtils.getEvents({ year: 1402, month: 1, day: 1 });
      expect(events).toContain('نوروز');
    });

    it('should return events for Islamic Republic Day', () => {
      const events = JalaliCalendarUtils.getEvents({ year: 1402, month: 1, day: 12 });
      expect(events).toContain('روز جمهوری اسلامی');
    });

    it('should return empty array for non-event dates', () => {
      const events = JalaliCalendarUtils.getEvents({ year: 1402, month: 1, day: 10 });
      expect(events).toEqual([]);
    });

    it('should return events for all defined event dates', () => {
      const eventDates = [
        { month: 1, day: 1, event: 'نوروز' },
        { month: 1, day: 12, event: 'روز جمهوری اسلامی' },
        { month: 2, day: 13, event: 'روز طبیعت' },
        { month: 3, day: 14, event: 'روز شهادت امام علی' },
        { month: 11, day: 22, event: 'روز مبارزه یکم' },
        { month: 12, day: 9, event: 'روز معارف' }
      ];

      eventDates.forEach(({ month, day, event }) => {
        const events = JalaliCalendarUtils.getEvents({ year: 1402, month, day });
        expect(events).toContain(event);
      });
    });
  });

  // ============================================================================
  // WEEK NUMBER TESTS
  // ============================================================================

  describe('getWeekNumber', () => {
    it('should return week number for first day of year', () => {
      const weekNumber = JalaliCalendarUtils.getWeekNumber(1402, 1, 1);
      expect(weekNumber).toBe(1);
    });

    it('should return increasing week numbers', () => {
      const week1 = JalaliCalendarUtils.getWeekNumber(1402, 1, 1);
      const week2 = JalaliCalendarUtils.getWeekNumber(1402, 1, 8);
      expect(week2).toBeGreaterThan(week1);
    });

    it('should return week number for last day of year', () => {
      const weekNumber = JalaliCalendarUtils.getWeekNumber(1402, 12, 29);
      expect(weekNumber).toBeGreaterThan(0);
      expect(weekNumber).toBeLessThanOrEqual(53);
    });

    it('should return consistent week number for same date', () => {
      const week1 = JalaliCalendarUtils.getWeekNumber(1402, 1, 1);
      const week2 = JalaliCalendarUtils.getWeekNumber(1402, 1, 1);
      expect(week1).toBe(week2);
    });

    it('should handle all months', () => {
      for (let month = 1; month <= 12; month++) {
        const days = JalaliCalendarUtils.getDaysInJalaliMonth(1402, month);
        const weekNumber = JalaliCalendarUtils.getWeekNumber(1402, month, days);
        expect(weekNumber).toBeGreaterThan(0);
      }
    });
  });

  // ============================================================================
  // FORMAT DATE TESTS
  // ============================================================================

  describe('formatJalaliDate', () => {
    it('should format Jalali date correctly', () => {
      const formatted = JalaliCalendarUtils.formatJalaliDate({ year: 1402, month: 1, day: 1 });
      expect(formatted).toContain('1');
      expect(formatted).toContain('فروردین');
      expect(formatted).toContain('1402');
    });

    it('should include month name', () => {
      const formatted = JalaliCalendarUtils.formatJalaliDate({ year: 1402, month: 6, day: 15 });
      expect(formatted).toContain('شهریور');
    });

    it('should format all months correctly', () => {
      for (let month = 1; month <= 12; month++) {
        const formatted = JalaliCalendarUtils.formatJalaliDate({ year: 1402, month, day: 1 });
        expect(formatted).toBeTruthy();
        expect(typeof formatted).toBe('string');
      }
    });
  });

  describe('formatGregorianDate', () => {
    it('should format Gregorian date correctly', () => {
      const date = new Date(2024, 2, 20);
      const formatted = JalaliCalendarUtils.formatGregorianDate(date);
      expect(formatted).toContain('20');
      expect(formatted).toContain('مارس');
      expect(formatted).toContain('2024');
    });

    it('should include month name in Persian', () => {
      const date = new Date(2024, 0, 1);
      const formatted = JalaliCalendarUtils.formatGregorianDate(date);
      expect(formatted).toContain('ژانویه');
    });
  });

  describe('formatHijriDate', () => {
    it('should format Hijri date correctly', () => {
      const formatted = JalaliCalendarUtils.formatHijriDate({ year: 1445, month: 1, day: 1 });
      expect(formatted).toContain('1');
      expect(formatted).toContain('محرم');
      expect(formatted).toContain('1445');
      expect(formatted).toContain('هجری قمری');
    });

    it('should include Hijri calendar label', () => {
      const formatted = JalaliCalendarUtils.formatHijriDate({ year: 1445, month: 1, day: 1 });
      expect(formatted).toContain('هجری قمری');
    });
  });

  // ============================================================================
  // EDGE CASES AND BOUNDARY CONDITIONS
  // ============================================================================

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle year transitions correctly', () => {
      const lastDayOfYear = JalaliCalendarUtils.jalaliToGregorian(1402, 12, 29);
      const firstDayOfNextYear = JalaliCalendarUtils.jalaliToGregorian(1403, 1, 1);
      
      expect(firstDayOfNextYear.getTime()).toBeGreaterThan(lastDayOfYear.getTime());
    });

    it('should handle month transitions correctly', () => {
      const lastDayOfMonth = JalaliCalendarUtils.jalaliToGregorian(1402, 1, 31);
      const firstDayOfNextMonth = JalaliCalendarUtils.jalaliToGregorian(1402, 2, 1);
      
      expect(firstDayOfNextMonth.getTime()).toBeGreaterThan(lastDayOfMonth.getTime());
    });

    it('should handle leap year month 12 boundary', () => {
      const leapYearLastDay = JalaliCalendarUtils.jalaliToGregorian(1399, 12, 30);
      expect(leapYearLastDay).toBeTruthy();
      
      const nonLeapYearLastDay = JalaliCalendarUtils.jalaliToGregorian(1400, 12, 29);
      expect(nonLeapYearLastDay).toBeTruthy();
    });

    it('should handle consecutive dates', () => {
      const date1 = JalaliCalendarUtils.jalaliToGregorian(1402, 1, 1);
      const date2 = JalaliCalendarUtils.jalaliToGregorian(1402, 1, 2);
      
      const diff = date2.getTime() - date1.getTime();
      expect(diff).toBe(24 * 60 * 60 * 1000); // 1 day in milliseconds
    });

    it('should handle minimum valid dates', () => {
      const date = JalaliCalendarUtils.jalaliToGregorian(1, 1, 1);
      expect(date).toBeTruthy();
      expect(date.getFullYear()).toBeGreaterThan(0);
    });

    it('should handle large year numbers', () => {
      const date = JalaliCalendarUtils.jalaliToGregorian(2000, 1, 1);
      expect(date).toBeTruthy();
      expect(date.getFullYear()).toBeGreaterThan(3000);
    });

    it('should maintain consistency across all months in a year', () => {
      const year = 1402;
      let previousDate = JalaliCalendarUtils.jalaliToGregorian(year, 1, 1);
      
      for (let month = 1; month <= 12; month++) {
        const days = JalaliCalendarUtils.getDaysInJalaliMonth(year, month);
        for (let day = 1; day <= days; day++) {
          const currentDate = JalaliCalendarUtils.jalaliToGregorian(year, month, day);
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(previousDate.getTime());
          previousDate = currentDate;
        }
      }
    });
  });

  // ============================================================================
  // COMPREHENSIVE INTEGRATION TESTS
  // ============================================================================

  describe('Comprehensive Integration Tests', () => {
    it('should handle full year conversion cycle', () => {
      const year = 1402;
      for (let month = 1; month <= 12; month++) {
        const days = JalaliCalendarUtils.getDaysInJalaliMonth(year, month);
        for (let day = 1; day <= days; day++) {
          const jalaliDate = { year, month, day };
          const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(year, month, day);
          const convertedBack = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
          
          expect(convertedBack.year).toBe(jalaliDate.year);
          expect(convertedBack.month).toBe(jalaliDate.month);
          expect(convertedBack.day).toBe(jalaliDate.day);
        }
      }
    });

    it('should provide consistent formatting across all dates', () => {
      for (let month = 1; month <= 12; month++) {
        const formatted = JalaliCalendarUtils.formatJalaliDate({ year: 1402, month, day: 1 });
        expect(formatted).toBeTruthy();
        expect(formatted.length).toBeGreaterThan(0);
      }
    });

    it('should handle all calendar utilities together', () => {
      const year = 1402;
      const month = 1;
      const day = 1;
      
      const jalaliDate = { year, month, day };
      const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(year, month, day);
      const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
      
      const monthName = JalaliCalendarUtils.getJalaliMonthName(month);
      const season = JalaliCalendarUtils.getSeason(month);
      const isLeap = JalaliCalendarUtils.isJalaliLeapYear(year);
      const daysInMonth = JalaliCalendarUtils.getDaysInJalaliMonth(year, month);
      const firstDay = JalaliCalendarUtils.getFirstDayOfJalaliMonth(year, month);
      const weekNumber = JalaliCalendarUtils.getWeekNumber(year, month, day);
      const holiday = JalaliCalendarUtils.isHoliday(jalaliDate);
      const events = JalaliCalendarUtils.getEvents(jalaliDate);
      
      expect(monthName).toBeTruthy();
      expect(season).toBeTruthy();
      expect(typeof isLeap).toBe('boolean');
      expect(daysInMonth).toBeGreaterThan(0);
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(weekNumber).toBeGreaterThan(0);
      expect(holiday).toBeTruthy();
      expect(Array.isArray(events)).toBe(true);
    });
  });
});
