import { defineConfig } from 'vitest/config';
import { angular } from '@angular/build';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.ts',
    exclude: ['**/node_modules/**', '**/dist/**'],
    include: ['**/*.spec.ts']
  },
});
