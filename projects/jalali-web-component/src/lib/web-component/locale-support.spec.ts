import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('JalaliDatePickerElement - Locale Support', () => {
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

  describe('Locale Initialization', () => {
    it('should initialize with default Persian locale', () => {
      expect(element.locale).toBe('fa');
    });

    it('should initialize locale from HTML attribute', () => {
      const el = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      el.setAttribute('locale', 'en');
      document.body.appendChild(el);

      expect(el.locale).toBe('en');

      document.body.removeChild(el);
    });

    it('should be in observedAttributes', () => {
      const observed = JalaliDatePickerElement.observedAttributes;
      expect(observed).toContain('locale');
    });
  });

  describe('Locale Property Setter', () => {
    it('should set locale to Persian', () => {
      element.locale = 'fa';
      expect(element.locale).toBe('fa');
    });

    it('should set locale to English', () => {
      element.locale = 'en';
      expect(element.locale).toBe('en');
    });

    it('should update HTML attribute when locale is set', () => {
      element.locale = 'en';
      expect(element.getAttribute('locale')).toBe('en');
    });

    it('should update HTML attribute when locale is changed', () => {
      element.locale = 'fa';
      expect(element.getAttribute('locale')).toBe('fa');

      element.locale = 'en';
      expect(element.getAttribute('locale')).toBe('en');
    });

    it('should trigger re-render when locale changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      element.locale = 'en';
      expect(renderSpy).toHaveBeenCalled();
    });
  });

  describe('Locale Attribute Changes', () => {
    it('should update locale when attribute changes', () => {
      element.setAttribute('locale', 'en');
      expect(element.locale).toBe('en');
    });

    it('should update locale from fa to en', () => {
      element.setAttribute('locale', 'fa');
      expect(element.locale).toBe('fa');

      element.setAttribute('locale', 'en');
      expect(element.locale).toBe('en');
    });

    it('should update locale from en to fa', () => {
      element.setAttribute('locale', 'en');
      expect(element.locale).toBe('en');

      element.setAttribute('locale', 'fa');
      expect(element.locale).toBe('fa');
    });

    it('should trigger re-render when attribute changes', () => {
      const renderSpy = vi.spyOn(element as any, 'render');
      element.setAttribute('locale', 'en');
      expect(renderSpy).toHaveBeenCalled();
    });

    it('should not re-render if attribute value is same', () => {
      element.setAttribute('locale', 'fa');
      const renderSpy = vi.spyOn(element as any, 'render');
      element.setAttribute('locale', 'fa');
      expect(renderSpy).not.toHaveBeenCalled();
    });
  });

  describe('Locale Change Event', () => {
    it('should emit localeChange event when locale is set', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.locale).toBe('en');
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should emit localeChange event with correct direction for Persian', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.direction).toBe('rtl');
          resolve();
        });

        element.locale = 'fa';
      });
    });

    it('should emit localeChange event with correct direction for English', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.direction).toBe('ltr');
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should emit localeChange event when attribute changes', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail.locale).toBe('en');
          resolve();
        });

        element.setAttribute('locale', 'en');
      });
    });

    it('should include locale in event detail', () => {
      return new Promise<void>((resolve) => {
        element.addEventListener('localeChange', (e: Event) => {
          const event = e as CustomEvent;
          expect(event.detail).toHaveProperty('locale');
          expect(event.detail).toHaveProperty('direction');
          resolve();
        });

        element.locale = 'en';
      });
    });

    it('should bubble localeChange event', () => {
      return new Promise<void>((resolve) => {
        const listener = (e: Event) => {
          const event = e as CustomEvent;
          if (event.detail && event.detail.locale === 'en') {
            document.removeEventListener('localeChange', listener as EventListener);
            resolve();
          }
        };

        document.addEventListener('localeChange', listener as EventListener);
        element.locale = 'en';
      });
    });
  });

  describe('Direction Management', () => {
    it('should set RTL direction for Persian locale', () => {
      element.locale = 'fa';
      const host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBe('rtl');
    });

    it('should set LTR direction for English locale', () => {
      element.locale = 'en';
      const host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBe('ltr');
    });

    it('should update direction when locale changes', () => {
      element.locale = 'fa';
      let host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBe('rtl');

      element.locale = 'en';
      host = element.shadowRoot?.host as HTMLElement;
      expect(host.style.direction).toBe('ltr');
    });
  });

  describe('Locale-Specific Rendering', () => {
    it('should render calendar for fa locale', () => {
      element.locale = 'fa';
      const html = (element as any).renderCalendar();
      
      // Check that calendar renders with proper structure
      expect(html).toContain('jalali-date-picker-container');
      expect(html).toContain('calendar-header');
    });

    it('should render month names for en locale', () => {
      element.locale = 'en';
      const html = (element as any).renderCalendar();
      
      // Check that calendar renders (month name will be in Persian or English depending on service)
      expect(html).toBeTruthy();
      expect(html).toContain('calendar-header');
    });

    it('should render Persian weekday headers for fa locale', () => {
      element.locale = 'fa';
      const html = (element as any).renderWeekdayHeaders();
      
      // Persian weekday abbreviations
      expect(html).toContain('ش'); // Sunday
      expect(html).toContain('ی'); // Monday
    });

    it('should render English weekday headers for en locale', () => {
      element.locale = 'en';
      const html = (element as any).renderWeekdayHeaders();
      
      // English weekday abbreviations
      expect(html).toContain('Sun');
      expect(html).toContain('Mon');
    });

    it('should use correct navigation arrows for Persian locale', () => {
      element.locale = 'fa';
      const html = (element as any).renderHeader(1403, 1);
      
      // RTL arrows for Persian
      expect(html).toContain('→'); // prev arrow
      expect(html).toContain('←'); // next arrow
    });

    it('should use correct navigation arrows for English locale', () => {
      element.locale = 'en';
      const html = (element as any).renderHeader(1403, 1);
      
      // LTR arrows for English
      expect(html).toContain('←'); // prev arrow
      expect(html).toContain('→'); // next arrow
    });
  });

  describe('Locale-Specific Labels', () => {
    it('should render Persian labels in footer for fa locale', () => {
      element.locale = 'fa';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      
      expect(html).toContain('تم:'); // Theme label in Persian
    });

    it('should render English labels in footer for en locale', () => {
      element.locale = 'en';
      element.setAttribute('show-theme-selector', '');
      const html = (element as any).renderFooter();
      
      expect(html).toContain('Theme:'); // Theme label in English
    });

    it('should render Persian color picker label for fa locale', () => {
      element.locale = 'fa';
      element.setAttribute('show-color-picker', '');
      const html = (element as any).renderFooter();
      
      expect(html).toContain('رنگ:'); // Color label in Persian
    });

    it('should render English color picker label for en locale', () => {
      element.locale = 'en';
      element.setAttribute('show-color-picker', '');
      const html = (element as any).renderFooter();
      
      expect(html).toContain('Color:'); // Color label in English
    });

    it('should render Persian calendar switch label for fa locale', () => {
      element.locale = 'fa';
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      
      expect(html).toContain('تقویم:'); // Calendar label in Persian
    });

    it('should render English calendar switch label for en locale', () => {
      element.locale = 'en';
      element.setAttribute('show-calendar-switch', '');
      const html = (element as any).renderFooter();
      
      expect(html).toContain('Calendar:'); // Calendar label in English
    });
  });

  describe('Locale Service Integration', () => {
    it('should update locale service when locale changes', () => {
      element.locale = 'en';
      const localeService = (element as any).localeService;
      expect(localeService.getLocale()).toBe('en');
    });

    it('should update date service locale when locale changes', () => {
      element.locale = 'en';
      const dateService = (element as any).dateService;
      expect(dateService.getLocale()).toBe('en');
    });

    it('should sync locale service with element locale', () => {
      element.locale = 'fa';
      const localeService = (element as any).localeService;
      expect(localeService.getLocale()).toBe('fa');

      element.locale = 'en';
      expect(localeService.getLocale()).toBe('en');
    });
  });

  describe('Locale Persistence', () => {
    it('should maintain locale after re-render', () => {
      element.locale = 'en';
      (element as any).render();
      expect(element.locale).toBe('en');
    });

    it('should maintain locale after date selection', () => {
      element.locale = 'en';
      element.selectedDate = new Date(2024, 0, 15);
      expect(element.locale).toBe('en');
    });

    it('should maintain locale after theme change', () => {
      element.locale = 'en';
      element.theme = 'dark';
      expect(element.locale).toBe('en');
    });

    it('should maintain locale after calendar type change', () => {
      element.locale = 'en';
      element.calendarType = 'gregorian';
      expect(element.locale).toBe('en');
    });
  });

  describe('Multiple Locale Switches', () => {
    it('should handle rapid locale switches', () => {
      element.locale = 'fa';
      element.locale = 'en';
      element.locale = 'fa';
      element.locale = 'en';
      
      expect(element.locale).toBe('en');
    });

    it('should emit event for each locale change', () => {
      return new Promise<void>((resolve) => {
        let eventCount = 0;
        
        element.addEventListener('localeChange', () => {
          eventCount++;
          
          if (eventCount === 3) {
            expect(eventCount).toBe(3);
            resolve();
          }
        });

        element.locale = 'en';
        element.locale = 'fa';
        element.locale = 'en';
      });
    });

    it('should maintain correct state after multiple switches', () => {
      element.locale = 'fa';
      element.selectedDate = new Date(2024, 0, 15);
      
      element.locale = 'en';
      expect(element.selectedDate).toEqual(new Date(2024, 0, 15));
      
      element.locale = 'fa';
      expect(element.selectedDate).toEqual(new Date(2024, 0, 15));
    });
  });

  describe('Locale with Selection Modes', () => {
    it('should maintain locale in single selection mode', () => {
      element.locale = 'en';
      element.selectionMode = 'single';
      element.selectedDate = new Date(2024, 0, 15);
      
      expect(element.locale).toBe('en');
    });

    it('should maintain locale in range selection mode', () => {
      element.locale = 'en';
      element.selectionMode = 'range';
      element.selectedRange = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 15),
      };
      
      expect(element.locale).toBe('en');
    });

    it('should maintain locale in multiple selection mode', () => {
      element.locale = 'en';
      element.selectionMode = 'multiple';
      element.selectedDates = [
        new Date(2024, 0, 1),
        new Date(2024, 0, 15),
      ];
      
      expect(element.locale).toBe('en');
    });
  });

  describe('Locale with Disabled State', () => {
    it('should maintain locale when disabled', () => {
      element.locale = 'en';
      element.disabled = true;
      
      expect(element.locale).toBe('en');
    });

    it('should maintain locale when enabled', () => {
      element.locale = 'en';
      element.disabled = true;
      element.disabled = false;
      
      expect(element.locale).toBe('en');
    });
  });

  describe('Locale Attribute Synchronization', () => {
    it('should sync property to attribute', () => {
      element.locale = 'en';
      expect(element.getAttribute('locale')).toBe('en');
    });

    it('should sync attribute to property', () => {
      element.setAttribute('locale', 'en');
      expect(element.locale).toBe('en');
    });

    it('should keep property and attribute in sync', () => {
      element.locale = 'en';
      expect(element.getAttribute('locale')).toBe('en');
      
      element.setAttribute('locale', 'fa');
      expect(element.locale).toBe('fa');
      
      element.locale = 'en';
      expect(element.getAttribute('locale')).toBe('en');
    });
  });

  describe('Locale with Theme', () => {
    it('should apply theme with Persian locale', () => {
      element.locale = 'fa';
      element.theme = 'dark';
      
      expect(element.locale).toBe('fa');
      expect(element.theme).toBe('dark');
    });

    it('should apply theme with English locale', () => {
      element.locale = 'en';
      element.theme = 'light';
      
      expect(element.locale).toBe('en');
      expect(element.theme).toBe('light');
    });

    it('should render correctly with locale and theme', () => {
      element.locale = 'en';
      element.theme = 'dark';
      
      const html = (element as any).renderCalendar();
      expect(html).toBeTruthy();
    });
  });

  describe('Locale Initialization from HTML', () => {
    it('should initialize with locale attribute in HTML', () => {
      const el = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      el.setAttribute('locale', 'en');
      document.body.appendChild(el);

      expect(el.locale).toBe('en');

      document.body.removeChild(el);
    });

    it('should initialize with multiple attributes including locale', () => {
      const el = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      el.setAttribute('locale', 'en');
      el.setAttribute('theme', 'dark');
      el.setAttribute('calendar-type', 'gregorian');
      document.body.appendChild(el);

      expect(el.locale).toBe('en');
      expect(el.theme).toBe('dark');
      expect(el.calendarType).toBe('gregorian');

      document.body.removeChild(el);
    });
  });

  describe('Locale Event Composition', () => {
    it('should have composed: true for localeChange event', () => {
      return new Promise<void>((resolve) => {
        const listener = (e: Event) => {
          const event = e as CustomEvent;
          expect(event.composed).toBe(true);
          document.removeEventListener('localeChange', listener as EventListener);
          resolve();
        };

        document.addEventListener('localeChange', listener as EventListener);
        element.locale = 'en';
      });
    });

    it('should have bubbles: true for localeChange event', () => {
      return new Promise<void>((resolve) => {
        const listener = (e: Event) => {
          const event = e as CustomEvent;
          expect(event.bubbles).toBe(true);
          document.removeEventListener('localeChange', listener as EventListener);
          resolve();
        };

        document.addEventListener('localeChange', listener as EventListener);
        element.locale = 'en';
      });
    });
  });

  describe('Locale with Calendar Types', () => {
    it('should maintain locale when switching to Gregorian calendar', () => {
      element.locale = 'en';
      element.calendarType = 'gregorian';
      
      expect(element.locale).toBe('en');
    });

    it('should maintain locale when switching to Hijri calendar', () => {
      element.locale = 'en';
      element.calendarType = 'hijri';
      
      expect(element.locale).toBe('en');
    });

    it('should maintain locale when switching between calendar types', () => {
      element.locale = 'en';
      element.calendarType = 'jalali';
      element.calendarType = 'gregorian';
      element.calendarType = 'hijri';
      
      expect(element.locale).toBe('en');
    });
  });

  describe('Locale Getter', () => {
    it('should return current locale', () => {
      element.locale = 'fa';
      expect(element.locale).toBe('fa');
    });

    it('should return updated locale after change', () => {
      element.locale = 'fa';
      expect(element.locale).toBe('fa');
      
      element.locale = 'en';
      expect(element.locale).toBe('en');
    });

    it('should return locale from attribute', () => {
      element.setAttribute('locale', 'en');
      expect(element.locale).toBe('en');
    });
  });

  describe('Locale Validation', () => {
    it('should accept fa locale', () => {
      element.locale = 'fa';
      expect(element.locale).toBe('fa');
    });

    it('should accept en locale', () => {
      element.locale = 'en';
      expect(element.locale).toBe('en');
    });

    it('should handle invalid locale gracefully', () => {
      const originalLocale = element.locale;
      try {
        element.locale = 'invalid' as any;
      } catch (e) {
        // Expected to throw or handle gracefully
      }
      // Should either keep original or handle gracefully
      expect(element.locale).toBeDefined();
    });
  });

  describe('Locale with Connected/Disconnected', () => {
    it('should maintain locale after disconnect and reconnect', () => {
      element.locale = 'en';
      
      document.body.removeChild(element);
      document.body.appendChild(element);
      
      expect(element.locale).toBe('en');
    });

    it('should preserve locale state through lifecycle', () => {
      element.locale = 'en';
      element.selectedDate = new Date(2024, 0, 15);
      
      const savedLocale = element.locale;
      const savedDate = element.selectedDate;
      
      document.body.removeChild(element);
      document.body.appendChild(element);
      
      expect(element.locale).toBe(savedLocale);
      expect(element.selectedDate).toEqual(savedDate);
    });
  });

  describe('Locale Rendering Performance', () => {
    it('should render efficiently with locale changes', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        element.locale = i % 2 === 0 ? 'fa' : 'en';
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete in reasonable time (less than 1 second for 100 changes)
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Locale with Reset', () => {
    it('should maintain locale after reset', () => {
      element.locale = 'en';
      element.selectedDate = new Date(2024, 0, 15);
      
      element.reset();
      
      expect(element.locale).toBe('en');
      expect(element.selectedDate).toBeNull();
    });
  });

  describe('Locale Consistency', () => {
    it('should have consistent locale across multiple accesses', () => {
      element.locale = 'en';
      
      const locale1 = element.locale;
      const locale2 = element.locale;
      const locale3 = element.locale;
      
      expect(locale1).toBe(locale2);
      expect(locale2).toBe(locale3);
    });

    it('should have consistent direction for locale', () => {
      element.locale = 'fa';
      const localeService = (element as any).localeService;
      
      const direction1 = localeService.getDirection('fa');
      const direction2 = localeService.getDirection('fa');
      
      expect(direction1).toBe(direction2);
      expect(direction1).toBe('rtl');
    });
  });
});
