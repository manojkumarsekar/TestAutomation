import { Page, Locator, expect } from '@playwright/test';

export class DatePickerPage {
  readonly page: Page;
  readonly datePickerLink: Locator;
  readonly datePickerMonthYearInput: Locator;
  readonly dateAndTimePickerInput: Locator;
  readonly julyFifteenthCell: Locator;
  readonly timeOption14_15: Locator;
  readonly julySeventeenthCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.datePickerLink = page.getByRole('link', { name: 'Date Picker' });
    this.datePickerMonthYearInput = page.locator('#datePickerMonthYearInput');
    this.dateAndTimePickerInput = page.locator('#dateAndTimePickerInput');
    this.julyFifteenthCell = page.getByRole('gridcell', { name: 'Choose Wednesday, July 15th,' });
    this.timeOption14_15 = page.getByRole('option', { name: '14:15' });
    this.julySeventeenthCell = page.getByRole('gridcell', { name: 'Choose Thursday, July 16th,' });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/date-picker');
  }

  async clickDatePickerLink() {
    await this.datePickerLink.click();
  }

  async openDatePickerMonthYear() {
    await this.datePickerMonthYearInput.click();
  }

  async selectJulyFifteenth() {
    await this.julyFifteenthCell.click();
  }

  async openDateAndTimePicker() {
    await this.dateAndTimePickerInput.click();
  }

  async selectTime14_15() {
    await this.timeOption14_15.click();
  }

  async selectJulySeventeenth() {
    await this.julySeventeenthCell.click();
  }

  async expectDateAndTimeInputHasValue() {
    await expect(this.dateAndTimePickerInput).toHaveValue(/./);
  }
}
