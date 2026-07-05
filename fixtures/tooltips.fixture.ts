import { test as base } from '@playwright/test';
import { ToolTipsPage } from '../pages/ToolTipsPage';

type Fixtures = {
  toolTipsPage: ToolTipsPage;
};

export const test = base.extend<Fixtures>({
  toolTipsPage: async ({ page }, use) => {
    const toolTipsPage = new ToolTipsPage(page);
    await toolTipsPage.goto();
    await use(toolTipsPage);
  },
});

export { expect } from '@playwright/test';
