import { test, expect } from '../fixtures/tabs.fixture';

test.describe('Tabs - demoqa', () => {
  test('switching tabs shows the correct content', async ({ tabsPage }) => {
    await tabsPage.openOriginTab();
    await tabsPage.expectOriginContentVisible();

    await tabsPage.openUseTab();
    await tabsPage.expectUseContentVisible();
  });

  test('More tab is disabled', async ({ tabsPage }) => {
    await tabsPage.expectMoreTabIsDisabled();
  });
});