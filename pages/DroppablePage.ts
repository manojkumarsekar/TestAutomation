import { Page, Locator, expect } from '@playwright/test';

export class DroppablePage {
  readonly page: Page;
  readonly dragMe: Locator;
  readonly dropHere: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dragMe = page.getByLabel('Simple').getByText('Drag Me');
    this.dropHere = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/droppable');
  }

  async dragToTarget() {
    await this.dragMe.dragTo(this.dropHere);
  }

  async expectDroppedSuccessfully() {
    await expect(this.dropHere).toContainText('Drop Here');
  }
}