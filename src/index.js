import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import './main.css';
import 'bootstrap/dist/css/bootstrap.css';
import store from './stores/Store';

main();

function main() {
  const app = document.createElement('div');
  document.body.appendChild(app);
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      app);
}
