import { useState } from 'react';
import { Dialog } from '../Dialog';
import { CursoForm } from '../../../types/entities';

export function CursoDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CursoForm) => void;
}) {
  // const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = () => {
    if (nome && descricao) {
      onSubmit({ nome, descricao });
      handleCancel();
    }
  };

  const handleCancel = () => {
    // setCodigo(''); Id ou codigo e gerado automaticamente
    setNome('');
    setDescricao('');
    onClose();
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header
        title="Cadastrar curso"
        subtitle="Preencha os dados do curso"
      />
      <Dialog.Content>
        <Dialog.Input
          required={true}
          placeholder="Digite o nome do curso"
          value={nome}
          onChange={setNome}
        />
        <Dialog.Input
          placeholder="Digite a descrição do curso"
          value={descricao}
          onChange={setDescricao}
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
