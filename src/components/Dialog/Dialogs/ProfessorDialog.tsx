import { useState } from 'react';
import { Dialog } from '../Dialog';
import { ProfessorForm } from '../../../types/entities';

export function ProfessorDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfessorForm) => void;
}) {
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');

  const handleSubmit = () => {
    if (nome && departamento && cargaHoraria) {
      onSubmit({ nome, departamento, cargaHoraria });
      handleCancel();
    }
  };

  const handleCancel = () => {
    setNome('');
    setDepartamento('');
    setCargaHoraria('');
    onClose();
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header title="Cadastrar professor" subtitle="Preencha os campos abaixo" />
      <Dialog.Content>
        <Dialog.Input placeholder="Digite o nome do professor" value={nome} onChange={setNome} />
        <Dialog.Input
          placeholder="Digite o departamento do professor"
          value={departamento}
          onChange={setDepartamento}
        />
        <Dialog.Input
          placeholder="Digite a carga horária do professor"
          value={cargaHoraria}
          onChange={setCargaHoraria}
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
