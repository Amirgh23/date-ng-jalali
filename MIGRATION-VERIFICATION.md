# Jasmine Migration Verification Checklist

## Configuration Files ✓

### package.json
- [x] Removed `vitest` dependency
- [x] Removed `jsdom` dependency
- [x] Added `@types/jasmine` (~5.1.0)
- [x] Added `jasmine-core` (~5.1.0)
- [x] Added `karma` (~6.4.0)
- [x] Added `karma-chrome-launcher` (~3.2.0)
- [x] Added `karma-coverage` (~2.2.0)
- [x] Added `karma-jasmine` (~5.1.0)
- [x] Added `karma-jasmine-html-reporter` (~2.1.0)

### karma.conf.js
- [x] Created new file
- [x] Configured Jasmine framework
- [x] Set up Chrome browser
- [x] Configured coverage reporting
- [x] Set up test environment

### test-setup.ts
- [x] Removed Vitest imports
- [x] Added BrowserDynamicTestingModule
- [x] Added platformBrowserDynamicTesting
- [x] Maintained localStorage clearing
- [x] Kept matchMedia polyfill

### tsconfig.spec.json (jalali-date-picker)
- [x] Changed types from `["vitest/globals"]` to `["jasmine"]`

### tsconfig.spec.json (demo)
- [x] Changed types from `["vitest/globals"]` to `["jasmine"]`

### vitest.config.ts
- [x] Deleted file

## Test Files ✓

### jalali-date-picker.spec.ts
- [x] Removed Vitest imports
- [x] Jasmine globals available globally
- [x] All tests preserved

### calendar-switch.component.spec.ts
- [x] Replaced `vi.fn()` with `jasmine.createSpyObj()`
- [x] Replaced `.mockReturnValue()` with `.and.returnValue()`
- [x] Replaced `.mockImplementation()` with `.and.callFake()`
- [x] Replaced `vi.spyOn()` with `spyOn()`
- [x] Updated all spy patterns
- [x] All tests preserved

### color-picker.component.spec.ts
- [x] Replaced `vi.fn()` with `jasmine.createSpyObj()`
- [x] Replaced `.mockReturnValue()` with `.and.returnValue()`
- [x] Replaced `.mockImplementation()` with `.and.callFake()`
- [x] Replaced `vi.spyOn()` with `spyOn()`
- [x] Updated all spy patterns
- [x] All tests preserved

### day-info-modal.component.spec.ts
- [x] Replaced `vi.fn()` with `jasmine.createSpyObj()`
- [x] Replaced `.mockReturnValue()` with `.and.returnValue()`
- [x] Replaced `.mockImplementation()` with `.and.callFake()`
- [x] Replaced `vi.spyOn()` with `spyOn()`
- [x] Updated all spy patterns
- [x] All tests preserved

### theme-selector.component.spec.ts
- [x] Replaced `vi.fn()` with `jasmine.createSpyObj()`
- [x] Replaced `.mockReturnValue()` with `.and.returnValue()`
- [x] Replaced `.mockImplementation()` with `.and.callFake()`
- [x] Replaced `vi.spyOn()` with `spyOn()`
- [x] Updated all spy patterns
- [x] All tests preserved

### app.spec.ts
- [x] Already compatible with Jasmine
- [x] No changes needed

## Syntax Conversions ✓

### Spy Creation
- [x] `vi.fn()` → `jasmine.createSpyObj()`
- [x] `vi.spyOn()` → `spyOn()`

### Mock Configuration
- [x] `.mockReturnValue()` → `.and.returnValue()`
- [x] `.mockImplementation()` → `.and.callFake()`

### Spy Verification
- [x] `toHaveBeenCalled()` - No change needed
- [x] `toHaveBeenCalledWith()` - No change needed
- [x] `toHaveBeenCalledTimes()` - No change needed

## Test Coverage

### Total Test Files: 6
- [x] jalali-date-picker.spec.ts
- [x] calendar-switch.component.spec.ts
- [x] color-picker.component.spec.ts
- [x] day-info-modal.component.spec.ts
- [x] theme-selector.component.spec.ts
- [x] app.spec.ts

### Total Test Suites: 6
- [x] JalaliDatePickerComponent
- [x] CalendarSwitchComponent PT
- [x] ColorPickerComponent PT
- [x] DayInfoModalComponent PT
- [x] ThemeSelectorComponent
- [x] AppComponent

## Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Tests**
   ```bash
   npm test
   ```

3. **Verify Coverage**
   - Check `coverage/jalali-date-picker/` directory
   - Review HTML report in browser

4. **Build Project**
   ```bash
   npm run build
   ```

5. **Run Demo**
   ```bash
   npm start
   ```

## Expected Results

After running `npm test`:
- All 6 test files should be discovered
- All tests should pass
- Coverage reports should be generated
- No Vitest-related errors should appear
- Jasmine should be the active test runner

## Troubleshooting

### Issue: Tests not found
- Ensure karma.conf.js is in root directory
- Check that test-setup.ts is properly configured
- Verify tsconfig.spec.json has correct types

### Issue: Spy errors
- Ensure using `jasmine.createSpyObj()` for mock objects
- Use `.and.returnValue()` instead of `.mockReturnValue()`
- Use `spyOn()` instead of `vi.spyOn()`

### Issue: Module not found
- Run `npm install` to install all dependencies
- Clear node_modules and reinstall if needed

## Documentation

- [x] JASMINE-MIGRATION-SUMMARY.md - Overview of changes
- [x] JASMINE-QUICK-REFERENCE.md - Quick reference guide
- [x] MIGRATION-VERIFICATION.md - This file

## Status: ✅ COMPLETE

All files have been successfully migrated from Vitest to Jasmine/Karma.
The project is ready for testing with the new framework.
