import { Page, Locator, expect, BrowserContext } from '@playwright/test';

export class BrowserWindowsPage {
  readonly page: Page;
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  readonly newWindowMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTabButton = page.getByRole('button', { name: 'New Tab' });
    this.newWindowButton = page.getByRole('button', {
  name: 'New Window',
  exact: true,
});
    this.newWindowMessageButton = page.getByRole('button', {
      name: 'New Window Message',
    });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/browser-windows');
  }

  /**
   * Clicks a button that opens a new tab/window and returns the new Page object.
   * Works for all three buttons since they all fire the same 'page' event.
   */
  private async openAndCapture(context: BrowserContext, trigger: Locator) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      trigger.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async openNewTab(context: BrowserContext) {
    return this.openAndCapture(context, this.newTabButton);
  }

  async openNewWindow(context: BrowserContext) {
    return this.openAndCapture(context, this.newWindowButton);
  }

  async openNewWindowMessage(context: BrowserContext) {
    return this.openAndCapture(context, this.newWindowMessageButton);
  }
}

/**
 * Page object for the simple page that opens inside the new tab/window
 * (https://demoqa.com/sample)
 */
export class SamplePage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('#sampleHeading');
  }

  async expectHeading(text: string) {
    await expect(this.heading).toContainText(text);
  }

  async expectBodyText(text: string) {
    await expect(this.page.locator('body')).toContainText(text);
  }
}
