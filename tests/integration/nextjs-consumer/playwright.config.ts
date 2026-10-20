import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  testDir: './tests', fullyParallel: true, forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `"${process.execPath}" node_modules/next/dist/bin/next start -p 3100 -H 127.0.0.1`,
    cwd: fileURLToPath(new URL('.', import.meta.url)),
    url: 'http://127.0.0.1:3100', reuseExistingServer: false, timeout: 60_000,
    env: { NEXT_TELEMETRY_DISABLED: '1' }
  }
});
