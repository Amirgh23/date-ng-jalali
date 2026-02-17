import { Injectable } from '@angular/core';
import { JalaliDateService } from './jalali-date.service';
import { DayInfo } from '../models/jalali-date.model';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor(private jalaliDateService: JalaliDateService) { }

  /**
   * دریافت اطلاعات روز شامل تعطیلات
   */
  getDayInfo(date: Date): DayInfo {
    return this.jalaliDateService.getDayInfo(date);
  }

  /**
   * بررسی تعطیل رسمی
   */
  isOfficialHoliday(date: Date): boolean {
    const dayInfo = this.jalaliDateService.getDayInfo(date);
    return dayInfo.isHoliday && dayInfo.holidayType === 'official';
  }

  /**
   * بررسی تعطیل غیررسمی
   */
  isNonOfficialHoliday(date: Date): boolean {
    const dayInfo = this.jalaliDateService.getDayInfo(date);
    return dayInfo.isHoliday && dayInfo.holidayType === 'non-official';
  }

  /**
   * دریافت لیست تعطیلات ماه جلالی
   */
  getHolidaysInJalaliMonth(year: number, month: number): Date[] {
    const holidays: Date[] = [];
    const daysInMonth = this.jalaliDateService.getDaysInJalaliMonth(year, month);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = this.jalaliDateService.jalaliToGregorian(year, month, day);
      const dayInfo = this.jalaliDateService.getDayInfo(new Date(date.year, date.month - 1, date.day));
      
      if (dayInfo.isHoliday) {
        holidays.push(new Date(date.year, date.month - 1, date.day));
      }
    }

    return holidays;
  }

  /**
   * دریافت لیست تعطیلات ماه میلادی
   */
  getHolidaysInGregorianMonth(year: number, month: number): Date[] {
    const holidays: Date[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayInfo = this.jalaliDateService.getDayInfo(date);

      if (dayInfo.isHoliday) {
        holidays.push(date);
      }
    }

    return holidays;
  }

  /**
   * دریافت اطلاعات روز تعطیل
   */
  getHolidayInfo(date: Date): {
    isHoliday: boolean;
    holidayType: 'official' | 'non-official' | null;
    events: string[];
  } {
    const dayInfo = this.jalaliDateService.getDayInfo(date);
    return {
      isHoliday: dayInfo.isHoliday,
      holidayType: dayInfo.holidayType,
      events: dayInfo.events
    };
  }

  /**
   * دریافت رنگ روز بر اساس نوع تعطیل
   */
  getHolidayColor(date: Date): string {
    const dayInfo = this.jalaliDateService.getDayInfo(date);
    if (!dayInfo.isHoliday) {
      return '';
    }

    return dayInfo.holidayType === 'official' ? 'var(--primary-color)' : 'var(--accent-color)';
  }

  /**
   * دریافت متن تعطیل
   */
  getHolidayText(date: Date): string {
    const dayInfo = this.jalaliDateService.getDayInfo(date);
    if (!dayInfo.isHoliday) {
      return '';
    }

    return dayInfo.holidayType === 'official' ? 'تعطیل رسمی' : 'تعطیل غیررسمی';
  }

  /**
   * بررسی روز تعطیل
   */
  isWeekend(date: Date): boolean {
    // جمعه تعطیل رسمی در ایران
    return date.getDay() === 5;
  }
}
