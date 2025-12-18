import { useState } from 'react';
import { Dialog } from '../Dialog';
import { EfetividadeForm } from '../../../types/entities';
import { useCreateEfetividade } from '../../../hooks/useEfetividades';
import { useProfessores } from '../../../hooks/useProfessores';
import { useCursos } from '../../../hooks/useCursos';
import { validateDate, validateHorasTrabalhadas } from '../../../utils/validations';
import { toast } from 'react-toastify';

interface FormErrors {
  data?: string;
  horasTrabalhadas?: string;
  professorId?: string;
  cursoId?: string;
}

export function EfetividadeDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: EfetividadeForm) => void;
}) {
  const createEfetividade = useCreateEfetividade();
  const { data: professoresData, isLoading: loadingProfessores } = useProfessores();
  const { data: cursosData, isLoading: loadingCursos } = useCursos();

  const [formData, setFormData] = useState<EfetividadeForm>({
    data: new Date().toISOString().split('T')[0],
    horasTrabalhadas: 0,
    professorId: 0,
    cursoId: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const dataError = validateDate(formData.data);
    const horasError = validateHorasTrabalhadas(formData.horasTrabalhadas);

    if (dataError) newErrors.data = dataError;
    if (horasError) newErrors.horasTrabalhadas = horasError;
    if (!formData.professorId) newErrors.professorId = 'Professor é obrigatório';
    if (!formData.cursoId) newErrors.cursoId = 'Curso é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      await createEfetividade.mutateAsync({
        Data: new Date(formData.data).toISOString(),
        HorasTrabalhadas: formData.horasTrabalhadas,
        ProfessorID: formData.professorId,
        CursoID: formData.cursoId,
      });

      toast.success('Efetividade registrada com sucesso!');
      onSubmit?.(formData);
      handleCancel();
    } catch (error) {
      console.error('Erro ao registrar efetividade:', error);
      toast.error('Erro ao registrar efetividade. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setFormData({
      data: new Date().toISOString().split('T')[0],
      horasTrabalhadas: 0,
      professorId: 0,
      cursoId: 0,
    });
    setErrors({});
    onClose();
  };

  // Preparar opções dos professores e cursos
  const professorOptions = [
    { label: 'Selecione o professor', value: '' },
    ...(professoresData?.data?.map(professor => ({
      label: `${professor.Nome} - ${professor.Departamento}`,
      value: professor.ProfessorID
    })) || [])
  ];

  const cursoOptions = [
    { label: 'Selecione o curso', value: '' },
    ...(cursosData?.data?.map(curso => ({
      label: curso.Nome,
      value: curso.CursoID
    })) || [])
  ];

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header
        title="Registrar efetividade"
        subtitle="Registre os dados de efetividade do professor"
      />
      <Dialog.Content>
        <Dialog.Input
          required={true}
          type="date"
          value={formData.data}
          onChange={(value) => setFormData(prev => ({ ...prev, data: value }))}
          error={errors.data}
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

        <Dialog.Select
          required={true}
          options={cursoOptions}
          value={formData.cursoId || '' || 0}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            cursoId: Number(value) 
          }))}
          error={errors.cursoId}
          disabled={loadingCursos}
        />

        <Dialog.Input
          required={true}
          type="number"
          placeholder="Digite as horas trabalhadas"
          value={formData.horasTrabalhadas}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            horasTrabalhadas: Number(value) 
          }))}
          error={errors.horasTrabalhadas}
          min={0}
          max={24}
          step={0.5}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button 
          onClick={handleSubmit} 
          disabled={createEfetividade.isPending || loadingProfessores || loadingCursos}
        >
          {createEfetividade.isPending ? 'Registrando...' : 'Registrar'}
        </Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}
