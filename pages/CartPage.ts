import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await this.page.waitForURL(/cart/);
  }

  async removeItemByIteamId(iteamId: string) {
    await this.page.locator(`[data-test="remove-${iteamId}"]`).click();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async getCartBadgeCount() {
    return await this.cartBadge.innerText();
  }
}
