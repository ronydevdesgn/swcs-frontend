import { useState } from 'react';
import { Dialog } from '../Dialog';
import { ProfessorForm } from '../../../types/entities';
import { useCreateProfessor } from '../../../hooks/useProfessores';
import { 
  validateName, 
  validateEmail, 
  validatePassword, 
  validateCargaHoraria, 
  validateDepartamento 
} from '../../../utils/validations';
import { toast } from 'react-toastify';

interface FormErrors {
  nome?: string;
  email?: string;
  senha?: string;
  departamento?: string;
  cargaHoraria?: string;
}

export function ProfessorDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ProfessorForm) => void;
}) {
  const createProfessor = useCreateProfessor();

  const [formData, setFormData] = useState<ProfessorForm>({
    nome: '',
    email: '',
    senha: '',
    departamento: 'INFORMATICA',
    cargaHoraria: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nomeError = validateName(formData.nome);
    const emailError = validateEmail(formData.email);
    const senhaError = validatePassword(formData.senha);
    const departamentoError = validateDepartamento(formData.departamento);
    const cargaError = validateCargaHoraria(formData.cargaHoraria);

    if (nomeError) newErrors.nome = nomeError;
    if (emailError) newErrors.email = emailError;
    if (senhaError) newErrors.senha = senhaError;
    if (departamentoError) newErrors.departamento = departamentoError;
    if (cargaError) newErrors.cargaHoraria = cargaError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      await createProfessor.mutateAsync({
        Nome: formData.nome,
        Email: formData.email,
        Senha: formData.senha,
        Departamento: formData.departamento,
        CargaHoraria: formData.cargaHoraria,
      });

      toast.success('Professor cadastrado com sucesso!');
      onSubmit?.(formData);
      handleCancel();
    } catch (error) {
      console.error('Erro ao cadastrar professor:', error);
      toast.error('Erro ao cadastrar professor. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
      departamento: 'INFORMATICA',
      cargaHoraria: 0,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header 
        title="Cadastrar professor" 
        subtitle="Preencha os dados do novo professor" 
      />
      <Dialog.Content>
        <Dialog.Input
          required={true}
          placeholder="Digite o nome completo do professor"
          value={formData.nome}
          onChange={(value) => setFormData(prev => ({ ...prev, nome: value }))}
          error={errors.nome}
        />
        
        <Dialog.Input
          required={true}
          type="email"
          placeholder="Digite o email do professor"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          error={errors.email}
        />

        <Dialog.Input
          required={true}
          type="password"
          placeholder="Digite a senha de acesso"
          value={formData.senha}
          onChange={(value) => setFormData(prev => ({ ...prev, senha: value }))}
          error={errors.senha}
        />

        <Dialog.Select
          required={true}
          options={[
            { label: 'Selecione o departamento', value: '' },
            { label: 'Informática', value: 'INFORMATICA' },
            { label: 'Outros', value: 'OUTROS' },
          ]}
          value={formData.departamento}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            departamento: value as 'INFORMATICA' | 'OUTROS' 
          }))}
          error={errors.departamento}
        />

        <Dialog.Input
          required={true}
          type="number"
          placeholder="Digite a carga horária semanal"
          value={formData.cargaHoraria}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            cargaHoraria: Number(value) 
          }))}
          error={errors.cargaHoraria}
          min={1}
          max={40}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button 
          onClick={handleSubmit} 
          disabled={createProfessor.isPending}
        >
          {createProfessor.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}