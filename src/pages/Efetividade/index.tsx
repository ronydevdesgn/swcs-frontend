import { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { EfetividadeDialog } from '../../components/Dialog/Dialogs/Efetividade';
import { useEfetividades } from '../../hooks/useEfetividades';
import { toast } from 'react-toastify';

export function Efetividade() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: efetividadesData, isLoading, error } = useEfetividades();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

    // Filter data client-side since backend doesn't support search
    const filteredData = efetividadesData?.data?.filter((efetividade) => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        efetividade.Professor?.Nome?.toLowerCase().includes(searchLower) ||
        efetividade.Professor?.Departamento?.toLowerCase().includes(searchLower) ||
        efetividade.Data.includes(searchTerm) ||
        efetividade.EfetividadeID.toString().includes(searchTerm)
      );
    }) || [];

  // Colunas para o componente Table
  const columns = [
    { key: 'EfetividadeID', label: 'ID' },
    {
      key: 'Data',
      label: 'Data',
      render: (efetividade: any) => {
        try {
          return new Date(efetividade.Data).toLocaleDateString('pt-BR');
        } catch {
          return efetividade.Data;
        }
      },
    },
    { key: 'HorasTrabalhadas', label: 'Horas Trabalhadas' },
    { 
      key: 'Professor', 
      label: 'Professor',
      render: (efetividade: any) => efetividade.Professor?.Nome || 'N/A'
    },
    { 
      key: 'Departamento', 
      label: 'Departamento',
      render: (efetividade: any) => efetividade.Professor?.Departamento || 'N/A'
    },
    { 
      key: 'Curso', 
      label: 'Curso',
      render: (efetividade: any) => efetividade.Curso?.Nome || 'N/A'
    },
  ];

  const handlePageChange = (page: number) => {
    console.log(`Página alterada para: ${page}`);
  };

  if (error) {
    toast.error('Erro ao carregar efetividades');
  }

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista de efetividades</h2>
          <span>Confirma a efetividade dos professores</span>
        </div>

        <InputSearch
          Placeholder="Pesquisar efetividade"
          OnSearch={handleSearch}
        />

        <button onClick={() => setIsDialogOpen(true)}>
          Registrar Efetividade
        </button>
        
        <EfetividadeDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>

      <div className="main-efetividade">
        <Table
          columns={columns}
          data={filteredData}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          emptyMessage="Nenhuma efetividade encontrada"
        />
      </div>
    </section>
  );
}