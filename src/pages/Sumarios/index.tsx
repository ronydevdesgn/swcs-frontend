import { useState } from "react";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import "./index.css";

interface Sumario {
  sumarioId: string;
  data: string;
  curso: string;
  professor: string;
  conteudo: string;
}
export function Sumarios() {
  // Dados, estado inicial para uma 
  const [sumarios, setSumarios] =useState<Sumario[]>(
    [
      {
        sumarioId: "34fffds",
        data:"2025-08-20",
        curso:"Engenharia Informática",
        professor: "Prof. João",
        conteudo:"Introdução ao React + JSX",
      },
            {
        sumarioId: "334fffds",
        data:"2025-08-24",
        curso:"Nutrição",
        professor: "Prof. Mariza",
        conteudo:"Bioquímica dos Alimentos",
      },
    ]
  );

  return (
    // CSS deste container (header) vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
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
        <p>Here is the table to list the summaries!</p>
      </div>
    </section>
  );
}
