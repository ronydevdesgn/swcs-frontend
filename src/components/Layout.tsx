import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import "./Layout.css";

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="container-item main-content">
        <Header />
        <main className="container-item">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
