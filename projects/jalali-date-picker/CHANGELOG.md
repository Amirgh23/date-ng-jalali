# Changelog | تاریخچه تغییرات

All notable changes to this project will be documented in this file.

تمام تغییرات مهم این پروژه در این فایل مستند می‌شود.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-02-23

### Added | اضافه شده
- ✨ Initial release of Jalali Date Picker / انتشار اولیه تقویم جلالی
- 📅 Support for three calendar systems (Jalali, Gregorian, Hijri) / پشتیبانی از سه سیستم تقویم
- 🎨 21 pre-built themes / ۲۱ تم از پیش ساخته
  - Classic themes: Light, Dark, Minimal
  - Modern themes: Glassmorphism, Gradient, Modern
  - Special themes: Neon, HUD, Terminal, Sci-Fi, Win95
  - Colorful themes: Ocean, Forest, Sunset, Aurora, Desert, Midnight, Rose, Pastel, Luxury, Monochrome, Paper
- 🌍 Bilingual support (Persian & English) / پشتیبانی دوزبانه (فارسی و انگلیسی)
- 🎯 Three selection modes / سه حالت انتخاب:
  - Single date selection / انتخاب تک تاریخ
  - Date range selection / انتخاب محدوده تاریخ
  - Multiple date selection / انتخاب چند تاریخ
- ♿ Full accessibility features / ویژگی‌های کامل دسترسی‌پذیری:
  - ARIA labels
  - Keyboard navigation / ناوبری با کیبورد
  - Screen reader support / پشتیبانی از صفحه‌خوان
  - Focus management / مدیریت فوکوس
- ⚡ Performance optimizations / بهینه‌سازی عملکرد:
  - OnPush change detection strategy
  - Smart caching for date conversions / کش‌گذاری هوشمند برای تبدیل تاریخ
  - Lazy loading for themes / بارگذاری تنبل برای تم‌ها
  - Tree-shakeable build / بیلد قابل tree-shake
- 🎭 Theme selector component / کامپوننت انتخابگر تم
- 🎨 Color picker component / کامپوننت انتخابگر رنگ
- 🔄 Calendar type switcher / سوئیچ نوع تقویم
- 📱 Responsive design / طراحی ریسپانسیو
- 🔧 Pass-through API for customization / API Pass-through برای سفارشی‌سازی
- 🌐 RTL/LTR automatic conversion / تبدیل خودکار RTL/LTR
- 📅 Holiday detection for Iranian calendar / تشخیص تعطیلات برای تقویم ایرانی
- 🎯 Date validation and restrictions / اعتبارسنجی و محدودیت تاریخ
- 🔢 Custom z-index support / پشتیبانی از z-index سفارشی

### Fixed | رفع شده
- 🐛 Fixed Jalali to Gregorian conversion algorithm / رفع الگوریتم تبدیل جلالی به میلادی
- 🐛 Fixed first day of month display issue / رفع مشکل نمایش روز اول ماه
- 🐛 Fixed Hijri calendar conversion accuracy / رفع دقت تبدیل تقویم قمری
- 🐛 Fixed theme selector color preview / رفع پیش‌نمایش رنگ انتخابگر تم
- 🐛 Fixed date selection in different calendar types / رفع انتخاب تاریخ در انواع مختلف تقویم

### Changed | تغییر یافته
- 🔄 Improved date conversion algorithms / بهبود الگوریتم‌های تبدیل تاریخ
- 🎨 Enhanced glassmorphism theme / بهبود تم شیشه‌ای
- 📱 Improved mobile responsiveness / بهبود ریسپانسیو موبایل
- ⚡ Optimized rendering performance / بهینه‌سازی عملکرد رندرینگ

### Security | امنیت
- 🔒 Sanitized user inputs / پاکسازی ورودی‌های کاربر
- 🔒 XSS protection / محافظت در برابر XSS

---

## [Unreleased] | [در دست توسعه]

### Planned Features | ویژگی‌های برنامه‌ریزی شده
- 🔮 Time picker integration / یکپارچه‌سازی انتخابگر زمان
- 🔮 Year and month picker views / نماهای انتخابگر سال و ماه
- 🔮 Custom date formats / فرمت‌های سفارشی تاریخ
- 🔮 More language support / پشتیبانی از زبان‌های بیشتر
- 🔮 Animation customization / سفارشی‌سازی انیمیشن‌ها
- 🔮 Event markers on calendar / نشانگرهای رویداد روی تقویم
- 🔮 Week number display / نمایش شماره هفته
- 🔮 Decade and century views / نماهای دهه و قرن

---

## Version Guidelines | راهنمای نسخه‌بندی

### Major Version (X.0.0)
- Breaking changes / تغییرات ناسازگار
- Major feature additions / افزودن ویژگی‌های اصلی
- Architecture changes / تغییرات معماری

### Minor Version (0.X.0)
- New features / ویژگی‌های جدید
- Non-breaking enhancements / بهبودهای سازگار
- New themes / تم‌های جدید

### Patch Version (0.0.X)
- Bug fixes / رفع باگ‌ها
- Performance improvements / بهبود عملکرد
- Documentation updates / به‌روزرسانی مستندات

---

## Contributing | مشارکت

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

لطفاً [CONTRIBUTING.md](CONTRIBUTING.md) را برای جزئیات کد رفتار و فرآیند ارسال pull request بخوانید.

## License | مجوز

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

این پروژه تحت مجوز MIT منتشر شده است - فایل [LICENSE](LICENSE) را برای جزئیات ببینید.
