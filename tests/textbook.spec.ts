import { test, expect } from '@playwright/test';

test('sortable grid drag and drop', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByText('Interactions', { exact: true }).click();
  await page.getByRole('listitem').filter({ hasText: 'Sortable' }).click();
  await page.getByRole('tab', { name: 'Grid' }).click();

  const firstItem = page.getByLabel('Grid').getByText('One');
  const lastItem = page.getByLabel('Grid').getByText('Five');

  const firstText = await firstItem.textContent();

  await firstItem.dragTo(lastItem);

  // Re-check the item that's now in the first position
  const newFirstItem = page.getByLabel('Grid').locator('div').first();
  const newFirstText = await newFirstItem.textContent();

  expect(newFirstText).not.toBe(firstText);


});