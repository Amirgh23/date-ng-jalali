# Contributing Guide | راهنمای مشارکت

<div dir="rtl">

[English](#english) | [فارسی](#فارسی)

</div>

---

## فارسی

<div dir="rtl">

از اینکه می‌خواهید در پروژه تقویم جلالی مشارکت کنید، متشکریم! 🎉

### 📋 فهرست مطالب

1. [کد رفتار](#کد-رفتار)
2. [چگونه مشارکت کنیم](#چگونه-مشارکت-کنیم)
3. [راه‌اندازی محیط توسعه](#راه‌اندازی-محیط-توسعه)
4. [استانداردهای کد](#استانداردهای-کد)
5. [فرآیند Pull Request](#فرآیند-pull-request)
6. [گزارش باگ](#گزارش-باگ)
7. [پیشنهاد ویژگی جدید](#پیشنهاد-ویژگی-جدید)

### 🤝 کد رفتار

این پروژه و همه مشارکت‌کنندگان آن تحت [کد رفتار](CODE_OF_CONDUCT.md) قرار دارند. با مشارکت، انتظار می‌رود که این کد را رعایت کنید.

### 🚀 چگونه مشارکت کنیم

#### انواع مشارکت

- 🐛 گزارش باگ
- ✨ پیشنهاد ویژگی جدید
- 📝 بهبود مستندات
- 🎨 افزودن تم جدید
- 🌍 ترجمه به زبان‌های جدید
- ⚡ بهینه‌سازی عملکرد
- 🧪 نوشتن تست

### 💻 راه‌اندازی محیط توسعه

#### پیش‌نیازها

- Node.js (نسخه 18 یا بالاتر)
- npm (نسخه 9 یا بالاتر)
- Angular CLI (نسخه 21 یا بالاتر)

#### مراحل نصب

1. **Fork کردن مخزن**
   ```bash
   # روی دکمه Fork در GitHub کلیک کنید
   ```

2. **Clone کردن مخزن**
   ```bash
   git clone https://github.com/YOUR-USERNAME/jalali-date-picker.git
   cd jalali-date-picker
   ```

3. **نصب وابستگی‌ها**
   ```bash
   npm install
   ```

4. **اجرای سرور توسعه**
   ```bash
   npm start
   # یا
   ng serve demo
   ```

5. **باز کردن در مرورگر**
   ```
   http://localhost:4200
   ```

#### ساختار پروژه

```
jalali-date-picker/
├── projects/
│   ├── jalali-date-picker/     # کتابخانه اصلی
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/  # کامپوننت‌ها
│   │   │   │   ├── core/        # سرویس‌ها و مدل‌ها
│   │   │   │   └── themes/      # تم‌ها
│   │   │   └── public-api.ts
│   │   └── README.md
│   └── demo/                    # اپلیکیشن دمو
│       └── src/
└── README.md
```

### 📏 استانداردهای کد

#### TypeScript

- از TypeScript strict mode استفاده کنید
- همه متغیرها باید type داشته باشند
- از interface برای تعریف ساختار داده استفاده کنید
- از enum برای مقادیر ثابت استفاده کنید

```typescript
// ✅ خوب
interface DateRange {
  start: Date | null;
  end: Date | null;
}

// ❌ بد
const range = {
  start: null,
  end: null
};
```

#### نام‌گذاری

- **کامپوننت‌ها**: PascalCase با پسوند Component
  ```typescript
  export class JalaliCalendarComponent { }
  ```

- **سرویس‌ها**: PascalCase با پسوند Service
  ```typescript
  export class JalaliDateService { }
  ```

- **متغیرها و توابع**: camelCase
  ```typescript
  const selectedDate = new Date();
  function formatDate() { }
  ```

- **ثابت‌ها**: UPPER_SNAKE_CASE
  ```typescript
  const MAX_DATE_RANGE = 365;
  ```

#### کامنت‌ها

- کامنت‌های JSDoc برای توابع عمومی
- کامنت‌های توضیحی برای منطق پیچیده
- کامنت‌ها به فارسی یا انگلیسی

```typescript
/**
 * تبدیل تاریخ میلادی به جلالی
 * Convert Gregorian date to Jalali
 * @param date - تاریخ میلادی / Gregorian date
 * @returns تاریخ جلالی / Jalali date
 */
function gregorianToJalali(date: Date): JalaliDate {
  // پیاده‌سازی
}
```

#### استایل‌ها (SCSS)

- از BEM naming convention استفاده کنید
- از متغیرهای CSS برای رنگ‌ها استفاده کنید
- موبایل اول (Mobile-first)

```scss
// ✅ خوب
.jdp-calendar {
  &__header {
    // استایل‌ها
  }
  
  &__day {
    &--selected {
      background: var(--primary-color);
    }
  }
}

// ❌ بد
.calendar-header {
  // استایل‌ها
}
```

### 🔄 فرآیند Pull Request

#### قبل از ارسال PR

1. ✅ مطمئن شوید کد شما بیلد می‌شود
   ```bash
   ng build jalali-date-picker
   ```

2. ✅ تست‌ها را اجرا کنید
   ```bash
   ng test jalali-date-picker
   ```

3. ✅ کد را فرمت کنید
   ```bash
   npm run format
   ```

4. ✅ Lint را اجرا کنید
   ```bash
   npm run lint
   ```

#### ارسال PR

1. **برنچ جدید بسازید**
   ```bash
   git checkout -b feature/amazing-feature
   # یا
   git checkout -b fix/bug-description
   ```

2. **تغییرات را commit کنید**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   **فرمت Commit Message:**
   ```
   <type>(<scope>): <subject>
   
   <body>
   
   <footer>
   ```

   **انواع Type:**
   - `feat`: ویژگی جدید
   - `fix`: رفع باگ
   - `docs`: تغییر مستندات
   - `style`: تغییرات فرمت کد
   - `refactor`: بازنویسی کد
   - `perf`: بهبود عملکرد
   - `test`: افزودن تست
   - `chore`: تغییرات ابزارها

3. **Push کنید**
   ```bash
   git push origin feature/amazing-feature
   ```

4. **Pull Request باز کنید**
   - عنوان واضح و توصیفی
   - توضیحات کامل از تغییرات
   - اسکرین‌شات (در صورت نیاز)
   - لینک به Issue مرتبط

#### الگوی PR

```markdown
## توضیحات / Description

[توضیح کوتاه از تغییرات]

## نوع تغییر / Type of Change

- [ ] ویژگی جدید / New feature
- [ ] رفع باگ / Bug fix
- [ ] تغییر ناسازگار / Breaking change
- [ ] مستندات / Documentation

## چک‌لیست / Checklist

- [ ] کد بیلد می‌شود / Code builds
- [ ] تست‌ها پاس می‌شوند / Tests pass
- [ ] مستندات به‌روز شده / Documentation updated
- [ ] CHANGELOG به‌روز شده / CHANGELOG updated

## اسکرین‌شات / Screenshots

[در صورت نیاز]
```

### 🐛 گزارش باگ

برای گزارش باگ، یک Issue جدید با برچسب `bug` باز کنید:

#### الگوی گزارش باگ

```markdown
## توضیحات باگ / Bug Description

[توضیح واضح و مختصر از باگ]

## مراحل بازتولید / Steps to Reproduce

1. برو به '...'
2. کلیک کن روی '...'
3. اسکرول کن به '...'
4. باگ را ببین

## رفتار مورد انتظار / Expected Behavior

[چه اتفاقی باید بیفتد]

## رفتار واقعی / Actual Behavior

[چه اتفاقی افتاده]

## اسکرین‌شات / Screenshots

[در صورت امکان]

## محیط / Environment

- نسخه کتابخانه: [مثلاً 1.0.0]
- نسخه Angular: [مثلاً 21.0.0]
- مرورگر: [مثلاً Chrome 120]
- سیستم‌عامل: [مثلاً Windows 11]

## اطلاعات اضافی / Additional Context

[هر اطلاعات دیگری]
```

### ✨ پیشنهاد ویژگی جدید

برای پیشنهاد ویژگی، یک Issue جدید با برچسب `enhancement` باز کنید:

#### الگوی پیشنهاد ویژگی

```markdown
## توضیحات ویژگی / Feature Description

[توضیح واضح از ویژگی پیشنهادی]

## انگیزه / Motivation

[چرا این ویژگی مفید است؟]

## راه‌حل پیشنهادی / Proposed Solution

[چگونه باید پیاده‌سازی شود؟]

## جایگزین‌ها / Alternatives

[راه‌حل‌های جایگزین که در نظر گرفته‌اید]

## مثال استفاده / Usage Example

```typescript
// مثال کد
```
```

### 🎨 افزودن تم جدید

برای افزودن تم جدید:

1. فایل SCSS جدید در `src/lib/themes/` بسازید
2. از ساختار تم‌های موجود پیروی کنید
3. متغیرهای CSS را تعریف کنید
4. تم را در `themes-data.ts` ثبت کنید
5. اسکرین‌شات اضافه کنید

```scss
// my-theme.scss
.jdp-theme-my-theme {
  --primary-color: #your-color;
  --background: #your-bg;
  --text-color: #your-text;
  // ...
}
```

### 🌍 ترجمه

برای افزودن زبان جدید:

1. فایل ترجمه در `src/lib/core/services/locale.service.ts` اضافه کنید
2. تمام کلیدها را ترجمه کنید
3. جهت متن (RTL/LTR) را مشخص کنید
4. مستندات را به‌روز کنید

### 📞 ارتباط

- 💬 Discussion: [GitHub Discussions](https://github.com/lomineuro/jalali-date-picker/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/lomineuro/jalali-date-picker/issues)
- 📧 Email: amirghafarian7879@gmail.com

### 👨‍💻 سازنده

**Amirreza Ghafarian**
- 📧 Email: amirghafarian7879@gmail.com
- 🏢 Organization: [@lomineuro](https://npmjs.com/org/lomineuro)

### 🙏 تشکر

از همه مشارکت‌کنندگان متشکریم! 💚

</div>

---

## English

Thank you for wanting to contribute to the Jalali Date Picker project! 🎉

### 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Code Standards](#code-standards)
5. [Pull Request Process](#pull-request-process)
6. [Bug Reports](#bug-reports)
7. [Feature Requests](#feature-requests)

### 🤝 Code of Conduct

This project and all contributors are governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### 🚀 How to Contribute

#### Types of Contributions

- 🐛 Bug reports
- ✨ Feature requests
- 📝 Documentation improvements
- 🎨 New themes
- 🌍 Translations
- ⚡ Performance optimizations
- 🧪 Writing tests

### 💻 Development Setup

#### Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Angular CLI (version 21 or higher)

#### Installation Steps

1. **Fork the repository**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/jalali-date-picker.git
   cd jalali-date-picker
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run development server**
   ```bash
   npm start
   # or
   ng serve demo
   ```

5. **Open in browser**
   ```
   http://localhost:4200
   ```

#### Project Structure

```
jalali-date-picker/
├── projects/
│   ├── jalali-date-picker/     # Main library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/  # Components
│   │   │   │   ├── core/        # Services and models
│   │   │   │   └── themes/      # Themes
│   │   │   └── public-api.ts
│   │   └── README.md
│   └── demo/                    # Demo application
│       └── src/
└── README.md
```

### 📏 Code Standards

#### TypeScript

- Use TypeScript strict mode
- All variables must be typed
- Use interfaces for data structures
- Use enums for constants

```typescript
// ✅ Good
interface DateRange {
  start: Date | null;
  end: Date | null;
}

// ❌ Bad
const range = {
  start: null,
  end: null
};
```

#### Naming Conventions

- **Components**: PascalCase with Component suffix
  ```typescript
  export class JalaliCalendarComponent { }
  ```

- **Services**: PascalCase with Service suffix
  ```typescript
  export class JalaliDateService { }
  ```

- **Variables and functions**: camelCase
  ```typescript
  const selectedDate = new Date();
  function formatDate() { }
  ```

- **Constants**: UPPER_SNAKE_CASE
  ```typescript
  const MAX_DATE_RANGE = 365;
  ```

#### Comments

- JSDoc comments for public functions
- Explanatory comments for complex logic
- Comments in Persian or English

```typescript
/**
 * Convert Gregorian date to Jalali
 * @param date - Gregorian date
 * @returns Jalali date
 */
function gregorianToJalali(date: Date): JalaliDate {
  // Implementation
}
```

#### Styles (SCSS)

- Use BEM naming convention
- Use CSS variables for colors
- Mobile-first approach

```scss
// ✅ Good
.jdp-calendar {
  &__header {
    // styles
  }
  
  &__day {
    &--selected {
      background: var(--primary-color);
    }
  }
}

// ❌ Bad
.calendar-header {
  // styles
}
```

### 🔄 Pull Request Process

#### Before Submitting PR

1. ✅ Ensure code builds
   ```bash
   ng build jalali-date-picker
   ```

2. ✅ Run tests
   ```bash
   ng test jalali-date-picker
   ```

3. ✅ Format code
   ```bash
   npm run format
   ```

4. ✅ Run lint
   ```bash
   npm run lint
   ```

#### Submitting PR

1. **Create new branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   **Commit Message Format:**
   ```
   <type>(<scope>): <subject>
   
   <body>
   
   <footer>
   ```

   **Types:**
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code formatting
   - `refactor`: Code refactoring
   - `perf`: Performance improvement
   - `test`: Adding tests
   - `chore`: Tool changes

3. **Push**
   ```bash
   git push origin feature/amazing-feature
   ```

4. **Open Pull Request**
   - Clear and descriptive title
   - Complete description of changes
   - Screenshots (if applicable)
   - Link to related Issue

#### PR Template

```markdown
## Description

[Brief description of changes]

## Type of Change

- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation

## Checklist

- [ ] Code builds
- [ ] Tests pass
- [ ] Documentation updated
- [ ] CHANGELOG updated

## Screenshots

[If applicable]
```

### 🐛 Bug Reports

To report a bug, open a new Issue with the `bug` label:

#### Bug Report Template

```markdown
## Bug Description

[Clear and concise description]

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll to '...'
4. See bug

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Screenshots

[If possible]

## Environment

- Library version: [e.g. 1.0.0]
- Angular version: [e.g. 21.0.0]
- Browser: [e.g. Chrome 120]
- OS: [e.g. Windows 11]

## Additional Context

[Any other information]
```

### ✨ Feature Requests

To suggest a feature, open a new Issue with the `enhancement` label:

#### Feature Request Template

```markdown
## Feature Description

[Clear description of proposed feature]

## Motivation

[Why is this feature useful?]

## Proposed Solution

[How should it be implemented?]

## Alternatives

[Alternative solutions considered]

## Usage Example

```typescript
// Code example
```
```

### 🎨 Adding New Themes

To add a new theme:

1. Create new SCSS file in `src/lib/themes/`
2. Follow existing theme structure
3. Define CSS variables
4. Register theme in `themes-data.ts`
5. Add screenshot

```scss
// my-theme.scss
.jdp-theme-my-theme {
  --primary-color: #your-color;
  --background: #your-bg;
  --text-color: #your-text;
  // ...
}
```

### 🌍 Translations

To add a new language:

1. Add translation file in `src/lib/core/services/locale.service.ts`
2. Translate all keys
3. Specify text direction (RTL/LTR)
4. Update documentation

### 📞 Contact

- 💬 Discussion: [GitHub Discussions](https://github.com/lomineuro/jalali-date-picker/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/lomineuro/jalali-date-picker/issues)
- 📧 Email: amirghafarian7879@gmail.com

### 👨‍💻 Author

**Amirreza Ghafarian**
- 📧 Email: amirghafarian7879@gmail.com
- 🏢 Organization: [@lomineuro](https://npmjs.com/org/lomineuro)

### 🙏 Thank You

Thank you to all contributors! 💚
