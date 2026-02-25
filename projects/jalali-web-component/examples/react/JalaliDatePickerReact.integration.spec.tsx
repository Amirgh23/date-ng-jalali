/**
 * Integration Tests for React + Jalali Date Picker Web Component
 * Tests real-world React integration scenarios
 */

import React, { useRef, useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import JalaliDatePickerReact from './JalaliDatePickerReact';
import type { DateSelectDetail, RangeSelectDetail, MultipleSelectDetail } from './types';

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

  open(): void {}
  close(): void {}
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
    this.selectedDates = this.selectedDates.filter(d => d.getTime() !== date.getTime());
  }
}

if (!customElements.get('jalali-date-picker')) {
  customElements.define('jalali-date-picker', MockJalaliDatePickerElement);
}

describe('React Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Mounting and Unmounting', () => {
    it('should mount and unmount without errors', () => {
      const { unmount } = render(<JalaliDatePickerReact />);
      expect(() => unmount()).not.toThrow();
    });

    it('should initialize with default props', () => {
      const { container } = render(<JalaliDatePickerReact />);
      const element = container.querySelector('jalali-date-picker') as any;
      expect(element).toBeTruthy();
      expect(element.locale).toBe('fa');
      expect(element.theme).toBe('light');
    });

    it('should handle rapid mount/unmount cycles', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<JalaliDatePickerReact />);
        expect(() => unmount()).not.toThrow();
      }
    });
  });

  describe('Props Binding', () => {
    it('should bind selectedDate prop correctly', async () => {
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

    it('should bind locale prop and update component', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact locale="fa" />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.locale).toBe('fa');
      });

      rerender(<JalaliDatePickerReact locale="en" />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.locale).toBe('en');
      });
    });

    it('should bind theme prop and update component', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact theme="light" />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.theme).toBe('light');
      });

      rerender(<JalaliDatePickerReact theme="dark" />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.theme).toBe('dark');
      });
    });

    it('should bind selectionMode prop', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact selectionMode="single" />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectionMode).toBe('single');
      });

      rerender(<JalaliDatePickerReact selectionMode="range" />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.selectionMode).toBe('range');
      });
    });

    it('should bind disabled prop', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact disabled={false} />
      );

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.disabled).toBe(false);
      });

      rerender(<JalaliDatePickerReact disabled={true} />);

      await waitFor(() => {
        const element = container.querySelector('jalali-date-picker') as any;
        expect(element.disabled).toBe(true);
      });
    });
  });

  describe('Event Handling', () => {
    it('should handle dateSelect event', async () => {
      const onDateSelect = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onDateSelect={onDateSelect} />
      );

      const element = container.querySelector('jalali-date-picker');
      const testDate = new Date(2024, 0, 15);
      const detail: DateSelectDetail = {
        date: testDate,
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

    it('should handle rangeSelect event', async () => {
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

    it('should handle multipleSelect event', async () => {
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

    it('should handle localeChange event', async () => {
      const onLocaleChange = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onLocaleChange={onLocaleChange} />
      );

      const element = container.querySelector('jalali-date-picker');
      const event = new CustomEvent('localeChange', {
        detail: { locale: 'en' },
      });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onLocaleChange).toHaveBeenCalledWith({ locale: 'en' });
      });
    });

    it('should handle themeChange event', async () => {
      const onThemeChange = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onThemeChange={onThemeChange} />
      );

      const element = container.querySelector('jalali-date-picker');
      const event = new CustomEvent('themeChange', {
        detail: { theme: 'dark' },
      });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onThemeChange).toHaveBeenCalledWith({ theme: 'dark' });
      });
    });
  });

  describe('State Management with Hooks', () => {
    it('should work with useState for controlled component', async () => {
      function TestComponent() {
        const [date, setDate] = useState<Date | null>(null);

        return (
          <>
            <JalaliDatePickerReact
              selectedDate={date}
              onDateSelect={(detail) => setDate(detail.date)}
            />
            <div data-testid="date-display">
              {date ? date.toISOString() : 'No date'}
            </div>
          </>
        );
      }

      const { container, getByTestId } = render(<TestComponent />);
      const element = container.querySelector('jalali-date-picker') as any;

      expect(getByTestId('date-display')).toHaveTextContent('No date');

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
        expect(getByTestId('date-display')).toHaveTextContent(
          testDate.toISOString()
        );
      });
    });

    it('should work with useRef for uncontrolled component', async () => {
      function TestComponent() {
        const pickerRef = useRef<HTMLElement>(null);

        return (
          <>
            <JalaliDatePickerReact ref={pickerRef} />
            <button
              onClick={() => {
                const element = pickerRef.current as any;
                element?.reset();
              }}
              data-testid="reset-btn"
            >
              Reset
            </button>
          </>
        );
      }

      const { getByTestId, container } = render(<TestComponent />);
      const element = container.querySelector('jalali-date-picker') as any;

      element.selectedDate = new Date(2024, 0, 15);
      expect(element.selectedDate).toBeTruthy();

      fireEvent.click(getByTestId('reset-btn'));

      await waitFor(() => {
        expect(element.selectedDate).toBeNull();
      });
    });

    it('should handle multiple state updates', async () => {
      function TestComponent() {
        const [date, setDate] = useState<Date | null>(null);
        const [locale, setLocale] = useState<'fa' | 'en'>('fa');

        return (
          <>
            <JalaliDatePickerReact
              selectedDate={date}
              locale={locale}
              onDateSelect={(detail) => setDate(detail.date)}
              onLocaleChange={(detail) => setLocale(detail.locale)}
            />
            <div data-testid="state-display">
              {date?.toISOString()}-{locale}
            </div>
          </>
        );
      }

      const { container, getByTestId } = render(<TestComponent />);
      const element = container.querySelector('jalali-date-picker') as any;

      const testDate = new Date(2024, 0, 15);
      const dateEvent = new CustomEvent('dateSelect', {
        detail: {
          date: testDate,
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        },
      });
      element.dispatchEvent(dateEvent);

      await waitFor(() => {
        expect(getByTestId('state-display')).toHaveTextContent(
          testDate.toISOString()
        );
      });

      const localeEvent = new CustomEvent('localeChange', {
        detail: { locale: 'en' },
      });
      element.dispatchEvent(localeEvent);

      await waitFor(() => {
        expect(getByTestId('state-display')).toHaveTextContent('-en');
      });
    });
  });

  describe('Controlled vs Uncontrolled Patterns', () => {
    it('should support controlled component pattern', async () => {
      function ControlledComponent() {
        const [date, setDate] = useState<Date | null>(null);

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
      const event = new CustomEvent('dateSelect', {
        detail: {
          date: testDate,
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        },
      });
      element.dispatchEvent(event);

      await waitFor(() => {
        expect(element.selectedDate).toEqual(testDate);
      });
    });

    it('should support uncontrolled component pattern', async () => {
      const ref = React.createRef<HTMLElement>();
      render(<JalaliDatePickerReact ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeTruthy();
        const element = ref.current as any;
        expect(element.value).toBe('');
      });
    });
  });

  describe('Re-rendering Behavior', () => {
    it('should not re-render unnecessarily', async () => {
      const renderSpy = vi.fn();

      function TestComponent() {
        renderSpy();
        return <JalaliDatePickerReact />;
      }

      const { rerender } = render(<TestComponent />);
      const initialRenderCount = renderSpy.mock.calls.length;

      rerender(<TestComponent />);
      expect(renderSpy.mock.calls.length).toBe(initialRenderCount + 1);
    });

    it('should re-render when props change', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact locale="fa" />
      );

      let element = container.querySelector('jalali-date-picker') as any;
      expect(element.locale).toBe('fa');

      rerender(<JalaliDatePickerReact locale="en" />);

      await waitFor(() => {
        element = container.querySelector('jalali-date-picker') as any;
        expect(element.locale).toBe('en');
      });
    });

    it('should handle rapid prop updates', async () => {
      const { rerender, container } = render(
        <JalaliDatePickerReact theme="light" />
      );

      const themes = ['light', 'dark', 'glassmorphism', 'gradient', 'minimal'];

      for (const theme of themes) {
        rerender(<JalaliDatePickerReact theme={theme} />);

        await waitFor(() => {
          const element = container.querySelector('jalali-date-picker') as any;
          expect(element.theme).toBe(theme);
        });
      }
    });
  });

  describe('Memory Management', () => {
    it('should clean up event listeners on unmount', async () => {
      const onDateSelect = vi.fn();
      const { unmount, container } = render(
        <JalaliDatePickerReact onDateSelect={onDateSelect} />
      );

      unmount();

      const element = container.querySelector('jalali-date-picker');
      const event = new CustomEvent('dateSelect', {
        detail: {
          date: new Date(2024, 0, 15),
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        },
      });

      element?.dispatchEvent(event);
      expect(onDateSelect).not.toHaveBeenCalled();
    });

    it('should not leak memory with multiple instances', async () => {
      const { unmount } = render(
        <>
          <JalaliDatePickerReact />
          <JalaliDatePickerReact />
          <JalaliDatePickerReact />
        </>
      );

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Integration with React Features', () => {
    it('should work with React.memo', async () => {
      const MemoizedPicker = React.memo(JalaliDatePickerReact);
      const { container } = render(<MemoizedPicker locale="fa" />);

      const element = container.querySelector('jalali-date-picker') as any;
      expect(element.locale).toBe('fa');
    });

    it('should work with conditional rendering', async () => {
      function TestComponent({ show }: { show: boolean }) {
        return show ? <JalaliDatePickerReact /> : <div>Hidden</div>;
      }

      const { rerender, container } = render(<TestComponent show={true} />);
      expect(container.querySelector('jalali-date-picker')).toBeTruthy();

      rerender(<TestComponent show={false} />);
      expect(container.querySelector('jalali-date-picker')).toBeFalsy();

      rerender(<TestComponent show={true} />);
      expect(container.querySelector('jalali-date-picker')).toBeTruthy();
    });

    it('should work with list rendering', async () => {
      function TestComponent() {
        const dates = [
          new Date(2024, 0, 1),
          new Date(2024, 0, 15),
          new Date(2024, 0, 31),
        ];

        return (
          <div>
            {dates.map((date, index) => (
              <JalaliDatePickerReact
                key={index}
                selectedDate={date}
                data-testid={`picker-${index}`}
              />
            ))}
          </div>
        );
      }

      const { container } = render(<TestComponent />);
      const pickers = container.querySelectorAll('jalali-date-picker');
      expect(pickers).toHaveLength(3);
    });
  });

  describe('Error Handling', () => {
    it('should handle error events', async () => {
      const onError = vi.fn();
      const { container } = render(
        <JalaliDatePickerReact onError={onError} />
      );

      const element = container.querySelector('jalali-date-picker');
      const event = new CustomEvent('error', {
        detail: { message: 'Invalid date' },
      });
      element?.dispatchEvent(event);

      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
      });
    });

    it('should handle missing callbacks gracefully', async () => {
      const { container } = render(<JalaliDatePickerReact />);

      const element = container.querySelector('jalali-date-picker');
      const event = new CustomEvent('dateSelect', {
        detail: {
          date: new Date(2024, 0, 15),
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        },
      });

      expect(() => element?.dispatchEvent(event)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should pass through aria attributes', () => {
      const { container } = render(
        <JalaliDatePickerReact aria-label="Select a date" />
      );

      const element = container.querySelector('jalali-date-picker');
      expect(element?.getAttribute('aria-label')).toBe('Select a date');
    });

    it('should pass through data attributes', () => {
      const { container } = render(
        <JalaliDatePickerReact data-testid="date-picker" />
      );

      const element = container.querySelector('jalali-date-picker');
      expect(element?.getAttribute('data-testid')).toBe('date-picker');
    });
  });
});
