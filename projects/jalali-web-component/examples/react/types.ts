/**
 * TypeScript types for React integration with Jalali Date Picker Web Component
 */

/**
 * Represents a date in multiple calendar systems
 */
export interface DateValue {
  date: Date | null;
  jalaliDate: string;
  gregorianDate: string;
  hijriDate: string;
}

/**
 * Represents a date range
 */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Event detail for dateSelect event
 */
export interface DateSelectDetail {
  date: Date;
  jalaliDate: string;
  gregorianDate: string;
  hijriDate: string;
}

/**
 * Event detail for rangeSelect event
 */
export interface RangeSelectDetail {
  range: DateRange;
}

/**
 * Event detail for multipleSelect event
 */
export interface MultipleSelectDetail {
  dates: Date[];
}

/**
 * Event detail for localeChange event
 */
export interface LocaleChangeDetail {
  locale: 'fa' | 'en';
}

/**
 * Event detail for themeChange event
 */
export interface ThemeChangeDetail {
  theme: string;
}

/**
 * Props for JalaliDatePickerReact component
 */
export interface JalaliDatePickerReactProps {
  /**
   * Selected date (controlled component)
   */
  selectedDate?: Date | null;

  /**
   * Callback when date is selected
   */
  onDateSelect?: (detail: DateSelectDetail) => void;

  /**
   * Selected date range (controlled component)
   */
  selectedRange?: DateRange;

  /**
   * Callback when date range is selected
   */
  onRangeSelect?: (detail: RangeSelectDetail) => void;

  /**
   * Selected dates (controlled component)
   */
  selectedDates?: Date[];

  /**
   * Callback when multiple dates are selected
   */
  onMultipleSelect?: (detail: MultipleSelectDetail) => void;

  /**
   * Calendar type: jalali, gregorian, or hijri
   */
  calendarType?: 'jalali' | 'gregorian' | 'hijri';

  /**
   * Locale: fa or en
   */
  locale?: 'fa' | 'en';

  /**
   * Theme name
   */
  theme?: string;

  /**
   * Selection mode: single, range, or multiple
   */
  selectionMode?: 'single' | 'range' | 'multiple';

  /**
   * Whether the picker is disabled
   */
  disabled?: boolean;

  /**
   * Callback when locale changes
   */
  onLocaleChange?: (detail: LocaleChangeDetail) => void;

  /**
   * Callback when theme changes
   */
  onThemeChange?: (detail: ThemeChangeDetail) => void;

  /**
   * Callback when an error occurs
   */
  onError?: (error: Error) => void;

  /**
   * CSS class name
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;

  /**
   * Ref to the web component element
   */
  ref?: React.Ref<HTMLElement>;

  /**
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * Custom event from web component
 */
export interface JalaliDatePickerEvent<T = any> extends CustomEvent<T> {
  detail: T;
}
