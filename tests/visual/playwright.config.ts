import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  testDir: '.', testMatch: '*.spec.ts', fullyParallel: true, forbidOnly: !!process.env.CI,
  use: { baseURL: 'http://127.0.0.1:6006', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  snapshotPathTemplate: '{testDir}/__screenshots__/{platform}/{arg}{ext}',
  webServer: {
    cwd: fileURLToPath(new URL('../../', import.meta.url)),
    command: `"${process.execPath}" node_modules/http-server/bin/http-server storybook-static -p 6006 -a 127.0.0.1 -c-1`,
    url: 'http://127.0.0.1:6006', reuseExistingServer: false, timeout: 60_000
  }
});
