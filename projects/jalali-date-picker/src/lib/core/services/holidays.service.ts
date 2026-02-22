import { Injectable } from '@angular/core';
import { JalaliDateService } from './jalali-date.service';

export interface Holiday {
  id: string;
  name: string;
  jalaliMonth: number;
  jalaliDay: number;
  type: 'official' | 'non-official' | 'religious' | 'custom';
  description?: string;
  source?: string;
}

/**
 * سرویس مدیریت تعطیلات و مناسبت‌ها
 * Holiday Management Service
 */
@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  private holidays: Map<string, Holiday> = new Map();

  constructor(private jalaliDateService: JalaliDateService) {
    this.initializeDefaultHolidays();
  }

  /**
   * مقداردهی تعطیلات پیش‌فرض
   * Initialize default holidays
   */
  private initializeDefaultHolidays(): void {
    const defaultHolidays: Holiday[] = [
      // تعطیلات رسمی
      { id: 'nowruz1', name: 'نوروز', jalaliMonth: 1, jalaliDay: 1, type: 'official', description: 'اول فروردین' },
      { id: 'nowruz2', name: 'عید نوروز', jalaliMonth: 1, jalaliDay: 2, type: 'official' },
      { id: 'nowruz3', name: 'عید نوروز', jalaliMonth: 1, jalaliDay: 3, type: 'official' },
      { id: 'nowruz4', name: 'عید نوروز', jalaliMonth: 1, jalaliDay: 4, type: 'official' },
      { id: 'nowruz5', name: 'عید نوروز', jalaliMonth: 1, jalaliDay: 5, type: 'official' },
      { id: 'nowruz6', name: 'عید نوروز', jalaliMonth: 1, jalaliDay: 6, type: 'official' },
      { id: 'nowruz7', name: 'عید نوروز', jalaliMonth: 1, jalaliDay: 7, type: 'official' },
      { id: 'republic_day', name: 'روز جمهوری اسلامی', jalaliMonth: 1, jalaliDay: 12, type: 'official', description: 'روز جمهوری اسلامی ایران' },
      { id: 'nature_day', name: 'روز طبیعت', jalaliMonth: 2, jalaliDay: 13, type: 'official' },
      { id: 'oil_day', name: 'روز ملی شدن نفت', jalaliMonth: 3, jalaliDay: 14, type: 'official' },
      { id: 'resistance_day', name: 'روز مبارزه با استعمار', jalaliMonth: 11, jalaliDay: 22, type: 'official' },
      { id: 'education_day', name: 'روز معارف', jalaliMonth: 12, jalaliDay: 9, type: 'official' },

      // تعطیلات غیررسمی
      { id: 'sizdah_bedar', name: 'سیزده بدر', jalaliMonth: 1, jalaliDay: 13, type: 'non-official', description: 'آخرین روز نوروز' },
      { id: 'ashura', name: 'تاسوعا و عاشورا', jalaliMonth: 1, jalaliDay: 9, type: 'religious' },

      // مناسبت‌های دینی
      { id: 'eid_fitr', name: 'عید فطر', jalaliMonth: 1, jalaliDay: 1, type: 'religious', description: 'عید فطر (تقریبی)' },
      { id: 'eid_adha', name: 'عید قربان', jalaliMonth: 1, jalaliDay: 10, type: 'religious', description: 'عید قربان (تقریبی)' },
    ];

    defaultHolidays.forEach(holiday => {
      this.holidays.set(holiday.id, holiday);
    });
  }

  /**
   * دریافت تمام تعطیلات
   * Get all holidays
   */
  getAllHolidays(): Holiday[] {
    return Array.from(this.holidays.values());
  }

  /**
   * دریافت تعطیلات یک ماه
   * Get holidays for a specific month
   */
  getHolidaysForMonth(month: number): Holiday[] {
    return Array.from(this.holidays.values()).filter(h => h.jalaliMonth === month);
  }

  /**
   * دریافت تعطیلات یک سال
   * Get holidays for a specific year
   */
  getHolidaysForYear(year: number): Holiday[] {
    return Array.from(this.holidays.values());
  }

  /**
   * بررسی تعطیل بودن روز (تاریخ جلالی)
   * Check if a jalali date is a holiday
   */
  isHolidayByJalali(jalaliDate: any): boolean {
    return Array.from(this.holidays.values()).some(
      h => h.jalaliMonth === jalaliDate.month && h.jalaliDay === jalaliDate.day
    );
  }

  /**
   * دریافت اطلاعات تعطیل (تاریخ جلالی)
   * Get holiday information for a jalali date
   */
  getHolidayInfoByJalali(jalaliDate: any): Holiday | null {
    return Array.from(this.holidays.values()).find(
      h => h.jalaliMonth === jalaliDate.month && h.jalaliDay === jalaliDate.day
    ) || null;
  }

  /**
   * اضافه کردن تعطیل جدید
   * Add a new holiday
   */
  addHoliday(holiday: Holiday): void {
    this.holidays.set(holiday.id, holiday);
  }

  /**
   * حذف تعطیل
   * Remove a holiday
   */
  removeHoliday(holidayId: string): boolean {
    return this.holidays.delete(holidayId);
  }

  /**
   * به‌روزرسانی تعطیل
   * Update a holiday
   */
  updateHoliday(holiday: Holiday): void {
    if (this.holidays.has(holiday.id)) {
      this.holidays.set(holiday.id, holiday);
    }
  }

  /**
   * دریافت تعطیلات بر اساس نوع
   * Get holidays by type
   */
  getHolidaysByType(type: 'official' | 'non-official' | 'religious' | 'custom'): Holiday[] {
    return Array.from(this.holidays.values()).filter(h => h.type === type);
  }

  /**
   * پاک کردن تمام تعطیلات سفارشی
   * Clear all custom holidays
   */
  clearCustomHolidays(): void {
    const customHolidays = Array.from(this.holidays.entries())
      .filter(([_, h]) => h.type === 'custom')
      .map(([id, _]) => id);

    customHolidays.forEach(id => this.holidays.delete(id));
  }

  /**
   * دریافت تعطیلات رسمی
   * Get official holidays
   */
  getOfficialHolidays(): Holiday[] {
    return this.getHolidaysByType('official');
  }

  /**
   * دریافت مناسبت‌های دینی
   * Get religious holidays
   */
  getReligiousHolidays(): Holiday[] {
    return this.getHolidaysByType('religious');
  }

  /**
   * بررسی تعطیل رسمی بودن روز
   * Check if date is an official holiday
   */
  isOfficialHoliday(date: Date): boolean {
    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    const holiday = this.getHolidayInfoByJalali(jalaliDate);
    return holiday?.type === 'official' || false;
  }

  /**
   * بررسی تعطیل غیررسمی بودن روز
   * Check if date is a non-official holiday
   */
  isNonOfficialHoliday(date: Date): boolean {
    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    const holiday = this.getHolidayInfoByJalali(jalaliDate);
    return holiday?.type === 'non-official' || false;
  }

  /**
   * بررسی آخر هفته بودن روز
   * Check if date is a weekend (Friday or Saturday in Iran)
   */
  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    // جمعه (5) و شنبه (6) در ایران تعطیل هستند
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  /**
   * دریافت اطلاعات تعطیل برای تاریخ میلادی
   * Get holiday information for a Gregorian date
   */
  getHolidayInfo(date: Date): { isHoliday: boolean; type?: string } {
    const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
    const holiday = this.getHolidayInfoByJalali(jalaliDate);
    return {
      isHoliday: !!holiday,
      type: holiday?.type
    };
  }
}
