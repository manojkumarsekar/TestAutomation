import { test as base } from '@playwright/test';
import { TabsPage } from '../pages/TabsPage';

type Fixtures = {
  tabsPage: TabsPage;
};

export const test = base.extend<Fixtures>({
  tabsPage: async ({ page }, use) => {
    const tabsPage = new TabsPage(page);
    await tabsPage.goto();
    await use(tabsPage);
  },
});

export { expect } from '@playwright/test';