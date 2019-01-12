import {By, until} from "selenium-webdriver";
import User from "../../src/domain/User";
import AbstractPage from "./AbstractPage";

export default class EditUserPage extends AbstractPage {
  public async editUser(user: User) {
    await this.waitForPageLoad();
    await this.enterUsername(user.username);
    await this.enterEmail(user.email);
    await this.clickSaveUser();
  }

  public async waitForPageLoad() {
    await this.waitFor(By.id("saveUser"));
  }

  public async enterUsername(username: string) {
    await this.setText(By.id("username"), username);
  }

  public async enterEmail(email: string) {
    await this.setText(By.id("email"), email);
  }

  public async clickSaveUser() {
    await this.click(By.id("saveUser"));
  }
}
