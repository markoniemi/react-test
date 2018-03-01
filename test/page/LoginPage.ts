import {By, until} from "selenium-webdriver";
import WebDriverTest from "./WebDriverTest";

export default class LoginPage extends WebDriverTest {
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
    await this.browser.wait(until.elementLocated(By.id("username")));
  }

  public async enterUsername(username: string) {
    await this.browser.findElement(By.id("username")).clear();
    await this.browser.findElement(By.id("username")).sendKeys(username);
  }

  public async enterPassword(password: string) {
    await this.browser.findElement(By.id("password")).clear();
    await this.browser.findElement(By.id("password")).sendKeys(password);
  }

  public async clickLogin() {
    await this.browser.findElement(By.id("login")).click();
  }
}
