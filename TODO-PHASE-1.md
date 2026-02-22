# فاز ۱: اصلاح خطاهای فوری - لیست تفصیلی

## 🔴 اولویت: بحرانی
**مهلت**: 1-2 روز | **هدف**: Build بدون خطا

---

## ۱. اصلاح ThemeService

### ۱.۱ حذف کد تکراری و ناقص
**فایل**: `projects/jalali-date-picker/src/lib/core/services/theme.service.ts`

**مشکلات موجود**:
- ❌ متدهای تکراری: `getCurrentTheme()`, `setTheme()`
- ❌ متدهای ناقص: `getDefaultTheme()`, `initializeThemes()`, `loadThemeFromStorage()`
- ❌ متدهای استفاده نشده: `applyTheme()`, `saveThemeToStorage()`
- ❌ مشکل در تعریف `ThemeConfig`
- ❌ مشکل در تعریف ثابت‌های تم

**راه‌حل**:
```typescript
// ۱. تعریف ثابت‌های تم
const DEFAULT_PALETTE: ColorPalette = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  accent: '#f59e0b',
  background: '#ffffff',
  surface: '#f9fafb',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6'
};

const DEFAULT_DARK_PALETTE: ColorPalette = {
  primary: '#60a5fa',
  secondary: '#818cf8',
  accent: '#fbbf24',
  background: '#1f2937',
  surface: '#111827',
  text: '#f3f4f6',
  textSecondary: '#d1d5db',
  border: '#374151',
  success: '#34d399',
  warning: '#fcd34d',
  error: '#f87171',
  info: '#60a5fa'
};

const DEFAULT_THEME: ThemeConfig = {
  name: 'light',
  displayName: 'تم روشن',
  isDark: false,
  colors: DEFAULT_PALETTE,
  // ... باقی properties
};

const ALL_THEMES: ThemeConfig[] = [
  DEFAULT_THEME,
  // ... تم‌های دیگر
];
```

### ۱.۲ بازنویسی ThemeService
```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeConfig>(DEFAULT_THEME);
  private colorPalette = new BehaviorSubject<ColorPalette>(DEFAULT_PALETTE);

  currentTheme$ = this.currentTheme.asObservable();
  colorPalette$ = this.colorPalette.asObservable();

  constructor() {
    this.loadThemeFromStorage();
  }

  private loadThemeFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    
    const savedTheme = localStorage.getItem('jalali-datepicker-theme');
    const savedPalette = localStorage.getItem('jalali-datepicker-palette');
    
    if (savedTheme) {
      const theme = ALL_THEMES.find(t => t.name === savedTheme);
      if (theme) this.currentTheme.next(theme);
    }
    
    if (savedPalette) {
      try {
        const palette = JSON.parse(savedPalette) as ColorPalette;
        this.colorPalette.next(palette);
      } catch {
        // ignore
      }
    }
  }

  private saveThemeToStorage(themeName: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('jalali-datepicker-theme', themeName);
  }

  private applyTheme(theme: ThemeConfig): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.name);
    
    // اعمال CSS Custom Properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }

  getCurrentTheme(): ThemeConfig {
    return this.currentTheme.value;
  }

  setTheme(themeName: string): void {
    const theme = ALL_THEMES.find(t => t.name === themeName);
    if (theme) {
      this.currentTheme.next(theme);
      this.applyTheme(theme);
      this.saveThemeToStorage(themeName);
    }
  }

  getCurrentPalette(): ColorPalette {
    return this.colorPalette.value;
  }

  setPalette(palette: ColorPalette): void {
    this.colorPalette.next(palette);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jalali-datepicker-palette', JSON.stringify(palette));
    }
  }

  getThemes(): ThemeConfig[] {
    return ALL_THEMES;
  }

  getPresetPalettes(isDark = false): ColorPalette[] {
    return isDark ? PRESET_DARK_PALETTES : PRESET_PALETTES;
  }

  toggleDarkMode(): void {
    const current = this.getCurrentTheme();
    const newTheme = current.isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  resetTheme(): void {
    this.setTheme('light');
    this.setPalette(DEFAULT_PALETTE);
  }
}
```

**تکالیف**:
- [ ] حذف کد تکراری
- [ ] تعریف ثابت‌های تم
- [ ] بازنویسی متدها
- [ ] اضافه کردن observables
- [ ] تست کردن

---

## ۲. اصلاح HolidaysService

### ۲.۱ اضافه کردن متدهای مورد نیاز
**فایل**: `projects/jalali-date-picker/src/lib/core/services/holidays.service.ts`

**متدهای مورد نیاز**:
```typescript
// متدهای موجود اما ناقص
isOfficialHoliday(date: Date): boolean {
  const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
  const holiday = this.getHolidayInfo(jalaliDate);
  return holiday?.type === 'official' || false;
}

isNonOfficialHoliday(date: Date): boolean {
  const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
  const holiday = this.getHolidayInfo(jalaliDate);
  return holiday?.type === 'non-official' || false;
}

isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay();
  // جمعه (5) و شنبه (6) در ایران تعطیل هستند
  return dayOfWeek === 5 || dayOfWeek === 6;
}

getHolidayInfo(date: Date): { isHoliday: boolean; type?: string } {
  const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
  const holiday = this.getHolidayInfoByJalali(jalaliDate);
  return {
    isHoliday: !!holiday,
    type: holiday?.type
  };
}

private getHolidayInfoByJalali(jalaliDate: JalaliDate): Holiday | null {
  return Array.from(this.holidays.values()).find(
    h => h.jalaliMonth === jalaliDate.month && h.jalaliDay === jalaliDate.day
  ) || null;
}
```

**تکالیف**:
- [ ] اضافه کردن `jalaliDateService` به constructor
- [ ] پیاده‌سازی `isOfficialHoliday()`
- [ ] پیاده‌سازی `isNonOfficialHoliday()`
- [ ] پیاده‌سازی `isWeekend()`
- [ ] پیاده‌سازی `getHolidayInfo()`
- [ ] تست کردن

---

## ۳. اصلاح JalaliCalendarUtils

### ۳.۱ پیاده‌سازی الگوریتم‌های تبدیل تاریخ
**فایل**: `projects/jalali-date-picker/src/lib/core/utils/jalali-calendar.utils.ts`

**الگوریتم‌های مورد نیاز**:

#### ۳.۱.۱ تبدیل میلادی به جلالی
```typescript
static gregorianToJalali(gregorianDate: Date): { year: number; month: number; day: number } {
  const gy = gregorianDate.getFullYear();
  const gm = gregorianDate.getMonth() + 1;
  const gd = gregorianDate.getDate();

  let jy, jm, jd;
  const g_d_n = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
  const j_d_n = 365 * 1600 + 97 + 1;
  const d_n = g_d_n - j_d_n;
  const j_np = Math.floor(d_n / 146097);
  let d_n_rem = d_n % 146097;
  let j_np_rem = Math.floor(d_n_rem / 36524);
  if (j_np_rem === 4) j_np_rem = 3;
  d_n_rem = d_n_rem % 36524;
  const j_ny = Math.floor(d_n_rem / 365);
  let d_n_rem2 = d_n_rem % 365;
  jy = 1600 + 400 * j_np + 100 * j_np_rem + 4 * j_ny;
  if (d_n_rem2 >= 366) {
    d_n_rem2 -= 366;
    jy += Math.floor(d_n_rem2 / 365) + 1;
    d_n_rem2 = d_n_rem2 % 365;
  }

  const jp = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gm_idx = gm - 1;
  let gd_of_year = jp[gm_idx] + gd;
  if (gm > 2 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) {
    gd_of_year += 1;
  }

  const jp2 = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 366];
  let jm_idx = 0;
  for (let i = 0; i < 13; i++) {
    if (gd_of_year <= jp2[i]) {
      jm_idx = i;
      break;
    }
  }
  jm = jm_idx;
  jd = gd_of_year - jp2[jm_idx - 1];

  return { year: jy, month: jm, day: jd };
}
```

#### ۳.۱.۲ تبدیل جلالی به میلادی
```typescript
static jalaliToGregorian(jy: number, jm: number, jd: number): Date {
  // الگوریتم معکوس
  // ...
  return new Date(gy, gm - 1, gd);
}
```

#### ۳.۱.۳ تبدیل میلادی به قمری
```typescript
static gregorianToHijri(gregorianDate: Date): { year: number; month: number; day: number } {
  // الگوریتم تبدیل
  // ...
}
```

#### ۳.۱.۴ تبدیل قمری به میلادی
```typescript
static hijriToGregorian(hy: number, hm: number, hd: number): Date {
  // الگوریتم معکوس
  // ...
}
```

**تکالیف**:
- [ ] پیاده‌سازی `gregorianToJalali()`
- [ ] پیاده‌سازی `jalaliToGregorian()`
- [ ] پیاده‌سازی `gregorianToHijri()`
- [ ] پیاده‌سازی `hijriToGregorian()`
- [ ] پیاده‌سازی `getDaysInJalaliMonth()`
- [ ] پیاده‌سازی `getFirstDayOfJalaliMonth()`
- [ ] پیاده‌سازی `getDaysInHijriMonth()`
- [ ] پیاده‌سازی `getFirstDayOfHijriMonth()`
- [ ] پیاده‌سازی `getJalaliMonthName()`
- [ ] پیاده‌سازی `getJalaliDayName()`
- [ ] پیاده‌سازی `isHoliday()`
- [ ] پیاده‌سازی `getEvents()`
- [ ] پیاده‌سازی `getSeason()`
- [ ] پیاده‌سازی `getWeekNumber()`
- [ ] پیاده‌سازی `formatJalaliDate()`
- [ ] پیاده‌سازی `formatGregorianDate()`
- [ ] پیاده‌سازی `formatHijriDate()`
- [ ] تست کردن

---

## ۴. تست Build

### ۴.۱ اجرای Build
```bash
ng build jalali-date-picker
```

**نتیجه مورد انتظار**:
- ✅ بدون خطای TypeScript
- ✅ بدون خطای Runtime
- ✅ فایل‌های dist تولید شده

**تکالیف**:
- [ ] اجرای build
- [ ] بررسی خطاها
- [ ] اصلاح خطاها
- [ ] تکرار تا موفقیت

---

## 📋 چک‌لیست نهایی فاز ۱

### ThemeService
- [ ] حذف کد تکراری
- [ ] تعریف ثابت‌های تم
- [ ] پیاده‌سازی `getDefaultTheme()`
- [ ] پیاده‌سازی `initializeThemes()`
- [ ] پیاده‌سازی `loadThemeFromStorage()`
- [ ] پیاده‌سازی `applyTheme()`
- [ ] پیاده‌سازی `saveThemeToStorage()`
- [ ] اضافه کردن observables
- [ ] تست کردن

### HolidaysService
- [ ] اضافه کردن `jalaliDateService`
- [ ] پیاده‌سازی `isOfficialHoliday()`
- [ ] پیاده‌سازی `isNonOfficialHoliday()`
- [ ] پیاده‌سازی `isWeekend()`
- [ ] پیاده‌سازی `getHolidayInfo()`
- [ ] تست کردن

### JalaliCalendarUtils
- [ ] پیاده‌سازی `gregorianToJalali()`
- [ ] پیاده‌سازی `jalaliToGregorian()`
- [ ] پیاده‌سازی `gregorianToHijri()`
- [ ] پیاده‌سازی `hijriToGregorian()`
- [ ] پیاده‌سازی `getDaysInJalaliMonth()`
- [ ] پیاده‌سازی `getFirstDayOfJalaliMonth()`
- [ ] پیاده‌سازی `getDaysInHijriMonth()`
- [ ] پیاده‌سازی `getFirstDayOfHijriMonth()`
- [ ] پیاده‌سازی `getJalaliMonthName()`
- [ ] پیاده‌سازی `getJalaliDayName()`
- [ ] پیاده‌سازی `isHoliday()`
- [ ] پیاده‌سازی `getEvents()`
- [ ] پیاده‌سازی `getSeason()`
- [ ] پیاده‌سازی `getWeekNumber()`
- [ ] پیاده‌سازی `formatJalaliDate()`
- [ ] پیاده‌سازی `formatGregorianDate()`
- [ ] پیاده‌سازی `formatHijriDate()`
- [ ] تست کردن

### Build
- [ ] اجرای `ng build jalali-date-picker`
- [ ] بررسی خطاهای TypeScript
- [ ] بررسی خطاهای Runtime
- [ ] تأیید موفقیت build

---

## 🎯 معیارهای موفقیت فاز ۱

✅ **موفق** اگر:
1. Build بدون خطا اجرا شود
2. تمام متدهای مورد نیاز پیاده‌سازی شوند
3. کامپوننت‌ها بدون خطا کار کنند
4. تمام تکالیف تکمیل شوند

❌ **ناموفق** اگر:
1. Build خطا داشته باشد
2. متدهای مورد نیاز ناقص باشند
3. کامپوننت‌ها خطا دهند
4. تکالیف تکمیل نشوند

---

*آخرین به‌روزرسانی: 1403/11/30*
