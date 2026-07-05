import { Page, Locator, expect } from '@playwright/test';

export class SliderPage {
  readonly page: Page;
  readonly sliderLink: Locator;
  readonly sliderInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sliderLink = page.getByRole('link', { name: 'Slider' });
    this.sliderInput = page.locator('#slider');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/slider');
  }

  async clickSliderLink() {
    await this.sliderLink.click();
  }

  async setSliderValue(value: string) {
    await this.sliderInput.fill(value);
  }

  async expectSliderValueSet(value: string) {
    await expect(this.sliderInput).toHaveValue(value);
  }
}
