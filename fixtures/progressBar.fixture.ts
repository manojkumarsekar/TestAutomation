import { test as base } from '@playwright/test';
import { ProgressBarPage } from '../pages/ProgressBarPage';

type Fixtures = {
  progressBarPage: ProgressBarPage;
};

export const test = base.extend<Fixtures>({
  progressBarPage: async ({ page }, use) => {
    const progressBarPage = new ProgressBarPage(page);
    await progressBarPage.goto();
    await use(progressBarPage);
  },
});

export { expect } from '@playwright/test';
