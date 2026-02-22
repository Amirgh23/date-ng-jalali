# شروع فوری - تقویم جلالی تعاملی

## ⏱️ ۵ دقیقه برای شروع

### ۱. نصب (۱ دقیقه)

```bash
npm install
```

### ۲. اجرای پروژه (۱ دقیقه)

```bash
npm run dev
```

### ۳. باز کردن مرورگر (۱ دقیقه)

```
http://localhost:4200
```

### ۴. خواندن مستندات (۲ دقیقه)

- **START-HERE.md** - مقدمه
- **QUICK-START.md** - نصب و راه‌اندازی
- **QUICK-IMPLEMENTATION-GUIDE.md** - شروع پیاده‌سازی

---

## 🎯 اولویت‌های فوری

### امروز (۱-۲ ساعت)
1. [ ] تکمیل `applyTheme()` در ThemeService
2. [ ] تکمیل `saveThemeToStorage()` در ThemeService
3. [ ] اجرای `ng build jalali-date-picker`
4. [ ] تأیید موفقیت build

### فردا (۲-۳ ساعت)
1. [ ] شروع فاز ۲
2. [ ] تکمیل سرویس‌های اضافی
3. [ ] تست‌های اولیه

### هفته آینده (۱۸-۲۸ روز)
1. [ ] تکمیل تمام ۸ فاز
2. [ ] تست جامع
3. [ ] انتشار بر روی npm

---

## 📁 فایل‌های مهم

| فایل | توضیح | وضعیت |
|------|-------|-------|
| `theme.service.ts` | مدیریت تم‌ها | 88% ✅ |
| `holidays.service.ts` | مدیریت تعطیلات | 90% ✅ |
| `jalali-calendar.utils.ts` | الگوریتم‌های تبدیل | 95% ✅ |
| `jalali-date.service.ts` | سرویس تاریخ | 100% ✅ |
| `cache.service.ts` | کش کردن | 100% ✅ |

---

## 🚀 دستورات مفید

```bash
# اجرای dev server
npm run dev

# Build کتابخانه
npm run build:lib

# اجرای تست‌ها
npm run test

# بررسی کد
npm run lint

# اصلاح خودکار مشکلات
npm run lint:fix
```

---

## 📚 مستندات

### شروع سریع (۳۰ دقیقه)
1. **START-HERE.md** - مقدمه
2. **QUICK-START.md** - نصب
3. **QUICK-IMPLEMENTATION-GUIDE.md** - پیاده‌سازی

### معماری (۱ ساعت)
1. **ARCHITECTURE-DESIGN.md** - معماری
2. **COMPREHENSIVE-ROADMAP.md** - نقشه راه
3. **ADVANCED-FEATURES.md** - ویژگی‌ها

### توسعه (۱ ساعت)
1. **DEVELOPER-GUIDE.md** - راهنمای توسعه
2. **IMPLEMENTATION-CHECKLIST.md** - چک‌لیست
3. **DOCUMENTATION-INDEX.md** - فهرست

---

## 🎯 فاز ۱: اصلاح خطاهای فوری

### کار ۱: تکمیل ThemeService

**فایل**: `projects/jalali-date-picker/src/lib/core/services/theme.service.ts`

**اضافه کنید**:
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

**تغییر `setTheme()`**:
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

### کار ۲: اجرای Build

```bash
ng build jalali-date-picker
```

**نتیجه مورد انتظار**:
- ✅ بدون خطای TypeScript
- ✅ بدون خطای Runtime
- ✅ فایل‌های dist تولید شده

---

## ✅ چک‌لیست امروز

- [ ] نصب وابستگی‌ها
- [ ] اجرای dev server
- [ ] خواندن START-HERE.md
- [ ] خواندن QUICK-START.md
- [ ] تکمیل `applyTheme()` در ThemeService
- [ ] تکمیل `saveThemeToStorage()` در ThemeService
- [ ] اجرای build
- [ ] تأیید موفقیت build

---

## 🎓 مسیر یادگیری

### ۱۵ دقیقه
- [ ] نصب و راه‌اندازی
- [ ] باز کردن مرورگر

### ۳۰ دقیقه
- [ ] خواندن START-HERE.md
- [ ] خواندن QUICK-START.md

### ۱ ساعت
- [ ] خواندن QUICK-IMPLEMENTATION-GUIDE.md
- [ ] شروع فاز ۱

### ۲ ساعت
- [ ] تکمیل فاز ۱
- [ ] اجرای build موفق

### ۳ ساعت
- [ ] خواندن ARCHITECTURE-DESIGN.md
- [ ] درک معماری

### ۴ ساعت
- [ ] خواندن ADVANCED-FEATURES.md
- [ ] درک ویژگی‌ها

### ۵ ساعت
- [ ] خواندن DEVELOPER-GUIDE.md
- [ ] آماده برای توسعه

---

## 💡 نکات مهم

### ✅ باید انجام شود
1. هر فاز باید قبل از فاز بعدی تکمیل شود
2. Build باید بدون خطا باشد
3. تست باید در هر فاز انجام شود
4. مستندات باید همزمان با کد نوشته شود

### ⚠️ احتیاطی
1. از localStorage احتیاط کنید (SSR)
2. از RxJS Observables استفاده کنید
3. از ChangeDetectionStrategy.OnPush استفاده کنید
4. از TypeScript strict mode استفاده کنید

### 🚀 بهینه‌سازی
1. کش کردن نتایج محاسبات
2. Lazy Loading برای کامپوننت‌های سنگین
3. Virtual Scrolling برای لیست‌های طولانی
4. Debouncing برای رخداداری

---

## 📞 کمک و پشتیبانی

- **مستندات**: DOCUMENTATION-INDEX.md
- **سوالات**: DEVELOPER-GUIDE.md → سوالات متداول
- **مشکلات**: GitHub Issues
- **تماس**: support@example.com

---

## 🎉 بعدی

1. ✅ نصب و راه‌اندازی
2. ✅ خواندن مستندات
3. ✅ تکمیل فاز ۱
4. ✅ اجرای build موفق
5. ✅ شروع فاز ۲

---

*آخرین به‌روزرسانی: 1403/11/30*
*زمان شروع: ۵ دقیقه*
*زمان تکمیل فاز ۱: ۱-۲ ساعت*
