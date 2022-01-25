import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./providers/AuthProvider";
import PortfolioProvider from "./providers/PortfolioProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
