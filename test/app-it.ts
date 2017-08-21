import {Builder, By, Capabilities, until, WebElement} from "selenium-webdriver";
import * as assert from "assert";
import User from "../src/domain/User";

var path = require('chromedriver').path;

let browser;
describe("Selenium", () => {
  beforeAll(async () => {
    browser = new Builder()
      .withCapabilities(Capabilities.chrome())
      .build();
  });
  afterAll(() => {
    browser.quit();
  });
  describe("App", () => {
    it("integration test", async (done) => {
      await addUserWithEditUser({username: "newUser", email: "newEmail", index: 0});
      await editUserWithUserRow("newUser", {username: "editedUser", email: "editedEmail", index: 0});
      await editUserWithEditUser("editedUser", {username: "editedUser2", email: "editedEmail2", index: 0});
      await removeUser("editedUser2");
      done();
    }, 20000);
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
  browser.sleep(500);
  await browser.wait(until.elementLocated(By.id("editUser")));
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
  browser.sleep(500);
  await browser.wait(until.elementLocated(By.id("editUser")));
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
  browser.sleep(500);
  await browser.wait(until.elementLocated(By.id("editUser")));
  const addedUser: User = await parseUser(await findUserRow(user.username));
  assert.equal(addedUser.username, user.username);
  assert.equal(addedUser.email, user.email);
}

async function removeUser(username: string) {
  await browser.get("http://localhost:8080");
  const userRow: WebElement = await findUserRow(username);
  await userRow.findElement(By.id("removeUser")).click();
  browser.sleep(500);
  await browser.wait(until.elementLocated(By.id("addUser")));
  const elements = await browser.findElements(By.xpath("//td[@id='username'][text()='" + username + "']"));
  assert.equal(0, elements.length);
}
async function findUserRow(username: string): Promise<WebElement> {
  return await browser.findElement(By.xpath("//td[@id='username'][text()='" + username + "']/.."));
}

async function parseUser(userRow: WebElement): Promise<User> {
  const username = await userRow.findElement(By.id("username")).getText();
  const email = await userRow.findElement(By.id("email")).getText();
  const index = await userRow.findElement(By.id("index")).getText();
  return {username: username, email: email, index: parseInt(index, 10)};
}
