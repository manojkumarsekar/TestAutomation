import { test as base } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';

type Fixtures = {
  droppablePage: DroppablePage;
};

export const test = base.extend<Fixtures>({
  droppablePage: async ({ page }, use) => {
    const droppablePage = new DroppablePage(page);
    await droppablePage.goto();
    await use(droppablePage);
  },
});

export { expect } from '@playwright/test';