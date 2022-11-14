import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FpjsProvider
    cacheLocation="memory"
    loadOptions={{
      apiKey: process.env.REACT_FPJS_KEY,
      // region: "eu",
    }}
  >
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </React.StrictMode>
  </FpjsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
