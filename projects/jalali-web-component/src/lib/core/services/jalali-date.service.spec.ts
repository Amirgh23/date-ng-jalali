import { JalaliDateService } from './jalali-date.service';

describe('JalaliDateService', () => {
  let service: JalaliDateService;

  beforeEach(() => {
    service = new JalaliDateService('fa');
  });

  describe('Initialization', () => {
    it('should create service with default locale', () => {
      const newService = new JalaliDateService();
      expect(newService.getLocale()).toBe('fa');
    });

    it('should create service with specified locale', () => {
      const newService = new JalaliDateService('en');
      expect(newService.getLocale()).toBe('en');
    });
  });

  describe('Locale Management', () => {
    it('should set and get locale', () => {
      service.setLocale('en');
      expect(service.getLocale()).toBe('en');

      service.setLocale('fa');
      expect(service.getLocale()).toBe('fa');
    });

    it('should clear cache when locale changes', () => {
      const date = new Date(2024, 0, 15);
      const result1 = service.gregorianToJalali(date);
      service.setLocale('en');
      const result2 = service.gregorianToJalali(date);
      expect(result1.formatted).not.toBe(result2.formatted);
    });
  });

  describe('Gregorian to Jalali Conversion', () => {
    it('should convert Gregorian date to Jalali', () => {
      const gregorianDate = new Date(2024, 0, 15); // January 15, 2024
      const jalaliDate = service.gregorianToJalali(gregorianDate);

      expect(jalaliDate.year).toBe(1402);
      expect(jalaliDate.month).toBe(10);
      expect(jalaliDate.day).toBe(25);
    });

    it('should include month name in Jalali date', () => {
      const gregorianDate = new Date(2024, 0, 15);
      const jalaliDate = service.gregorianToJalali(gregorianDate);

      expect(jalaliDate.monthName).toBe('دی');
    });

    it('should include day name in Jalali date', () => {
      const gregorianDate = new Date(2024, 0, 15); // Monday
      const jalaliDate = service.gregorianToJalali(gregorianDate);

      expect(jalaliDate.dayName).toBeDefined();
      expect(jalaliDate.dayName.length).toBeGreaterThan(0);
    });

    it('should cache Gregorian to Jalali conversions', () => {
      const gregorianDate = new Date(2024, 0, 15);
      const result1 = service.gregorianToJalali(gregorianDate);
      const result2 = service.gregorianToJalali(gregorianDate);

      expect(result1).toEqual(result2);
    });

    it('should handle different years', () => {
      const date1 = new Date(2000, 0, 1);
      const date2 = new Date(2050, 11, 31);

      const jalali1 = service.gregorianToJalali(date1);
      const jalali2 = service.gregorianToJalali(date2);

      expect(jalali1.year).toBeLessThan(jalali2.year);
    });
  });

  describe('Jalali to Gregorian Conversion', () => {
    it('should convert Jalali date to Gregorian', () => {
      const gregorianDate = service.jalaliToGregorian(1402, 10, 25);

      expect(gregorianDate.year).toBe(2024);
      expect(gregorianDate.month).toBe(1);
      expect(gregorianDate.day).toBe(15);
    });

    it('should include month name in Gregorian date', () => {
      const gregorianDate = service.jalaliToGregorian(1402, 10, 25);

      expect(gregorianDate.monthName).toBeDefined();
      expect(gregorianDate.monthName.length).toBeGreaterThan(0);
    });

    it('should cache Jalali to Gregorian conversions', () => {
      const result1 = service.jalaliToGregorian(1402, 10, 25);
      const result2 = service.jalaliToGregorian(1402, 10, 25);

      expect(result1).toEqual(result2);
    });
  });

  describe('Gregorian to Hijri Conversion', () => {
    it('should convert Gregorian date to Hijri', () => {
      const gregorianDate = new Date(2024, 0, 15);
      const hijriDate = service.gregorianToHijri(gregorianDate);

      expect(hijriDate.year).toBeDefined();
      expect(hijriDate.month).toBeDefined();
      expect(hijriDate.day).toBeDefined();
      expect(hijriDate.year).toBeGreaterThan(1400);
    });

    it('should include month name in Hijri date', () => {
      const gregorianDate = new Date(2024, 0, 15);
      const hijriDate = service.gregorianToHijri(gregorianDate);

      expect(hijriDate.monthName).toBeDefined();
      expect(hijriDate.monthName.length).toBeGreaterThan(0);
    });

    it('should cache Gregorian to Hijri conversions', () => {
      const gregorianDate = new Date(2024, 0, 15);
      const result1 = service.gregorianToHijri(gregorianDate);
      const result2 = service.gregorianToHijri(gregorianDate);

      expect(result1).toEqual(result2);
    });
  });

  describe('Hijri to Gregorian Conversion', () => {
    it('should convert Hijri date to Gregorian', () => {
      const gregorianDate = service.hijriToGregorian(1445, 7, 15);

      expect(gregorianDate).toBeInstanceOf(Date);
      expect(gregorianDate.getFullYear()).toBeGreaterThan(2000);
    });
  });

  describe('Day Information', () => {
    it('should get complete day information', () => {
      const gregorianDate = new Date(2024, 0, 15);
      const dayInfo = service.getDayInfo(gregorianDate);

      expect(dayInfo.jalali).toBeDefined();
      expect(dayInfo.gregorian).toBeDefined();
      expect(dayInfo.hijri).toBeDefined();
      expect(dayInfo.isHoliday).toBeDefined();
      expect(dayInfo.events).toBeDefined();
      expect(dayInfo.season).toBeDefined();
      expect(dayInfo.weekNumber).toBeDefined();
    });

    it('should cache day information', () => {
      const gregorianDate = new Date(2024, 0, 15);
      const result1 = service.getDayInfo(gregorianDate);
      const result2 = service.getDayInfo(gregorianDate);

      expect(result1).toEqual(result2);
    });
  });

  describe('Month Information', () => {
    it('should get days in Jalali month', () => {
      expect(service.getDaysInJalaliMonth(1402, 1)).toBe(31);
      expect(service.getDaysInJalaliMonth(1402, 7)).toBe(30);
      expect(service.getDaysInJalaliMonth(1402, 12)).toBe(29);
    });

    it('should get days in Gregorian month', () => {
      expect(service.getDaysInGregorianMonth(2024, 1)).toBe(31);
      expect(service.getDaysInGregorianMonth(2024, 2)).toBe(29); // Leap year
      expect(service.getDaysInGregorianMonth(2024, 4)).toBe(30);
    });

    it('should get days in Hijri month', () => {
      const days = service.getDaysInHijriMonth(1445, 1);
      expect(days).toBeGreaterThan(0);
      expect(days).toBeLessThanOrEqual(30);
    });

    it('should get first day of Jalali month', () => {
      const firstDay = service.getFirstDayOfJalaliMonth(1402, 1);
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(firstDay).toBeLessThan(7);
    });

    it('should get first day of Gregorian month', () => {
      const firstDay = service.getFirstDayOfGregorianMonth(2024, 1);
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(firstDay).toBeLessThan(7);
    });

    it('should get first day of Hijri month', () => {
      const firstDay = service.getFirstDayOfHijriMonth(1445, 1);
      expect(firstDay).toBeGreaterThanOrEqual(0);
      expect(firstDay).toBeLessThan(7);
    });
  });

  describe('Holiday and Events', () => {
    it('should identify holidays', () => {
      // Nowruz (1st of Farvardin)
      const isHoliday = service.isHoliday({ year: 1402, month: 1, day: 1 });
      expect(isHoliday).toBe(true);
    });

    it('should get events for a date', () => {
      const events = service.getEvents({ year: 1402, month: 1, day: 1 });
      expect(Array.isArray(events)).toBe(true);
    });
  });

  describe('Date Formatting', () => {
    it('should format date in short format', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatDate(date, 'short');

      expect(formatted).toMatch(/\d+\/\d+\/\d+/);
    });

    it('should format date in medium format', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatDate(date, 'medium');

      expect(formatted.length).toBeGreaterThan(0);
    });

    it('should format date in long format', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatDate(date, 'long');

      expect(formatted).toContain('هجری شمسی');
    });

    it('should format Jalali date with locale support', () => {
      const jalaliDate = { year: 1402, month: 10, day: 25 };

      service.setLocale('fa');
      const faPersian = service.formatJalaliDate(jalaliDate);

      service.setLocale('en');
      const enPersian = service.formatJalaliDate(jalaliDate);

      expect(faPersian).not.toBe(enPersian);
    });

    it('should format Gregorian date with locale support', () => {
      const date = new Date(2024, 0, 15);

      service.setLocale('fa');
      const faPersian = service.formatGregorianDate(date);

      service.setLocale('en');
      const enPersian = service.formatGregorianDate(date);

      expect(faPersian).not.toBe(enPersian);
    });

    it('should format Hijri date with locale support', () => {
      const hijriDate = { year: 1445, month: 7, day: 15 };

      service.setLocale('fa');
      const faPersian = service.formatHijriDate(hijriDate);

      service.setLocale('en');
      const enPersian = service.formatHijriDate(hijriDate);

      expect(faPersian).not.toBe(enPersian);
    });
  });

  describe('Date Comparison', () => {
    it('should compare dates correctly', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 20);

      expect(service.compareDates(date1, date2)).toBeLessThan(0);
      expect(service.compareDates(date2, date1)).toBeGreaterThan(0);
      expect(service.compareDates(date1, date1)).toBe(0);
    });

    it('should check if date is before another', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 20);

      expect(service.isBefore(date1, date2)).toBe(true);
      expect(service.isBefore(date2, date1)).toBe(false);
    });

    it('should check if date is after another', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 20);

      expect(service.isAfter(date2, date1)).toBe(true);
      expect(service.isAfter(date1, date2)).toBe(false);
    });

    it('should check if dates are the same day', () => {
      const date1 = new Date(2024, 0, 15, 10, 30);
      const date2 = new Date(2024, 0, 15, 20, 45);
      const date3 = new Date(2024, 0, 16);

      expect(service.isSameDay(date1, date2)).toBe(true);
      expect(service.isSameDay(date1, date3)).toBe(false);
    });

    it('should handle null dates in isSameDay', () => {
      const date = new Date(2024, 0, 15);

      expect(service.isSameDay(null as any, date)).toBe(false);
      expect(service.isSameDay(date, null as any)).toBe(false);
    });
  });

  describe('Date Arithmetic', () => {
    it('should add days to a date', () => {
      const date = new Date(2024, 0, 15);
      const result = service.addDays(date, 5);

      expect(result.getDate()).toBe(20);
    });

    it('should add months to a date', () => {
      const date = new Date(2024, 0, 15);
      const result = service.addMonths(date, 3);

      expect(result.getMonth()).toBe(3);
    });

    it('should add years to a date', () => {
      const date = new Date(2024, 0, 15);
      const result = service.addYears(date, 2);

      expect(result.getFullYear()).toBe(2026);
    });

    it('should handle negative values in addDays', () => {
      const date = new Date(2024, 0, 15);
      const result = service.addDays(date, -5);

      expect(result.getDate()).toBe(10);
    });

    it('should handle negative values in addMonths', () => {
      const date = new Date(2024, 3, 15);
      const result = service.addMonths(date, -2);

      expect(result.getMonth()).toBe(1);
    });
  });

  describe('Leap Year Detection', () => {
    it('should detect Jalali leap years', () => {
      expect(service.isLeapYear(1399, 'jalali')).toBe(true);
      expect(service.isLeapYear(1400, 'jalali')).toBe(false);
    });

    it('should detect Gregorian leap years', () => {
      expect(service.isLeapYear(2024, 'gregorian')).toBe(true);
      expect(service.isLeapYear(2023, 'gregorian')).toBe(false);
      expect(service.isLeapYear(2000, 'gregorian')).toBe(true);
      expect(service.isLeapYear(1900, 'gregorian')).toBe(false);
    });

    it('should detect Hijri leap years', () => {
      const leapYear = service.isLeapYear(1445, 'hijri');
      expect(typeof leapYear).toBe('boolean');
    });
  });

  describe('Month and Day Names', () => {
    it('should get Jalali month names', () => {
      service.setLocale('fa');
      expect(service.getJalaliMonthName(1)).toBe('فروردین');
      expect(service.getJalaliMonthName(12)).toBe('اسفند');
    });

    it('should get Jalali day names', () => {
      service.setLocale('fa');
      expect(service.getJalaliDayName(0)).toBe('شنبه');
      expect(service.getJalaliDayName(6)).toBe('جمعه');
    });

    it('should get Gregorian month names', () => {
      service.setLocale('fa');
      expect(service.getGregorianMonthName(1)).toBe('ژانویه');
      expect(service.getGregorianMonthName(12)).toBe('دسامبر');
    });

    it('should get Hijri month names', () => {
      service.setLocale('fa');
      expect(service.getHijriMonthName(1)).toBe('محرم');
      expect(service.getHijriMonthName(12)).toBe('ذیحجه');
    });
  });

  describe('Season and Week Number', () => {
    it('should get season for Jalali month', () => {
      expect(service.getSeason(1)).toBe('بهار'); // Spring
      expect(service.getSeason(4)).toBe('تابستان'); // Summer
      expect(service.getSeason(7)).toBe('پاییز'); // Fall
      expect(service.getSeason(10)).toBe('زمستان'); // Winter
    });

    it('should get week number', () => {
      const weekNumber = service.getWeekNumber(1402, 1, 1);
      expect(weekNumber).toBeGreaterThan(0);
      expect(weekNumber).toBeLessThanOrEqual(53);
    });
  });

  describe('Day of Week', () => {
    it('should get day of week', () => {
      const date = new Date(2024, 0, 15); // Monday
      const dayOfWeek = service.getDayOfWeek(date);

      expect(dayOfWeek).toBeGreaterThanOrEqual(0);
      expect(dayOfWeek).toBeLessThan(7);
    });
  });

  describe('Generic Month Methods', () => {
    it('should get month days for any calendar type', () => {
      expect(service.getMonthDays(1402, 1, 'jalali')).toBe(31);
      expect(service.getMonthDays(2024, 1, 'gregorian')).toBe(31);
      expect(service.getMonthDays(1445, 1, 'hijri')).toBeGreaterThan(0);
    });

    it('should get first day of month for any calendar type', () => {
      const jalaliFirst = service.getFirstDayOfMonth(1402, 1, 'jalali');
      const gregorianFirst = service.getFirstDayOfMonth(2024, 1, 'gregorian');
      const hijriFirst = service.getFirstDayOfMonth(1445, 1, 'hijri');

      expect(jalaliFirst).toBeGreaterThanOrEqual(0);
      expect(gregorianFirst).toBeGreaterThanOrEqual(0);
      expect(hijriFirst).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Today Method', () => {
    it('should return today at noon', () => {
      const today = service.today();

      expect(today).toBeInstanceOf(Date);
      expect(today.getHours()).toBe(12);
      expect(today.getMinutes()).toBe(0);
      expect(today.getSeconds()).toBe(0);
    });
  });

  describe('Cache Management', () => {
    it('should clear cache', () => {
      const date = new Date(2024, 0, 15);
      service.gregorianToJalali(date);
      service.clearCache();

      // After clearing, the next call should work normally
      const result = service.gregorianToJalali(date);
      expect(result).toBeDefined();
    });
  });

  describe('Bidirectional Conversion Property', () => {
    it('should maintain bidirectional conversion consistency', () => {
      const originalDate = new Date(2024, 0, 15);

      // Convert to Jalali and back
      const jalaliDate = service.gregorianToJalali(originalDate);
      const backToGregorian = service.jalaliToGregorianDate(jalaliDate.year, jalaliDate.month, jalaliDate.day);

      // Should be the same day
      expect(service.isSameDay(originalDate, backToGregorian)).toBe(true);
    });

    it('should maintain bidirectional conversion for multiple dates', () => {
      const testDates = [
        new Date(2000, 0, 1),
        new Date(2024, 5, 15),
        new Date(2050, 11, 31)
      ];

      testDates.forEach(date => {
        const jalaliDate = service.gregorianToJalali(date);
        const backToGregorian = service.jalaliToGregorianDate(jalaliDate.year, jalaliDate.month, jalaliDate.day);

        expect(service.isSameDay(date, backToGregorian)).toBe(true);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle leap year edge cases', () => {
      // Last day of Esfand in leap year
      const leapYearDate = service.jalaliToGregorianDate(1399, 12, 30);
      expect(leapYearDate).toBeInstanceOf(Date);

      // Last day of Esfand in non-leap year
      const nonLeapYearDate = service.jalaliToGregorianDate(1400, 12, 29);
      expect(nonLeapYearDate).toBeInstanceOf(Date);
    });

    it('should handle month boundaries', () => {
      const lastDayOfMonth = service.jalaliToGregorianDate(1402, 6, 31);
      const firstDayOfNextMonth = service.jalaliToGregorianDate(1402, 7, 1);

      expect(service.isBefore(lastDayOfMonth, firstDayOfNextMonth)).toBe(true);
    });

    it('should handle year boundaries', () => {
      const lastDayOfYear = service.jalaliToGregorianDate(1402, 12, 29);
      const firstDayOfNextYear = service.jalaliToGregorianDate(1403, 1, 1);

      expect(service.isBefore(lastDayOfYear, firstDayOfNextYear)).toBe(true);
    });
  });

  describe('Advanced Date Formatting - Jalali', () => {
    beforeEach(() => {
      service.setLocale('fa');
    });

    it('should format Jalali date with YYYY-MM-DD pattern', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'YYYY-MM-DD');
      expect(formatted).toBe('1402-10-25');
    });

    it('should format Jalali date with DD MMMM YYYY pattern', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'DD MMMM YYYY');
      expect(formatted).toBe('25 دی 1402');
    });

    it('should format Jalali date with DD MMM YYYY pattern', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'DD MMM YYYY');
      expect(formatted).toContain('25');
      expect(formatted).toContain('1402');
    });

    it('should format Jalali date with YYYY/MM/DD pattern', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'YYYY/MM/DD');
      expect(formatted).toBe('1402/10/25');
    });

    it('should format Jalali date with DD/MM/YYYY pattern', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'DD/MM/YYYY');
      expect(formatted).toBe('25/10/1402');
    });

    it('should format Jalali date with single digit month and day', () => {
      const date = { year: 1402, month: 1, day: 5 };
      const formatted = service.formatJalaliDate(date, 'D/M/YYYY');
      expect(formatted).toBe('5/1/1402');
    });

    it('should format Jalali date with padded month and day', () => {
      const date = { year: 1402, month: 1, day: 5 };
      const formatted = service.formatJalaliDate(date, 'DD/MM/YYYY');
      expect(formatted).toBe('05/01/1402');
    });

    it('should format Jalali date with 2-digit year', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'DD/MM/YY');
      expect(formatted).toBe('25/10/02');
    });

    it('should format Jalali date with full month name in Persian', () => {
      const date = { year: 1402, month: 1, day: 1 };
      const formatted = service.formatJalaliDate(date, 'MMMM D, YYYY');
      expect(formatted).toContain('فروردین');
    });

    it('should format Jalali date with all months in Persian', () => {
      const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
                      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
      
      for (let i = 1; i <= 12; i++) {
        const date = { year: 1402, month: i, day: 1 };
        const formatted = service.formatJalaliDate(date, 'MMMM');
        expect(formatted).toBe(months[i - 1]);
      }
    });

    it('should format Jalali date with default pattern when no pattern provided', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date);
      expect(formatted).toContain('25');
      expect(formatted).toContain('دی');
      expect(formatted).toContain('1402');
    });
  });

  describe('Advanced Date Formatting - Jalali (English)', () => {
    beforeEach(() => {
      service.setLocale('en');
    });

    it('should format Jalali date with English month names', () => {
      const date = { year: 1402, month: 1, day: 1 };
      const formatted = service.formatJalaliDate(date, 'MMMM D, YYYY');
      expect(formatted).toContain('Farvardin');
    });

    it('should format Jalali date with all months in English', () => {
      const months = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
                      'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'];
      
      for (let i = 1; i <= 12; i++) {
        const date = { year: 1402, month: i, day: 1 };
        const formatted = service.formatJalaliDate(date, 'MMMM');
        expect(formatted).toBe(months[i - 1]);
      }
    });

    it('should format Jalali date with default pattern in English', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date);
      expect(formatted).toContain('Dey');
      expect(formatted).toContain('25');
      expect(formatted).toContain('1402');
    });
  });

  describe('Advanced Date Formatting - Gregorian', () => {
    beforeEach(() => {
      service.setLocale('fa');
    });

    it('should format Gregorian date with YYYY-MM-DD pattern', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date, 'YYYY-MM-DD');
      expect(formatted).toBe('2024-01-15');
    });

    it('should format Gregorian date with DD MMMM YYYY pattern', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date, 'DD MMMM YYYY');
      expect(formatted).toBe('15 ژانویه 2024');
    });

    it('should format Gregorian date with DD MMM YYYY pattern', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date, 'DD MMM YYYY');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('should format Gregorian date with YYYY/MM/DD pattern', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date, 'YYYY/MM/DD');
      expect(formatted).toBe('2024/01/15');
    });

    it('should format Gregorian date with DD/MM/YYYY pattern', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date, 'DD/MM/YYYY');
      expect(formatted).toBe('15/01/2024');
    });

    it('should format Gregorian date with all months in Persian', () => {
      const months = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
                      'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
      
      for (let i = 0; i < 12; i++) {
        const date = new Date(2024, i, 15);
        const formatted = service.formatGregorianDate(date, 'MMMM');
        expect(formatted).toBe(months[i]);
      }
    });

    it('should format Gregorian date with default pattern', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date);
      expect(formatted).toContain('15');
      expect(formatted).toContain('ژانویه');
      expect(formatted).toContain('2024');
    });
  });

  describe('Advanced Date Formatting - Gregorian (English)', () => {
    beforeEach(() => {
      service.setLocale('en');
    });

    it('should format Gregorian date with English month names', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date, 'MMMM D, YYYY');
      expect(formatted).toContain('January');
    });

    it('should format Gregorian date with all months in English', () => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
      
      for (let i = 0; i < 12; i++) {
        const date = new Date(2024, i, 15);
        const formatted = service.formatGregorianDate(date, 'MMMM');
        expect(formatted).toBe(months[i]);
      }
    });

    it('should format Gregorian date with default pattern in English', () => {
      const date = new Date(2024, 0, 15);
      const formatted = service.formatGregorianDate(date);
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });
  });

  describe('Advanced Date Formatting - Hijri', () => {
    beforeEach(() => {
      service.setLocale('fa');
    });

    it('should format Hijri date with YYYY-MM-DD pattern', () => {
      const date = { year: 1445, month: 7, day: 15 };
      const formatted = service.formatHijriDate(date, 'YYYY-MM-DD');
      expect(formatted).toBe('1445-07-15');
    });

    it('should format Hijri date with DD MMMM YYYY pattern', () => {
      const date = { year: 1445, month: 7, day: 15 };
      const formatted = service.formatHijriDate(date, 'DD MMMM YYYY');
      expect(formatted).toBe('15 رجب 1445');
    });

    it('should format Hijri date with DD MMM YYYY pattern', () => {
      const date = { year: 1445, month: 7, day: 15 };
      const formatted = service.formatHijriDate(date, 'DD MMM YYYY');
      expect(formatted).toContain('15');
      expect(formatted).toContain('1445');
    });

    it('should format Hijri date with YYYY/MM/DD pattern', () => {
      const date = { year: 1445, month: 7, day: 15 };
      const formatted = service.formatHijriDate(date, 'YYYY/MM/DD');
      expect(formatted).toBe('1445/07/15');
    });

    it('should format Hijri date with DD/MM/YYYY pattern', () => {
      const date = { year: 1445, month: 7, day: 15 };
      const formatted = service.formatHijriDate(date, 'DD/MM/YYYY');
      expect(formatted).toBe('15/07/1445');
    });

    it('should format Hijri date with all months in Persian', () => {
      const months = ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی',
                      'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیحجه'];
      
      for (let i = 1; i <= 12; i++) {
        const date = { year: 1445, month: i, day: 1 };
        const formatted = service.formatHijriDate(date, 'MMMM');
        expect(formatted).toBe(months[i - 1]);
      }
    });

    it('should format Hijri date with default pattern', () => {
      const date = { year: 1445, month: 7, day: 15 };
      const formatted = service.formatHijriDate(date);
      expect(formatted).toContain('15');
      expect(formatted).toContain('رجب');
      expect(formatted).toContain('1445');
      expect(formatted).toContain('هجری قمری');
    });
  });

  describe('Advanced Date Formatting - Hijri (English)', () => {
    beforeEach(() => {
      service.setLocale('en');
    });

    it('should format Hijri date with English month names', () => {
      const date = { year: 1445, month: 1, day: 1 };
      const formatted = service.formatHijriDate(date, 'MMMM D, YYYY');
      expect(formatted).toContain('Muharram');
    });

    it('should format Hijri date with all months in English', () => {
      const months = ['Muharram', 'Safar', 'Rabi al-awwal', 'Rabi al-thani', 'Jumada al-awwal', 'Jumada al-thani',
                      'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
      
      for (let i = 1; i <= 12; i++) {
        const date = { year: 1445, month: i, day: 1 };
        const formatted = service.formatHijriDate(date, 'MMMM');
        expect(formatted).toBe(months[i - 1]);
      }
    });

    it('should format Hijri date with default pattern in English', () => {
      const date = { year: 1445, month: 7, day: 15 };
      const formatted = service.formatHijriDate(date);
      expect(formatted).toContain('Rajab');
      expect(formatted).toContain('15');
      expect(formatted).toContain('1445');
      expect(formatted).toContain('AH');
    });
  });

  describe('Date Formatting - Pattern Edge Cases', () => {
    beforeEach(() => {
      service.setLocale('fa');
    });

    it('should handle patterns with multiple occurrences of same token', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'YYYY-MM-DD YYYY');
      expect(formatted).toBe('1402-10-25 1402');
    });

    it('should handle patterns with mixed tokens', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'DD/MM/YYYY - MMMM');
      expect(formatted).toBe('25/10/1402 - دی');
    });

    it('should handle single digit day and month without padding', () => {
      const date = { year: 1402, month: 1, day: 5 };
      const formatted = service.formatJalaliDate(date, 'D/M/YYYY');
      expect(formatted).toBe('5/1/1402');
    });

    it('should handle patterns with text between tokens', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'روز DD ماه MMMM سال YYYY');
      expect(formatted).toBe('روز 25 ماه دی سال 1402');
    });

    it('should format Jalali date with short day names', () => {
      const date = { year: 1402, month: 10, day: 25 };
      const formatted = service.formatJalaliDate(date, 'ddd DD MMMM');
      expect(formatted).toContain('25');
      expect(formatted).toContain('دی');
    });
  });

  describe('Date Formatting - Locale Consistency', () => {
    it('should maintain consistency when switching locales', () => {
      const date = { year: 1402, month: 10, day: 25 };
      
      service.setLocale('fa');
      const faPersian = service.formatJalaliDate(date, 'DD MMMM YYYY');
      
      service.setLocale('en');
      const enPersian = service.formatJalaliDate(date, 'DD MMMM YYYY');
      
      expect(faPersian).not.toBe(enPersian);
      expect(faPersian).toContain('دی');
      expect(enPersian).toContain('Dey');
    });

    it('should format Gregorian dates consistently across locales', () => {
      const date = new Date(2024, 0, 15);
      
      service.setLocale('fa');
      const faPersian = service.formatGregorianDate(date, 'DD MMMM YYYY');
      
      service.setLocale('en');
      const enPersian = service.formatGregorianDate(date, 'DD MMMM YYYY');
      
      expect(faPersian).not.toBe(enPersian);
      expect(faPersian).toContain('ژانویه');
      expect(enPersian).toContain('January');
    });

    it('should format Hijri dates consistently across locales', () => {
      const date = { year: 1445, month: 7, day: 15 };
      
      service.setLocale('fa');
      const faPersian = service.formatHijriDate(date, 'DD MMMM YYYY');
      
      service.setLocale('en');
      const enPersian = service.formatHijriDate(date, 'DD MMMM YYYY');
      
      expect(faPersian).not.toBe(enPersian);
      expect(faPersian).toContain('رجب');
      expect(enPersian).toContain('Rajab');
    });
  });

  describe('Date Formatting - Comprehensive Coverage', () => {
    beforeEach(() => {
      service.setLocale('fa');
    });

    it('should format various Jalali dates with different patterns', () => {
      const testCases = [
        { date: { year: 1402, month: 1, day: 1 }, pattern: 'YYYY-MM-DD', expected: '1402-01-01' },
        { date: { year: 1402, month: 12, day: 29 }, pattern: 'DD/MM/YYYY', expected: '29/12/1402' },
        { date: { year: 1403, month: 6, day: 15 }, pattern: 'D/M/YY', expected: '15/6/03' },
      ];

      testCases.forEach(({ date, pattern, expected }) => {
        const formatted = service.formatJalaliDate(date, pattern);
        expect(formatted).toBe(expected);
      });
    });

    it('should format various Gregorian dates with different patterns', () => {
      const testCases = [
        { date: new Date(2024, 0, 1), pattern: 'YYYY-MM-DD', expected: '2024-01-01' },
        { date: new Date(2024, 11, 31), pattern: 'DD/MM/YYYY', expected: '31/12/2024' },
        { date: new Date(2025, 5, 15), pattern: 'D/M/YY', expected: '15/6/25' },
      ];

      testCases.forEach(({ date, pattern, expected }) => {
        const formatted = service.formatGregorianDate(date, pattern);
        expect(formatted).toBe(expected);
      });
    });

    it('should format various Hijri dates with different patterns', () => {
      const testCases = [
        { date: { year: 1445, month: 1, day: 1 }, pattern: 'YYYY-MM-DD', expected: '1445-01-01' },
        { date: { year: 1445, month: 12, day: 30 }, pattern: 'DD/MM/YYYY', expected: '30/12/1445' },
        { date: { year: 1446, month: 6, day: 15 }, pattern: 'D/M/YY', expected: '15/6/46' },
      ];

      testCases.forEach(({ date, pattern, expected }) => {
        const formatted = service.formatHijriDate(date, pattern);
        expect(formatted).toBe(expected);
      });
    });
  });
});
