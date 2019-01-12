import {By, until} from "selenium-webdriver";
import {Driver} from "selenium-webdriver/chrome";

export default class AbstractPage {
  protected browser: Driver;
  protected baseUrl: string;

  constructor(browser: Driver) {
    this.browser = browser;
    this.baseUrl = "http://" + process.env.HOST + ":" + process.env.PORT;
  }

  public async waitFor(by: By): Promise<void> {
    await this.browser.wait(until.elementLocated(by));
  }
  public async click(by: By): Promise<void> {
    await this.browser.findElement(by).click();
  }
  public async setText(by: By, value: string): Promise<void> {
    await this.browser.findElement(by).clear();
    await this.browser.findElement(by).sendKeys(value);
  }
}
