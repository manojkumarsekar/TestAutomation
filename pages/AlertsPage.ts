import { Page, Locator } from '@playwright/test';

export class AlertsPage {
  readonly page: Page;
  readonly alertButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertButton = page.locator('#alertButton');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/alerts');
  }

  /**
   * Clicks the simple alert button and returns the alert's message text.
   * The dialog listener MUST be registered before the click, since the
   * alert fires synchronously and Playwright auto-dismisses unhandled
   * dialogs otherwise.
   */
async clickAlertAndGetMessage(): Promise<string> {
  let capturedMessage = '';

  this.page.once('dialog', async (dialog) => {
    capturedMessage = dialog.message();
    await this.page.waitForTimeout(2000); // pause so you can SEE it before accepting
    await dialog.accept();
  });

  await this.alertButton.click();
  await this.page.waitForTimeout(2500);

  return capturedMessage;
}
}
