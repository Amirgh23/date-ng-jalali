# Jalali Web Component

A Vanilla TypeScript implementation of the Jalali Date Picker Web Component, providing date conversion and manipulation for Jalali, Gregorian, and Hijri calendars without any framework dependencies.

## Features

- **Framework-Independent**: Pure Vanilla TypeScript, no Angular or other framework dependencies
- **Multiple Calendar Systems**: Support for Jalali, Gregorian, and Hijri calendars
- **Bidirectional Conversions**: Accurate date conversions between all calendar systems
- **Internal Caching**: Built-in caching for performance optimization
- **Comprehensive API**: Full date manipulation and formatting capabilities
- **Locale Support**: Multi-language support (Persian and English)
- **Type-Safe**: Full TypeScript support with complete type definitions

## Installation

```bash
npm install @jalali-web-component/core
```

## Usage

### Basic Date Conversion

```typescript
import { JalaliDateService } from '@jalali-web-component/core';

// Create service instance
const dateService = new JalaliDateService('fa'); // 'fa' for Persian, 'en' for English

// Convert Gregorian to Jalali
const gregorianDate = new Date(2024, 0, 15);
const jalaliDate = dateService.gregorianToJalali(gregorianDate);
console.log(jalaliDate);
// Output: { year: 1402, month: 10, day: 25, monthName: 'دی', dayName: 'دوشنبه', formatted: '25 دی 1402' }

// Convert Jalali to Gregorian
const gregorianDate2 = dateService.jalaliToGregorianDate(1402, 10, 25);
console.log(gregorianDate2); // Date object

// Convert Gregorian to Hijri
const hijriDate = dateService.gregorianToHijri(gregorianDate);
console.log(hijriDate);
// Output: { year: 1445, month: 7, day: 15, monthName: 'محرم', dayName: 'دوشنبه', formatted: '15 محرم 1445 هجری قمری' }
```

### Date Comparison

```typescript
const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 0, 20);

dateService.isBefore(date1, date2); // true
dateService.isAfter(date2, date1); // true
dateService.isSameDay(date1, date1); // true
dateService.compareDates(date1, date2); // negative number
```

### Date Arithmetic

```typescript
const date = new Date(2024, 0, 15);

dateService.addDays(date, 5); // Add 5 days
dateService.addMonths(date, 3); // Add 3 months
dateService.addYears(date, 2); // Add 2 years
```

### Month and Calendar Information

```typescript
// Get days in month
dateService.getDaysInJalaliMonth(1402, 1); // 31
dateService.getDaysInGregorianMonth(2024, 2); // 29 (leap year)

// Get first day of month (0 = Saturday)
dateService.getFirstDayOfJalaliMonth(1402, 1); // 0-6

// Check leap year
dateService.isLeapYear(1399, 'jalali'); // true
dateService.isLeapYear(2024, 'gregorian'); // true

// Get month names
dateService.getJalaliMonthName(1); // 'فروردین'
dateService.getGregorianMonthName(1); // 'ژانویه'
```

### Holiday and Event Information

```typescript
// Check if date is holiday
dateService.isHoliday({ year: 1402, month: 1, day: 1 }); // true (Nowruz)

// Get events for date
dateService.getEvents({ year: 1402, month: 1, day: 1 }); // ['نوروز']

// Get complete day information
const dayInfo = dateService.getDayInfo(new Date(2024, 0, 15));
console.log(dayInfo);
// Output: {
//   jalali: { ... },
//   gregorian: { ... },
//   hijri: { ... },
//   isHoliday: false,
//   events: [],
//   season: 'زمستان',
//   weekNumber: 3
// }
```

### Locale Management

```typescript
// Set locale
dateService.setLocale('en');

// Get current locale
const locale = dateService.getLocale(); // 'en'

// Format dates with locale support
const jalaliDate = { year: 1402, month: 10, day: 25 };
dateService.formatJalaliDate(jalaliDate); // 'دی 25, 1402' (Persian) or 'Dey 25, 1402' (English)
```

### Cache Management

```typescript
// Clear cache
dateService.clearCache();
```

## API Reference

### JalaliDateService

#### Constructor
```typescript
constructor(locale: 'fa' | 'en' = 'fa')
```

#### Methods

##### Date Conversion
- `gregorianToJalali(gregorianDate: Date): JalaliDate`
- `jalaliToGregorian(jalaliYear: number, jalaliMonth: number, jalaliDay: number): GregorianDate`
- `jalaliToGregorianDate(jalaliYear: number, jalaliMonth: number, jalaliDay: number): Date`
- `gregorianToHijri(gregorianDate: Date): HijriDate`
- `hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date`

##### Date Comparison
- `compareDates(date1: Date, date2: Date): number`
- `isBefore(date1: Date, date2: Date): boolean`
- `isAfter(date1: Date, date2: Date): boolean`
- `isSameDay(date1: Date, date2: Date): boolean`

##### Date Arithmetic
- `addDays(date: Date, days: number): Date`
- `addMonths(date: Date, months: number): Date`
- `addYears(date: Date, years: number): Date`

##### Calendar Information
- `getDaysInJalaliMonth(year: number, month: number): number`
- `getDaysInGregorianMonth(year: number, month: number): number`
- `getDaysInHijriMonth(year: number, month: number): number`
- `getFirstDayOfJalaliMonth(year: number, month: number): number`
- `getFirstDayOfGregorianMonth(year: number, month: number): number`
- `getFirstDayOfHijriMonth(year: number, month: number): number`
- `isLeapYear(year: number, calendarType: 'jalali' | 'gregorian' | 'hijri'): boolean`

##### Formatting
- `formatDate(date: Date, format: 'short' | 'medium' | 'long'): string`
- `formatJalaliDate(date: { year: number; month: number; day: number }): string`
- `formatGregorianDate(date: Date): string`
- `formatHijriDate(date: { year: number; month: number; day: number }): string`

##### Locale
- `setLocale(locale: 'fa' | 'en'): void`
- `getLocale(): 'fa' | 'en'`
- `getJalaliMonthName(month: number): string`
- `getGregorianMonthName(month: number): string`
- `getHijriMonthName(month: number): string`
- `getJalaliDayName(dayOfWeek: number): string`

##### Holiday and Events
- `isHoliday(jalaliDate: { year: number; month: number; day: number }): boolean`
- `getEvents(jalaliDate: { year: number; month: number; day: number }): string[]`
- `getDayInfo(gregorianDate: Date): DayInfo`

##### Utility
- `today(): Date`
- `getSeason(jalaliMonth: number): string`
- `getWeekNumber(jalaliYear: number, jalaliMonth: number, jalaliDay: number): number`
- `getDayOfWeek(date: Date): number`
- `clearCache(): void`

## Data Models

### JalaliDate
```typescript
interface JalaliDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}
```

### GregorianDate
```typescript
interface GregorianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}
```

### HijriDate
```typescript
interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}
```

### DayInfo
```typescript
interface DayInfo {
  jalali: JalaliDate;
  gregorian: GregorianDate;
  hijri: HijriDate;
  isHoliday: boolean;
  holidayType: 'official' | 'non-official' | null;
  events: string[];
  season: string;
  weekNumber: number;
  notes?: string;
}
```

## Testing

The service includes comprehensive unit tests with 80%+ code coverage:

```bash
npm test
```

### Test Coverage

- Date conversions (Gregorian ↔ Jalali ↔ Hijri)
- Date comparisons and arithmetic
- Leap year detection
- Month and calendar information
- Holiday and event detection
- Locale support
- Caching functionality
- Edge cases and boundary conditions
- Bidirectional conversion consistency

## Performance

- **Internal Caching**: Frequently accessed conversions are cached for optimal performance
- **LRU Cache**: Cache size is limited to 1000 entries with automatic cleanup
- **No External Dependencies**: Pure TypeScript implementation with zero dependencies

## Browser Support

- Chrome/Edge: 67+
- Firefox: 63+
- Safari: 10.1+
- Node.js: 12+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### Version 1.0.0
- Initial release
- Full Jalali, Gregorian, and Hijri calendar support
- Comprehensive date manipulation API
- Multi-language support (Persian and English)
- Internal caching for performance
- 80%+ test coverage
