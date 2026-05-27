import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateFuncionario } from '../../../hooks/useFuncionarios';
import { FuncionarioForm } from '../../../types/entities';
import {
    validateEmail,
    validateName,
    validatePassword
} from '../../../utils/validations';
import { Dialog } from '../Dialog';

interface FormErrors {
  nome?: string;
  email?: string;
  senha?: string;
  cargo?: string;
}

export function FuncionarioDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: FuncionarioForm) => void;
}) {
  const createFuncionario = useCreateFuncionario();

  const [formData, setFormData] = useState<FuncionarioForm>({
    nome: '',
    email: '',
    senha: '',
    cargo: 'ADMINISTRATIVO',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nomeError = validateName(formData.nome);
    const emailError = validateEmail(formData.email);
    const senhaError = validatePassword(formData.senha || '');
    
    if (nomeError) newErrors.nome = nomeError;
    if (emailError) newErrors.email = emailError;
    if (senhaError) newErrors.senha = senhaError;
    if (!formData.cargo) newErrors.cargo = "Cargo é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      await createFuncionario.mutateAsync(formData);

      toast.success('Funcionário cadastrado com sucesso!');
      onSubmit?.(formData);
      handleCancel();
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      toast.error('Erro ao cadastrar funcionário. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
      cargo: 'ADMINISTRATIVO',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Header 
        title="Cadastrar Funcionário" 
        subtitle="Preencha os dados do novo funcionário" 
      />
      <Dialog.Content>
        <Dialog.Input
          required={true}
          placeholder="Digite o nome completo do funcionário"
          value={formData.nome}
          onChange={(value) => setFormData(prev => ({ ...prev, nome: value }))}
          error={errors.nome}
        />
        
        <Dialog.Input
          required={true}
          type="email"
          placeholder="Digite o email do funcionário"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          error={errors.email}
        />

        <Dialog.Input
          required={true}
          type="password"
          placeholder="Digite a senha de acesso"
          value={formData.senha || ''}
          onChange={(value) => setFormData(prev => ({ ...prev, senha: value }))}
          error={errors.senha}
        />

        <Dialog.Select
          required={true}
          options={[
            { label: 'Selecione o cargo', value: '' },
            { label: 'Administrativo', value: 'ADMINISTRATIVO' },
            { label: 'Secretário(a)', value: 'SECRETARIO' },
            { label: 'Sumarista', value: 'SUMARISTA' },
            { label: 'Outros', value: 'OUTROS' },
          ]}
          value={formData.cargo}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            cargo: value 
          }))}
          error={errors.cargo}
        />

      </Dialog.Content>
      <Dialog.Actions>
        <Dialog.Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Dialog.Button>
        <Dialog.Button 
          onClick={handleSubmit} 
          disabled={createFuncionario.isPending}
        >
          {createFuncionario.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </Dialog.Button>
      </Dialog.Actions>
    </Dialog.Root>
  );
}
