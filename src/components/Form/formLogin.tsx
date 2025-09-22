import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuthentication';
import type { LoginFormData, LoginFormErrors } from '../../types/auth';
import { validateEmail, validatePassword } from '../../utils/validations';
import Logoswcs from '../../../public/logoswcs.svg';
import './form.css';

export function FormLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    // Usar validações do utils
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário antes de continuar.');
      return;
    }

    setIsLoading(true);
    
    try {
      await signIn(formData);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro ao fazer login. Verifique suas credenciais.';
      
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

      // Limpa o erro do campo quando o usuário começa a digitar
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  return (
    <div className="group-form" role="main">
      <img src={Logoswcs} alt="logotipo do sistema" />

      <form onSubmit={handleSubmit} noValidate>
        <div className="group-title" role="heading" aria-level={1}>
          <h1>Acesse o sistema</h1>
          <p>Preencha os campos abaixos se tiver uma conta</p>
        </div>

        {errors.submit && (
          <div className="error-message global-error" role="alert">
            {errors.submit}
          </div>
        )}

        <div className="group-input">
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
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                aria-label="senha"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
                value={formData.password}
                onChange={handleInputChange('password')}
                placeholder="Preencha a sua senha"
                autoComplete="current-password"
              />
              {errors.password && (
                <span
                  className="error-message"
                  role="alert"
                  id="password-error"
                >
                  {errors.password}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="group-button">
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Entrando...' : 'Entrar agora'}
          </button>
          <div className="group-button-other">
            <a
              href="/signup"
              className="access"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
            >
              Cadastre-se
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
