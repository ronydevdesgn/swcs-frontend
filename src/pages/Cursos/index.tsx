import { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { CursoDialog } from '../../components/Dialog/Dialogs/CursoDialog';
import './index.css';
import { toast } from 'react-toastify';
import { CursoForm } from '../../types/entities';

// Dados para testar apresentação da tabela (futuros dados vindo do backend)
interface CursosData {
  cursosId: string;
  nome: string;
  descricao: string;
}

export function Cursos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dados, estado inicial para uma simulação!
  const [isCursos, setCursos] = useState<CursosData[]>([
    {
      cursosId: '21FF24S3',
      nome: 'Engenharia Informática',
      descricao: 'Especialidade em Programação e Redes de Computador!',
    }
  ]);

  const handleSubmitCurso = (data: CursoForm) => {
    // criar novo curso compatível com CursosData
    const newCurso: CursosData = {
      // gerar id (cursosId) automaticamente
      cursosId: String(Date.now()),
      nome: data.nome,
      descricao: data.descricao || '',
    };
    setCursos((prev) => [newCurso, ...prev]);
    toast.success('Curso cadastrado com sucesso!');
  };

  // Colunas genéricas para o componente Table
  const columns = [
    { key: 'cursosId', label: 'Identificação' },
    { key: 'nome', label: 'Nome' },
    { key: 'descricao', label: 'Descrição' },
  ];

  // Função para lidar com a mudança de página
  const handlePageChange = (page: number) => {
    toast.success(`Mudou para a página: ${page}`);
  };

  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input. OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista de cursos</h2>
          <span>Cursos cadastrados</span>
        </div>
        
        {/* component Input de pesquisa*/}
        {/* OnSearch -> (value) => console.log(value)  atributo  que serve para capturar o valor da pesquisa,
        isso é útil para filtrar os dados da tabela, e quer dizer que temos que criar uma função para lidar com isso! */}
        <InputSearch Placeholder="Pesquisar curso" OnSearch={(value) => console.log(value)} />
        <button onClick={() => setIsDialogOpen(true)}>Cadastrar</button>
        <CursoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmitCurso}
        />
      </div>

      {/* main of page curso */}
      <div className="main-cursos">
        <Table<CursosData>
          columns={columns}
          data={isCursos}
          onPageChange={handlePageChange}
          isLoading={true}
        />
      </div>
    </section>
  );
}
