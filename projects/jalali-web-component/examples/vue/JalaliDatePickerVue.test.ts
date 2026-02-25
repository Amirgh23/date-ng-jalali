/**
 * Unit tests for JalaliDatePickerVue component
 * Tests v-model support, event handling, and state management
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import JalaliDatePickerVue from './JalaliDatePickerVue.vue';
import type {
  DateSelectDetail,
  RangeSelectDetail,
  MultipleSelectDetail,
  LocaleChangeDetail,
  ThemeChangeDetail,
  DateRange,
} from './types';

// Mock the web component
class MockJalaliDatePickerElement extends HTMLElement {
  selectedDate: Date | null = null;
  selectedRange: DateRange = { start: null, end: null };
  selectedDates: Date[] = [];
  calendarType: 'jalali' | 'gregorian' | 'hijri' = 'jalali';
  locale: 'fa' | 'en' = 'fa';
  theme: string = 'light';
  selectionMode: 'single' | 'range' | 'multiple' = 'single';
  disabled: boolean = false;

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

describe('JalaliDatePickerVue', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Mounting', () => {
    it('should mount successfully', () => {
      wrapper = mount(JalaliDatePickerVue);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render the web component element', () => {
      wrapper = mount(JalaliDatePickerVue);
      const element = wrapper.find('jalali-date-picker');
      expect(element.exists()).toBe(true);
    });

    it('should warn if web component is not registered', () => {
      const warnSpy = vi.spyOn(console, 'warn');
      // Temporarily unregister the component
      const descriptor = Object.getOwnPropertyDescriptor(
        customElements,
        'get'
      );
      vi.spyOn(customElements, 'get').mockReturnValue(undefined);

      wrapper = mount(JalaliDatePickerVue);
      expect(warnSpy).toHaveBeenCalled();

      vi.restoreAllMocks();
    });
  });

  describe('v-model Support - Single Date', () => {
    it('should update modelValue when date is selected', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelValue: null,
        },
      });

      const testDate = new Date(2024, 0, 15);
      const element = wrapper.vm.$refs.pickerElement as any;

      // Simulate dateSelect event
      const event = new CustomEvent('dateSelect', {
        detail: {
          date: testDate,
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        } as DateSelectDetail,
      });

      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([testDate]);
    });

    it('should sync modelValue prop to web component', async () => {
      const testDate = new Date(2024, 0, 15);
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelValue: testDate,
        },
      });

      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDate).toEqual(testDate);
    });

    it('should update web component when modelValue prop changes', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelValue: null,
        },
      });

      const testDate = new Date(2024, 0, 15);
      await wrapper.setProps({ modelValue: testDate });
      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDate).toEqual(testDate);
    });
  });

  describe('v-model Support - Date Range', () => {
    it('should update modelRange when range is selected', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelRange: { start: null, end: null },
        },
      });

      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 31);
      const element = wrapper.vm.$refs.pickerElement as any;

      // Simulate rangeSelect event
      const event = new CustomEvent('rangeSelect', {
        detail: {
          range: { start: startDate, end: endDate },
        } as RangeSelectDetail,
      });

      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('update:modelRange')).toBeTruthy();
      expect(wrapper.emitted('update:modelRange')[0]).toEqual([
        { start: startDate, end: endDate },
      ]);
    });

    it('should sync modelRange prop to web component', async () => {
      const range: DateRange = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
      };

      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelRange: range,
        },
      });

      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedRange).toEqual(range);
    });
  });

  describe('v-model Support - Multiple Dates', () => {
    it('should update modelDates when dates are selected', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelDates: [],
        },
      });

      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      const element = wrapper.vm.$refs.pickerElement as any;

      // Simulate multipleSelect event
      const event = new CustomEvent('multipleSelect', {
        detail: {
          dates,
        } as MultipleSelectDetail,
      });

      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('update:modelDates')).toBeTruthy();
      expect(wrapper.emitted('update:modelDates')[0]).toEqual([dates]);
    });

    it('should sync modelDates prop to web component', async () => {
      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];

      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelDates: dates,
        },
      });

      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDates).toEqual(dates);
    });
  });

  describe('Event Handling', () => {
    it('should emit dateSelect event', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const testDate = new Date(2024, 0, 15);
      const detail: DateSelectDetail = {
        date: testDate,
        jalaliDate: '1402/10/25',
        gregorianDate: '2024/01/15',
        hijriDate: '1445/07/05',
      };

      const element = wrapper.vm.$refs.pickerElement as any;
      const event = new CustomEvent('dateSelect', { detail });
      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('dateSelect')).toBeTruthy();
      expect(wrapper.emitted('dateSelect')[0]).toEqual([detail]);
    });

    it('should emit rangeSelect event', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 31);
      const detail: RangeSelectDetail = {
        range: { start: startDate, end: endDate },
      };

      const element = wrapper.vm.$refs.pickerElement as any;
      const event = new CustomEvent('rangeSelect', { detail });
      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('rangeSelect')).toBeTruthy();
      expect(wrapper.emitted('rangeSelect')[0]).toEqual([detail]);
    });

    it('should emit multipleSelect event', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const dates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      const detail: MultipleSelectDetail = { dates };

      const element = wrapper.vm.$refs.pickerElement as any;
      const event = new CustomEvent('multipleSelect', { detail });
      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('multipleSelect')).toBeTruthy();
      expect(wrapper.emitted('multipleSelect')[0]).toEqual([detail]);
    });

    it('should emit localeChange event', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const detail: LocaleChangeDetail = { locale: 'en' };

      const element = wrapper.vm.$refs.pickerElement as any;
      const event = new CustomEvent('localeChange', { detail });
      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('localeChange')).toBeTruthy();
      expect(wrapper.emitted('localeChange')[0]).toEqual([detail]);
    });

    it('should emit themeChange event', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const detail: ThemeChangeDetail = { theme: 'dark' };

      const element = wrapper.vm.$refs.pickerElement as any;
      const event = new CustomEvent('themeChange', { detail });
      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('themeChange')).toBeTruthy();
      expect(wrapper.emitted('themeChange')[0]).toEqual([detail]);
    });

    it('should emit error event', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const element = wrapper.vm.$refs.pickerElement as any;
      const event = new CustomEvent('error', {
        detail: { message: 'Test error' },
      });
      element.dispatchEvent(event);
      await flushPromises();

      expect(wrapper.emitted('error')).toBeTruthy();
      expect(wrapper.emitted('error')[0][0]).toBeInstanceOf(Error);
    });
  });

  describe('Props Synchronization', () => {
    it('should sync calendarType prop', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          calendarType: 'jalali',
        },
      });

      await wrapper.setProps({ calendarType: 'gregorian' });
      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.calendarType).toBe('gregorian');
    });

    it('should sync locale prop', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          locale: 'fa',
        },
      });

      await wrapper.setProps({ locale: 'en' });
      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.locale).toBe('en');
    });

    it('should sync theme prop', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          theme: 'light',
        },
      });

      await wrapper.setProps({ theme: 'dark' });
      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.theme).toBe('dark');
    });

    it('should sync selectionMode prop', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          selectionMode: 'single',
        },
      });

      await wrapper.setProps({ selectionMode: 'range' });
      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectionMode).toBe('range');
    });

    it('should sync disabled prop', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          disabled: false,
        },
      });

      await wrapper.setProps({ disabled: true });
      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.disabled).toBe(true);
    });
  });

  describe('Exposed Methods', () => {
    it('should expose getValue method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const testDate = new Date(2024, 0, 15);
      const element = wrapper.vm.$refs.pickerElement as any;
      element.selectedDate = testDate;

      const value = wrapper.vm.getValue();
      expect(value).toBe(testDate.toISOString());
    });

    it('should expose reset method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const element = wrapper.vm.$refs.pickerElement as any;
      element.selectedDate = new Date(2024, 0, 15);

      wrapper.vm.reset();
      expect(element.selectedDate).toBeNull();
    });

    it('should expose open method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const element = wrapper.vm.$refs.pickerElement as any;
      const openSpy = vi.spyOn(element, 'open');

      wrapper.vm.open();
      expect(openSpy).toHaveBeenCalled();
    });

    it('should expose close method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const element = wrapper.vm.$refs.pickerElement as any;
      const closeSpy = vi.spyOn(element, 'close');

      wrapper.vm.close();
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should expose setDate method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const testDate = new Date(2024, 0, 15);
      wrapper.vm.setDate(testDate);

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDate).toEqual(testDate);
    });

    it('should expose setRange method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 31);
      wrapper.vm.setRange(startDate, endDate);

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedRange).toEqual({ start: startDate, end: endDate });
    });

    it('should expose addDate method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const testDate = new Date(2024, 0, 15);
      wrapper.vm.addDate(testDate);

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDates).toContain(testDate);
    });

    it('should expose removeDate method', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const testDate = new Date(2024, 0, 15);
      wrapper.vm.addDate(testDate);
      wrapper.vm.removeDate(testDate);

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDates).not.toContain(testDate);
    });
  });

  describe('Attribute Binding', () => {
    it('should bind class attribute', () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          class: 'custom-class',
        },
      });

      const element = wrapper.find('jalali-date-picker');
      expect(element.classes()).toContain('custom-class');
    });

    it('should bind style attribute', () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          style: { width: '100%', maxWidth: '400px' },
        },
      });

      const element = wrapper.find('jalali-date-picker');
      expect(element.attributes('style')).toContain('width');
    });

    it('should pass through additional attributes', () => {
      wrapper = mount(JalaliDatePickerVue, {
        attrs: {
          'data-testid': 'date-picker',
          'aria-label': 'Select a date',
        },
      });

      const element = wrapper.find('jalali-date-picker');
      expect(element.attributes('data-testid')).toBe('date-picker');
      expect(element.attributes('aria-label')).toBe('Select a date');
    });
  });

  describe('Event Listener Cleanup', () => {
    it('should remove event listeners on unmount', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const element = wrapper.vm.$refs.pickerElement as any;
      const removeEventListenerSpy = vi.spyOn(element, 'removeEventListener');

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'dateSelect',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'rangeSelect',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'multipleSelect',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'localeChange',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'themeChange',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'error',
        expect.any(Function)
      );
    });
  });

  describe('Multiple Events in Sequence', () => {
    it('should handle multiple dateSelect events', async () => {
      wrapper = mount(JalaliDatePickerVue);

      const element = wrapper.vm.$refs.pickerElement as any;

      const date1 = new Date(2024, 0, 1);
      const event1 = new CustomEvent('dateSelect', {
        detail: {
          date: date1,
          jalaliDate: '1402/10/11',
          gregorianDate: '2024/01/01',
          hijriDate: '1445/06/21',
        } as DateSelectDetail,
      });
      element.dispatchEvent(event1);
      await flushPromises();

      const date2 = new Date(2024, 0, 15);
      const event2 = new CustomEvent('dateSelect', {
        detail: {
          date: date2,
          jalaliDate: '1402/10/25',
          gregorianDate: '2024/01/15',
          hijriDate: '1445/07/05',
        } as DateSelectDetail,
      });
      element.dispatchEvent(event2);
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([date1]);
      expect(wrapper.emitted('update:modelValue')[1]).toEqual([date2]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null modelValue', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelValue: null,
        },
      });

      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDate).toBeNull();
    });

    it('should handle empty modelDates array', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelDates: [],
        },
      });

      await flushPromises();

      const element = wrapper.vm.$refs.pickerElement as any;
      expect(element.selectedDates).toEqual([]);
    });

    it('should handle undefined props gracefully', async () => {
      wrapper = mount(JalaliDatePickerVue, {
        props: {
          modelValue: undefined,
          locale: undefined,
          theme: undefined,
        },
      });

      await flushPromises();

      expect(wrapper.exists()).toBe(true);
    });
  });
});
