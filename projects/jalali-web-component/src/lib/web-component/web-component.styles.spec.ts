import { getWebComponentStyles } from './web-component.styles';

describe('Web Component CSS Variables', () => {
  let styleElement: HTMLStyleElement;
  let testElement: HTMLElement;

  beforeEach(() => {
    // Create a test element with Shadow DOM
    testElement = document.createElement('div');
    testElement.attachShadow({ mode: 'open' });
    
    // Inject styles
    styleElement = document.createElement('style');
    styleElement.textContent = getWebComponentStyles();
    testElement.shadowRoot!.appendChild(styleElement);
    
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('Color Variables', () => {
    it('should define primary color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--primary-color:');
      expect(styles).toContain('--primary-50:');
      expect(styles).toContain('--primary-100:');
      expect(styles).toContain('--primary-900:');
    });

    it('should define secondary color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--secondary-color:');
      expect(styles).toContain('--secondary-50:');
      expect(styles).toContain('--secondary-900:');
    });

    it('should define accent color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--accent-color:');
      expect(styles).toContain('--accent-50:');
      expect(styles).toContain('--accent-900:');
    });

    it('should define semantic color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--success-color:');
      expect(styles).toContain('--warning-color:');
      expect(styles).toContain('--error-color:');
      expect(styles).toContain('--info-color:');
    });

    it('should define background color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--background:');
      expect(styles).toContain('--background-secondary:');
      expect(styles).toContain('--background-tertiary:');
    });

    it('should define text color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--text-color:');
      expect(styles).toContain('--text-secondary:');
      expect(styles).toContain('--text-muted:');
      expect(styles).toContain('--text-disabled:');
    });

    it('should define border color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--border-color:');
      expect(styles).toContain('--border-color-light:');
      expect(styles).toContain('--border-color-dark:');
    });

    it('should define interactive color variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--hover-bg:');
      expect(styles).toContain('--hover-border:');
      expect(styles).toContain('--selected-bg:');
      expect(styles).toContain('--selected-text:');
      expect(styles).toContain('--disabled-bg:');
      expect(styles).toContain('--disabled-text:');
      expect(styles).toContain('--focus-ring:');
    });
  });

  describe('Size Variables', () => {
    it('should define border radius variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--border-radius:');
      expect(styles).toContain('--border-radius-sm:');
      expect(styles).toContain('--border-radius-md:');
      expect(styles).toContain('--border-radius-lg:');
      expect(styles).toContain('--border-radius-xl:');
      expect(styles).toContain('--border-radius-full:');
    });

    it('should define padding variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--padding-xs:');
      expect(styles).toContain('--padding-sm:');
      expect(styles).toContain('--padding-md:');
      expect(styles).toContain('--padding-base:');
      expect(styles).toContain('--padding-lg:');
      expect(styles).toContain('--padding-xl:');
      expect(styles).toContain('--padding-2xl:');
    });

    it('should define margin variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--margin-xs:');
      expect(styles).toContain('--margin-sm:');
      expect(styles).toContain('--margin-md:');
      expect(styles).toContain('--margin-base:');
      expect(styles).toContain('--margin-lg:');
      expect(styles).toContain('--margin-xl:');
      expect(styles).toContain('--margin-2xl:');
    });

    it('should define gap variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--gap-xs:');
      expect(styles).toContain('--gap-sm:');
      expect(styles).toContain('--gap-md:');
      expect(styles).toContain('--gap-base:');
      expect(styles).toContain('--gap-lg:');
      expect(styles).toContain('--gap-xl:');
    });

    it('should define component height variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--component-height-sm:');
      expect(styles).toContain('--component-height-md:');
      expect(styles).toContain('--component-height-lg:');
      expect(styles).toContain('--component-height-xl:');
    });

    it('should define calendar specific size variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--calendar-cell-size:');
      expect(styles).toContain('--calendar-cell-gap:');
      expect(styles).toContain('--calendar-padding:');
      expect(styles).toContain('--calendar-header-height:');
    });

    it('should define border width variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--border-width:');
      expect(styles).toContain('--border-width-2:');
      expect(styles).toContain('--border-width-4:');
    });
  });

  describe('Font Variables', () => {
    it('should define font family variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--font-family:');
      expect(styles).toContain('--font-family-mono:');
      expect(styles).toContain('--font-family-serif:');
    });

    it('should define font size variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--font-size-xs:');
      expect(styles).toContain('--font-size-sm:');
      expect(styles).toContain('--font-size-base:');
      expect(styles).toContain('--font-size-md:');
      expect(styles).toContain('--font-size-lg:');
      expect(styles).toContain('--font-size-xl:');
      expect(styles).toContain('--font-size-2xl:');
      expect(styles).toContain('--font-size-3xl:');
    });

    it('should define font weight variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--font-weight-light:');
      expect(styles).toContain('--font-weight-normal:');
      expect(styles).toContain('--font-weight-medium:');
      expect(styles).toContain('--font-weight-semibold:');
      expect(styles).toContain('--font-weight-bold:');
      expect(styles).toContain('--font-weight-extrabold:');
    });

    it('should define line height variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--line-height-tight:');
      expect(styles).toContain('--line-height-normal:');
      expect(styles).toContain('--line-height-relaxed:');
      expect(styles).toContain('--line-height-loose:');
    });

    it('should define letter spacing variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--letter-spacing-tight:');
      expect(styles).toContain('--letter-spacing-normal:');
      expect(styles).toContain('--letter-spacing-wide:');
      expect(styles).toContain('--letter-spacing-wider:');
    });
  });

  describe('Animation Variables', () => {
    it('should define transition duration variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--transition-duration-fast:');
      expect(styles).toContain('--transition-duration-base:');
      expect(styles).toContain('--transition-duration-slow:');
      expect(styles).toContain('--transition-duration-slower:');
    });

    it('should define transition timing variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--transition-timing:');
      expect(styles).toContain('--transition-timing-linear:');
      expect(styles).toContain('--transition-timing-ease-in:');
      expect(styles).toContain('--transition-timing-ease-out:');
      expect(styles).toContain('--transition-timing-ease-in-out:');
    });
  });

  describe('Shadow Variables', () => {
    it('should define shadow variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--shadow-sm:');
      expect(styles).toContain('--shadow-md:');
      expect(styles).toContain('--shadow-lg:');
      expect(styles).toContain('--shadow-xl:');
      expect(styles).toContain('--shadow-2xl:');
    });
  });

  describe('Z-Index Variables', () => {
    it('should define z-index variables', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--z-index-dropdown:');
      expect(styles).toContain('--z-index-sticky:');
      expect(styles).toContain('--z-index-fixed:');
      expect(styles).toContain('--z-index-modal-backdrop:');
      expect(styles).toContain('--z-index-modal:');
      expect(styles).toContain('--z-index-popover:');
      expect(styles).toContain('--z-index-tooltip:');
    });
  });

  describe('CSS Variable Values', () => {
    it('should have valid color values', () => {
      const styles = getWebComponentStyles();
      const colorRegex = /#[0-9a-f]{6}|rgb\(|rgba\(/gi;
      const matches = styles.match(colorRegex);
      expect(matches).toBeTruthy();
      expect(matches!.length).toBeGreaterThan(0);
    });

    it('should have valid size values', () => {
      const styles = getWebComponentStyles();
      const sizeRegex = /\d+(px|em|rem|%)/g;
      const matches = styles.match(sizeRegex);
      expect(matches).toBeTruthy();
      expect(matches!.length).toBeGreaterThan(0);
    });

    it('should have valid font family values', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('--font-family:');
      expect(styles).toContain('sans-serif');
    });

    it('should have valid transition timing values', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('ease');
      expect(styles).toContain('linear');
    });
  });

  describe('Shadow DOM Encapsulation', () => {
    it('should apply styles only within Shadow DOM', () => {
      const host = testElement.shadowRoot!.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      // Verify that the host element has the display property set
      expect(computedStyle.display).toBe('inline-block');
    });

    it('should not affect global styles', () => {
      const bodyStyle = window.getComputedStyle(document.body);
      
      // Body should not have the custom properties
      expect(bodyStyle.getPropertyValue('--primary-color')).toBe('');
    });

    it('should support CSS variable inheritance within Shadow DOM', () => {
      const host = testElement.shadowRoot!.host as HTMLElement;
      const computedStyle = window.getComputedStyle(host);
      
      // Check if CSS variables are accessible
      const primaryColor = computedStyle.getPropertyValue('--primary-color');
      expect(primaryColor).toBeTruthy();
    });
  });

  describe('Responsive Design Variables', () => {
    it('should include mobile media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (max-width: 599px)');
    });

    it('should include tablet media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (min-width: 600px) and (max-width: 1024px)');
    });

    it('should include desktop media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (min-width: 1025px)');
    });
  });

  describe('Dark Mode Support', () => {
    it('should include dark mode media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (prefers-color-scheme: dark)');
    });

    it('should include light mode media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (prefers-color-scheme: light)');
    });
  });

  describe('Accessibility Features', () => {
    it('should include high contrast mode support', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (prefers-contrast: more)');
    });

    it('should include reduced motion support', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    });

    it('should include focus styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain(':focus');
    });

    it('should include outline for focus', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('outline:');
    });
  });

  describe('RTL/LTR Support', () => {
    it('should include RTL direction support', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain(':host([dir="rtl"])');
    });

    it('should include LTR direction support', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain(':host([dir="ltr"])');
    });

    it('should set direction property for RTL', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('direction: rtl');
    });

    it('should set direction property for LTR', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('direction: ltr');
    });
  });

  describe('Animation Definitions', () => {
    it('should define slideIn animation', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@keyframes slideIn');
    });

    it('should define fadeIn animation', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@keyframes fadeIn');
    });

    it('should define pulse animation', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@keyframes pulse');
    });
  });

  describe('Print Styles', () => {
    it('should include print media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media print');
    });

    it('should hide navigation in print', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.calendar-header-nav');
      expect(styles).toContain('display: none');
    });
  });

  describe('Component Styles', () => {
    it('should define calendar container styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.jalali-date-picker-container');
    });

    it('should define calendar header styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.calendar-header');
    });

    it('should define date cell styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.date-cell');
    });

    it('should define selected date cell styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.date-cell.selected');
    });

    it('should define disabled date cell styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.date-cell.disabled');
    });

    it('should define today date cell styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.date-cell.today');
    });

    it('should define range date cell styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.date-cell.in-range');
      expect(styles).toContain('.date-cell.range-start');
      expect(styles).toContain('.date-cell.range-end');
    });

    it('should define holiday date cell styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.date-cell.holiday');
    });

    it('should define theme selector styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.theme-selector');
    });

    it('should define color picker styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.color-picker');
    });

    it('should define calendar switch styles', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.calendar-switch');
    });
  });

  describe('CSS Variable Consistency', () => {
    it('should use consistent variable naming convention', () => {
      const styles = getWebComponentStyles();
      const variableMatches = styles.match(/--[a-z-]+:/g);
      
      expect(variableMatches).toBeTruthy();
      variableMatches!.forEach(variable => {
        // All variables should start with --
        expect(variable).toMatch(/^--[a-z]/);
        // All variables should use kebab-case
        expect(variable).toMatch(/^--[a-z0-9-]+:$/);
      });
    });

    it('should use CSS variables in component styles', () => {
      const styles = getWebComponentStyles();
      const varUsages = styles.match(/var\(--[a-z-]+\)/g);
      
      expect(varUsages).toBeTruthy();
      expect(varUsages!.length).toBeGreaterThan(50);
    });
  });
});
