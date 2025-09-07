import { useState } from 'react';
import { Dialog } from '../Dialog';

interface EfetividadeData {
  efetividadeId?: string;
  data: string;
  horasTrabalhadas: number;
  professor: string;
  status: 'PRESENTE' | 'FALTA';
}

export function EfetividadeDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EfetividadeData) => void;
}) {
  const [data, setData] = useState('');
  const [horasTrabalhadas, setHorasTrabalhadas] = useState(0);
  const [professor, setProfessor] = useState('');
  const [status, setStatus] = useState<'PRESENTE' | 'FALTA' | ''>('');

  const handleSubmit = () => {
    if (data && horasTrabalhadas && professor && status) {
      onSubmit({ data, horasTrabalhadas, professor, status });
      handleCancel();
    }
  };

  const handleCancel = () => {
    setProfessor('');
    setData('');
    setHorasTrabalhadas(0);
    setStatus('');
    onClose();
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header
        title="Registrar efetividade"
        subtitle="Registre os dados de desempenho"
      />
      <Dialog.Content>
        <Dialog.Input
          required={true}
          placeholder="Seleciona a data"
          value={data}
          onChange={setData}
          type="date"
        />
        {/* Aqui os nomes dos professores devem vir de forma automatica do banco de dados.*/}
        <Dialog.Select
          required={true}
          options={[
            { label: 'Selecione o professor', value: '' },
            { label: 'nome do professor', value: 'Prof. João Silva' },
          ]}
          value={professor}
          onChange={(value: string | number) => setProfessor(String(value))}
        />
        {/* Aqui as horas trabalhadas, possivelmente devem ser calculadas de forma automatica.*/}
        <Dialog.Input
          muted={true}
          placeholder="Digite as horas trabalhadas"
          value={horasTrabalhadas}
          onChange={(value: string) => setHorasTrabalhadas(Number(value))}
          type="number"
        />
        <Dialog.Select
          options={[
            { label: 'Selecione o status', value: '' },
            { label: 'Presente', value: 'PRESENTE' },
            { label: 'Falta', value: 'FALTA' },
          ]}
          value={status}
          onChange={(value: string | number) =>
            setStatus(value as '' | 'PRESENTE' | 'FALTA')
          }
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button onClick={handleSubmit}>Cadastrar</Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}
