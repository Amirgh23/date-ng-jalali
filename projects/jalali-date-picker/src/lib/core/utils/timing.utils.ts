/**
 * Timing Utilities for Jalali Date Picker
 * Provides utilities for debouncing and throttling
 */

/**
 * Debounce a function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Throttle a function
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number = 300
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Debounce decorator for methods
 * @param delay - Delay in milliseconds
 */
export function Debounce(delay: number = 300) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    descriptor.value = function (...args: any[]) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
        timeoutId = null;
      }, delay);
    };

    return descriptor;
  };
}

/**
 * Throttle decorator for methods
 * @param limit - Time limit in milliseconds
 */
export function Throttle(limit: number = 300) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let inThrottle: boolean = false;

    descriptor.value = function (...args: any[]) {
      if (!inThrottle) {
        originalMethod.apply(this, args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };

    return descriptor;
  };
}

/**
 * Request animation frame debounce
 * @param fn - Function to debounce
 * @returns Debounced function using RAF
 */
export function rafDebounce<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return (...args: Parameters<T>) => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  };
}
