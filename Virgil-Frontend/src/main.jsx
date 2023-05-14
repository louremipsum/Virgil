import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./routes/Error";
import Search from "./routes/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/search",
    element: <Search />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
