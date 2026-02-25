import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - Calendar Rendering', () => {
  let element: JalaliDatePickerElement;

  beforeEach(() => {
    element = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('renderCalendar()', () => {
    it('should render complete calendar structure', () => {
      const html = (element as any).renderCalendar();
      
      expect(html).toContain('jalali-date-picker-container');
      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-body');
      expect(html).toContain('calendar-footer');
    });

    it('should include header, month, and footer sections', () => {
      const html = (element as any).renderCalendar();
      
      expect(html).toContain('calendar-header');
      expect(html).toContain('calendar-month-year');
      expect(html).toContain('dates');
      expect(html).toContain('calendar-footer');
    });
  });

  describe('renderHeader()', () => {
    it('should render header with month and year', () => {
      const html = (element as any).renderHeader(1403, 1);
      
      expect(html).toContain('calendar-header');
      expect(html).toContain('1403');
      expect(html).toContain('prev-month');
      expect(html).toContain('next-month');
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

    it('should include month name in header', () => {
      const html = (element as any).renderHeader(1403, 1);
      
      expect(html).toContain('calendar-month-year');
    });
  });

  describe('renderMonth()', () => {
    it('should render month with weekday headers and dates', () => {
      const html = (element as any).renderMonth(1403, 1);
      
      expect(html).toContain('calendar-body');
      expect(html).toContain('weekdays');
      expect(html).toContain('dates');
    });

    it('should include date grid', () => {
      const html = (element as any).renderMonth(1403, 1);
      
      expect(html).toContain('role="grid"');
      expect(html).toContain('aria-label="Calendar dates"');
    });

    it('should render all days of the month', () => {
      const html = (element as any).renderMonth(1403, 1);
      
      // Jalali month 1 has 31 days
      for (let day = 1; day <= 31; day++) {
        expect(html).toContain(`>${day}<`);
      }
    });
  });

  describe('renderWeekdayHeaders()', () => {
    it('should render 7 weekday headers for Persian locale', () => {
      element.locale = 'fa';
      const html = (element as any).renderWeekdayHeaders();
      
      expect(html).toContain('ش'); // Sunday
      expect(html).toContain('ی'); // Monday
      expect(html).toContain('د'); // Tuesday
      expect(html).toContain('س'); // Wednesday
      expect(html).toContain('چ'); // Thursday
      expect(html).toContain('پ'); // Friday
      expect(html).toContain('ج'); // Saturday
    });

    it('should render 7 weekday headers for English locale', () => {
      element.locale = 'en';
      const html = (element as any).renderWeekdayHeaders();
      
      expect(html).toContain('Sun');
      expect(html).toContain('Mon');
      expect(html).toContain('Tue');
      expect(html).toContain('Wed');
      expect(html).toContain('Thu');
      expect(html).toContain('Fri');
      expect(html).toContain('Sat');
    });

    it('should include aria labels for accessibility', () => {
      const html = (element as any).renderWeekdayHeaders();
      
      expect(html).toContain('aria-label="Sunday"');
      expect(html).toContain('aria-label="Monday"');
    });
  });

  describe('renderDays()', () => {
    it('should render all days of the month', () => {
      const html = (element as any).renderDays(1403, 1, 31, 0);
      
      // Should contain 31 days
      for (let day = 1; day <= 31; day++) {
        expect(html).toContain(`>${day}<`);
      }
    });

    it('should include empty cells for days before month starts', () => {
      const html = (element as any).renderDays(1403, 1, 31, 3);
      
      // Should have 3 empty cells at the beginning
      const emptyBefore = html.match(/other-month/g);
      expect(emptyBefore).toBeTruthy();
    });

    it('should include empty cells for days after month ends', () => {
      const html = (element as any).renderDays(1403, 1, 31, 0);
      
      // 31 days + 0 empty before = 31 cells
      // 42 total cells (6 weeks) - 31 = 11 empty after
      const otherMonthCells = html.match(/other-month/g);
      expect(otherMonthCells).toBeTruthy();
    });

    it('should render 42 total cells (6 weeks)', () => {
      const html = (element as any).renderDays(1403, 1, 31, 0);
      
      const dateCells = html.match(/date-cell/g);
      expect(dateCells?.length).toBe(42);
    });
  });

  describe('renderDay()', () => {
    it('should render day cell with correct data attributes', () => {
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('date-cell');
      expect(html).toContain('data-day="15"');
      expect(html).toContain('role="gridcell"');
    });

    it('should include day number in cell', () => {
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('>15<');
    });

    it('should mark selected date with selected class', () => {
      element.selectedDate = new Date(1403, 0, 15);
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('selected');
    });

    it('should mark today with today class', () => {
      const today = new Date();
      const html = (element as any).renderDay(today.getFullYear(), today.getMonth() + 1, today.getDate());
      
      expect(html).toContain('today');
    });

    it('should mark disabled date with disabled class', () => {
      element.disabled = true;
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('disabled');
    });

    it('should include aria-label with day and month name', () => {
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('aria-label=');
      expect(html).toContain('15');
    });

    it('should set aria-disabled for disabled dates', () => {
      element.disabled = true;
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('aria-disabled="true"');
    });

    it('should set tabindex to -1 for disabled dates', () => {
      element.disabled = true;
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('tabindex="-1"');
    });

    it('should set tabindex to 0 for enabled dates', () => {
      element.disabled = false;
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('tabindex="0"');
    });
  });

  describe('renderFooter()', () => {
    it('should render empty footer when no optional controls are shown', () => {
      element.setAttribute('show-theme-selector', 'false');
      element.setAttribute('show-color-picker', 'false');
      element.setAttribute('show-calendar-switch', 'false');
      
      const html = (element as any).renderFooter();
      
      expect(html).toContain('calendar-footer');
    });

    it('should render theme selector when enabled', () => {
      element.setAttribute('show-theme-selector', 'true');
      
      const html = (element as any).renderFooter();
      
      expect(html).toContain('theme-selector');
      expect(html).toContain('theme-selector-buttons');
    });

    it('should render color picker when enabled', () => {
      element.setAttribute('show-color-picker', 'true');
      
      const html = (element as any).renderFooter();
      
      expect(html).toContain('color-picker');
      expect(html).toContain('color-picker-input');
    });

    it('should render calendar switch when enabled', () => {
      element.setAttribute('show-calendar-switch', 'true');
      
      const html = (element as any).renderFooter();
      
      expect(html).toContain('calendar-switch');
      expect(html).toContain('calendar-switch-buttons');
    });

    it('should use Persian labels for Persian locale', () => {
      element.locale = 'fa';
      element.setAttribute('show-theme-selector', 'true');
      element.setAttribute('show-color-picker', 'true');
      element.setAttribute('show-calendar-switch', 'true');
      
      const html = (element as any).renderFooter();
      
      expect(html).toContain('تم:');
      expect(html).toContain('رنگ:');
      expect(html).toContain('تقویم:');
    });

    it('should use English labels for English locale', () => {
      element.locale = 'en';
      element.setAttribute('show-theme-selector', 'true');
      element.setAttribute('show-color-picker', 'true');
      element.setAttribute('show-calendar-switch', 'true');
      
      const html = (element as any).renderFooter();
      
      expect(html).toContain('Theme:');
      expect(html).toContain('Color:');
      expect(html).toContain('Calendar:');
    });
  });

  describe('renderThemeButtons()', () => {
    it('should render theme buttons', () => {
      const html = (element as any).renderThemeButtons();
      
      expect(html).toContain('light');
      expect(html).toContain('dark');
      expect(html).toContain('glassmorphism');
    });

    it('should mark active theme with active class', () => {
      element.theme = 'dark';
      const html = (element as any).renderThemeButtons();
      
      expect(html).toContain('data-theme="dark"');
      expect(html).toContain('active');
    });

    it('should include data-theme attribute for each button', () => {
      const html = (element as any).renderThemeButtons();
      
      expect(html).toContain('data-theme="light"');
      expect(html).toContain('data-theme="dark"');
      expect(html).toContain('data-theme="glassmorphism"');
    });
  });

  describe('renderCalendarSwitchButtons()', () => {
    it('should render calendar type buttons', () => {
      const html = (element as any).renderCalendarSwitchButtons();
      
      expect(html).toContain('جلالی');
      expect(html).toContain('میلادی');
      expect(html).toContain('قمری');
    });

    it('should mark active calendar type with active class', () => {
      element.calendarType = 'gregorian';
      const html = (element as any).renderCalendarSwitchButtons();
      
      expect(html).toContain('data-type="gregorian"');
      expect(html).toContain('active');
    });

    it('should include data-type attribute for each button', () => {
      const html = (element as any).renderCalendarSwitchButtons();
      
      expect(html).toContain('data-type="jalali"');
      expect(html).toContain('data-type="gregorian"');
      expect(html).toContain('data-type="hijri"');
    });
  });

  describe('render() integration', () => {
    it('should render complete calendar in shadow DOM', (done) => {
      setTimeout(() => {
        const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');
        expect(container).toBeTruthy();
        expect(container?.innerHTML).toContain('calendar-header');
        expect(container?.innerHTML).toContain('calendar-body');
        done();
      }, 100);
    });

    it('should update calendar when selectedDate changes', (done) => {
      const testDate = new Date(2024, 0, 15);
      element.selectedDate = testDate;

      setTimeout(() => {
        const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');
        expect(container?.innerHTML).toContain('selected');
        done();
      }, 100);
    });

    it('should update calendar when locale changes', (done) => {
      element.locale = 'en';

      setTimeout(() => {
        const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');
        expect(container?.innerHTML).toContain('Sun');
        done();
      }, 100);
    });

    it('should update calendar when theme changes', (done) => {
      element.theme = 'dark';

      setTimeout(() => {
        const host = element.shadowRoot?.host as HTMLElement;
        expect(host.style.getPropertyValue('--primary-color')).toBeTruthy();
        done();
      }, 100);
    });
  });

  describe('Rendering Performance', () => {
    it('should render calendar within reasonable time', () => {
      const startTime = performance.now();
      (element as any).renderCalendar();
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100); // Should render in less than 100ms
    });

    it('should render day cell efficiently', () => {
      const startTime = performance.now();
      for (let i = 1; i <= 31; i++) {
        (element as any).renderDay(1403, 1, i);
      }
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50); // Should render 31 days in less than 50ms
    });
  });

  describe('Accessibility', () => {
    it('should include proper ARIA labels for calendar grid', () => {
      const html = (element as any).renderMonth(1403, 1);
      
      expect(html).toContain('role="grid"');
      expect(html).toContain('aria-label="Calendar dates"');
    });

    it('should include proper ARIA labels for date cells', () => {
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('role="gridcell"');
      expect(html).toContain('aria-label=');
    });

    it('should include aria-disabled for disabled dates', () => {
      element.disabled = true;
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('aria-disabled="true"');
    });

    it('should include proper tabindex for keyboard navigation', () => {
      const html = (element as any).renderDay(1403, 1, 15);
      
      expect(html).toContain('tabindex=');
    });
  });
});
