# راهنمای مهاجرت از Angular Component به Web Component
# Migration Guide: Angular Component to Web Component

**[فارسی](#فارسی) | [English](#english)**

---

## فارسی

### مقدمه

این راهنما شما را در مهاجرت از Angular Component (`jalali-date-picker`) به Web Component استاندارد راهنمایی می‌کند. Web Component نسخه جدید بدون وابستگی به فریم‌ورک است و می‌تواند در هر محیط JavaScript استفاده شود.

### 1. مقایسه Angular Component و Web Component

#### Angular Component
```typescript
// استفاده در Angular
import { JalaliDatePickerComponent } from '@jalali-date-picker/angular';

@Component({
  selector: 'app-root',
  template: `
    <jalali-date-picker
      [(ngModel)]="selectedDate"
      [locale]="'fa'"
      [theme]="'light'"
      (dateSelect)="onDateSelect($event)"
    ></jalali-date-picker>
  `
})
export class AppComponent {
  selectedDate: Date | null = null;
  
  onDateSelect(event: any) {
    console.log('تاریخ انتخاب شده:', event);
  }
}
```

#### Web Component
```typescript
// استفاده در هر محیط
const picker = document.querySelector('jalali-date-picker');

picker.addEventListener('dateSelect', (e) => {
  console.log('تاریخ انتخاب شده:', e.detail.jalaliDate);
});

picker.locale = 'fa';
picker.theme = 'light';
```

#### تفاوت‌های اصلی

| ویژگی | Angular Component | Web Component |
|------|------------------|---------------|
| **وابستگی** | Angular Framework | بدون وابستگی |
| **استفاده** | `[(ngModel)]`, `@Input`, `@Output` | Properties و Events |
| **Binding** | Two-way binding | Manual event listeners |
| **Shadow DOM** | ندارد | دارد (Encapsulation) |
| **استایل** | Global styles | CSS Variables |
| **سازگاری** | فقط Angular | تمام فریم‌ورک‌ها |

### 2. مراحل مهاجرت گام به گام

#### مرحله 1: نصب Web Component

```bash
npm install jalali-web-component
```

#### مرحله 2: Import کردن

```typescript
// قبل (Angular)
import { JalaliDatePickerComponent } from '@jalali-date-picker/angular';

// بعد (Web Component)
import 'jalali-web-component';
```

#### مرحله 3: تغییر Template

```html
<!-- قبل (Angular) -->
<jalali-date-picker
  [(ngModel)]="selectedDate"
  [locale]="'fa'"
  [theme]="'light'"
  (dateSelect)="onDateSelect($event)"
></jalali-date-picker>

<!-- بعد (Web Component) -->
<jalali-date-picker
  id="myPicker"
  locale="fa"
  theme="light"
></jalali-date-picker>
```

#### مرحله 4: تغییر TypeScript

```typescript
// قبل (Angular)
export class MyComponent {
  selectedDate: Date | null = null;
  
  onDateSelect(event: any) {
    this.selectedDate = event.value;
  }
}

// بعد (Web Component)
export class MyComponent implements AfterViewInit {
  @ViewChild('myPicker') picker!: ElementRef;
  selectedDate: Date | null = null;
  
  ngAfterViewInit() {
    this.picker.nativeElement.addEventListener('dateSelect', (e: CustomEvent) => {
      this.selectedDate = e.detail.date;
    });
  }
}
```

### 3. تغییرات API

#### Properties

| Angular | Web Component | توضیح |
|---------|---------------|-------|
| `[(ngModel)]="date"` | `selectedDate` property | تاریخ انتخاب شده |
| `[locale]="'fa'"` | `locale` attribute | زبان و جهت |
| `[theme]="'light'"` | `theme` attribute | تم رنگی |
| `[selectionMode]="'single'"` | `selection-mode` attribute | حالت انتخاب |
| `[disabled]="true"` | `disabled` attribute | غیرفعال کردن |

#### Events

| Angular | Web Component | توضیح |
|---------|---------------|-------|
| `(dateSelect)="..."` | `dateSelect` event | انتخاب تاریخ |
| `(rangeSelect)="..."` | `rangeSelect` event | انتخاب بازه |
| `(multipleSelect)="..."` | `multipleSelect` event | انتخاب چندگانه |
| `(localeChange)="..."` | `localeChange` event | تغییر زبان |
| `(themeChange)="..."` | `themeChange` event | تغییر تم |

#### Methods

| Angular | Web Component | توضیح |
|---------|---------------|-------|
| `setDate(date)` | `setDate(date)` | تنظیم تاریخ |
| `getDate()` | `selectedDate` property | دریافت تاریخ |
| `reset()` | `reset()` | پاک کردن انتخاب |
| `open()` | `open()` | باز کردن |
| `close()` | `close()` | بستن |

### 4. مثال‌های قبل و بعد

#### مثال 1: انتخاب تاریخ ساده

**قبل (Angular):**
```typescript
@Component({
  selector: 'app-date-picker',
  template: `
    <jalali-date-picker
      [(ngModel)]="selectedDate"
      locale="fa"
      (dateSelect)="onDateSelect($event)"
    ></jalali-date-picker>
    <p>{{ selectedDate | date }}</p>
  `
})
export class DatePickerComponent {
  selectedDate: Date | null = null;
  
  onDateSelect(event: any) {
    console.log('تاریخ:', event.value);
  }
}
```

**بعد (Web Component):**
```typescript
@Component({
  selector: 'app-date-picker',
  template: `
    <jalali-date-picker
      #picker
      locale="fa"
    ></jalali-date-picker>
    <p>{{ selectedDate | date }}</p>
  `
})
export class DatePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;
  selectedDate: Date | null = null;
  
  ngAfterViewInit() {
    this.picker.nativeElement.addEventListener('dateSelect', (e: CustomEvent) => {
      this.selectedDate = e.detail.date;
    });
  }
}
```

#### مثال 2: انتخاب بازه تاریخی

**قبل (Angular):**
```typescript
@Component({
  template: `
    <jalali-date-picker
      [(ngModel)]="dateRange"
      selectionMode="range"
      (rangeSelect)="onRangeSelect($event)"
    ></jalali-date-picker>
  `
})
export class RangePickerComponent {
  dateRange: { start: Date; end: Date } | null = null;
  
  onRangeSelect(event: any) {
    console.log('بازه:', event.value);
  }
}
```

**بعد (Web Component):**
```typescript
@Component({
  template: `
    <jalali-date-picker
      #picker
      selection-mode="range"
    ></jalali-date-picker>
  `
})
export class RangePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;
  
  ngAfterViewInit() {
    this.picker.nativeElement.addEventListener('rangeSelect', (e: CustomEvent) => {
      console.log('بازه:', e.detail.start, '-', e.detail.end);
    });
  }
}
```

#### مثال 3: تغییر تم و زبان

**قبل (Angular):**
```typescript
@Component({
  template: `
    <button (click)="toggleTheme()">تغییر تم</button>
    <button (click)="toggleLocale()">تغییر زبان</button>
    <jalali-date-picker
      [theme]="currentTheme"
      [locale]="currentLocale"
      (themeChange)="onThemeChange($event)"
      (localeChange)="onLocaleChange($event)"
    ></jalali-date-picker>
  `
})
export class ThemePickerComponent {
  currentTheme = 'light';
  currentLocale = 'fa';
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
  
  toggleLocale() {
    this.currentLocale = this.currentLocale === 'fa' ? 'en' : 'fa';
  }
}
```

**بعد (Web Component):**
```typescript
@Component({
  template: `
    <button (click)="toggleTheme()">تغییر تم</button>
    <button (click)="toggleLocale()">تغییر زبان</button>
    <jalali-date-picker #picker></jalali-date-picker>
  `
})
export class ThemePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;
  
  ngAfterViewInit() {
    const pickerElement = this.picker.nativeElement;
    
    pickerElement.addEventListener('themeChange', (e: CustomEvent) => {
      console.log('تم تغییر کرد:', e.detail.theme);
    });
    
    pickerElement.addEventListener('localeChange', (e: CustomEvent) => {
      console.log('زبان تغییر کرد:', e.detail.locale);
    });
  }
  
  toggleTheme() {
    const pickerElement = this.picker.nativeElement;
    pickerElement.theme = pickerElement.theme === 'light' ? 'dark' : 'light';
  }
  
  toggleLocale() {
    const pickerElement = this.picker.nativeElement;
    pickerElement.locale = pickerElement.locale === 'fa' ? 'en' : 'fa';
  }
}
```

### 5. مشکلات رایج و حل‌های آن

#### مشکل 1: Two-way Binding کار نمی‌کند

**مشکل:**
```typescript
// این کار نمی‌کند
<jalali-date-picker [(ngModel)]="selectedDate"></jalali-date-picker>
```

**حل:**
```typescript
// استفاده از event listener
@ViewChild('picker') picker!: ElementRef;

ngAfterViewInit() {
  this.picker.nativeElement.addEventListener('dateSelect', (e: CustomEvent) => {
    this.selectedDate = e.detail.date;
  });
}
```

#### مشکل 2: استایل‌های Global تأثیر نمی‌گذارند

**مشکل:**
```css
/* این کار نمی‌کند (Shadow DOM) */
jalali-date-picker {
  color: red;
}
```

**حل:**
```css
/* استفاده از CSS Variables */
jalali-date-picker {
  --primary-color: #007bff;
  --text-color: #000000;
  --background: #ffffff;
}
```

#### مشکل 3: دسترسی به Shadow DOM

**مشکل:**
```typescript
// این کار نمی‌کند
const input = document.querySelector('jalali-date-picker input');
```

**حل:**
```typescript
// استفاده از public API
const picker = document.querySelector('jalali-date-picker');
picker.setDate(new Date());
picker.open();
```

#### مشکل 4: Event Detail متفاوت است

**مشکل:**
```typescript
// Angular event
onDateSelect(event: any) {
  console.log(event.value); // undefined
}
```

**حل:**
```typescript
// Web Component event
picker.addEventListener('dateSelect', (e: CustomEvent) => {
  console.log(e.detail.date);      // Date object
  console.log(e.detail.jalaliDate); // "1402/10/25"
});
```

#### مشکل 5: Disabled attribute کار نمی‌کند

**مشکل:**
```html
<!-- این کار نمی‌کند -->
<jalali-date-picker [disabled]="true"></jalali-date-picker>
```

**حل:**
```html
<!-- استفاده از attribute -->
<jalali-date-picker disabled></jalali-date-picker>

<!-- یا property -->
<script>
  picker.disabled = true;
</script>
```

### 6. نکات مهم برای مهاجرت

#### نکته 1: Shadow DOM Encapsulation
Web Component از Shadow DOM استفاده می‌کند که استایل‌های global را جدا می‌کند. برای تغییر استایل، از CSS Variables استفاده کنید.

```css
jalali-date-picker {
  --primary-color: #007bff;
  --border-radius: 8px;
  --padding-base: 16px;
}
```

#### نکته 2: Event Listeners
همیشه event listeners را در `ngAfterViewInit` یا بعد از DOM ready تنظیم کنید.

```typescript
ngAfterViewInit() {
  const picker = this.picker.nativeElement;
  picker.addEventListener('dateSelect', this.handleDateSelect);
}

ngOnDestroy() {
  const picker = this.picker.nativeElement;
  picker.removeEventListener('dateSelect', this.handleDateSelect);
}
```

#### نکته 3: Performance
Web Component بهینه‌سازی شده است. برای بهترین عملکرد:
- از `open()` و `close()` استفاده کنید
- Event listeners را cleanup کنید
- از `reset()` برای پاک کردن استفاده کنید

```typescript
ngOnDestroy() {
  this.picker.nativeElement.reset();
  this.picker.nativeElement.close();
}
```

#### نکته 4: Accessibility
Web Component WCAG 2.1 compliant است. برای بهترین accessibility:
- از semantic HTML استفاده کنید
- ARIA attributes را تنظیم کنید
- Keyboard navigation پشتیبانی می‌شود

```html
<label for="date-picker">تاریخ را انتخاب کنید</label>
<jalali-date-picker id="date-picker"></jalali-date-picker>
```

#### نکته 5: Browser Support
Web Component در تمام مرورگرهای مدرن کار می‌کند:
- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+

---

## English

### Introduction

This guide will help you migrate from Angular Component (`jalali-date-picker`) to a standard Web Component. The Web Component is a new version with no framework dependencies and can be used in any JavaScript environment.

### 1. Comparison: Angular Component vs Web Component

#### Angular Component
```typescript
// Usage in Angular
import { JalaliDatePickerComponent } from '@jalali-date-picker/angular';

@Component({
  selector: 'app-root',
  template: `
    <jalali-date-picker
      [(ngModel)]="selectedDate"
      [locale]="'fa'"
      [theme]="'light'"
      (dateSelect)="onDateSelect($event)"
    ></jalali-date-picker>
  `
})
export class AppComponent {
  selectedDate: Date | null = null;
  
  onDateSelect(event: any) {
    console.log('Selected date:', event);
  }
}
```

#### Web Component
```typescript
// Usage in any environment
const picker = document.querySelector('jalali-date-picker');

picker.addEventListener('dateSelect', (e) => {
  console.log('Selected date:', e.detail.jalaliDate);
});

picker.locale = 'fa';
picker.theme = 'light';
```

#### Key Differences

| Feature | Angular Component | Web Component |
|---------|------------------|---------------|
| **Dependencies** | Angular Framework | No dependencies |
| **Usage** | `[(ngModel)]`, `@Input`, `@Output` | Properties and Events |
| **Binding** | Two-way binding | Manual event listeners |
| **Shadow DOM** | No | Yes (Encapsulation) |
| **Styling** | Global styles | CSS Variables |
| **Compatibility** | Angular only | All frameworks |

### 2. Step-by-Step Migration

#### Step 1: Install Web Component

```bash
npm install jalali-web-component
```

#### Step 2: Import

```typescript
// Before (Angular)
import { JalaliDatePickerComponent } from '@jalali-date-picker/angular';

// After (Web Component)
import 'jalali-web-component';
```

#### Step 3: Update Template

```html
<!-- Before (Angular) -->
<jalali-date-picker
  [(ngModel)]="selectedDate"
  [locale]="'fa'"
  [theme]="'light'"
  (dateSelect)="onDateSelect($event)"
></jalali-date-picker>

<!-- After (Web Component) -->
<jalali-date-picker
  id="myPicker"
  locale="fa"
  theme="light"
></jalali-date-picker>
```

#### Step 4: Update TypeScript

```typescript
// Before (Angular)
export class MyComponent {
  selectedDate: Date | null = null;
  
  onDateSelect(event: any) {
    this.selectedDate = event.value;
  }
}

// After (Web Component)
export class MyComponent implements AfterViewInit {
  @ViewChild('myPicker') picker!: ElementRef;
  selectedDate: Date | null = null;
  
  ngAfterViewInit() {
    this.picker.nativeElement.addEventListener('dateSelect', (e: CustomEvent) => {
      this.selectedDate = e.detail.date;
    });
  }
}
```

### 3. API Changes

#### Properties

| Angular | Web Component | Description |
|---------|---------------|-------------|
| `[(ngModel)]="date"` | `selectedDate` property | Selected date |
| `[locale]="'fa'"` | `locale` attribute | Language and direction |
| `[theme]="'light'"` | `theme` attribute | Color theme |
| `[selectionMode]="'single'"` | `selection-mode` attribute | Selection mode |
| `[disabled]="true"` | `disabled` attribute | Disable component |

#### Events

| Angular | Web Component | Description |
|---------|---------------|-------------|
| `(dateSelect)="..."` | `dateSelect` event | Date selected |
| `(rangeSelect)="..."` | `rangeSelect` event | Range selected |
| `(multipleSelect)="..."` | `multipleSelect` event | Multiple dates selected |
| `(localeChange)="..."` | `localeChange` event | Locale changed |
| `(themeChange)="..."` | `themeChange` event | Theme changed |

#### Methods

| Angular | Web Component | Description |
|---------|---------------|-------------|
| `setDate(date)` | `setDate(date)` | Set date |
| `getDate()` | `selectedDate` property | Get date |
| `reset()` | `reset()` | Clear selection |
| `open()` | `open()` | Open picker |
| `close()` | `close()` | Close picker |

### 4. Before and After Examples

#### Example 1: Simple Date Selection

**Before (Angular):**
```typescript
@Component({
  selector: 'app-date-picker',
  template: `
    <jalali-date-picker
      [(ngModel)]="selectedDate"
      locale="fa"
      (dateSelect)="onDateSelect($event)"
    ></jalali-date-picker>
    <p>{{ selectedDate | date }}</p>
  `
})
export class DatePickerComponent {
  selectedDate: Date | null = null;
  
  onDateSelect(event: any) {
    console.log('Date:', event.value);
  }
}
```

**After (Web Component):**
```typescript
@Component({
  selector: 'app-date-picker',
  template: `
    <jalali-date-picker
      #picker
      locale="fa"
    ></jalali-date-picker>
    <p>{{ selectedDate | date }}</p>
  `
})
export class DatePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;
  selectedDate: Date | null = null;
  
  ngAfterViewInit() {
    this.picker.nativeElement.addEventListener('dateSelect', (e: CustomEvent) => {
      this.selectedDate = e.detail.date;
    });
  }
}
```

#### Example 2: Date Range Selection

**Before (Angular):**
```typescript
@Component({
  template: `
    <jalali-date-picker
      [(ngModel)]="dateRange"
      selectionMode="range"
      (rangeSelect)="onRangeSelect($event)"
    ></jalali-date-picker>
  `
})
export class RangePickerComponent {
  dateRange: { start: Date; end: Date } | null = null;
  
  onRangeSelect(event: any) {
    console.log('Range:', event.value);
  }
}
```

**After (Web Component):**
```typescript
@Component({
  template: `
    <jalali-date-picker
      #picker
      selection-mode="range"
    ></jalali-date-picker>
  `
})
export class RangePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;
  
  ngAfterViewInit() {
    this.picker.nativeElement.addEventListener('rangeSelect', (e: CustomEvent) => {
      console.log('Range:', e.detail.start, '-', e.detail.end);
    });
  }
}
```

#### Example 3: Theme and Locale Changes

**Before (Angular):**
```typescript
@Component({
  template: `
    <button (click)="toggleTheme()">Toggle Theme</button>
    <button (click)="toggleLocale()">Toggle Language</button>
    <jalali-date-picker
      [theme]="currentTheme"
      [locale]="currentLocale"
      (themeChange)="onThemeChange($event)"
      (localeChange)="onLocaleChange($event)"
    ></jalali-date-picker>
  `
})
export class ThemePickerComponent {
  currentTheme = 'light';
  currentLocale = 'fa';
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
  
  toggleLocale() {
    this.currentLocale = this.currentLocale === 'fa' ? 'en' : 'fa';
  }
}
```

**After (Web Component):**
```typescript
@Component({
  template: `
    <button (click)="toggleTheme()">Toggle Theme</button>
    <button (click)="toggleLocale()">Toggle Language</button>
    <jalali-date-picker #picker></jalali-date-picker>
  `
})
export class ThemePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;
  
  ngAfterViewInit() {
    const pickerElement = this.picker.nativeElement;
    
    pickerElement.addEventListener('themeChange', (e: CustomEvent) => {
      console.log('Theme changed:', e.detail.theme);
    });
    
    pickerElement.addEventListener('localeChange', (e: CustomEvent) => {
      console.log('Locale changed:', e.detail.locale);
    });
  }
  
  toggleTheme() {
    const pickerElement = this.picker.nativeElement;
    pickerElement.theme = pickerElement.theme === 'light' ? 'dark' : 'light';
  }
  
  toggleLocale() {
    const pickerElement = this.picker.nativeElement;
    pickerElement.locale = pickerElement.locale === 'fa' ? 'en' : 'fa';
  }
}
```

### 5. Common Issues and Solutions

#### Issue 1: Two-way Binding Doesn't Work

**Problem:**
```typescript
// This doesn't work
<jalali-date-picker [(ngModel)]="selectedDate"></jalali-date-picker>
```

**Solution:**
```typescript
// Use event listener
@ViewChild('picker') picker!: ElementRef;

ngAfterViewInit() {
  this.picker.nativeElement.addEventListener('dateSelect', (e: CustomEvent) => {
    this.selectedDate = e.detail.date;
  });
}
```

#### Issue 2: Global Styles Don't Apply

**Problem:**
```css
/* This doesn't work (Shadow DOM) */
jalali-date-picker {
  color: red;
}
```

**Solution:**
```css
/* Use CSS Variables */
jalali-date-picker {
  --primary-color: #007bff;
  --text-color: #000000;
  --background: #ffffff;
}
```

#### Issue 3: Can't Access Shadow DOM

**Problem:**
```typescript
// This doesn't work
const input = document.querySelector('jalali-date-picker input');
```

**Solution:**
```typescript
// Use public API
const picker = document.querySelector('jalali-date-picker');
picker.setDate(new Date());
picker.open();
```

#### Issue 4: Event Detail is Different

**Problem:**
```typescript
// Angular event
onDateSelect(event: any) {
  console.log(event.value); // undefined
}
```

**Solution:**
```typescript
// Web Component event
picker.addEventListener('dateSelect', (e: CustomEvent) => {
  console.log(e.detail.date);      // Date object
  console.log(e.detail.jalaliDate); // "1402/10/25"
});
```

#### Issue 5: Disabled Attribute Doesn't Work

**Problem:**
```html
<!-- This doesn't work -->
<jalali-date-picker [disabled]="true"></jalali-date-picker>
```

**Solution:**
```html
<!-- Use attribute -->
<jalali-date-picker disabled></jalali-date-picker>

<!-- Or property -->
<script>
  picker.disabled = true;
</script>
```

### 6. Important Migration Notes

#### Note 1: Shadow DOM Encapsulation
Web Component uses Shadow DOM which isolates global styles. Use CSS Variables to customize styling.

```css
jalali-date-picker {
  --primary-color: #007bff;
  --border-radius: 8px;
  --padding-base: 16px;
}
```

#### Note 2: Event Listeners
Always set up event listeners in `ngAfterViewInit` or after DOM is ready.

```typescript
ngAfterViewInit() {
  const picker = this.picker.nativeElement;
  picker.addEventListener('dateSelect', this.handleDateSelect);
}

ngOnDestroy() {
  const picker = this.picker.nativeElement;
  picker.removeEventListener('dateSelect', this.handleDateSelect);
}
```

#### Note 3: Performance
Web Component is optimized for performance. For best results:
- Use `open()` and `close()` methods
- Clean up event listeners
- Use `reset()` to clear selection

```typescript
ngOnDestroy() {
  this.picker.nativeElement.reset();
  this.picker.nativeElement.close();
}
```

#### Note 4: Accessibility
Web Component is WCAG 2.1 compliant. For best accessibility:
- Use semantic HTML
- Set ARIA attributes
- Keyboard navigation is supported

```html
<label for="date-picker">Select a date</label>
<jalali-date-picker id="date-picker"></jalali-date-picker>
```

#### Note 5: Browser Support
Web Component works in all modern browsers:
- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+

---

## خلاصه / Summary

| جنبه | Angular | Web Component |
|-----|---------|---------------|
| **نصب** | `npm install @jalali-date-picker/angular` | `npm install jalali-web-component` |
| **Import** | `import { JalaliDatePickerComponent }` | `import 'jalali-web-component'` |
| **Binding** | `[(ngModel)]="date"` | Event listeners |
| **استایل** | Global CSS | CSS Variables |
| **سازگاری** | Angular only | All frameworks |
| **Shadow DOM** | No | Yes |

برای سؤالات بیشتر، به [API Reference](./API_REFERENCE.md) مراجعه کنید.

For more questions, refer to [API Reference](./API_REFERENCE.md).
