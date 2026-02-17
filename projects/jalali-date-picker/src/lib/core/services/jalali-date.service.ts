import { Injectable } from '@angular/core';
import { JalaliCalendarUtils } from '../utils/jalali-calendar.utils';
import { JalaliDate, GregorianDate, HijriDate, DayInfo } from '../models/jalali-date.model';

@Injectable({
  providedIn: 'root'
})
export class JalaliDateService {

  /**
   * تبدیل تاریخ میلادی به جلالی
   */
  gregorianToJalali(gregorianDate: Date): JalaliDate {
    const jalaliDate = JalaliCalendarUtils.gregorianToJalali(gregorianDate);
    return {
      year: jalaliDate.year,
      month: jalaliDate.month,
      day: jalaliDate.day,
      monthName: JalaliCalendarUtils.getJalaliMonthName(jalaliDate.month),
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: JalaliCalendarUtils.formatJalaliDate(jalaliDate)
    };
  }

  /**
   * تبدیل تاریخ جلالی به میلادی
   */
  jalaliToGregorian(jalaliYear: number, jalaliMonth: number, jalaliDay: number): GregorianDate {
    const gregorianDate = JalaliCalendarUtils.jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay);
    return {
      year: gregorianDate.getFullYear(),
      month: gregorianDate.getMonth() + 1,
      day: gregorianDate.getDate(),
      monthName: JalaliCalendarUtils.gregorianMonths[gregorianDate.getMonth()],
      dayName: JalaliCalendarUtils.getJalaliDayName(gregorianDate.getDay()),
      formatted: JalaliCalendarUtils.formatGregorianDate(gregorianDate)
    };
  }

  /**
   * تبدیل میلادی به قمری
   */
  gregorianToHijri(gregorianDate: Date): HijriDate {
    const hijriDate = JalaliCalendarUtils.gregorianToHijri(gregorianDate);
    return {
      year: hijriDate.year,
      month: hijriDate.month,
      day: hijriDate.day,
      monthName: JalaliCalendarUtils.hijriMonths[hijriDate.month - 1],
      formatted: JalaliCalendarUtils.formatHijriDate(hijriDate)
    };
  }

  /**
   * دریافت اطلاعات کامل روز
   */
  getDayInfo(gregorianDate: Date): DayInfo {
    const jalaliDate = this.gregorianToJalali(gregorianDate);
    const hijriDate = this.gregorianToHijri(gregorianDate);
    const holidayInfo = JalaliCalendarUtils.isHoliday(jalaliDate);
    const events = JalaliCalendarUtils.getEvents(jalaliDate);
    const season = JalaliCalendarUtils.getSeason(jalaliDate.month);
    const weekNumber = JalaliCalendarUtils.getWeekNumber(jalaliDate.year, jalaliDate.month, jalaliDate.day);

    return {
      jalali: jalaliDate,
      gregorian: this.jalaliToGregorian(jalaliDate.year, jalaliDate.month, jalaliDate.day),
      hijri: hijriDate,
      isHoliday: holidayInfo.isHoliday,
      holidayType: holidayInfo.type,
      events: events,
      season: season,
      weekNumber: weekNumber
    };
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
}
