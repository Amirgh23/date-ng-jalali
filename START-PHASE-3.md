# شروع فاز ۳ - تکمیل کامپوننت‌های اصلی

## 🎯 خلاصه فاز ۳

**فاز ۳** شامل بهبود و تکمیل ۵ کامپوننت اصلی تقویم جلالی است.

### 📊 اطلاعات
- **مدت زمان**: ۳-۴ روز
- **کامپوننت‌های مورد نیاز**: ۵ کامپوننت
- **درصد تکمیل هدف**: 60%
- **اولویت**: 🔴 بالا

---

## 📁 کامپوننت‌های مورد نیاز

### ۱. JalaliDatePickerComponent (۱ ساعت)
**فایل**: `projects/jalali-date-picker/src/lib/components/date-picker/jalali-date-picker.component.ts`

**Inputs**:
- `disabled: boolean` - غیرفعال کردن
- `placeholder: string` - متن راهنما
- `format: string` - فرمت تاریخ
- `locale: string` - زبان

**Outputs**:
- `blur` - از دست دادن فوکوس
- `focus` - دریافت فوکوس

**ویژگی‌ها**:
- ✅ Keyboard Navigation (Escape برای بستن)
- ✅ Responsive Design
- ✅ ARIA labels

---

### ۲. JalaliCalendarComponent (۱.۵ ساعت)
**فایل**: `projects/jalali-date-picker/src/lib/components/calendar/jalali-calendar.component.ts`

**نماهای مورد نیاز**:
- ✅ Day View (نمای روز)
- ✅ Month View (نمای ماه)
- ✅ Year View (نمای سال)
- ✅ Decade View (نمای دهه)

**متدها**:
- `switchToMonthView()` - نمای ماه
- `switchToYearView()` - نمای سال
- `switchToDayView()` - نمای روز

**ویژگی‌ها**:
- ✅ Keyboard Navigation (Arrow Keys)
- ✅ Responsive Design
- ✅ ARIA labels

---

### ۳. ThemeSelectorComponent (۱ ساعت)
**فایل**: `projects/jalali-date-picker/src/lib/components/theme-selector/theme-selector.component.ts`

**متدها**:
- `previewTheme(themeName)` - پیش‌نمایش تم
- `toggleDarkMode()` - تبدیل Dark Mode
- `resetTheme()` - بازنشانی تم

**ویژگی‌ها**:
- ✅ پیش‌نمایش زنده
- ✅ Dark Mode Toggle
- ✅ Reset Button

---

### ۴. ColorPickerComponent (۴۵ دقیقه)
**فایل**: `projects/jalali-date-picker/src/lib/components/color-picker/color-picker.component.ts`

**متدها**:
- `selectColor(color)` - انتخاب رنگ
- `selectPreset(index)` - انتخاب از پالت
- `applyPalette(palette)` - اعمال پالت

**ویژگی‌ها**:
- ✅ Color Picker Input
- ✅ Preset Colors
- ✅ Color Preview

---

### ۵. DayInfoModalComponent (۱.۵ ساعت)
**فایل**: `projects/jalali-date-picker/src/lib/components/day-info-modal/day-info-modal.component.ts`

**متدها**:
- `open(dayInfo)` - باز کردن
- `close()` - بستن
- `saveNote(note)` - ذخیره یادداشت
- `deleteNote()` - حذف یادداشت

**اطلاعات نمایش‌داده‌شده**:
- ✅ تاریخ کامل (جلالی/میلادی/قمری)
- ✅ نام روز هفته
- ✅ شماره هفته و روز سال
- ✅ وضعیت تعطیلی
- ✅ مناسبت‌ها و رویدادها
- ✅ فصل و آب‌وهوا
- ✅ فاز ماه
- ✅ یادداشت‌های شخصی

---

## 📅 برنامه زمانی

### روز ۱ (۳-۴ ساعت)
```
JalaliDatePickerComponent (۱ ساعت)
├── Inputs: disabled, placeholder, format, locale
├── Outputs: blur, focus
├── Keyboard Navigation
└── Build موفق

JalaliCalendarComponent (۱.۵ ساعت)
├── نماهای مختلف
├── متدهای تغییر نما
├── Keyboard Navigation
└── Build موفق
```

### روز ۲ (۲-۳ ساعت)
```
ThemeSelectorComponent (۱ ساعت)
├── پیش‌نمایش زنده
├── Dark Mode Toggle
├── Reset Button
└── Build موفق

ColorPickerComponent (۴۵ دقیقه)
├── انتخاب رنگ
├── Preset Colors
├── Color Preview
└── Build موفق
```

### روز ۳ (۲-۳ ساعت)
```
DayInfoModalComponent (۱.۵ ساعت)
├── اطلاعات روز کامل
├── مدیریت یادداشت‌ها
├── Keyboard Navigation
└── Build موفق
```

### روز ۴ (۱-۲ ساعت)
```
تکمیل و بهبود
├── Responsive Design - تمام کامپوننت‌ها
├── ARIA labels - تمام کامپوننت‌ها
└── Build نهایی موفق
```

---

## 🛠️ کد نمونه

### JalaliDatePickerComponent
```typescript
@Input() disabled: boolean = false;
@Input() placeholder: string = 'تاریخ را انتخاب کنید';
@Input() format: string = 'YYYY/MM/DD';
@Input() locale: string = 'fa';

@Output() blur = new EventEmitter<void>();
@Output() focus = new EventEmitter<void>();

onFocus(): void {
  this.focus.emit();
}

onBlur(): void {
  this.blur.emit();
}

@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.close();
  }
}
```

### JalaliCalendarComponent
```typescript
enum CalendarView {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  DECADE = 'decade'
}

currentView: CalendarView = CalendarView.DAY;

switchToMonthView(): void {
  this.currentView = CalendarView.MONTH;
}

switchToYearView(): void {
  this.currentView = CalendarView.YEAR;
}

switchToDayView(): void {
  this.currentView = CalendarView.DAY;
}

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

### ThemeSelectorComponent
```typescript
previewTheme(themeName: string): void {
  this.themeService.setTheme(themeName);
}

toggleDarkMode(): void {
  this.themeService.toggleDarkMode();
}

resetTheme(): void {
  this.themeService.resetTheme();
}
```

### ColorPickerComponent
```typescript
selectColor(color: string): void {
  this.colorSelected.emit(color);
}

selectPreset(index: number): void {
  if (this.presets[index]) {
    this.selectColor(this.presets[index]);
  }
}

applyPalette(palette: ColorPalette): void {
  this.themeService.setPalette(palette);
}
```

### DayInfoModalComponent
```typescript
open(dayInfo: DayInfo): void {
  this.dayInfo = dayInfo;
  this.isOpen = true;
}

close(): void {
  this.isOpen = false;
  this.close.emit();
}

saveNote(note: string): void {
  this.noteSaved.emit(note);
}

deleteNote(): void {
  this.dayInfo.notes = '';
}

@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.close();
  }
}
```

---

## ✅ چک‌لیست

### روز ۱
- [ ] JalaliDatePickerComponent - Inputs/Outputs
- [ ] JalaliCalendarComponent - نماهای مختلف
- [ ] Build موفق

### روز ۲
- [ ] ThemeSelectorComponent - پیش‌نمایش
- [ ] ColorPickerComponent - انتخاب رنگ
- [ ] Build موفق

### روز ۳
- [ ] DayInfoModalComponent - اطلاعات روز
- [ ] Keyboard Navigation - تمام کامپوننت‌ها
- [ ] Build موفق

### روز ۴
- [ ] Responsive Design - تمام کامپوننت‌ها
- [ ] ARIA labels - تمام کامپوننت‌ها
- [ ] Build نهایی موفق

---

## 📊 درصد تکمیل

| کامپوننت | وضعیت | درصد |
|---------|-------|------|
| JalaliDatePickerComponent | 🔴 | 0% |
| JalaliCalendarComponent | 🔴 | 0% |
| ThemeSelectorComponent | 🔴 | 0% |
| ColorPickerComponent | 🔴 | 0% |
| DayInfoModalComponent | 🔴 | 0% |
| **کل فاز ۳** | **🔴** | **0%** |

---

## 🎯 هدف

- ✅ ۵ کامپوننت بهبود یافته
- ✅ Build موفق
- ✅ درصد تکمیل: 60%

---

## 📝 نکات مهم

### ✅ باید انجام شود
1. هر کامپوننت باید کاملاً بهبود یابد
2. Keyboard Navigation باید کامل باشد
3. Build باید بدون خطا باشد

### ⚠️ احتیاطی
1. از ChangeDetectionStrategy.OnPush استفاده کنید
2. از RxJS Observables استفاده کنید
3. ARIA labels را فراموش نکنید

---

## 🚀 بعدی

**فاز ۴**: قابلیت‌های انتخاب تاریخ (۳-۴ روز)

---

*آخرین به‌روزرسانی: 1403/11/30*
*فاز ۳ برای شروع آماده است*
*مدت زمان برآورد شده: ۳-۴ روز*
