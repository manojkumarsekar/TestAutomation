import { Page, Locator, expect } from '@playwright/test';

export class ResizablePage {
  readonly page: Page;
  readonly resizableBox: Locator;
  readonly resizeHandle: Locator;

  constructor(page: Page) {
    this.page = page;
    // #resizable is the box WITHOUT min/max restriction
    this.resizableBox = page.locator('#resizable');
    this.resizeHandle = this.resizableBox.locator('.react-resizable-handle');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/resizable');
  }

  async getBoxSize() {
    const box = await this.resizableBox.boundingBox();
    if (!box) throw new Error('Could not get bounding box of resizable box');
    return { width: box.width, height: box.height };
  }

  /**
   * Drags the bottom-right resize handle outward by the given offset.
   * Uses stepped mouse movement so the underlying react-resizable
   * library receives enough mousemove events to register the resize.
   */
  async resizeBy(deltaX: number, deltaY: number) {
    const handleBox = await this.resizeHandle.boundingBox();
    if (!handleBox) throw new Error('Could not get bounding box of resize handle');

    const startX = handleBox.x + handleBox.width / 2;
    const startY = handleBox.y + handleBox.height / 2;

 await this.page.mouse.move(startX, startY);
await this.page.mouse.down();
await this.page.mouse.move(startX + 2, startY + 2); // tiny nudge to arm the drag state
await this.page.waitForTimeout(200);
await this.page.mouse.move(startX + deltaX, startY + deltaY, { steps: 25 });
await this.page.waitForTimeout(200);
await this.page.mouse.up();
  }

  async expectSizeIncreasedFrom(originalWidth: number, originalHeight: number) {
    const newSize = await this.getBoxSize();
    expect(newSize.width).toBeGreaterThan(originalWidth);
    expect(newSize.height).toBeGreaterThan(originalHeight);
  }
}