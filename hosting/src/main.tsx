import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <StrictMode>
        <App />
      </StrictMode>
    </I18nextProvider>
  </Provider>
);
