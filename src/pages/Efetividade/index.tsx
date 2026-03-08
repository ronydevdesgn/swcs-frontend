import { useState } from 'react';
import { toast } from 'react-toastify';
import { EfetividadeDialog } from '../../components/Dialog/Dialogs/Efetividade';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { Table } from '../../components/Table/Table';
import { useEfetividades } from '../../hooks/useEfetividades';
import { Efetividade as EfetividadeType } from '../../types/entities';

export function Efetividade() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: efetividadesData, isLoading, error } = useEfetividades();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

    // Filter data client-side since backend doesn't support search
    const filteredData = efetividadesData?.data?.filter((efetividade: EfetividadeType) => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        efetividade.professor?.nome?.toLowerCase().includes(searchLower) ||
        efetividade.professor?.departamento?.toLowerCase().includes(searchLower) ||
        efetividade.data.includes(searchTerm) ||
        efetividade.efetividadeId.toString().includes(searchTerm)
      );
    }) || [];

  // Colunas para o componente Table
  const columns = [
    { key: 'efetividadeId', label: 'ID' },
    {
      key: 'data',
      label: 'Data',
      render: (efetividade: EfetividadeType) => {
        try {
          return new Date(efetividade.data).toLocaleDateString('pt-BR');
        } catch {
          return efetividade.data;
        }
      },
    },
    { key: 'horasTrabalhadas', label: 'Horas Trabalhadas' },
    { 
      key: 'professor', 
      label: 'Professor',
      render: (efetividade: EfetividadeType) => efetividade.professor?.nome || 'N/A'
    },
    { 
      key: 'departamento', 
      label: 'Departamento',
      render: (efetividade: EfetividadeType) => efetividade.professor?.departamento || 'N/A'
    },
    { 
      key: 'curso', 
      label: 'Curso',
      render: (efetividade: EfetividadeType) => efetividade.curso?.nome || 'N/A'
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