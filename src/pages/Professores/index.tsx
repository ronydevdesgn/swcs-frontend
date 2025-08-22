import { useState } from "react";
// Adicional (component Table na página)
// import { Table } from "../../components/Table/Table";
import { Dialog } from "../../components/Dialog/Dialog";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import "./index.css";

interface ProfessorData {
  nome: string;
  departamento: string;
  cargaHoraria: string;
}

export function Professores() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitProfessor = (data: ProfessorData) => {
    console.log("Professor cadastrado:", data);
    // Aqui vai a lógica para salvar os dados
  };

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
        <button onClick={handleOpenDialog}>Cadastrar</button>

        <Dialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitProfessor}
        />
      </div>

      {/* main of page professor*/}
      <div className="main-professor">
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
