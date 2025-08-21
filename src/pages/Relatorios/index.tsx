import { InputSearch } from "../../components/InputSearch/InputSearch";
import "./index.css";

export function Relatorios() {
  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Relatórios prontos</h2>
          <span>Baixe ou imprimi relatórios</span>
        </div>
        {/* component Input de pesquisa*/}
        <InputSearch Placeholder="Pesquisar por..." />
      </div>

      {/* main of page relatorios */}
      <div className="main-relatorios">
        <h3>The official report goes here...</h3>
      </div>
    </section>
  );
}
