# راهنمای تنظیم 2FA برای npm

## مشکل فعلی
npm از شما می‌خواهد از WebAuthn (Security Key) استفاده کنید، اما شما به Authenticator App (TOTP) نیاز دارید.

## راه حل: تنظیم مجدد 2FA

### مرحله 1: غیرفعال کردن 2FA فعلی

1. به https://www.npmjs.com/settings/amirgh23/tfa بروید
2. وارد حساب خود شوید
3. "Disable 2FA" را کلیک کنید
4. تأیید کنید

### مرحله 2: فعال کردن 2FA با Authenticator App

1. به https://www.npmjs.com/settings/amirgh23/tfa بروید
2. "Enable 2FA" را کلیک کنید
3. گزینه "Authorization and Publishing" را انتخاب کنید
4. **مهم**: گزینه "Authenticator App" را انتخاب کنید (نه Security Key)
5. QR Code نمایش داده می‌شود
6. اپلیکیشن Google Authenticator را باز کنید
7. "+" را بزنید و "Scan QR Code" را انتخاب کنید
8. QR Code را اسکن کنید
9. کد 6 رقمی را وارد کنید
10. Recovery codes را ذخیره کنید

### مرحله 3: تست 2FA

بعد از تنظیم، دستور زیر را اجرا کنید:

```bash
cd dist/jalali-date-picker
npm publish --access public --otp=YOUR_6_DIGIT_CODE
```

کد 6 رقمی را از Google Authenticator بگیرید.

---

## اگر نمی‌توانید 2FA را غیرفعال کنید

### راه حل جایگزین: استفاده از Automation Token

1. به https://www.npmjs.com/settings/amirgh23/tokens بروید
2. "Generate New Token" را کلیک کنید
3. نوع "Automation" را انتخاب کنید
4. Token را کپی کنید
5. از دستور زیر استفاده کنید:

```bash
cd dist/jalali-date-picker
npm publish --access public --//registry.npmjs.org/:_authToken=YOUR_TOKEN
```

---

## نکات مهم

- Token را در جای امن نگه دارید
- Token را در کد یا GitHub قرار ندهید
- بعد از استفاده، می‌توانید token را حذف کنید
