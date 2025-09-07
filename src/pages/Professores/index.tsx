import { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { ProfessorDialog } from '../../components/Dialog/Dialogs/ProfessorDialog';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import './index.css';
import { toast } from 'react-toastify';
import { Professor, ProfessorForm } from '../../types/entities';

// dados inventados vindo
interface ProfessorData {
  professorId: string;
  nome: string;
  departamento: string;
  cargaHoraria: number;
}


export function Professores() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitProfessor = (data: ProfessorForm) => {
    // criar novo professor
    const newProfessor: Professor = {
      professorId: String(Date.now()),
      nome: data.nome,
      departamento: data.departamento,
      cargaHoraria: Number(data.cargaHoraria),
    };
    setProfessores((prev) => [newProfessor, ...prev]);
    toast.success('Professor cadastrado com sucesso');
    // Aqui vai a lógica para salvar os dados
  };

  // Dados, estado inicial para uma simulação!
  const [isProfessores, setProfessores] = useState<ProfessorData[]>([
    {
      professorId: '43FF24S324',
      nome: 'João Moreira Da Costa',
      departamento: 'Engenharia',
      cargaHoraria: 7,
    },
    {
      professorId: '40FF24S975',
      nome: 'Manuel Da Silva Pereira',
      departamento: 'Engenharia',
      cargaHoraria: 12,
    },
  ]);

  // Função para lidar com a mudança de página
  const handlePageChange = (page: number) => {
    console.log('Mudou para a página:', page);
  };

  // Dados para teste, ou seja, dados fictícios
  // Colunas genéricas para o componente Table
  const columns = [
    { key: 'professorId', label: 'Identificação' },
    { key: 'nome', label: 'Nome' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'cargaHoraria', label: 'Carga Horaria' },
  ];

  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista nominal</h2>
          <span>Professores cadastrados</span>
        </div>
        {/* component Input de pesquisa*/}
        {/* OnSearch -> (value) => console.log(value)  atributo  que serve para capturar o valor da pesquisa,
        isso é útil para filtrar os dados da tabela, e quer dizer que temos que criar uma função para lidar com isso! */}
        <InputSearch Placeholder="Pesquisar professor" OnSearch={(value) => console.log(value)} />
        <button onClick={() => setIsDialogOpen(true)}>Cadastrar</button>

        <ProfessorDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmitProfessor}
        />
      </div>

      {/* main of page professor*/}
      <div className="main-professor">
        <Table<ProfessorData>
          columns={columns}
          data={isProfessores}
          isLoading={true}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
