import { useState } from 'react';
import { Dialog } from '../Dialog';
import { CursoForm } from '../../../types/entities';
import { useCreateCurso } from '../../../hooks/useCursos';
import { useProfessores } from '../../../hooks/useProfessores';
import { validateCursoNome, validateCursoDescricao } from '../../../utils/validations';
import { toast } from 'react-toastify';

interface FormErrors {
  nome?: string;
  descricao?: string;
  professorId?: string;
}

export function CursoDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: CursoForm) => void;
}) {
  const createCurso = useCreateCurso();
  const { data: professoresData, isLoading: loadingProfessores } = useProfessores();

  const [formData, setFormData] = useState<CursoForm>({
    nome: '',
    descricao: '',
    professorId: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nomeError = validateCursoNome(formData.nome);
    const descricaoError = validateCursoDescricao(formData.descricao);

    if (nomeError) newErrors.nome = nomeError;
    if (descricaoError) newErrors.descricao = descricaoError;
    if (!formData.professorId) newErrors.professorId = 'Professor é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      await createCurso.mutateAsync({
        Nome: formData.nome,
        Descricao: formData.descricao,
        ProfessorID: formData.professorId,
      });

      toast.success('Curso cadastrado com sucesso!');
      onSubmit?.(formData);
      handleCancel();
    } catch (error) {
      console.error('Erro ao cadastrar curso:', error);
      toast.error('Erro ao cadastrar curso. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      descricao: '',
      professorId: 0,
    });
    setErrors({});
    onClose();
  };

  // Preparar opções dos professores
  const professorOptions = [
    { label: 'Selecione o professor responsável', value: '' },
    ...(professoresData?.data?.map(professor => ({
      label: `${professor.Nome} - ${professor.Departamento}`,
      value: professor.ProfessorID
    })) || [])
  ];

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header
        title="Cadastrar curso"
        subtitle="Preencha os dados do novo curso"
      />
      <Dialog.Content>
        <Dialog.Input
          required={true}
          placeholder="Digite o nome do curso"
          value={formData.nome}
          onChange={(value) => setFormData(prev => ({ ...prev, nome: value }))}
          error={errors.nome}
        />
        
        <Dialog.Input
          required={true}
          placeholder="Digite a descrição do curso"
          value={formData.descricao}
          onChange={(value) => setFormData(prev => ({ ...prev, descricao: value }))}
          error={errors.descricao}
        />

        <Dialog.Select
          required={true}
          options={professorOptions}
          value={formData.professorId}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            professorId: Number(value) 
          }))}
          error={errors.professorId}
          disabled={loadingProfessores}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button 
          onClick={handleSubmit} 
          disabled={createCurso.isPending || loadingProfessores}
        >
          {createCurso.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}