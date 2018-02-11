import * as assert from "assert";
import * as chrome from "chromedriver";
import {Builder, By, Capabilities, logging, until, WebElement} from "selenium-webdriver";
import {Driver, Options} from "selenium-webdriver/chrome";
import * as logger from "winston";
import User from "../src/domain/User";
import Entry = logging.Entry;

const jestTimeout: number = 20000;
// phantomJs
// import {Driver} from "selenium-webdriver/phantomjs";
// const phantomJsPath = require("phantomjs-prebuilt").path;

let browser: Driver;
describe("Selenium", () => {
  beforeAll(async () => {
    try {
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
    test("addUserWithEditUser", async (done) => {
      try {
        await addUserWithEditUser({username: "newUser", email: "newEmail", password: "newPassword", index: 0});
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("editUserWithUserRow", async (done) => {
      try {
        const user: User = {username: "editedUser", email: "editedEmail", password: "editedPassword", index: 0};
        await editUserWithUserRow("newUser", user);
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("editUserWithEditUser", async (done) => {
      try {
        const user: User = {username: "editedUser2", email: "editedEmail2", password: "password2", index: 0};
        await editUserWithEditUser("editedUser", user);
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
    test("removeUser", async (done) => {
      try {
        await removeUser("editedUser2");
        done();
      } catch (e) {
        logger.error(e);
        fail(e);
      }
    }, jestTimeout);
  });
});

async function editUserWithUserRow(username: string, user: User) {
  await browser.get("http://localhost:8080");
  await browser.wait(until.elementLocated(By.id("username")));
  const userRow: WebElement = await findUserRow(username);
  await userRow.findElement(By.id("username")).click();
  await userRow.findElement(By.id("username")).clear();
  await userRow.findElement(By.id("username")).sendKeys(user.username);
  await userRow.findElement(By.id("email")).clear();
  await userRow.findElement(By.id("email")).sendKeys(user.email);
  await userRow.findElement(By.id("saveUser")).click();
  // await browser.wait(until.elementLocated(By.id("editUser")));
  await waitForUserRow(user.username);
  // browser.sleep(500);
  const editedUser: User = await parseUser(await findUserRow(user.username));
  assert.equal(editedUser.username, user.username);
  assert.equal(editedUser.email, user.email);
}

async function editUserWithEditUser(username: string, user: User) {
  await browser.get("http://localhost:8080");
  await browser.wait(until.elementLocated(By.id("username")));
  const userRow: WebElement = await findUserRow(username);
  await userRow.findElement(By.id("editUser")).click();
  await browser.wait(until.elementLocated(By.id("saveUser")));
  await browser.findElement(By.id("username")).clear();
  await browser.findElement(By.id("username")).sendKeys(user.username);
  await browser.findElement(By.id("email")).clear();
  await browser.findElement(By.id("email")).sendKeys(user.email);
  await browser.findElement(By.id("saveUser")).click();
  // browser.sleep(1000);
  await browser.wait(until.elementLocated(By.id("editUser")));
  await waitForUserRow(user.username);
  const editedUser: User = await parseUser(await findUserRow(user.username));
  assert.equal(editedUser.username, user.username);
  assert.equal(editedUser.email, user.email);
}

async function addUserWithEditUser(user: User) {
  await browser.get("http://localhost:8080");
  await browser.wait(until.elementLocated(By.id("addUser")));
  await browser.findElement(By.id("addUser")).click();
  await browser.wait(until.elementLocated(By.id("saveUser")));
  await browser.findElement(By.id("username")).clear();
  await browser.findElement(By.id("username")).sendKeys(user.username);
  await browser.findElement(By.id("email")).clear();
  await browser.findElement(By.id("email")).sendKeys(user.email);
  await browser.findElement(By.id("saveUser")).click();
  // browser.sleep(1000);
  await waitForUserRow(user.username);
  await browser.wait(until.elementLocated(By.id("editUser")));
  const addedUser: User = await parseUser(await findUserRow(user.username));
  assert.equal(addedUser.username, user.username);
  assert.equal(addedUser.email, user.email);
}

async function removeUser(username: string) {
  await waitForUserRow(username);
  const userRow: WebElement = await findUserRow(username);
  await userRow.findElement(By.id("removeUser")).click();
  browser.sleep(1000);
  await browser.wait(until.elementLocated(By.id("addUser")));
  // const elements = await browser.findElements(By.xpath("//td[@id='username'][text()='" + username + "']"));
  // assert.equal(0, elements.length);
}

async function findUserRow(username: string): Promise<WebElement> {
  return browser.findElement(By.xpath("//td[@id='username'][text()='" + username + "']/.."));
}

async function waitForUserRow(username: string) {
  await browser.wait(until.elementLocated(By.xpath("//td[@id='username'][text()='" + username + "']/..")));
}

async function parseUser(userRow: WebElement): Promise<User> {
  const username = await userRow.findElement(By.id("username")).getText();
  const email = await userRow.findElement(By.id("email")).getText();
  const index = await userRow.findElement(By.id("index")).getText();
  // const password = await userRow.findElement(By.id("password")).getText();
  return {username, email, password: "", index: parseInt(index, 10)};
}

async function createChrome(): Promise<Driver> {
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
