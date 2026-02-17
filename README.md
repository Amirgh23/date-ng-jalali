# تقویم جلالی انگولار

یک کتابخانه انگولار کامل برای کار با تاریخ جلالی، شامل کامپوننت‌های تعاملی و پشتیبانی از تقویم قمری و میلادی.

## ویژگی‌های اصلی

### تبدیل تاریخ
- تبدیل تاریخ جلالی ↔ میلادی
- تبدیل میلادی ↔ قمری
- تبدیل جلالی ↔ قمری

### کامپوننت‌های موجود
- `jalali-date-picker`: کامپوننت اصلی تقویم
- `jalali-calendar`: نمایش تقویم ماهانه
- `calendar-switch`: سوییچ بین تقویم جلالی و میلادی
- `theme-selector`: انتخاب تیره/روشن و تیره
- `color-picker`: انتخاب رنگ سفارشی
- `day-info-modal`: نمایش اطلاعات روز کامل

### تم‌ها
- Sci-Fi (آینده‌نگر با افکت‌های نوری و سایه‌های نئونی)
- Glassmorphism (شیشه‌ای با محو بودن و شفافیت)
- HUD (نمایشگر شیشه‌ای سبز با خطوط اسکن)
- Windows 95 (رترو با پنجره‌های کلاسیک و دکمه‌های سه‌بعدی)
- Minimal (ساده و مدرن)
- Dark/Light Mode

### قابلیت‌های پیشرفته
- نمایش اطلاعات روز کامل شامل تقویم‌ها، تعطیلات، رویدادها، فصل و وضعیت آب‌وهوا
- ذخیره تنظیمات در localStorage
- طراحی واکنش‌گرا برای همه سایزهای صفحه
- دسترسی‌پذیری کامل (ARIA labels، پشتیبانی از صفحه‌خوان)
- پشتیبانی از زبان فارسی

## نصب

```bash
npm install jalali-date-picker
```

## استفاده

### در ماژول
```typescript
import { JalaliDatePickerModule } from 'jalali-date-picker';

@NgModule({
  imports: [
    JalaliDatePickerModule
  ]
})
export class AppModule { }
```

### در کامپوننت
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <jalali-date-picker 
      [selectedDate]="selectedDate"
      (dateSelect)="onDateSelect($event)"
    ></jalali-date-picker>
  `
})
export class AppComponent {
  selectedDate: Date = new Date();

  onDateSelect(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
```

## ساختار پروژه

```
date-ng-jalali/
├─ projects/
│  ├─ jalali-date-picker/
│  │  ├─ src/
│  │  │  ├─ lib/
│  │  │  │  ├─ components/
│  │  │  │  │  ├─ calendar/
│  │  │  │  │  ├─ calendar-switch/
│  │  │  │  │  ├─ color-picker/
│  │  │  │  │  ├─ date-picker/
│  │  │  │  │  ├─ day-info-modal/
│  │  │  │  │  └─ theme-selector/
│  │  │  │  ├─ core/
│  │  │  │  │  ├─ models/
│  │  │  │  │  ├─ services/
│  │  │  │  │  └─ utils/
│  │  │  │  └─ themes/
│  │  │  └─ public-api.ts
│  │  └─ package.json
│  └─ demo/
│     └─ src/
│        └─ app/
├─ dist/
│  ├─ jalali-date-picker/
│  └─ demo/
└─ package.json
```

## توسعه

### ساخت کتابخانه
```bash
ng build jalali-date-picker
```

### ساخت اپلیکیشن نمونه
```bash
ng build demo
```

### شروع سرور توسعه
```bash
ng serve demo
```

## تست
```bash
ng test jalali-date-picker
```

## پیشنهادات و مشکلات
لطفاً برای هرگونه پیشنهاد یا مشکلی در Issues репوی GitHub ما گزارش دهید.
