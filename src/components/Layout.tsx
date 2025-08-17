import { Outlet, useMatches, UIMatch } from "react-router-dom";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import "./Layout.css";

interface RouteHandle {
  title?: string;
}

export function Layout() {
  // aqui o matches já sabe que handle pode ter { title }
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  // matches é um array de objetos que representam as rotas correspondentes
  // cada objeto tem uma propriedade 'handle' que pode conter o título da rota

  // pega o último match (rota mais interna)
  const currentMatch = matches[matches.length - 1];
  const pageTitle = currentMatch?.handle?.title || "";

  return (
    <div className="layout">
      <Sidebar />
      <div className="container-item main-content">
        <Header pageTitle={pageTitle} />
        <main className="container-item">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
