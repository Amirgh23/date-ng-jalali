/**
 * Jest Setup File
 * Configures the test environment and global utilities
 */

// Mock Web Component API if not available
if (!window.customElements) {
  window.customElements = {
    define: jest.fn(),
    get: jest.fn()
  };
}

// Mock HTMLElement if needed
if (!window.HTMLElement) {
  window.HTMLElement = class HTMLElement {
    constructor() {
      this.attributes = [];
    }

    setAttribute(name, value) {
      this.attributes[name] = value;
    }

    getAttribute(name) {
      return this.attributes[name];
    }

    removeAttribute(name) {
      delete this.attributes[name];
    }

    addEventListener(event, handler) {
      if (!this._listeners) {
        this._listeners = {};
      }
      if (!this._listeners[event]) {
        this._listeners[event] = [];
      }
      this._listeners[event].push(handler);
    }

    removeEventListener(event, handler) {
      if (this._listeners && this._listeners[event]) {
        this._listeners[event] = this._listeners[event].filter(h => h !== handler);
      }
    }

    dispatchEvent(event) {
      if (this._listeners && this._listeners[event.type]) {
        this._listeners[event.type].forEach(handler => handler(event));
      }
    }
  };
}

// Global test utilities
global.describe = describe;
global.test = test;
global.it = it;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Not implemented: HTMLFormElement.prototype.submit')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
