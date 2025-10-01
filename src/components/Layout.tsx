import { Outlet, useMatches, UIMatch } from "react-router-dom";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import "./Layout.css";

interface RouteHandle {
  title?: string;
}

export function Layout() {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];

  const currentMatch = matches[matches.length - 1];
  const pageTitle = currentMatch?.handle?.title || "";

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header pageTitle={pageTitle} />
        <main className="container-item">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
