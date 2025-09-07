import { useState } from 'react';
import { Dialog } from '../Dialog';
import { SumarioForm } from '../../../types/entities';

export function SumarioDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SumarioForm) => void;
}) {
  // const [data, setData] = useState(''); // Data vem do sistema automaticamente
  // O professor tambem vem do sistema, pois é o usuario logado
  const [data, setData] = useState('');
  const [curso, setCurso] = useState('');
  const [professor, setProfessor] = useState('');
  const [conteudo, setConteudo] = useState('');

  const handleSubmit = () => {
    if (data && curso && professor && conteudo) {
      onSubmit({ data, curso, professor, conteudo });
      handleCancel();
    }
  };

  const handleCancel = () => {
    setData('');
    setCurso('');
    setProfessor('');
    setConteudo('');
    onClose();
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header
        title="Gerar sumário"
        subtitle="Configure os parâmetros do Sumário"
      />
      <Dialog.Content>
        <Dialog.Input
          required={true}
          // O ideal é que a data venha do sistema automaticamente
          // Por isso o type date
          value={data}
          onChange={setData}
          type="date"
        />
        <Dialog.Select
          required={true}
          options={[
            { label: 'Selecione o curso a lecionar', value: '' },
            { label: 'Curso 1', value: 'Curso 1' },
            { label: 'Curso 2', value: 'Curso 2' },
          ]}
          value={curso}
          onChange={(value: string | number) => setCurso(String(value))}
        />

        {/* Aqui o professor vai ser default, vindo do banco ou seja, é o usuário logado */}
        <Dialog.Input
          muted={true}
          placeholder="Preenche com o nome do professor"
          value={professor}
          onChange={setProfessor}
        />

        <Dialog.Input
          required={true}
          placeholder="Preenche o conteudo do Sumário"
          value={conteudo}
          onChange={setConteudo}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button onClick={handleSubmit}>Gerar Sumário</Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}
