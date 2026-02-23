import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type SupportedLocale = 'fa' | 'en' | 'ar' | 'ku';

interface LocaleStrings {
  [key: string]: string;
}

/**
 * سرویس بین‌المللی‌سازی
 * Internationalization Service
 */
@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLocale = new BehaviorSubject<SupportedLocale>('fa');
  currentLocale$ = this.currentLocale.asObservable();

  private translations: { [key in SupportedLocale]: LocaleStrings } = {
    fa: {
      // Gregorian Months
      'january': 'ژانویه',
      'february': 'فوریه',
      'march': 'مارس',
      'april': 'آوریل',
      'may': 'مه',
      'june': 'ژوئن',
      'july': 'ژوئیه',
      'august': 'اوت',
      'september': 'سپتامبر',
      'october': 'اکتبر',
      'november': 'نوامبر',
      'december': 'دسامبر',
      // Jalali Months
      'farvardin': 'فروردین',
      'ordibehesht': 'اردیبهشت',
      'khordad': 'خرداد',
      'tir': 'تیر',
      'mordad': 'مرداد',
      'shahrivar': 'شهریور',
      'mehr': 'مهر',
      'aban': 'آبان',
      'azar': 'آذر',
      'dey': 'دی',
      'bahman': 'بهمن',
      'esfand': 'اسفند',
      // Hijri Months
      'muharram': 'محرم',
      'safar': 'صفر',
      'rabi_al_awwal': 'ربیع الاول',
      'rabi_al_thani': 'ربیع الثانی',
      'jumada_al_awwal': 'جمادی الاول',
      'jumada_al_thani': 'جمادی الثانی',
      'rajab': 'رجب',
      'shaban': 'شعبان',
      'ramadan': 'رمضان',
      'shawwal': 'شوال',
      'dhu_al_qidah': 'ذی‌القعده',
      'dhu_al_hijjah': 'ذی‌الحجه',
      // Days
      'sunday': 'یکشنبه',
      'monday': 'دوشنبه',
      'tuesday': 'سه‌شنبه',
      'wednesday': 'چهارشنبه',
      'thursday': 'پنج‌شنبه',
      'friday': 'جمعه',
      'saturday': 'شنبه',
      // Day abbreviations
      'sun_short': 'ی',
      'mon_short': 'د',
      'tue_short': 'س',
      'wed_short': 'چ',
      'thu_short': 'پ',
      'fri_short': 'ج',
      'sat_short': 'ش',
      // Common
      'select_date': 'تاریخ را انتخاب کنید',
      'today': 'امروز',
      'clear': 'پاک کردن',
      'ok': 'تأیید',
      'cancel': 'لغو',
      'previous_month': 'ماه قبلی',
      'next_month': 'ماه بعدی',
      'previous_year': 'سال قبلی',
      'next_year': 'سال بعدی',
      'theme': 'تم',
      'language': 'زبان',
      'settings': 'تنظیمات',
      'about': 'درباره',
      'help': 'کمک',
      'close': 'بستن',
      'loading': 'در حال بارگذاری...',
      'error': 'خطا',
      'success': 'موفق',
      'warning': 'هشدار',
      'info': 'اطلاعات',
      // Theme selector
      'select_theme': 'انتخاب تم',
      'light_theme': 'تم روشن',
      'dark_theme': 'تم تاریک',
      'reset_default': 'بازنشانی پیشفرض',
      'theme_type': 'نوع تم',
      // Color picker
      'color_palette': 'پالت رنگی',
      'primary_color': 'رنگ اصلی',
      'secondary_color': 'رنگ ثانویه',
      'accent_color': 'رنگ تاکیدی',
      'preset_palettes': 'پالت‌های پیشفرض',
      'preset_palette': 'پالت پیشفرض',
      // Calendar
      'open_calendar': 'باز کردن تقویم',
      'calendar': 'تقویم',
      'date_calendar': 'تقویم تاریخ',
      'select_calendar_type': 'انتخاب نوع تقویم',
      'select_theme_color': 'انتخاب تم و رنگ',
      'day_info': 'اطلاعات روز',
      'dates_selected': 'تاریخ انتخاب شده',
      'from': 'از',
      // Accessibility
      'press_enter_to_select': 'برای انتخاب تاریخ، روی دکمه کلیک کنید یا Enter را فشار دهید',
      'selected': 'انتخاب شده',
      'not_selected': 'انتخاب نشده'
    },
    en: {
      // Gregorian Months
      'january': 'January',
      'february': 'February',
      'march': 'March',
      'april': 'April',
      'may': 'May',
      'june': 'June',
      'july': 'July',
      'august': 'August',
      'september': 'September',
      'october': 'October',
      'november': 'November',
      'december': 'December',
      // Jalali Months
      'farvardin': 'Farvardin',
      'ordibehesht': 'Ordibehesht',
      'khordad': 'Khordad',
      'tir': 'Tir',
      'mordad': 'Mordad',
      'shahrivar': 'Shahrivar',
      'mehr': 'Mehr',
      'aban': 'Aban',
      'azar': 'Azar',
      'dey': 'Dey',
      'bahman': 'Bahman',
      'esfand': 'Esfand',
      // Hijri Months
      'muharram': 'Muharram',
      'safar': 'Safar',
      'rabi_al_awwal': 'Rabi al-Awwal',
      'rabi_al_thani': 'Rabi al-Thani',
      'jumada_al_awwal': 'Jumada al-Awwal',
      'jumada_al_thani': 'Jumada al-Thani',
      'rajab': 'Rajab',
      'shaban': 'Shaban',
      'ramadan': 'Ramadan',
      'shawwal': 'Shawwal',
      'dhu_al_qidah': 'Dhu al-Qidah',
      'dhu_al_hijjah': 'Dhu al-Hijjah',
      // Days
      'sunday': 'Sunday',
      'monday': 'Monday',
      'tuesday': 'Tuesday',
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      // Day abbreviations
      'sun_short': 'S',
      'mon_short': 'M',
      'tue_short': 'T',
      'wed_short': 'W',
      'thu_short': 'T',
      'fri_short': 'F',
      'sat_short': 'S',
      // Common
      'select_date': 'Select a date',
      'today': 'Today',
      'clear': 'Clear',
      'ok': 'OK',
      'cancel': 'Cancel',
      'previous_month': 'Previous month',
      'next_month': 'Next month',
      'previous_year': 'Previous year',
      'next_year': 'Next year',
      'theme': 'Theme',
      'language': 'Language',
      'settings': 'Settings',
      'about': 'About',
      'help': 'Help',
      'close': 'Close',
      'loading': 'Loading...',
      'error': 'Error',
      'success': 'Success',
      'warning': 'Warning',
      'info': 'Information',
      // Theme selector
      'select_theme': 'Select Theme',
      'light_theme': 'Light Theme',
      'dark_theme': 'Dark Theme',
      'reset_default': 'Reset to Default',
      'theme_type': 'Theme Type',
      // Color picker
      'color_palette': 'Color Palette',
      'primary_color': 'Primary',
      'secondary_color': 'Secondary',
      'accent_color': 'Accent',
      'preset_palettes': 'Preset Palettes',
      'preset_palette': 'Preset Palette',
      // Calendar
      'open_calendar': 'Open calendar',
      'calendar': 'Calendar',
      'date_calendar': 'Date Calendar',
      'select_calendar_type': 'Select calendar type',
      'select_theme_color': 'Select theme and color',
      'day_info': 'Day Information',
      'dates_selected': 'dates selected',
      'from': 'from',
      // Accessibility
      'press_enter_to_select': 'Click the button or press Enter to select a date',
      'selected': 'selected',
      'not_selected': 'not selected'
    },
    ar: {
      // Gregorian Months
      'january': 'يناير',
      'february': 'فبراير',
      'march': 'مارس',
      'april': 'أبريل',
      'may': 'مايو',
      'june': 'يونيو',
      'july': 'يوليو',
      'august': 'أغسطس',
      'september': 'سبتمبر',
      'october': 'أكتوبر',
      'november': 'نوفمبر',
      'december': 'ديسمبر',
      // Jalali Months
      'farvardin': 'فروردين',
      'ordibehesht': 'أرديبهشت',
      'khordad': 'خرداد',
      'tir': 'تير',
      'mordad': 'مرداد',
      'shahrivar': 'شهريور',
      'mehr': 'مهر',
      'aban': 'آبان',
      'azar': 'آذر',
      'dey': 'دي',
      'bahman': 'بهمن',
      'esfand': 'إسفند',
      // Hijri Months
      'muharram': 'محرم',
      'safar': 'صفر',
      'rabi_al_awwal': 'ربيع الأول',
      'rabi_al_thani': 'ربيع الثاني',
      'jumada_al_awwal': 'جمادى الأولى',
      'jumada_al_thani': 'جمادى الثانية',
      'rajab': 'رجب',
      'shaban': 'شعبان',
      'ramadan': 'رمضان',
      'shawwal': 'شوال',
      'dhu_al_qidah': 'ذو القعدة',
      'dhu_al_hijjah': 'ذو الحجة',
      // Days
      'sunday': 'الأحد',
      'monday': 'الاثنين',
      'tuesday': 'الثلاثاء',
      'wednesday': 'الأربعاء',
      'thursday': 'الخميس',
      'friday': 'الجمعة',
      'saturday': 'السبت',
      // Day abbreviations
      'sun_short': 'ح',
      'mon_short': 'ن',
      'tue_short': 'ث',
      'wed_short': 'ر',
      'thu_short': 'خ',
      'fri_short': 'ج',
      'sat_short': 'س',
      // Common
      'select_date': 'اختر تاريخاً',
      'today': 'اليوم',
      'clear': 'مسح',
      'ok': 'موافق',
      'cancel': 'إلغاء',
      'previous_month': 'الشهر السابق',
      'next_month': 'الشهر التالي',
      'previous_year': 'السنة السابقة',
      'next_year': 'السنة التالية',
      'theme': 'المظهر',
      'language': 'اللغة',
      'settings': 'الإعدادات',
      'about': 'حول',
      'help': 'مساعدة',
      'close': 'إغلاق',
      'loading': 'جاري التحميل...',
      'error': 'خطأ',
      'success': 'نجح',
      'warning': 'تحذير',
      'info': 'معلومات',
      // Theme selector
      'select_theme': 'اختر المظهر',
      'light_theme': 'مظهر فاتح',
      'dark_theme': 'مظهر داكن',
      'reset_default': 'إعادة تعيين الافتراضي',
      'theme_type': 'نوع المظهر',
      // Color picker
      'color_palette': 'لوحة الألوان',
      'primary_color': 'اللون الأساسي',
      'secondary_color': 'اللون الثانوي',
      'accent_color': 'لون التمييز',
      'preset_palettes': 'لوحات محددة مسبقاً',
      'preset_palette': 'لوحة محددة مسبقاً',
      // Calendar
      'open_calendar': 'فتح التقويم',
      'calendar': 'التقويم',
      'date_calendar': 'تقويم التاريخ',
      'select_calendar_type': 'اختر نوع التقويم',
      'select_theme_color': 'اختر المظهر واللون',
      'day_info': 'معلومات اليوم',
      'dates_selected': 'تواريخ محددة',
      'from': 'من',
      // Accessibility
      'press_enter_to_select': 'انقر على الزر أو اضغط Enter لتحديد تاريخ',
      'selected': 'محدد',
      'not_selected': 'غير محدد'
    },
    ku: {
      // Gregorian Months
      'january': 'کانونی دوم',
      'february': 'شباط',
      'march': 'ئادار',
      'april': 'نیسان',
      'may': 'ئایار',
      'june': 'حزیران',
      'july': 'تموز',
      'august': 'آب',
      'september': 'ئیلول',
      'october': 'تشرین اول',
      'november': 'تشرین ثانی',
      'december': 'کانونی یول',
      // Jalali Months
      'farvardin': 'فەرڤەردین',
      'ordibehesht': 'ئوردیبەهشت',
      'khordad': 'خوردا',
      'tir': 'تیر',
      'mordad': 'موردا',
      'shahrivar': 'شەهریڤەر',
      'mehr': 'مەهر',
      'aban': 'ئابان',
      'azar': 'ئازەر',
      'dey': 'دەی',
      'bahman': 'بەهمەن',
      'esfand': 'ئەسفەند',
      // Hijri Months
      'muharram': 'موحەررەم',
      'safar': 'سەفەر',
      'rabi_al_awwal': 'ڕەبیعی یەکەم',
      'rabi_al_thani': 'ڕەبیعی دووەم',
      'jumada_al_awwal': 'جومادای یەکەم',
      'jumada_al_thani': 'جومادای دووەم',
      'rajab': 'ڕەجەب',
      'shaban': 'شەعبان',
      'ramadan': 'ڕەمەزان',
      'shawwal': 'شەوال',
      'dhu_al_qidah': 'زولقەعدە',
      'dhu_al_hijjah': 'زولحیججە',
      // Days
      'sunday': 'یەکشەممە',
      'monday': 'دووشەممە',
      'tuesday': 'سێشەممە',
      'wednesday': 'چوارشەممە',
      'thursday': 'پێنجشەممە',
      'friday': 'هەینی',
      'saturday': 'شەممە',
      // Day abbreviations
      'sun_short': 'ی',
      'mon_short': 'د',
      'tue_short': 'س',
      'wed_short': 'چ',
      'thu_short': 'پ',
      'fri_short': 'ه',
      'sat_short': 'ش',
      // Common
      'select_date': 'بەرواری هەڵبژێرە',
      'today': 'ئەمڕۆ',
      'clear': 'پاک کردن',
      'ok': 'باشە',
      'cancel': 'هەڵوەشاندن',
      'previous_month': 'مانگی پێشوو',
      'next_month': 'مانگی داهاتوو',
      'previous_year': 'ساڵی پێشوو',
      'next_year': 'ساڵی داهاتوو',
      'theme': 'شێوە',
      'language': 'زمان',
      'settings': 'ڕێکخستنەکان',
      'about': 'دەربارە',
      'help': 'یارمەتی',
      'close': 'داخستن',
      'loading': 'بارکردن...',
      'error': 'هەڵە',
      'success': 'سەرکەوتوو',
      'warning': 'ئاگاداری',
      'info': 'زانیاری',
      // Theme selector
      'select_theme': 'شێوە هەڵبژێرە',
      'light_theme': 'شێوەی ڕووناک',
      'dark_theme': 'شێوەی تاریک',
      'reset_default': 'گەڕانەوە بۆ بنەڕەت',
      'theme_type': 'جۆری شێوە',
      // Color picker
      'color_palette': 'پەلێتی ڕەنگ',
      'primary_color': 'ڕەنگی سەرەکی',
      'secondary_color': 'ڕەنگی لاوەکی',
      'accent_color': 'ڕەنگی تایبەت',
      'preset_palettes': 'پەلێتە پێشوەختەکان',
      'preset_palette': 'پەلێتی پێشوەخت',
      // Calendar
      'open_calendar': 'کردنەوەی ڕۆژژمێر',
      'calendar': 'ڕۆژژمێر',
      'date_calendar': 'ڕۆژژمێری بەروار',
      'select_calendar_type': 'جۆری ڕۆژژمێر هەڵبژێرە',
      'select_theme_color': 'شێوە و ڕەنگ هەڵبژێرە',
      'day_info': 'زانیاری ڕۆژ',
      'dates_selected': 'بەروار هەڵبژێردراوە',
      'from': 'لە',
      // Accessibility
      'press_enter_to_select': 'کرتە بکە یان Enter دابگرە بۆ هەڵبژاردنی بەروار',
      'selected': 'هەڵبژێردراوە',
      'not_selected': 'هەڵنەبژێردراوە'
    }
  };

  constructor() {
    this.loadLocaleFromStorage();
  }

  /**
   * بارگذاری زبان از localStorage
   */
  private loadLocaleFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem('jalali-locale');
    if (saved && this.isSupportedLocale(saved)) {
      this.currentLocale.next(saved as SupportedLocale);
    }
  }

  /**
   * بررسی زبان پشتیبانی‌شده
   */
  private isSupportedLocale(locale: string): locale is SupportedLocale {
    return ['fa', 'en', 'ar', 'ku'].includes(locale);
  }

  /**
   * دریافت زبان فعلی
   */
  getLocale(): SupportedLocale {
    return this.currentLocale.value;
  }

  /**
   * تنظیم زبان
   */
  setLocale(locale: SupportedLocale): void {
    if (this.isSupportedLocale(locale)) {
      this.currentLocale.next(locale);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('jalali-locale', locale);
      }
      this.applyLocaleDirection(locale);
    }
  }

  /**
   * اعمال جهت متن (RTL/LTR)
   */
  private applyLocaleDirection(locale: SupportedLocale): void {
    if (typeof document === 'undefined') return;
    const direction = ['fa', 'ar', 'ku'].includes(locale) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.lang = locale;
  }

  /**
   * ترجمه کلید
   */
  translate(key: string): string {
    const locale = this.getLocale();
    return this.translations[locale]?.[key] || key;
  }

  /**
   * ترجمه کلید با پارامترها
   */
  translateWithParams(key: string, params: { [key: string]: string }): string {
    let translated = this.translate(key);
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translated = translated.replace(`{{${paramKey}}}`, paramValue);
    });
    return translated;
  }

  /**
   * دریافت تمام ترجمه‌ها
   */
  getTranslations(): LocaleStrings {
    return this.translations[this.getLocale()];
  }

  /**
   * دریافت زبان‌های پشتیبانی‌شده
   */
  getSupportedLocales(): SupportedLocale[] {
    return ['fa', 'en', 'ar', 'ku'];
  }

  /**
   * اضافه کردن ترجمه سفارشی
   */
  addTranslation(locale: SupportedLocale, key: string, value: string): void {
    if (this.isSupportedLocale(locale)) {
      this.translations[locale][key] = value;
    }
  }

  /**
   * اضافه کردن ترجمه‌های سفارشی
   */
  addTranslations(locale: SupportedLocale, translations: LocaleStrings): void {
    if (this.isSupportedLocale(locale)) {
      this.translations[locale] = { ...this.translations[locale], ...translations };
    }
  }

  /**
   * دریافت جهت متن
   */
  getDirection(): 'rtl' | 'ltr' {
    const locale = this.getLocale();
    return ['fa', 'ar', 'ku'].includes(locale) ? 'rtl' : 'ltr';
  }

  /**
   * دریافت Observable زبان
   */
  getLocale$(): Observable<SupportedLocale> {
    return this.currentLocale$;
  }

  /**
   * دریافت نام روزهای هفته (مخفف)
   */
  getWeekDaysShort(): string[] {
    const locale = this.getLocale();
    return [
      this.translations[locale]['sat_short'],
      this.translations[locale]['sun_short'],
      this.translations[locale]['mon_short'],
      this.translations[locale]['tue_short'],
      this.translations[locale]['wed_short'],
      this.translations[locale]['thu_short'],
      this.translations[locale]['fri_short']
    ];
  }

  /**
   * دریافت نام روزهای هفته (کامل)
   */
  getWeekDaysFull(): string[] {
    const locale = this.getLocale();
    return [
      this.translations[locale]['saturday'],
      this.translations[locale]['sunday'],
      this.translations[locale]['monday'],
      this.translations[locale]['tuesday'],
      this.translations[locale]['wednesday'],
      this.translations[locale]['thursday'],
      this.translations[locale]['friday']
    ];
  }

  /**
   * دریافت نام ماه جلالی
   */
  getJalaliMonthName(month: number): string {
    const monthKeys = [
      'farvardin', 'ordibehesht', 'khordad', 'tir', 'mordad', 'shahrivar',
      'mehr', 'aban', 'azar', 'dey', 'bahman', 'esfand'
    ];
    return this.translate(monthKeys[month - 1]);
  }

  /**
   * دریافت نام ماه میلادی
   */
  getGregorianMonthName(month: number): string {
    const monthKeys = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    return this.translate(monthKeys[month - 1]);
  }

  /**
   * دریافت نام ماه قمری
   */
  getHijriMonthName(month: number): string {
    const monthKeys = [
      'muharram', 'safar', 'rabi_al_awwal', 'rabi_al_thani',
      'jumada_al_awwal', 'jumada_al_thani', 'rajab', 'shaban',
      'ramadan', 'shawwal', 'dhu_al_qidah', 'dhu_al_hijjah'
    ];
    return this.translate(monthKeys[month - 1]);
  }
}
