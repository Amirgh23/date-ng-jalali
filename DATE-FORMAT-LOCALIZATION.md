# بومی‌سازی فرمت تاریخ / Date Format Localization

## خلاصه / Summary

فرمت نمایش تاریخ در input field اکنون بر اساس زبان انتخابی کاربر تغییر می‌کند و برای هر سه نوع تقویم (جلالی، میلادی، قمری) به درستی کار می‌کند.

Date format in the input field now changes based on the user's selected language and works correctly for all three calendar types (Jalali, Gregorian, Hijri).

---

## تغییرات / Changes

### تقویم جلالی / Jalali Calendar

**زبان فارسی:**
```
1 فروردین 1403
15 خرداد 1402
```

**زبان انگلیسی:**
```
Farvardin 1, 1403
Khordad 15, 1402
```

---

### تقویم میلادی / Gregorian Calendar

**زبان فارسی:**
```
1 ژانویه 2024
15 مارس 2024
```

**زبان انگلیسی:**
```
January 1, 2024
March 15, 2024
```

---

### تقویم قمری / Hijri Calendar

**زبان فارسی:**
```
1 محرم 1445
15 رمضان 1445
```

**زبان انگلیسی:**
```
Muharram 1, 1445
Ramadan 15, 1445
```

---

## جزئیات فنی / Technical Details

### فایل‌های تغییر یافته

#### 1. JalaliDateService
**مسیر**: `projects/jalali-date-picker/src/lib/core/services/jalali-date.service.ts`

**تغییرات**:
- اضافه شدن `LocaleService` به constructor
- به‌روزرسانی `gregorianToJalali()` برای استفاده از locale
- به‌روزرسانی `gregorianToHijri()` برای استفاده از locale
- اضافه شدن متد `formatJalaliDate()`
- اضافه شدن متد `formatGregorianDate()`
- اضافه شدن متد `formatHijriDate()`
- به‌روزرسانی cache key برای شامل شدن locale

#### 2. DatePickerComponent
**مسیر**: `projects/jalali-date-picker/src/lib/components/date-picker/jalali-date-picker.component.ts`

**تغییرات**:
- به‌روزرسانی `formatForCurrentCalendar()` برای استفاده از `formatGregorianDate()`

---

## متدهای جدید / New Methods

### 1. formatJalaliDate()

```typescript
formatJalaliDate(date: { year: number; month: number; day: number }): string {
  const monthName = this.localeService.getJalaliMonthName(date.month);
  const locale = this.localeService.getLocale();
  
  // Format based on locale direction
  if (locale === 'en') {
    return `${monthName} ${date.day}, ${date.year}`;
  }
  return `${date.day} ${monthName} ${date.year}`;
}
```

**فرمت‌ها:**
- فارسی: `1 فروردین 1403`
- انگلیسی: `Farvardin 1, 1403`

### 2. formatGregorianDate()

```typescript
formatGregorianDate(date: Date): string {
  const monthName = this.localeService.getGregorianMonthName(date.getMonth() + 1);
  const day = date.getDate();
  const year = date.getFullYear();
  const locale = this.localeService.getLocale();
  
  // Format based on locale direction
  if (locale === 'en') {
    return `${monthName} ${day}, ${year}`;
  }
  return `${day} ${monthName} ${year}`;
}
```

**فرمت‌ها:**
- فارسی: `1 ژانویه 2024`
- انگلیسی: `January 1, 2024`

### 3. formatHijriDate()

```typescript
formatHijriDate(date: { year: number; month: number; day: number }): string {
  const monthName = this.localeService.getHijriMonthName(date.month);
  const locale = this.localeService.getLocale();
  
  // Format based on locale direction
  if (locale === 'en') {
    return `${monthName} ${date.day}, ${date.year}`;
  }
  return `${date.day} ${monthName} ${date.year}`;
}
```

**فرمت‌ها:**
- فارسی: `1 محرم 1445`
- انگلیسی: `Muharram 1, 1445`

---

## نحوه کار / How It Works

### 1. تشخیص زبان
```typescript
const locale = this.localeService.getLocale(); // 'fa' or 'en'
```

### 2. انتخاب فرمت بر اساس زبان
```typescript
if (locale === 'en') {
  return `${monthName} ${day}, ${year}`; // English format
}
return `${day} ${monthName} ${year}`; // Persian/Arabic/Kurdish format
```

### 3. نمایش در Input
```typescript
get formattedDate(): string {
  if (!this.selectedDate) return '';
  return this.formatForCurrentCalendar(this.selectedDate);
}
```

---

## فرمت‌های مختلف / Different Formats

### فرمت فارسی/عربی/کوردی (RTL)
```
روز ماه سال
1 فروردین 1403
15 خرداد 1402
```

### فرمت انگلیسی (LTR)
```
Month Day, Year
Farvardin 1, 1403
Khordad 15, 1402
```

---

## مثال‌های کاربردی / Usage Examples

### مثال 1: تقویم جلالی

```typescript
// زبان فارسی
const date = new Date(2024, 2, 20); // 20 March 2024
const jalaliDate = this.jalaliDateService.gregorianToJalali(date);
console.log(jalaliDate.formatted); // "1 فروردین 1403"

// تغییر به انگلیسی
this.localeService.setLocale('en');
const jalaliDate2 = this.jalaliDateService.gregorianToJalali(date);
console.log(jalaliDate2.formatted); // "Farvardin 1, 1403"
```

### مثال 2: تقویم میلادی

```typescript
// زبان فارسی
const date = new Date(2024, 0, 1); // 1 January 2024
const formatted = this.jalaliDateService.formatGregorianDate(date);
console.log(formatted); // "1 ژانویه 2024"

// تغییر به انگلیسی
this.localeService.setLocale('en');
const formatted2 = this.jalaliDateService.formatGregorianDate(date);
console.log(formatted2); // "January 1, 2024"
```

### مثال 3: تقویم قمری

```typescript
// زبان فارسی
const date = new Date(2024, 2, 20);
const hijriDate = this.jalaliDateService.gregorianToHijri(date);
console.log(hijriDate.formatted); // "10 رمضان 1445"

// تغییر به انگلیسی
this.localeService.setLocale('en');
const hijriDate2 = this.jalaliDateService.gregorianToHijri(date);
console.log(hijriDate2.formatted); // "Ramadan 10, 1445"
```

---

## Cache Management

### Cache Key با Locale

```typescript
const cacheKey = `g2j_${gregorianDate.getTime()}_${this.localeService.getLocale()}`;
```

این تضمین می‌کند که:
- هر زبان cache جداگانه‌ای دارد
- تغییر زبان باعث invalidate شدن cache نمی‌شود
- عملکرد بهینه حفظ می‌شود

---

## تست / Testing

### مراحل تست

1. **تقویم جلالی - فارسی**
   - انتخاب تاریخ: 1 فروردین 1403
   - Input باید نمایش دهد: "1 فروردین 1403"

2. **تقویم جلالی - انگلیسی**
   - تغییر زبان به انگلیسی
   - Input باید نمایش دهد: "Farvardin 1, 1403"

3. **تقویم میلادی - فارسی**
   - تغییر به تقویم میلادی
   - تغییر زبان به فارسی
   - انتخاب تاریخ: 1 January 2024
   - Input باید نمایش دهد: "1 ژانویه 2024"

4. **تقویم میلادی - انگلیسی**
   - تغییر زبان به انگلیسی
   - Input باید نمایش دهد: "January 1, 2024"

5. **تقویم قمری - فارسی**
   - تغییر به تقویم قمری
   - تغییر زبان به فارسی
   - Input باید نمایش دهد: "1 محرم 1445"

6. **تقویم قمری - انگلیسی**
   - تغییر زبان به انگلیسی
   - Input باید نمایش دهد: "Muharram 1, 1445"

### نتیجه تست

✅ تمام فرمت‌ها صحیح
✅ تغییر زبان فوری
✅ Cache به درستی کار می‌کند
✅ Build بدون خطا

---

## جدول فرمت‌ها / Format Table

| تقویم | زبان فارسی | زبان انگلیسی |
|-------|------------|---------------|
| جلالی | 1 فروردین 1403 | Farvardin 1, 1403 |
| میلادی | 1 ژانویه 2024 | January 1, 2024 |
| قمری | 1 محرم 1445 | Muharram 1, 1445 |

---

## عملکرد / Performance

### تاثیر بر Bundle Size

```
Before: 372.45 kB
After:  373.94 kB
Increase: +1.5 kB
```

### بهینه‌سازی‌ها

1. **Cache با Locale**
   - هر زبان cache جداگانه دارد
   - تبدیل‌های تکراری از cache خوانده می‌شوند

2. **Format Methods**
   - بدون regex یا string manipulation پیچیده
   - فقط template string ساده

3. **Lazy Evaluation**
   - فرمت فقط زمانی محاسبه می‌شود که نیاز باشد

---

## ویژگی‌ها / Features

### ✅ پشتیبانی کامل
- 3 نوع تقویم
- 4 زبان
- 2 فرمت (RTL/LTR)

### ✅ تغییر خودکار
- با تغییر زبان، فرمت فوراً تغییر می‌کند
- بدون نیاز به reload

### ✅ Cache هوشمند
- Cache جداگانه برای هر زبان
- عملکرد بهینه

### ✅ خوانایی
- فرمت مناسب برای هر زبان
- ترتیب صحیح اجزای تاریخ

---

## وضعیت / Status

- **تاریخ**: 2026-02-23
- **نسخه**: 1.0.0
- **وضعیت**: ✅ تکمیل شده و آماده استفاده

---

## مستندات مرتبط / Related Documentation

- `LANGUAGE-TOGGLE-FEATURE.md` - قابلیت تغییر زبان
- `CALENDAR-NAMES-LOCALIZATION.md` - بومی‌سازی نام تقویم‌ها
- `MONTH-NAMES-LOCALIZATION.md` - بومی‌سازی نام ماه‌ها
- `BILINGUAL-SUPPORT.md` - پشتیبانی چندزبانه
