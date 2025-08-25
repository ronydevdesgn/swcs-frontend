import { useState } from "react";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import "./index.css";
import { Table } from "../../components/Table/Table";

interface Sumario {
  sumarioId: string;
  data: string;
  curso: string;
  professor: string;
  conteudo: string;
}

export function Sumarios() {
  // Dados, estado inicial para uma simulação!
  const [sumarios, setSumarios] = useState<Sumario[]>([
    {
      sumarioId: "34fffds",
      data: "2025-08-20",
      curso: "Engenharia Informática",
      professor: "Prof. João",
      conteudo: "Introdução ao React + JSX",
    },
    {
      sumarioId: "334fffds",
      data: "2025-08-24",
      curso: "Nutrição",
      professor: "Prof. Mariza",
      conteudo: "Bioquímica dos Alimentos",
    },
  ]);

  // Função para lidar com a mudança de página
  const handlePageChange = (page: number) => {
    console.log("Mudou para a página:", page);
  };

  // Dados para teste, ou seja, dados fictícios
  // Colunas genéricas para o componente Table
  const columns = [
    {
      key: "data",
      label: "Data",
      render: (s: Sumario) => {
        try {
          return new Date(s.data).toLocaleDateString();
        } catch {
          return s.data;
        }
      },
    },
    { key: "curso", label: "Curso" },
    { key: "professor", label: "Professor" },
    { key: "conteudo", label: "Conteúdo" },
  ];

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Gestão de sumários</h2>
          <span>Confira os sumários já lecionados.</span>
        </div>
        <InputSearch Placeholder="Pesquisar por..." />
        {/* Adicionar uma função no <button/>, Abrir popup para cadastro de sumário */}
        <button>Novo Sumário</button>
      </div>

      {/* main of page sumários */}
      <div className="main-sumarios">
        {/* <p>Here is the table to list the summaries!</p> */}
        {/* Usando a API genérica do Table */}
        <Table<Sumario> columns={columns} data={sumarios} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}
