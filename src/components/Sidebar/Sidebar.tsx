import { NavLink } from "react-router-dom";
import { useAuth, useLogout } from "../../hooks/useAuthentication";
import "./Sidebar.css";

export function Sidebar() {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <div className="container-item sidebar-container">
      <h1 className="logo-system">SWCS</h1>

      <nav>
        <div className="itens-nav-grup">
          <NavLink to="/cursos">Cursos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {user?.role === "sumarista" && (
            <>
              <NavLink to="/professores">Professores</NavLink>
              <NavLink to="/efetividade">Efetividade</NavLink>
            </>
          )}
          <NavLink to="/relatorios">Relatórios</NavLink>
          <NavLink to="/definicoes">Definições</NavLink>
        </div>

        <div className="sidebar-footer">
          {/* Editar o nome de Perfil para nome do usuario cadastrado */}
          <NavLink to="/perfil">{user?.name || "Perfil"}</NavLink>
          <button onClick={logout} className="logout-button">
            Terminar sessão
          </button>
        </div>
      </nav>
    </div>
  );
}
