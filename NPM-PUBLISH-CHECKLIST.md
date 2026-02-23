# ✅ NPM Publish Checklist

## Pre-Publish Checklist

### 1. Package Configuration ✅
- [x] Package name set to scoped: `@your-org/jalali-date-picker`
- [x] Version set to `1.0.0`
- [x] Description added
- [x] Keywords added for discoverability
- [x] Author information added
- [x] License set to MIT
- [x] Repository URL added
- [x] Homepage URL added
- [x] Bugs URL added

### 2. Build Configuration ✅
- [x] Compilation mode set to `partial` (required for npm)
- [x] `sideEffects` set to `false` for tree-shaking
- [x] LICENSE file created
- [x] README.md updated with complete documentation
- [x] .npmignore configured

### 3. Code Quality ✅
- [x] All TypeScript errors fixed
- [x] Build successful: `ng build jalali-date-picker --configuration production`
- [x] No compilation warnings
- [x] Public API exports verified

### 4. Documentation ✅
- [x] README.md includes:
  - Installation instructions
  - Basic usage examples
  - API reference
  - Features list
  - Custom z-index documentation

### 5. Testing ✅
- [x] All tests migrated to Jasmine/Karma
- [x] Test files present for all components
- [x] Demo application working

## Publishing Steps

### Before First Publish

1. **Update package.json with your information:**
   ```bash
   # Edit: projects/jalali-date-picker/package.json
   # Change:
   # - @your-org/jalali-date-picker → @your-actual-org/jalali-date-picker
   # - Author name and email
   # - Repository URLs
   ```

2. **Login to npm:**
   ```bash
   npm login
   ```

3. **Build the library:**
   ```bash
   ng build jalali-date-picker --configuration production
   ```

4. **Navigate to dist folder:**
   ```bash
   cd dist/jalali-date-picker
   ```

5. **Verify package contents:**
   ```bash
   npm pack --dry-run
   ```

6. **Publish to npm:**
   ```bash
   # For scoped packages (first time):
   npm publish --access public
   
   # For subsequent updates:
   npm publish
   ```

### Version Updates

For future updates, follow semantic versioning:

```bash
# Patch release (bug fixes): 1.0.0 → 1.0.1
npm version patch

# Minor release (new features): 1.0.0 → 1.1.0
npm version minor

# Major release (breaking changes): 1.0.0 → 2.0.0
npm version major
```

## Post-Publish

1. **Verify package on npm:**
   - Visit: https://www.npmjs.com/package/@your-org/jalali-date-picker

2. **Test installation:**
   ```bash
   npm install @your-org/jalali-date-picker
   ```

3. **Create a GitHub release:**
   - Tag the version
   - Add release notes

## Package Contents

The published package includes:
- ✅ Compiled JavaScript (ESM format)
- ✅ TypeScript definitions (.d.ts files)
- ✅ README.md
- ✅ LICENSE
- ✅ package.json

## Important Notes

⚠️ **Before publishing:**
1. Replace `@your-org` with your actual npm organization/username
2. Update author information
3. Update repository URLs
4. Test the package locally first

✅ **Package is ready for npm publish!**

## Current Build Status

```
Build Mode: Partial Compilation ✅
Package Name: @your-org/jalali-date-picker
Version: 1.0.0
License: MIT
Size: ~408 KB (minified)
```

## Features Included

- 📅 3 Calendar Systems (Jalali, Gregorian, Hijri)
- 🎨 21 Pre-built Themes
- 🌍 4 Languages (Persian, English, Arabic, Kurdish)
- ♿ Full Accessibility Support
- ⚡ High Performance (OnPush, Caching)
- 🎯 3 Selection Modes (Single, Range, Multiple)
- 🔧 Highly Customizable (Pass-Through, z-index, etc.)
