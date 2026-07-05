import { test as base } from '@playwright/test';
import { DatePickerPage } from '../pages/DatePickerPage';

type Fixtures = {
  datePickerPage: DatePickerPage;
};

export const test = base.extend<Fixtures>({
  datePickerPage: async ({ page }, use) => {
    const datePickerPage = new DatePickerPage(page);
    await datePickerPage.goto();
    await use(datePickerPage);
  },
});

export { expect } from '@playwright/test';
