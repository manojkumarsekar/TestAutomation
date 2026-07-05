import { test as base } from '@playwright/test';
import { SliderPage } from '../pages/SliderPage';

type Fixtures = {
  sliderPage: SliderPage;
};

export const test = base.extend<Fixtures>({
  sliderPage: async ({ page }, use) => {
    const sliderPage = new SliderPage(page);
    await sliderPage.goto();
    await use(sliderPage);
  },
});

export { expect } from '@playwright/test';
