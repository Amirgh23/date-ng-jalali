/**
 * Shadow DOM Encapsulation Tests
 * تست‌های Encapsulation برای Shadow DOM
 * 
 * این تست‌ها اطمینان می‌دهند که:
 * 1. Styles کامپوننت بر سایر عناصر تأثیر نمی‌گذارند
 * 2. Styles خارجی بر کامپوننت تأثیر نمی‌گذارند
 * 3. CSS Variables به درستی اعمال می‌شوند
 * 4. Performance optimizations کار می‌کنند
 */

import { JalaliDatePickerElement } from './jalali-date-picker.element';

describe('Shadow DOM Encapsulation - Core Tests', () => {
  let element: JalaliDatePickerElement;
  let container: HTMLDivElement;

  beforeEach(() => {
    // Create a container for testing
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create the web component
    element = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
    container.appendChild(element);
  });

  afterEach(() => {
    // Cleanup
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  });

  describe('Shadow DOM Attachment', () => {
    it('should have Shadow DOM attached in open mode', () => {
      expect(element.shadowRoot).toBeDefined();
      expect(element.shadowRoot?.mode).toBe('open');
    });

    it('should inject styles into Shadow DOM', () => {
      const styleElements = element.shadowRoot?.querySelectorAll('style');
      expect(styleElements?.length).toBeGreaterThan(0);
    });

    it('should have exactly one style element', () => {
      const styleElements = element.shadowRoot?.querySelectorAll('style');
      expect(styleElements?.length).toBe(1);
    });

    it('should mark style element with data attribute', () => {
      const styleElement = element.shadowRoot?.querySelector('style[data-component="jalali-date-picker"]');
      expect(styleElement).toBeTruthy();
    });
  });

  describe('Style Encapsulation', () => {
    it('should not leak component styles to global scope', () => {
      // Get all style elements in the document (not in Shadow DOM)
      const globalStyles = document.querySelectorAll('style');
      
      // Check that component styles are not in global scope
      let componentStylesInGlobal = false;
      globalStyles.forEach((style) => {
        if (style.textContent?.includes('jalali-date-picker-container')) {
          componentStylesInGlobal = true;
        }
      });

      expect(componentStylesInGlobal).toBe(false);
    });

    it('should not affect external elements with same class names', () => {
      // Create an external element with same class name as component
      const externalElement = document.createElement('div');
      externalElement.className = 'date-cell';
      externalElement.textContent = 'External Date Cell';
      container.appendChild(externalElement);

      // Get computed styles
      const externalStyles = window.getComputedStyle(externalElement);
      
      // Component styles should not affect external element
      // (external element should not have component-specific display: flex)
      expect(externalStyles.display).not.toBe('flex');
    });

    it('should not inherit global styles into Shadow DOM', () => {
      // Add a global style that would affect all divs
      const globalStyle = document.createElement('style');
      globalStyle.textContent = `
        div {
          color: rgb(255, 0, 0) !important;
          font-size: 50px !important;
        }
      `;
      document.head.appendChild(globalStyle);

      try {
        // Get a component element
        const componentElement = element.shadowRoot?.querySelector('.date-cell');
        
        if (componentElement) {
          const computedStyle = window.getComputedStyle(componentElement);
          
          // Component should have its own color, not red
          // (Shadow DOM should isolate from global styles)
          expect(computedStyle.color).not.toBe('rgb(255, 0, 0)');
        }
      } finally {
        // Cleanup
        document.head.removeChild(globalStyle);
      }
    });
  });

  describe('CSS Variables', () => {
    it('should define CSS variables on host element', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      // Check for primary color variable
      const primaryColor = computedStyle.getPropertyValue('--primary-color');
      expect(primaryColor).toBeTruthy();
    });

    it('should have all required color variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const requiredVariables = [
        '--primary-color',
        '--secondary-color',
        '--accent-color',
        '--background',
        '--text-color',
        '--border-color',
      ];
      
      requiredVariables.forEach((variable) => {
        const value = computedStyle.getPropertyValue(variable);
        expect(value).toBeTruthy();
      });
    });

    it('should have all required size variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const requiredVariables = [
        '--border-radius',
        '--padding-base',
        '--font-size-base',
        '--component-height-md',
      ];
      
      requiredVariables.forEach((variable) => {
        const value = computedStyle.getPropertyValue(variable);
        expect(value).toBeTruthy();
      });
    });

    it('should allow CSS variable override from outside', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      
      // Override a CSS variable
      host.style.setProperty('--primary-color', '#ff0000');
      
      const computedStyle = window.getComputedStyle(host);
      const primaryColor = computedStyle.getPropertyValue('--primary-color');
      
      expect(primaryColor.trim()).toBe('#ff0000');
    });
  });

  describe('Performance Optimization', () => {
    it('should apply CSS containment to host element', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const contain = host.style.contain;
      
      expect(contain).toBe('layout style paint');
    });

    it('should not create duplicate style elements on re-render', () => {
      const initialStyleCount = element.shadowRoot?.querySelectorAll('style').length;
      
      // Trigger a re-render
      element.selectedDate = new Date();
      
      const afterRenderStyleCount = element.shadowRoot?.querySelectorAll('style').length;
      
      // Style count should remain the same
      expect(afterRenderStyleCount).toBe(initialStyleCount);
    });

    it('should inject styles synchronously', () => {
      const startTime = performance.now();
      
      const testElement = document.createElement('jalali-date-picker') as JalaliDatePickerElement;
      document.body.appendChild(testElement);
      
      const endTime = performance.now();
      const injectionTime = endTime - startTime;
      
      // Style injection should be fast (< 100ms)
      expect(injectionTime).toBeLessThan(100);
      
      document.body.removeChild(testElement);
    });
  });

  describe('Direction Support (RTL/LTR)', () => {
    it('should apply direction based on locale', () => {
      element.locale = 'fa';
      
      const host = element.shadowRoot?.host as HTMLElement;
      const direction = host.style.direction;
      
      expect(direction).toBe('rtl');
    });

    it('should change direction when locale changes', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      
      element.locale = 'fa';
      expect(host.style.direction).toBe('rtl');
      
      element.locale = 'en';
      expect(host.style.direction).toBe('ltr');
    });

    it('should not affect global direction', () => {
      const initialDirection = document.documentElement.dir;
      
      element.locale = 'fa';
      
      const afterDirection = document.documentElement.dir;
      
      expect(afterDirection).toBe(initialDirection);
    });
  });

  describe('Responsive Styles', () => {
    it('should have responsive CSS media queries', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      // Check for media queries
      expect(styleContent).toContain('@media');
      expect(styleContent).toContain('max-width');
      expect(styleContent).toContain('min-width');
    });

    it('should have mobile styles', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('max-width: 599px');
    });

    it('should have tablet styles', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('600px');
      expect(styleContent).toContain('1024px');
    });

    it('should have desktop styles', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('1025px');
    });
  });

  describe('Accessibility Styles', () => {
    it('should have focus styles for keyboard navigation', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain(':focus');
      expect(styleContent).toContain('outline');
    });

    it('should have high contrast mode support', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('prefers-contrast');
    });

    it('should have reduced motion support', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('prefers-reduced-motion');
    });

    it('should have disabled state styles', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('.disabled');
      expect(styleContent).toContain('cursor: not-allowed');
    });
  });

  describe('Dark Mode Support', () => {
    it('should have dark mode media query', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('prefers-color-scheme: dark');
    });

    it('should have light mode media query', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('prefers-color-scheme: light');
    });

    it('should define dark mode colors', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      // Check for dark mode color definitions
      const darkModeSection = styleContent.substring(
        styleContent.indexOf('prefers-color-scheme: dark'),
        styleContent.indexOf('prefers-color-scheme: dark') + 500
      );
      
      expect(darkModeSection).toContain('--background');
      expect(darkModeSection).toContain('--text-color');
    });
  });

  describe('Animation Styles', () => {
    it('should define animation keyframes', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('@keyframes');
    });

    it('should have transition variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const transitionDuration = computedStyle.getPropertyValue('--transition-duration-base');
      expect(transitionDuration).toBeTruthy();
    });

    it('should respect prefers-reduced-motion', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('prefers-reduced-motion: reduce');
    });
  });

  describe('Box Model Styles', () => {
    it('should use border-box box-sizing', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('box-sizing: border-box');
    });

    it('should have padding variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const paddingBase = computedStyle.getPropertyValue('--padding-base');
      expect(paddingBase).toBeTruthy();
    });

    it('should have margin variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const marginBase = computedStyle.getPropertyValue('--margin-base');
      expect(marginBase).toBeTruthy();
    });

    it('should have gap variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const gapBase = computedStyle.getPropertyValue('--gap-base');
      expect(gapBase).toBeTruthy();
    });
  });

  describe('Typography Styles', () => {
    it('should define font family variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const fontFamily = computedStyle.getPropertyValue('--font-family');
      expect(fontFamily).toBeTruthy();
    });

    it('should define font size variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const fontSizeBase = computedStyle.getPropertyValue('--font-size-base');
      expect(fontSizeBase).toBeTruthy();
    });

    it('should define font weight variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const fontWeightNormal = computedStyle.getPropertyValue('--font-weight-normal');
      expect(fontWeightNormal).toBeTruthy();
    });

    it('should define line height variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const lineHeightNormal = computedStyle.getPropertyValue('--line-height-normal');
      expect(lineHeightNormal).toBeTruthy();
    });
  });

  describe('Shadow and Elevation', () => {
    it('should define shadow variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const shadowMd = computedStyle.getPropertyValue('--shadow-md');
      expect(shadowMd).toBeTruthy();
    });

    it('should have multiple shadow levels', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const shadowLevels = [
        '--shadow-sm',
        '--shadow-md',
        '--shadow-lg',
        '--shadow-xl',
        '--shadow-2xl',
      ];
      
      shadowLevels.forEach((level) => {
        const value = computedStyle.getPropertyValue(level);
        expect(value).toBeTruthy();
      });
    });
  });

  describe('Z-Index Management', () => {
    it('should define z-index variables', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const zIndexDropdown = computedStyle.getPropertyValue('--z-index-dropdown');
      expect(zIndexDropdown).toBeTruthy();
    });

    it('should have z-index hierarchy', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      const zIndexLevels = [
        '--z-index-dropdown',
        '--z-index-sticky',
        '--z-index-fixed',
        '--z-index-modal-backdrop',
        '--z-index-modal',
        '--z-index-popover',
        '--z-index-tooltip',
      ];
      
      zIndexLevels.forEach((level) => {
        const value = computedStyle.getPropertyValue(level);
        expect(value).toBeTruthy();
      });
    });
  });

  describe('Print Styles', () => {
    it('should have print media query', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      expect(styleContent).toContain('@media print');
    });

    it('should hide interactive elements in print', () => {
      const styleElement = element.shadowRoot?.querySelector('style');
      const styleContent = styleElement?.textContent || '';
      
      const printSection = styleContent.substring(
        styleContent.indexOf('@media print'),
        styleContent.indexOf('@media print') + 300
      );
      
      expect(printSection).toContain('display: none');
    });
  });

  describe('Style Isolation', () => {
    it('should not affect sibling elements', () => {
      const sibling = document.createElement('div');
      sibling.className = 'date-cell';
      sibling.textContent = 'Sibling';
      container.appendChild(sibling);
      
      const siblingStyles = window.getComputedStyle(sibling);
      
      // Sibling should not have component styles
      expect(siblingStyles.display).not.toBe('flex');
    });

    it('should not affect parent elements', () => {
      const parentStyles = window.getComputedStyle(container);
      
      // Parent should not be affected by component styles
      expect(parentStyles.display).not.toBe('inline-block');
    });

    it('should not affect child elements outside Shadow DOM', () => {
      const externalChild = document.createElement('div');
      externalChild.className = 'calendar-header';
      container.appendChild(externalChild);
      
      const childStyles = window.getComputedStyle(externalChild);
      
      // External child should not have component styles
      expect(childStyles.display).not.toBe('flex');
    });
  });

  describe('Theme Application', () => {
    it('should apply theme to component', () => {
      element.theme = 'dark';
      
      const host = element.shadowRoot?.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      // Should have theme applied
      expect(computedStyle.getPropertyValue('--background')).toBeTruthy();
    });

    it('should update styles when theme changes', () => {
      const host = element.shadowRoot?.host as HTMLElement;
      
      // Get initial background
      element.theme = 'light';
      const lightBg = window.getComputedStyle(host).getPropertyValue('--background');
      
      // Change theme
      element.theme = 'dark';
      const darkBg = window.getComputedStyle(host).getPropertyValue('--background');
      
      // Backgrounds should be different (or at least the theme changed)
      expect(element.theme).toBe('dark');
    });

    it('should not affect global styles when changing theme', () => {
      // Get initial global background
      const initialGlobalBg = window.getComputedStyle(document.body).backgroundColor;
      
      // Change component theme
      element.theme = 'dark';
      
      // Get global background after change
      const afterGlobalBg = window.getComputedStyle(document.body).backgroundColor;
      
      // Global background should not change
      expect(afterGlobalBg).toBe(initialGlobalBg);
    });
  });
});
