# شروع سریع فاز ۳

## ⏱️ ۵ دقیقه برای شروع

### ۱. فایل‌های مورد نیاز (۱ دقیقه)

```
projects/jalali-date-picker/src/lib/components/
├── date-picker/jalali-date-picker.component.ts ✅
├── calendar/jalali-calendar.component.ts ✅
├── theme-selector/theme-selector.component.ts ✅
├── color-picker/color-picker.component.ts ✅
└── day-info-modal/day-info-modal.component.ts ✅
```

### ۲. کارهای اولویت‌دار (۲ دقیقه)

**اولویت ۱** (۱ ساعت):
- [ ] JalaliDatePickerComponent - Inputs/Outputs
- [ ] JalaliCalendarComponent - نماهای مختلف

**اولویت ۲** (۱ ساعت):
- [ ] ThemeSelectorComponent - پیش‌نمایش
- [ ] ColorPickerComponent - انتخاب رنگ

**اولویت ۳** (۱.۵ ساعت):
- [ ] DayInfoModalComponent - اطلاعات روز
- [ ] Keyboard Navigation - تمام کامپوننت‌ها

### ۳. Build و تست (۲ دقیقه)

```bash
# Build
ng build jalali-date-picker

# نتیجه مورد انتظار
# ✅ بدون خطا
# ✅ فایل‌های dist تولید شده
```

---

## 🎯 کارهای فوری

### کار ۱: JalaliDatePickerComponent (۱ ساعت)

**فایل**: `projects/jalali-date-picker/src/lib/components/date-picker/jalali-date-picker.component.ts`

**اضافه کنید**:
```typescript
// Inputs
@Input() disabled: boolean = false;
@Input() placeholder: string = 'تاریخ را انتخاب کنید';
@Input() format: string = 'YYYY/MM/DD';
@Input() locale: string = 'fa';

// Outputs
@Output() blur = new EventEmitter<void>();
@Output() focus = new EventEmitter<void>();

// متدها
onFocus(): void {
  this.focus.emit();
}

onBlur(): void {
  this.blur.emit();
}

// Keyboard Navigation
@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.close();
  }
}
```

---

### کار ۲: JalaliCalendarComponent (۱.۵ ساعت)

**فایل**: `projects/jalali-date-picker/src/lib/components/calendar/jalali-calendar.component.ts`

**اضافه کنید**:
```typescript
// نماهای مختلف
enum CalendarView {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  DECADE = 'decade'
}

currentView: CalendarView = CalendarView.DAY;

// متدهای تغییر نما
switchToMonthView(): void {
  this.currentView = CalendarView.MONTH;
}

switchToYearView(): void {
  this.currentView = CalendarView.YEAR;
}

switchToDayView(): void {
  this.currentView = CalendarView.DAY;
}

// Keyboard Navigation
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

---

### کار ۳: ThemeSelectorComponent (۱ ساعت)

**فایل**: `projects/jalali-date-picker/src/lib/components/theme-selector/theme-selector.component.ts`

**اضافه کنید**:
```typescript
// متدهای جدید
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

---

### کار ۴: ColorPickerComponent (۴۵ دقیقه)

**فایل**: `projects/jalali-date-picker/src/lib/components/color-picker/color-picker.component.ts`

**اضافه کنید**:
```typescript
// متدهای جدید
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

---

### کار ۵: DayInfoModalComponent (۱.۵ ساعت)

**فایل**: `projects/jalali-date-picker/src/lib/components/day-info-modal/day-info-modal.component.ts`

**اضافه کنید**:
```typescript
// متدهای مودال
open(dayInfo: DayInfo): void {
  this.dayInfo = dayInfo;
  this.isOpen = true;
}

close(): void {
  this.isOpen = false;
  this.close.emit();
}

// مدیریت یادداشت
saveNote(note: string): void {
  this.noteSaved.emit(note);
}

deleteNote(): void {
  this.dayInfo.notes = '';
}

// Keyboard Navigation
@HostListener('keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.close();
  }
}
```

---

## ✅ چک‌لیست فاز ۳

### روز ۱ (۳-۴ ساعت)
- [ ] JalaliDatePickerComponent - Inputs/Outputs
- [ ] JalaliCalendarComponent - نماهای مختلف
- [ ] Build موفق

### روز ۲ (۲-۳ ساعت)
- [ ] ThemeSelectorComponent - پیش‌نمایش
- [ ] ColorPickerComponent - انتخاب رنگ
- [ ] Build موفق

### روز ۳ (۲-۳ ساعت)
- [ ] DayInfoModalComponent - اطلاعات روز
- [ ] Keyboard Navigation - تمام کامپوننت‌ها
- [ ] Build موفق

### روز ۴ (۱-۲ ساعت)
- [ ] Responsive Design - تمام کامپوننت‌ها
- [ ] ARIA labels - تمام کامپوننت‌ها
- [ ] Build موفق

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

## 🚀 بعدی

**فاز ۴**: قابلیت‌های انتخاب تاریخ (۳-۴ روز)
- انتخاب بازه تاریخ
- انتخاب چند تاریخ
- انتخاب هفته و ماه

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

### 🎯 هدف
- ✅ ۵ کامپوننت بهبود یافته
- ✅ Build موفق
- ✅ درصد تکمیل: 60%

---

*آخرین به‌روزرسانی: 1403/11/30*
*فاز ۳ برای شروع آماده است*
*مدت زمان برآورد شده: ۳-۴ روز*
