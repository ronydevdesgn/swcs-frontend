import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";
import { useAuth } from "../../hooks/useAuthentication";
import {
  Layout,
  Layers,
  Activity,
  Users,
  BarChart2,
  User,
  Minimize2,
  BookOpen,
} from "react-feather";

export function Sidebar() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth();


  async function handleLogout(){
    await signOut()
    navigate('/login', { replace: true });
  }

  return (
    <div className="container-item sidebar-container">
      <h1 className="logo-system">SWCS</h1>

      <nav>
        <div className="itens-nav-grup">
          <NavLink to="/cursos" className={"Icon-link"}>
            <Layout size={18} />
            <span>Cursos</span>
          </NavLink>
          <NavLink to="/dashboard" className={"Icon-link"}>
            <Activity size={18} />
            <span>Dashboard</span>
          </NavLink>
          {user?.tipo === "FUNCIONARIO" && (
            <>
          <NavLink to="/professores" className={"Icon-link"}>
            <Users size={18} />
            <span>Professores</span>
          </NavLink>
          <NavLink to="/efetividade" className={"Icon-link"}>
            <BarChart2 size={18} />
            <span>Efetividade</span>
          </NavLink>
          </>
          )}
          <NavLink to="/relatorios" className={"Icon-link"}>
            <Layers size={18} />
            <span>Relatórios</span>
          </NavLink>
          <NavLink to="/sumarios" className={"Icon-link"}>
            <BookOpen size={18} />
            <span>Sumários</span>
          </NavLink>
        </div>

        <div className="sidebar-footer">
          {/* Editar o nome de Perfil para nome do usuario cadastrado */}
          <NavLink to="/perfil" className={"Icon-link"}>
            <User size={18} />
            <span>Perfil</span>
          </NavLink>
          <button onClick={handleLogout} className="logout-button Icon-link">
            <Minimize2 size={18} />
            <span>Terminar</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
