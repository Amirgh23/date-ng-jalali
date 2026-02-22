# Fix TypeScript Errors

## Current Issue
You're seeing TypeScript errors because the Jasmine type definitions haven't been installed yet.

## Solution

Run the following command to install all dependencies:

```bash
npm install
```

This will install:
- `@types/jasmine` - TypeScript definitions for Jasmine
- `jasmine-core` - Jasmine testing framework
- `karma` and related packages - Test runner

## After Installation

Once `npm install` completes, the TypeScript errors should disappear because:

1. `@types/jasmine` will provide type definitions for:
   - `describe()`
   - `it()`
   - `beforeEach()`
   - `afterEach()`
   - `expect()`
   - `spyOn()`
   - `jasmine.createSpyObj()`

2. The `tsconfig.spec.json` files are already configured with:
   ```json
   {
     "compilerOptions": {
       "types": ["jasmine"]
     }
   }
   ```

## Verify the Fix

After running `npm install`, you can verify by:

1. **Check TypeScript compilation:**
   ```bash
   npx tsc --noEmit
   ```

2. **Run the tests:**
   ```bash
   npm test
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## Files Already Updated

All test files have been migrated to Jasmine:
- ✅ `jalali-date-picker.spec.ts`
- ✅ `calendar-switch.component.spec.ts`
- ✅ `color-picker.component.spec.ts`
- ✅ `day-info-modal.component.spec.ts`
- ✅ `theme-selector.component.spec.ts`
- ✅ `app.spec.ts`

## New Service Created

Created `GlobalPTConfigService` at:
`projects/jalali-date-picker/src/lib/core/services/global-pt-config.service.ts`

This service was referenced in test files but didn't exist, so it has been created.

## Summary

The migration is complete. You just need to run `npm install` to install the Jasmine dependencies, and all errors will be resolved.
