import { useState } from "react";
import { Table } from "../../components/Table/Table";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { CursoDialog } from "../../components/Dialog/Dialogs/CursoDialog";

import "./index.css";
import { toast } from "react-toastify";

interface CursoProps {}

// Dados para testar apresentação da tabela (futuros dados vindo do backend)
interface CursosData {
  cursosId: string;
  nome: string;
  descrição: string;
}

export function Cursos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dados, estado inicial para uma simulação!
  const [isCursos, setCursos] = useState<CursosData[]>([
    {
      cursosId: "21FF24S3",
      nome: "Engenharia Informática",
      descrição: "Especialidade em Programação e Redes de Computador!",
    },
    {
      cursosId: "21FF24S3",
      nome: "Engenharia de Petroleo",
      descrição: "Especialidade em Perfuração",
    },
  ]);

  const handleSubmitCurso = (data: CursoProps) => {
    // Aqui vai a lógica para salvar os dados
    toast.success("Curso cadastrado com sucesso!");
  };

  // Dados para teste, ou seja, dados fictícios
  // Colunas genéricas para o componente Table
  const columns = [
    { key: "cursosId", label: "Identificação" },
    { key: "nome", label: "Nome" },
    { key: "descrição", label: "Descrição" },
  ];

  // Função para lidar com a mudança de página
  const handlePageChange = (page: number) => {
    toast.success(`Mudou para a página: ${page}`);
  };

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
        {/* OnSearch -> (value) => console.log(value)  atributo  que serve para capturar o valor da pesquisa,
        isso é útil para filtrar os dados da tabela, e quer dizer que temos que criar uma função para lidar com isso! */}
        <InputSearch Placeholder="Pesquisar curso" OnSearch={(value) => console.log(value)} />
        <button onClick={() => setIsDialogOpen(true)}>Cadastrar</button>
        <CursoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmitCurso}
        />
      </div>

      {/* main of page curso */}
      <div className="main-cursos">
        <Table<CursosData>
          columns={columns}
          data={isCursos}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
