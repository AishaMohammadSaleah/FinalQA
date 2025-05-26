import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productTitles = page.locator(".inventory_item_name");
    this.productPrices = page.locator(".inventory_item_price");
  }

  async addItemToCart(iteamId: string) {
    await this.page.locator(`[data-test="add-to-cart-${iteamId}"]`).click();
  }

  async removeItemFromCart(iteamId: string) {
    await this.page.locator(`[data-test="remove-${iteamId}"]`).click();
  }

  async sortBy(option: "az" |   "hilo") {
    await this.sortDropdown.selectOption(option);
  }

  async getProductTitles(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const rawPrices = await this.productPrices.allTextContents();
    return rawPrices.map(p => parseFloat(p.replace("$", "")));
  }
}
