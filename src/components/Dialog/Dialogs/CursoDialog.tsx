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
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [nivel, setNivel] = useState('');

  const handleSubmit = () => {
    if (nome && codigo && departamento && cargaHoraria && nivel) {
      onSubmit({ nome, codigo, departamento, cargaHoraria, nivel });
      handleCancel();
    }
  };

  const handleCancel = () => {
    setNome('');
    setCodigo('');
    setDepartamento('');
    setCargaHoraria('');
    setNivel('');
    onClose();
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header title="Cadastrar curso" subtitle="Preencha os dados do curso" />
      <Dialog.Content>
        <Dialog.Input placeholder="Digite o nome do curso" value={nome} onChange={setNome} />
        <Dialog.Input placeholder="Digite o código do curso" value={codigo} onChange={setCodigo} />
        <Dialog.Input
          placeholder="Digite o departamento do curso"
          value={departamento}
          onChange={setDepartamento}
        />
        <Dialog.Input
          placeholder="Digite a carga horária do curso"
          value={cargaHoraria}
          onChange={setCargaHoraria}
        />
        <Dialog.Input
          placeholder="Digite o nível do curso (Graduação/Pós-graduação)"
          value={nivel}
          onChange={setNivel}
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
