/**
 * Lazy Loading Utilities for Jalali Date Picker
 * Provides utilities for lazy loading themes and components
 */

/**
 * Lazy load a theme stylesheet
 * @param themeName - Name of the theme to load
 * @returns Promise that resolves when theme is loaded
 */
export async function lazyLoadTheme(themeName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/assets/themes/${themeName}-theme.css`;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load theme: ${themeName}`));
      document.head.appendChild(link);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Lazy load a component module
 * @param modulePath - Path to the module
 * @returns Promise that resolves to the module
 */
export async function lazyLoadComponent(modulePath: string): Promise<any> {
  try {
    const module = await import(modulePath);
    return module;
  } catch (error) {
    console.error(`Failed to lazy load component: ${modulePath}`, error);
    throw error;
  }
}

/**
 * Preload themes in the background
 * @param themeNames - Array of theme names to preload
 */
export function preloadThemes(themeNames: string[]): void {
  if (typeof window === 'undefined') return;

  themeNames.forEach(themeName => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/assets/themes/${themeName}-theme.css`;
    document.head.appendChild(link);
  });
}

/**
 * Cache loaded themes
 */
const themeCache = new Map<string, boolean>();

/**
 * Check if theme is already loaded
 * @param themeName - Name of the theme
 * @returns true if theme is loaded
 */
export function isThemeLoaded(themeName: string): boolean {
  return themeCache.has(themeName);
}

/**
 * Mark theme as loaded
 * @param themeName - Name of the theme
 */
export function markThemeAsLoaded(themeName: string): void {
  themeCache.set(themeName, true);
}

/**
 * Clear theme cache
 */
export function clearThemeCache(): void {
  themeCache.clear();
}
