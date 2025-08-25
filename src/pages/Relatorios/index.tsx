import { InputSearch } from "../../components/InputSearch/InputSearch";
import "./index.css";

export function Relatorios() {
  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Relatórios gerais</h2>
          <span>Verifica ou baixe relatórios</span>
        </div>
        {/* component Input de pesquisa*/}
        <InputSearch Placeholder="Pesquisar por..." />
      </div>

      {/* main of page relatorios */}
      <div className="main-relatorios">
        <h3>The official report goes here... and other contents</h3>
        {/* here's four cards with statistics */}
        {/* card 1 */}
        {/* card 2 */}
        {/* card 3 */}
        {/* card 4 */}
        
        {/* Two buttons for download, one to PDF and other to Excel */}

        {/* here's one table with contents for data visualization */}
        {/* table */}
      </div>
    </section>
  );
}
