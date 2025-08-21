import { InputSearch } from "../../components/InputSearch/InputSearch";
import { Table } from "../../components/Table/Table";
import "./index.css";
export function Efetividade() {
  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista de efetividades</h2>
          <span>Confirma a efetividade dos professores</span>
        </div>
        {/* component Input de pesquisa*/}
        <InputSearch Placeholder="Pesquisar por..." />
        <button>Efetivar</button>
      </div>

      {/* main of page efetividade*/}
      <div className="main-efetividade">
        <Table />
      </div>
    </section>
  );
}
