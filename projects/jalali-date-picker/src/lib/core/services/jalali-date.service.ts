import { Injectable } from '@angular/core';
import { JalaliCalendarUtils } from '../utils/jalali-calendar.utils';
import { JalaliDate, GregorianDate, HijriDate, DayInfo } from '../models/jalali-date.model';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class JalaliDateService {
  constructor(private cacheService: CacheService) {}

  /**
   * تبدیل تاریخ میلادی به جلالی
   */
  gregorianToJalali(gregorianDate: Date): JalaliDate {
    const cacheKey = `g2j_${gregorianDate.getTime()}`;
    const cached = this.cacheService.get<JalaliDate>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
    const result: JalaliDate = {
      year: jalaliDate.year,
      month: jalaliDate.month,
      day: jalaliDate.day,
      monthName: JalaliCalendarUtils.getJalaliMonthName(jalaliDate.month),
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: JalaliCalendarUtils.formatJalaliDate(jalaliDate)
    };

    this.cacheService.set(cacheKey, result);
    return result;
  }

  /**
   * تبدیل تاریخ جلالی به میلادی
   */
  jalaliToGregorian(jalaliYear: number, jalaliMonth: number, jalaliDay: number): GregorianDate {
    const cacheKey = `j2g_${jalaliYear}_${jalaliMonth}_${jalaliDay}`;
    const cached = this.cacheService.get<GregorianDate>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay);
    const result: GregorianDate = {
      year: gregorianDate.getFullYear(),
      month: gregorianDate.getMonth() + 1,
      day: gregorianDate.getDate(),
      monthName: JalaliCalendarUtils.gregorianMonths[gregorianDate.getMonth()],
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: JalaliCalendarUtils.formatGregorianDate(gregorianDate)
    };

    this.cacheService.set(cacheKey, result);
    return result;
  }

  /**
   * تبدیل میلادی به قمری
   */
  gregorianToHijri(gregorianDate: Date): HijriDate {
    const cacheKey = `g2h_${gregorianDate.getTime()}`;
    const cached = this.cacheService.get<HijriDate>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
    const result: HijriDate = {
      year: hijriDate.year,
      month: hijriDate.month,
      day: hijriDate.day,
      monthName: JalaliCalendarUtils.hijriMonths[hijriDate.month - 1],
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: JalaliCalendarUtils.formatHijriDate(hijriDate)
    };

    this.cacheService.set(cacheKey, result);
    return result;
  }

  /**
   * دریافت روزهای ماه قمری
   */
  getDaysInHijriMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getDaysInHijriMonth(year, month);
  }

  /**
   * دریافت اولین روز ماه قمری
   */
  getFirstDayOfHijriMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getFirstDayOfHijriMonth(year, month);
  }

  /**
   * تبدیل قمری به میلادی
   */
  hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
    return JalaliCalendarUtils.hijriToGregorian(hijriYear, hijriMonth, hijriDay);
  }

  /**
   * دریافت اطلاعات کامل روز
   */
  getDayInfo(gregorianDate: Date): DayInfo {
    const cacheKey = `dayinfo_${gregorianDate.getTime()}`;
    const cached = this.cacheService.get<DayInfo>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const jalaliDate = this.gregorianToJalali(gregorianDate);
    const hijriDate = this.gregorianToHijri(gregorianDate);
    const holidayInfo = JalaliCalendarUtils.isHoliday(jalaliDate);
    const events = JalaliCalendarUtils.getEvents(jalaliDate);
    const season = JalaliCalendarUtils.getSeason(jalaliDate.month);
    const weekNumber = JalaliCalendarUtils.getWeekNumber(jalaliDate.year, jalaliDate.month, jalaliDate.day);

    const result: DayInfo = {
      jalali: jalaliDate,
      gregorian: this.jalaliToGregorian(jalaliDate.year, jalaliDate.month, jalaliDate.day),
      hijri: hijriDate,
      isHoliday: holidayInfo.isHoliday,
      holidayType: holidayInfo.type,
      events: events,
      season: season,
      weekNumber: weekNumber
    };

    this.cacheService.set(cacheKey, result);
    return result;
  }

  /**
   * دریافت روزهای ماه جلالی
   */
  getDaysInJalaliMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getDaysInJalaliMonth(year, month);
  }

  /**
   * دریافت اولین روز ماه جلالی
   */
  getFirstDayOfJalaliMonth(year: number, month: number): number {
    return JalaliCalendarUtils.getFirstDayOfJalaliMonth(year, month);
  }

  /**
   * بررسی تعطیل
   */
  isHoliday(jalaliDate: { year: number; month: number; day: number }): boolean {
    return JalaliCalendarUtils.isHoliday(jalaliDate).isHoliday;
  }

  /**
   * دریافت رویدادهای روز
   */
  getEvents(jalaliDate: { year: number; month: number; day: number }): string[] {
    return JalaliCalendarUtils.getEvents(jalaliDate);
  }

  /**
   * تبدیل تاریخ به رشته
   */
  formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
    const jalaliDate = this.gregorianToJalali(date);
    switch (format) {
      case 'short':
        return `${jalaliDate.year}/${jalaliDate.month}/${jalaliDate.day}`;
      case 'long':
        return `${jalaliDate.day} ${jalaliDate.monthName} ${jalaliDate.year} هجری شمسی`;
      default:
        return jalaliDate.formatted;
    }
  }

  /**
   * دریافت تاریخ امروز
   */
  today(): Date {
    return new Date();
  }

  /**
   * مقایسه تاریخ‌ها
   */
  compareDates(date1: Date, date2: Date): number {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    return time1 - time2;
  }

  /**
   * اضافه کردن روز به تاریخ
   */
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * اضافه کردن ماه به تاریخ
   */
  addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * اضافه کردن سال به تاریخ
   */
  addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  /**
   * بررسی تاریخ قبل
   */
  isBefore(date1: Date, date2: Date): boolean {
    return this.compareDates(date1, date2) < 0;
  }

  /**
   * بررسی تاریخ بعد
   */
  isAfter(date1: Date, date2: Date): boolean {
    return this.compareDates(date1, date2) > 0;
  }

  /**
   * بررسی تاریخ برابر
   */
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  /**
   * دریافت نام ماه جلالی
   */
  getJalaliMonthName(month: number): string {
    return JalaliCalendarUtils.getJalaliMonthName(month);
  }

  /**
   * دریافت نام روز هفته
   */
  getJalaliDayName(dayOfWeek: number): string {
    return JalaliCalendarUtils.getJalaliDayName(dayOfWeek);
  }

  /**
   * دریافت روزهای ماه میلادی
   */
  getDaysInGregorianMonth(year: number, month: number): number {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && this.isLeapYear(year, 'gregorian')) {
      return 29;
    }
    return daysInMonth[month - 1];
  }

  /**
   * دریافت اولین روز ماه میلادی
   */
  getFirstDayOfGregorianMonth(year: number, month: number): number {
    const date = new Date(year, month - 1, 1);
    return (date.getDay() + 1) % 7; // شنبه = 0
  }

  /**
   * بررسی سال کبیسه
   */
  isLeapYear(year: number, calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'): boolean {
    if (calendarType === 'jalali') {
      return JalaliCalendarUtils.isJalaliLeapYear(year);
    } else if (calendarType === 'gregorian') {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    } else {
      return JalaliCalendarUtils.isHijriLeapYear(year);
    }
  }

  /**
   * دریافت روز هفته
   */
  getDayOfWeek(date: Date): number {
    return (date.getDay() + 1) % 7; // شنبه = 0
  }

  /**
   * دریافت روزهای ماه
   */
  getMonthDays(year: number, month: number, calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'): number {
    if (calendarType === 'jalali') {
      return this.getDaysInJalaliMonth(year, month);
    } else if (calendarType === 'gregorian') {
      return this.getDaysInGregorianMonth(year, month);
    } else {
      return this.getDaysInHijriMonth(year, month);
    }
  }

  /**
   * دریافت اولین روز ماه
   */
  getFirstDayOfMonth(year: number, month: number, calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali'): number {
    if (calendarType === 'jalali') {
      return this.getFirstDayOfJalaliMonth(year, month);
    } else if (calendarType === 'gregorian') {
      return this.getFirstDayOfGregorianMonth(year, month);
    } else {
      return this.getFirstDayOfHijriMonth(year, month);
    }
  }

  /**
   * دریافت فصل
   */
  getSeason(jalaliMonth: number): string {
    return JalaliCalendarUtils.getSeason(jalaliMonth);
  }

  /**
   * دریافت شماره هفته
   */
  getWeekNumber(jalaliYear: number, jalaliMonth: number, jalaliDay: number): number {
    return JalaliCalendarUtils.getWeekNumber(jalaliYear, jalaliMonth, jalaliDay);
  }

  /**
   * پاک کردن کش
   */
  clearCache(): void {
    this.cacheService.clear();
  }
}
