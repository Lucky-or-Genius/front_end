import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // LOCAL AUTH:
  // <GoogleOAuthProvider clientId="236997775250-64mn182rafcedf2fe9ine01grk6bq5hu.apps.googleusercontent.com">
  <GoogleOAuthProvider clientId="236997775250-2lipl7fsptu8d0p1tsjlg2v8i86pnc1u.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
