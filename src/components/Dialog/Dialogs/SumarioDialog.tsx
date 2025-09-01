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
      <Dialog.Header title="Gerar sumário" subtitle="Configure os parâmetros do Sumário" />
      <Dialog.Content>
        <Dialog.Input
          placeholder="Preenche a data (Ex: 28-08-2025)"
          value={data}
          onChange={setData}
        />
        <Dialog.Input
          placeholder="Preenche o curso (Ex: Eng. Informática)"
          value={curso}
          onChange={setCurso}
        />
        {/* Aqui o professor vai ser default, vindo do banco */}
        <Dialog.Input
          placeholder="Preenche com o nome do professor"
          value={professor}
          onChange={setProfessor}
        />
        <Dialog.Input
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
