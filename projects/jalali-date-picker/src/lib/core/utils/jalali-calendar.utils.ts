export class JalaliCalendarUtils {
  static readonly jalaliMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  static readonly jalaliWeekDays = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'
  ];

  static readonly gregorianMonths = [
    'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
    'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
  ];

  static readonly gregorianWeekDays = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'
  ];

  static readonly hijriMonths = [
    'محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذیقعده', 'ذیحجه'
  ];

  static readonly seasons = [
    'بهار', 'تابستان', 'پاییز', 'زمستان'
  ];

  /**
   * تبدیل تاریخ میلادی به جلالی
   */
  static gregorianToJalali(gregorianDate: Date): { year: number; month: number; day: number } {
    const gY = gregorianDate.getFullYear();
    const gM = gregorianDate.getMonth() + 1;
    const gD = gregorianDate.getDate();

    // الگوریتم تبدیلGregorian به Jalali
    let gy: number, gm: number, gd: number;
    let jy: number, jm: number, jd: number;
    let gDayNo: number, jDayNo: number;
    let jNp: number;
    let i: number, j: number;

    gy = gY;
    gm = gM;
    gd = gD;

    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    // تعیین روزهای سال میلادی
    gDayNo = 0;
    for (i = 0; i < gm - 1; ++i)
      gDayNo += gDaysInMonth[i];
    if (gm > 2 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
      ++gDayNo;
    gDayNo += gd - 1;

    // تعیین تاریخ جلالی
    jDayNo = gDayNo + 79;
    jNp = Math.floor((jDayNo) / 12053);
    jDayNo = jDayNo % 12053;
    jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
    jDayNo = jDayNo % 1461;
    if (jDayNo >= 366) {
      jy += Math.floor((jDayNo - 1) / 365);
      jDayNo = (jDayNo - 1) % 365;
    }
    for (i = 0; i < 11 && jDayNo >= jDaysInMonth[i]; ++i)
      jDayNo -= jDaysInMonth[i];
    jm = i + 1;
    jd = jDayNo + 1;

    return { year: jy, month: jm, day: jd };
  }

  /**
   * تبدیل تاریخ جلالی به میلادی
   */
  static jalaliToGregorian(jalaliYear: number, jalaliMonth: number, jalaliDay: number): Date {
    let gy: number, gm: number, gd: number;
    let jy: number, jm: number, jd: number;
    let gDayNo: number, jDayNo: number;
    let jNp: number;
    let i: number, j: number;

    jy = jalaliYear;
    jm = jalaliMonth;
    jd = jalaliDay;

    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    jNp = Math.floor((jy - 979) / 33);
    jDayNo = (jy - 979 - 33 * jNp) * 365 + Math.floor((33 * jNp + 3) / 4);
    for (i = 0; i < jm - 1; ++i)
      jDayNo += jDaysInMonth[i];
    jDayNo += jd - 1;

    gDayNo = jDayNo - 79;
    gy = 621 + 400 * Math.floor(gDayNo / 146097);
    gDayNo = gDayNo % 146097;

    const leap = true;
    if (gDayNo >= 36525) {
      gy += 1;
      gDayNo -= 36524;
      if (gDayNo >= 365) {
        gy += Math.floor(gDayNo / 365);
        gDayNo = gDayNo % 365;
      }
    }

    for (i = 0; gDayNo >= (gDaysInMonth[i] + ((i === 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) ? 29 : 28)); i++)
      gDayNo -= gDaysInMonth[i] + ((i === 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) ? 29 : 28);

    gm = i + 1;
    gd = gDayNo + 1;

    const result = new Date(gy, gm - 1, gd);
    return result;
  }

  /**
   * تبدیل میلادی به قمری (دقیق)
   */
  static gregorianToHijri(gregorianDate: Date): { year: number; month: number; day: number } {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();
    
    const jd = this.julianDay(gYear, gMonth, gDay);
    const hijriDate = this.hijriFromJd(jd);
    
    return hijriDate;
  }

  /**
   * تبدیل قمری به میلادی
   */
  static hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
    const jd = this.jdFromHijri(hijriYear, hijriMonth, hijriDay);
    const gregorian = this.gregorianFromJd(jd);
    return new Date(gregorian.year, gregorian.month - 1, gregorian.day);
  }

  private static julianDay(year: number, month: number, day: number): number {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    const jd = Math.floor(365.25 * (year + 4716)) + 
              Math.floor(30.6001 * (month + 1)) + 
              day + b - 1524.5;
    return jd;
  }

  private static gregorianFromJd(jd: number): { year: number; month: number; day: number } {
    const z = Math.floor(jd + 0.5);
    const a = Math.floor((z - 1867216.25) / 36524.25);
    const aa = z + 1 + a - Math.floor(a / 4);
    const b = aa + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    
    const day = Math.floor(b - d - Math.floor(30.6001 * e));
    const month = e < 14 ? e - 1 : e - 13;
    const year = month > 2 ? c - 4716 : c - 4715;
    
    return { year, month, day };
  }

  private static hijriFromJd(jd: number): { year: number; month: number; day: number } {
    const epoch = 1948440 - 0.5;
    const daysSinceEpoch = jd - epoch;
    const years = Math.floor(daysSinceEpoch / 354.3666);
    let remainingDays = daysSinceEpoch - (years * 354.3666);
    
    let months = 0;
    while (remainingDays > this.getDaysInHijriMonth(years + 1, months + 1)) {
      remainingDays -= this.getDaysInHijriMonth(years + 1, months + 1);
      months++;
    }
    
    const day = Math.floor(remainingDays + 1);
    return {
      year: years + 1,
      month: months + 1,
      day: day
    };
  }

  private static jdFromHijri(year: number, month: number, day: number): number {
    const epoch = 1948440 - 0.5;
    let jd = epoch;
    
    for (let i = 1; i < year; i++) {
      jd += this.isHijriLeapYear(i) ? 355 : 354;
    }
    
    for (let i = 1; i < month; i++) {
      jd += this.getDaysInHijriMonth(year, i);
    }
    
    jd += day - 1;
    return jd;
  }

  /**
   * دریافت روزهای ماه قمری
   */
  static getDaysInHijriMonth(year: number, month: number): number {
    // ماه‌های قمری دارای 29 یا 30 روز هستند
    // این تابع تقریبی است و بر اساس الگوریتم ساده‌ای استفاده می‌کند
    const daysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    
    // سال‌های کبیسه قمری دارای 355 روز هستند
    if (this.isHijriLeapYear(year)) {
      daysInMonth[1] = 30; // صفر
    }
    
    return daysInMonth[month - 1];
  }

  /**
   * بررسی سال کبیسه قمری
   */
  static isHijriLeapYear(year: number): boolean {
    // الگوریتم تقریبی برای تعیین سال کبیسه قمری
    const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
    return leapYears.includes(year % 30);
  }

  /**
   * دریافت اولین روز ماه قمری (شنبه = 0)
   */
  static getFirstDayOfHijriMonth(year: number, month: number): number {
    const gregorianDate = this.hijriToGregorian(year, month, 1);
    return (gregorianDate.getDay() + 1) % 7; // شنبه = 0
  }

  /**
   * دریافت نام ماه جلالی
   */
  static getJalaliMonthName(month: number): string {
    return this.jalaliMonths[month - 1];
  }

  /**
   * دریافت نام روز هفته جلالی
   */
  static getJalaliDayName(dayOfWeek: number): string {
    return this.jalaliWeekDays[dayOfWeek];
  }

  /**
   * دریافت نام فصل
   */
  static getSeason(jalaliMonth: number): string {
    if (jalaliMonth >= 1 && jalaliMonth <= 3) return this.seasons[0]; // بهار
    if (jalaliMonth >= 4 && jalaliMonth <= 6) return this.seasons[1]; // تابستان
    if (jalaliMonth >= 7 && jalaliMonth <= 9) return this.seasons[2]; // پاییز
    return this.seasons[3]; // زمستان
  }

  /**
   * بررسی تعطیل رسمی
   */
  static isHoliday(jalaliDate: { year: number; month: number; day: number }): { isHoliday: boolean; type: 'official' | 'non-official' | null } {
    // تعطیلات رسمی ایران
    const holidays: Array<{ month: number; day: number; type: 'official' | 'non-official' }> = [
      { month: 1, day: 1, type: 'official' }, // نوروز
      { month: 1, day: 2, type: 'official' }, // عید نوروز
      { month: 1, day: 3, type: 'official' }, // عید نوروز
      { month: 1, day: 4, type: 'official' }, // عید نوروز
      { month: 1, day: 5, type: 'official' }, // عید نوروز
      { month: 1, day: 6, type: 'official' }, // عید نوروز
      { month: 1, day: 7, type: 'official' }, // عید نوروز
      { month: 1, day: 12, type: 'official' }, // روز جمهوری
      { month: 2, day: 13, type: 'official' }, // روز طبیعت
      { month: 3, day: 14, type: 'official' }, // روز聂枫شن
      { month: 11, day: 22, type: 'official' }, // روز مبارزه یکم
      { month: 12, day: 9, type: 'official' } // روز معارف
    ];

    const holiday = holidays.find(h => h.month === jalaliDate.month && h.day === jalaliDate.day);
    if (holiday) {
      return { isHoliday: true, type: holiday.type };
    }

    // روزهای تعطیل غیررسمی
    const nonOfficialHolidays: Array<{ month: number; day: number; type: 'official' | 'non-official' }> = [
      { month: 1, day: 13, type: 'non-official' }, // روز ملی شدن نوروز
      { month: 2, day: 14, type: 'non-official' }
    ];

    const nonOfficial = nonOfficialHolidays.find(h => h.month === jalaliDate.month && h.day === jalaliDate.day);
    if (nonOfficial) {
      return { isHoliday: true, type: nonOfficial.type };
    }

    return { isHoliday: false, type: null };
  }

  /**
   * دریافت رویدادهای روز
   */
  static getEvents(jalaliDate: { year: number; month: number; day: number }): string[] {
    const events = [
      { month: 1, day: 1, events: ['نوروز'] },
      { month: 1, day: 12, events: ['روز جمهوری اسلامی'] },
      { month: 2, day: 13, events: ['روز طبیعت'] },
      { month: 3, day: 14, events: ['روز聂枫شن'] },
      { month: 11, day: 22, events: ['روز مبارزه یکم'] },
      { month: 12, day: 9, events: ['روز معارف'] }
    ];

    const dayEvents = events.find(e => e.month === jalaliDate.month && e.day === jalaliDate.day);
    return dayEvents ? dayEvents.events : [];
  }

  /**
   * دریافت شماره هفته
   */
  static getWeekNumber(jalaliYear: number, jalaliMonth: number, jalaliDay: number): number {
    const gregorianDate = this.jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay);
    const startOfYear = this.jalaliToGregorian(jalaliYear, 1, 1);
    const days = Math.floor((gregorianDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return Math.floor(days / 7) + 1;
  }

  /**
   * فرمت تاریخ جلالی
   */
  static formatJalaliDate(date: { year: number; month: number; day: number }): string {
    const monthName = this.getJalaliMonthName(date.month);
    return `${date.day} ${monthName} ${date.year}`;
  }

  /**
   * فرمت تاریخ میلادی
   */
  static formatGregorianDate(date: Date): string {
    const monthNames = this.gregorianMonths;
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  /**
   * فرمت تاریخ قمری
   */
  static formatHijriDate(date: { year: number; month: number; day: number }): string {
    const monthName = this.hijriMonths[date.month - 1];
    return `${date.day} ${monthName} ${date.year} هجری قمری`;
  }

  /**
   * دریافت روزهای ماه جلالی
   */
  static getDaysInJalaliMonth(year: number, month: number): number {
    const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    const isLeap = this.isJalaliLeapYear(year);
    return month === 12 && isLeap ? 30 : daysInMonth[month - 1];
  }

  /**
   * بررسی سال کبیسه جلالی
   */
  static isJalaliLeapYear(year: number): boolean {
    return (((year - 979) % 33) % 4 === 0);
  }

  /**
   * دریافت اولین روز ماه جلالی (شنبه = 0)
   */
  static getFirstDayOfJalaliMonth(year: number, month: number): number {
    const gregorianDate = this.jalaliToGregorian(year, month, 1);
    return (gregorianDate.getDay() + 1) % 7; // شنبه = 0
  }
}
