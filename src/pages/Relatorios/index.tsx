import { Table } from '../../components/Table/Table';
import { Card } from '../../components/Card/Card';
import { useDashboardStats } from '../../hooks/useDashboardStatus';
import { useRelatorioPorMesData } from '../../hooks/useRelatoriosData';

import './index.css';
import {  useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Download } from 'react-feather';
import { Link } from 'react-router-dom';

export function Relatorios() {
  //const [search, setSearch] = useState('');
  const [departamento, setDepartamento] = useState('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const { data: stats } = useDashboardStats();
  //const { data: relatoriosData, isLoading: isLoadingRelatorios } = useRelatoriosData();
  const {data: relatoriosPorMes, isLoading: isLoadingRelatoriosPorMes} = 
  useRelatorioPorMesData(
    startDate,
    endDate, 
    departamento
  )


  useEffect(()=> {
    console.log("Relatorios", relatoriosPorMes)
    
  })

  // Filtrar relatórios com base na pesquisa
  const relatoriosFiltrados = relatoriosPorMes ?? [];

  const options = [
    { label: 'Selecione o departamento', value: '' },
    { label: 'Informática', value: 'INFORMATICA' },
    { label: 'Outros', value: 'OUTROS' }
  ]

  // Colunas genéricas para o componente Table
  const columns = [
    { key: 'professorID', label: 'ID' },
    { key: 'professorName', label: 'name' },
    { key: 'carga', label: 'Carga Horária' },
    { key: 'horasTrabalhadas', label: 'Horas Trabalhadas' },
    { key: 'faltas', label: 'Faltas' },
    { key: 'presencas', label: 'Presenças' },
  ];

  // Função para gerar e baixar o relatório em PDF
  // const generatePDF = (relatorio?: RelatorioData) => {
  //   console.log(relatorio)
  //   //const doc = new jsPDF();
    
  //   // if (relatorio) {
  //   //   // PDF específico do relatório
  //   //   doc.text(relatorio.titulo, 14, 20);
  //   //   doc.text(`Descrição: ${relatorio.descricao}`, 14, 30);
  //   //   doc.text(`Data: ${relatorio.data}`, 14, 40);
  //   //   doc.text(`Tipo: ${relatorio.tipo}`, 14, 50);
      
  //   //   if (relatorio.dados?.data) {
  //   //     autoTable(doc, {
  //   //       startY: 60,
  //   //       head: [['Professor', 'Data', 'Estado']],
  //   //       body: relatorio.dados.data.slice(0, 50).map((item: any) => [
  //   //         item.Professor?.Nome || 'N/A',
  //   //         item.Data || 'N/A',
  //   //         item.Estado || 'N/A'
  //   //       ]),
  //   //     });
  //   //   }
      
  //   //   doc.save(`${relatorio.titulo.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  //   // } else {
  //   //   // PDF geral com todos os relatórios
  //   //   doc.text('Relatórios Gerais do Sistema', 14, 20);
  //   //   autoTable(doc, {
  //   //     startY: 30,
  //   //     head: [columns.map((col) => col.label)],
  //   //     body: relatoriosFiltrados.map(rel => [
  //   //       rel.id,
  //   //       rel.titulo,
  //   //       rel.descricao,
  //   //       rel.data,
  //   //       rel.tipo
  //   //     ]),
  //   //   });
  //   //   doc.save('relatorios_geral.pdf');
  //   // }
  

  // };


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

          
          {
            relatoriosFiltrados.length !== 0 && (
              <Link className='button-export' to={`http://localhost:3333/reports/relatorios?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}&departamento=${departamento}`} target='_blank'>
            <Download size={16} />
            Exportar todos PDF
          </Link>
            )    
          }
          
          {
            relatoriosFiltrados.length === 0  && (
              <div className='button-no-export'>
                <Download size={16} />
            Exportar todos PDF
              </div>  
            )
          }
          
          {/* component Input de pesquisa*/}

          <div className='search-wrap'>
           <select
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className={`form-select`}
             >
              {options.map((option) => (
                <option key={String(option.value)} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>

           <input
            type="date"
            required={true}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Selecione uma data de inicio"
            className="form-input"  
          />

          <input
            type="date"
            required={true}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Selecione uma data de fim"
            className="form-input"  
          />
          </div>
        </div>

        <Table
          columns={[
            ...columns,
            // {
            //   key: 'acoes',
            //   label: 'Ações',
            //   render: (relatorio) => (
            //     <button
            //       onClick={() => generatePDF(relatorio as any)}
            //       className="btn-download"
            //       title="Baixar relatório específico"
            //     >
            //       <FileText size={16} />
            //     </button>
            //   )
            // }
          ]}
          data={relatoriosFiltrados}
          isLoading={isLoadingRelatoriosPorMes}
          emptyMessage="Nenhum relatório encontrado"
        />
      </div>
    </section>
  );
}
