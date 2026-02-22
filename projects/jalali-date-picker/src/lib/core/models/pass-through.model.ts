/**
 * Pass Through System for Jalali Date Picker
 * Inspired by PrimeNG's Pass Through API
 * Allows deep customization of component internals
 */

/**
 * Options for individual element customization
 */
export interface PassThroughElementOptions {
  /**
   * CSS class(es) to add to the element
   * Can be a string, array of strings, or object with boolean values
   */
  class?: string | string[] | { [key: string]: boolean };
  
  /**
   * Inline styles to apply to the element
   */
  style?: { [key: string]: any };
  
  /**
   * HTML attributes to add to the element
   */
  attrs?: { [key: string]: any };
  
  /**
   * Data attributes (will be prefixed with 'data-')
   */
  data?: { [key: string]: any };
}

/**
 * Context passed to Pass Through method functions
 */
export interface PassThroughMethodOptions {
  /**
   * Current component instance
   */
  instance: any;
  
  /**
   * Current component props/inputs
   */
  props: any;
  
  /**
   * Current component state
   */
  state: any;
  
  /**
   * Context-specific data (e.g., day data for dayCell)
   */
  context?: any;
}

/**
 * Pass Through type - can be static or function-based
 */
export type PassThroughType<T = PassThroughElementOptions> = 
  | T 
  | ((options: PassThroughMethodOptions) => T);

/**
 * Pass Through Options for Calendar Component
 */
export interface CalendarPassThroughOptions {
  /**
   * Root container element
   */
  root?: PassThroughType;
  
  /**
   * Header section containing navigation and title
   */
  header?: PassThroughType;
  
  /**
   * Left section of header (navigation buttons and title)
   */
  headerLeft?: PassThroughType;
  
  /**
   * Right section of header (today button, etc.)
   */
  headerRight?: PassThroughType;
  
  /**
   * Title displaying current month/year
   */
  title?: PassThroughType;
  
  /**
   * Month name in title
   */
  monthName?: PassThroughType;
  
  /**
   * Year in title
   */
  yearName?: PassThroughType;
  
  /**
   * Previous month navigation button
   */
  previousButton?: PassThroughType;
  
  /**
   * Next month navigation button
   */
  nextButton?: PassThroughType;
  
  /**
   * Today button
   */
  todayButton?: PassThroughType;
  
  /**
   * Grid container for calendar days
   */
  grid?: PassThroughType;
  
  /**
   * Day header cells (weekday names)
   */
  dayHeader?: PassThroughType;
  
  /**
   * Individual day cell
   */
  dayCell?: PassThroughType;
  
  /**
   * Day number inside cell
   */
  dayNumber?: PassThroughType;
  
  /**
   * Holiday indicator dot
   */
  holidayDot?: PassThroughType;
  
  /**
   * Selection indicator
   */
  selectionIndicator?: PassThroughType;
  
  /**
   * Footer section
   */
  footer?: PassThroughType;
}

/**
 * Pass Through Options for Date Picker Component
 */
export interface DatePickerPassThroughOptions {
  /**
   * Root container element
   */
  root?: PassThroughType;
  
  /**
   * Input field
   */
  input?: PassThroughType;
  
  /**
   * Calendar icon/button
   */
  button?: PassThroughType;
  
  /**
   * Dropdown panel containing calendar
   */
  panel?: PassThroughType;
  
  /**
   * Calendar component inside panel
   */
  calendar?: CalendarPassThroughOptions;
}

/**
 * Pass Through Options for Theme Selector Component
 */
export interface ThemeSelectorPassThroughOptions {
  /**
   * Root container element
   */
  root?: PassThroughType;
  
  /**
   * Label element
   */
  label?: PassThroughType;
  
  /**
   * Select dropdown
   */
  select?: PassThroughType;
  
  /**
   * Option elements
   */
  option?: PassThroughType;
  
  /**
   * Preview container
   */
  preview?: PassThroughType;
  
  /**
   * Preview color boxes
   */
  previewColor?: PassThroughType;
}

/**
 * Pass Through Options for Calendar Switch Component
 */
export interface CalendarSwitchPassThroughOptions {
  /**
   * Root container element
   */
  root?: PassThroughType;
  
  /**
   * Label element
   */
  label?: PassThroughType;
  
  /**
   * Button group container
   */
  buttonGroup?: PassThroughType;
  
  /**
   * Individual button
   */
  button?: PassThroughType;
  
  /**
   * Active button
   */
  activeButton?: PassThroughType;
  
  /**
   * Button icon
   */
  icon?: PassThroughType;
  
  /**
   * Button text
   */
  buttonText?: PassThroughType;
}

/**
 * Pass Through Options for Color Picker Component
 */
export interface ColorPickerPassThroughOptions {
  /**
   * Root container element
   */
  root?: PassThroughType;
  
  /**
   * Label element
   */
  label?: PassThroughType;
  
  /**
   * Color grid container
   */
  colorGrid?: PassThroughType;
  
  /**
   * Individual color swatch
   */
  colorSwatch?: PassThroughType;
  
  /**
   * Selected indicator
   */
  selectedIndicator?: PassThroughType;
  
  /**
   * Custom color input
   */
  customInput?: PassThroughType;
  
  /**
   * Preset palettes section
   */
  presetSection?: PassThroughType;
  
  /**
   * Preset label
   */
  presetLabel?: PassThroughType;
}

/**
 * Pass Through Options for Day Info Modal Component
 */
export interface DayInfoModalPassThroughOptions {
  /**
   * Root container element
   */
  root?: PassThroughType;
  
  /**
   * Overlay backdrop
   */
  overlay?: PassThroughType;
  
  /**
   * Modal content container
   */
  modal?: PassThroughType;
  
  /**
   * Header section
   */
  header?: PassThroughType;
  
  /**
   * Title element
   */
  title?: PassThroughType;
  
  /**
   * Close button
   */
  closeButton?: PassThroughType;
  
  /**
   * Content section
   */
  content?: PassThroughType;
  
  /**
   * Date info section
   */
  dateInfo?: PassThroughType;
  
  /**
   * Holiday info section
   */
  holidayInfo?: PassThroughType;
  
  /**
   * Holiday name
   */
  holidayName?: PassThroughType;
  
  /**
   * Holiday description
   */
  holidayDescription?: PassThroughType;
  
  /**
   * Footer section
   */
  footer?: PassThroughType;
  
  /**
   * Action button
   */
  actionButton?: PassThroughType;
}

/**
 * Global Pass Through configuration
 */
export interface GlobalPassThroughOptions {
  /**
   * Calendar component PT options
   */
  calendar?: CalendarPassThroughOptions;
  
  /**
   * Date Picker component PT options
   */
  datePicker?: DatePickerPassThroughOptions;
  
  /**
   * Theme Selector component PT options
   */
  themeSelector?: ThemeSelectorPassThroughOptions;
  
  /**
   * Calendar Switch component PT options
   */
  calendarSwitch?: CalendarSwitchPassThroughOptions;
  
  /**
   * Color Picker component PT options
   */
  colorPicker?: ColorPickerPassThroughOptions;
  
  /**
   * Day Info Modal component PT options
   */
  dayInfoModal?: DayInfoModalPassThroughOptions;
}
