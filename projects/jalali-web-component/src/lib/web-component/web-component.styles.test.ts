/**
 * Simple test to verify CSS Variables are properly defined
 * This test can be run independently to validate the styles
 */

import { getWebComponentStyles } from './web-component.styles';

// Test 1: Verify all color variables are defined
function testColorVariables() {
  const styles = getWebComponentStyles();
  const colorVars = [
    '--primary-color',
    '--secondary-color',
    '--accent-color',
    '--success-color',
    '--warning-color',
    '--error-color',
    '--info-color',
    '--background',
    '--text-color',
    '--border-color',
    '--hover-bg',
    '--selected-bg',
    '--disabled-bg',
  ];

  const missing: string[] = [];
  colorVars.forEach(variable => {
    if (!styles.includes(variable)) {
      missing.push(variable);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing color variables:', missing);
    return false;
  }
  console.log('✓ All color variables defined');
  return true;
}

// Test 2: Verify all size variables are defined
function testSizeVariables() {
  const styles = getWebComponentStyles();
  const sizeVars = [
    '--border-radius',
    '--padding-base',
    '--padding-sm',
    '--margin-base',
    '--gap-base',
    '--component-height-md',
    '--calendar-cell-size',
  ];

  const missing: string[] = [];
  sizeVars.forEach(variable => {
    if (!styles.includes(variable)) {
      missing.push(variable);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing size variables:', missing);
    return false;
  }
  console.log('✓ All size variables defined');
  return true;
}

// Test 3: Verify all font variables are defined
function testFontVariables() {
  const styles = getWebComponentStyles();
  const fontVars = [
    '--font-family',
    '--font-size-base',
    '--font-size-sm',
    '--font-size-lg',
    '--font-weight-normal',
    '--font-weight-semibold',
    '--font-weight-bold',
    '--line-height-normal',
  ];

  const missing: string[] = [];
  fontVars.forEach(variable => {
    if (!styles.includes(variable)) {
      missing.push(variable);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing font variables:', missing);
    return false;
  }
  console.log('✓ All font variables defined');
  return true;
}

// Test 4: Verify animation variables are defined
function testAnimationVariables() {
  const styles = getWebComponentStyles();
  const animVars = [
    '--transition-duration-base',
    '--transition-timing',
    '--shadow-md',
  ];

  const missing: string[] = [];
  animVars.forEach(variable => {
    if (!styles.includes(variable)) {
      missing.push(variable);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing animation variables:', missing);
    return false;
  }
  console.log('✓ All animation variables defined');
  return true;
}

// Test 5: Verify component styles are defined
function testComponentStyles() {
  const styles = getWebComponentStyles();
  const components = [
    '.jalali-date-picker-container',
    '.calendar-header',
    '.date-cell',
    '.date-cell.selected',
    '.date-cell.disabled',
    '.theme-selector',
    '.color-picker',
    '.calendar-switch',
  ];

  const missing: string[] = [];
  components.forEach(component => {
    if (!styles.includes(component)) {
      missing.push(component);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing component styles:', missing);
    return false;
  }
  console.log('✓ All component styles defined');
  return true;
}

// Test 6: Verify responsive design support
function testResponsiveDesign() {
  const styles = getWebComponentStyles();
  const mediaQueries = [
    '@media (max-width: 599px)',
    '@media (min-width: 600px) and (max-width: 1024px)',
    '@media (min-width: 1025px)',
  ];

  const missing: string[] = [];
  mediaQueries.forEach(query => {
    if (!styles.includes(query)) {
      missing.push(query);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing responsive design queries:', missing);
    return false;
  }
  console.log('✓ All responsive design queries defined');
  return true;
}

// Test 7: Verify dark mode support
function testDarkModeSupport() {
  const styles = getWebComponentStyles();
  const darkModeQueries = [
    '@media (prefers-color-scheme: dark)',
    '@media (prefers-color-scheme: light)',
  ];

  const missing: string[] = [];
  darkModeQueries.forEach(query => {
    if (!styles.includes(query)) {
      missing.push(query);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing dark mode queries:', missing);
    return false;
  }
  console.log('✓ Dark mode support defined');
  return true;
}

// Test 8: Verify RTL/LTR support
function testRTLLTRSupport() {
  const styles = getWebComponentStyles();
  const rtlLtrQueries = [
    ':host([dir="rtl"])',
    ':host([dir="ltr"])',
  ];

  const missing: string[] = [];
  rtlLtrQueries.forEach(query => {
    if (!styles.includes(query)) {
      missing.push(query);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing RTL/LTR support:', missing);
    return false;
  }
  console.log('✓ RTL/LTR support defined');
  return true;
}

// Test 9: Verify accessibility features
function testAccessibilityFeatures() {
  const styles = getWebComponentStyles();
  const a11yFeatures = [
    '@media (prefers-contrast: more)',
    '@media (prefers-reduced-motion: reduce)',
    ':focus',
    'outline:',
  ];

  const missing: string[] = [];
  a11yFeatures.forEach(feature => {
    if (!styles.includes(feature)) {
      missing.push(feature);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing accessibility features:', missing);
    return false;
  }
  console.log('✓ Accessibility features defined');
  return true;
}

// Test 10: Verify CSS variable usage in styles
function testCSSVariableUsage() {
  const styles = getWebComponentStyles();
  const varUsages = styles.match(/var\(--[a-z-]+\)/g);

  if (!varUsages || varUsages.length < 50) {
    console.error('❌ Not enough CSS variable usages found:', varUsages?.length || 0);
    return false;
  }
  console.log(`✓ CSS variables used ${varUsages.length} times in styles`);
  return true;
}

// Run all tests
export function runAllTests() {
  console.log('\n=== CSS Variables Test Suite ===\n');
  
  const tests = [
    testColorVariables,
    testSizeVariables,
    testFontVariables,
    testAnimationVariables,
    testComponentStyles,
    testResponsiveDesign,
    testDarkModeSupport,
    testRTLLTRSupport,
    testAccessibilityFeatures,
    testCSSVariableUsage,
  ];

  let passed = 0;
  let failed = 0;

  tests.forEach(test => {
    try {
      if (test()) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`❌ Test ${test.name} threw error:`, error);
      failed++;
    }
  });

  console.log(`\n=== Test Results ===`);
  console.log(`✓ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Total: ${tests.length}\n`);

  return failed === 0;
}

// Export for use in other test files
export {
  testColorVariables,
  testSizeVariables,
  testFontVariables,
  testAnimationVariables,
  testComponentStyles,
  testResponsiveDesign,
  testDarkModeSupport,
  testRTLLTRSupport,
  testAccessibilityFeatures,
  testCSSVariableUsage,
};
