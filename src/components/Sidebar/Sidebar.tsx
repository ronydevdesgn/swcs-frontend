import { NavLink } from "react-router-dom";
// importando os ícones personalizados do projecto para melhorar a experiência do usuário na navegação.
import { ReactComponent as DashboardIcon } from "../../assets/svgs/layout.svg";
import { ReactComponent as CursosIcon } from "../../assets/svgs/layers.svg";
import { ReactComponent as EfetividadeIcon } from "../../assets/svgs/activity.svg";
import { ReactComponent as PerfilIcon } from "../../assets/svgs/user.svg";
import { ReactComponent as UsersIcon } from "../../assets/svgs/users.svg";
import { ReactComponent as RelatoriosIcon } from "../../assets/svgs/barChart.svg";
import { ReactComponent as DefinicoesIcon } from "../../assets/svgs/minimize.svg";

import "./Sidebar.css";
import { useAuth, useLogout } from "../../hooks/useAuthentication";

export function Sidebar() {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <div className="container-item sidebar-container">
      <h1 className="logo-system">SWCS</h1>

      <nav>
        <div className="itens-nav-grup">
          <NavLink to="/cursos" className={"Icon-link"}>
            <CursosIcon />
            <span>Cursos</span>
          </NavLink>
          <NavLink to="/dashboard" className={"Icon-link"}>
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          {user?.role === "sumarista" && (
            <>
              <NavLink to="/professores" className={"Icon-link"}>
                <UsersIcon />
                <span>Professores</span>
              </NavLink>
              <NavLink to="/efetividade" className={"Icon-link"}>
                <EfetividadeIcon />
                <span>Efetividade</span>
              </NavLink>
            </>
          )}
          <NavLink to="/relatorios" className={"Icon-link"}>
            <RelatoriosIcon />
            <span>Relatórios</span>
          </NavLink>
          <NavLink to="/definicoes" className={"Icon-link"}>
            <DefinicoesIcon />
            <span>Definições</span>
          </NavLink>
        </div>

        <div className="sidebar-footer">
          {/* Editar o nome de Perfil para nome do usuario cadastrado */}
          <NavLink to="/perfil" className={"Icon-link"}>
            <PerfilIcon />
            <span>{user?.name || "Perfil"}</span>
          </NavLink>
          <button onClick={logout} className="logout-button Icon-link">
            <DashboardIcon />
            <span>Terminar sessão</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
