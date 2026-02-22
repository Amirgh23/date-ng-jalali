# راهنمای سریع پیاده‌سازی - تقویم جلالی تعاملی

## 🚀 شروع فوری (۱۵ دقیقه)

### ۱. نصب و راه‌اندازی

```bash
# ۱. نصب وابستگی‌ها
npm install

# ۲. اجرای dev server
npm run dev

# ۳. باز کردن مرورگر
# http://localhost:4200
```

### ۲. ساختار پروژه

```
projects/jalali-date-picker/src/lib/
├── components/          # کامپوننت‌ها
├── core/
│   ├── models/         # مدل‌های داده
│   ├── services/       # سرویس‌ها
│   └── utils/          # توابع کمکی
└── themes/             # استایل‌های تم
```

### ۳. فایل‌های مهم

| فایل | توضیح | وضعیت |
|------|-------|-------|
| `theme.service.ts` | مدیریت تم‌ها | 88% ✅ |
| `holidays.service.ts` | مدیریت تعطیلات | 90% ✅ |
| `jalali-calendar.utils.ts` | الگوریتم‌های تبدیل | 95% ✅ |
| `jalali-date.service.ts` | سرویس تاریخ | 100% ✅ |
| `cache.service.ts` | کش کردن | 100% ✅ |

---

## 🎯 فاز ۱: اصلاح خطاهای فوری (۱-۲ روز)

### مرحله ۱: تکمیل ThemeService

**فایل**: `projects/jalali-date-picker/src/lib/core/services/theme.service.ts`

**کارهای باقی‌مانده**:
1. اضافه کردن متد `applyTheme()`
2. اضافه کردن متد `saveThemeToStorage()`
3. تست localStorage

**کد اضافی**:
```typescript
private applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme.name);
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

private saveThemeToStorage(themeName: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('jalali-datepicker-theme', themeName);
}
```

**اضافه کردن به `setTheme()`**:
```typescript
setTheme(name: string): void {
  const theme = ALL_THEMES.find(t => t.name === name);
  if (theme) {
    this.currentTheme.next(theme);
    this.colorPalette.next(theme.colors);
    this.applyTheme(theme);  // ✨ اضافه کنید
    this.saveThemeToStorage(name);  // ✨ اضافه کنید
  }
}
```

### مرحله ۲: تست Build

```bash
# اجرای build
ng build jalali-date-picker

# بررسی نتیجه
# ✅ بدون خطا
# ✅ فایل‌های dist تولید شده
```

### مرحله ۳: تأیید موفقیت

```bash
# بررسی فایل‌های dist
ls dist/jalali-date-picker/

# نتیجه مورد انتظار:
# ✅ dist/jalali-date-picker/
# ✅ dist/jalali-date-picker/package.json
# ✅ dist/jalali-date-picker/README.md
# ✅ dist/jalali-date-picker/lib/
```

---

## 📋 فاز ۲: تکمیل سرویس‌های اصلی (۲-۳ روز)

### مرحله ۱: بهبود JalaliDateService

**فایل**: `projects/jalali-date-picker/src/lib/core/services/jalali-date.service.ts`

**متدهای جدید**:
```typescript
getMonthDays(year: number, month: number, calendarType: 'jalali' | 'gregorian' | 'hijri'): number {
  if (calendarType === 'jalali') {
    return JalaliCalendarUtils.getDaysInJalaliMonth(year, month);
  } else if (calendarType === 'gregorian') {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && this.isLeapYear(year, 'gregorian')) return 29;
    return daysInMonth[month - 1];
  } else {
    return JalaliCalendarUtils.getDaysInHijriMonth(year, month);
  }
}

isLeapYear(year: number, calendarType: 'jalali' | 'gregorian' | 'hijri'): boolean {
  if (calendarType === 'jalali') {
    return JalaliCalendarUtils.isJalaliLeapYear(year);
  } else if (calendarType === 'gregorian') {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  } else {
    return JalaliCalendarUtils.isHijriLeapYear(year);
  }
}
```

### مرحله ۲: تکمیل HolidaysService

**فایل**: `projects/jalali-date-picker/src/lib/core/services/holidays.service.ts`

**اضافه کردن تعطیلات قمری**:
```typescript
private initializeDefaultHolidays(): void {
  // ... کد موجود ...
  
  // تعطیلات قمری
  const hijriHolidays: Holiday[] = [
    { id: 'eid-fitr', name: 'عید فطر', jalaliMonth: 1, jalaliDay: 1, type: 'religious' },
    { id: 'eid-adha', name: 'عید قربان', jalaliMonth: 1, jalaliDay: 10, type: 'religious' },
    { id: 'ashura', name: 'عاشورا', jalaliMonth: 1, jalaliDay: 9, type: 'religious' }
  ];
  
  hijriHolidays.forEach(holiday => {
    this.holidays.set(holiday.id, holiday);
  });
}
```

### مرحله ۳: ایجاد LocaleService

**فایل**: `projects/jalali-date-picker/src/lib/core/services/locale.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocale = new BehaviorSubject<string>('fa');
  currentLocale$ = this.currentLocale.asObservable();
  
  private translations: { [key: string]: { [key: string]: string } } = {
    fa: {
      'january': 'ژانویه',
      'february': 'فوریه',
      'march': 'مارس',
      // ...
    },
    en: {
      'january': 'January',
      'february': 'February',
      'march': 'March',
      // ...
    }
  };
  
  setLocale(locale: string): void {
    this.currentLocale.next(locale);
  }
  
  getLocale(): string {
    return this.currentLocale.value;
  }
  
  translate(key: string): string {
    const locale = this.getLocale();
    return this.translations[locale]?.[key] || key;
  }
}
```

---

## 🎨 فاز ۳: تکمیل کامپوننت‌های اصلی (۳-۴ روز)

### مرحله ۱: بهبود JalaliDatePickerComponent

**فایل**: `projects/jalali-date-picker/src/lib/components/date-picker/jalali-date-picker.component.ts`

**اضافه کردن Inputs و Outputs**:
```typescript
@Input() disabled: boolean = false;
@Input() placeholder: string = 'تاریخ را انتخاب کنید';
@Input() format: string = 'YYYY/MM/DD';
@Input() locale: string = 'fa';
@Output() blur = new EventEmitter<void>();
@Output() focus = new EventEmitter<void>();

onFocus(): void {
  this.focus.emit();
}

onBlur(): void {
  this.blur.emit();
}
```

### مرحله ۲: بهبود JalaliCalendarComponent

**فایل**: `projects/jalali-date-picker/src/lib/components/calendar/jalali-calendar.component.ts`

**اضافه کردن نماهای مختلف**:
```typescript
enum CalendarView {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  DECADE = 'decade'
}

currentView: CalendarView = CalendarView.DAY;

switchToMonthView(): void {
  this.currentView = CalendarView.MONTH;
}

switchToYearView(): void {
  this.currentView = CalendarView.YEAR;
}

switchToDayView(): void {
  this.currentView = CalendarView.DAY;
}
```

### مرحله ۳: بهبود ThemeSelectorComponent

**فایل**: `projects/jalali-date-picker/src/lib/components/theme-selector/theme-selector.component.ts`

**اضافه کردن پیش‌نمایش زنده**:
```typescript
previewTheme(themeName: string): void {
  this.themeService.setTheme(themeName);
}

toggleDarkMode(): void {
  this.themeService.toggleDarkMode();
}

resetTheme(): void {
  this.themeService.resetTheme();
}
```

---

## 🎯 فاز ۴: قابلیت‌های انتخاب تاریخ (۳-۴ روز)

### مرحله ۱: انتخاب بازه تاریخ

**فایل**: `projects/jalali-date-picker/src/lib/components/calendar/jalali-calendar.component.ts`

```typescript
@Input() selectionMode: 'single' | 'range' | 'multiple' = 'single';
@Output() dateRangeSelected = new EventEmitter<DateRange>();

private startDate: JalaliDate | null = null;
private endDate: JalaliDate | null = null;

onDateClick(date: JalaliDate): void {
  if (this.selectionMode === 'range') {
    if (!this.startDate) {
      this.startDate = date;
    } else if (!this.endDate) {
      this.endDate = date;
      this.dateRangeSelected.emit({ start: this.startDate, end: this.endDate });
      this.startDate = null;
      this.endDate = null;
    }
  }
}
```

### مرحله ۲: انتخاب چند تاریخ

```typescript
private selectedDates: JalaliDate[] = [];
@Input() maxSelections: number = 10;
@Output() datesSelected = new EventEmitter<JalaliDate[]>();

onDateClick(date: JalaliDate): void {
  if (this.selectionMode === 'multiple') {
    const index = this.selectedDates.findIndex(d => 
      d.year === date.year && d.month === date.month && d.day === date.day
    );
    
    if (index > -1) {
      this.selectedDates.splice(index, 1);
    } else if (this.selectedDates.length < this.maxSelections) {
      this.selectedDates.push(date);
    }
    
    this.datesSelected.emit(this.selectedDates);
  }
}
```

---

## 🎨 فاز ۵: سیستم تم‌های متنوع (۲-۳ روز)

### مرحله ۱: ایجاد تم‌های جدید

**فایل**: `projects/jalali-date-picker/src/lib/themes/sci-fi-theme.scss`

```scss
[data-theme="sci-fi"] {
  --primary: #00ff00;
  --secondary: #ff00ff;
  --accent: #00ffff;
  --background: #000000;
  --text: #00ff00;
  --border: 1px solid #00ff00;
  
  .calendar {
    background: linear-gradient(135deg, #000000 0%, #001100 100%);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 255, 0, 0.03) 0px,
        rgba(0, 255, 0, 0.03) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      animation: scanlines 8s linear infinite;
    }
  }
  
  @keyframes scanlines {
    0% { transform: translateY(0); }
    100% { transform: translateY(10px); }
  }
}
```

### مرحله ۲: اضافه کردن تم‌های دیگر

**فایل**: `projects/jalali-date-picker/src/lib/themes/glassmorphism-theme.scss`

```scss
[data-theme="glassmorphism"] {
  --primary: #ffffff;
  --secondary: #e0e0e0;
  --accent: #b0b0b0;
  --background: rgba(255, 255, 255, 0.1);
  --text: #ffffff;
  
  .calendar {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}
```

---

## 🧪 فاز ۶: دسترسی‌پذیری و بهینه‌سازی (۲-۳ روز)

### مرحله ۱: اضافه کردن ARIA Labels

```typescript
// در template
<div 
  role="grid"
  aria-label="تقویم جلالی"
  aria-describedby="calendar-description">
  <!-- محتوای تقویم -->
</div>

<button
  aria-label="ماه قبلی"
  (click)="previousMonth()">
  ◀
</button>

<button
  aria-label="ماه بعدی"
  (click)="nextMonth()">
  ▶
</button>
```

### مرحله ۲: اضافه کردن Keyboard Navigation

```typescript
@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowLeft':
      this.previousMonth();
      break;
    case 'ArrowRight':
      this.nextMonth();
      break;
    case 'ArrowUp':
      this.previousYear();
      break;
    case 'ArrowDown':
      this.nextYear();
      break;
    case 'Enter':
      this.selectCurrentDate();
      break;
  }
}
```

### مرحله ۳: بهینه‌سازی عملکرد

```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  // ✨ اضافه کنید
})
export class CalendarComponent {
  // ...
}
```

---

## 🧪 فاز ۷: تست و مستندات (۳-۴ روز)

### مرحله ۱: نوشتن Unit Tests

```typescript
// jalali-date.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { JalaliDateService } from './jalali-date.service';

describe('JalaliDateService', () => {
  let service: JalaliDateService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JalaliDateService);
  });
  
  it('should convert gregorian to jalali', () => {
    const gregorianDate = new Date(2024, 0, 1);
    const jalaliDate = service.gregorianToJalali(gregorianDate);
    expect(jalaliDate.year).toBe(1402);
  });
});
```

### مرحله ۲: نوشتن مستندات

```markdown
# JalaliDatePickerComponent

## توضیح
تقویم جلالی تعاملی با پشتیبانی کامل

## استفاده

\`\`\`typescript
<app-jalali-date-picker
  [theme]="'minimal'"
  (dateSelected)="onDateSelected($event)">
</app-jalali-date-picker>
\`\`\`

## Inputs
- `theme`: نام تم
- `locale`: زبان
- `disabled`: غیرفعال کردن

## Outputs
- `dateSelected`: رویداد انتخاب تاریخ
```

---

## 📦 فاز ۸: انتشار (۲-۳ روز)

### مرحله ۱: آماده‌سازی

```bash
# به‌روزرسانی نسخه
npm version patch

# Build
npm run build:lib
```

### مرحله ۲: انتشار

```bash
# ورود به npm
npm login

# انتشار
npm publish
```

---

## ✅ چک‌لیست نهایی

### فاز ۱
- [ ] تکمیل ThemeService
- [ ] اجرای build موفق
- [ ] بدون خطای TypeScript

### فاز ۲
- [ ] تکمیل سرویس‌ها
- [ ] اضافه کردن LocaleService
- [ ] تست‌های اولیه

### فاز ۳
- [ ] تکمیل کامپوننت‌ها
- [ ] اضافه کردن Inputs/Outputs
- [ ] بهبود Responsive Design

### فاز ۴
- [ ] انتخاب بازه تاریخ
- [ ] انتخاب چند تاریخ
- [ ] تست‌های جامع

### فاز ۵
- [ ] 20+ تم طراحی
- [ ] سیستم رنگ پویا
- [ ] CSS Custom Properties

### فاز ۶
- [ ] ARIA labels
- [ ] Keyboard Navigation
- [ ] WCAG 2.1 AA

### فاز ۷
- [ ] 80%+ Test Coverage
- [ ] مستندات کامل
- [ ] Storybook

### فاز ۸
- [ ] npm Package
- [ ] GitHub Release
- [ ] اطلاع‌رسانی

---

## 🚀 بعدی

**امروز**: تکمیل فاز ۱
**فردا**: شروع فاز ۲
**هفته آینده**: فاز ۳-۴
**ماه آینده**: تکمیل و انتشار

---

*آخرین به‌روزرسانی: 1403/11/30*
