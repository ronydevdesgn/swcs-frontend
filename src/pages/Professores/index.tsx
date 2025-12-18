import { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { ProfessorDialog } from '../../components/Dialog/Dialogs/ProfessorDialog';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { useProfessores } from '../../hooks/useProfessores';
import { toast } from 'react-toastify';

export function Professores() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: professoresData, isLoading, error } = useProfessores({
    search: searchTerm,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Colunas para o componente Table
  const columns = [
    { key: 'ProfessorID', label: 'ID' },
    { key: 'Nome', label: 'Nome' },
    { key: 'Departamento', label: 'Departamento' },
    { key: 'CargaHoraria', label: 'Carga Horária' },
    { 
      key: 'Usuario', 
      label: 'Email',  
      render: (professor: any) => {
        return professor.Usuario.Email || 'Nenhum';
      } },
  ];

  const handlePageChange = (page: number) => {
    console.log('Página alterada para:', page);
  };

  if (error) {
    toast.error('Erro ao carregar professores');
  }

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista nominal</h2>
          <span>Professores cadastrados no sistema</span>
        </div>

        <InputSearch 
          Placeholder="Pesquisar professor" 
          OnSearch={handleSearch} 
        />
        
        <button onClick={() => setIsDialogOpen(true)}>
          Cadastrar Professor
        </button>

        <ProfessorDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>

      <div className="main-professor">
        <Table
          columns={columns}
          data={professoresData?.data || []}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          emptyMessage="Nenhum professor encontrado"
        />
      </div>
    </section>
  );
}