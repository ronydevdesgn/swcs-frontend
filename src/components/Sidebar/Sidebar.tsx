import { NavLink } from "react-router-dom";
// importando os ícones personalizados do projecto para melhorar a experiência do usuário na navegação.
import DashboardIcon from "../../assets/svgs/layout.svg";
import CursosIcon from "../../assets/svgs/layers.svg";
import EfetividadeIcon from "../../assets/svgs/activity.svg";
import PerfilIcon from "../../assets/svgs/user.svg";
import UsersIcon from "../../assets/svgs/users.svg";
import RelatoriosIcon from "../../assets/svgs/barChart.svg";
import DefinicoesIcon from "../../assets/svgs/minimize.svg";

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
            <img src={CursosIcon} alt="Cursos" className="icon" />
            <span>Cursos</span>
          </NavLink>
          <NavLink to="/dashboard" className={"Icon-link"}>
            <img src={DashboardIcon} alt="Dashboard" className="icon" />
            <span>Dashboard</span>
          </NavLink>
          {user?.role === "sumarista" && (
            <>
              <NavLink to="/professores" className={"Icon-link"}>
                <img src={UsersIcon} alt="Professores" className="icon" />
                <span>Professores</span>
              </NavLink>
              <NavLink to="/efetividade" className={"Icon-link"}>
                <img src={EfetividadeIcon} alt="Efetividade" className="icon" />
                <span>Efetividade</span>
              </NavLink>
            </>
          )}
          <NavLink to="/relatorios" className={"Icon-link"}>
            <img src={RelatoriosIcon} alt="Relatórios" className="icon" />
            <span>Relatórios</span>
          </NavLink>
          {/* <NavLink to="/definicoes" className={"Icon-link"}>
            <img src={DefinicoesIcon} alt="Definições" className="icon" />
            <span>Definições</span>
          </NavLink> */}
        </div>

        <div className="sidebar-footer">
          {/* Editar o nome de Perfil para nome do usuario cadastrado */}
          <NavLink to="/perfil" className={"Icon-link"}>
            <img src={PerfilIcon} alt="Perfil" className="icon" />
            <span>{user?.name || "Perfil"}</span>
          </NavLink>
          <button onClick={logout} className="logout-button Icon-link">
            <img src={DefinicoesIcon} alt="Terminar sessão" className="icon" />
            <span>Terminar</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
