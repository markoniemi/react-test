import {assert} from "chai";
import * as Nightmare from "nightmare";
const nightmare = new Nightmare();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("App", () => {
  xit("should open users page", async (done) => {
    try {
      await nightmare.goto("http://localhost:8080").wait(10000);
    } catch (e) {
      console.log(e);
    }
    // await nightmare.goto("http://yahoo.com").wait("div#darla-assets-js-top");
  });
});
