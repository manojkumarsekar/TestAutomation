import { test, expect } from '../fixtures/browserWindows.fixture';
import { SamplePage } from '../pages/BrowserWindowsPage';

test.describe('Browser Windows - demoqa', () => {
  test('new tab opens sample page', async ({ browserWindowsPage, context }) => {
    const newTab = await browserWindowsPage.openNewTab(context);
    const samplePage = new SamplePage(newTab);

    await samplePage.expectHeading('This is a sample page');
    await newTab.close();
  });

  test('new window opens sample page', async ({ browserWindowsPage, context }) => {
    const newWindow = await browserWindowsPage.openNewWindow(context);
    const samplePage = new SamplePage(newWindow);

    await samplePage.expectHeading('This is a sample page');
    await newWindow.close();
  });

  test('new window message shows sharing quote', async ({
    browserWindowsPage,
    context,
  }) => {
    const messageWindow = await browserWindowsPage.openNewWindowMessage(context);
    const samplePage = new SamplePage(messageWindow);

    await samplePage.expectBodyText(
      'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.'
    );
    await messageWindow.close();
  });
});
