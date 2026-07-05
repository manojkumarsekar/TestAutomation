import { test, expect } from '../fixtures/droppable.fixture';

test.use({
  viewport: { height: 720, width: 1280 },
});

test.describe('Droppable - demoqa', () => {
  test('drag me element drops successfully onto target', async ({ droppablePage }) => {
    await droppablePage.dragToTarget();
    await droppablePage.expectDroppedSuccessfully();
  });
});