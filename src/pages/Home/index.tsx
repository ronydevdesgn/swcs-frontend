import { RouterProvider } from "react-router-dom";
import { router } from "./routesPages";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./index.css";

export function Home() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h1>Hello! World!</h1>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
