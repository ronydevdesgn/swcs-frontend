import "./index.css";

export function Perfil() {
  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Meus dados</h2>
          <span>Confira os seus dados pessoais</span>
        </div>
        <button>Actualizar</button>
      </div>

      {/* main of page perfil */}
      <div className="main-perfil">
        <h3>The dates goes here...</h3>
      </div>
    </section>
  );
}
