import { test, expect } from '../fixtures/alerts.fixture';

test.describe('Alerts - demoqa', () => {
  test('simple alert shows expected message', async ({ alertsPage }) => {
    const message = await alertsPage.clickAlertAndGetMessage();
    expect(message).toBe('You clicked a button');
  });
});
