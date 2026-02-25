import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JalaliDatePickerComponent, LocaleService, SupportedLocale } from '../../../jalali-date-picker/src/public-api';

interface DemoTexts {
  title: string;
  subtitle: string;
  installTitle: string;
  usageTitle: string;
  example1Title: string;
  example1Desc: string;
  example1Code: string;
  example2Title: string;
  example2Desc: string;
  example2Code: string;
  example3Title: string;
  example3Desc: string;
  example3Code: string;
  example4Title: string;
  example4Desc: string;
  example4Code: string;
  selectModeTitle: string;
  singleMode: string;
  rangeMode: string;
  multipleMode: string;
  demoTitle: string;
  resultsTitle: string;
  selectedDate: string;
  selectedRange: string;
  selectedDates: string;
  noRangeSelected: string;
  noDatesSelected: string;
  calendarsTitle: string;
  jalaliCalendar: string;
  gregorianCalendar: string;
  hijriCalendar: string;
  calendarsDesc: string;
  themesTitle: string;
  theme1: string;
  theme2: string;
  theme3: string;
  themesDesc: string;
  languagesTitle: string;
  persianLang: string;
  englishLang: string;
  arabicLang: string;
  kurdishLang: string;
  languagesDesc: string;
  accessibilityTitle: string;
  keyboardNav: string;
  screenReader: string;
  accessibilityDesc: string;
  performanceTitle: string;
  changeDetection: string;
  caching: string;
  lazyLoading: string;
  performanceDesc: string;
  selectionModesTitle: string;
  singleSelection: string;
  rangeSelection: string;
  multipleSelection: string;
  selectionModesDesc: string;
  footerText: string;
  version: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, JalaliDatePickerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'تقویم جلالی';
  selectedDate: Date = new Date();
  selectionMode: 'single' | 'range' | 'multiple' = 'single';
  selectedRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  selectedDates: Date[] = [];
  currentLocale: SupportedLocale = 'fa';

  private texts: { [key: string]: DemoTexts } = {
    fa: {
      title: '📚 راهنمای استفاده از تقویم جلالی',
      subtitle: 'کامپوننت Angular و Web Component برای تقویم فارسی',
      installTitle: '📦 نصب کتابخانه',
      usageTitle: '💻 نحوه استفاده در پروژه',
      example1Title: '1️⃣ Angular Component',
      example1Desc: 'استفاده در Angular:',
      example1Code: 'import { JalaliDatePickerComponent } from "@lomineuro/jalali-date-picker";\n\n<jalali-date-picker \n  [selectedDate]="selectedDate" \n  (dateSelect)="onDateSelect($event)">\n</jalali-date-picker>',
      example2Title: '2️⃣ Web Component (Vanilla JS)',
      example2Desc: 'استفاده در HTML/JavaScript:',
      example2Code: '<jalali-date-picker \n  locale="fa" \n  selection-mode="single">\n</jalali-date-picker>\n\n<script>\n  const picker = document.querySelector(\'jalali-date-picker\');\n  picker.addEventListener(\'dateSelect\', (e) => {\n    console.log(\'Selected:\', e.detail.jalaliDate);\n  });\n</script>',
      example3Title: '3️⃣ React Integration',
      example3Desc: 'استفاده در React:',
      example3Code: 'import { useRef, useEffect } from \'react\';\nimport \'jalali-web-component\';\n\nexport function DatePicker() {\n  const pickerRef = useRef(null);\n  useEffect(() => {\n    pickerRef.current?.addEventListener(\'dateSelect\', (e) => {\n      console.log(\'Selected:\', e.detail.jalaliDate);\n    });\n  }, []);\n  return <jalali-date-picker ref={pickerRef} locale="fa"></jalali-date-picker>;\n}',
      example4Title: '4️⃣ Vue Integration',
      example4Desc: 'استفاده در Vue:',
      example4Code: '<template>\n  <jalali-date-picker \n    ref="picker"\n    locale="fa"\n    @dateSelect="onDateSelect">\n  </jalali-date-picker>\n</template>\n\n<script>\nexport default {\n  methods: {\n    onDateSelect(e) {\n      console.log(\'Selected:\', e.detail.jalaliDate);\n    }\n  }\n}\n</script>',
      selectModeTitle: '🎯 انتخاب حالت:',
      singleMode: 'تک تاریخ',
      rangeMode: 'محدوده',
      multipleMode: 'چند تاریخ',
      demoTitle: '🎨 تست',
      resultsTitle: '📊 نتیجه',
      selectedDate: 'تاریخ:',
      selectedRange: 'محدوده:',
      selectedDates: 'تاریخ‌ها',
      noRangeSelected: 'دو تاریخ انتخاب کنید',
      noDatesSelected: 'تاریخی انتخاب نشده',
      calendarsTitle: '📅 سه تقویم',
      jalaliCalendar: 'جلالی',
      gregorianCalendar: 'میلادی',
      hijriCalendar: 'قمری',
      calendarsDesc: 'تبدیل خودکار',
      themesTitle: '🎨 تم‌های قابل تنظیم',
      theme1: 'روشن/تاریک',
      theme2: 'شیشه‌ای',
      theme3: 'متغیرهای CSS',
      themesDesc: 'انتخاب تم',
      languagesTitle: '🌍 دو زبانه',
      persianLang: 'فارسی',
      englishLang: 'انگلیسی',
      arabicLang: '',
      kurdishLang: '',
      languagesDesc: 'پشتیبانی از فارسی و انگلیسی با RTL/LTR خودکار',
      accessibilityTitle: '♿ دسترسی‌پذیری',
      keyboardNav: 'کیبورد',
      screenReader: 'صفحه‌خوان',
      accessibilityDesc: 'WCAG',
      performanceTitle: '⚡ عملکرد',
      changeDetection: 'OnPush',
      caching: 'کش',
      lazyLoading: 'بارگذاری',
      performanceDesc: 'Angular',
      selectionModesTitle: '🎯 سه حالت',
      singleSelection: 'تک',
      rangeSelection: 'محدوده',
      multipleSelection: 'چند',
      selectionModesDesc: 'انعطاف‌پذیر',
      footerText: '💚 ساخته شده توسط امیررضا غفاریان',
      version: 'نسخه 1.0.0 | @lomineuro/jalali-date-picker + jalali-web-component'
    },
    en: {
      title: '📚 Usage Guide',
      subtitle: 'Angular Component & Web Component for Persian Calendar',
      installTitle: '📦 Installation',
      usageTitle: '💻 How to Use',
      example1Title: '1️⃣ Angular Component',
      example1Desc: 'Usage in Angular:',
      example1Code: 'import { JalaliDatePickerComponent } from "@lomineuro/jalali-date-picker";\n\n<jalali-date-picker \n  [selectedDate]="selectedDate" \n  (dateSelect)="onDateSelect($event)">\n</jalali-date-picker>',
      example2Title: '2️⃣ Web Component (Vanilla JS)',
      example2Desc: 'Usage in HTML/JavaScript:',
      example2Code: '<jalali-date-picker \n  locale="fa" \n  selection-mode="single">\n</jalali-date-picker>\n\n<script>\n  const picker = document.querySelector(\'jalali-date-picker\');\n  picker.addEventListener(\'dateSelect\', (e) => {\n    console.log(\'Selected:\', e.detail.jalaliDate);\n  });\n</script>',
      example3Title: '3️⃣ React Integration',
      example3Desc: 'Usage in React:',
      example3Code: 'import { useRef, useEffect } from \'react\';\nimport \'jalali-web-component\';\n\nexport function DatePicker() {\n  const pickerRef = useRef(null);\n  useEffect(() => {\n    pickerRef.current?.addEventListener(\'dateSelect\', (e) => {\n      console.log(\'Selected:\', e.detail.jalaliDate);\n    });\n  }, []);\n  return <jalali-date-picker ref={pickerRef} locale="fa"></jalali-date-picker>;\n}',
      example4Title: '4️⃣ Vue Integration',
      example4Desc: 'Usage in Vue:',
      example4Code: '<template>\n  <jalali-date-picker \n    ref="picker"\n    locale="fa"\n    @dateSelect="onDateSelect">\n  </jalali-date-picker>\n</template>\n\n<script>\nexport default {\n  methods: {\n    onDateSelect(e) {\n      console.log(\'Selected:\', e.detail.jalaliDate);\n    }\n  }\n}\n</script>',
      selectModeTitle: '🎯 Select Mode:',
      singleMode: 'Single',
      rangeMode: 'Range',
      multipleMode: 'Multiple',
      demoTitle: '🎨 Test',
      resultsTitle: '📊 Result',
      selectedDate: 'Date:',
      selectedRange: 'Range:',
      selectedDates: 'Dates',
      noRangeSelected: 'Select two dates',
      noDatesSelected: 'No dates',
      calendarsTitle: '📅 Three Calendars',
      jalaliCalendar: 'Jalali',
      gregorianCalendar: 'Gregorian',
      hijriCalendar: 'Hijri',
      calendarsDesc: 'Auto conversion',
      themesTitle: '🎨 Customizable Themes',
      theme1: 'Light/Dark',
      theme2: 'Glassmorphism',
      theme3: 'CSS Variables',
      themesDesc: 'Select theme',
      languagesTitle: '🌍 Bilingual',
      persianLang: 'Persian',
      englishLang: 'English',
      arabicLang: '',
      kurdishLang: '',
      languagesDesc: 'Supports Persian and English with auto RTL/LTR',
      accessibilityTitle: '♿ Accessibility',
      keyboardNav: 'Keyboard',
      screenReader: 'Screen reader',
      accessibilityDesc: 'WCAG',
      performanceTitle: '⚡ Performance',
      changeDetection: 'OnPush',
      caching: 'Caching',
      lazyLoading: 'Lazy loading',
      performanceDesc: 'Angular',
      selectionModesTitle: '🎯 Three Modes',
      singleSelection: 'Single',
      rangeSelection: 'Range',
      multipleSelection: 'Multiple',
      selectionModesDesc: 'Flexible',
      footerText: '💚 Made by Amirreza Ghafarian',
      version: 'Version 1.0.0 | @lomineuro/jalali-date-picker + jalali-web-component'
    },

  };

  constructor(private localeService: LocaleService) {}

  get currentTexts(): DemoTexts {
    return this.texts[this.currentLocale];
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }

  // تبدیل تاریخ میلادی به جلالی برای نمایش
  getJalaliDate(date: Date): string {
    if (!date) return '';
    
    const gy = date.getFullYear();
    const gm = date.getMonth() + 1;
    const gd = date.getDate();

    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    let jy: number;
    let gy2 = gy;
    if (gy2 > 1600) {
      jy = 979;
      gy2 -= 1600;
    } else {
      jy = 0;
      gy2 -= 621;
    }

    const gy3 = (gm > 2) ? (gy2 + 1) : gy2;
    let days = (365 * gy2) + (Math.floor((gy3 + 3) / 4)) - (Math.floor((gy3 + 99) / 100)) + 
               (Math.floor((gy3 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;

    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }

    let jm: number;
    let jd: number;
    
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }

    const jalaliMonths = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];

    const monthName = jalaliMonths[jm - 1];
    
    if (this.currentLocale === 'fa') {
      return `${jd} ${monthName} ${jy}`;
    } else {
      return `${monthName} ${jd}, ${jy}`;
    }
  }

  onRangeSelect(range: { start: Date; end: Date }) {
    this.selectedRange = range;
  }

  onMultipleSelect(dates: Date[]) {
    this.selectedDates = dates;
  }

  switchMode(mode: 'single' | 'range' | 'multiple') {
    this.selectionMode = mode;
    this.selectedDate = new Date();
    this.selectedRange = { start: null, end: null };
    this.selectedDates = [];
  }

  switchLocale(locale: SupportedLocale) {
    this.currentLocale = locale;
    this.localeService.setLocale(locale);
  }

  onLocaleChange(locale: SupportedLocale) {
    this.currentLocale = locale;
  }
}