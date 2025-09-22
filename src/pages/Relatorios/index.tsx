import { InputSearch } from '../../components/InputSearch/InputSearch';
import { Table } from '../../components/Table/Table';
import { Card } from '../../components/Card/Card';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import './index.css';
import { useState } from 'react';
import { ArrowDown, ArrowUp, Download } from 'react-feather';

interface relatorioData {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
}

export function Relatorios() {
  const [isRelatorios] = useState<relatorioData[]>([
    {
      id: '1',
      titulo: 'Relatório de Atividades',
      descricao: 'Descrição do relatório de atividades',
      data: '2023-03-15',
    },
  ]);

  // Colunas genéricas para o componente Table
  const columns = [
    { key: 'id', label: 'Identificação' },
    { key: 'titulo', label: 'Título' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'data', label: 'Data' },
  ];

  const rows = isRelatorios.map((rel) => [
    rel.id,
    rel.titulo,
    rel.descricao,
    rel.data,
  ]);

  // Função para gerar e baixar o relatório em PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório Geral', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [columns.map((col) => col.label)],
      body: rows,
    });
    doc.save('relatorio_geral.pdf');
  };

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Relatórios gerais</h2>
          <span>Verifica ou baixe relatórios</span>
        </div>
      </div>

      {/* main of page relatorios */}
      <div className="main-relatorios">
        {/* Cards com estatísticas */}
        <div className="cards-grid">
          <Card
            titleCard="Professores"
            numberCard={12}
            descriptionCard="Ativos"
            iconUp={<ArrowUp size={24} strokeWidth={4} />}
          />
          <Card
            titleCard="Sumários"
            numberCard={124}
            descriptionCard="Já cumpridos e não cumpridos até a data de hoje."
            iconUp={<ArrowUp size={24} strokeWidth={4} />}
            iconDown={
              <ArrowDown size={24} strokeWidth={4} className="svgdown" />
            }
          />
          <Card
            titleCard="Faltas"
            numberCard={45}
            descriptionCard="Registradas"
            iconDown={
              <ArrowDown size={24} strokeWidth={4} className="svgdown" />
            }
          />
          <Card
            titleCard="Presenças"
            numberCard={128}
            descriptionCard="Registradas"
            iconUp={<ArrowUp size={24} strokeWidth={4} />}
          />
        </div>

        {/* Botões de exportação */}
        <div className="actions">
          <button onClick={generatePDF}><Download size={16} /> Exportar PDF</button>
          
          {/* component Input de pesquisa*/}
          <InputSearch
            Placeholder="Pesquisar por..."
            OnSearch={(value) => console.log(value)}
          />
        </div>

        <Table<relatorioData>
          columns={columns}
          data={isRelatorios}
          isLoading={true}
          // onPageChange={handlePageChange} --- IGNORE ---
        />
      </div>
    </section>
  );
}
