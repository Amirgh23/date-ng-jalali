# راهنمای دیباگ - Debug Guide

## مراحل بررسی خطا

### 1. باز کردن مرورگر
- به آدرس http://localhost:4200 بروید
- F12 را بزنید تا Developer Tools باز شود

### 2. بررسی Console
در تب Console به دنبال خطاهای زیر بگردید:

#### خطاهای احتمالی:

**خطای 1: Cannot find module**
```
Error: Cannot find module 'jalali-date-picker'
```
**راه‌حل**: کتابخانه را rebuild کنید
```bash
ng build jalali-date-picker
```

**خطای 2: Component not found**
```
Error: 'jalali-calendar' is not a known element
```
**راه‌حل**: بررسی کنید که کامپوننت در imports اضافه شده باشد

**خطای 3: Style not loaded**
```
Failed to load resource: the server responded with a status of 404
```
**راه‌حل**: استایل‌ها را به صورت inline اضافه کنید

### 3. بررسی Network Tab
- به تب Network بروید
- صفحه را Refresh کنید (Ctrl+R)
- ببینید آیا فایل‌های CSS لود می‌شوند یا خیر

### 4. بررسی Elements Tab
- به تب Elements بروید
- ببینید آیا المان‌های `<jalali-date-picker>` و `<jalali-calendar>` در DOM وجود دارند

### 5. بررسی Computed Styles
- روی یک المان تقویم کلیک راست کنید
- Inspect Element را انتخاب کنید
- در تب Styles ببینید آیا CSS Variables تعریف شده‌اند:
  - `--primary-color`
  - `--background`
  - `--text-color`

## خطاهای رایج و راه‌حل

### مشکل 1: تقویم نمایش داده نمی‌شود
**علت**: کامپوننت لود نشده
**راه‌حل**:
```bash
# 1. کتابخانه را rebuild کنید
ng build jalali-date-picker

# 2. سرور را restart کنید
# Ctrl+C در terminal
ng serve demo
```

### مشکل 2: تقویم بدون استایل است
**علت**: CSS Variables تعریف نشده‌اند
**راه‌حل**: بررسی کنید که app.scss شامل CSS Variables باشد

### مشکل 3: دکمه‌ها کار نمی‌کنند
**علت**: Event handlers متصل نشده‌اند
**راه‌حل**: بررسی Console برای خطاهای JavaScript

## دستورات مفید

### Rebuild همه چیز
```bash
# پاک کردن cache
rmdir /s /q .angular
rmdir /s /q dist

# بیلد کتابخانه
ng build jalali-date-picker

# اجرای دمو
ng serve demo
```

### بررسی سریع
```bash
# بررسی خطاهای TypeScript
ng build demo --configuration development
```

## اطلاعات مورد نیاز برای گزارش خطا

لطفاً اطلاعات زیر را ارائه دهید:

1. **متن کامل خطا از Console**
2. **اسکرین‌شات از صفحه**
3. **اسکرین‌شات از Network Tab**
4. **نسخه Angular**: `ng version`
5. **نسخه Node**: `node --version`

## تست سریع

برای تست سریع، این کد را در Console مرورگر اجرا کنید:

```javascript
// بررسی CSS Variables
console.log('Primary Color:', getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));

// بررسی کامپوننت‌ها
console.log('Date Picker:', document.querySelector('jalali-date-picker'));
console.log('Calendar:', document.querySelector('jalali-calendar'));

// بررسی استایل‌ها
const styles = Array.from(document.styleSheets);
console.log('Loaded Stylesheets:', styles.length);
```

اگر خروجی این دستورات را به من بدهید، می‌توانم مشکل را شناسایی کنم.
