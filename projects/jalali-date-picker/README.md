# JalaliDatePicker

A comprehensive Angular date picker component supporting Jalali (Persian), Gregorian, and Hijri calendars with 21 beautiful themes and full RTL support.

## Features

- 📅 Three calendar systems: Jalali, Gregorian, Hijri
- 🎨 21 pre-built themes
- 🌍 Bilingual support (Persian & English)
- ♿ Full accessibility (ARIA labels, keyboard navigation)
- ⚡ High performance (OnPush change detection, caching)
- 🎯 Multiple selection modes (single, range, multiple)
- 🔧 Highly customizable

## Installation

```bash
npm install @your-org/jalali-date-picker
```

## Basic Usage

```typescript
import { JalaliDatePickerComponent } from '@your-org/jalali-date-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JalaliDatePickerComponent],
  template: `
    <jalali-date-picker
      [(selectedDate)]="selectedDate"
      [locale]="'fa'"
      (dateSelect)="onDateSelect($event)">
    </jalali-date-picker>
  `
})
export class AppComponent {
  selectedDate = new Date();
  
  onDateSelect(date: Date) {
    console.log('Selected date:', date);
  }
}
```

## Advanced Configuration

### Custom Z-Index

If you need to adjust the z-index of the calendar panel (useful when working with modals or other overlays):

```html
<jalali-date-picker
  [selectedDate]="selectedDate"
  [zIndex]="10000">
</jalali-date-picker>
```

Default z-index is `9999`. You can customize it based on your application's needs.

### Range Selection

```html
<jalali-date-picker
  selectionMode="range"
  [selectedRange]="dateRange"
  (rangeSelect)="onRangeSelect($event)">
</jalali-date-picker>
```

### Multiple Date Selection

```html
<jalali-date-picker
  selectionMode="multiple"
  [selectedDates]="dates"
  (multipleSelect)="onMultipleSelect($event)">
</jalali-date-picker>
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectedDate` | `Date` | `new Date()` | Currently selected date |
| `selectionMode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Date selection mode |
| `selectedRange` | `DateRange` | `null` | Selected date range |
| `selectedDates` | `Date[]` | `[]` | Selected dates (multiple mode) |
| `minDate` | `Date` | `null` | Minimum selectable date |
| `maxDate` | `Date` | `null` | Maximum selectable date |
| `locale` | `'fa' \| 'en' \| 'ar' \| 'ku'` | `'fa'` | Display language |
| `disabled` | `boolean` | `false` | Disable the component |
| `placeholder` | `string` | `''` | Input placeholder text |
| `zIndex` | `number` | `9999` | Z-index for calendar panel |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `dateSelect` | `EventEmitter<Date>` | Emitted when a date is selected |
| `rangeSelect` | `EventEmitter<DateRange>` | Emitted when a range is selected |
| `multipleSelect` | `EventEmitter<Date[]>` | Emitted when multiple dates are selected |
| `localeChange` | `EventEmitter<SupportedLocale>` | Emitted when locale changes |

## Building

To build the library, run:

```bash
ng build jalali-date-picker
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/jalali-date-picker
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## License

MIT

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
