import {assert} from "chai";
import * as dotenv from "dotenv";
import "isomorphic-fetch";
import Server from "../server/Server";
import Jwt from "../src/api/Jwt";
import * as logger from "winston";

const jestTimeout: number = 20000;
const serverHost = "localhost";
const serverPort = 10001;
describe("Server", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  test.skip("start", async (done) => {
    const server: Server = new Server(serverHost, serverPort, serverHost, 10000);
    await server.start();
    const request: RequestInit = {
      headers: Jwt.getHeaders(),
      method: "GET",
    };
    const response: Response = await fetch("http://localhost:10001/", request);
    logger.debug(response.statusText);
    assert.isTrue(response.ok);
    await server.stop();
    done();
  }, jestTimeout);
});
