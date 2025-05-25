// import { test, expect } from "@playwright/test";
// import "dotenv/config";
// import { LoginPage } from "../pages/LoginPage";

// test.describe("Cart Feature", () => {
//   let loginPage: LoginPage;
//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     await page.goto("https://www.saucedemo.com/");
//     await loginPage.login(process.env.NameUser!, process.env.Passwordd!);
//     await expect(page).toHaveURL(/inventory/);
//   });
//   test("should add item to cart and verify it's listed", async ({ page }) => {
//     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page).toHaveURL(/cart/);
//     await expect(page.locator(".cart_item")).toContainText(
//       "Sauce Labs Backpack"
//     );
//   });
//   test("should show correct cart badge count after adding item", async ({
//     page,
//   }) => {
//     await page
//       .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
//       .click();
//     const cartBadge = page.locator(".shopping_cart_badge");
//     await expect(cartBadge).toHaveText("1");
//   });
//   test("add multiple items and verify badge count", async ({ page }) => {
//     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//     await page
//       .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
//       .click();
//     const cartBadge = page.locator(".shopping_cart_badge");
//     await expect(cartBadge).toHaveText("2");
//   });
//   test("should delete item from cart", async ({ page }) => {
//     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//     await page
//       .locator(
//         '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'
//       )
//       .click();
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page).toHaveURL(/cart/);
//     await expect(page.locator(".cart_item")).toHaveCount(2);
//     await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
//     await expect(page.locator(".cart_item")).toHaveCount(1);
//     await page.locator('[data-test="continue-shopping"]').click();
//     await page.locator('[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page).toHaveURL(/cart/);
//     await expect(page.locator(".cart_item")).toHaveCount(0);
//   });
  
// });

// test("test valid login",async({page})=>{
//   //any promise fun must preceded by an await
//   //her we made navigation using goto
//  await page.goto("https://www.saucedemo.com/");
//  //any promise fun must preceded by an await
//     await page.locator('[data-test="username"]').fill("standard_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce")
//     await page.click("#login-button");
//     expect(page.url()).toContain('inventory')
// })
// test("test empty pass and username ",async({page})=>{
//     await page.goto("https://www.saucedemo.com/");
//       await page.click("#login-button");
//     await expect(page.locator('[data-test="error"]')).toBeVisible();
//     await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
// })
// test("test valid username with empty pass",async({page})=>{
//   await page.goto("https://www.saucedemo.com/");
//   await page.locator('[data-test="username"]').fill("standard_user");
//   await page.click("#login-button");
//   await expect(page.locator('[data-test="error"]')).toBeVisible();
//   await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
// })
// test("test valid pass with empty username",async({page})=>{
//   await page.goto("https://www.saucedemo.com/");
//   await page.locator('[data-test="password"]').fill("secret_sauce")
//   await page.click("#login-button");
//   await expect(page.locator('[data-test="error"]')).toBeVisible();
//   await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
// })
// test("test valid username with invalid pass",async({page})=>{
//   await page.goto("https://www.saucedemo.com/");
//   await page.locator('[data-test="username"]').fill("standard_user");
//   await page.locator('[data-test="password"]').fill("dddd");
//   await page.click("#login-button");
//   await expect(page.locator('[data-test="error"]')).toBeVisible();
//   await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
// })
// test("test invalid username with valid pass",async({page})=>{
//   await page.goto("https://www.saucedemo.com/");
//    await page.locator('[data-test="username"]').fill("sds");
//   await page.locator('[data-test="password"]').fill("secret_sauce");
//   await page.click("#login-button");
//   await expect(page.locator('[data-test="error"]')).toBeVisible();
//   await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
// })


// test(" checkout Feature", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await page.goto("https://www.saucedemo.com/");
//   await loginPage.login(process.env.NameUser!, process.env.Passwordd!);
//   await expect(page).toHaveURL(/inventory/);
//   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//   await page.locator('[data-test="shopping-cart-link"]').click();
//   await expect(page).toHaveURL(/cart/);
//   await page.locator('[data-test="checkout"]').click();
//   await expect(page).toHaveURL(/checkout-step-one/);
//   await page.locator('[data-test="firstName"]').fill("Aisha");
//   await page.locator('[data-test="lastName"]').fill("Saleh");
//   await page.locator('[data-test="postalCode"]').fill("33338");
//   await page.locator('[data-test="continue"]').click();
//   await expect(page).toHaveURL(/checkout-step-two/);
//   await expect(page.locator(".cart_item")).toContainText("Sauce Labs Backpack");
//   await page.locator('[data-test="finish"]').click();
//   await expect(page).toHaveURL(/checkout-complete/);
//   await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
// });

// // //a test case declared

// // //first parameter is the test case name and its must be uniqe
// // //secound parameter is an asysc function : simply (obj:will used inside the my function/steps)=>{}
// // // test('has title', async ({ page }) => {
// // //   await page.goto('https://playwright.dev/');//page can be defined manulay to acces our browser

// // //   // Expect a title "to contain" a substring.
// // //   await expect(page).toHaveTitle(/Playwright/);
// // // });

// // //a test case declared
// // // test('get started link', async ({ page }) => {
// // //   await page.goto('https://playwright.dev/');

// // //   // Click the get started link.
// // //   await page.getByRole('link', { name: 'Get started' }).click();

// // //   // Expects page to have a heading with the name of Installation.
// // //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// // // });
