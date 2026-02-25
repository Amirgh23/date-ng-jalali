import { getWebComponentStyles } from './web-component.styles';

describe('Responsive Design - Media Queries', () => {
  let styleElement: HTMLStyleElement;
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    testElement.attachShadow({ mode: 'open' });
    
    styleElement = document.createElement('style');
    styleElement.textContent = getWebComponentStyles();
    testElement.shadowRoot!.appendChild(styleElement);
    
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  describe('Mobile Breakpoint (< 600px)', () => {
    it('should include mobile media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (max-width: 599px)');
    });

    it('should reduce padding on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--padding-base: 10px');
      expect(mobileSection![0]).toContain('--padding-md: 8px');
    });

    it('should reduce font sizes on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--font-size-base: 12px');
      expect(mobileSection![0]).toContain('--font-size-lg: 14px');
    });

    it('should reduce calendar cell size on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--calendar-cell-size: 32px');
    });

    it('should reduce calendar cell gap on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--calendar-cell-gap: 4px');
    });

    it('should optimize component heights for touch on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--component-height-md: 28px');
    });

    it('should stack footer sections on mobile', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.calendar-footer {\n        flex-direction: column');
    });

    it('should reduce margins on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--margin-base: 10px');
    });

    it('should reduce gaps on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--gap-base: 10px');
    });

    it('should reduce border radius on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--border-radius: 6px');
    });

    it('should reduce hover scale on mobile for better touch', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('transform: scale(1.02)');
    });
  });

  describe('Tablet Breakpoint (600px - 1024px)', () => {
    it('should include tablet media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (min-width: 600px) and (max-width: 1024px)');
    });

    it('should use medium padding on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--padding-base: 12px');
      expect(tabletSection![0]).toContain('--padding-md: 10px');
    });

    it('should use medium font sizes on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--font-size-base: 13px');
      expect(tabletSection![0]).toContain('--font-size-lg: 16px');
    });

    it('should use medium calendar cell size on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--calendar-cell-size: 36px');
    });

    it('should use medium calendar cell gap on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--calendar-cell-gap: 6px');
    });

    it('should use medium component heights on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--component-height-md: 32px');
    });

    it('should use medium margins on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--margin-base: 12px');
    });

    it('should use medium gaps on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--gap-base: 12px');
    });

    it('should use medium border radius on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      expect(tabletSection![0]).toContain('--border-radius: 7px');
    });

    it('should keep footer in row layout on tablet', () => {
      const styles = getWebComponentStyles();
      // Check that the tablet section has the footer row layout
      expect(styles).toContain('.calendar-footer {\n        flex-direction: row');
    });

    it('should use medium hover scale on tablet', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('transform: scale(1.03)');
    });
  });

  describe('Desktop Breakpoint (> 1024px)', () => {
    it('should include desktop media query', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('@media (min-width: 1025px)');
    });

    it('should use full padding on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--padding-base: 16px');
      expect(desktopSection![0]).toContain('--padding-md: 12px');
    });

    it('should use standard font sizes on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--font-size-base: 14px');
      expect(desktopSection![0]).toContain('--font-size-lg: 18px');
    });

    it('should use larger calendar cell size on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--calendar-cell-size: 40px');
    });

    it('should use larger calendar cell gap on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--calendar-cell-gap: 8px');
    });

    it('should use standard component heights on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--component-height-md: 36px');
    });

    it('should use full margins on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--margin-base: 16px');
    });

    it('should use full gaps on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--gap-base: 16px');
    });

    it('should use standard border radius on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--border-radius: 8px');
    });

    it('should set calendar header height on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      expect(desktopSection![0]).toContain('--calendar-header-height: 48px');
    });

    it('should use full hover scale on desktop', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('transform: scale(1.05)');
    });
  });

  describe('CSS Variables Consistency Across Breakpoints', () => {
    it('should maintain variable naming convention across all breakpoints', () => {
      const styles = getWebComponentStyles();
      const allVariables = styles.match(/--[a-z-]+:/g);
      
      expect(allVariables).toBeTruthy();
      allVariables!.forEach(variable => {
        expect(variable).toMatch(/^--[a-z0-9-]+:$/);
      });
    });

    it('should have consistent padding scale across breakpoints', () => {
      const styles = getWebComponentStyles();
      
      // Mobile padding should be smaller than tablet
      expect(styles).toContain('--padding-base: 10px');
      // Tablet padding should be between mobile and desktop
      expect(styles).toContain('--padding-base: 12px');
      // Desktop padding should be largest
      expect(styles).toContain('--padding-base: 16px');
    });

    it('should have consistent font size scale across breakpoints', () => {
      const styles = getWebComponentStyles();
      
      // Mobile font should be smaller
      expect(styles).toContain('--font-size-base: 12px');
      // Tablet font should be medium
      expect(styles).toContain('--font-size-base: 13px');
      // Desktop font should be standard
      expect(styles).toContain('--font-size-base: 14px');
    });

    it('should have consistent calendar cell size scale across breakpoints', () => {
      const styles = getWebComponentStyles();
      
      // Mobile cells should be smallest
      expect(styles).toContain('--calendar-cell-size: 32px');
      // Tablet cells should be medium
      expect(styles).toContain('--calendar-cell-size: 36px');
      // Desktop cells should be largest
      expect(styles).toContain('--calendar-cell-size: 40px');
    });

    it('should have consistent gap scale across breakpoints', () => {
      const styles = getWebComponentStyles();
      
      // Mobile gap should be smallest
      expect(styles).toContain('--gap-base: 10px');
      // Tablet gap should be medium
      expect(styles).toContain('--gap-base: 12px');
      // Desktop gap should be largest
      expect(styles).toContain('--gap-base: 16px');
    });
  });

  describe('Touch Interaction Optimization', () => {
    it('should have minimum touch target size on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      // Minimum touch target is 28px (component-height-md)
      expect(mobileSection![0]).toContain('--component-height-md: 28px');
    });

    it('should reduce hover scale on mobile for better UX', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('transform: scale(1.02)');
    });

    it('should have appropriate calendar cell size for touch', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      // 32px is appropriate for touch targets
      expect(mobileSection![0]).toContain('--calendar-cell-size: 32px');
    });

    it('should reduce gaps for better touch spacing on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      expect(mobileSection![0]).toContain('--calendar-cell-gap: 4px');
    });
  });

  describe('Layout Adaptation', () => {
    it('should stack footer on mobile', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.calendar-footer {\n        flex-direction: column');
    });

    it('should use row layout on tablet and desktop', () => {
      const styles = getWebComponentStyles();
      // Check that the footer uses row layout (not column)
      expect(styles).toContain('.calendar-footer {\n        flex-direction: row');
    });

    it('should make footer sections full width on mobile', () => {
      const styles = getWebComponentStyles();
      expect(styles).toContain('.footer-section {\n        width: 100%');
    });
  });

  describe('Typography Scaling', () => {
    it('should scale all font sizes on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      
      // Check multiple font sizes are reduced
      expect(mobileSection![0]).toContain('--font-size-xs: 10px');
      expect(mobileSection![0]).toContain('--font-size-sm: 11px');
      expect(mobileSection![0]).toContain('--font-size-base: 12px');
      expect(mobileSection![0]).toContain('--font-size-lg: 14px');
    });

    it('should scale all font sizes on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      
      expect(tabletSection![0]).toContain('--font-size-xs: 10px');
      expect(tabletSection![0]).toContain('--font-size-sm: 12px');
      expect(tabletSection![0]).toContain('--font-size-base: 13px');
      expect(tabletSection![0]).toContain('--font-size-lg: 16px');
    });

    it('should use standard font sizes on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      
      expect(desktopSection![0]).toContain('--font-size-xs: 11px');
      expect(desktopSection![0]).toContain('--font-size-sm: 12px');
      expect(desktopSection![0]).toContain('--font-size-base: 14px');
      expect(desktopSection![0]).toContain('--font-size-lg: 18px');
    });
  });

  describe('Spacing Consistency', () => {
    it('should maintain proportional spacing on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      
      // Padding should be proportional
      expect(mobileSection![0]).toContain('--padding-xs: 2px');
      expect(mobileSection![0]).toContain('--padding-sm: 4px');
      expect(mobileSection![0]).toContain('--padding-base: 10px');
    });

    it('should maintain proportional spacing on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      
      expect(tabletSection![0]).toContain('--padding-xs: 3px');
      expect(tabletSection![0]).toContain('--padding-sm: 6px');
      expect(tabletSection![0]).toContain('--padding-base: 12px');
    });

    it('should maintain proportional spacing on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      
      expect(desktopSection![0]).toContain('--padding-xs: 4px');
      expect(desktopSection![0]).toContain('--padding-sm: 8px');
      expect(desktopSection![0]).toContain('--padding-base: 16px');
    });
  });

  describe('Component Sizing', () => {
    it('should scale component heights appropriately on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      
      expect(mobileSection![0]).toContain('--component-height-sm: 24px');
      expect(mobileSection![0]).toContain('--component-height-md: 28px');
      expect(mobileSection![0]).toContain('--component-height-lg: 36px');
    });

    it('should scale component heights appropriately on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      
      expect(tabletSection![0]).toContain('--component-height-sm: 26px');
      expect(tabletSection![0]).toContain('--component-height-md: 32px');
      expect(tabletSection![0]).toContain('--component-height-lg: 40px');
    });

    it('should use standard component heights on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      
      expect(desktopSection![0]).toContain('--component-height-sm: 28px');
      expect(desktopSection![0]).toContain('--component-height-md: 36px');
      expect(desktopSection![0]).toContain('--component-height-lg: 44px');
    });
  });

  describe('Border Radius Scaling', () => {
    it('should reduce border radius on mobile', () => {
      const styles = getWebComponentStyles();
      const mobileSection = styles.match(/@media \(max-width: 599px\)[\s\S]*?}/);
      expect(mobileSection).toBeTruthy();
      
      expect(mobileSection![0]).toContain('--border-radius: 6px');
      expect(mobileSection![0]).toContain('--border-radius-lg: 8px');
    });

    it('should use medium border radius on tablet', () => {
      const styles = getWebComponentStyles();
      const tabletSection = styles.match(/@media \(min-width: 600px\) and \(max-width: 1024px\)[\s\S]*?}/);
      expect(tabletSection).toBeTruthy();
      
      expect(tabletSection![0]).toContain('--border-radius: 7px');
      expect(tabletSection![0]).toContain('--border-radius-lg: 10px');
    });

    it('should use standard border radius on desktop', () => {
      const styles = getWebComponentStyles();
      const desktopSection = styles.match(/@media \(min-width: 1025px\)[\s\S]*?}/);
      expect(desktopSection).toBeTruthy();
      
      expect(desktopSection![0]).toContain('--border-radius: 8px');
      expect(desktopSection![0]).toContain('--border-radius-lg: 12px');
    });
  });
});
