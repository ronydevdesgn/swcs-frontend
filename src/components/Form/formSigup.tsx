import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateUser } from "../../hooks/useAuthentication";
import type { UserRole } from "../../types/auth";
import Logoswcs from "../../../public/logoswcs.svg";
import "./formLogin.css";
import "./formSignup.css";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  submit?: string;
}

export function FormSignup() {
  const createUser = useCreateUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole,
  });
  const [errors, setErrors] = useState<SignupErrors>({});

  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.length < 3) {
      newErrors.name = "Nome deve ter no mínimo 3 caracteres";
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    // Validação da senha
    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "A senha deve conter pelo menos uma letra maiúscula";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "A senha deve conter pelo menos um número";
    }

    // Validação da confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    // Validação do cargo
    if (!formData.role) {
      newErrors.role = "Cargo é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(
        "Por favor, corrija os erros no formulário antes de continuar."
      );
      return;
    }

    try {
      await createUser.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success(
        "Conta criada com sucesso! Você será redirecionado para o login."
      );

      // Redireciona após 2 segundos para dar tempo de ler a mensagem de sucesso
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao criar conta. Verifique os dados e tente novamente.";

      setErrors((prev: SignupErrors) => ({
        ...prev,
        submit: errorMessage,
      }));

      toast.error(errorMessage);
    }
  };
  const handleInputChange =
    (field: keyof SignupForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Limpa o erro do campo quando o usuário começa a digitar
      if (errors[field as keyof SignupErrors]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as keyof SignupErrors];
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
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                name="name"
                aria-label="Nome"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                value={formData.name}
                onChange={handleInputChange("name")}
                placeholder="Preencha o seu nome"
                autoComplete="name"
              />
              {errors.name && (
                <span className="error-message" role="alert" id="name-error">
                  {errors.name}
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
                aria-describedby={errors.email ? "email-error" : undefined}
                value={formData.email}
                onChange={handleInputChange("email")}
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
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                name="email"
                aria-label="E-mail"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                value={formData.email}
                onChange={handleInputChange("email")}
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
                aria-label="Senha"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby="password-requirements password-error"
                value={formData.password}
                onChange={handleInputChange("password")}
                placeholder="Preencha a sua senha"
                autoComplete="new-password"
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
              <div className="password-requirements" id="password-requirements">
                <p>A senha deve conter:</p>
                <ul>
                  <li>Mínimo de 6 caracteres</li>
                  <li>Pelo menos uma letra maiúscula</li>
                  <li>Pelo menos um número</li>
                </ul>
              </div>
            </label>
          </div>

          <div className="input-field">
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                aria-label="Senha"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                value={formData.password}
                onChange={handleInputChange("password")}
                placeholder="Confirme a senha acima preenchida"
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

          <div className="input-field">
            <select
              id="role"
              name="role"
              aria-label="Selecione seu cargo"
              aria-required="true"
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? "role-error" : undefined}
              value={formData.role}
              onChange={handleInputChange("role")}
            >
              <option value="">Selecione o seu cargo</option>
              <option value="sumarista">Sumarista</option>
              <option value="professor">Professor</option>
            </select>
            {errors.role && (
              <span className="error-message" role="alert" id="role-error">
                {errors.role}
              </span>
            )}
          </div>
        </div>

        <div className="group-button">
          <button
            type="submit"
            disabled={createUser.isPending}
            aria-busy={createUser.isPending}
            className={createUser.isPending ? "loading" : ""}
          >
            {createUser.isPending ? "Criando conta..." : "Criar conta"}
          </button>
          <div className="group-button-other">
            <a
              href="/"
              className="access"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
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
