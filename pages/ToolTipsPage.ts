import { Page, Locator, expect } from '@playwright/test';

export class ToolTipsPage {
  readonly page: Page;
  readonly toolTipsLink: Locator;
  readonly hoverButton: Locator;
  readonly hoverMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolTipsLink = page.getByRole('link', { name: 'Tool Tips' });
    this.hoverButton = page.getByRole('button', { name: 'Hover me to see' });
    this.hoverMessage = page.getByText('You hovered over the Button');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/tool-tips');
  }

  async hoverOverButton() {
    await this.hoverButton.hover();
    await this.page.waitForTimeout(500);
  }

  async expectHoverMessageVisible() {
    await expect(this.hoverMessage).toBeVisible();
  }
}
