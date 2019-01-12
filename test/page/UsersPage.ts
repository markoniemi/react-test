import {assert} from "chai";
import {By, until, WebElement} from "selenium-webdriver";
import User from "../../src/domain/User";
import AbstractPage from "./AbstractPage";

export default class UsersPage extends AbstractPage {
  public async waitForPageLoad() {
    this.waitFor(By.xpath("//td[@id='username']"));
  }

  public async waitForUserRow(username: string) {
    this.waitFor(By.xpath("//td[@id='username'][text()='" + username + "']/.."));
  }

  public async clickAddUser() {
    await this.click(By.id("addUser"));
  }

  public async clickLogout() {
    await this.click(By.id("logout"));
  }

  public async assertUser(user: User) {
    const addedUser: User = await this.parseUser(await this.findUserRow(user.username));
    assert.equal(addedUser.username, user.username);
    assert.equal(addedUser.email, user.email);
  }

  public async findUserRow(username: string): Promise<WebElement> {
    return this.browser.findElement(By.xpath("//td[@id='username'][text()='" + username + "']/.."));
  }

  public async clickUserEdit(username: string) {
    const userRow: WebElement = await this.findUserRow(username);
    await userRow.findElement(By.id("editUser")).click();
  }

  public async removeUser(username: string) {
    const userRow: WebElement = await this.findUserRow(username);
    await userRow.findElement(By.id("removeUser")).click();
    this.browser.sleep(1000);
  }

  public async userExists(username: string): Promise<boolean> {
    // findElements returns an empty list if no matching element is found
    return (await this.browser.findElements(By.xpath("//td[@id='username'][text()='" + username + "']/.."))).length > 0;
  }

  public async parseUser(userRow: WebElement): Promise<User> {
    const username = await userRow.findElement(By.id("username")).getText();
    const email = await userRow.findElement(By.id("email")).getText();
    const index = await userRow.findElement(By.id("index")).getText();
    // const password = await userRow.findElement(By.id("password")).getText();
    return {username, email, password: "", index: parseInt(index, 10)};
  }
  public async editWithUserRow(username: string, user: User) {
    const userRow: WebElement = await this.findUserRow(username);
    await userRow.findElement(By.id("username")).click();
    await userRow.findElement(By.id("username")).clear();
    await userRow.findElement(By.id("username")).sendKeys(user.username);
    await userRow.findElement(By.id("email")).clear();
    await userRow.findElement(By.id("email")).sendKeys(user.email);
    await userRow.findElement(By.id("saveUser")).click();
    await this.waitForUserRow(user.username);
  }
}
