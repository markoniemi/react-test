import {assert} from "chai";
import * as dotenv from "dotenv";
import "isomorphic-fetch";
import Backend from "../server/Backend";
import Jwt from "../src/api/Jwt";

const backendHost = "localhost";
const backendPort = 10000;
describe("Backend", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  test("start", async (done) => {
    const backend: Backend = new Backend(backendHost, backendPort);
    await backend.start();
    const request: RequestInit = {
      headers: Jwt.getHeaders(),
      method: "GET",
    };
    const response: Response = await fetch("http://localhost:10000/api/users", request);
    assert.isFalse(response.ok);
    response.json();
    backend.stop();
    done();
  });
});
