import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Setup for localStorage clearing between tests
beforeEach(() => {
  // Tests in this repo frequently rely on ThemeService localStorage behavior.
  // Clearing here keeps tests isolated and deterministic.
  localStorage.clear();
});

// Polyfill for matchMedia if needed
if (!('matchMedia' in window)) {
  // Minimal stub for components/utilities that might query media.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
