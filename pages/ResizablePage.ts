import { Page, Locator, expect } from '@playwright/test';

export class ResizablePage {
  readonly page: Page;
  readonly resizableBox: Locator;
  readonly resizeHandle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Target the resizable box with restriction (the one with visible handle)
    this.resizableBox = page.locator('#resizableBoxWithRestriction');
    this.resizeHandle = this.resizableBox.locator('.react-resizable-handle-se');
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

    // Move to handle and start drag
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    
    // Perform smooth drag with many steps for react-resizable to detect
    await this.page.mouse.move(startX + deltaX, startY + deltaY, { steps: 50 });
    
    // Small pause before release to ensure library processes final position
    await this.page.waitForTimeout(300);
    await this.page.mouse.up();
    
    // Wait for resize to complete
    await this.page.waitForTimeout(300);
  }

  async expectSizeIncreasedFrom(originalWidth: number, originalHeight: number) {
    const newSize = await this.getBoxSize();
    expect(newSize.width).toBeGreaterThan(originalWidth);
    expect(newSize.height).toBeGreaterThan(originalHeight);
  }
}