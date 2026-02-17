import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.ts',
    include: ['projects/jalali-date-picker/src/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
