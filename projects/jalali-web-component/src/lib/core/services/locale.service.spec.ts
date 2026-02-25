import { LocaleService, SupportedLocale } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    service = new LocaleService();
  });

  afterEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('Initialization', () => {
    it('should create service instance', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with default locale (fa)', () => {
      expect(service.getLocale()).toBe('fa');
    });

    it('should load locale from localStorage if available', () => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('jalali-locale', 'en');
        const newService = new LocaleService();
        expect(newService.getLocale()).toBe('en');
      }
    });

    it('should ignore invalid locale from localStorage', () => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('jalali-locale', 'invalid');
        const newService = new LocaleService();
        expect(newService.getLocale()).toBe('fa');
      }
    });
  });

  describe('getLocale', () => {
    it('should return current locale', () => {
      expect(service.getLocale()).toBe('fa');
    });

    it('should return locale after setLocale', () => {
      service.setLocale('en');
      expect(service.getLocale()).toBe('en');
    });
  });

  describe('setLocale', () => {
    it('should set locale to fa', () => {
      service.setLocale('fa');
      expect(service.getLocale()).toBe('fa');
    });

    it('should set locale to en', () => {
      service.setLocale('en');
      expect(service.getLocale()).toBe('en');
    });

    it('should save locale to localStorage', () => {
      if (typeof localStorage !== 'undefined') {
        service.setLocale('en');
        expect(localStorage.getItem('jalali-locale')).toBe('en');
      }
    });

    it('should throw error for unsupported locale', () => {
      expect(() => service.setLocale('invalid' as SupportedLocale)).toThrow();
    });

    it('should apply locale direction to document', () => {
      if (typeof document !== 'undefined') {
        service.setLocale('fa');
        expect(document.documentElement.getAttribute('dir')).toBe('rtl');
        service.setLocale('en');
        expect(document.documentElement.getAttribute('dir')).toBe('ltr');
      }
    });

    it('should set document language attribute', () => {
      if (typeof document !== 'undefined') {
        service.setLocale('en');
        expect(document.documentElement.lang).toBe('en');
        service.setLocale('fa');
        expect(document.documentElement.lang).toBe('fa');
      }
    });

    it('should notify listeners on locale change', () => {
      const callback = jasmine.createSpy('callback');
      service.onChange(callback);
      service.setLocale('en');
      expect(callback).toHaveBeenCalledWith('en');
    });
  });

  describe('getDirection', () => {
    it('should return rtl for Persian locale', () => {
      expect(service.getDirection('fa')).toBe('rtl');
    });

    it('should return ltr for English locale', () => {
      expect(service.getDirection('en')).toBe('ltr');
    });

    it('should return direction for current locale when not specified', () => {
      service.setLocale('fa');
      expect(service.getDirection()).toBe('rtl');
      service.setLocale('en');
      expect(service.getDirection()).toBe('ltr');
    });
  });

  describe('getConfig', () => {
    it('should return locale config for Persian', () => {
      const config = service.getConfig('fa');
      expect(config.code).toBe('fa');
      expect(config.direction).toBe('rtl');
      expect(config.monthNames.length).toBe(12);
      expect(config.dayNames.length).toBe(7);
      expect(config.dayShortNames.length).toBe(7);
    });

    it('should return locale config for English', () => {
      const config = service.getConfig('en');
      expect(config.code).toBe('en');
      expect(config.direction).toBe('ltr');
      expect(config.monthNames.length).toBe(12);
      expect(config.dayNames.length).toBe(7);
      expect(config.dayShortNames.length).toBe(7);
    });

    it('should return config for current locale when not specified', () => {
      service.setLocale('en');
      const config = service.getConfig();
      expect(config.code).toBe('en');
      expect(config.direction).toBe('ltr');
    });
  });

  describe('translate', () => {
    it('should translate key to Persian', () => {
      service.setLocale('fa');
      expect(service.translate('today')).toBe('امروز');
      expect(service.translate('cancel')).toBe('لغو');
    });

    it('should translate key to English', () => {
      service.setLocale('en');
      expect(service.translate('today')).toBe('Today');
      expect(service.translate('cancel')).toBe('Cancel');
    });

    it('should return key if translation not found', () => {
      expect(service.translate('non_existent_key')).toBe('non_existent_key');
    });

    it('should translate month names', () => {
      service.setLocale('fa');
      expect(service.translate('farvardin')).toBe('فروردین');
      expect(service.translate('january')).toBe('ژانویه');
    });

    it('should translate day names', () => {
      service.setLocale('fa');
      expect(service.translate('saturday')).toBe('شنبه');
      expect(service.translate('sunday')).toBe('یکشنبه');
    });
  });

  describe('getText', () => {
    it('should get text for specific locale', () => {
      expect(service.getText('fa', 'today')).toBe('امروز');
      expect(service.getText('en', 'today')).toBe('Today');
    });

    it('should return key if locale not supported', () => {
      expect(service.getText('invalid' as SupportedLocale, 'today')).toBe('today');
    });

    it('should return key if translation not found', () => {
      expect(service.getText('fa', 'non_existent')).toBe('non_existent');
    });
  });

  describe('translateWithParams', () => {
    it('should translate with parameters', () => {
      const result = service.translateWithParams('from', { date: '2024-01-15' });
      expect(result).toContain('2024-01-15');
    });

    it('should handle multiple parameters', () => {
      const result = service.translateWithParams('from', {
        start: '2024-01-01',
        end: '2024-12-31'
      });
      expect(result).toContain('2024-01-01');
      expect(result).toContain('2024-12-31');
    });

    it('should return original text if no parameters match', () => {
      const result = service.translateWithParams('today', {});
      expect(result).toBe('امروز');
    });
  });

  describe('getTranslations', () => {
    it('should return all translations for current locale', () => {
      service.setLocale('fa');
      const translations = service.getTranslations();
      expect(translations['today']).toBe('امروز');
      expect(translations['cancel']).toBe('لغو');
    });

    it('should return copy of translations', () => {
      const translations1 = service.getTranslations();
      const translations2 = service.getTranslations();
      expect(translations1).not.toBe(translations2);
      expect(translations1).toEqual(translations2);
    });
  });

  describe('getTranslationsForLocale', () => {
    it('should return translations for specific locale', () => {
      const faPersian = service.getTranslationsForLocale('fa');
      const enEnglish = service.getTranslationsForLocale('en');
      expect(faPersian['today']).toBe('امروز');
      expect(enEnglish['today']).toBe('Today');
    });

    it('should return empty object for unsupported locale', () => {
      const translations = service.getTranslationsForLocale('invalid' as SupportedLocale);
      expect(Object.keys(translations).length).toBe(0);
    });
  });

  describe('getSupportedLocales', () => {
    it('should return array of supported locales', () => {
      const locales = service.getSupportedLocales();
      expect(locales).toEqual(['fa', 'en']);
    });

    it('should return exactly 2 locales', () => {
      const locales = service.getSupportedLocales();
      expect(locales.length).toBe(2);
    });
  });

  describe('addTranslation', () => {
    it('should add custom translation', () => {
      service.addTranslation('fa', 'custom_key', 'مقدار سفارشی');
      expect(service.translate('custom_key')).toBe('مقدار سفارشی');
    });

    it('should override existing translation', () => {
      service.addTranslation('fa', 'today', 'امروز (سفارشی)');
      expect(service.translate('today')).toBe('امروز (سفارشی)');
    });

    it('should throw error for unsupported locale', () => {
      expect(() => {
        service.addTranslation('invalid' as SupportedLocale, 'key', 'value');
      }).toThrow();
    });

    it('should add translation for specific locale only', () => {
      service.addTranslation('fa', 'custom', 'فارسی');
      service.addTranslation('en', 'custom', 'English');
      service.setLocale('fa');
      expect(service.translate('custom')).toBe('فارسی');
      service.setLocale('en');
      expect(service.translate('custom')).toBe('English');
    });
  });

  describe('addTranslations', () => {
    it('should add multiple custom translations', () => {
      const customTranslations = {
        'custom1': 'مقدار 1',
        'custom2': 'مقدار 2'
      };
      service.addTranslations('fa', customTranslations);
      expect(service.translate('custom1')).toBe('مقدار 1');
      expect(service.translate('custom2')).toBe('مقدار 2');
    });

    it('should merge with existing translations', () => {
      service.addTranslations('fa', { 'custom': 'سفارشی' });
      expect(service.translate('today')).toBe('امروز');
      expect(service.translate('custom')).toBe('سفارشی');
    });

    it('should throw error for unsupported locale', () => {
      expect(() => {
        service.addTranslations('invalid' as SupportedLocale, { key: 'value' });
      }).toThrow();
    });
  });

  describe('getWeekDaysShort', () => {
    it('should return 7 short day names for Persian', () => {
      const days = service.getWeekDaysShort('fa');
      expect(days.length).toBe(7);
      expect(days[0]).toBe('ش'); // Saturday
      expect(days[1]).toBe('ی'); // Sunday
    });

    it('should return 7 short day names for English', () => {
      const days = service.getWeekDaysShort('en');
      expect(days.length).toBe(7);
      expect(days[0]).toBe('S'); // Saturday
      expect(days[1]).toBe('S'); // Sunday
    });

    it('should return short days for current locale when not specified', () => {
      service.setLocale('fa');
      const days = service.getWeekDaysShort();
      expect(days[0]).toBe('ش');
    });
  });

  describe('getWeekDaysFull', () => {
    it('should return 7 full day names for Persian', () => {
      const days = service.getWeekDaysFull('fa');
      expect(days.length).toBe(7);
      expect(days[0]).toBe('شنبه'); // Saturday
      expect(days[1]).toBe('یکشنبه'); // Sunday
    });

    it('should return 7 full day names for English', () => {
      const days = service.getWeekDaysFull('en');
      expect(days.length).toBe(7);
      expect(days[0]).toBe('Saturday');
      expect(days[1]).toBe('Sunday');
    });

    it('should return full days for current locale when not specified', () => {
      service.setLocale('en');
      const days = service.getWeekDaysFull();
      expect(days[0]).toBe('Saturday');
    });
  });

  describe('getJalaliMonthNames', () => {
    it('should return 12 Jalali month names for Persian', () => {
      const months = service.getJalaliMonthNames('fa');
      expect(months.length).toBe(12);
      expect(months[0]).toBe('فروردین');
      expect(months[11]).toBe('اسفند');
    });

    it('should return 12 Jalali month names for English', () => {
      const months = service.getJalaliMonthNames('en');
      expect(months.length).toBe(12);
      expect(months[0]).toBe('Farvardin');
      expect(months[11]).toBe('Esfand');
    });

    it('should return months for current locale when not specified', () => {
      service.setLocale('fa');
      const months = service.getJalaliMonthNames();
      expect(months[0]).toBe('فروردین');
    });
  });

  describe('getJalaliMonthName', () => {
    it('should return Jalali month name by number for Persian', () => {
      expect(service.getJalaliMonthName(1, 'fa')).toBe('فروردین');
      expect(service.getJalaliMonthName(12, 'fa')).toBe('اسفند');
    });

    it('should return Jalali month name by number for English', () => {
      expect(service.getJalaliMonthName(1, 'en')).toBe('Farvardin');
      expect(service.getJalaliMonthName(12, 'en')).toBe('Esfand');
    });

    it('should use current locale when not specified', () => {
      service.setLocale('fa');
      expect(service.getJalaliMonthName(1)).toBe('فروردین');
    });

    it('should throw error for invalid month number', () => {
      expect(() => service.getJalaliMonthName(0)).toThrow();
      expect(() => service.getJalaliMonthName(13)).toThrow();
    });

    it('should work for all 12 months', () => {
      for (let i = 1; i <= 12; i++) {
        const name = service.getJalaliMonthName(i, 'fa');
        expect(name).toBeTruthy();
        expect(name.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getGregorianMonthNames', () => {
    it('should return 12 Gregorian month names for Persian', () => {
      const months = service.getGregorianMonthNames('fa');
      expect(months.length).toBe(12);
      expect(months[0]).toBe('ژانویه');
      expect(months[11]).toBe('دسامبر');
    });

    it('should return 12 Gregorian month names for English', () => {
      const months = service.getGregorianMonthNames('en');
      expect(months.length).toBe(12);
      expect(months[0]).toBe('January');
      expect(months[11]).toBe('December');
    });

    it('should return months for current locale when not specified', () => {
      service.setLocale('en');
      const months = service.getGregorianMonthNames();
      expect(months[0]).toBe('January');
    });
  });

  describe('getGregorianMonthName', () => {
    it('should return Gregorian month name by number for Persian', () => {
      expect(service.getGregorianMonthName(1, 'fa')).toBe('ژانویه');
      expect(service.getGregorianMonthName(12, 'fa')).toBe('دسامبر');
    });

    it('should return Gregorian month name by number for English', () => {
      expect(service.getGregorianMonthName(1, 'en')).toBe('January');
      expect(service.getGregorianMonthName(12, 'en')).toBe('December');
    });

    it('should use current locale when not specified', () => {
      service.setLocale('en');
      expect(service.getGregorianMonthName(1)).toBe('January');
    });

    it('should throw error for invalid month number', () => {
      expect(() => service.getGregorianMonthName(0)).toThrow();
      expect(() => service.getGregorianMonthName(13)).toThrow();
    });

    it('should work for all 12 months', () => {
      for (let i = 1; i <= 12; i++) {
        const name = service.getGregorianMonthName(i, 'en');
        expect(name).toBeTruthy();
        expect(name.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getHijriMonthNames', () => {
    it('should return 12 Hijri month names for Persian', () => {
      const months = service.getHijriMonthNames('fa');
      expect(months.length).toBe(12);
      expect(months[0]).toBe('محرم');
      expect(months[11]).toBe('ذی‌الحجه');
    });

    it('should return 12 Hijri month names for English', () => {
      const months = service.getHijriMonthNames('en');
      expect(months.length).toBe(12);
      expect(months[0]).toBe('Muharram');
      expect(months[11]).toBe('Dhu al-Hijjah');
    });

    it('should return months for current locale when not specified', () => {
      service.setLocale('fa');
      const months = service.getHijriMonthNames();
      expect(months[0]).toBe('محرم');
    });
  });

  describe('getHijriMonthName', () => {
    it('should return Hijri month name by number for Persian', () => {
      expect(service.getHijriMonthName(1, 'fa')).toBe('محرم');
      expect(service.getHijriMonthName(12, 'fa')).toBe('ذی‌الحجه');
    });

    it('should return Hijri month name by number for English', () => {
      expect(service.getHijriMonthName(1, 'en')).toBe('Muharram');
      expect(service.getHijriMonthName(12, 'en')).toBe('Dhu al-Hijjah');
    });

    it('should use current locale when not specified', () => {
      service.setLocale('fa');
      expect(service.getHijriMonthName(1)).toBe('محرم');
    });

    it('should throw error for invalid month number', () => {
      expect(() => service.getHijriMonthName(0)).toThrow();
      expect(() => service.getHijriMonthName(13)).toThrow();
    });

    it('should work for all 12 months', () => {
      for (let i = 1; i <= 12; i++) {
        const name = service.getHijriMonthName(i, 'en');
        expect(name).toBeTruthy();
        expect(name.length).toBeGreaterThan(0);
      }
    });
  });

  describe('onChange', () => {
    it('should register listener for locale changes', () => {
      const callback = jasmine.createSpy('callback');
      service.onChange(callback);
      service.setLocale('en');
      expect(callback).toHaveBeenCalledWith('en');
    });

    it('should call listener with new locale', () => {
      const callback = jasmine.createSpy('callback');
      service.onChange(callback);
      service.setLocale('en');
      expect(callback).toHaveBeenCalledWith('en');
      service.setLocale('fa');
      expect(callback).toHaveBeenCalledWith('fa');
    });

    it('should return unsubscribe function', () => {
      const callback = jasmine.createSpy('callback');
      const unsubscribe = service.onChange(callback);
      service.setLocale('en');
      expect(callback).toHaveBeenCalledTimes(1);
      unsubscribe();
      service.setLocale('fa');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should support multiple listeners', () => {
      const callback1 = jasmine.createSpy('callback1');
      const callback2 = jasmine.createSpy('callback2');
      service.onChange(callback1);
      service.onChange(callback2);
      service.setLocale('en');
      expect(callback1).toHaveBeenCalledWith('en');
      expect(callback2).toHaveBeenCalledWith('en');
    });

    it('should not call unsubscribed listener', () => {
      const callback1 = jasmine.createSpy('callback1');
      const callback2 = jasmine.createSpy('callback2');
      const unsubscribe1 = service.onChange(callback1);
      service.onChange(callback2);
      unsubscribe1();
      service.setLocale('en');
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledWith('en');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid locale changes', () => {
      service.setLocale('en');
      service.setLocale('fa');
      service.setLocale('en');
      expect(service.getLocale()).toBe('en');
    });

    it('should handle empty translation keys', () => {
      expect(service.translate('')).toBe('');
    });

    it('should handle special characters in translations', () => {
      service.addTranslation('fa', 'special', 'تست@#$%');
      expect(service.translate('special')).toBe('تست@#$%');
    });

    it('should preserve translations after locale change', () => {
      const faTranslations = service.getTranslationsForLocale('fa');
      service.setLocale('en');
      service.setLocale('fa');
      const faTranslationsAfter = service.getTranslationsForLocale('fa');
      expect(faTranslations).toEqual(faTranslationsAfter);
    });

    it('should handle localStorage unavailability gracefully', () => {
      const originalLocalStorage = global.localStorage;
      // @ts-ignore
      delete global.localStorage;
      const newService = new LocaleService();
      expect(newService.getLocale()).toBe('fa');
      global.localStorage = originalLocalStorage;
    });
  });

  describe('Type Safety', () => {
    it('should only accept supported locales', () => {
      const validLocales: SupportedLocale[] = ['fa', 'en'];
      validLocales.forEach(locale => {
        expect(() => service.setLocale(locale)).not.toThrow();
      });
    });

    it('should return correct types from methods', () => {
      const locale = service.getLocale();
      expect(typeof locale).toBe('string');

      const direction = service.getDirection();
      expect(['rtl', 'ltr']).toContain(direction);

      const locales = service.getSupportedLocales();
      expect(Array.isArray(locales)).toBe(true);

      const config = service.getConfig();
      expect(config.code).toBeDefined();
      expect(config.direction).toBeDefined();
      expect(Array.isArray(config.monthNames)).toBe(true);
      expect(Array.isArray(config.dayNames)).toBe(true);
      expect(Array.isArray(config.dayShortNames)).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    it('should work with multiple service instances', () => {
      const service1 = new LocaleService();
      const service2 = new LocaleService();
      service1.setLocale('en');
      service2.setLocale('fa');
      expect(service1.getLocale()).toBe('en');
      expect(service2.getLocale()).toBe('fa');
    });

    it('should maintain state across method calls', () => {
      service.setLocale('en');
      expect(service.translate('today')).toBe('Today');
      expect(service.getDirection()).toBe('ltr');
      expect(service.getLocale()).toBe('en');
    });

    it('should handle complex translation scenarios', () => {
      service.setLocale('fa');
      const jalaliMonths = service.getJalaliMonthNames();
      const gregorianMonths = service.getGregorianMonthNames();
      const hijriMonths = service.getHijriMonthNames();
      expect(jalaliMonths.length).toBe(12);
      expect(gregorianMonths.length).toBe(12);
      expect(hijriMonths.length).toBe(12);
      expect(jalaliMonths[0]).not.toBe(gregorianMonths[0]);
      expect(gregorianMonths[0]).not.toBe(hijriMonths[0]);
    });
  });
});
