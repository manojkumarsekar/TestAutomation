import { test, expect } from '../fixtures/tooltips.fixture';

test.describe('ToolTips - demoqa', () => {
  test('hovering over button displays tooltip message', async ({ toolTipsPage }) => {
    await toolTipsPage.hoverOverButton();
    await toolTipsPage.expectHoverMessageVisible();
  });
});
