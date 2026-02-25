# Troubleshooting Guide - Jalali Date Picker Vanilla JavaScript

Common issues and solutions when using the Jalali Date Picker Web Component.

## Table of Contents

- [Component Not Rendering](#component-not-rendering)
- [Events Not Firing](#events-not-firing)
- [Styles Not Applied](#styles-not-applied)
- [Date Not Persisting](#date-not-persisting)
- [Locale Not Changing](#locale-not-changing)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)
- [Memory Leaks](#memory-leaks)

## Component Not Rendering

### Problem: Web component doesn't appear on the page

**Symptoms:**
- No date picker visible
- No console errors
- Element exists in DOM but is empty

**Solutions:**

1. **Check script loading order**
   ```html
   <!-- ✓ Correct: Script loaded before component -->
   <script src="jalali-date-picker.js"></script>
   <jalali-date-picker></jalali-date-picker>

   <!-- ✗ Wrong: Component before script -->
   <jalali-date-picker></jalali-date-picker>
   <script src="jalali-date-picker.js"></script>
   ```

2. **Verify script is loaded**
   ```javascript
   // Check if component is registered
   console.log(customElements.get('jalali-date-picker'));
   // Should return the component class, not undefined
   ```

3. **Check for script errors**
   ```javascript
   // Open browser console (F12) and check for errors
   // Look for 404 errors or syntax errors
   ```

4. **Ensure DOM is ready**
   ```javascript
   // Wait for DOM to be ready
   document.addEventListener('DOMContentLoaded', () => {
     const picker = document.querySelector('jalali-date-picker');
     console.log('Picker:', picker);
   });
   ```

5. **Check browser support**
   - Web Components require modern browsers
   - Chrome 67+, Firefox 63+, Safari 10.1+
   - IE is not supported

## Events Not Firing

### Problem: Event listeners don't trigger

**Symptoms:**
- Event listener added but callback never called
- No errors in console
- Date selection doesn't trigger events

**Solutions:**

1. **Verify element exists**
   ```javascript
   // ✓ Correct
   const picker = document.getElementById('my-picker');
   if (picker) {
     picker.addEventListener('dateSelect', handler);
   }

   // ✗ Wrong: Element not found
   const picker = document.getElementById('non-existent');
   picker.addEventListener('dateSelect', handler); // Error!
   ```

2. **Check event name spelling**
   ```javascript
   // ✓ Correct event names
   picker.addEventListener('dateSelect', handler);
   picker.addEventListener('rangeSelect', handler);
   picker.addEventListener('multipleSelect', handler);
   picker.addEventListener('localeChange', handler);
   picker.addEventListener('themeChange', handler);

   // ✗ Wrong
   picker.addEventListener('dateselect', handler); // Wrong case
   picker.addEventListener('onDateSelect', handler); // Wrong prefix
   ```

3. **Ensure picker is in DOM**
   ```javascript
   // Check if element is in document
   console.log(document.body.contains(picker)); // Should be true
   ```

4. **Test with simple handler**
   ```javascript
   // Simple test to verify events work
   picker.addEventListener('dateSelect', (event) => {
     console.log('Event fired!', event);
   });

   // Manually trigger selection
   picker.setDate(new Date());
   ```

5. **Check for event bubbling issues**
   ```javascript
   // Events should bubble from Shadow DOM
   // If not working, try capturing phase
   picker.addEventListener('dateSelect', handler, true);
   ```

## Styles Not Applied

### Problem: Component doesn't look right or styles are missing

**Symptoms:**
- Component appears unstyled
- Colors not showing
- Layout is broken
- Styles from page affecting component

**Solutions:**

1. **Use CSS Variables for customization**
   ```css
   /* ✓ Correct: Use CSS variables */
   jalali-date-picker {
     --primary-color: #667eea;
     --secondary-color: #764ba2;
     --accent-color: #28a745;
     --background: #ffffff;
     --text-color: #333333;
   }

   /* ✗ Wrong: Direct styling doesn't work (Shadow DOM) */
   jalali-date-picker {
     background: red; /* Won't work */
     color: blue; /* Won't work */
   }
   ```

2. **Check theme is set**
   ```javascript
   // Verify theme is applied
   const picker = document.getElementById('my-picker');
   console.log('Theme:', picker.theme);

   // Set theme if not set
   if (!picker.theme) {
     picker.theme = 'light';
   }
   ```

3. **Verify CSS is loaded**
   ```html
   <!-- Check if CSS file is loaded -->
   <link rel="stylesheet" href="styles.css">
   ```

4. **Check for CSS conflicts**
   ```css
   /* Remove any global styles that might conflict */
   /* Check for * { margin: 0; padding: 0; } */
   /* These shouldn't affect Shadow DOM but verify */
   ```

5. **Inspect Shadow DOM**
   ```javascript
   // In browser DevTools:
   // 1. Right-click on element
   // 2. Select "Inspect"
   // 3. Look for Shadow DOM section
   // 4. Check computed styles
   ```

## Date Not Persisting

### Problem: Selected date is lost or not saved

**Symptoms:**
- Date resets after page reload
- Date not saved to form
- Date property returns null unexpectedly

**Solutions:**

1. **Use correct property setter**
   ```javascript
   // ✓ Correct: Use property
   picker.selectedDate = new Date(2024, 0, 15);

   // ✓ Also correct: Use method
   picker.setDate(new Date(2024, 0, 15));

   // ✗ Wrong: Attribute only
   picker.setAttribute('selected-date', '2024-01-15');
   // This won't update the property
   ```

2. **Verify date is valid**
   ```javascript
   // Check if date is valid
   const date = new Date(2024, 0, 15);
   console.log('Valid date:', date instanceof Date && !isNaN(date));

   // ✗ Invalid dates
   const invalid1 = new Date('invalid');
   const invalid2 = new Date(NaN);
   ```

3. **Save to localStorage**
   ```javascript
   // Save date to localStorage
   picker.addEventListener('dateSelect', (event) => {
     localStorage.setItem('selectedDate', event.detail.date.toISOString());
   });

   // Load from localStorage
   const stored = localStorage.getItem('selectedDate');
   if (stored) {
     picker.setDate(new Date(stored));
   }
   ```

4. **Check form submission**
   ```javascript
   // Include date in form data
   const form = document.getElementById('my-form');
   form.addEventListener('submit', (event) => {
     event.preventDefault();
     const formData = new FormData(form);
     formData.append('date', picker.selectedDate.toISOString());
     // Send to server
   });
   ```

5. **Verify picker is not reset**
   ```javascript
   // Check if reset() is being called
   // This clears the selected date
   picker.reset(); // Clears date

   // Use setDate() instead to update
   picker.setDate(new Date());
   ```

## Locale Not Changing

### Problem: Locale doesn't change or text doesn't update

**Symptoms:**
- Locale property doesn't change
- Text remains in original language
- Direction (RTL/LTR) doesn't change

**Solutions:**

1. **Set locale correctly**
   ```javascript
   // ✓ Correct
   picker.locale = 'fa'; // Persian
   picker.locale = 'en'; // English

   // ✗ Wrong
   picker.locale = 'persian'; // Not valid
   picker.locale = 'en-US'; // Not valid
   ```

2. **Verify locale is supported**
   ```javascript
   // Check supported locales
   const supported = ['fa', 'en'];
   if (supported.includes('fr')) {
     picker.locale = 'fr';
   } else {
     console.warn('Locale not supported');
   }
   ```

3. **Update all pickers**
   ```javascript
   // If multiple pickers, update all
   document.querySelectorAll('jalali-date-picker').forEach(picker => {
     picker.locale = 'en';
   });
   ```

4. **Listen to locale change event**
   ```javascript
   // Verify locale change event fires
   picker.addEventListener('localeChange', (event) => {
     console.log('Locale changed to:', event.detail.locale);
   });

   picker.locale = 'en';
   ```

5. **Check for caching**
   ```javascript
   // Clear browser cache if locale doesn't update
   // Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   ```

## Performance Issues

### Problem: Component is slow or causes lag

**Symptoms:**
- Slow date selection
- Lag when typing
- High CPU usage
- Memory usage increases over time

**Solutions:**

1. **Debounce rapid events**
   ```javascript
   // Debounce event handlers
   function debounce(func, wait) {
     let timeout;
     return function(...args) {
       clearTimeout(timeout);
       timeout = setTimeout(() => func(...args), wait);
     };
   }

   const handleDateSelect = debounce((event) => {
     console.log('Date selected:', event.detail.date);
   }, 300);

   picker.addEventListener('dateSelect', handleDateSelect);
   ```

2. **Use event delegation**
   ```javascript
   // Instead of adding listeners to each picker
   const container = document.getElementById('pickers-container');
   container.addEventListener('dateSelect', (event) => {
     if (event.target.tagName === 'JALALI-DATE-PICKER') {
       console.log('Date selected:', event.detail.date);
     }
   });
   ```

3. **Lazy load component**
   ```javascript
   // Load component only when needed
   async function loadPicker() {
     if (!customElements.get('jalali-date-picker')) {
       const script = document.createElement('script');
       script.src = 'jalali-date-picker.js';
       document.head.appendChild(script);
       await new Promise(resolve => script.onload = resolve);
     }
   }

   document.getElementById('load-btn').addEventListener('click', loadPicker);
   ```

4. **Memoize calculations**
   ```javascript
   // Cache expensive calculations
   const cache = new Map();

   function calculateDays(start, end) {
     const key = `${start.getTime()}-${end.getTime()}`;
     if (cache.has(key)) {
       return cache.get(key);
     }
     const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
     cache.set(key, days);
     return days;
   }
   ```

5. **Monitor performance**
   ```javascript
   // Use Performance API
   performance.mark('date-select-start');
   picker.setDate(new Date());
   performance.mark('date-select-end');
   performance.measure('date-select', 'date-select-start', 'date-select-end');

   const measure = performance.getEntriesByName('date-select')[0];
   console.log('Duration:', measure.duration, 'ms');
   ```

## Browser Compatibility

### Problem: Component doesn't work in certain browsers

**Symptoms:**
- Works in Chrome but not Firefox
- Works on desktop but not mobile
- Polyfills not working

**Solutions:**

1. **Check browser support**
   ```javascript
   // Check if Web Components are supported
   if ('customElements' in window) {
     console.log('Web Components supported');
   } else {
     console.log('Web Components not supported');
     // Load polyfills
   }
   ```

2. **Load polyfills for older browsers**
   ```html
   <!-- Add polyfills for older browsers -->
   <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
   <script src="jalali-date-picker.js"></script>
   ```

3. **Test in different browsers**
   - Chrome/Edge: 67+
   - Firefox: 63+
   - Safari: 10.1+
   - IE: Not supported

4. **Use feature detection**
   ```javascript
   // Detect features and provide fallbacks
   if (!customElements.get('jalali-date-picker')) {
     // Load fallback or polyfill
     console.warn('Date picker not available');
   }
   ```

## Memory Leaks

### Problem: Memory usage increases over time

**Symptoms:**
- Memory usage grows continuously
- Browser becomes slower
- Crashes after extended use

**Solutions:**

1. **Remove event listeners**
   ```javascript
   // Always remove listeners when done
   const handler = (event) => {
     console.log('Date selected:', event.detail.date);
   };

   picker.addEventListener('dateSelect', handler);

   // Later, remove listener
   picker.removeEventListener('dateSelect', handler);
   ```

2. **Clean up on element removal**
   ```javascript
   // Remove listeners before removing element
   function removePicker(picker) {
     // Remove all listeners
     const newPicker = picker.cloneNode(true);
     picker.parentNode.replaceChild(newPicker, picker);
   }
   ```

3. **Use weak references**
   ```javascript
   // Use WeakMap for storing references
   const pickerData = new WeakMap();

   function attachData(picker, data) {
     pickerData.set(picker, data);
   }

   // Data is automatically cleaned up when picker is removed
   ```

4. **Monitor memory usage**
   ```javascript
   // Use Chrome DevTools Memory profiler
   // 1. Open DevTools (F12)
   // 2. Go to Memory tab
   // 3. Take heap snapshot
   // 4. Look for detached DOM nodes
   ```

5. **Avoid circular references**
   ```javascript
   // ✗ Wrong: Circular reference
   picker.data = {
     picker: picker // Circular!
   };

   // ✓ Correct: Store only needed data
   picker.data = {
     date: new Date(),
     locale: 'fa'
   };
   ```

---

If you encounter issues not listed here, please:

1. Check the browser console for errors (F12)
2. Verify the component is properly loaded
3. Check the component's README for API documentation
4. Open an issue on GitHub with:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Console errors (if any)
