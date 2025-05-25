import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Login Feature", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("https://www.saucedemo.com/");
  });

  test("valid login redirects to inventory", async ({ page }) => {
    await loginPage.login(process.env.NameUser!, process.env.Passwordd!);
    await expect(page).toHaveURL(/inventory/);
  });

  test("empty username and password shows error", async ({ page }) => {
    await loginPage.login("", "");
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Username is required"
    );
  });
  test("test valid username with empty pass", async ({ page }) => {
    await loginPage.login(process.env.NameUser!, "");
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Password is required"
    );
  });
  test("test valid pass with empty username", async ({ page }) => {
    await loginPage.login("", process.env.Passwordd!);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Username is required"
    );
  });
  test("test valid username with invalid pass", async ({ page }) => {
    await loginPage.login(process.env.NameUser!, "dddddd");
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Username and password do not match any user in this service"
    );
  });
  test("test invalid username with valid pass",async({page})=>{
 await loginPage.login("dddd", process.env.Passwordd!);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
})

});
