import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl?: number; // Time to live in milliseconds
}

/**
 * سرویس کش برای بهینه‌سازی محاسبات تاریخ
 * Cache Service for optimizing date calculations
 */
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private maxCacheSize = 1000;
  private cleanupInterval = 60000; // 1 minute

  constructor() {
    this.startCleanupInterval();
  }

  /**
   * ذخیره مقدار در کش
   * Store value in cache
   */
  set<T>(key: string, value: T, ttl?: number): void {
    if (this.cache.size >= this.maxCacheSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * دریافت مقدار از کش
   * Get value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // بررسی انقضای TTL
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  /**
   * بررسی وجود کلید در کش
   * Check if key exists in cache
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * حذف کلید از کش
   * Delete key from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * پاک کردن تمام کش
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * دریافت اندازه کش
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * دریافت آمار کش
   * Get cache statistics
   */
  getStats(): { size: number; maxSize: number; hitRate: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
      hitRate: 0 // می‌توان بهتر پیاده‌سازی کرد
    };
  }

  /**
   * حذف قدیمی‌ترین ورودی
   * Evict oldest entry
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * شروع بازه‌ی تمیز‌کاری خودکار
   * Start automatic cleanup interval
   */
  private startCleanupInterval(): void {
    setInterval(() => {
      this.cleanup();
    }, this.cleanupInterval);
  }

  /**
   * تمیز کردن ورودی‌های منقضی
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (entry.ttl && now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * تنظیم حداکثر اندازه کش
   * Set maximum cache size
   */
  setMaxCacheSize(size: number): void {
    this.maxCacheSize = size;
  }

  /**
   * تنظیم بازه‌ی تمیز‌کاری
   * Set cleanup interval
   */
  setCleanupInterval(interval: number): void {
    // می‌توان بهتر پیاده‌سازی کرد
  }
}
