import './index.css';
import { Table } from '../../components/Table/Table';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { EfetividadeDialog } from '../../components/Dialog/Dialogs/Efetividade';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface EfetividadeProps {
  efetividadeId?: string;
  data: string;
  horasTrabalhadas: number;
  professor: string;
  status: 'PRESENTE' | 'FALTA';
}

export function Efetividade() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dados, estado inicial para uma simulação!
  const [isEfetividade, setEfetividade] = useState<EfetividadeProps[]>([]);

  const handleSubmitEfetividade = (data: EfetividadeProps) => {
    const newEfetividade: EfetividadeProps = {
      // gerar id (efetividadeId) automaticamente
      efetividadeId: String(Date.now()),
      data: data.data,
      horasTrabalhadas: data.horasTrabalhadas,
      professor: data.professor,
      status: data.status,
    };
    setEfetividade((prev) => [newEfetividade, ...prev]);
    toast.success('Efetividade cadastrada:', { data });
  };

  // Colunas genéricas para o componente Table
  const columns = [
    { key: 'efetividadeId', label: 'Identificação' },
    { key: 'data', label: 'Data' },
    { key: 'horasTrabalhadas', label: 'Horas Trabalhadas' },
    { key: 'professor', label: 'Professor' },
    { key: 'status', label: 'Estado' },
  ];

  // Função para lidar com a mudança de página
  const handlePageChange = (page: number) => {
    toast.success(`Mudou para a página: ${page}`);
  };

  return (
    // CSS deste container vem do CSS da página de dashboard, sem o input. OBS: Apenas o cabeçalho do header do main
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Lista de efetividades</h2>
          <span>Confirma a efetividade dos professores</span>
        </div>
        {/* component Input de pesquisa*/}
        {/* OnSearch -> (value) => console.log(value)  atributo  que serve para capturar o valor da pesquisa,
        isso é útil para filtrar os dados da tabela, e quer dizer que temos que criar uma função para lidar com isso! */}
        <InputSearch
          Placeholder="Pesquisar por..."
          OnSearch={(value) => console.log(value)}
        />

        <button onClick={() => setIsDialogOpen(true)}>Efetivar</button>
        <EfetividadeDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmitEfetividade}
        />
      </div>

      {/* main of page efetividade*/}
      <div className="main-efetividade">
        <Table<EfetividadeProps>
          columns={columns}
          data={isEfetividade}
          onPageChange={handlePageChange}
          isLoading={true}
        />
      </div>
    </section>
  );
}
