import { test, expect } from '../fixtures/slider.fixture';

test.describe('Slider - demoqa', () => {
  test('set slider value to 57', async ({ sliderPage }) => {
    await sliderPage.setSliderValue('57');
    await sliderPage.expectSliderValueSet('57');
  });
});
