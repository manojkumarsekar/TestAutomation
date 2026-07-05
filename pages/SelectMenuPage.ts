import { Page, Locator, expect } from '@playwright/test';

export class SelectMenuPage {
  readonly page: Page;
  readonly groupSelect: Locator; // "Select Value" dropdown with option groups
  readonly titleSelect: Locator; // "Select One" - Mr./Mrs. title dropdown
  readonly multiSelectTrigger: Locator; // react-select multi-select control ("Select...")
  readonly oldStyleSelect: Locator; // native <select> - Old Style Select Menu
  readonly carsMultiSelect: Locator; // native multi <select id="cars">

  constructor(page: Page) {
    this.page = page;
    this.groupSelect = page.locator('#withOptGroup');
    this.titleSelect = page.locator('#selectOne');
    // Matches the recorded click on the div showing placeholder text "Select..."
    this.multiSelectTrigger = page
      .locator('div')
      .filter({ hasText: /^Select\.\.\.$/ })
      .last();
    this.oldStyleSelect = page.locator('#oldSelectMenu');
    this.carsMultiSelect = page.locator('#cars');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/select-menu');
  }

  /** react-select dropdown: click the control, then click the option in the portal menu */
  async selectGroupOption(optionText: string) {
    await this.groupSelect.click();
    await this.page.getByRole('option', { name: optionText }).click();
  }

  async selectTitle(title: string) {
    await this.titleSelect.click();
    await this.page.getByRole('option', { name: title }).click();
  }

  /**
   * react-select multi-select. Options render in a portal with IDs like
   * react-select-4-option-0, react-select-4-option-1, etc (confirmed via
   * codegen recording). We select by index here since these options don't
   * have easily predictable/stable visible text.
   */
async selectMultipleOptionsByIndex(indexes: number[]) {
  await this.multiSelectTrigger.click({ force: true });
  for (const index of indexes) {
    await this.page.locator(`#react-select-4-option-${index}`).click();
  }
}

  /** native <select> element */
  async selectOldStyleOption(value: string) {
    await this.oldStyleSelect.selectOption(value);
  }

  /** native multi <select> element - pass all desired values in a single call */
  async selectCars(values: string[]) {
    await this.carsMultiSelect.selectOption(values);
  }

  async expectGroupSelectionContains(text: string) {
    await expect(this.groupSelect).toContainText(text);
  }

  async expectTitleSelectionContains(text: string) {
    await expect(this.titleSelect).toContainText(text);
  }
}