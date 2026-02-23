# راهنمای انتشار در npm | npm Publishing Guide

<div dir="rtl">

## 📦 آماده‌سازی برای انتشار

### ✅ چک‌لیست قبل از انتشار

- [x] نام پکیج: `@lomineuro/jalali-date-picker`
- [x] نسخه: `1.0.0`
- [x] سازنده: Amirreza Ghafarian
- [x] ایمیل: amirghafarian7879@gmail.com
- [x] Organization: [@lomineuro](https://npmjs.com/org/lomineuro)
- [x] مجوز: MIT
- [x] مستندات کامل (دوزبانه)
- [x] CHANGELOG.md
- [x] CONTRIBUTING.md
- [x] LICENSE
- [x] README.md
- [x] بیلد موفق
- [x] تست‌های الگوریتم‌ها

### 🔨 مراحل انتشار

#### 1. بیلد نهایی

```bash
ng build jalali-date-picker
```

خروجی در: `dist/jalali-date-picker`

#### 2. بررسی فایل‌های بیلد شده

```bash
cd dist/jalali-date-picker
dir
```

باید شامل موارد زیر باشد:
- `package.json`
- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `fesm2022/` (فایل‌های JavaScript)
- `themes/` (فایل‌های SCSS)
- `*.d.ts` (فایل‌های TypeScript definitions)

#### 3. ورود به npm

```bash
npm login
```

اطلاعات ورود:
- Username: lomineuro (یا username شما در npm)
- Password: [رمز عبور npm]
- Email: amirghafarian7879@gmail.com

#### 4. بررسی قبل از انتشار (اختیاری)

```bash
npm pack
```

این دستور یک فایل `.tgz` ایجاد می‌کند که می‌توانید محتویات آن را بررسی کنید.

#### 5. انتشار در npm

```bash
npm publish --access public
```

توجه: از آنجایی که پکیج scoped است (`@lomineuro/...`)، باید `--access public` را اضافه کنید.

#### 6. تأیید انتشار

بعد از انتشار، پکیج شما در آدرس زیر قابل دسترسی است:

```
https://www.npmjs.com/package/@lomineuro/jalali-date-picker
```

### 📥 نصب پکیج منتشر شده

کاربران می‌توانند با دستور زیر پکیج را نصب کنند:

```bash
npm install @lomineuro/jalali-date-picker
```

### 🔄 به‌روزرسانی نسخه‌های بعدی

برای انتشار نسخه‌های جدید:

#### نسخه Patch (1.0.1)
برای رفع باگ‌ها:
```bash
npm version patch
ng build jalali-date-picker
cd dist/jalali-date-picker
npm publish
```

#### نسخه Minor (1.1.0)
برای ویژگی‌های جدید:
```bash
npm version minor
ng build jalali-date-picker
cd dist/jalali-date-picker
npm publish
```

#### نسخه Major (2.0.0)
برای تغییرات ناسازگار:
```bash
npm version major
ng build jalali-date-picker
cd dist/jalali-date-picker
npm publish
```

### 📊 آمار پکیج

بعد از انتشار، می‌توانید آمار دانلود را در npm ببینید:

```
https://www.npmjs.com/package/@lomineuro/jalali-date-picker
```

### 🔐 امنیت

- رمز عبور npm را در جای امن نگه دارید
- از Two-Factor Authentication (2FA) استفاده کنید
- هرگز توکن‌های npm را در کد commit نکنید

### 📝 یادداشت‌های مهم

1. **Organization**: مطمئن شوید که organization `@lomineuro` در npm ایجاد شده است
2. **Access**: برای scoped packages، حتماً `--access public` را اضافه کنید
3. **Version**: هر بار که می‌خواهید publish کنید، باید version را افزایش دهید
4. **CHANGELOG**: همیشه CHANGELOG.md را به‌روز کنید

### 🎉 بعد از انتشار

1. README.md در GitHub را به‌روز کنید
2. یک Release در GitHub ایجاد کنید
3. در شبکه‌های اجتماعی اعلام کنید
4. مستندات را در وب‌سایت قرار دهید (اختیاری)

### 🐛 رفع مشکلات رایج

#### خطا: Package already exists
```bash
# نسخه را افزایش دهید
npm version patch
```

#### خطا: You must be logged in
```bash
npm login
```

#### خطا: 402 Payment Required
```bash
# برای scoped packages از --access public استفاده کنید
npm publish --access public
```

#### خطا: 403 Forbidden
```bash
# مطمئن شوید که عضو organization هستید
# یا نام پکیج را تغییر دهید
```

### 📞 پشتیبانی

در صورت بروز مشکل:
- 📧 Email: amirghafarian7879@gmail.com
- 🐛 GitHub Issues: https://github.com/lomineuro/jalali-date-picker/issues

</div>

---

## English Version

## 📦 Preparing for Publication

### ✅ Pre-publish Checklist

- [x] Package name: `@lomineuro/jalali-date-picker`
- [x] Version: `1.0.0`
- [x] Author: Amirreza Ghafarian
- [x] Email: amirghafarian7879@gmail.com
- [x] Organization: [@lomineuro](https://npmjs.com/org/lomineuro)
- [x] License: MIT
- [x] Complete documentation (bilingual)
- [x] CHANGELOG.md
- [x] CONTRIBUTING.md
- [x] LICENSE
- [x] README.md
- [x] Successful build
- [x] Algorithm tests

### 🔨 Publishing Steps

#### 1. Final Build

```bash
ng build jalali-date-picker
```

Output in: `dist/jalali-date-picker`

#### 2. Verify Build Files

```bash
cd dist/jalali-date-picker
dir
```

Should include:
- `package.json`
- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `fesm2022/` (JavaScript files)
- `themes/` (SCSS files)
- `*.d.ts` (TypeScript definitions)

#### 3. Login to npm

```bash
npm login
```

Login credentials:
- Username: lomineuro (or your npm username)
- Password: [your npm password]
- Email: amirghafarian7879@gmail.com

#### 4. Pre-publish Check (Optional)

```bash
npm pack
```

This creates a `.tgz` file you can inspect.

#### 5. Publish to npm

```bash
npm publish --access public
```

Note: Since the package is scoped (`@lomineuro/...`), you must add `--access public`.

#### 6. Verify Publication

After publishing, your package is available at:

```
https://www.npmjs.com/package/@lomineuro/jalali-date-picker
```

### 📥 Installing Published Package

Users can install with:

```bash
npm install @lomineuro/jalali-date-picker
```

### 🔄 Updating Future Versions

For new releases:

#### Patch Version (1.0.1)
For bug fixes:
```bash
npm version patch
ng build jalali-date-picker
cd dist/jalali-date-picker
npm publish
```

#### Minor Version (1.1.0)
For new features:
```bash
npm version minor
ng build jalali-date-picker
cd dist/jalali-date-picker
npm publish
```

#### Major Version (2.0.0)
For breaking changes:
```bash
npm version major
ng build jalali-date-picker
cd dist/jalali-date-picker
npm publish
```

### 📊 Package Statistics

After publishing, view download stats at:

```
https://www.npmjs.com/package/@lomineuro/jalali-date-picker
```

### 🔐 Security

- Keep npm password secure
- Use Two-Factor Authentication (2FA)
- Never commit npm tokens to code

### 📝 Important Notes

1. **Organization**: Ensure `@lomineuro` organization exists in npm
2. **Access**: For scoped packages, always add `--access public`
3. **Version**: Must increment version for each publish
4. **CHANGELOG**: Always update CHANGELOG.md

### 🎉 After Publishing

1. Update README.md on GitHub
2. Create a Release on GitHub
3. Announce on social media
4. Add documentation to website (optional)

### 🐛 Common Issues

#### Error: Package already exists
```bash
# Increment version
npm version patch
```

#### Error: You must be logged in
```bash
npm login
```

#### Error: 402 Payment Required
```bash
# Use --access public for scoped packages
npm publish --access public
```

#### Error: 403 Forbidden
```bash
# Ensure you're a member of the organization
# Or change package name
```

### 📞 Support

If you encounter issues:
- 📧 Email: amirghafarian7879@gmail.com
- 🐛 GitHub Issues: https://github.com/lomineuro/jalali-date-picker/issues

---

## 🎯 Quick Commands

```bash
# Build
ng build jalali-date-picker

# Navigate to dist
cd dist/jalali-date-picker

# Login (first time only)
npm login

# Publish
npm publish --access public

# Done! 🎉
```

## 📦 Package Info

- **Name**: @lomineuro/jalali-date-picker
- **Version**: 1.0.0
- **Author**: Amirreza Ghafarian
- **Email**: amirghafarian7879@gmail.com
- **License**: MIT
- **Organization**: [@lomineuro](https://npmjs.com/org/lomineuro)
