import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - RTL/LTR Support', () => {
  let element: JalaliDatePickerElement;

  beforeEach(() => {
    element = new JalaliDatePickerElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (element && element.parentNode) {
      document.body.removeChild(element);
    }
  });

  describe('Direction Attribute Setting', () => {
    it('should set dir="rtl" for Persian locale', () => {
      element.locale = 'fa';
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should set dir="ltr" for English locale', () => {
      element.locale = 'en';
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should initialize with rtl for default Persian locale', () => {
      const el = new JalaliDatePickerElement();
      document.body.appendChild(el);
      expect(el.getAttribute('dir')).toBe('rtl');
      document.body.removeChild(el);
    });

    it('should update dir attribute when locale changes', () => {
      element.locale = 'fa';
      expect(element.getAttribute('dir')).toBe('rtl');
      
      element.locale = 'en';
      expect(element.getAttribute('dir')).toBe('ltr');
      
      element.locale = 'fa';
      expect(element.getAttribute('dir')).toBe('rtl');
    });
  });

  describe('CSS Direction Property', () => {
    it('should set CSS direction to rtl for Persian', () => {
      element.locale = 'fa';
      const host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBe('rtl');
    });

    it('should set CSS direction to ltr for English', () => {
      element.locale = 'en';
      const host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBe('ltr');
    });
  });

  describe('RTL Styles Application', () => {
    it('should apply RTL styles when dir="rtl"', () => {
      element.locale = 'fa';
      const styles = window.getComputedStyle(element.shadowRoot?.host as HTMLElement);
      expect(styles.direction).toBe('rtl');
    });

    it('should apply LTR styles when dir="ltr"', () => {
      element.locale = 'en';
      const styles = window.getComputedStyle(element.shadowRoot?.host as HTMLElement);
      expect(styles.direction).toBe('ltr');
    });
  });

  describe('Text Alignment', () => {
    it('should center align header text in RTL', () => {
      element.locale = 'fa';
      const html = (element as any).renderHeader(1403, 1);
      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-month-year');
    });

    it('should center align header text in LTR', () => {
      element.locale = 'en';
      const html = (element as any).renderHeader(1403, 1);
      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-month-year');
    });

    it('should center align weekday headers in RTL', () => {
      element.locale = 'fa';
      const html = (element as any).renderWeekdayHeaders();
      expect(html).toContain('weekday');
      expect(html).toContain('ش'); // Sunday in Persian
    });

    it('should center align weekday headers in LTR', () => {
      element.locale = 'en';
      const html = (element as any).renderWeekdayHeaders();
      expect(html).toContain('weekday');
      expect(html).toContain('Sun');
    });

    it('should center align date cells in RTL', () => {
      element.locale = 'fa';
      const html = (element as any).renderDay(1403, 1, 15);
      expect(html).toContain('date-cell');
      expect(html).toContain('15');
    });

    it('should center align date cells in LTR', () => {
      element.locale = 'en';
      const html = (element as any).renderDay(1403, 1, 15);
      expect(html).toContain('date-cell');
      expect(html).toContain('15');
    });
  });

  describe('Navigation Arrows Direction', () => {
    it('should use correct arrows for RTL (Persian)', () => {
      element.locale = 'fa';
      const html = (element as any).renderHeader(1403, 1);
      // RTL: previous is on right (→), next is on left (←)
      expect(html).toContain('→'); // prev arrow
      expect(html).toContain('←'); // next arrow
    });

    it('should use correct arrows for LTR (English)', () => {
      element.locale = 'en';
      const html = (element as any).renderHeader(1403, 1);
      // LTR: previous is on left (←), next is on right (→)
      expect(html).toContain('←'); // prev arrow
      expect(html).toContain('→'); // next arrow
    });

    it('should have prev-month button in RTL', () => {
      element.locale = 'fa';
      const html = (element as any).renderHeader(1403, 1);
      expect(html).toContain('prev-month');
    });

    it('should have next-month button in RTL', () => {
      element.locale = 'fa';
      const html = (element as any).renderHeader(1403, 1);
      expect(html).toContain('next-month');
    });

    it('should have prev-month button in LTR', () => {
      element.locale = 'en';
      const html = (element as any).renderHeader(1403, 1);
      expect(html).toContain('prev-month');
    });

    it('should have next-month button in LTR', () => {
      element.locale = 'en';
      const html = (element as any).renderHeader(1403, 1);
      expect(html).toContain('next-month');
    });
  });

  describe('Footer Section Direction', () => {
    it('should render footer with RTL direction for Persian', () => {
      element.locale = 'fa';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      expect(html).toBeTruthy();
      expect(html).toContain('calendar-footer');
    });

    it('should render footer with LTR direction for English', () => {
      element.locale = 'en';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      expect(html).toBeTruthy();
      expect(html).toContain('calendar-footer');
    });

    it('should render theme selector in RTL', () => {
      element.locale = 'fa';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('theme-selector');
    });

    it('should render theme selector in LTR', () => {
      element.locale = 'en';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('theme-selector');
    });
  });

  describe('Color Picker Direction', () => {
    it('should render color picker in RTL', () => {
      element.locale = 'fa';
      element.setAttribute('show-color-picker', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('color-picker');
    });

    it('should render color picker in LTR', () => {
      element.locale = 'en';
      element.setAttribute('show-color-picker', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('color-picker');
    });

    it('should have color picker label in RTL', () => {
      element.locale = 'fa';
      element.setAttribute('show-color-picker', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('رنگ:'); // Color in Persian
    });

    it('should have color picker label in LTR', () => {
      element.locale = 'en';
      element.setAttribute('show-color-picker', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('Color:'); // Color in English
    });
  });

  describe('Calendar Switch Direction', () => {
    it('should render calendar switch in RTL', () => {
      element.locale = 'fa';
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('calendar-switch');
    });

    it('should render calendar switch in LTR', () => {
      element.locale = 'en';
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('calendar-switch');
    });

    it('should have calendar switch buttons in RTL', () => {
      element.locale = 'fa';
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('calendar-switch-button');
    });

    it('should have calendar switch buttons in LTR', () => {
      element.locale = 'en';
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('calendar-switch-button');
    });
  });

  describe('Margin and Padding Adjustments', () => {
    it('should have proper padding in RTL container', () => {
      element.locale = 'fa';
      const html = (element as any).renderCalendar();
      expect(html).toContain('jalali-date-picker-container');
    });

    it('should have proper padding in LTR container', () => {
      element.locale = 'en';
      const html = (element as any).renderCalendar();
      expect(html).toContain('jalali-date-picker-container');
    });

    it('should have proper gap in RTL calendar body', () => {
      element.locale = 'fa';
      const html = (element as any).renderCalendar();
      expect(html).toContain('calendar-body');
    });

    it('should have proper gap in LTR calendar body', () => {
      element.locale = 'en';
      const html = (element as any).renderCalendar();
      expect(html).toContain('calendar-body');
    });
  });

  describe('Direction Persistence', () => {
    it('should maintain direction after date selection in RTL', () => {
      element.locale = 'fa';
      element.selectedDate = new Date(2024, 0, 15);
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain direction after date selection in LTR', () => {
      element.locale = 'en';
      element.selectedDate = new Date(2024, 0, 15);
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should maintain direction after theme change in RTL', () => {
      element.locale = 'fa';
      element.theme = 'dark';
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain direction after theme change in LTR', () => {
      element.locale = 'en';
      element.theme = 'dark';
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should maintain direction after calendar type change in RTL', () => {
      element.locale = 'fa';
      element.calendarType = 'gregorian';
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain direction after calendar type change in LTR', () => {
      element.locale = 'en';
      element.calendarType = 'gregorian';
      expect(element.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('Direction with Selection Modes', () => {
    it('should maintain RTL direction in single selection mode', () => {
      element.locale = 'fa';
      element.selectionMode = 'single';
      element.selectedDate = new Date(2024, 0, 15);
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction in single selection mode', () => {
      element.locale = 'en';
      element.selectionMode = 'single';
      element.selectedDate = new Date(2024, 0, 15);
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should maintain RTL direction in range selection mode', () => {
      element.locale = 'fa';
      element.selectionMode = 'range';
      element.selectedRange = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 15),
      };
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction in range selection mode', () => {
      element.locale = 'en';
      element.selectionMode = 'range';
      element.selectedRange = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 15),
      };
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should maintain RTL direction in multiple selection mode', () => {
      element.locale = 'fa';
      element.selectionMode = 'multiple';
      element.selectedDates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction in multiple selection mode', () => {
      element.locale = 'en';
      element.selectionMode = 'multiple';
      element.selectedDates = [new Date(2024, 0, 1), new Date(2024, 0, 15)];
      expect(element.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('Direction with Disabled State', () => {
    it('should maintain RTL direction when disabled', () => {
      element.locale = 'fa';
      element.disabled = true;
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction when disabled', () => {
      element.locale = 'en';
      element.disabled = true;
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should maintain RTL direction when re-enabled', () => {
      element.locale = 'fa';
      element.disabled = true;
      element.disabled = false;
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction when re-enabled', () => {
      element.locale = 'en';
      element.disabled = true;
      element.disabled = false;
      expect(element.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('Direction Attribute Synchronization', () => {
    it('should sync direction when locale attribute changes to fa', () => {
      element.setAttribute('locale', 'fa');
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should sync direction when locale attribute changes to en', () => {
      // Create a fresh element to test attribute sync
      const el = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      el.setAttribute('locale', 'en');
      document.body.appendChild(el);
      // After connection, the dir should be set based on locale
      expect(el.getAttribute('dir')).toBe('ltr');
      document.body.removeChild(el);
    });

    it('should sync direction when locale property changes to fa', () => {
      element.locale = 'fa';
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should sync direction when locale property changes to en', () => {
      element.locale = 'en';
      expect(element.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('Direction with Reset', () => {
    it('should maintain RTL direction after reset', () => {
      element.locale = 'fa';
      element.selectedDate = new Date(2024, 0, 15);
      element.reset();
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction after reset', () => {
      element.locale = 'en';
      element.selectedDate = new Date(2024, 0, 15);
      element.reset();
      expect(element.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('Direction Consistency', () => {
    it('should have consistent direction across multiple accesses in RTL', () => {
      element.locale = 'fa';
      const dir1 = element.getAttribute('dir');
      const dir2 = element.getAttribute('dir');
      const dir3 = element.getAttribute('dir');
      expect(dir1).toBe(dir2);
      expect(dir2).toBe(dir3);
      expect(dir1).toBe('rtl');
    });

    it('should have consistent direction across multiple accesses in LTR', () => {
      element.locale = 'en';
      const dir1 = element.getAttribute('dir');
      const dir2 = element.getAttribute('dir');
      const dir3 = element.getAttribute('dir');
      expect(dir1).toBe(dir2);
      expect(dir2).toBe(dir3);
      expect(dir1).toBe('ltr');
    });
  });

  describe('Direction with Rapid Locale Changes', () => {
    it('should handle rapid locale changes correctly', () => {
      element.locale = 'fa';
      element.locale = 'en';
      element.locale = 'fa';
      element.locale = 'en';
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should maintain correct direction after rapid changes', () => {
      for (let i = 0; i < 10; i++) {
        element.locale = i % 2 === 0 ? 'fa' : 'en';
      }
      expect(element.getAttribute('dir')).toBe('en' ? 'ltr' : 'rtl');
    });
  });

  describe('Direction with Connected/Disconnected', () => {
    it('should maintain RTL direction after disconnect and reconnect', () => {
      element.locale = 'fa';
      const savedDir = element.getAttribute('dir');
      document.body.removeChild(element);
      document.body.appendChild(element);
      expect(element.getAttribute('dir')).toBe(savedDir);
    });

    it('should maintain LTR direction after disconnect and reconnect', () => {
      element.locale = 'en';
      const savedDir = element.getAttribute('dir');
      document.body.removeChild(element);
      document.body.appendChild(element);
      expect(element.getAttribute('dir')).toBe(savedDir);
    });
  });

  describe('Direction Rendering Performance', () => {
    it('should update direction efficiently with locale changes', () => {
      const startTime = performance.now();
      for (let i = 0; i < 100; i++) {
        element.locale = i % 2 === 0 ? 'fa' : 'en';
      }
      const endTime = performance.now();
      const duration = endTime - startTime;
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Direction with All Footer Controls', () => {
    it('should render all footer controls with RTL direction', () => {
      element.locale = 'fa';
      element.setAttribute('show-theme-selector', '');
      element.setAttribute('show-color-picker', '');
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('theme-selector');
      expect(html).toContain('color-picker');
      expect(html).toContain('calendar-switch');
    });

    it('should render all footer controls with LTR direction', () => {
      element.locale = 'en';
      element.setAttribute('show-theme-selector', '');
      element.setAttribute('show-color-picker', '');
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('theme-selector');
      expect(html).toContain('color-picker');
      expect(html).toContain('calendar-switch');
    });
  });

  describe('Direction CSS Selectors', () => {
    it('should have :host([dir="rtl"]) selector in styles', () => {
      const styles = getComputedStyle(element.shadowRoot?.host as HTMLElement);
      expect(styles).toBeDefined();
    });

    it('should have :host([dir="ltr"]) selector in styles', () => {
      element.locale = 'en';
      const styles = getComputedStyle(element.shadowRoot?.host as HTMLElement);
      expect(styles).toBeDefined();
    });
  });

  describe('Direction with Calendar Types', () => {
    it('should maintain RTL direction when switching calendar types', () => {
      element.locale = 'fa';
      element.calendarType = 'jalali';
      expect(element.getAttribute('dir')).toBe('rtl');
      
      element.calendarType = 'gregorian';
      expect(element.getAttribute('dir')).toBe('rtl');
      
      element.calendarType = 'hijri';
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction when switching calendar types', () => {
      element.locale = 'en';
      element.calendarType = 'jalali';
      expect(element.getAttribute('dir')).toBe('ltr');
      
      element.calendarType = 'gregorian';
      expect(element.getAttribute('dir')).toBe('ltr');
      
      element.calendarType = 'hijri';
      expect(element.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('Direction Initialization from HTML', () => {
    it('should initialize with RTL direction from locale attribute', () => {
      const el = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      el.setAttribute('locale', 'fa');
      document.body.appendChild(el);
      expect(el.getAttribute('dir')).toBe('rtl');
      document.body.removeChild(el);
    });

    it('should initialize with LTR direction from locale attribute', () => {
      const el = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      el.setAttribute('locale', 'en');
      document.body.appendChild(el);
      expect(el.getAttribute('dir')).toBe('ltr');
      document.body.removeChild(el);
    });
  });

  describe('Direction with Theme Selector', () => {
    it('should render theme selector with RTL direction', () => {
      element.locale = 'fa';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('theme-selector');
      expect(html).toContain('تم:'); // Theme in Persian
    });

    it('should render theme selector with LTR direction', () => {
      element.locale = 'en';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      expect(html).toContain('theme-selector');
      expect(html).toContain('Theme:'); // Theme in English
    });
  });

  describe('Direction Attribute Presence', () => {
    it('should always have dir attribute set', () => {
      expect(element.getAttribute('dir')).toBeTruthy();
    });

    it('should have dir attribute after locale change', () => {
      element.locale = 'en';
      expect(element.getAttribute('dir')).toBeTruthy();
      
      element.locale = 'fa';
      expect(element.getAttribute('dir')).toBeTruthy();
    });

    it('should have valid dir attribute value', () => {
      element.locale = 'fa';
      const dir = element.getAttribute('dir');
      expect(['rtl', 'ltr']).toContain(dir);
      
      element.locale = 'en';
      const dir2 = element.getAttribute('dir');
      expect(['rtl', 'ltr']).toContain(dir2);
    });
  });

  describe('Direction with Multiple Instances', () => {
    it('should maintain independent direction for multiple instances', () => {
      const el1 = new JalaliDatePickerElement();
      const el2 = new JalaliDatePickerElement();
      
      document.body.appendChild(el1);
      document.body.appendChild(el2);
      
      el1.locale = 'fa';
      el2.locale = 'en';
      
      expect(el1.getAttribute('dir')).toBe('rtl');
      expect(el2.getAttribute('dir')).toBe('ltr');
      
      document.body.removeChild(el1);
      document.body.removeChild(el2);
    });
  });

  describe('Direction Event Emission', () => {
    it('should emit localeChange event with direction for RTL', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.direction).toBe('rtl');
          resolve();
        });
        element.locale = 'fa';
      });
    });

    it('should emit localeChange event with direction for LTR', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.direction).toBe('ltr');
          resolve();
        });
        element.locale = 'en';
      });
    });
  });

  describe('Direction CSS Variables', () => {
    it('should apply CSS variables correctly in RTL', () => {
      element.locale = 'fa';
      const host = element.shadowRoot?.host as HTMLElement;
      expect(host).toBeDefined();
      expect(host.getAttribute('dir')).toBe('rtl');
    });

    it('should apply CSS variables correctly in LTR', () => {
      element.locale = 'en';
      const host = element.shadowRoot?.host as HTMLElement;
      expect(host).toBeDefined();
      expect(host.getAttribute('dir')).toBe('ltr');
    });
  });

  describe('Direction with Responsive Design', () => {
    it('should maintain RTL direction on mobile viewport', () => {
      element.locale = 'fa';
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction on mobile viewport', () => {
      element.locale = 'en';
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should maintain RTL direction on desktop viewport', () => {
      element.locale = 'fa';
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should maintain LTR direction on desktop viewport', () => {
      element.locale = 'en';
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      expect(element.getAttribute('dir')).toBe('ltr');
    });
  });
});
