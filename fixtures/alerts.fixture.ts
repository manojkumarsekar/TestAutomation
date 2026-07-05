import { test as base } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

type Fixtures = {
  alertsPage: AlertsPage;
};

export const test = base.extend<Fixtures>({
  alertsPage: async ({ page }, use) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.goto();
    await use(alertsPage);
  },
});

export { expect } from '@playwright/test';
