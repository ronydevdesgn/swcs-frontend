// Adicional (component Table na página)
// import { Table } from "../../components/Table/Table";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import "./index.css";

export function Cursos() {
  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista de cursos</h2>
          <span>Cursos cadastrados</span>
        </div>
        {/* component Input de pesquisa*/}
        <InputSearch Placeholder="Pesquisar curso" />
        <button>Cadastrar</button>
      </div>

      {/* main of page curso */}
      <div className="main-cursos">
        {/* <Table
          columns={columns}
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
        /> */}
      </div>
    </section>
  );
}
