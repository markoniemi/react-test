import {Driver} from "selenium-webdriver/chrome";

export default class WebDriverTest {
  protected browser: Driver;
  protected baseUrl: string;

  constructor(browser: Driver) {
    this.browser = browser;
    this.baseUrl = "http://" + process.env.HOST + ":" + process.env.PORT;
  }
}
