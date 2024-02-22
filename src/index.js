import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okey", "Good", "Amaizing"]}
      defaultRating={3}
    />
  </React.StrictMode>
);
