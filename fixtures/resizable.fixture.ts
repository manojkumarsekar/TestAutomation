import { test as base } from '@playwright/test';
import { ResizablePage } from '../pages/ResizablePage';

type Fixtures = {
  resizablePage: ResizablePage;
};

export const test = base.extend<Fixtures>({
  resizablePage: async ({ page }, use) => {
    const resizablePage = new ResizablePage(page);
    await resizablePage.goto();
    await use(resizablePage);
  },
});

export { expect } from '@playwright/test';