import { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { SumarioDialog } from '../../components/Dialog/Dialogs/SumarioDialog';
import { toast } from 'react-toastify';

import './index.css';

// dados feticios...
import { Sumario, SumarioForm } from '../../types/entities';

export function Sumarios() {
  // open and close of popups
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitSumario = (data: SumarioForm) => {
    // criar novo sumario com id e adicionar ao estado
    const newSumario: Sumario = {
      sumarioId: String(Date.now()),
      ...data,
    };
    setSumarios((prev) => [newSumario, ...prev]);
    toast.success('Sumário registado com sucesso');
  };

  // Dados, estado inicial para uma simulação!
  const [sumarios, setSumarios] = useState<Sumario[]>([]);

  // Função para lidar com a mudança de página
  const handlePageChange = (page: number) => {
    console.log('Mudou para a página:', page);
    toast.success('Mudou de página!');
  };

  // Dados para teste, ou seja, dados fictícios
  // Colunas genéricas para o componente Table
  const columns = [
    { key: 'sumarioId', label: 'Identificação' },
    {
      key: 'data',
      label: 'Data',
      render: (s: Sumario) => {
        try {
          return new Date(s.data).toLocaleDateString();
        } catch {
          return s.data;
        }
      },
    },
    { key: 'curso', label: 'Curso' },
    { key: 'professor', label: 'Professor' },
    { key: 'conteudo', label: 'Conteúdo' },
  ];

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Gestão de sumários</h2>
          <span>Confira os sumários já lecionados.</span>
        </div>
        {/* component Input de pesquisa*/}
        {/* OnSearch -> (value) => console.log(value)  atributo  que serve para capturar o valor da pesquisa,
        isso é útil para filtrar os dados da tabela, e quer dizer que temos que criar uma função para lidar com isso! */}
        <InputSearch
          Placeholder="Pesquisar por..."
          OnSearch={(value) => console.log(value)}
        />

        <button onClick={() => setIsDialogOpen(true)}>Novo Sumário</button>
        <SumarioDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmitSumario}
        />
      </div>

      {/* main of page sumários */}
      <div className="main-sumarios">
        <Table<Sumario>
          columns={columns}
          data={sumarios}
          onPageChange={handlePageChange}
          isLoading={true}
        />
      </div>
    </section>
  );
}
