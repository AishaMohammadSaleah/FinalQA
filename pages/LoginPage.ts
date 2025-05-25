import { Page } from "@playwright/test";

export class LoginPage {
  private userNameInput;
  private passwordNameInput;
  private loginButton;

  constructor(private page: Page) {
    this.userNameInput = page.locator('[data-test="username"]');
    this.passwordNameInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordNameInput.fill(password);
    await this.loginButton.click();
  }
}
