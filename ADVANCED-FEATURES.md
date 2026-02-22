# ویژگی‌های پیشرفته - تقویم جلالی تعاملی

## 🎯 ویژگی‌های اصلی

### ۱. سیستم انتخاب تاریخ متقدم

#### ۱.۱ انتخاب تک تاریخ (Single Selection)
```typescript
// استفاده
<app-jalali-date-picker 
  [selectionMode]="'single'"
  (dateSelected)="onDateSelected($event)">
</app-jalali-date-picker>

// نتیجه
onDateSelected(date: JalaliDate) {
  console.log('تاریخ انتخاب‌شده:', date);
}
```

#### ۱.۲ انتخاب بازه تاریخ (Range Selection)
```typescript
// استفاده
<app-jalali-date-picker 
  [selectionMode]="'range'"
  (dateRangeSelected)="onDateRangeSelected($event)">
</app-jalali-date-picker>

// نتیجه
onDateRangeSelected(range: DateRange) {
  console.log('تاریخ شروع:', range.start);
  console.log('تاریخ پایان:', range.end);
}
```

#### ۱.۳ انتخاب چند تاریخ (Multiple Selection)
```typescript
// استفاده
<app-jalali-date-picker 
  [selectionMode]="'multiple'"
  [maxSelections]="5"
  (datesSelected)="onDatesSelected($event)">
</app-jalali-date-picker>

// نتیجه
onDatesSelected(dates: JalaliDate[]) {
  console.log('تاریخ‌های انتخاب‌شده:', dates);
}
```

#### ۱.۴ انتخاب هفته (Week Selection)
```typescript
// استفاده
<app-jalali-date-picker 
  [selectionMode]="'week'"
  (weekSelected)="onWeekSelected($event)">
</app-jalali-date-picker>

// نتیجه
onWeekSelected(week: WeekInfo) {
  console.log('هفته:', week.weekNumber);
  console.log('روزهای هفته:', week.days);
}
```

#### ۱.۵ انتخاب ماه (Month Selection)
```typescript
// استفاده
<app-jalali-date-picker 
  [selectionMode]="'month'"
  (monthSelected)="onMonthSelected($event)">
</app-jalali-date-picker>

// نتیجه
onMonthSelected(month: MonthInfo) {
  console.log('ماه:', month.monthName);
  console.log('روزهای ماه:', month.days);
}
```

---

### ۲. سیستم تم‌های متقدم

#### ۲.۱ تم‌های پیش‌فرض (20+ تم)

**تم‌های روشن**:
- Minimal: طراحی ساده و مدرن
- Paper: طراحی کاغذی
- Pastel: رنگ‌های نرم و آرام
- Rose: رنگ‌های گلابی
- Aurora: شفق قطبی
- Desert: رنگ‌های صحرا
- Forest: رنگ‌های جنگل
- Ocean: رنگ‌های اقیانوس
- Sunset: رنگ‌های غروب
- Luxury: طراحی لوکس

**تم‌های تاریک**:
- Dark: تاریک ساده
- Midnight: نیمه‌شب
- Terminal: ترمینال
- Monochrome: تک‌رنگ
- Neon: نئون
- Sci-Fi: علمی تخیلی
- HUD: نمایشگر شیشه‌ای
- Glassmorphism: شیشه‌ای
- Gradient: گرادیان
- Windows 95: رترو

#### ۲.۲ سیستم رنگ پویا

```typescript
// انتخاب رنگ اصلی
interface ColorPalette {
  primary: string;           // رنگ اصلی
  secondary: string;         // رنگ ثانویه
  accent: string;            // رنگ تأکیدی
  background: string;        // پس‌زمینه
  surface: string;           // سطح
  text: string;              // متن
  textSecondary: string;     // متن ثانویه
  border: string;            // مرز
  success: string;           // موفقیت
  warning: string;           // هشدار
  error: string;             // خطا
  info: string;              // اطلاعات
}

// استفاده
this.themeService.setPalette({
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  // ...
});
```

#### ۲.۳ Dark/Light Mode

```typescript
// تبدیل بین تم روشن و تاریک
this.themeService.toggleDarkMode();

// یا انتخاب مستقیم
this.themeService.setTheme('dark');
this.themeService.setTheme('light');

// ذخیره تنظیمات
// خودکار در localStorage ذخیره می‌شود
```

#### ۲.۴ CSS Custom Properties

```scss
// استفاده در SCSS
.calendar {
  background-color: var(--background);
  color: var(--text);
  border: 1px solid var(--border);
}

.button {
  background-color: var(--primary);
  color: var(--text);
  
  &:hover {
    background-color: var(--secondary);
  }
}
```

---

### ۳. نمایش اطلاعات روزانه متقدم

#### ۳.۱ مودال اطلاعات روز

```typescript
interface DayInfo {
  // تاریخ‌ها
  jalaliDate: JalaliDate;
  gregorianDate: GregorianDate;
  hijriDate: HijriDate;
  
  // اطلاعات روز
  dayOfWeek: string;         // نام روز هفته
  weekNumber: number;        // شماره هفته
  dayOfYear: number;         // روز سال
  
  // تعطیلات و رویدادها
  isHoliday: boolean;
  holidayInfo?: Holiday;
  events: string[];
  
  // اطلاعات فصلی
  season: string;            // فصل
  moonPhase?: string;        // فاز ماه
  weather?: string;          // آب‌وهوا
  
  // یادداشت‌های شخصی
  notes?: string;
}
```

#### ۳.۲ نمایش فاز ماه

```typescript
// فاز‌های ماه
enum MoonPhase {
  NEW_MOON = 'ماه نو',
  WAXING_CRESCENT = 'هلال رو به زیاد',
  FIRST_QUARTER = 'ربع اول',
  WAXING_GIBBOUS = 'محدب رو به زیاد',
  FULL_MOON = 'ماه کامل',
  WANING_GIBBOUS = 'محدب رو به کاهش',
  LAST_QUARTER = 'ربع آخر',
  WANING_CRESCENT = 'هلال رو به کاهش'
}

// محاسبه فاز ماه
const moonPhase = this.jalaliDateService.getMoonPhase(date);
```

#### ۳.۳ اطلاعات فصل

```typescript
// فصل‌های سال
enum Season {
  SPRING = 'بهار',      // فروردین، اردیبهشت، خرداد
  SUMMER = 'تابستان',   // تیر، مرداد، شهریور
  AUTUMN = 'پاییز',     // مهر، آبان، آذر
  WINTER = 'زمستان'     // دی، بهمن، اسفند
}

// دریافت فصل
const season = JalaliCalendarUtils.getSeason(month);
```

#### ۳.۴ یادداشت‌های شخصی

```typescript
// ذخیره یادداشت
this.dayInfoService.addNote(date, 'یادداشت شخصی');

// دریافت یادداشت
const note = this.dayInfoService.getNote(date);

// حذف یادداشت
this.dayInfoService.removeNote(date);

// دریافت تمام یادداشت‌ها
const allNotes = this.dayInfoService.getAllNotes();
```

---

### ۴. سوییچ تقویم‌ها

#### ۴.۱ تغییر بین تقویم‌ها

```typescript
// تغییر بین جلالی و میلادی
this.calendarService.switchCalendar('jalali');
this.calendarService.switchCalendar('gregorian');
this.calendarService.switchCalendar('hijri');

// دریافت تقویم فعلی
const currentCalendar = this.calendarService.getCurrentCalendar();
```

#### ۴.۲ نمایش Split View

```typescript
// نمایش دو تقویم کنار هم
<app-calendar-split-view
  [leftCalendar]="'jalali'"
  [rightCalendar]="'gregorian'">
</app-calendar-split-view>
```

#### ۴.۳ انیمیشن‌های انتقال

```scss
// Flip Animation
@keyframes flip {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

// Fade Animation
@keyframes fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

// Slide Animation
@keyframes slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
```

---

### ۵. قابلیت‌های جستجو و فیلتر

#### ۵.۱ جستجوی سریع تاریخ

```typescript
// جستجو با Auto-complete
<app-date-search
  [suggestions]="dateSuggestions"
  (dateSelected)="onDateSelected($event)">
</app-date-search>

// پیاده‌سازی
searchDate(query: string): JalaliDate[] {
  return this.jalaliDateService.searchDates(query);
}
```

#### ۵.۲ فیلتر تاریخ‌ها

```typescript
// فیلتر بر اساس تعطیل
const holidays = this.dates.filter(d => 
  this.holidaysService.isHoliday(d)
);

// فیلتر بر اساس فصل
const springDates = this.dates.filter(d => 
  JalaliCalendarUtils.getSeason(d.month) === 'بهار'
);

// فیلتر بر اساس بازه تاریخی
const dateRange = this.dates.filter(d => 
  d >= startDate && d <= endDate
);
```

---

### ۶. ویجت قابل Embed

#### ۶.۱ استفاده در صفحات دیگر

```html
<!-- استفاده ساده -->
<app-jalali-date-picker></app-jalali-date-picker>

<!-- با تنظیمات -->
<app-jalali-date-picker
  [theme]="'sci-fi'"
  [locale]="'fa'"
  [selectionMode]="'range'"
  (dateSelected)="handleDate($event)">
</app-jalali-date-picker>
```

#### ۶.۲ Web Components

```typescript
// تبدیل به Web Component
import { createCustomElement } from '@angular/elements';

const element = createCustomElement(JalaliDatePickerComponent, {
  injector: this.injector
});
customElements.define('jalali-date-picker', element);
```

```html
<!-- استفاده به‌عنوان Web Component -->
<jalali-date-picker
  theme="glassmorphism"
  locale="fa">
</jalali-date-picker>
```

---

### ۷. خروجی PDF و تصویر

#### ۷.۱ خروجی PDF

```typescript
// تولید PDF
this.pdfService.generateCalendarPDF({
  year: 1403,
  month: 1,
  theme: 'minimal',
  includeNotes: true
}).subscribe(pdf => {
  // دانلود PDF
  this.downloadFile(pdf, 'calendar.pdf');
});
```

#### ۷.۲ خروجی تصویر

```typescript
// تولید تصویر
this.imageService.generateCalendarImage({
  year: 1403,
  month: 1,
  format: 'png',
  resolution: '1920x1080'
}).subscribe(image => {
  // دانلود تصویر
  this.downloadFile(image, 'calendar.png');
});
```

---

### ۸. یادآوری رویدادها

#### ۸.۱ نوتیفیکیشن مرورگر

```typescript
// درخواست اجازه
this.notificationService.requestPermission().then(permission => {
  if (permission === 'granted') {
    // ارسال نوتیفیکیشن
    this.notificationService.sendNotification({
      title: 'یادآوری رویداد',
      body: 'امروز رویداد مهمی است',
      icon: 'assets/icon.png'
    });
  }
});
```

#### ۸.۲ تنظیم یادآوری

```typescript
// تنظیم یادآوری برای رویداد
this.reminderService.setReminder({
  date: new Date('1403-01-15'),
  title: 'رویداد مهم',
  time: '09:00',
  repeat: 'daily' // daily, weekly, monthly, yearly
});

// دریافت یادآوری‌ها
const reminders = this.reminderService.getReminders();

// حذف یادآوری
this.reminderService.removeReminder(reminderId);
```

---

### ۹. همگام‌سازی با Google Calendar

#### ۹.۱ اتصال به Google Calendar

```typescript
// احراز هویت
this.googleCalendarService.authenticate().then(token => {
  // ذخیره token
  localStorage.setItem('google-token', token);
});
```

#### ۹.۲ همگام‌سازی رویدادها

```typescript
// دریافت رویدادها از Google Calendar
this.googleCalendarService.getEvents().subscribe(events => {
  this.events = events;
});

// اضافه کردن رویداد به Google Calendar
this.googleCalendarService.addEvent({
  title: 'رویداد جدید',
  date: new Date(),
  description: 'توضیح رویداد'
}).subscribe(event => {
  console.log('رویداد اضافه شد:', event);
});
```

---

### ۱۰. PWA و Service Worker

#### ۱۰.۱ نصب اپلیکیشن

```typescript
// درخواست نصب
this.pwaService.promptInstall().then(result => {
  if (result.outcome === 'accepted') {
    console.log('اپلیکیشن نصب شد');
  }
});
```

#### ۱۰.۲ کار آفلاین

```typescript
// Service Worker خودکار کش می‌کند
// و در حالت آفلاین نسخه کش‌شده را نمایش می‌دهد

// بررسی وضعیت آنلاین/آفلاین
this.pwaService.isOnline$.subscribe(isOnline => {
  console.log('آنلاین:', isOnline);
});
```

---

### ۱۱. Lazy Loading

#### ۱۱.۱ بارگذاری تنبل کامپوننت‌ها

```typescript
// تعریف routes با lazy loading
const routes: Routes = [
  {
    path: 'calendar',
    loadComponent: () => import('./calendar.component')
      .then(m => m.CalendarComponent)
  },
  {
    path: 'themes',
    loadComponent: () => import('./themes.component')
      .then(m => m.ThemesComponent)
  }
];
```

#### ۱۱.۲ بارگذاری تنبل سرویس‌ها

```typescript
// بارگذاری سرویس‌ها به‌صورت تنبل
const services = {
  calendar: () => import('./services/calendar.service')
    .then(m => m.CalendarService),
  theme: () => import('./services/theme.service')
    .then(m => m.ThemeService)
};
```

---

### ۱۲. بهینه‌سازی Core Web Vitals

#### ۱۲.۱ Largest Contentful Paint (LCP)

```typescript
// بهینه‌سازی تصاویر
<img 
  [src]="imagePath" 
  [loading]="'lazy'"
  [width]="300"
  [height]="300">

// استفاده از WebP
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="تصویر">
</picture>
```

#### ۱۲.۲ First Input Delay (FID)

```typescript
// استفاده از Web Workers
const worker = new Worker('worker.js');
worker.postMessage({ data: largeData });
worker.onmessage = (event) => {
  console.log('نتیجه:', event.data);
};
```

#### ۱۲.۳ Cumulative Layout Shift (CLS)

```scss
// تعریف ابعاد ثابت
.calendar {
  width: 100%;
  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: auto;
  }
}
```

---

## 🔧 نمونه‌های استفاده

### مثال ۱: تقویم ساده

```typescript
import { Component } from '@angular/core';
import { JalaliDatePickerComponent } from '@jalali-date-picker/lib';

@Component({
  selector: 'app-simple-calendar',
  template: `
    <app-jalali-date-picker
      [theme]="'minimal'"
      (dateSelected)="onDateSelected($event)">
    </app-jalali-date-picker>
    
    <p>تاریخ انتخاب‌شده: {{ selectedDate | json }}</p>
  `
})
export class SimpleCalendarComponent {
  selectedDate: any;
  
  onDateSelected(date: any) {
    this.selectedDate = date;
  }
}
```

### مثال ۲: تقویم با تم‌های متعدد

```typescript
import { Component } from '@angular/core';
import { ThemeService } from '@jalali-date-picker/lib';

@Component({
  selector: 'app-themed-calendar',
  template: `
    <div class="theme-selector">
      <button *ngFor="let theme of themes" 
        (click)="selectTheme(theme)">
        {{ theme }}
      </button>
    </div>
    
    <app-jalali-date-picker
      [theme]="currentTheme">
    </app-jalali-date-picker>
  `
})
export class ThemedCalendarComponent {
  themes = ['sci-fi', 'glassmorphism', 'minimal', 'dark'];
  currentTheme = 'minimal';
  
  constructor(private themeService: ThemeService) {}
  
  selectTheme(theme: string) {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }
}
```

### مثال ۳: تقویم با انتخاب بازه

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-range-calendar',
  template: `
    <app-jalali-date-picker
      [selectionMode]="'range'"
      (dateRangeSelected)="onRangeSelected($event)">
    </app-jalali-date-picker>
    
    <div *ngIf="selectedRange">
      <p>از: {{ selectedRange.start | json }}</p>
      <p>تا: {{ selectedRange.end | json }}</p>
    </div>
  `
})
export class RangeCalendarComponent {
  selectedRange: any;
  
  onRangeSelected(range: any) {
    this.selectedRange = range;
  }
}
```

---

*آخرین به‌روزرسانی: 1403/11/30*
