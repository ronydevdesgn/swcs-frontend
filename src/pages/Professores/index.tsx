import { InputSearch } from "../../components/InputSearch/InputSearch";
import { Table } from "../../components/Table/Table";
import "./index.css";
export function Professores() {
  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista nominal</h2>
          <span>Professores cadastrados</span>
        </div>
        {/* component Input de pesquisa*/}
        <InputSearch Placeholder="Pesquisar professor" />
        <button>Cadastrar</button>
      </div>

      {/* main of page professor*/}
      <div className="main-professor">
        <Table />
      </div>
    </section>
  );
}
