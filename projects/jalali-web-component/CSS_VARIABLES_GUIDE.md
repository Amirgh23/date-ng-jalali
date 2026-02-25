# CSS Variables Guide - Jalali Date Picker Web Component

## Overview

The Jalali Date Picker Web Component uses comprehensive CSS Variables (Custom Properties) for theming, sizing, typography, and animations. This guide documents all available CSS Variables and how to use them.

## Color Variables

### Primary Colors
```css
--primary-color: #007bff;        /* Main brand color */
--primary-50: #f0f7ff;           /* Lightest shade */
--primary-100: #e0effe;
--primary-200: #c7e0fd;
--primary-300: #a4c9fc;
--primary-400: #7aaffa;
--primary-500: #4a90f9;
--primary-600: #0066ff;
--primary-700: #0052cc;
--primary-800: #003d99;
--primary-900: #002966;          /* Darkest shade */
```

### Secondary Colors
```css
--secondary-color: #6c757d;      /* Secondary brand color */
--secondary-50: #f8f9fa;
--secondary-100: #e9ecef;
--secondary-200: #dee2e6;
--secondary-300: #ced4da;
--secondary-400: #adb5bd;
--secondary-500: #6c757d;
--secondary-600: #495057;
--secondary-700: #343a40;
--secondary-800: #212529;
--secondary-900: #0d0d0d;
```

### Accent Colors
```css
--accent-color: #28a745;         /* Accent/highlight color */
--accent-50: #f0fdf4;
--accent-100: #dcfce7;
--accent-200: #bbf7d0;
--accent-300: #86efac;
--accent-400: #4ade80;
--accent-500: #22c55e;
--accent-600: #16a34a;
--accent-700: #15803d;
--accent-800: #166534;
--accent-900: #145231;
```

### Semantic Colors
```css
--success-color: #28a745;        /* Success state */
--warning-color: #ffc107;        /* Warning state */
--error-color: #dc3545;          /* Error state */
--info-color: #17a2b8;           /* Info state */
```

### Background Colors
```css
--background: #ffffff;           /* Primary background */
--background-secondary: #f8f9fa; /* Secondary background */
--background-tertiary: #e9ecef;  /* Tertiary background */
```

### Text Colors
```css
--text-color: #000000;           /* Primary text */
--text-secondary: #6c757d;       /* Secondary text */
--text-muted: #999999;           /* Muted text */
--text-disabled: #cccccc;        /* Disabled text */
```

### Border Colors
```css
--border-color: #dee2e6;         /* Primary border */
--border-color-light: #e9ecef;   /* Light border */
--border-color-dark: #adb5bd;    /* Dark border */
```

### Interactive Colors
```css
--hover-bg: #f8f9fa;             /* Hover background */
--hover-border: #007bff;         /* Hover border */
--selected-bg: #007bff;          /* Selected background */
--selected-text: #ffffff;        /* Selected text */
--disabled-bg: #e9ecef;          /* Disabled background */
--disabled-text: #6c757d;        /* Disabled text */
--focus-ring: #007bff;           /* Focus ring color */
```

## Size Variables

### Border Radius
```css
--border-radius: 8px;            /* Default border radius */
--border-radius-sm: 4px;         /* Small border radius */
--border-radius-md: 6px;         /* Medium border radius */
--border-radius-lg: 12px;        /* Large border radius */
--border-radius-xl: 16px;        /* Extra large border radius */
--border-radius-full: 9999px;    /* Full/circular border radius */
```

### Padding
```css
--padding-xs: 4px;               /* Extra small padding */
--padding-sm: 8px;               /* Small padding */
--padding-md: 12px;              /* Medium padding */
--padding-base: 16px;            /* Base/default padding */
--padding-lg: 20px;              /* Large padding */
--padding-xl: 24px;              /* Extra large padding */
--padding-2xl: 32px;             /* 2x large padding */
```

### Margin
```css
--margin-xs: 4px;                /* Extra small margin */
--margin-sm: 8px;                /* Small margin */
--margin-md: 12px;               /* Medium margin */
--margin-base: 16px;             /* Base/default margin */
--margin-lg: 20px;               /* Large margin */
--margin-xl: 24px;               /* Extra large margin */
--margin-2xl: 32px;              /* 2x large margin */
```

### Gap
```css
--gap-xs: 4px;                   /* Extra small gap */
--gap-sm: 8px;                   /* Small gap */
--gap-md: 12px;                  /* Medium gap */
--gap-base: 16px;                /* Base/default gap */
--gap-lg: 20px;                  /* Large gap */
--gap-xl: 24px;                  /* Extra large gap */
```

### Component Sizes
```css
--component-height-sm: 28px;     /* Small component height */
--component-height-md: 36px;     /* Medium component height */
--component-height-lg: 44px;     /* Large component height */
--component-height-xl: 52px;     /* Extra large component height */
```

### Calendar Specific
```css
--calendar-cell-size: 40px;      /* Size of calendar date cells */
--calendar-cell-gap: 8px;        /* Gap between calendar cells */
--calendar-padding: 16px;        /* Padding inside calendar */
--calendar-header-height: 48px;  /* Height of calendar header */
```

### Border Width
```css
--border-width: 1px;             /* Standard border width */
--border-width-2: 2px;           /* 2px border width */
--border-width-4: 4px;           /* 4px border width */
```

## Font Variables

### Font Family
```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-mono: 'Courier New', Courier, monospace;
--font-family-serif: Georgia, 'Times New Roman', serif;
```

### Font Size
```css
--font-size-xs: 11px;            /* Extra small font size */
--font-size-sm: 12px;            /* Small font size */
--font-size-base: 14px;          /* Base/default font size */
--font-size-md: 15px;            /* Medium font size */
--font-size-lg: 18px;            /* Large font size */
--font-size-xl: 20px;            /* Extra large font size */
--font-size-2xl: 24px;           /* 2x large font size */
--font-size-3xl: 30px;           /* 3x large font size */
```

### Font Weight
```css
--font-weight-light: 300;        /* Light font weight */
--font-weight-normal: 400;       /* Normal font weight */
--font-weight-medium: 500;       /* Medium font weight */
--font-weight-semibold: 600;     /* Semibold font weight */
--font-weight-bold: 700;         /* Bold font weight */
--font-weight-extrabold: 800;    /* Extra bold font weight */
```

### Line Height
```css
--line-height-tight: 1.2;        /* Tight line height */
--line-height-normal: 1.5;       /* Normal line height */
--line-height-relaxed: 1.75;     /* Relaxed line height */
--line-height-loose: 2;          /* Loose line height */
```

### Letter Spacing
```css
--letter-spacing-tight: -0.5px;  /* Tight letter spacing */
--letter-spacing-normal: 0px;    /* Normal letter spacing */
--letter-spacing-wide: 0.5px;    /* Wide letter spacing */
--letter-spacing-wider: 1px;     /* Extra wide letter spacing */
```

## Animation Variables

### Transition Duration
```css
--transition-duration-fast: 0.1s;    /* Fast transition */
--transition-duration-base: 0.2s;    /* Base/default transition */
--transition-duration-slow: 0.3s;    /* Slow transition */
--transition-duration-slower: 0.5s;  /* Slower transition */
```

### Transition Timing
```css
--transition-timing: ease;           /* Default easing */
--transition-timing-linear: linear;  /* Linear easing */
--transition-timing-ease-in: ease-in;
--transition-timing-ease-out: ease-out;
--transition-timing-ease-in-out: ease-in-out;
```

## Shadow Variables

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.2);
--shadow-2xl: 0 16px 32px rgba(0, 0, 0, 0.25);
```

## Z-Index Variables

```css
--z-index-dropdown: 1000;        /* Dropdown z-index */
--z-index-sticky: 1020;          /* Sticky z-index */
--z-index-fixed: 1030;           /* Fixed z-index */
--z-index-modal-backdrop: 1040;  /* Modal backdrop z-index */
--z-index-modal: 1050;           /* Modal z-index */
--z-index-popover: 1060;         /* Popover z-index */
--z-index-tooltip: 1070;         /* Tooltip z-index */
```

## Usage Examples

### Basic Usage
```html
<jalali-date-picker></jalali-date-picker>

<style>
  jalali-date-picker {
    --primary-color: #ff6b6b;
    --background: #f5f5f5;
    --text-color: #333333;
  }
</style>
```

### Custom Theme
```css
jalali-date-picker {
  /* Colors */
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  --background: #ffffff;
  --text-color: #1f2937;
  
  /* Sizes */
  --border-radius: 12px;
  --padding-base: 20px;
  --gap-base: 12px;
  
  /* Fonts */
  --font-size-base: 15px;
  --font-weight-semibold: 600;
  
  /* Animations */
  --transition-duration-base: 0.3s;
}
```

### Dark Mode
```css
@media (prefers-color-scheme: dark) {
  jalali-date-picker {
    --background: #1f2937;
    --text-color: #f3f4f6;
    --border-color: #374151;
    --hover-bg: #374151;
  }
}
```

### Responsive Adjustments
```css
@media (max-width: 600px) {
  jalali-date-picker {
    --padding-base: 12px;
    --font-size-base: 13px;
    --calendar-cell-size: 36px;
  }
}
```

## Shadow DOM Encapsulation

CSS Variables are scoped to the Shadow DOM, meaning:
- Variables defined on the host element are accessible within the Shadow DOM
- Variables do not leak out to the global scope
- Each instance can have its own variable values
- Parent page styles do not affect the component

## Responsive Design

The component includes built-in responsive breakpoints:

### Mobile (< 600px)
- Reduced padding and margins
- Smaller font sizes
- Optimized for touch interaction

### Tablet (600px - 1024px)
- Medium padding and margins
- Balanced font sizes

### Desktop (> 1024px)
- Full padding and margins
- Standard font sizes

## Accessibility Features

The component respects user preferences:

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are disabled */
}
```

### High Contrast
```css
@media (prefers-contrast: more) {
  /* Enhanced contrast and borders */
}
```

### Dark Mode
```css
@media (prefers-color-scheme: dark) {
  /* Dark theme colors */
}
```

## RTL/LTR Support

The component automatically adjusts for RTL languages:
```css
:host([dir="rtl"]) {
  direction: rtl;
}

:host([dir="ltr"]) {
  direction: ltr;
}
```

## Best Practices

1. **Use semantic variable names**: Use `--primary-color` instead of `--blue`
2. **Maintain consistency**: Use the same variables across your application
3. **Respect user preferences**: Don't override `prefers-color-scheme` or `prefers-reduced-motion`
4. **Test accessibility**: Verify your custom colors meet WCAG contrast requirements
5. **Document custom variables**: If you add custom variables, document them

## Testing CSS Variables

The component includes comprehensive tests for CSS Variables:

```bash
npm test -- web-component.styles.spec.ts
```

Tests verify:
- All variables are defined
- Variables have valid values
- Component styles use variables
- Responsive design works
- Dark mode support works
- RTL/LTR support works
- Accessibility features work

## Browser Support

CSS Variables are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+
- Opera 36+

IE 11 is not supported.

## Performance Considerations

- CSS Variables are computed at runtime, allowing dynamic theming
- No JavaScript required for theme switching
- Minimal performance impact
- Efficient for large applications with multiple instances

## Troubleshooting

### Variables not applying
- Ensure variables are set on the host element
- Check for typos in variable names
- Verify Shadow DOM is properly attached

### Colors not changing
- Check CSS specificity
- Ensure variables are set before component renders
- Verify browser supports CSS Variables

### Responsive styles not working
- Check media query breakpoints
- Verify viewport meta tag is set
- Test in actual device or browser DevTools

## Additional Resources

- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Components Spec](https://html.spec.whatwg.org/multipage/custom-elements.html)
- [Shadow DOM Spec](https://dom.spec.whatwg.org/#shadow-trees)
