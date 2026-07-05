import { test, expect } from '../fixtures/menu.fixture';

test.describe('Menu - demoqa', () => {
  test('navigate through main item, sub item, and sub-sub item', async ({
    menuPage,
  }) => {
    await menuPage.clickMainItem1();
    await menuPage.clickSubItem(1);
    await menuPage.clickSubSubItem('Sub Sub Item 2');
    await menuPage.clickMainItem3();
  });
});