# معماری و طراحی - تقویم جلالی تعاملی

## 📐 معماری کلی

```
┌─────────────────────────────────────────────────────────┐
│                    Demo Application                      │
│              (projects/demo/src/app)                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Jalali Date Picker Library                  │
│         (projects/jalali-date-picker/src/lib)           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Components Layer                     │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ • JalaliDatePickerComponent (Main)               │  │
│  │ • JalaliCalendarComponent (Calendar Grid)        │  │
│  │ • CalendarSwitchComponent (Jalali/Gregorian)    │  │
│  │ • ThemeSelectorComponent (Theme Switcher)       │  │
│  │ • ColorPickerComponent (Color Customization)    │  │
│  │ • DayInfoModalComponent (Day Details)           │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│                         │                               │
│  ┌──────────────────────┴──────────────────────────┐  │
│  │              Services Layer                      │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ • JalaliDateService (Date Conversion)           │  │
│  │ • ThemeService (Theme Management)               │  │
│  │ • HolidaysService (Holiday Management)          │  │
│  │ • CacheService (Performance Optimization)       │  │
│  │ • LocaleService (Internationalization)          │  │
│  │ • EventService (Event Management)               │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│                         │                               │
│  ┌──────────────────────┴──────────────────────────┐  │
│  │              Utilities & Models                  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ • JalaliCalendarUtils (Algorithms)              │  │
│  │ • Models (JalaliDate, Theme, Holiday, etc.)     │  │
│  │ • Constants (Months, Days, Themes)              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ ساختار فایل‌ها

```
projects/jalali-date-picker/src/lib/
├── components/
│   ├── calendar/
│   │   ├── jalali-calendar.component.ts
│   │   ├── jalali-calendar.component.html
│   │   └── jalali-calendar.component.scss
│   ├── calendar-switch/
│   │   ├── calendar-switch.component.ts
│   │   ├── calendar-switch.component.html
│   │   └── calendar-switch.component.scss
│   ├── color-picker/
│   │   ├── color-picker.component.ts
│   │   ├── color-picker.component.html
│   │   └── color-picker.component.scss
│   ├── date-picker/
│   │   ├── jalali-date-picker.component.ts
│   │   ├── jalali-date-picker.component.html
│   │   └── jalali-date-picker.component.scss
│   ├── day-info-modal/
│   │   ├── day-info-modal.component.ts
│   │   ├── day-info-modal.component.html
│   │   └── day-info-modal.component.scss
│   └── theme-selector/
│       ├── theme-selector.component.ts
│       ├── theme-selector.component.html
│       └── theme-selector.component.scss
├── core/
│   ├── models/
│   │   ├── jalali-date.model.ts
│   │   ├── theme.model.ts
│   │   ├── holiday.model.ts
│   │   ├── event.model.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── jalali-date.service.ts
│   │   ├── theme.service.ts
│   │   ├── holidays.service.ts
│   │   ├── cache.service.ts
│   │   ├── locale.service.ts
│   │   ├── event.service.ts
│   │   └── index.ts
│   └── utils/
│       ├── jalali-calendar.utils.ts
│       ├── date-formatter.utils.ts
│       ├── color.utils.ts
│       └── index.ts
├── themes/
│   ├── index.scss
│   ├── global-styles.scss
│   ├── animations.scss
│   ├── utilities.scss
│   ├── dark-light-modes.scss
│   ├── sci-fi-theme.scss
│   ├── glassmorphism-theme.scss
│   ├── hud-theme.scss
│   ├── windows-95-theme.scss
│   ├── minimal-theme.scss
│   ├── aurora-theme.scss
│   ├── desert-theme.scss
│   ├── forest-theme.scss
│   ├── ocean-theme.scss
│   ├── sunset-theme.scss
│   ├── midnight-theme.scss
│   ├── luxury-theme.scss
│   ├── gradient-theme.scss
│   ├── neon-theme.scss
│   ├── terminal-theme.scss
│   ├── monochrome-theme.scss
│   ├── paper-theme.scss
│   ├── pastel-theme.scss
│   └── rose-theme.scss
├── jalali-date-picker.module.ts
├── jalali-date-picker.ts (Public API)
└── jalali-date-picker.spec.ts
```

---

## 🔄 جریان داده‌ها (Data Flow)

### ۱. انتخاب تاریخ
```
User Click on Date
    ↓
JalaliCalendarComponent.onDateClick()
    ↓
JalaliDatePickerComponent.selectDate()
    ↓
JalaliDateService.validateDate()
    ↓
CacheService.cache(result)
    ↓
@Output() dateSelected.emit(date)
    ↓
Parent Component receives date
```

### ۲. تغییر تم
```
User selects Theme
    ↓
ThemeSelectorComponent.onThemeChange()
    ↓
ThemeService.setTheme(themeName)
    ↓
ThemeService.applyTheme()
    ↓
CSS Custom Properties updated
    ↓
localStorage.setItem('jalali-theme', themeName)
    ↓
All components update via currentTheme$ Observable
```

### ۳. نمایش اطلاعات روز
```
User clicks on Day
    ↓
JalaliCalendarComponent.onDayClick()
    ↓
DayInfoModalComponent.open()
    ↓
JalaliDateService.getDateInfo()
    ↓
HolidaysService.getHolidayInfo()
    ↓
Modal displays complete information
```

---

## 📦 مدل‌های داده

### JalaliDate Model
```typescript
interface JalaliDate {
  year: number;      // سال جلالی (1400+)
  month: number;     // ماه (1-12)
  day: number;       // روز (1-31)
}
```

### GregorianDate Model
```typescript
interface GregorianDate {
  year: number;      // سال میلادی
  month: number;     // ماه (1-12)
  day: number;       // روز (1-31)
}
```

### HijriDate Model
```typescript
interface HijriDate {
  year: number;      // سال قمری
  month: number;     // ماه (1-12)
  day: number;       // روز (1-30)
}
```

### Theme Model
```typescript
interface ThemeConfig {
  name: string;              // نام تم (sci-fi, glassmorphism, etc.)
  displayName: string;       // نام نمایشی
  isDark: boolean;           // تم تاریک یا روشن
  colors: ColorPalette;      // پالت رنگی
  description?: string;      // توضیح تم
}

interface ColorPalette {
  primary: string;           // رنگ اصلی
  secondary: string;         // رنگ ثانویه
  accent: string;            // رنگ تأکیدی
  background: string;        // رنگ پس‌زمینه
  surface: string;           // رنگ سطح
  text: string;              // رنگ متن
  textSecondary: string;     // رنگ متن ثانویه
  border: string;            // رنگ مرز
  success: string;           // رنگ موفقیت
  warning: string;           // رنگ هشدار
  error: string;             // رنگ خطا
  info: string;              // رنگ اطلاعات
}
```

### Holiday Model
```typescript
interface Holiday {
  id: string;                // شناسه منحصر
  name: string;              // نام تعطیل
  jalaliMonth: number;       // ماه جلالی
  jalaliDay: number;         // روز جلالی
  type: 'official' | 'non-official' | 'religious' | 'custom';
  description?: string;      // توضیح
  source?: string;           // منبع
}
```

### DayInfo Model
```typescript
interface DayInfo {
  jalaliDate: JalaliDate;
  gregorianDate: GregorianDate;
  hijriDate: HijriDate;
  dayOfWeek: string;         // نام روز هفته
  weekNumber: number;        // شماره هفته
  dayOfYear: number;         // روز سال
  isHoliday: boolean;
  holidayInfo?: Holiday;
  events: string[];          // رویدادهای روز
  season: string;            // فصل
  moonPhase?: string;        // فاز ماه
  weather?: string;          // وضعیت آب‌وهوا
  notes?: string;            // یادداشت‌های شخصی
}
```

---

## 🎨 سیستم تم‌ها

### ۱. Sci-Fi Theme
**ویژگی‌ها**:
- رنگ‌های نئونی (آبی، بنفش، سبز)
- خطوط اسکن متحرک
- پارتیکل‌های پس‌زمینه
- افکت‌های نوری
- فونت مونوسپیس

**CSS Variables**:
```scss
--sci-fi-primary: #00ff00;
--sci-fi-secondary: #ff00ff;
--sci-fi-accent: #00ffff;
--sci-fi-glow: 0 0 10px rgba(0, 255, 0, 0.5);
```

### ۲. Glassmorphism Theme
**ویژگی‌ها**:
- Blur effect
- شفافیت لایه‌ای
- مرزهای نرم
- سایه‌های عمیق
- رنگ‌های روشن

**CSS Variables**:
```scss
--glass-blur: 10px;
--glass-opacity: 0.8;
--glass-border: 1px solid rgba(255, 255, 255, 0.2);
```

### ۳. HUD Theme
**ویژگی‌ها**:
- رنگ سبز CRT
- خطوط اسکن
- فلیکر متحرک
- فونت مونوسپیس
- افکت‌های رترو

**CSS Variables**:
```scss
--hud-primary: #00ff00;
--hud-background: #001100;
--hud-scanline: repeating-linear-gradient(...);
```

### ۴. Windows 95 Theme
**ویژگی‌ها**:
- پنجره‌های کلاسیک
- دکمه‌های سه‌بعدی
- فونت پیکسلی
- آیکون‌های وینتاژ
- رنگ‌های رترو

**CSS Variables**:
```scss
--win95-face: #c0c0c0;
--win95-highlight: #dfdfdf;
--win95-shadow: #808080;
```

### ۵. Minimal Theme
**ویژگی‌ها**:
- تایپوگرافی برجسته
- فضای سفید زیاد
- رنگ‌های ساده
- طراحی تمیز
- بدون تزئینات

**CSS Variables**:
```scss
--minimal-primary: #000000;
--minimal-background: #ffffff;
--minimal-accent: #cccccc;
```

---

## 🔐 معماری سرویس‌ها

### JalaliDateService
**مسئولیت‌ها**:
- تبدیل تاریخ‌ها
- محاسبات تاریخی
- اعتبارسنجی تاریخ
- کش کردن نتایج

**متدهای اصلی**:
```typescript
gregorianToJalali(date: Date): JalaliDate
jalaliToGregorian(jalaliDate: JalaliDate): Date
gregorianToHijri(date: Date): HijriDate
hijriToGregorian(hijriDate: HijriDate): Date
isLeapYear(year: number, calendarType: 'jalali' | 'gregorian' | 'hijri'): boolean
getMonthDays(year: number, month: number, calendarType: string): number
```

### ThemeService
**مسئولیت‌ها**:
- مدیریت تم‌های فعلی
- اعمال تم‌ها
- ذخیره تنظیمات
- مدیریت رنگ‌های سفارشی

**متدهای اصلی**:
```typescript
getCurrentTheme(): ThemeConfig
setTheme(themeName: string): void
getCurrentPalette(): ColorPalette
setPalette(palette: ColorPalette): void
getThemes(): ThemeConfig[]
toggleDarkMode(): void
```

### HolidaysService
**مسئولیت‌ها**:
- مدیریت تعطیلات
- بررسی تعطیل بودن روز
- مدیریت تعطیلات سفارشی
- دریافت اطلاعات تعطیل

**متدهای اصلی**:
```typescript
isOfficialHoliday(date: Date): boolean
isNonOfficialHoliday(date: Date): boolean
isWeekend(date: Date): boolean
getHolidayInfo(date: Date): HolidayInfo
addHoliday(holiday: Holiday): void
removeHoliday(holidayId: string): void
```

### CacheService
**مسئولیت‌ها**:
- کش کردن نتایج محاسبات
- بهینه‌سازی عملکرد
- مدیریت حافظه

**متدهای اصلی**:
```typescript
get<T>(key: string): T | null
set<T>(key: string, value: T, ttl?: number): void
has(key: string): boolean
clear(): void
getStats(): CacheStats
```

---

## 🎯 الگوهای طراحی

### ۱. Observable Pattern
```typescript
// ThemeService
currentTheme$ = this.currentTheme.asObservable();

// Component
this.themeService.currentTheme$.subscribe(theme => {
  this.applyTheme(theme);
});
```

### ۲. Singleton Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class JalaliDateService {
  // تنها یک نمونه در کل اپلیکیشن
}
```

### ۳. Strategy Pattern
```typescript
// استراتژی‌های مختلف برای تبدیل تاریخ
class DateConverter {
  convert(date: Date, strategy: ConversionStrategy): any {
    return strategy.convert(date);
  }
}
```

### ۴. Decorator Pattern
```typescript
// کش کردن نتایج متدها
@Cacheable()
gregorianToJalali(date: Date): JalaliDate {
  // محاسبه
}
```

---

## 🚀 بهینه‌سازی عملکرد

### ۱. Change Detection
```typescript
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### ۲. Lazy Loading
```typescript
const routes: Routes = [
  {
    path: 'calendar',
    loadComponent: () => import('./calendar.component')
      .then(m => m.CalendarComponent)
  }
];
```

### ۳. Virtual Scrolling
```typescript
<cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
  <div *cdkVirtualFor="let item of items" class="example-item">
    {{item}}
  </div>
</cdk-virtual-scroll-viewport>
```

### ۴. Debouncing
```typescript
this.searchInput.valueChanges
  .pipe(debounceTime(300))
  .subscribe(value => this.search(value));
```

---

## 🧪 استراتژی تست

### Unit Tests
- تست هر سرویس به‌طور جداگانه
- تست هر کامپوننت به‌طور جداگانه
- Mock کردن وابستگی‌ها

### Integration Tests
- تست تعامل بین سرویس‌ها
- تست تعامل بین کامپوننت‌ها
- تست جریان داده‌ها

### E2E Tests
- تست کل Flow انتخاب تاریخ
- تست تغییر تم
- تست Responsive Design

---

## 📱 Responsive Design

### Breakpoints
```scss
$mobile: 320px;      // موبایل
$tablet: 768px;      // تبلت
$desktop: 1024px;    // دسکتاپ
$wide: 1920px;       // صفحه عریض
```

### Mobile-First Approach
```scss
// موبایل (پیش‌فرض)
.calendar {
  grid-template-columns: 1fr;
}

// تبلت
@media (min-width: $tablet) {
  .calendar {
    grid-template-columns: repeat(2, 1fr);
  }
}

// دسکتاپ
@media (min-width: $desktop) {
  .calendar {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🌐 بین‌المللی‌سازی (i18n)

### پشتیبانی‌شده زبان‌ها
- فارسی (fa)
- انگلیسی (en)
- عربی (ar)
- کردی (ku)

### ساختار ترجمه
```
src/assets/i18n/
├── fa.json
├── en.json
├── ar.json
└── ku.json
```

---

## 🔒 امنیت

### XSS Prevention
```typescript
// استفاده از Angular's built-in sanitization
<div [innerHTML]="userContent | sanitizeHtml"></div>
```

### CSRF Protection
```typescript
// استفاده از HttpClientXsrfModule
HttpClientXsrfModule.withOptions({
  cookieName: 'XSRF-TOKEN',
  headerName: 'X-XSRF-TOKEN'
})
```

---

*آخرین به‌روزرسانی: 1403/11/30*
