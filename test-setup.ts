import { beforeEach } from 'vitest';

beforeEach(() => {
  // Tests in this repo frequently rely on ThemeService localStorage behavior.
  // Clearing here keeps tests isolated and deterministic.
  localStorage.clear();
});

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
