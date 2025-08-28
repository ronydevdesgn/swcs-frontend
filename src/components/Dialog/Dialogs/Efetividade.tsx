import { useState } from 'react';
import { Dialog } from '../Dialog';

interface EfetividadeData {
  professor: string;
  curso: string;
  semestre: string;
  avaliacaoMedia: string;
  frequenciaMedia: string;
}

export function EfetividadeDialog({ 
  isOpen, 
  onClose, 
  onSubmit 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onSubmit: (data: EfetividadeData) => void;
}) {
  const [professor, setProfessor] = useState('');
  const [curso, setCurso] = useState('');
  const [semestre, setSemestre] = useState('');
  const [avaliacaoMedia, setAvaliacaoMedia] = useState('');
  const [frequenciaMedia, setFrequenciaMedia] = useState('');

  const handleSubmit = () => {
    if (professor && curso && semestre && avaliacaoMedia && frequenciaMedia) {
      onSubmit({ professor, curso, semestre, avaliacaoMedia, frequenciaMedia });
      handleCancel();
    }
  };

  const handleCancel = () => {
    setProfessor('');
    setCurso('');
    setSemestre('');
    setAvaliacaoMedia('');
    setFrequenciaMedia('');
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
          placeholder="Digite o nome do professor"
          value={professor}
          onChange={setProfessor}
        />
        <Dialog.Input
          placeholder="Digite o nome do curso"
          value={curso}
          onChange={setCurso}
        />
        <Dialog.Input
          placeholder="Digite o semestre (Ex: 2024.1)"
          value={semestre}
          onChange={setSemestre}
        />
        <Dialog.Input
          placeholder="Digite a avaliação média (0-10)"
          value={avaliacaoMedia}
          onChange={setAvaliacaoMedia}
          type="number"
        />
        <Dialog.Input
          placeholder="Digite a frequência média (%)"
          value={frequenciaMedia}
          onChange={setFrequenciaMedia}
          type="number"
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button onClick={handleSubmit}>
          Cadastrar
        </Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}