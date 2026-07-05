import { Page, Locator, expect } from '@playwright/test';

export class TabsPage {
  readonly page: Page;
  readonly whatTab: Locator;
  readonly originTab: Locator;
  readonly useTab: Locator;
  readonly moreTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.whatTab = page.getByRole('tab', { name: 'What' });
    this.originTab = page.getByRole('tab', { name: 'Origin' });
    this.useTab = page.getByRole('tab', { name: 'Use' });
    this.moreTab = page.getByRole('tab', { name: 'More' });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/tabs');
  }

  async openOriginTab() {
    await this.originTab.click();
  }

  async openUseTab() {
    await this.useTab.click();
  }

  async expectOriginContentVisible() {
    await expect(
      this.page.getByText('Contrary to popular belief,')
    ).toBeVisible();
  }

  async expectUseContentVisible() {
    await expect(
      this.page.getByText('It is a long established fact')
    ).toBeVisible();
  }

  async expectMoreTabIsDisabled() {
    await expect(this.moreTab).toBeDisabled();
  }
}