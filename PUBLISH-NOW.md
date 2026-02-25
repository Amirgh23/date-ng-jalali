# 🚀 آماده انتشار | Ready to Publish

## دستور نهایی انتشار

پکیج شما کاملاً آماده است! فقط کافی است:

### مرحله 1: کد OTP را بگیرید

از اپلیکیشن authenticator خود (Google Authenticator یا Authy) کد 6 رقمی را بگیرید.

### مرحله 2: دستور زیر را اجرا کنید

در ترمینال، در پوشه `dist/jalali-date-picker` این دستور را اجرا کنید:

```bash
npm publish --access public --otp=YOUR_6_DIGIT_CODE
```

**مثال:**
اگر کد OTP شما `123456` است:

```bash
npm publish --access public --otp=123456
```

### مرحله 3: تأیید انتشار

بعد از اجرای دستور، باید پیام موفقیت ببینید:

```
+ @lomineuro/jalali-date-picker@1.0.0
```

### مرحله 4: بررسی در npm

پکیج شما در آدرس زیر قابل دسترسی است:

https://www.npmjs.com/package/@lomineuro/jalali-date-picker

---

## اگر خطا دریافت کردید

### خطا: Invalid OTP
- کد OTP منقضی شده است (هر کد فقط 30 ثانیه معتبر است)
- کد جدید بگیرید و دوباره تلاش کنید

### خطا: Package already exists
- نسخه 1.0.0 قبلاً منتشر شده است
- باید نسخه را افزایش دهید:
  ```bash
  npm version patch  # برای 1.0.1
  npm version minor  # برای 1.1.0
  npm version major  # برای 2.0.0
  ```

---

## بعد از انتشار موفق

1. ✅ پکیج در npm منتشر شد
2. ✅ کاربران می‌توانند نصب کنند:
   ```bash
   npm install @lomineuro/jalali-date-picker
   ```
3. ✅ مستندات در npm قابل مشاهده است
4. ✅ آمار دانلود در npm نمایش داده می‌شود

---

## اطلاعات پکیج

- **نام**: @lomineuro/jalali-date-picker
- **نسخه**: 1.0.0
- **سازنده**: Amirreza Ghafarian
- **ایمیل**: amirghafarian7879@gmail.com
- **مجوز**: MIT
- **حجم**: 125.3 KB (فشرده)
- **حجم باز شده**: 776.1 KB

---

## 🎉 موفق باشید!

پکیج شما آماده است و منتظر انتشار! 💚
