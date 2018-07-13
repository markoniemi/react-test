import {assert} from "chai";
import * as dotenv from "dotenv";
import * as fetchMock from "fetch-mock";
import MessageActions from "../../src/actions/MessageActions";
import {MessageType} from "../../src/domain/Message";
import store from "../../src/stores/Store";

describe("MessageActions", () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(MessageActions.resetMessages());
  });
  test("should add message in store", async (done) => {
    await store.dispatch(MessageActions.addMessage("message1", MessageType.INFO));
    await store.dispatch(MessageActions.addMessage("message2", MessageType.ERROR));
    assert.equal(store.getState().messages.length, 2);
    done();
  });
  test("should reset messages from store", async (done) => {
    await store.dispatch(MessageActions.addMessage("message1", MessageType.INFO));
    await store.dispatch(MessageActions.addMessage("message2", MessageType.ERROR));
    assert.equal(store.getState().messages.length, 2);
    await store.dispatch(MessageActions.resetMessages());
    assert.equal(store.getState().messages.length, 0);
    done();
  });
});
