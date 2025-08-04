import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "../../hooks/useAuthentication";
import type {
  LoginFormData,
  LoginFormErrors,
  UserRole,
} from "../../types/auth";
import Logoswcs from "../../../public/logoswcs.svg";
import "./formLogin.css";

export function FormLogin() {
  const login = useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    role: "" as UserRole,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!formData.password.trim()) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres";
    }
    if (!formData.role) newErrors.role = "Cargo é obrigatório";

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
      await login.mutateAsync(formData);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao fazer login. Verifique suas credenciais.";
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
      toast.error(errorMessage);
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
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                value={formData.password}
                onChange={handleInputChange("password")}
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
            disabled={login.isPending}
            aria-busy={login.isPending}
            className={login.isPending ? "loading" : ""}
          >
            {login.isPending ? "Entrando..." : "Entrar agora"}
          </button>
          <div className="group-button-other">
            <a
              href="/forgotpassword"
              className="forgot-password"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgotpassword");
              }}
            >
              Esqueci minha senha!
            </a>
            <a
              href="/signup"
              className="access"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Cadastra-se
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
