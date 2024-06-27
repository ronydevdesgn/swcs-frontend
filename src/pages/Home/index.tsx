import { RouterProvider } from "react-router-dom";
import { router } from "./routesPages";
import "./index.css";

export function Home() {
  return (
    <div className="layout">
      <h1>Hello! World!</h1>
      <div className="main-content">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
