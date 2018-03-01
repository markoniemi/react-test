import {assert} from "chai";
import * as chrome from "chromedriver";
import * as dotenv from "dotenv";
import {Builder, By, Capabilities, logging, until, WebElement} from "selenium-webdriver";
import {Driver, Options} from "selenium-webdriver/chrome";
import * as logger from "winston";
import User from "../src/domain/User";
import EditUserPage from "./page/EditUserPage";
import LoginPage from "./page/LoginPage";
import UsersPage from "./page/UsersPage";
import {user1} from "./userList";
import Entry = logging.Entry;

const jestTimeout: number = 20000;
// phantomJs
// import {Driver} from "selenium-webdriver/phantomjs";
// const phantomJsPath = require("phantomjs-prebuilt").path;

let browser: Driver;
describe("Selenium", () => {
  beforeAll(async () => {
    try {
      dotenv.config({path: "config/development.env"});
      browser = await createChrome();
      // browser = await createPhantomJs();
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
        await loginPage.login("user", "password");
        await loginPage.waitForPageLoad();
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
        const user: User = {username: "newUser", email: "newEmail", password: "newPassword", index: 0};
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
        await usersPage.editWithUserRow("newUser", user);
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
  setTimeout(() => {
    logger.info("wait...");
  }, jestTimeout);
  const chromePath = chrome.path;
  const loggingPrefs = new logging.Preferences();
  loggingPrefs.setLevel(logging.Type.DRIVER, logging.Level.WARNING);
  const options: Options = new Options();
  options.addArguments("headless", "disable-gpu", "no-sandbox", "start-maximized");
  // options.addArguments("--disable-gpu", "start-maximized");
  options.setLoggingPrefs(loggingPrefs);
  const driver: Driver = await new Builder()
    .withCapabilities(Capabilities.chrome())
    .setChromeOptions(options)
    .setLoggingPrefs(loggingPrefs)
    .build();
  return driver;
}

// async function createPhantomJs(): Promise<Driver> {
//   const loggingPrefs = new logging.Preferences();
//   loggingPrefs.setLevel(logging.Type.DRIVER, logging.Level.INFO);
//   const phantomjs = Capabilities.phantomjs();
//   phantomjs.set("phantomjs.binary.path", phantomJsPath);
//   const driver: Driver = await new Builder()
//     .withCapabilities(phantomjs)
//     .setLoggingPrefs(loggingPrefs)
//     .build();
//   return driver;
// }
