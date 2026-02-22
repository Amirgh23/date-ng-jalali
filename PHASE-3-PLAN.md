# فاز ۳: تکمیل کامپوننت‌های اصلی

## 📋 خلاصه فاز

**مدت زمان**: ۳-۴ روز
**اولویت**: 🔴 بالا
**وضعیت**: 🔴 آماده برای شروع
**درصد تکمیل**: 0%

---

## 🎯 اهداف فاز ۳

### هدف اصلی
تکمیل تمام کامپوننت‌های اصلی تقویم جلالی با:
- ✅ Inputs و Outputs کامل
- ✅ Responsive Design
- ✅ Keyboard Navigation
- ✅ انیمیشن‌های روان
- ✅ Build موفق

### نتیجه مورد انتظار
- ✅ ۵ کامپوننت بهبود یافته
- ✅ Build بدون خطا
- ✅ درصد تکمیل: 60%

---

## 📁 کامپوننت‌های مورد نیاز

### ۱. JalaliDatePickerComponent
**فایل**: `projects/jalali-date-picker/src/lib/components/date-picker/jalali-date-picker.component.ts`

#### Inputs مورد نیاز:
```typescript
@Input() disabled: boolean = false;
@Input() placeholder: string = 'تاریخ را انتخاب کنید';
@Input() format: string = 'YYYY/MM/DD';
@Input() locale: string = 'fa';
@Input() theme: string = 'light';
@Input() selectionMode: 'single' | 'range' | 'multiple' = 'single';
@Input() minDate?: Date;
@Input() maxDate?: Date;
@Input() disabledDates?: Date[];
@Input() readonly: boolean = false;
```

#### Outputs مورد نیاز:
```typescript
@Output() dateSelected = new EventEmitter<Date>();
@Output() dateRangeSelected = new EventEmitter<{ start: Date; end: Date }>();
@Output() datesSelected = new EventEmitter<Date[]>();
@Output() blur = new EventEmitter<void>();
@Output() focus = new EventEmitter<void>();
@Output() change = new EventEmitter<Date | Date[] | { start: Date; end: Date }>();
```

#### متدهای مورد نیاز:
- `open()` - باز کردن تقویم
- `close()` - بستن تقویم
- `clear()` - پاک کردن انتخاب
- `setDate(date: Date)` - تنظیم تاریخ
- `getSelectedDate()` - دریافت تاریخ انتخاب‌شده

#### ویژگی‌های مورد نیاز:
- ✅ Responsive Design (موبایل، تبلت، دسکتاپ)
- ✅ Keyboard Navigation (Arrow Keys، Enter، Escape)
- ✅ Touch Support
- ✅ Accessibility (ARIA labels)

---

### ۲. JalaliCalendarComponent
**فایل**: `projects/jalali-date-picker/src/lib/components/calendar/jalali-calendar.component.ts`

#### Inputs مورد نیاز:
```typescript
@Input() year: number = new Date().getFullYear();
@Input() month: number = new Date().getMonth() + 1;
@Input() selectedDate?: Date;
@Input() minDate?: Date;
@Input() maxDate?: Date;
@Input() disabledDates?: Date[];
@Input() selectionMode: 'single' | 'range' | 'multiple' = 'single';
@Input() locale: string = 'fa';
@Input() theme: string = 'light';
```

#### Outputs مورد نیاز:
```typescript
@Output() dateSelected = new EventEmitter<Date>();
@Output() monthChanged = new EventEmitter<{ year: number; month: number }>();
@Output() viewChanged = new EventEmitter<'day' | 'month' | 'year' | 'decade'>();
```

#### متدهای مورد نیاز:
- `previousMonth()` - ماه قبلی
- `nextMonth()` - ماه بعدی
- `previousYear()` - سال قبلی
- `nextYear()` - سال بعدی
- `switchToMonthView()` - نمای ماه
- `switchToYearView()` - نمای سال
- `switchToDayView()` - نمای روز
- `today()` - امروز

#### نماهای مورد نیاز:
- ✅ Day View (نمای روز - پیش‌فرض)
- ✅ Month View (نمای ماه)
- ✅ Year View (نمای سال)
- ✅ Decade View (نمای دهه)

#### ویژگی‌های مورد نیاز:
- ✅ Grid Layout (۷ ستون برای روزهای هفته)
- ✅ Responsive Design
- ✅ Keyboard Navigation
- ✅ Accessibility

---

### ۳. ThemeSelectorComponent
**فایل**: `projects/jalali-date-picker/src/lib/components/theme-selector/theme-selector.component.ts`

#### Inputs مورد نیاز:
```typescript
@Input() themes: ThemeConfig[] = [];
@Input() currentTheme: string = 'light';
@Input() showPreview: boolean = true;
@Input() showDarkModeToggle: boolean = true;
```

#### Outputs مورد نیاز:
```typescript
@Output() themeSelected = new EventEmitter<string>();
@Output() darkModeToggled = new EventEmitter<boolean>();
```

#### متدهای مورد نیاز:
- `selectTheme(themeName: string)` - انتخاب تم
- `toggleDarkMode()` - تبدیل تم تاریک/روشن
- `resetTheme()` - بازنشانی تم
- `previewTheme(themeName: string)` - پیش‌نمایش تم

#### ویژگی‌های مورد نیاز:
- ✅ پیش‌نمایش زنده تم‌ها
- ✅ انیمیشن انتقال
- ✅ Dark Mode Toggle
- ✅ Reset Button

---

### ۴. ColorPickerComponent
**فایل**: `projects/jalali-date-picker/src/lib/components/color-picker/color-picker.component.ts`

#### Inputs مورد نیاز:
```typescript
@Input() color: string = '#3b82f6';
@Input() presets: string[] = [];
@Input() allowCustom: boolean = true;
@Input() showPreview: boolean = true;
```

#### Outputs مورد نیاز:
```typescript
@Output() colorSelected = new EventEmitter<string>();
@Output() colorChanged = new EventEmitter<string>();
```

#### متدهای مورد نیاز:
- `selectColor(color: string)` - انتخاب رنگ
- `selectPreset(index: number)` - انتخاب رنگ از پالت
- `applyPalette(palette: ColorPalette)` - اعمال پالت رنگی

#### ویژگی‌های مورد نیاز:
- ✅ Color Picker Input
- ✅ Preset Colors
- ✅ Color Preview
- ✅ Hex/RGB Support

---

### ۵. DayInfoModalComponent
**فایل**: `projects/jalali-date-picker/src/lib/components/day-info-modal/day-info-modal.component.ts`

#### Inputs مورد نیاز:
```typescript
@Input() dayInfo: DayInfo;
@Input() locale: string = 'fa';
@Input() theme: string = 'light';
@Input() showNotes: boolean = true;
```

#### Outputs مورد نیاز:
```typescript
@Output() close = new EventEmitter<void>();
@Output() noteSaved = new EventEmitter<string>();
```

#### متدهای مورد نیاز:
- `open(dayInfo: DayInfo)` - باز کردن مودال
- `close()` - بستن مودال
- `saveNote(note: string)` - ذخیره یادداشت
- `deleteNote()` - حذف یادداشت

#### اطلاعات نمایش‌داده‌شده:
- ✅ تاریخ کامل (جلالی/میلادی/قمری)
- ✅ نام روز هفته
- ✅ شماره هفته و روز سال
- ✅ وضعیت تعطیلی
- ✅ مناسبت‌ها و رویدادها
- ✅ فصل و آب‌وهوا
- ✅ فاز ماه
- ✅ یادداشت‌های شخصی

#### ویژگی‌های مورد نیاز:
- ✅ انیمیشن‌های ورود/خروج
- ✅ Responsive Design
- ✅ Keyboard Navigation (Escape برای بستن)
- ✅ Accessibility

---

## 🛠️ کارهای تفصیلی

### کار ۱: بهبود JalaliDatePickerComponent
**مدت زمان**: ۱ ساعت

```typescript
// اضافه کردن Inputs
@Input() disabled: boolean = false;
@Input() placeholder: string = 'تاریخ را انتخاب کنید';
@Input() format: string = 'YYYY/MM/DD';
@Input() locale: string = 'fa';

// اضافه کردن Outputs
@Output() blur = new EventEmitter<void>();
@Output() focus = new EventEmitter<void>();

// اضافه کردن متدها
onFocus(): void {
  this.focus.emit();
}

onBlur(): void {
  this.blur.emit();
}

// اضافه کردن Keyboard Navigation
@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.close();
  }
}
```

### کار ۲: بهبود JalaliCalendarComponent
**مدت زمان**: ۱.۵ ساعت

```typescript
// اضافه کردن نماهای مختلف
enum CalendarView {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  DECADE = 'decade'
}

currentView: CalendarView = CalendarView.DAY;

// اضافه کردن متدهای تغییر نما
switchToMonthView(): void {
  this.currentView = CalendarView.MONTH;
}

switchToYearView(): void {
  this.currentView = CalendarView.YEAR;
}

switchToDayView(): void {
  this.currentView = CalendarView.DAY;
}

// اضافه کردن Keyboard Navigation
@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowLeft':
      this.previousMonth();
      break;
    case 'ArrowRight':
      this.nextMonth();
      break;
    case 'ArrowUp':
      this.previousYear();
      break;
    case 'ArrowDown':
      this.nextYear();
      break;
  }
}
```

### کار ۳: بهبود ThemeSelectorComponent
**مدت زمان**: ۱ ساعت

```typescript
// اضافه کردن پیش‌نمایش زنده
previewTheme(themeName: string): void {
  this.themeService.setTheme(themeName);
}

// اضافه کردن Dark Mode Toggle
toggleDarkMode(): void {
  this.themeService.toggleDarkMode();
}

// اضافه کردن Reset
resetTheme(): void {
  this.themeService.resetTheme();
}
```

### کار ۴: بهبود ColorPickerComponent
**مدت زمان**: ۴۵ دقیقه

```typescript
// اضافه کردن انتخاب رنگ
selectColor(color: string): void {
  this.colorSelected.emit(color);
}

// اضافه کردن انتخاب پالت
selectPreset(index: number): void {
  if (this.presets[index]) {
    this.selectColor(this.presets[index]);
  }
}

// اضافه کردن اعمال پالت
applyPalette(palette: ColorPalette): void {
  this.themeService.setPalette(palette);
}
```

### کار ۵: بهبود DayInfoModalComponent
**مدت زمان**: ۱.۵ ساعت

```typescript
// اضافه کردن متدهای مودال
open(dayInfo: DayInfo): void {
  this.dayInfo = dayInfo;
  this.isOpen = true;
}

close(): void {
  this.isOpen = false;
  this.close.emit();
}

// اضافه کردن مدیریت یادداشت
saveNote(note: string): void {
  this.noteSaved.emit(note);
}

deleteNote(): void {
  this.dayInfo.notes = '';
}

// اضافه کردن Keyboard Navigation
@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.close();
  }
}
```

---

## 📊 چک‌لیست فاز ۳

### JalaliDatePickerComponent
- [ ] اضافه کردن `@Input() disabled`
- [ ] اضافه کردن `@Input() placeholder`
- [ ] اضافه کردن `@Input() format`
- [ ] اضافه کردن `@Input() locale`
- [ ] اضافه کردن `@Output() blur`
- [ ] اضافه کردن `@Output() focus`
- [ ] اضافه کردن Keyboard Navigation
- [ ] بهبود Responsive Design
- [ ] اضافه کردن ARIA labels
- [ ] تست کامپوننت

### JalaliCalendarComponent
- [ ] اضافه کردن نمای ماه (Month View)
- [ ] اضافه کردن نمای سال (Year View)
- [ ] اضافه کردن نمای دهه (Decade View)
- [ ] اضافه کردن انیمیشن‌های انتقال
- [ ] اضافه کردن Keyboard Navigation
- [ ] بهبود Responsive Design
- [ ] اضافه کردن ARIA labels
- [ ] تست کامپوننت

### ThemeSelectorComponent
- [ ] اضافه کردن پیش‌نمایش زنده
- [ ] اضافه کردن انیمیشن انتقال
- [ ] اضافه کردن متد `toggleDarkMode()`
- [ ] اضافه کردن متد `resetTheme()`
- [ ] بهبود Responsive Design
- [ ] تست کامپوننت

### ColorPickerComponent
- [ ] اضافه کردن پالت‌های پیشفرض
- [ ] اضافه کردن پیش‌نمایش رنگ‌ها
- [ ] اضافه کردن متد `applyPalette()`
- [ ] بهبود Responsive Design
- [ ] تست کامپوننت

### DayInfoModalComponent
- [ ] اضافه کردن انیمیشن‌های ورود/خروج
- [ ] اضافه کردن اطلاعات فصل
- [ ] اضافه کردن اطلاعات فاز ماه
- [ ] اضافه کردن یادداشت‌های شخصی
- [ ] اضافه کردن Keyboard Navigation
- [ ] بهبود Responsive Design
- [ ] تست کامپوننت

### Build Test
- [ ] اجرای `ng build jalali-date-picker`
- [ ] بررسی خطاهای TypeScript
- [ ] بررسی خطاهای Runtime
- [ ] تأیید موفقیت build

---

## 🎯 نتایج مورد انتظار

### ✅ موفقیت‌ها
1. ✅ ۵ کامپوننت بهبود یافته
2. ✅ Keyboard Navigation کامل
3. ✅ Responsive Design کامل
4. ✅ ARIA labels کامل
5. ✅ Build بدون خطا

### 📈 درصد تکمیل
- فاز ۱: 100% ✅
- فاز ۲: 100% ✅
- فاز ۳: 100% ✅ (هدف)
- کل پروژه: 60% (هدف)

---

## 📝 نکات مهم

### ✅ باید انجام شود
1. هر کامپوننت باید کاملاً بهبود یابد
2. Keyboard Navigation باید کامل باشد
3. Responsive Design باید کامل باشد
4. Build باید بدون خطا باشد

### ⚠️ احتیاطی
1. از ChangeDetectionStrategy.OnPush استفاده کنید
2. از RxJS Observables استفاده کنید
3. از TypeScript strict mode استفاده کنید
4. ARIA labels را فراموش نکنید

### 🚀 بهینه‌سازی
1. Lazy Loading برای کامپوننت‌های سنگین
2. Virtual Scrolling برای لیست‌های طولانی
3. Debouncing برای رخداداری
4. Memoization برای محاسبات

---

## 📞 تماس

- GitHub Issues: [GitHub Repository](https://github.com/)
- Email: support@example.com

---

*آخرین به‌روزرسانی: 1403/11/30*
*فاز ۳ برای شروع آماده است*
*مدت زمان برآورد شده: ۳-۴ روز*
*درصد تکمیل هدف: 60%*
