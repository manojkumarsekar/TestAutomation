import { test as base } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';

type Fixtures = {
  menuPage: MenuPage;
};

export const test = base.extend<Fixtures>({
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await menuPage.goto();
    await use(menuPage);
  },
});

export { expect } from '@playwright/test';