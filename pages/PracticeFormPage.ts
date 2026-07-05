import { Page, Locator, expect } from '@playwright/test';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  dateOfBirth: string; // format: '02 Mar 1988'
  subjects: string[];
  hobbies: string[]; // e.g. ['Sports', 'Reading', 'Music']
  currentAddress: string;
  state: string;
  city: string;
}

export class PracticeFormPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobile: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly currentAddress: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly modalTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.email = page.getByRole('textbox', { name: 'name@example.com' });
    this.mobile = page.getByRole('textbox', { name: 'Mobile Number' });
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.currentAddress = page.getByRole('textbox', { name: 'Current Address' });
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
    // Ads on demoqa can overlap the form; scroll it out of the way if present
    const ad = this.page.locator('#fixedban');
    if (await ad.isVisible().catch(() => false)) {
      await ad.evaluate((el) => el.remove());
    }
  }

async selectGender(gender: string) {
  // Same hidden-input pattern as hobbies - click the visible label text.
  await this.page.getByText(gender, { exact: true }).click();
}

async selectHobbies(hobbies: string[]) {
  for (const hobby of hobbies) {
    // The <input type="checkbox"> is visually hidden on demoqa; only the
    // <label> next to it receives real clicks that trigger React state.
    await this.page.getByText(hobby, { exact: true }).click();
  }
}



  async addSubjects(subjects: string[]) {
  for (const subject of subjects) {
    await this.subjectsInput.fill(subject);
    // Wait for the suggestion dropdown, then click the option explicitly
    await this.page.locator('.subjects-auto-complete__menu').waitFor({ state: 'visible' });
    await this.page.locator('.subjects-auto-complete__option').first().click();
  }
}


  async selectState(state: string) {
    await this.stateDropdown.click();
    await this.page.getByText(state, { exact: true }).click();
  }

  async selectCity(city: string) {
    await this.cityDropdown.click();
    await this.page.getByText(city, { exact: true }).click();
  }

  async fillForm(data: FormData) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.selectGender(data.gender);
    await this.mobile.fill(data.mobile);
    await this.dateOfBirthInput.fill(data.dateOfBirth);
    await this.page.keyboard.press('Escape'); // close the date picker
    await this.addSubjects(data.subjects);
    await this.selectHobbies(data.hobbies);
    await this.currentAddress.fill(data.currentAddress);
    await this.selectState(data.state);
    await this.selectCity(data.city);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSubmissionSuccess() {
    await expect(this.modalTitle).toHaveText('Thanks for submitting the form');
  }
}
