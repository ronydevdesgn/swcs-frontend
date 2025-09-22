import { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { CursoDialog } from '../../components/Dialog/Dialogs/CursoDialog';
import { useCursos } from '../../hooks/useCursos';
import { toast } from 'react-toastify';

export function Cursos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: cursosData, isLoading, error } = useCursos({
    search: searchTerm,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Colunas para o componente Table
  const columns = [
    { key: 'cursoId', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'descricao', label: 'Descrição' },
    { 
      key: 'professores', 
      label: 'Professores',
      render: (curso: any) => {
        return curso.professores?.map((p: any) => p.nome).join(', ') || 'Nenhum';
      }
    },
  ];

  // Função para lidar com a mudança de página
  const handlePageChange = (page: number) => {
    console.log(`Página alterada para: ${page}`);
  };

  if (error) {
    toast.error('Erro ao carregar cursos');
  }

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista de cursos</h2>
          <span>Cursos cadastrados no sistema</span>
        </div>
        
        <InputSearch 
          Placeholder="Pesquisar curso" 
          OnSearch={handleSearch} 
        />
        
        <button onClick={() => setIsDialogOpen(true)}>
          Cadastrar Curso
        </button>
        
        <CursoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>

      <div className="main-cursos">
        <Table
          columns={columns}
          data={cursosData?.data || []}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          emptyMessage="Nenhum curso encontrado"
        />
      </div>
    </section>
  );
}