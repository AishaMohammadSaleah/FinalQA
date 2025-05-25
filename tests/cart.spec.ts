import { test, expect } from "@playwright/test";
import "dotenv/config";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage ";

test.describe("Cart Feature", () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    inventoryPage = new InventoryPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(process.env.NameUser!, process.env.Passwordd!);
    await expect(page).toHaveURL(/inventory/);
  });

  test("should add item to cart and verify it's listed", async () => {
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await cartPage.goToCart();
    await expect(cartPage.cartItems).toContainText("Sauce Labs Backpack");
  });

  test("should show correct cart badge count after adding item", async () => {
    await inventoryPage.addItemToCart("sauce-labs-bike-light");
    await expect(await cartPage.getCartBadgeCount()).toBe("1");
  });

  test("add multiple items and verify badge count", async () => {
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await inventoryPage.addItemToCart("sauce-labs-bike-light");
    await expect(await cartPage.getCartBadgeCount()).toBe("2");
  });

  test("should delete item from cart", async () => {
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await inventoryPage.addItemToCart("test.allthethings()-t-shirt-(red)");

    await cartPage.goToCart();
    await expect(await cartPage.getItemCount()).toBe(2);

    await cartPage.removeItemByIteamId("sauce-labs-backpack");
    await expect(await cartPage.getItemCount()).toBe(1);

    await cartPage.page.locator('[data-test="continue-shopping"]').click();
    await inventoryPage.removeItemFromCart("test.allthethings()-t-shirt-(red)");
    
    await cartPage.goToCart();
    await expect(await cartPage.getItemCount()).toBe(0);
  });
});
