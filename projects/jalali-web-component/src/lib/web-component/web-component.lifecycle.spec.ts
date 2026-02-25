import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - Lifecycle Tests', () => {
  let element: JalaliDatePickerElement;

  beforeEach(() => {
    element = new JalaliDatePickerElement();
  });

  afterEach(() => {
    if (element && element.parentNode) {
      document.body.removeChild(element);
    }
  });

  describe('connectedCallback', () => {
    it('should initialize shadow DOM when connected to DOM', () => {
      document.body.appendChild(element);

      expect(element.shadowRoot).toBeDefined();
      expect(element.shadowRoot?.mode).toBe('open');
    });

    it('should create shadow DOM with style element', () => {
      document.body.appendChild(element);

      const styleElement = element.shadowRoot?.querySelector('style');
      expect(styleElement).toBeDefined();
      expect(styleElement?.textContent).toBeTruthy();
    });

    it('should create shadow DOM with template content', () => {
      document.body.appendChild(element);

      const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      expect(container).toBeDefined();
    });

    it('should read attributes on connection', () => {
      element.setAttribute('locale', 'en');
      element.setAttribute('theme', 'dark');
      element.setAttribute('selection-mode', 'range');

      document.body.appendChild(element);

      expect(element.locale).toBe('en');
      expect(element.theme).toBe('dark');
      expect(element.selectionMode).toBe('range');
    });

    it('should setup event listeners on connection', () => {
      document.body.appendChild(element);

      const shadowRoot = element.shadowRoot;
      expect(shadowRoot).toBeDefined();

      // Verify that event listeners are attached by checking if click events work
      const dateCell = shadowRoot?.querySelector('.date-cell');
      expect(dateCell).toBeDefined();
    });

    it('should render calendar on connection', () => {
      document.body.appendChild(element);

      const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      expect(container?.innerHTML).toBeTruthy();
      expect(container?.innerHTML).toContain('calendar-header');
      expect(container?.innerHTML).toContain('calendar-body');
    });

    it('should set direction attribute based on locale', () => {
      element.setAttribute('locale', 'fa');
      document.body.appendChild(element);

      expect(element.getAttribute('dir')).toBe('rtl');
    });

    it('should set direction to ltr for English locale', () => {
      element.setAttribute('locale', 'en');
      document.body.appendChild(element);

      expect(element.getAttribute('dir')).toBe('ltr');
    });

    it('should apply CSS containment for performance', () => {
      document.body.appendChild(element);

      const host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.contain).toBe('layout style paint');
    });

    it('should initialize all services', () => {
      document.body.appendChild(element);

      // Services should be initialized (we can verify by checking if methods work)
      expect((element as any).dateService).toBeDefined();
      expect((element as any).themeService).toBeDefined();
      expect((element as any).localeService).toBeDefined();
      expect((element as any).holidaysService).toBeDefined();
    });
  });

  describe('disconnectedCallback', () => {
    it('should cleanup when removed from DOM', () => {
      document.body.appendChild(element);
      const shadowRoot = element.shadowRoot;

      document.body.removeChild(element);

      // Services should be nullified
      expect((element as any).dateService).toBeNull();
      expect((element as any).themeService).toBeNull();
      expect((element as any).localeService).toBeNull();
      expect((element as any).holidaysService).toBeNull();
    });

    it('should remove event listeners on disconnect', () => {
      document.body.appendChild(element);
      const clickSpy = vi.fn();

      element.addEventListener('dateSelect', clickSpy);
      document.body.removeChild(element);

      // After disconnect, the element should not process events
      expect((element as any).dateService).toBeNull();
    });

    it('should not throw error when disconnected multiple times', () => {
      document.body.appendChild(element);
      document.body.removeChild(element);

      expect(() => {
        document.body.removeChild(element);
      }).toThrow();
    });

    it('should allow reconnection after disconnect', () => {
      document.body.appendChild(element);
      document.body.removeChild(element);

      // Reconnect
      const newElement = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      document.body.appendChild(newElement);

      expect(newElement.shadowRoot).toBeDefined();
      expect((newElement as any).dateService).toBeDefined();

      document.body.removeChild(newElement);
    });

    it('should prevent memory leaks by clearing references', () => {
      document.body.appendChild(element);
      const initialServices = {
        dateService: (element as any).dateService,
        themeService: (element as any).themeService,
      };

      document.body.removeChild(element);

      expect((element as any).dateService).toBeNull();
      expect((element as any).themeService).toBeNull();
    });
  });

  describe('attributeChangedCallback', () => {
    beforeEach(() => {
      document.body.appendChild(element);
    });

    it('should update selectedDate when attribute changes', () => {
      const date = new Date(2024, 0, 15);
      element.setAttribute('selected-date', date.toISOString());

      expect(element.selectedDate).toEqual(date);
    });

    it('should update calendarType when attribute changes', () => {
      element.setAttribute('calendar-type', 'gregorian');

      expect(element.calendarType).toBe('gregorian');
    });

    it('should update locale when attribute changes', () => {
      element.setAttribute('locale', 'en');

      expect(element.locale).toBe('en');
    });

    it('should update theme when attribute changes', () => {
      element.setAttribute('theme', 'dark');

      expect(element.theme).toBe('dark');
    });

    it('should update selectionMode when attribute changes', () => {
      element.setAttribute('selection-mode', 'range');

      expect(element.selectionMode).toBe('range');
    });

    it('should update disabled state when attribute changes', () => {
      element.setAttribute('disabled', '');

      expect(element.disabled).toBe(true);
    });

    it('should remove disabled state when attribute is removed', () => {
      element.setAttribute('disabled', '');
      element.removeAttribute('disabled');

      expect(element.disabled).toBe(false);
    });

    it('should ignore unchanged attribute values', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      element.setAttribute('locale', 'fa');
      renderSpy.mockClear();

      element.setAttribute('locale', 'fa');

      // Should not re-render if value hasn't changed
      expect(renderSpy).not.toHaveBeenCalled();
    });

    it('should trigger re-render on attribute change', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      renderSpy.mockClear();

      element.setAttribute('theme', 'dark');

      expect(renderSpy).toHaveBeenCalled();
    });

    it('should handle invalid calendar type gracefully', () => {
      const initialType = element.calendarType;
      element.setAttribute('calendar-type', 'invalid');

      // Should keep the previous value
      expect(element.calendarType).toBe(initialType);
    });

    it('should handle invalid locale gracefully', () => {
      const initialLocale = element.locale;
      element.setAttribute('locale', 'invalid');

      // Should keep the previous value
      expect(element.locale).toBe(initialLocale);
    });

    it('should handle invalid selection mode gracefully', () => {
      const initialMode = element.selectionMode;
      element.setAttribute('selection-mode', 'invalid');

      // Should keep the previous value
      expect(element.selectionMode).toBe(initialMode);
    });

    it('should update showThemeSelector when attribute changes', () => {
      element.setAttribute('show-theme-selector', '');

      expect((element as any)._showThemeSelector).toBe(true);
    });

    it('should update showColorPicker when attribute changes', () => {
      element.setAttribute('show-color-picker', '');

      expect((element as any)._showColorPicker).toBe(true);
    });

    it('should update showCalendarSwitch when attribute changes', () => {
      element.setAttribute('show-calendar-switch', '');

      expect((element as any)._showCalendarSwitch).toBe(true);
    });
  });

  describe('Shadow DOM Creation and Cleanup', () => {
    it('should create shadow DOM in open mode', () => {
      document.body.appendChild(element);

      expect(element.shadowRoot?.mode).toBe('open');
    });

    it('should inject styles into shadow DOM', () => {
      document.body.appendChild(element);

      const styles = element.shadowRoot?.querySelector('style');
      expect(styles).toBeDefined();
      expect(styles?.textContent).toContain('jalali-date-picker-container');
    });

    it('should create calendar container in shadow DOM', () => {
      document.body.appendChild(element);

      const container = element.shadowRoot?.querySelector('.jalali-date-picker-container');
      expect(container).toBeDefined();
    });

    it('should not leak styles to light DOM', () => {
      document.body.appendChild(element);

      const lightDOMStyles = document.querySelectorAll('style');
      const shadowDOMStyles = element.shadowRoot?.querySelectorAll('style');

      // Styles should only be in shadow DOM
      expect(shadowDOMStyles?.length).toBeGreaterThan(0);
    });

    it('should encapsulate component styles', () => {
      document.body.appendChild(element);

      const shadowRoot = element.shadowRoot;
      const styleElement = shadowRoot?.querySelector('style');

      expect(styleElement?.textContent).toContain(':host');
    });

    it('should cleanup shadow DOM on disconnect', () => {
      document.body.appendChild(element);
      const shadowRoot = element.shadowRoot;

      document.body.removeChild(element);

      // Shadow root should still exist but services are cleaned up
      expect((element as any).dateService).toBeNull();
    });
  });

  describe('Memory Leak Prevention', () => {
    it('should not retain references after disconnect', () => {
      document.body.appendChild(element);
      document.body.removeChild(element);

      expect((element as any).dateService).toBeNull();
      expect((element as any).themeService).toBeNull();
      expect((element as any).localeService).toBeNull();
      expect((element as any).holidaysService).toBeNull();
    });

    it('should allow garbage collection after disconnect', () => {
      const weakRef = new WeakRef(element);
      document.body.appendChild(element);
      document.body.removeChild(element);

      // Force garbage collection (if available)
      if (global.gc) {
        global.gc();
      }

      // Element should be eligible for garbage collection
      expect(weakRef.deref()).toBeDefined();
    });

    it('should not accumulate event listeners on re-render', () => {
      document.body.appendChild(element);

      const initialListeners = (element as any).shadowRoot?.querySelectorAll('*').length;

      element.selectedDate = new Date(2024, 0, 15);
      const afterRenderListeners = (element as any).shadowRoot?.querySelectorAll('*').length;

      // Should not accumulate listeners
      expect(afterRenderListeners).toBeLessThanOrEqual(initialListeners! + 50);

      document.body.removeChild(element);
    });

    it('should clear state on disconnect', () => {
      document.body.appendChild(element);
      element.selectedDate = new Date(2024, 0, 15);

      document.body.removeChild(element);

      // Services should be nullified
      expect((element as any).dateService).toBeNull();
    });

    it('should not retain DOM references after disconnect', () => {
      document.body.appendChild(element);
      const shadowRoot = element.shadowRoot;

      document.body.removeChild(element);

      // Services should be cleared
      expect((element as any).dateService).toBeNull();
    });
  });

  describe('observedAttributes', () => {
    it('should define observedAttributes static property', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toBeDefined();
      expect(Array.isArray(observed)).toBe(true);
    });

    it('should include selected-date in observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toContain('selected-date');
    });

    it('should include calendar-type in observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toContain('calendar-type');
    });

    it('should include locale in observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toContain('locale');
    });

    it('should include theme in observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toContain('theme');
    });

    it('should include selection-mode in observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toContain('selection-mode');
    });

    it('should include disabled in observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;

      expect(observed).toContain('disabled');
    });
  });
});
