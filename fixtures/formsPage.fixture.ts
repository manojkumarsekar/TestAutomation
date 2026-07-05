import { test as base } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';

type Fixtures = {
  formsPage: PracticeFormPage;
};

export const test = base.extend<Fixtures>({
  formsPage: async ({ page }, use) => {
    const formsPage = new PracticeFormPage(page);
    await formsPage.goto();
    await use(formsPage);
  },
});

export { expect } from '@playwright/test';
