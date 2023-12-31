import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "bootstrap/dist/css/bootstrap.min.css";
import { IntlProvider } from "react-intl";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

const lang = navigator.language.split(/[-_]/)[0];
const messages = lang === "es" ? localeEsMessages : localeEnMessages;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider locale={lang} messages={messages}>
        <App />
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
