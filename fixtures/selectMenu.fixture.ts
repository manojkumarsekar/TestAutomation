import { test as base } from '@playwright/test';
import { SelectMenuPage } from '../pages/SelectMenuPage';

type Fixtures = {
  selectMenuPage: SelectMenuPage;
};

export const test = base.extend<Fixtures>({
  selectMenuPage: async ({ page }, use) => {
    const selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.goto();
    await use(selectMenuPage);
  },
});

export { expect } from '@playwright/test';