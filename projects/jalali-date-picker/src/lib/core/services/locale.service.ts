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
      'sunday': 'یکشنبه',
      'monday': 'دوشنبه',
      'tuesday': 'سه‌شنبه',
      'wednesday': 'چهارشنبه',
      'thursday': 'پنج‌شنبه',
      'friday': 'جمعه',
      'saturday': 'شنبه',
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
      'info': 'اطلاعات'
    },
    en: {
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
      'sunday': 'Sunday',
      'monday': 'Monday',
      'tuesday': 'Tuesday',
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
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
      'info': 'Information'
    },
    ar: {
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
      'sunday': 'الأحد',
      'monday': 'الاثنين',
      'tuesday': 'الثلاثاء',
      'wednesday': 'الأربعاء',
      'thursday': 'الخميس',
      'friday': 'الجمعة',
      'saturday': 'السبت',
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
      'info': 'معلومات'
    },
    ku: {
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
      'sunday': 'یەکشەممە',
      'monday': 'دووشەممە',
      'tuesday': 'سێشەممە',
      'wednesday': 'چوارشەممە',
      'thursday': 'پێنجشەممە',
      'friday': 'هەینی',
      'saturday': 'شەممە',
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
      'info': 'زانیاری'
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
}
