import { test as base } from '@playwright/test';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';

type Fixtures = {
  browserWindowsPage: BrowserWindowsPage;
};

export const test = base.extend<Fixtures>({
  browserWindowsPage: async ({ page }, use) => {
    const browserWindowsPage = new BrowserWindowsPage(page);
    await browserWindowsPage.goto();
    await use(browserWindowsPage);
  },
});

export { expect } from '@playwright/test';
