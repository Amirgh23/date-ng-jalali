import { Injectable } from '@angular/core';

/**
 * Global Pass-Through Configuration Service
 * Manages global PT configurations that apply to all components
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalPTConfigService {
  private config: any = {};

  /**
   * Set global PT configuration
   */
  setConfig(config: any): void {
    this.config = config;
  }

  /**
   * Get global PT configuration
   */
  getConfig(): any {
    return this.config;
  }

  /**
   * Get PT configuration for a specific component
   */
  getComponentConfig(componentName: string): any {
    return this.config[componentName] || {};
  }

  /**
   * Clear all global PT configurations
   */
  clearConfig(): void {
    this.config = {};
  }
}
