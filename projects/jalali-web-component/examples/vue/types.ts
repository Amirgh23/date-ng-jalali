/**
 * TypeScript types for Vue integration with Jalali Date Picker Web Component
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
 * Props for JalaliDatePickerVue component
 */
export interface JalaliDatePickerVueProps {
  /**
   * Selected date (v-model support)
   */
  modelValue?: Date | null;

  /**
   * Selected date range (v-model support)
   */
  modelRange?: DateRange;

  /**
   * Selected dates (v-model support)
   */
  modelDates?: Date[];

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
   * CSS class name
   */
  class?: string;

  /**
   * Inline styles
   */
  style?: Record<string, any>;

  /**
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * Emits for JalaliDatePickerVue component
 */
export interface JalaliDatePickerVueEmits {
  /**
   * Emitted when modelValue changes (v-model support)
   */
  'update:modelValue': [value: Date | null];

  /**
   * Emitted when modelRange changes (v-model support)
   */
  'update:modelRange': [value: DateRange];

  /**
   * Emitted when modelDates changes (v-model support)
   */
  'update:modelDates': [value: Date[]];

  /**
   * Emitted when a single date is selected
   */
  dateSelect: [detail: DateSelectDetail];

  /**
   * Emitted when a date range is selected
   */
  rangeSelect: [detail: RangeSelectDetail];

  /**
   * Emitted when multiple dates are selected
   */
  multipleSelect: [detail: MultipleSelectDetail];

  /**
   * Emitted when locale changes
   */
  localeChange: [detail: LocaleChangeDetail];

  /**
   * Emitted when theme changes
   */
  themeChange: [detail: ThemeChangeDetail];

  /**
   * Emitted when an error occurs
   */
  error: [error: Error];
}

/**
 * Custom event from web component
 */
export interface JalaliDatePickerEvent<T = any> extends CustomEvent<T> {
  detail: T;
}
