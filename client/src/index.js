import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containters/App";
import { configureStore } from "./store";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { setAuthorizationToken, setCurrentUser } from "./store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();

if (localStorage.jwtToken) {
   setAuthorizationToken(localStorage.jwtToken);
   // prevent somone from manually tampering with the key of jwtToken in localStorage
   try {
      store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
   } catch (err) {
      store.dispatch(setCurrentUser);
   }
}

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
