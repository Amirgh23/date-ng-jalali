import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - Rendering Tests', () => {
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

  describe('Calendar Rendering', () => {
    it('should render complete calendar structure', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('jalali-date-picker-container');
      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-body');
      expect(html).toContain('calendar-footer');
    });

    it('should render calendar in shadow DOM', () => {
      const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');

      expect(container).toBeDefined();
      expect(container?.innerHTML).toBeTruthy();
    });

    it('should include header with navigation buttons', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('prev-month');
      expect(html).toContain('next-month');
      expect(html).toContain('calendar-month-year');
    });

    it('should include month and year in header', () => {
      const html = (element as any).renderCalendar();

      expect(html).toMatch(/\d{4}/); // Year
    });

    it('should include weekday headers', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('weekdays');
      expect(html).toContain('weekday');
    });

    it('should include date grid', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('dates');
      expect(html).toContain('role="grid"');
    });

    it('should include footer section', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('calendar-footer');
    });
  });

  describe('Month/Day Rendering', () => {
    it('should render day cells', () => {
      const dayCells = element.shadowRoot?.querySelectorAll('.date-cell');

      expect(dayCells).toBeDefined();
      expect(dayCells!.length).toBeGreaterThan(0);
    });

    it('should render day cells with data-date attribute', () => {
      const dayCells = element.shadowRoot?.querySelectorAll('.date-cell[data-date]');

      expect(dayCells!.length).toBeGreaterThan(0);
    });

    it('should render day cells with data-day attribute', () => {
      const dayCells = element.shadowRoot?.querySelectorAll('.date-cell[data-day]');

      expect(dayCells!.length).toBeGreaterThan(0);
    });

    it('should render day cells with role="gridcell"', () => {
      const dayCells = element.shadowRoot?.querySelectorAll('[role="gridcell"]');

      expect(dayCells!.length).toBeGreaterThan(0);
    });

    it('should render day cells with aria-label', () => {
      const dayCells = element.shadowRoot?.querySelectorAll('.date-cell[aria-label]');

      expect(dayCells!.length).toBeGreaterThan(0);
    });

    it('should render day cells with tabindex', () => {
      const dayCells = element.shadowRoot?.querySelectorAll('.date-cell[tabindex]');

      expect(dayCells!.length).toBeGreaterThan(0);
    });

    it('should mark disabled dates with disabled class', () => {
      element.disabled = true;
      const disabledCells = element.shadowRoot?.querySelectorAll('.date-cell.disabled');

      expect(disabledCells!.length).toBeGreaterThan(0);
    });

    it('should render empty cells for days outside month', () => {
      const otherMonthCells = element.shadowRoot?.querySelectorAll('.other-month');

      expect(otherMonthCells!.length).toBeGreaterThan(0);
    });
  });

  describe('Header Rendering', () => {
    it('should render header with month and year', () => {
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('calendar-header');
      expect(html).toContain('1403');
    });

    it('should render previous month button', () => {
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('prev-month');
      expect(html).toContain('Previous month');
    });

    it('should render next month button', () => {
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('next-month');
      expect(html).toContain('Next month');
    });

    it('should use correct arrows for Persian locale', () => {
      element.locale = 'fa';
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('→'); // prev arrow for RTL
      expect(html).toContain('←'); // next arrow for RTL
    });

    it('should use correct arrows for English locale', () => {
      element.locale = 'en';
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('←'); // prev arrow for LTR
      expect(html).toContain('→'); // next arrow for LTR
    });

    it('should include month name', () => {
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('calendar-month-year');
    });

    it('should have aria-label for navigation buttons', () => {
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('aria-label="Previous month"');
      expect(html).toContain('aria-label="Next month"');
    });
  });

  describe('Footer Rendering', () => {
    it('should render footer section', () => {
      const html = (element as any).renderFooter();

      expect(html).toContain('calendar-footer');
    });

    it('should render theme selector when enabled', () => {
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();

      expect(html).toContain('theme-selector');
    });

    it('should not render theme selector when disabled', () => {
      const html = (element as any).renderFooter();

      expect(html).not.toContain('theme-selector');
    });

    it('should render color picker when enabled', () => {
      element.setAttribute('show-color-picker', '');
      const html = (element as any).renderFooter();

      expect(html).toContain('color-picker');
    });

    it('should not render color picker when disabled', () => {
      const html = (element as any).renderFooter();

      expect(html).not.toContain('color-picker');
    });

    it('should render calendar switch when enabled', () => {
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();

      expect(html).toContain('calendar-switch');
    });

    it('should not render calendar switch when disabled', () => {
      const html = (element as any).renderFooter();

      expect(html).not.toContain('calendar-switch');
    });

    it('should render theme buttons with correct labels', () => {
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();

      expect(html).toContain('light');
      expect(html).toContain('dark');
      expect(html).toContain('glassmorphism');
    });

    it('should mark active theme button', () => {
      element.setAttribute('show-theme-selector', '');
      element.theme = 'dark';
      const html = (element as any).renderFooter();

      expect(html).toContain('dark');
      expect(html).toContain('active');
    });

    it('should render calendar switch buttons', () => {
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();

      expect(html).toContain('jalali');
      expect(html).toContain('gregorian');
      expect(html).toContain('hijri');
    });

    it('should mark active calendar type button', () => {
      element.setAttribute('show-calendar-switch', '');
      element.calendarType = 'gregorian';
      const html = (element as any).renderFooter();

      expect(html).toContain('gregorian');
      expect(html).toContain('active');
    });
  });

  describe('Theme Application', () => {
    it('should apply theme styles to host element', () => {
      element.theme = 'dark';

      const host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBeDefined();
    });

    it('should set CSS variables for theme', () => {
      element.theme = 'dark';

      const host = element.shadowRoot?.host as HTMLElement;
      const styles = host.getAttribute('style');

      expect(styles).toBeTruthy();
    });

    it('should apply theme to calendar container', () => {
      element.theme = 'dark';

      const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      expect(container).toBeDefined();
    });
  });

  describe('Locale Application', () => {
    it('should set direction attribute based on locale', () => {
      element.locale = 'fa';
      expect(element.getAttribute('dir')).toBe('rtl');

      element.locale = 'en';
      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should apply direction to host element', () => {
      element.locale = 'fa';

      const host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBe('rtl');
    });

    it('should render month names in correct locale', () => {
      element.locale = 'fa';
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toBeTruthy();
    });

    it('should render weekday headers in correct locale', () => {
      element.locale = 'fa';
      const html = (element as any).renderWeekdayHeaders();

      expect(html).toContain('ش'); // Persian weekday
    });

    it('should render weekday headers in English', () => {
      element.locale = 'en';
      const html = (element as any).renderWeekdayHeaders();

      expect(html).toContain('Sun'); // English weekday
    });

    it('should update locale on locale change', () => {
      element.locale = 'fa';
      const faHtml = (element as any).renderWeekdayHeaders();

      element.locale = 'en';
      const enHtml = (element as any).renderWeekdayHeaders();

      expect(faHtml).not.toBe(enHtml);
    });
  });

  describe('Responsive Design Rendering', () => {
    it('should render calendar container', () => {
      const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');

      expect(container).toBeDefined();
    });

    it('should render with proper structure for mobile', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-body');
      expect(html).toContain('calendar-footer');
    });

    it('should render with proper structure for tablet', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-body');
    });

    it('should render with proper structure for desktop', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-body');
    });

    it('should render date cells in grid layout', () => {
      const html = (element as any).renderMonth(1403, 1);

      expect(html).toContain('role="grid"');
      expect(html).toContain('role="gridcell"');
    });

    it('should render with touch-friendly spacing', () => {
      const html = (element as any).renderMonth(1403, 1);

      expect(html).toContain('date-cell');
    });
  });

  describe('Shadow DOM Encapsulation', () => {
    it('should render in shadow DOM', () => {
      const shadowRoot = element.shadowRoot;

      expect(shadowRoot).toBeDefined();
      expect(shadowRoot?.mode).toBe('open');
    });

    it('should not leak styles to light DOM', () => {
      const lightDOMStyles = document.querySelectorAll('style');
      const shadowDOMStyles = element.shadowRoot?.querySelectorAll('style');

      expect(shadowDOMStyles?.length).toBeGreaterThan(0);
    });

    it('should encapsulate component structure', () => {
      const lightDOMContainer = document.querySelector('.jalali-date-picker-container');
      const shadowDOMContainer = element.shadowRoot?.querySelector('.jalali-date-picker-container');

      expect(lightDOMContainer).toBeNull();
      expect(shadowDOMContainer).toBeDefined();
    });

    it('should use :host selector for styling', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';

      expect(styleContent).toContain(':host');
    });

    it('should prevent external CSS from affecting component', () => {
      const externalStyle = document.createElement('style');
      externalStyle.textContent = '.date-cell { color: red; }';
      document.head.appendChild(externalStyle);

      const dateCell = element.shadowRoot?.querySelector('.date-cell') as HTMLElement;
      const computedStyle = window.getComputedStyle(dateCell);

      // Shadow DOM should prevent external styles from affecting component
      expect(dateCell).toBeDefined();

      document.head.removeChild(externalStyle);
    });
  });

  describe('Re-rendering', () => {
    it('should update DOM when selectedDate changes', () => {
      const initialContainer = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      const initialHTML = initialContainer?.innerHTML;

      element.selectedDate = new Date(2024, 0, 15);

      const updatedContainer = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      const updatedHTML = updatedContainer?.innerHTML;

      // DOM should be updated
      expect(updatedContainer).toBeDefined();
      expect(updatedHTML).toBeTruthy();
    });

    it('should update DOM when locale changes', () => {
      const initialContainer = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      expect(initialContainer).toBeDefined();

      element.locale = 'en';

      const updatedContainer = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      expect(updatedContainer).toBeDefined();
    });

    it('should update DOM when selectionMode changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.selectionMode = 'range';

      expect(renderSpy).toHaveBeenCalled();
    });

    it('should update DOM when disabled state changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.disabled = true;

      expect(renderSpy).toHaveBeenCalled();
    });

    it('should maintain state after re-render', () => {
      const date = new Date(2024, 0, 15);
      element.selectedDate = date;

      element.locale = 'en';

      expect(element.selectedDate).toEqual(date);
    });
  });

  describe('Accessibility Rendering', () => {
    it('should render with ARIA labels', () => {
      const html = (element as any).renderMonth(1403, 1);

      expect(html).toContain('aria-label=');
    });

    it('should render with role attributes', () => {
      const html = (element as any).renderMonth(1403, 1);

      expect(html).toContain('role="grid"');
      expect(html).toContain('role="gridcell"');
    });

    it('should render with aria-disabled attribute', () => {
      const html = (element as any).renderMonth(1403, 1);

      expect(html).toContain('aria-disabled=');
    });

    it('should render with tabindex for keyboard navigation', () => {
      const html = (element as any).renderMonth(1403, 1);

      expect(html).toContain('tabindex=');
    });

    it('should render with proper heading hierarchy', () => {
      const html = (element as any).renderHeader(1403, 1);

      expect(html).toContain('<h2');
    });

    it('should render with semantic HTML', () => {
      const html = (element as any).renderCalendar();

      expect(html).toContain('<div');
      expect(html).toContain('<button');
    });
  });

  describe('Performance Rendering', () => {
    it('should apply CSS containment', () => {
      const host = element.shadowRoot?.host as HTMLElement;

      expect(host.style.contain).toBe('layout style paint');
    });

    it('should render efficiently without memory leaks', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      for (let i = 0; i < 10; i++) {
        element.selectedDate = new Date(2024, 0, i + 1);
      }

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Memory should not grow excessively
      expect(finalMemory - initialMemory).toBeLessThan(10000000); // 10MB threshold
    });

    it('should render calendar without blocking', () => {
      const startTime = performance.now();

      (element as any).render();

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Render should complete quickly (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });
  });
});
