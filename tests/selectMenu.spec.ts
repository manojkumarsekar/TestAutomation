import { test, expect } from '../fixtures/selectMenu.fixture';

test.use({
  viewport: { height: 720, width: 1280 },
});

test.describe('Select Menu - demoqa', () => {
  test('select group option, title, and multi-select values', async ({
    selectMenuPage,
  }) => {
    await selectMenuPage.selectGroupOption('Group 1, option 2');
    await selectMenuPage.expectGroupSelectionContains('Group 1, option 2');

    await selectMenuPage.selectTitle('Mr.');
    await selectMenuPage.expectTitleSelectionContains('Mr.');

    // Matches the recorded selections: react-select-4-option-1, -2, -0
    await selectMenuPage.selectMultipleOptionsByIndex([1, 2, 0]);

    await selectMenuPage.selectCars(['volvo', 'saab', 'opel']);
  });
});