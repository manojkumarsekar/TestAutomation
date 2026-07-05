import { test, expect } from '../fixtures/progressBar.fixture';

test.describe('Progress Bar - demoqa', () => {
  test('start and stop progress bar', async ({ progressBarPage }) => {
    await progressBarPage.clickStartButton();
    await progressBarPage.expectProgressBarVisible();
    
    await progressBarPage.clickStopButton();
    await progressBarPage.expectProgressBarVisible();
  });
});
