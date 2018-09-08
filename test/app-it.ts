import {assert} from "chai";
import * as chrome from "chromedriver";
import * as dotenv from "dotenv";
import * as sleep from "es7-sleep";
import {Builder, Capabilities, logging} from "selenium-webdriver";
import {Driver, Options} from "selenium-webdriver/chrome";
import * as logger from "winston";
import User from "../src/domain/User";
import EditUserPage from "./page/EditUserPage";
import LoginPage from "./page/LoginPage";
import UsersPage from "./page/UsersPage";
import Entry = logging.Entry;

const jestTimeout: number = 20000;

let browser: Driver;
describe("Selenium", () => {
  beforeAll(async () => {
    try {
      dotenv.config({path: "config/development.env"});
      browser = await createChrome();
    } catch (e) {
      logger.error(e);
      fail(e);
    }
  });
  afterAll(async () => {
    try {
      const entries: Entry[] = await browser.manage().logs().get(logging.Type.DRIVER);
      entries.forEach((entry) => {
        logger.info(entry.message);
      });
    } catch (e) {
      logger.error(e);
      fail(e);
    } finally {
      await browser.quit();
    }
  });
  describe("App", () => {
    test("failed login", async (done) => {
      try {
        const loginPage: LoginPage = new LoginPage(browser);
        await loginPage.open();
        await loginPage.login("a", "a");
        await loginPage.waitForPageLoad();
        await loginPage.waitForErrorMessages();
        assert.isNotNull(loginPage.getErrorMessages());
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("login", async (done) => {
      try {
        const loginPage: LoginPage = new LoginPage(browser);
        await loginPage.open();
        await loginPage.login("user", "password");
        const usersPage: UsersPage = new UsersPage(browser);
        await usersPage.waitForPageLoad();
        await usersPage.clickLogout();
        await loginPage.waitForPageLoad();
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("addUserWithEditUser", async (done) => {
      try {
        const loginPage: LoginPage = new LoginPage(browser);
        await loginPage.open();
        await loginPage.login("user", "password");
        const usersPage: UsersPage = new UsersPage(browser);
        await usersPage.waitForPageLoad();
        await usersPage.clickAddUser();
        const editUserPage: EditUserPage = new EditUserPage(browser);
        const user: User = {username: "addUser", email: "newEmail", password: "newPassword", index: 0};
        await editUserPage.editUser(user);
        await usersPage.waitForPageLoad();
        await usersPage.waitForUserRow(user.username);
        await usersPage.assertUser(user);
        await usersPage.clickLogout();
        await loginPage.waitForPageLoad();
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("editUserWithUserRow", async (done) => {
      try {
        const user: User = {username: "editedUser", email: "editedEmail", password: "editedPassword", index: 0};
        const loginPage: LoginPage = new LoginPage(browser);
        await loginPage.open();
        await loginPage.login("user", "password");
        const usersPage: UsersPage = new UsersPage(browser);
        await usersPage.waitForPageLoad();
        await usersPage.editWithUserRow("addUser", user);
        await usersPage.waitForUserRow(user.username);
        await usersPage.assertUser(user);
        await usersPage.clickLogout();
        await loginPage.waitForPageLoad();
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("editUserWithEditUser", async (done) => {
      try {
        const user: User = {username: "editedUser2", email: "editedEmail2", password: "password2", index: 0};
        const loginPage: LoginPage = new LoginPage(browser);
        await loginPage.open();
        await loginPage.login("user", "password");
        const usersPage: UsersPage = new UsersPage(browser);
        await usersPage.waitForPageLoad();
        await usersPage.clickUserEdit("editedUser");
        const editUserPage: EditUserPage = new EditUserPage(browser);
        await editUserPage.editUser(user);
        await usersPage.waitForPageLoad();
        await usersPage.waitForUserRow(user.username);
        await usersPage.assertUser(user);
        await usersPage.clickLogout();
        await loginPage.waitForPageLoad();
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("removeUser", async (done) => {
      try {
        const loginPage: LoginPage = new LoginPage(browser);
        await loginPage.open();
        await loginPage.login("user", "password");
        const usersPage: UsersPage = new UsersPage(browser);
        await usersPage.waitForPageLoad();
        await usersPage.removeUser("editedUser2");
        await usersPage.waitForPageLoad();
        await sleep(1000);
        assert.isFalse(await usersPage.userExists("editedUser2"));
        await usersPage.clickLogout();
        await loginPage.waitForPageLoad();
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
  });
});

async function createChrome(): Promise<Driver> {
  const chromePath = chrome.path;
  const loggingPrefs = new logging.Preferences();
  loggingPrefs.setLevel(logging.Type.DRIVER, logging.Level.WARNING);
  const options: Options = new Options();
  options.addArguments("headless", "disable-gpu", "no-sandbox", "start-maximized", "proxy-server='direct://'", "proxy-bypass-list=*");
  options.setLoggingPrefs(loggingPrefs);
  const driver: Driver = await new Builder()
    .withCapabilities(Capabilities.chrome())
    .setChromeOptions(options)
    .setLoggingPrefs(loggingPrefs)
    .build();
  sleep(jestTimeout);
  return driver;
}
