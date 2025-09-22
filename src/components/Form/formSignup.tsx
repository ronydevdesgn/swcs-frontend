import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUser } from '../../hooks/useAuthentication';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validateRole,
} from '../../utils/validations';
import type {
  SignupFormData,
  SignupFormErrors,
  UserRole,
} from '../../types/auth';
import Logoswcs from '../../../public/logoswcs.svg';
import './form.css';

export function FormSignup() {
  const createUser = useCreateUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    nome: '',
    email: '',
    senha: '',
    confirmPassword: '',
    tipo: '' as UserRole,
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    // Usar validações do utils
    const nameError = validateName(formData.nome);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.senha);
    const confirmPasswordError = validateConfirmPassword(formData.senha, formData.confirmPassword);
    const roleError = validateRole(formData.tipo);

    if (nameError) newErrors.nome = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.senha = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    if (roleError) newErrors.tipo = roleError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(
        'Por favor, corrija os erros no formulário antes de continuar.',
      );
      return;
    }

    try {
      await createUser.mutateAsync({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        tipo: formData.tipo,
      });

      toast.success(
        'Conta criada com sucesso! Você será redirecionado para o login.',
      );

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta. Verifique os dados e tente novamente.';

      setErrors((prev: SignupFormErrors) => ({
        ...prev,
        submit: errorMessage,
      }));

      toast.error(errorMessage);
    }
  };

  const handleInputChange =
    (field: keyof SignupFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Limpa o erro do campo quando o usuário começa a digitar
      if (errors[field as keyof SignupFormErrors]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as keyof SignupFormErrors];
          return newErrors;
        });
      }
    };

  return (
    <div className="group-form" role="main">
      <img src={Logoswcs} alt="logotipo do sistema" />

      <form onSubmit={handleSubmit} noValidate>
        <div className="group-title" role="heading" aria-level={1}>
          <h1>Criar conta</h1>
          <p>Preencha os campos abaixo para criar sua conta!</p>
        </div>

        {errors.submit && (
          <div className="error-message global-error" role="alert">
            {errors.submit}
          </div>
        )}

        <div className="group-input">
          <div className="input-field">
            <label htmlFor="nome">
              <input
                type="text"
                id="nome"
                name="nome"
                aria-label="Nome"
                aria-required="true"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? 'nome-error' : undefined}
                value={formData.nome}
                onChange={handleInputChange('nome')}
                placeholder="Preencha o seu nome"
                autoComplete="name"
              />
              {errors.nome && (
                <span className="error-message" role="alert" id="nome-error">
                  {errors.nome}
                </span>
              )}
            </label>
          </div>

          <div className="input-field">
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                name="email"
                aria-label="E-mail"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="Preencha o seu e-mail"
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message" role="alert" id="email-error">
                  {errors.email}
                </span>
              )}
            </label>
          </div>

          <div className="input-field">
            <label htmlFor="senha">
              <input
                type="password"
                id="senha"
                name="senha"
                aria-label="Senha"
                aria-required="true"
                aria-invalid={!!errors.senha}
                aria-describedby={errors.senha ? 'senha-error' : undefined}
                value={formData.senha}
                onChange={handleInputChange('senha')}
                placeholder="Preencha a sua senha"
                autoComplete="new-password"
              />
              {errors.senha && (
                <span className="error-message" role="alert" id="senha-error">
                  {errors.senha}
                </span>
              )}
            </label>
          </div>

          <div className="input-field">
            <label htmlFor="confirmPassword">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                aria-label="Confirmar senha"
                aria-required="true"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? 'confirm-password-error' : undefined
                }
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                placeholder="Confirme a senha acima preenchida"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span
                  className="error-message"
                  role="alert"
                  id="confirm-password-error"
                >
                  {errors.confirmPassword}
                </span>
              )}
            </label>
          </div>

          <div className="input-field">
            <select
              id="tipo"
              name="tipo"
              aria-label="Selecione seu cargo"
              aria-required="true"
              aria-invalid={!!errors.tipo}
              aria-describedby={errors.tipo ? 'tipo-error' : undefined}
              value={formData.tipo}
              onChange={handleInputChange('tipo')}
            >
              <option value="">Selecione o seu cargo</option>
              <option value="FUNCIONARIO">Funcionário</option>
              <option value="PROFESSOR">Professor</option>
            </select>
            {errors.tipo && (
              <span className="error-message" role="alert" id="tipo-error">
                {errors.tipo}
              </span>
            )}
          </div>
        </div>

        <div className="group-button">
          <button
            type="submit"
            disabled={createUser.isPending}
            aria-busy={createUser.isPending}
            className={createUser.isPending ? 'loading' : ''}
          >
            {createUser.isPending ? 'Criando conta...' : 'Criar conta'}
          </button>
          <div className="group-button-other">
            <a
              href="/"
              className="access"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Já tenho uma conta
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}