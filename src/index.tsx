import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@arco-design/web-react/dist/css/arco.css";
import "./global.css";

ReactDOM.render(
  <React.StrictMode>
    <div
      id="app"
      className="flex-center relative"
      style={{ height: "100vh", width: "100vw" }}
    >
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
