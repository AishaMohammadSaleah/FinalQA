import { test, expect } from "@playwright/test";
import "dotenv/config";
import { LoginPage } from "../pages/LoginPage";
test.describe("Sort Feature", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(process.env.NameUser!, process.env.Passwordd!);
    await expect(page).toHaveURL(/inventory/);
  });

  test("should sort products from A to Z", async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption("az");
    const productTitles = page.locator(".inventory_item_name");
    const titles = await productTitles.allTextContents();
    const sorted = [...titles].sort();
    expect(titles).toEqual(sorted);
  });

  test("should sort products by price from High to Low", async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption("hilo");

    const priceElements = page.locator(".inventory_item_price");
    const prices = await priceElements.allTextContents();

    const numericPrices = prices.map(p => parseFloat(p.replace("$", "")));
    const sorted = [...numericPrices].sort((a, b) => b - a);

    expect(numericPrices).toEqual(sorted);
  });
});
