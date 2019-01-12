import {By, WebElement} from "selenium-webdriver";
import AbstractPage from "./AbstractPage";

export default class LoginPage extends AbstractPage {
  public async open() {
    await this.browser.get(this.baseUrl);
  }

  public async login(username: string, password: string) {
    await this.waitForPageLoad();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  public async waitForPageLoad() {
    await this.waitFor(By.id("username"));
  }

  public async enterUsername(username: string) {
    await this.setText(By.id("username"), username);
  }

  public async enterPassword(password: string) {
    await this.setText(By.id("password"), password);
  }

  public async clickLogin() {
    await this.click(By.id("login"));
  }

  public async waitForErrorMessages() {
    await this.waitFor(By.id("messages"));
  }

  public async getErrorMessages(): Promise<WebElement> {
    return this.browser.findElement(By.id("messages"));
  }
}
