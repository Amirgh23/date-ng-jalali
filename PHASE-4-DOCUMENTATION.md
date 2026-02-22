# فاز ۴ - مستندات

## 📚 API Documentation

### JalaliCalendarComponent - Validation Methods

#### `isDateValid(date: Date): boolean`
بررسی می‌کند که آیا تاریخ معتبر است یا نه.

**پارامترها:**
- `date: Date` - تاریخ برای بررسی

**بازگشت:**
- `boolean` - true اگر تاریخ معتبر باشد

**مثال:**
```typescript
const date = new Date(2024, 0, 15);
if (component.isDateValid(date)) {
  console.log('تاریخ معتبر است');
}
```

---

#### `isDateDisabled(date: Date): boolean`
بررسی می‌کند که آیا تاریخ غیرفعال است یا نه.

**پارامترها:**
- `date: Date` - تاریخ برای بررسی

**بازگشت:**
- `boolean` - true اگر تاریخ غیرفعال باشد

**مثال:**
```typescript
component.disabledDates = [new Date(2024, 0, 1)];
if (component.isDateDisabled(new Date(2024, 0, 1))) {
  console.log('تاریخ غیرفعال است');
}
```

---

#### `isDateInRange(date: Date): boolean`
بررسی می‌کند که آیا تاریخ در بازه min/max است یا نه.

**پارامترها:**
- `date: Date` - تاریخ برای بررسی

**بازگشت:**
- `boolean` - true اگر تاریخ در بازه باشد

**مثال:**
```typescript
component.minDate = new Date(2024, 0, 10);
component.maxDate = new Date(2024, 0, 20);
if (component.isDateInRange(new Date(2024, 0, 15))) {
  console.log('تاریخ در بازه است');
}
```

---

#### `validateDateRange(start: Date, end: Date): boolean`
بررسی می‌کند که آیا بازه تاریخ معتبر است یا نه.

**پارامترها:**
- `start: Date` - تاریخ شروع
- `end: Date` - تاریخ پایان

**بازگشت:**
- `boolean` - true اگر بازه معتبر باشد

**مثال:**
```typescript
const start = new Date(2024, 0, 10);
const end = new Date(2024, 0, 20);
if (component.validateDateRange(start, end)) {
  console.log('بازه معتبر است');
}
```

---

### JalaliCalendarComponent - Range Selection Methods

#### `selectDateRange(startDate: Date, endDate: Date): void`
انتخاب بازه تاریخ.

**پارامترها:**
- `startDate: Date` - تاریخ شروع
- `endDate: Date` - تاریخ پایان

**رویدادها:**
- `rangeSelect` - emit می‌شود با `{ start, end }`

**مثال:**
```typescript
const start = new Date(2024, 0, 10);
const end = new Date(2024, 0, 20);
component.selectDateRange(start, end);
```

---

#### `clearRange(): void`
پاک کردن بازه انتخاب‌شده.

**مثال:**
```typescript
component.clearRange();
```

---

#### `isInRange(date: Date): boolean`
بررسی می‌کند که آیا تاریخ در بازه انتخاب‌شده است یا نه.

**پارامترها:**
- `date: Date` - تاریخ برای بررسی

**بازگشت:**
- `boolean` - true اگر تاریخ در بازه باشد

**مثال:**
```typescript
if (component.isInRange(new Date(2024, 0, 15))) {
  console.log('تاریخ در بازه است');
}
```

---

#### `isRangeStart(date: Date): boolean`
بررسی می‌کند که آیا تاریخ شروع بازه است یا نه.

**پارامترها:**
- `date: Date` - تاریخ برای بررسی

**بازگشت:**
- `boolean` - true اگر تاریخ شروع بازه باشد

---

#### `isRangeEnd(date: Date): boolean`
بررسی می‌کند که آیا تاریخ پایان بازه است یا نه.

**پارامترها:**
- `date: Date` - تاریخ برای بررسی

**بازگشت:**
- `boolean` - true اگر تاریخ پایان بازه باشد

---

### JalaliCalendarComponent - Multiple Selection Methods

#### `toggleDateSelection(date: Date): void`
تبدیل انتخاب تاریخ (انتخاب یا لغو انتخاب).

**پارامترها:**
- `date: Date` - تاریخ برای تبدیل انتخاب

**رویدادها:**
- `multipleSelect` - emit می‌شود با آرایه تاریخ‌های انتخاب‌شده

**مثال:**
```typescript
component.toggleDateSelection(new Date(2024, 0, 15));
```

---

#### `clearMultipleSelection(): void`
پاک کردن تمام انتخاب‌های چند تاریخ.

**مثال:**
```typescript
component.clearMultipleSelection();
```

---

#### `isDateSelected(date: Date): boolean`
بررسی می‌کند که آیا تاریخ انتخاب‌شده است یا نه.

**پارامترها:**
- `date: Date` - تاریخ برای بررسی

**بازگشت:**
- `boolean` - true اگر تاریخ انتخاب‌شده باشد

**مثال:**
```typescript
if (component.isDateSelected(new Date(2024, 0, 15))) {
  console.log('تاریخ انتخاب‌شده است');
}
```

---

#### `getSelectedDates(): Date[]`
دریافت آرایه تاریخ‌های انتخاب‌شده.

**بازگشت:**
- `Date[]` - آرایه تاریخ‌های انتخاب‌شده

**مثال:**
```typescript
const selectedDates = component.getSelectedDates();
console.log(selectedDates);
```

---

## 📖 مثال‌های استفاده

### مثال ۱: Range Selection
```typescript
// Template
<jalali-calendar
  [selectionMode]="'range'"
  [selectedRange]="selectedRange"
  (rangeSelect)="onRangeSelect($event)">
</jalali-calendar>

// Component
onRangeSelect(range: DateRange) {
  console.log('بازه انتخاب‌شده:', range.start, 'تا', range.end);
}
```

---

### مثال ۲: Multiple Selection
```typescript
// Template
<jalali-calendar
  [selectionMode]="'multiple'"
  [selectedDates]="selectedDates"
  (multipleSelect)="onMultipleSelect($event)">
</jalali-calendar>

// Component
onMultipleSelect(dates: Date[]) {
  console.log('تاریخ‌های انتخاب‌شده:', dates);
}
```

---

### مثال ۳: Validation
```typescript
// Component
const date = new Date(2024, 0, 15);

// بررسی معتبر بودن
if (this.calendar.isDateValid(date)) {
  console.log('تاریخ معتبر است');
}

// بررسی غیرفعال بودن
if (this.calendar.isDateDisabled(date)) {
  console.log('تاریخ غیرفعال است');
}

// بررسی در بازه
if (this.calendar.isDateInRange(date)) {
  console.log('تاریخ در بازه است');
}
```

---

### مثال ۴: Min/Max Date
```typescript
// Template
<jalali-calendar
  [minDate]="minDate"
  [maxDate]="maxDate"
  [disabledDates]="disabledDates">
</jalali-calendar>

// Component
minDate = new Date(2024, 0, 1);
maxDate = new Date(2024, 11, 31);
disabledDates = [
  new Date(2024, 0, 1),  // تعطیل
  new Date(2024, 0, 2)   // تعطیل
];
```

---

## 🎯 Best Practices

### ✅ استفاده صحیح
```typescript
// ✅ صحیح: بررسی قبل از انتخاب
if (this.calendar.isDateValid(date)) {
  this.calendar.selectDateRange(start, end);
}

// ✅ صحیح: استفاده از getSelectedDates()
const dates = this.calendar.getSelectedDates();
console.log(dates);

// ✅ صحیح: پاک کردن انتخاب
this.calendar.clearMultipleSelection();
```

### ❌ استفاده نادرست
```typescript
// ❌ نادرست: بدون بررسی
this.calendar.selectDateRange(start, end);

// ❌ نادرست: تغییر مستقیم selectedDates
this.calendar.selectedDates.push(date);

// ❌ نادرست: استفاده از selectedDates بدون getSelectedDates()
const dates = this.calendar.selectedDates;
```

---

## 📝 نکات مهم

### ✅ نکات مثبت
1. تمام متدها type-safe هستند
2. تمام متدها immutable هستند
3. تمام متدها event emit می‌کنند
4. تمام متدها validation دارند

### ⚠️ احتیاطی
1. همیشه بررسی کنید که تاریخ معتبر است
2. از getSelectedDates() استفاده کنید نه selectedDates
3. clearRange() و clearMultipleSelection() را به درستی استفاده کنید

---

*آخرین به‌روزرسانی: 1403/12/02*
*مستندات کامل فاز ۴*
