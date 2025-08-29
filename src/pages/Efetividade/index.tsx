import "./index.css";
// Adicional (component Table na página)
// import { Table } from "../../components/Table/Table";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { EfetividadeDialog } from "../../components/Dialog/Dialogs/Efetividade";
import { toast } from "react-toastify";
import { useState } from "react";

interface EfetividadeProps {}

export function Efetividade() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitEfetividade = (data: EfetividadeProps) => {
    toast.success("Efetividade cadastrada:", { data });
    // Aqui vai a lógica para salvar os dados
  };

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

        <button onClick={handleOpenDialog}>Efetivar</button>
        <EfetividadeDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitEfetividade}
        />
        
      </div>

      {/* main of page efetividade*/}
      <div className="main-efetividade">
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
