import { useState } from 'react';
import { toast } from 'react-toastify';
import { FuncionarioDialog } from '../../components/Dialog/Dialogs/FuncionarioDialog';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { Table } from '../../components/Table/Table';
import { useFuncionarios } from '../../hooks/useFuncionarios';
import { Funcionario } from '../../types/entities';

export function Funcionarios() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: funcionariosData, isLoading, error } = useFuncionarios({
    search: searchTerm,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Colunas para o componente Table
  const columns = [
    { key: 'funcionarioId', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'email', label: 'Email' },
  ];

  const handlePageChange = (page: number) => {
    console.log('Página alterada para:', page);
  };

  if (error) {
    toast.error('Erro ao carregar funcionários');
  }

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista de Funcionários</h2>
          <span>Funcionários cadastrados no sistema</span>
        </div>

        <InputSearch 
          Placeholder="Pesquisar funcionário" 
          OnSearch={handleSearch} 
        />
        
        <button onClick={() => setIsDialogOpen(true)}>
          Cadastrar Funcionário
        </button>

        <FuncionarioDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>

      <div className="main-professor">
        <Table
          columns={columns}
          data={funcionariosData?.data || []}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          emptyMessage="Nenhum funcionário encontrado"
        />
      </div>
    </section>
  );
}
