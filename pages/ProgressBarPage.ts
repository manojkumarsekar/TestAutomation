import { Page, Locator, expect } from '@playwright/test';

export class ProgressBarPage {
  readonly page: Page;
  readonly progressBarLink: Locator;
  readonly startButton: Locator;
  readonly stopButton: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.progressBarLink = page.getByRole('link', { name: 'Progress Bar' });
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.stopButton = page.getByRole('button', { name: 'Stop' });
    this.progressBar = page.locator('.progress-bar');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/progress-bar');
  }

  async clickProgressBarLink() {
    await this.progressBarLink.click();
  }

  async clickStartButton() {
    await this.startButton.click();
  }

  async clickStopButton() {
    await this.stopButton.click();
  }

  async expectProgressBarVisible() {
    await expect(this.progressBar).toBeVisible();
  }
}
