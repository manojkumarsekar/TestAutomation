import { test, expect } from '../fixtures/resizable.fixture';

test.use({
  viewport: { height: 720, width: 1280 },
});

test.describe('Resizable - demoqa', () => {
  test('dragging the handle expands the box', async ({ resizablePage, page }) => {
    console.log('Handle count:', await page.locator('.react-resizable-handle').count());
    console.log('Resizable box exists:', await page.locator('#resizable').count());

    const originalSize = await resizablePage.getBoxSize();
    console.log('Original size:', originalSize);

    await resizablePage.resizeBy(50, 50);

    const newSize = await resizablePage.getBoxSize();
    console.log('New size:', newSize);

    await resizablePage.expectSizeIncreasedFrom(originalSize.width, originalSize.height);
  });
});