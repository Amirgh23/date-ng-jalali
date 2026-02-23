# پشتیبانی دو زبانه (Bilingual Support)

## نمای کلی (Overview)

کامپوننت تقویم جلالی اکنون از چهار زبان پشتیبانی می‌کند:
- **فارسی (Persian)** - `fa`
- **انگلیسی (English)** - `en`
- **عربی (Arabic)** - `ar`
- **کردی (Kurdish)** - `ku`

The Jalali Date Picker component now supports four languages:
- **Persian (فارسی)** - `fa`
- **English** - `en`
- **Arabic (العربية)** - `ar`
- **Kurdish (کوردی)** - `ku`

---

## استفاده (Usage)

### تنظیم زبان پیش‌فرض (Setting Default Language)

```typescript
import { Component } from '@angular/core';
import { JalaliDatePickerComponent } from 'jalali-date-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JalaliDatePickerComponent],
  template: `
    <jalali-date-picker
      [locale]="'en'"
      [(selectedDate)]="selectedDate">
    </jalali-date-picker>
  `
})
export class AppComponent {
  selectedDate = new Date();
}
```

### تغییر زبان به صورت پویا (Dynamic Language Switching)

```typescript
import { Component } from '@angular/core';
import { JalaliDatePickerComponent, LocaleService, SupportedLocale } from 'jalali-date-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JalaliDatePickerComponent],
  template: `
    <div>
      <!-- Language Switcher -->
      <button (click)="switchLanguage('fa')">فارسی</button>
      <button (click)="switchLanguage('en')">English</button>
      <button (click)="switchLanguage('ar')">العربية</button>
      <button (click)="switchLanguage('ku')">کوردی</button>
      
      <!-- Date Picker -->
      <jalali-date-picker
        [locale]="currentLocale"
        [(selectedDate)]="selectedDate">
      </jalali-date-picker>
    </div>
  `
})
export class AppComponent {
  selectedDate = new Date();
  currentLocale: SupportedLocale = 'fa';

  constructor(private localeService: LocaleService) {}

  switchLanguage(locale: SupportedLocale) {
    this.currentLocale = locale;
    this.localeService.setLocale(locale);
  }
}
```

---

## ویژگی‌ها (Features)

### 1. ذخیره‌سازی خودکار (Automatic Persistence)
زبان انتخاب شده به صورت خودکار در `localStorage` ذخیره می‌شود و در بارگذاری مجدد صفحه بازیابی می‌گردد.

The selected language is automatically saved to `localStorage` and restored on page reload.

### 2. جهت متن (Text Direction)
جهت متن (RTL/LTR) به صورت خودکار بر اساس زبان انتخاب شده تنظیم می‌شود:
- **RTL**: فارسی، عربی، کردی
- **LTR**: انگلیسی

Text direction (RTL/LTR) is automatically set based on the selected language:
- **RTL**: Persian, Arabic, Kurdish
- **LTR**: English

### 3. ترجمه کامل رابط کاربری (Complete UI Translation)
تمام عناصر رابط کاربری شامل:
- برچسب‌های دکمه‌ها (Button labels)
- نام ماه‌ها (Month names)
- نام روزهای هفته (Day names)
- پیام‌های راهنما (Help messages)
- برچسب‌های دسترسی‌پذیری (Accessibility labels)

---

## API

### LocaleService

#### متدها (Methods)

```typescript
// تنظیم زبان (Set locale)
setLocale(locale: SupportedLocale): void

// دریافت زبان فعلی (Get current locale)
getLocale(): SupportedLocale

// ترجمه کلید (Translate key)
translate(key: string): string

// ترجمه با پارامترها (Translate with parameters)
translateWithParams(key: string, params: { [key: string]: string }): string

// دریافت جهت متن (Get text direction)
getDirection(): 'rtl' | 'ltr'

// دریافت نام روزهای هفته (مخفف) (Get week days short)
getWeekDaysShort(): string[]

// دریافت نام روزهای هفته (کامل) (Get week days full)
getWeekDaysFull(): string[]

// اضافه کردن ترجمه سفارشی (Add custom translation)
addTranslation(locale: SupportedLocale, key: string, value: string): void

// اضافه کردن ترجمه‌های سفارشی (Add custom translations)
addTranslations(locale: SupportedLocale, translations: LocaleStrings): void
```

---

## ترجمه‌های سفارشی (Custom Translations)

می‌توانید ترجمه‌های سفارشی خود را اضافه کنید:

You can add your own custom translations:

```typescript
import { LocaleService } from 'jalali-date-picker';

constructor(private localeService: LocaleService) {
  // اضافه کردن یک ترجمه (Add single translation)
  this.localeService.addTranslation('fa', 'custom_key', 'مقدار سفارشی');
  
  // اضافه کردن چند ترجمه (Add multiple translations)
  this.localeService.addTranslations('en', {
    'custom_key_1': 'Custom Value 1',
    'custom_key_2': 'Custom Value 2'
  });
}
```

---

## کلیدهای ترجمه موجود (Available Translation Keys)

### ماه‌ها (Months)
- `january`, `february`, `march`, `april`, `may`, `june`
- `july`, `august`, `september`, `october`, `november`, `december`

### روزهای هفته (Days)
- `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`
- `sun_short`, `mon_short`, `tue_short`, `wed_short`, `thu_short`, `fri_short`, `sat_short`

### عمومی (Common)
- `select_date`, `today`, `clear`, `ok`, `cancel`
- `previous_month`, `next_month`, `previous_year`, `next_year`
- `theme`, `language`, `settings`, `about`, `help`, `close`
- `loading`, `error`, `success`, `warning`, `info`

### انتخاب‌گر تم (Theme Selector)
- `select_theme`, `light_theme`, `dark_theme`, `reset_default`, `theme_type`

### انتخاب‌گر رنگ (Color Picker)
- `color_palette`, `primary_color`, `secondary_color`, `accent_color`
- `preset_palettes`, `preset_palette`

### تقویم (Calendar)
- `open_calendar`, `calendar`, `date_calendar`
- `select_calendar_type`, `select_theme_color`, `day_info`
- `dates_selected`, `from`

### دسترسی‌پذیری (Accessibility)
- `press_enter_to_select`, `selected`, `not_selected`

---

## مثال کامل (Complete Example)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliDatePickerComponent, LocaleService, SupportedLocale } from 'jalali-date-picker';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, JalaliDatePickerComponent],
  template: `
    <div class="demo-container">
      <!-- Language Switcher -->
      <div class="language-switcher">
        <button 
          *ngFor="let lang of languages"
          (click)="switchLanguage(lang.code)"
          [class.active]="currentLocale === lang.code">
          {{ lang.flag }} {{ lang.name }}
        </button>
      </div>

      <!-- Date Picker -->
      <jalali-date-picker
        [locale]="currentLocale"
        [(selectedDate)]="selectedDate"
        (dateSelect)="onDateSelect($event)">
      </jalali-date-picker>

      <!-- Selected Date Display -->
      <div class="result">
        <p>{{ localeService.translate('select_date') }}: {{ selectedDate | date }}</p>
      </div>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .language-switcher button {
      padding: 8px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .language-switcher button.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
  `]
})
export class DemoComponent {
  selectedDate = new Date();
  currentLocale: SupportedLocale = 'fa';
  
  languages = [
    { code: 'fa' as SupportedLocale, name: 'فارسی', flag: '🇮🇷' },
    { code: 'en' as SupportedLocale, name: 'English', flag: '🇬🇧' },
    { code: 'ar' as SupportedLocale, name: 'العربية', flag: '🇸🇦' },
    { code: 'ku' as SupportedLocale, name: 'کوردی', flag: '🏴' }
  ];

  constructor(public localeService: LocaleService) {}

  switchLanguage(locale: SupportedLocale) {
    this.currentLocale = locale;
    this.localeService.setLocale(locale);
  }

  onDateSelect(date: Date) {
    console.log('Selected date:', date);
  }
}
```

---

## نکات مهم (Important Notes)

1. **ذخیره‌سازی خودکار**: زبان انتخاب شده در `localStorage` با کلید `jalali-locale` ذخیره می‌شود
2. **جهت متن**: جهت متن به صورت خودکار بر روی `document.documentElement` اعمال می‌شود
3. **تغییر زبان**: تغییر زبان بلافاصله بر روی تمام کامپوننت‌ها اعمال می‌شود
4. **سازگاری**: با تمام مرورگرهای مدرن سازگار است

1. **Auto-save**: Selected language is saved to `localStorage` with key `jalali-locale`
2. **Text Direction**: Direction is automatically applied to `document.documentElement`
3. **Language Change**: Language changes are immediately applied to all components
4. **Compatibility**: Compatible with all modern browsers

---

## پشتیبانی (Support)

برای گزارش مشکلات یا درخواست ویژگی‌های جدید، لطفاً یک issue در GitHub ایجاد کنید.

For bug reports or feature requests, please create an issue on GitHub.
