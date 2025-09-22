import { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { SumarioDialog } from '../../components/Dialog/Dialogs/SumarioDialog';
import { useSumarios } from '../../hooks/useSumarios';
import { toast } from 'react-toastify';

export function Sumarios() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: sumariosData, isLoading, error } = useSumarios({
    search: searchTerm,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Colunas para o componente Table
  const columns = [
    { key: 'SumarioID', label: 'ID' },
    {
      key: 'Data',
      label: 'Data',
      render: (sumario: any) => {
        try {
          return new Date(sumario.Data).toLocaleDateString('pt-BR');
        } catch {
          return sumario.Data;
        }
      },
    },
    { 
      key: 'Curso', 
      label: 'Curso',
      render: (sumario: any) => sumario.Curso?.Nome || 'N/A'
    },
    { 
      key: 'Professor', 
      label: 'Professor',
      render: (sumario: any) => sumario.Professor?.Nome || 'N/A'
    },
    { 
      key: 'Conteudo', 
      label: 'Conteúdo',
      render: (sumario: any) => {
        const maxLength = 50;
        return sumario.Conteudo.length > maxLength 
          ? `${sumario.Conteudo.substring(0, maxLength)}...`
          : sumario.Conteudo;
      }
    },
  ];

  const handlePageChange = (page: number) => {
    console.log(`Página alterada para: ${page}`);
  };

  if (error) {
    toast.error('Erro ao carregar sumários');
  }

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Gestão de sumários</h2>
          <span>Confira os sumários já lecionados</span>
        </div>

        <InputSearch
          Placeholder="Pesquisar sumário"
          OnSearch={handleSearch}
        />

        <button onClick={() => setIsDialogOpen(true)}>
          Novo Sumário
        </button>
        
        <SumarioDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>

      <div className="main-sumarios">
        <Table
          columns={columns}
          data={sumariosData?.data || []}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          emptyMessage="Nenhum sumário encontrado"
        />
      </div>
    </section>
  );
}