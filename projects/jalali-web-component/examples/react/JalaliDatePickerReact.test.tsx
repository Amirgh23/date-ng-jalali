/**
 * Unit tests for JalaliDatePickerReact component
 * Tests React wrapper functionality, event handling, and state management
 */

import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import JalaliDatePickerReact from './JalaliDatePickerReact';
import { DateSelectDetail, RangeSelectDetail, MultipleSelectDetail } from './types';

// Mock the web component
class MockJalaliDatePickerElement extends HTMLElement {
  selectedDate: Date | null = null;
  selectedRange = { start: null, end: null };
  selectedDates: Date[] = [];
  calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali';
  locale: 'fa' | 'en' = 'fa';
  theme = 'light';
  selectionMode: 'single' | 'range' | 'multiple' = 'single';
  disabled = false;

  get value(): string {
    return this.selectedDate?.toISOString() || '';
  }

  reset(): void {
    this.selectedDate = null;
    this.selectedRange = { start: null, end: null };
    this.selectedDates = [];
  }

  open(): void {
    // Mock implementation
  }

  close(): void {
    // Mock implementation
  }

  setDate(date: Date): void {
    this.selectedDate = date;
  }

  setRange(start: Date, end: Date): void {
    this.selectedRange = { start, end };
  }

  addDate(date: Date): void {
    this.selectedDates.push(date);
  }

  removeDate(date: Date): void {
    this.selectedDates = this.selectedDates.filter(
      (d) => d.getTime() !== date.getTime()
    );
  }
}

// Register the mock web component
if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', MockJalaliDatePickerElement);
}

describe('JalaliDatePickerReact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the web component', () => {
      const { container } = render(<JalaliDatePickerReact />);
      const element = container.querySelector('jalali-date-picker');
      expect(element).toBeTruthy();
    });

    it('should apply className prop', () => {
      const { container } = render(
        <JalaliDatePickerReact className="custom-class" />
      );
      const element = container.querySelector('jalali-date-picker');
      expect(element?.className).toBe('custom-class');
    });

    it('should apply style prop', () => {
      const { container } = render(
        <JalaliDatePickerReact style={{ width: '100%', maxWidth: '400px' }} />
      );
      const element = container.querySelector('jalali-date-picker') as HTMLElement;
      expect(element?.style.width).toBe('100%');
      expect(element?.style.maxWidth).toBe('400px');
    });

    it('should pass through additional HTML attributes', () => {
      const { container } = render(
        <JalaliDatePickerReact data-testid="date-picker" aria-label="Select date" />
      );
      const element = container.querySelector('jalali-date-picker');
      expect(element?.getAttribute('data-testid')).toBe('date-picker');
      expect(element?.getAttribute('aria-label')).toBe('Select date');
    });
  });

  describe('Props - Single Date Selection', () => {
    it('should set selectedDate property', async () => {
      const testDate = new Date(2024, 0, 15);
      const { container } = render(
        <JalaliDatePickerReact selectedDate={testDate} />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectedDate).toEqual(testDate);
      });
    });

    it('should update selectedDate when prop changes', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact selectedDate={new Date(2024, 0, 15)} />
      );

      const newDate = new Date(2024, 1, 20);
      rerender(<JalaliDatePickerReact selectedDate={newDate} />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectedDate).toEqual(newDate);
      });
    });

    it('should handle null selectedDate', async () => {
      const { container } = render(<JalaliDatePickerReact selectedDate={null} />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectedDate).toBeNull();
      });
    });
  });

  describe('Props - Date Range Selection', () => {
    it('should set selectedRange property', async () => {
      const range = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      };
      const { container } = render(
        <JalaliDatePickerReact selectedRange={range} />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectedRange).toEqual(range);
      });
    });

    it('should update selectedRange when prop changes', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact
          selectedRange={{
            start: new Date(2024, 0, 1),
            end: new Date(2024, 0, 31),
          }}
        />
      );

      const newRange = {
        start: new Date(2024, 1, 1),
        end: new Date(2024, 1, 28),
      };
      rerender(<JalaliDatePickerReact selectedRange={newRange} />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectedRange).toEqual(newRange);
      });
    });
  });

  describe('Props - Multiple Dates Selection', () => {
    it('should set selectedDates property', async () => {
      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      const { container } = render(
        <JalaliDatePickerReact selectedDates={dates} />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectedDates).toEqual(dates);
      });
    });

    it('should update selectedDates when prop changes', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact selectedDates={[new Date(2024, 0, 1)]} />
      );

      const newDates = [
        new Date(2024, 0, 1),
        new Date(2024, 0, 15),
        new Date(2024, 0, 30),
      ];
      rerender(<JalaliDatePickerReact selectedDates={newDates} />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectedDates).toEqual(newDates);
      });
    });
  });

  describe('Props - Configuration', () => {
    it('should set calendarType property', async () => {
      const { container } = render(
        <JalaliDatePickerReact calendarType="gregorian" />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.calendarType).toBe('gregorian');
      });
    });

    it('should set locale property', async () => {
      const { container } = render(<JalaliDatePickerReact locale="en" />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.locale).toBe('en');
      });
    });

    it('should set theme property', async () => {
      const { container } = render(
        <JalaliDatePickerReact theme="glassmorphism" />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.theme).toBe('glassmorphism');
      });
    });

    it('should set selectionMode property', async () => {
      const { container } = render(
        <JalaliDatePickerReact selectionMode="range" />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectionMode).toBe('range');
      });
    });

    it('should set disabled property', async () => {
      const { container } = render(<JalaliDatePickerReact disabled={true} />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.disabled).toBe(true);
      });
    });
  });

  describe('Event Handling - dateSelect', () => {
    it('should call onDateSelect callback when dateSelect event is fired', async () => {
      const onDateSelect = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onDateSelect={onDateSelect} />
      );

      const element = container.querySelector('jalali-date-picker');
      const detail: DateSelectDetail = {
        date: new Date(2024, 0, 15),
        jalaliDate: '1402/10/25',
        gregorianDate: '2024/01/15',
        hijriDate: '1445/07/05',
      };

      const event = new CustomEvent('dateSelect', { detail });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onDateSelect).toHaveBeenCalledWith(detail);
      });
    });

    it('should not call onDateSelect if callback is not provided', async () => {
      const { container } = render(<JalaliDatePickerReact />);

      const element = container.querySelector('jalali-date-picker');
      const detail: DateSelectDetail = {
        date: new Date(2024, 0, 15),
        jalaliDate: '1402/10/25',
        gregorianDate: '2024/01/15',
        hijriDate: '1445/07/05',
      };

      const event = new CustomEvent('dateSelect', { detail });
      expect(() => element?.dispatchEvent(event)).not.toThrow();
    });
  });

  describe('Event Handling - rangeSelect', () => {
    it('should call onRangeSelect callback when rangeSelect event is fired', async () => {
      const onRangeSelect = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onRangeSelect={onRangeSelect} />
      );

      const element = container.querySelector('jalali-date-picker');
      const detail: RangeSelectDetail = {
        range: {
          start: new Date(2024, 0, 1),
          end: new Date(2024, 0, 31),
        },
      };

      const event = new CustomEvent('rangeSelect', { detail });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onRangeSelect).toHaveBeenCalledWith(detail);
      });
    });
  });

  describe('Event Handling - multipleSelect', () => {
    it('should call onMultipleSelect callback when multipleSelect event is fired', async () => {
      const onMultipleSelect = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onMultipleSelect={onMultipleSelect} />
      );

      const element = container.querySelector('jalali-date-picker');
      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      const detail: MultipleSelectDetail = { dates };

      const event = new CustomEvent('multipleSelect', { detail });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onMultipleSelect).toHaveBeenCalledWith(detail);
      });
    });
  });

  describe('Event Handling - localeChange', () => {
    it('should call onLocaleChange callback when localeChange event is fired', async () => {
      const onLocaleChange = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onLocaleChange={onLocaleChange} />
      );

      const element = container.querySelector('jalali-date-picker');
      const detail = { locale: 'en' as const };

      const event = new CustomEvent('localeChange', { detail });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onLocaleChange).toHaveBeenCalledWith(detail);
      });
    });
  });

  describe('Event Handling - themeChange', () => {
    it('should call onThemeChange callback when themeChange event is fired', async () => {
      const onThemeChange = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onThemeChange={onThemeChange} />
      );

      const element = container.querySelector('jalali-date-picker');
      const detail = { theme: 'dark' };

      const event = new CustomEvent('themeChange', { detail });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onThemeChange).toHaveBeenCalledWith(detail);
      });
    });
  });

  describe('Event Handling - error', () => {
    it('should call onError callback when error event is fired', async () => {
      const onError = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onError={onError} />
      );

      const element = container.querySelector('jalali-date-picker');
      const detail = { message: 'Invalid date' };

      const event = new CustomEvent('error', { detail });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
      });
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to the web component element', () => {
      const ref = React.createRef<HTMLElement>();
      const { container } = render(<JalaliDatePickerReact ref={ref} />);

      expect(ref.current).toBeTruthy();
      expect(ref.current?.tagName).toBe('JALALI-DATE-PICKER');
    });

    it('should allow accessing web component methods via ref', async () => {
      const ref = React.createRef<HTMLElement>();
      render(<JalaliDatePickerReact ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeTruthy();
        const element = ref.current as any;
        expect(typeof element.reset).toBe('function');
        expect(typeof element.open).toBe('function');
        expect(typeof element.close).toBe('function');
      });
    });

    it('should allow accessing web component properties via ref', async () => {
      const ref = React.createRef<HTMLElement>();
      const testDate = new Date(2024, 0, 15);
      render(<JalaliDatePickerReact ref={ref} selectedDate={testDate} />);

      await waitFor(() => {
        const element = ref.current as any;
        expect(element.selectedDate).toEqual(testDate);
      });
    });
  });

  describe('Controlled Component Pattern', () => {
    it('should work as a controlled component', async () => {
      function ControlledComponent() {
        const [date, setDate] = React.useState<Date | null>(null);

        return (
          <JalaliDatePickerReact
            selectedDate={date}
            onDateSelect={(detail) => setDate(detail.date)}
          />
        );
      }

      const { container } = render(<ControlledComponent />);
      const element = container.querySelector('jalali-date-picker') as any;

      expect(element.selectedDate).toBeNull();

      const testDate = new Date(2024, 0, 15);
      const detail: DateSelectDetail = {
        date: testDate,
        jalaliDate: '1402/10/25',
        gregorianDate: '2024/01/15',
        hijriDate: '1445/07/05',
      };

      const event = new CustomEvent('dateSelect', { detail });
      element.dispatchEvent(event);

      await waitFor(() => {
        expect(element.selectedDate).toEqual(testDate);
      });
    });
  });

  describe('Uncontrolled Component Pattern', () => {
    it('should work as an uncontrolled component', async () => {
      const ref = React.createRef<HTMLElement>();
      render(<JalaliDatePickerReact ref={ref} />);

      await waitFor(() => {
        const element = ref.current as any;
        expect(element).toBeTruthy();
        expect(element.value).toBe('');
      });
    });
  });

  describe('Event Listener Cleanup', () => {
    it('should remove event listeners on unmount', async () => {
      const onDateSelect = vi.fn();
      const { unmount, container } = render(
        <JalaliDatePickerReact onDateSelect={onDateSelect} />
      );

      unmount();

      const element = container.querySelector('jalali-date-picker');
      const detail: DateSelectDetail = {
        date: new Date(2024, 0, 15),
        jalaliDate: '1402/10/25',
        gregorianDate: '2024/01/15',
        hijriDate: '1445/07/05',
      };

      const event = new CustomEvent('dateSelect', { detail });
      element?.dispatchEvent(event);

      // Callback should not be called after unmount
      expect(onDateSelect).not.toHaveBeenCalled();
    });
  });

  describe('Multiple Instances', () => {
    it('should handle multiple instances independently', async () => {
      const onDateSelect1 = vi.fn();
      const onDateSelect2 = vi.fn();

      const { container } = render(
        <>
          <JalaliDatePickerReact
            onDateSelect={onDateSelect1}
            data-testid="picker-1"
          />
          <JalaliDatePickerReact
            onDateSelect={onDateSelect2}
            data-testid="picker-2"
          />
        </>
      );

      const pickers = container.querySelectorAll('jalali-date-picker');
      expect(pickers).toHaveLength(2);

      const detail: DateSelectDetail = {
        date: new Date(2024, 0, 15),
        jalaliDate: '1402/10/25',
        gregorianDate: '2024/01/15',
        hijriDate: '1445/07/05',
      };

      const event1 = new CustomEvent('dateSelect', { detail });
      pickers[0].dispatchEvent(event1);

      await waitFor(() => {
        expect(onDateSelect1).toHaveBeenCalledWith(detail);
        expect(onDateSelect2).not.toHaveBeenCalled();
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct display name for debugging', () => {
      expect(JalaliDatePickerReact.displayName).toBe('JalaliDatePickerReact');
    });
  });
});
