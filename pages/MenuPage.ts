import { Page, Locator } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly mainItem1: Locator;
  readonly mainItem2: Locator;
  readonly mainItem3: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainItem1 = page.getByRole('link', { name: 'Main Item 1' });
    this.mainItem2 = page.getByRole('link', { name: 'Main Item 2' });
    this.mainItem3 = page.getByRole('link', { name: 'Main Item 3' });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/menu');
  }

  async hoverMainItem2() {
    await this.mainItem2.hover();
  }

  async clickSubItem(index = 0) {
    await this.hoverMainItem2();
    await this.page.getByRole('link', { name: 'Sub Item' }).nth(index).click();
  }

  async clickSubSubItem(name: string) {
    await this.hoverMainItem2();
    await this.page.getByText('SUB SUB LIST »').hover();
    await this.page.getByRole('link', { name }).click();
  }

  async clickMainItem1() {
    await this.mainItem1.click();
  }

  async clickMainItem3() {
    await this.mainItem3.click();
  }
}