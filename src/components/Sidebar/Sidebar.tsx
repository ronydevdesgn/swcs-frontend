import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthentication";
import "./Sidebar.css";

export function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="sidebar-container">
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/cursos">Cursos</NavLink>
        {user?.role === "sumarista" && (
          <>
            <NavLink to="/professores">Professores</NavLink>
            <NavLink to="/efetividade">Efetividade</NavLink>
          </>
        )}
        <NavLink to="/relatorios">Relatórios</NavLink>
        <NavLink to="/perfil">Perfil</NavLink>
        <NavLink to="/definicoes">Definições</NavLink>
      </nav>
    </div>
  );
}
