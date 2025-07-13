import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type {
  LoginFormData,
  LoginFormErrors,
  UserRole,
} from "../../types/auth";
import Logoswcs from "../../../public/logoswcs.svg";
import "./formLogin.css";

export function FormLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
    password: "",
    role: "" as UserRole,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
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
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await signIn(formData);
      navigate("/dashboard");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "Erro ao fazer login. Verifique suas credenciais.",
      }));
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
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              aria-label="Nome de usuário"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Digite seu nome"
              autoComplete="name"
            />
            {errors.name && (
              <span className="error-message" role="alert" id="name-error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="email">E-mail</label>
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
              placeholder="Digite seu e-mail"
              autoComplete="email"
            />
            {errors.email && (
              <span className="error-message" role="alert" id="email-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              aria-label="Senha"
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              value={formData.password}
              onChange={handleInputChange("password")}
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="error-message" role="alert" id="password-error">
                {errors.password}
              </span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="role">Cargo</label>
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
            disabled={isLoading}
            aria-busy={isLoading}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "Entrando..." : "Entrar agora"}
          </button>
          <a
            href="/recuperar-senha"
            className="forgot-password"
            onClick={(e) => {
              e.preventDefault();
              navigate("/recuperar-senha");
            }}
          >
            Esqueceu a senha?
          </a>
        </div>
      </form>
    </div>
  );
}
