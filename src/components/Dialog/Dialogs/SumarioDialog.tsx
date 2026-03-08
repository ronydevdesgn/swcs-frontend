import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuthentication';
import { useCursos } from '../../../hooks/useCursos';
import { useProfessores } from '../../../hooks/useProfessores';
import { useCreateSumario } from '../../../hooks/useSumarios';
import { SumarioForm } from '../../../types/entities';
import { validateDate, validateSumarioConteudo } from '../../../utils/validations';
import { Dialog } from '../Dialog';

interface FormErrors {
  data?: string;
  cursoId?: string;
  conteudo?: string;
}

export function SumarioDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: SumarioForm) => void;
}) {
  const createSumario = useCreateSumario();
  const { data: cursosData, isLoading: loadingCursos } = useCursos();
  const { data: professorsData } = useProfessores();

  const { user } = useAuth();

  const [formData, setFormData] = useState<SumarioForm>({
    data: new Date().toISOString().split('T')[0], // Data atual
    conteudo: '',
    cursoId: 0,
    professorId: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Preencher professor automaticamente quando o usuário for carregado
  useEffect(() => {
    if (user && user.tipo === 'PROFESSOR') {
      setFormData(prev => ({ 
        ...prev, 
        professorId: Number(user.professor?.professorId) 
      }));
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const dataError = validateDate(formData.data);
    const conteudoError = validateSumarioConteudo(formData.conteudo);

    if (dataError) newErrors.data = dataError;
    if (conteudoError) newErrors.conteudo = conteudoError;
    if (!formData.cursoId) newErrors.cursoId = 'Curso é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const cursosDataFilters = useMemo(()=> {
    if (!cursosData?.data) return [];
    
    let cursos = cursosData.data;

    if((user && user.tipo === 'PROFESSOR') || formData.professorId > 0){
      const profId = user?.professor?.professorId || formData.professorId;
      cursos = cursos.filter((curso)=> 
        curso.professores?.some((professor)=> professor.professorId === profId)
      );
    }
    
    return cursos.map((curso)=> ({
      label: curso.nome,
      value: curso.cursoId
    })) || []
  }, [formData.professorId, cursosData, user])

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      await createSumario.mutateAsync({
        data: new Date(formData.data).toISOString(),
        conteudo: formData.conteudo,
        cursoId: formData.cursoId,
        professorId: formData.professorId,
      });

      toast.success('Sumário criado com sucesso!');
      onSubmit?.(formData);
      handleCancel();
    } catch (error) {
      console.error('Erro ao criar sumário:', error);
      toast.error('Erro ao criar sumário. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setFormData({
      data: new Date().toISOString().split('T')[0],
      conteudo: '',
      cursoId: 0,
      professorId: (user && user.tipo === 'PROFESSOR' ? Number(user.professor?.professorId) : 0),
    });
    setErrors({});
    onClose();
  };

  const professorDataOptions = useMemo(() => {
    if (!professorsData?.data) return [];
    
    let professors = professorsData.data;

    if(user && user.tipo === 'PROFESSOR' && user.professor){
      professors = professors.filter((p)=> p.professorId === user.professor?.professorId);
    }

    return professors.map(p => ({
      label: p.nome,
      value: p.professorId
    }));
  }, [professorsData, user]);

  // Preparar opções dos cursos
  const cursoOptions = [
    { label: 'Selecione o curso', value: '' },
    ...cursosDataFilters
  ];

   const professorOptions = [
    { label: 'Selecione o professor', value: '' },
    ...professorDataOptions
  ];

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header
        title="Gerar sumário"
        subtitle="Configure os parâmetros do sumário"
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
          muted={!!user?.professor?.professorId}
          required={true}
          options={professorOptions}
          value={formData.professorId}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            professorId: Number(value) 
          }))}
          disabled={!!user?.professor?.professorId}
        />

        <Dialog.Select
          required={true}
          options={cursoOptions}
          value={formData.cursoId}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            cursoId: Number(value) 
          }))}
          error={errors.cursoId}
          disabled={loadingCursos}
        />

        <Dialog.Input
          required={true}
          placeholder="Digite o conteúdo do sumário"
          value={formData.conteudo}
          onChange={(value) => setFormData(prev => ({ ...prev, conteudo: value }))}
          error={errors.conteudo}
          multiline={true}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button 
          onClick={handleSubmit} 
          disabled={createSumario.isPending || loadingCursos}
        >
          {createSumario.isPending ? 'Gerando...' : 'Gerar Sumário'}
        </Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}