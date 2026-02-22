import { Injectable } from '@angular/core';
import { 
  PassThroughElementOptions, 
  PassThroughMethodOptions,
  PassThroughType 
} from '../models/pass-through.model';

/**
 * Service for managing style classes and Pass Through options
 * Inspired by PrimeNG's styling system
 */
@Injectable({
  providedIn: 'root'
})
export class StyleClassService {
  
  /**
   * Resolve Pass Through options (handle both static and function-based)
   */
  resolvePassThrough<T = PassThroughElementOptions>(
    pt: PassThroughType<T> | undefined,
    options: PassThroughMethodOptions
  ): T | undefined {
    if (!pt) return undefined;
    
    if (typeof pt === 'function') {
      return (pt as Function)(options) as T;
    }
    
    return pt as T;
  }
  
  /**
   * Merge multiple class sources into a single string
   * Handles strings, arrays, and objects with boolean values
   */
  mergeClasses(...classes: (string | string[] | { [key: string]: boolean } | undefined | null)[]): string {
    const result: string[] = [];
    
    for (const cls of classes) {
      if (!cls) continue;
      
      if (typeof cls === 'string') {
        // Split by spaces and add all classes
        result.push(...cls.split(' ').filter(c => c.trim()));
      } else if (Array.isArray(cls)) {
        // Add all array items
        result.push(...cls.filter(c => c && c.trim()));
      } else if (typeof cls === 'object') {
        // Add keys where value is true
        for (const [key, value] of Object.entries(cls)) {
          if (value && key.trim()) {
            result.push(key);
          }
        }
      }
    }
    
    // Remove duplicates and return
    return [...new Set(result)].join(' ');
  }
  
  /**
   * Merge multiple style objects
   */
  mergeStyles(...styles: ({ [key: string]: any } | undefined | null)[]): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    
    for (const style of styles) {
      if (style && typeof style === 'object') {
        Object.assign(result, style);
      }
    }
    
    return result;
  }
  
  /**
   * Get classes for an element from PT options
   */
  getElementClasses(
    baseClass: string | string[],
    ptOptions?: PassThroughElementOptions,
    conditionalClasses?: { [key: string]: boolean }
  ): string {
    return this.mergeClasses(
      baseClass,
      conditionalClasses,
      ptOptions?.class
    );
  }
  
  /**
   * Get styles for an element from PT options
   */
  getElementStyles(
    baseStyle?: { [key: string]: any },
    ptOptions?: PassThroughElementOptions
  ): { [key: string]: any } {
    return this.mergeStyles(baseStyle, ptOptions?.style);
  }
  
  /**
   * Get all attributes for an element from PT options
   */
  getElementAttrs(
    ptOptions?: PassThroughElementOptions
  ): { [key: string]: any } {
    const attrs: { [key: string]: any } = {};
    
    // Add regular attributes
    if (ptOptions?.attrs) {
      Object.assign(attrs, ptOptions.attrs);
    }
    
    // Add data attributes with 'data-' prefix
    if (ptOptions?.data) {
      for (const [key, value] of Object.entries(ptOptions.data)) {
        attrs[`data-${key}`] = value;
      }
    }
    
    return attrs;
  }
  
  /**
   * Get complete element properties (class, style, attrs)
   */
  getElementProps(
    baseClass: string | string[],
    baseStyle?: { [key: string]: any },
    ptOptions?: PassThroughElementOptions,
    conditionalClasses?: { [key: string]: boolean }
  ): {
    class: string;
    style: { [key: string]: any };
    attrs: { [key: string]: any };
  } {
    return {
      class: this.getElementClasses(baseClass, ptOptions, conditionalClasses),
      style: this.getElementStyles(baseStyle, ptOptions),
      attrs: this.getElementAttrs(ptOptions)
    };
  }
  
  /**
   * Check if a class exists in the merged classes
   */
  hasClass(className: string, ...classes: (string | string[] | { [key: string]: boolean } | undefined)[]): boolean {
    const merged = this.mergeClasses(...classes);
    return merged.split(' ').includes(className);
  }
  
  /**
   * Toggle a class in the class list
   */
  toggleClass(
    className: string,
    condition: boolean,
    existingClasses?: string | string[]
  ): string {
    const classes = typeof existingClasses === 'string' 
      ? existingClasses.split(' ').filter(c => c.trim())
      : existingClasses || [];
    
    const classSet = new Set(classes);
    
    if (condition) {
      classSet.add(className);
    } else {
      classSet.delete(className);
    }
    
    return Array.from(classSet).join(' ');
  }
  
  /**
   * Convert style object to CSS string
   */
  styleToCss(style: { [key: string]: any }): string {
    return Object.entries(style)
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join('; ');
  }
  
  /**
   * Parse CSS string to style object
   */
  cssToStyle(css: string): { [key: string]: any } {
    const style: { [key: string]: any } = {};
    
    css.split(';').forEach(rule => {
      const [key, value] = rule.split(':').map(s => s.trim());
      if (key && value) {
        // Convert kebab-case to camelCase
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        style[camelKey] = value;
      }
    });
    
    return style;
  }
}
