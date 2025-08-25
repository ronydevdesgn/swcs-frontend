import { useAuth } from "../../hooks/useAuthentication";
import "./index.css";

export function Perfil() {
  const { user } = useAuth();

  return (
    // CSS deste container (header) vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Meus dados</h2>
          <span>Confira os seus dados pessoais</span>
        </div>
        {/* Adicionar uma função no <button/> de Reload da página ou browser */}
        <button>Actualizar</button>
      </div>

      {/* main of page perfil */}
      <div className="main-perfil">
        <div className="space">
          <label>Nome completo: </label>
          <span>{user?.name || "Usuário não encontrado..."}</span>
        </div>
        <div className="space">
          <label>E-mail: </label>
          <span>{user?.email || "E-mail não encontrado..."}</span>
        </div>
        <div className="space">
          <label>Cargo: </label>
          <span>{user?.role || "Cargo não encontrado..."}</span>
        </div>
      </div>
    </section>
  );
}
