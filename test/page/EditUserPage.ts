import {By, until} from "selenium-webdriver";
import User from "../../src/domain/User";
import WebDriverTest from "./WebDriverTest";

export default class EditUserPage extends WebDriverTest {
  public async editUser(user: User) {
    await this.waitForPageLoad();
    await this.enterUsername(user.username);
    await this.enterEmail(user.email);
    await this.clickSaveUser();
  }

  public async waitForPageLoad() {
    await this.browser.wait(until.elementLocated(By.id("saveUser")));
  }

  public async enterUsername(username: string) {
    await this.browser.findElement(By.id("username")).clear();
    await this.browser.findElement(By.id("username")).sendKeys(username);
  }

  public async enterEmail(email: string) {
    await this.browser.findElement(By.id("email")).clear();
    await this.browser.findElement(By.id("email")).sendKeys(email);
  }

  public async clickSaveUser() {
    await this.browser.findElement(By.id("saveUser")).click();
  }
}
