import { Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addItemToCart(iteamId: string) {
    await this.page.locator(`[data-test="add-to-cart-${iteamId}"]`).click();
  }

  async removeItemFromCart(iteamId: string) {
    await this.page.locator(`[data-test="remove-${iteamId}"]`).click();
  }
}
