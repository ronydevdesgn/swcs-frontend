import { InputSearch } from '../../components/InputSearch/InputSearch';
import { Table } from '../../components/Table/Table';
import { Card } from '../../components/Card/Card';
import { useDashboardStats } from '../../hooks/useDashboardStatus';
import { useRelatoriosData, RelatorioData } from '../../hooks/useRelatoriosData';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import './index.css';
import { useState } from 'react';
import { ArrowDown, ArrowUp, Download, FileText } from 'react-feather';

export function Relatorios() {
  const [search, setSearch] = useState('');
  
  const { data: stats } = useDashboardStats();
  const { data: relatoriosData, isLoading: isLoadingRelatorios } = useRelatoriosData();

  // Filtrar relatórios com base na pesquisa
  const relatoriosFiltrados = relatoriosData?.filter(rel => 
    rel.titulo.toLowerCase().includes(search.toLowerCase()) ||
    rel.descricao.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  // Colunas genéricas para o componente Table
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Título' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'data', label: 'Data' },
    { key: 'tipo', label: 'Tipo' },
  ];

  // Função para gerar e baixar o relatório em PDF
  const generatePDF = (relatorio?: RelatorioData) => {
    console.log(relatorio)
    const doc = new jsPDF();
    
    if (relatorio) {
      // PDF específico do relatório
      doc.text(relatorio.titulo, 14, 20);
      doc.text(`Descrição: ${relatorio.descricao}`, 14, 30);
      doc.text(`Data: ${relatorio.data}`, 14, 40);
      doc.text(`Tipo: ${relatorio.tipo}`, 14, 50);
      
      if (relatorio.dados?.data) {
        autoTable(doc, {
          startY: 60,
          head: [['Professor', 'Data', 'Estado']],
          body: relatorio.dados.data.slice(0, 50).map((item: any) => [
            item.Professor?.Nome || 'N/A',
            item.Data || 'N/A',
            item.Estado || 'N/A'
          ]),
        });
      }
      
      doc.save(`${relatorio.titulo.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    } else {
      // PDF geral com todos os relatórios
      doc.text('Relatórios Gerais do Sistema', 14, 20);
      autoTable(doc, {
        startY: 30,
        head: [columns.map((col) => col.label)],
        body: relatoriosFiltrados.map(rel => [
          rel.id,
          rel.titulo,
          rel.descricao,
          rel.data,
          rel.tipo
        ]),
      });
      doc.save('relatorios_geral.pdf');
    }
  };

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Relatórios gerais</h2>
          <span>Verifica ou baixe relatórios automáticos do sistema</span>
        </div>
      </div>

      {/* main of page relatorios */}
      <div className="main-relatorios">
        {/* Cards com estatísticas */}
        <div className="cards-grid">
          <Card
            titleCard="Professores"
            numberCard={stats?.professoresAtivos ?? 0}
            descriptionCard="Ativos no sistema"
            iconUp={<ArrowUp size={24} strokeWidth={4} />}
          />
          <Card
            titleCard="Sumários"
            numberCard={stats?.totalSumarios ?? 0}
            descriptionCard={`${stats?.sumariosRecentes ?? 0} registrados recentemente`}
            iconUp={<ArrowUp size={24} strokeWidth={4} />}
            iconDown={
              <ArrowDown size={24} strokeWidth={4} className="svgdown" />
            }
          />
          <Card
            titleCard="Faltas"
            numberCard={stats?.totalFaltas ?? 0}
            descriptionCard="Registradas no sistema"
            iconDown={
              <ArrowDown size={24} strokeWidth={4} className="svgdown" />
            }
          />
          <Card
            titleCard="Presenças"
            numberCard={stats?.totalPresencas ?? 0}
            descriptionCard={`${stats?.presencasRecentes ?? 0} registradas recentemente`}
            iconUp={<ArrowUp size={24} strokeWidth={4} />}
          />
        </div>

        {/* Botões de exportação */}
        <div className="actions">
          <button onClick={() => generatePDF()} disabled={!relatoriosFiltrados.length}>
            <Download size={16} />
            Exportar todos PDF
          </button>
          
          {/* component Input de pesquisa*/}
          <InputSearch
            Placeholder="Pesquisar relatórios..."
            OnSearch={setSearch}
          />
        </div>

        <Table
          columns={[
            ...columns,
            {
              key: 'acoes',
              label: 'Ações',
              render: (relatorio) => (
                <button
                  onClick={() => generatePDF(relatorio)}
                  className="btn-download"
                  title="Baixar relatório específico"
                >
                  <FileText size={16} />
                </button>
              )
            }
          ]}
          data={relatoriosFiltrados}
          isLoading={isLoadingRelatorios}
          emptyMessage="Nenhum relatório encontrado"
        />
      </div>
    </section>
  );
}
