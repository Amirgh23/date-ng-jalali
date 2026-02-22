# رفع مشکل نمایش کامپوننت‌های تقویم

## مشکل
کامپوننت‌های تقویم نمایش داده نمی‌شوند.

## تغییرات انجام شده

### 1. اضافه کردن استایل‌ها به Demo
فایل `projects/demo/src/styles.css` به‌روز شد و استایل‌های تم اضافه شدند.

## مراحل رفع مشکل

### مرحله 1: نصب وابستگی‌ها
```bash
npm install
```

### مرحله 2: بیلد کتابخانه
```bash
npm run build
```

### مرحله 3: اجرای دمو
```bash
npm start
```

## بررسی مشکلات احتمالی

### 1. خطای Build
اگر خطای build دریافت کردید:

```bash
# پاک کردن cache
rmdir /s /q .angular
rmdir /s /q dist

# بیلد مجدد
npm run build
```

### 2. کامپوننت نمایش داده نمی‌شود
بررسی کنید:

1. **Console Errors**: F12 را بزنید و Console را چک کنید
2. **Network Tab**: ببینید آیا فایل‌های CSS لود می‌شوند
3. **Elements Tab**: ببینید آیا المان‌های HTML رندر شده‌اند

### 3. استایل‌ها اعمال نمی‌شوند

اگر کامپوننت نمایش داده می‌شود اما استایل ندارد:

**بررسی کنید:**
```typescript
// در app.ts
import { JalaliDatePickerComponent } from '../../../jalali-date-picker/src/public-api';
```

**و در template:**
```html
<jalali-date-picker
  [selectionMode]="selectionMode"
  [selectedDate]="selectedDate"
  (dateSelect)="onDateSelect($event)">
</jalali-date-picker>
```

## دیباگ کامل

### مرحله 1: بررسی Import
```typescript
// projects/demo/src/app/app.ts
import { JalaliDatePickerComponent } from '../../../jalali-date-picker/src/public-api';

@Component({
  imports: [CommonModule, FormsModule, JalaliDatePickerComponent],
  // ...
})
```

### مرحله 2: بررسی Template
```html
<!-- projects/demo/src/app/app.html -->
<jalali-date-picker
  [selectionMode]="selectionMode"
  [selectedDate]="selectedDate"
  (dateSelect)="onDateSelect($event)">
</jalali-date-picker>
```

### مرحله 3: بررسی Styles
```css
/* projects/demo/src/styles.css */
@import '../../../jalali-date-picker/src/lib/themes/index.scss';
```

### مرحله 4: بررسی Console
باز کردن Developer Tools (F12) و بررسی:
- Errors در Console
- Network requests برای CSS files
- Rendered HTML در Elements tab

## راه‌حل‌های سریع

### راه‌حل 1: استفاده از Built Library
```bash
# بیلد کتابخانه
npm run build

# تغییر import در app.ts
import { JalaliDatePickerComponent } from 'jalali-date-picker';
```

### راه‌حل 2: استفاده مستقیم از Source
```typescript
// app.ts - استفاده از مسیر نسبی
import { JalaliDatePickerComponent } from '../../../jalali-date-picker/src/public-api';
```

### راه‌حل 3: بررسی Angular.json
```json
{
  "projects": {
    "demo": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "projects/demo/src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

## تست نهایی

بعد از اعمال تغییرات:

```bash
# 1. پاک کردن
rmdir /s /q .angular
rmdir /s /q dist
rmdir /s /q node_modules

# 2. نصب مجدد
npm install

# 3. بیلد
npm run build

# 4. اجرا
npm start
```

سپس مرورگر را باز کنید: `http://localhost:4200`

## خروجی مورد انتظار

باید یک تقویم کامل با این ویژگی‌ها ببینید:
- ✅ هدر با دکمه‌های ماه قبل/بعد
- ✅ نام ماه و سال
- ✅ شبکه روزهای ماه
- ✅ روز انتخاب شده با رنگ متفاوت
- ✅ دکمه "امروز"
- ✅ استایل‌های تم اعمال شده

## اگر هنوز کار نکرد

لطفاً خطاهای Console را بررسی کنید و اطلاعات زیر را ارائه دهید:
1. پیام خطا در Console
2. نسخه Angular: `ng version`
3. نسخه Node: `node --version`
4. محتوای فایل `angular.json`
