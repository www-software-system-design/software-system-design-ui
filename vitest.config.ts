import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
          setupFiles: ['./tests/setup.ts'],
          restoreMocks: true
        }
      },
      // The Storybook addon discovers projects through this root config.
      './vitest.storybook.config.ts'
    ]
  }
});
