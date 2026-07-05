import { test, expect } from '../fixtures/datepicker.fixture';

test.describe('Date Picker - demoqa', () => {
  test('select date and time', async ({ datePickerPage }) => {
    await datePickerPage.openDatePickerMonthYear();
    await datePickerPage.selectJulyFifteenth();

    await datePickerPage.openDateAndTimePicker();
    await datePickerPage.selectTime14_15();
    await datePickerPage.openDateAndTimePicker();
    await datePickerPage.selectJulySeventeenth();

    await datePickerPage.expectDateAndTimeInputHasValue();
  });
});
