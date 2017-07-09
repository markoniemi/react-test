import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Root} from "./containers/Root";

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>,
    document.getElementById("root"),
  );
};

render();

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    render();
  });
}

