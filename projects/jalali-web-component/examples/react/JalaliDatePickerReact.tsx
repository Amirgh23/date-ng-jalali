/**
 * React wrapper component for Jalali Date Picker Web Component
 * Provides React-friendly API with hooks support and event handling
 */

import React, { useEffect, useRef, useCallback, forwardRef } from 'react';
import {
  JalaliDatePickerReactProps,
  DateSelectDetail,
  RangeSelectDetail,
  MultipleSelectDetail,
  LocaleChangeDetail,
  ThemeChangeDetail,
  JalaliDatePickerEvent,
} from './types';

/**
 * JalaliDatePickerReact - React wrapper for Jalali Date Picker Web Component
 *
 * This component wraps the native web component and provides:
 * - React-friendly props and callbacks
 * - Controlled component pattern support
 * - Event handling with proper TypeScript types
 * - Ref forwarding for direct element access
 *
 * @example
 * ```tsx
 * import { JalaliDatePickerReact } from './JalaliDatePickerReact';
 *
 * function App() {
 *   const [date, setDate] = React.useState<Date | null>(null);
 *
 *   return (
 *     <JalaliDatePickerReact
 *       selectedDate={date}
 *       onDateSelect={(detail) => setDate(detail.date)}
 *       locale="fa"
 *       theme="glassmorphism"
 *     />
 *   );
 * }
 * ```
 */
export const JalaliDatePickerReact = forwardRef<
  HTMLElement,
  JalaliDatePickerReactProps
>(
  (
    {
      selectedDate,
      onDateSelect,
      selectedRange,
      onRangeSelect,
      selectedDates,
      onMultipleSelect,
      calendarType = 'jalali',
      locale = 'fa',
      theme = 'light',
      selectionMode = 'single',
      disabled = false,
      onLocaleChange,
      onThemeChange,
      onError,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const elementRef = ref || internalRef;

    // Ensure the web component is registered
    useEffect(() => {
      if (!customElements.get('jalali-date-picker')) {
        console.warn(
          'jalali-date-picker web component is not registered. ' +
            'Make sure to import and register it before using JalaliDatePickerReact.'
        );
      }
    }, []);

    // Update selectedDate property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        if (selectedDate !== undefined) {
          element.selectedDate = selectedDate;
        }
      }
    }, [selectedDate, elementRef]);

    // Update selectedRange property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        if (selectedRange !== undefined) {
          element.selectedRange = selectedRange;
        }
      }
    }, [selectedRange, elementRef]);

    // Update selectedDates property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        if (selectedDates !== undefined) {
          element.selectedDates = selectedDates;
        }
      }
    }, [selectedDates, elementRef]);

    // Update calendarType property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        element.calendarType = calendarType;
      }
    }, [calendarType, elementRef]);

    // Update locale property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        element.locale = locale;
      }
    }, [locale, elementRef]);

    // Update theme property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        element.theme = theme;
      }
    }, [theme, elementRef]);

    // Update selectionMode property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        element.selectionMode = selectionMode;
      }
    }, [selectionMode, elementRef]);

    // Update disabled property when prop changes
    useEffect(() => {
      if (elementRef && 'current' in elementRef && elementRef.current) {
        const element = elementRef.current as any;
        element.disabled = disabled;
      }
    }, [disabled, elementRef]);

    // Handle dateSelect event
    const handleDateSelect = useCallback(
      (event: Event) => {
        const customEvent = event as JalaliDatePickerEvent<DateSelectDetail>;
        onDateSelect?.(customEvent.detail);
      },
      [onDateSelect]
    );

    // Handle rangeSelect event
    const handleRangeSelect = useCallback(
      (event: Event) => {
        const customEvent = event as JalaliDatePickerEvent<RangeSelectDetail>;
        onRangeSelect?.(customEvent.detail);
      },
      [onRangeSelect]
    );

    // Handle multipleSelect event
    const handleMultipleSelect = useCallback(
      (event: Event) => {
        const customEvent = event as JalaliDatePickerEvent<MultipleSelectDetail>;
        onMultipleSelect?.(customEvent.detail);
      },
      [onMultipleSelect]
    );

    // Handle localeChange event
    const handleLocaleChange = useCallback(
      (event: Event) => {
        const customEvent = event as JalaliDatePickerEvent<LocaleChangeDetail>;
        onLocaleChange?.(customEvent.detail);
      },
      [onLocaleChange]
    );

    // Handle themeChange event
    const handleThemeChange = useCallback(
      (event: Event) => {
        const customEvent = event as JalaliDatePickerEvent<ThemeChangeDetail>;
        onThemeChange?.(customEvent.detail);
      },
      [onThemeChange]
    );

    // Handle error event
    const handleError = useCallback(
      (event: Event) => {
        const customEvent = event as CustomEvent<{ message: string }>;
        onError?.(new Error(customEvent.detail?.message || 'Unknown error'));
      },
      [onError]
    );

    // Setup event listeners
    useEffect(() => {
      const element = elementRef && 'current' in elementRef ? elementRef.current : null;
      if (!element) return;

      element.addEventListener('dateSelect', handleDateSelect);
      element.addEventListener('rangeSelect', handleRangeSelect);
      element.addEventListener('multipleSelect', handleMultipleSelect);
      element.addEventListener('localeChange', handleLocaleChange);
      element.addEventListener('themeChange', handleThemeChange);
      element.addEventListener('error', handleError);

      return () => {
        element.removeEventListener('dateSelect', handleDateSelect);
        element.removeEventListener('rangeSelect', handleRangeSelect);
        element.removeEventListener('multipleSelect', handleMultipleSelect);
        element.removeEventListener('localeChange', handleLocaleChange);
        element.removeEventListener('themeChange', handleThemeChange);
        element.removeEventListener('error', handleError);
      };
    }, [
      elementRef,
      handleDateSelect,
      handleRangeSelect,
      handleMultipleSelect,
      handleLocaleChange,
      handleThemeChange,
      handleError,
    ]);

    return (
      <jalali-date-picker
        ref={elementRef}
        className={className}
        style={style}
        {...rest}
      />
    );
  }
);

JalaliDatePickerReact.displayName = 'JalaliDatePickerReact';

export default JalaliDatePickerReact;
