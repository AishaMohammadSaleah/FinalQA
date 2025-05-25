import { test, expect } from "@playwright/test";
import "dotenv/config";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage ";

test.describe(" checkout Feature", () => {
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
  test("should complete checkout successfully", async ({ page }) => {
    await inventoryPage.addItemToCart("sauce-labs-backpack");
    await cartPage.goToCart();
    await expect(page).toHaveURL(/cart/);

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);

    await page.locator('[data-test="firstName"]').fill("Aisha");
    await page.locator('[data-test="lastName"]').fill("Saleh");
    await page.locator('[data-test="postalCode"]').fill("33338");
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two/);

    await expect(page.locator(".cart_item")).toContainText(
      "Sauce Labs Backpack"
    );

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });
});
