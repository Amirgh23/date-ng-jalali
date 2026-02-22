/**
 * Memoization Utilities for Jalali Date Picker
 * Provides utilities for caching expensive computations
 */

/**
 * Simple memoization decorator for methods
 * @param target - Target object
 * @param propertyKey - Property key
 * @param descriptor - Property descriptor
 */
export function Memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}

/**
 * Create a memoized function
 * @param fn - Function to memoize
 * @param maxSize - Maximum cache size (default: 100)
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxSize: number = 100
): T {
  const cache = new Map();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    // Limit cache size
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  }) as T;
}

/**
 * Create a memoized function with TTL (Time To Live)
 * @param fn - Function to memoize
 * @param ttl - Time to live in milliseconds
 * @returns Memoized function with TTL
 */
export function memoizeWithTTL<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 60000
): T {
  const cache = new Map<string, { value: any; timestamp: number }>();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const cached = cache.get(key)!;
      if (now - cached.timestamp < ttl) {
        return cached.value;
      }
      cache.delete(key);
    }

    const result = fn(...args);
    cache.set(key, { value: result, timestamp: now });
    return result;
  }) as T;
}

/**
 * Clear all memoization caches
 */
export function clearMemoizationCache(): void {
  // This would need to be called on all memoized functions
  // For now, it's a placeholder
}
