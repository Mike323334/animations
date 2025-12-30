import React from "react";
import ReactDOM from "react-dom/client";
import * as AppModule from "./App";

const App = AppModule.default;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;