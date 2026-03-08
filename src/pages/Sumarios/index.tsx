import { useState } from 'react';
import { toast } from 'react-toastify';
import { SumarioDialog } from '../../components/Dialog/Dialogs/SumarioDialog';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { Table } from '../../components/Table/Table';
import { usePermission } from '../../hooks/usePermission';
import { useSumarios } from '../../hooks/useSumarios';
import { Sumario } from '../../types/entities';
import { PERMISSIONS } from '../../utils/permissions';

export function Sumarios() {
  const { can } = usePermission();
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
    { key: 'sumarioId', label: 'ID' },
    {
      key: 'data',
      label: 'Data',
      render: (sumario: Sumario) => {
        try {
          return new Date(sumario.data).toLocaleDateString('pt-BR');
        } catch {
          return sumario.data;
        }
      },
    },
    { 
      key: 'curso', 
      label: 'Curso',
      render: (sumario: Sumario) => sumario.curso?.nome || 'N/A'
    },
    { 
      key: 'professor', 
      label: 'Professor',
      render: (sumario: Sumario) => sumario.professor?.nome || 'N/A'
    },
    { 
      key: 'conteudo', 
      label: 'Conteúdo',
      render: (sumario: Sumario) => {
        const maxLength = 50;
        return sumario.conteudo.length > maxLength 
          ? `${sumario.conteudo.substring(0, maxLength)}...`
          : sumario.conteudo;
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

        {can(PERMISSIONS.REGISTRAR_SUMARIO) && (
          <button onClick={() => setIsDialogOpen(true)}>
            Novo Sumário
          </button>
        )}
        
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