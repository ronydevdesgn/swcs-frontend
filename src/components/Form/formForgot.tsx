import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPassword } from "../../hooks/useAuthentication";
import Logoswcs from "../../../public/logoswcs.svg";
import { ForgotPasswordErrors, ForgotPasswordForm, UserRole } from "../../types/auth";
import "./formLogin.css";
import "./formForgot.css";

export function FormForgot() {
  const resetPassword = useResetPassword();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: "",
    tipo: "" as UserRole,
  });
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ForgotPasswordErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!formData.tipo) {
      newErrors.tipo = "Cargo é obrigatório";
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
      await resetPassword.mutateAsync({ email: formData.email });
      setSuccess(true);
      toast.success("E-mail de recuperação enviado com sucesso!");

      // Redireciona após 3 segundos
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao enviar e-mail de recuperação. Tente novamente.";
      setErrors((prev: ForgotPasswordErrors) => ({
        ...prev,
        submit: errorMessage,
      }));
      toast.error(errorMessage);
    }
  };

  const handleInputChange =
    (field: keyof ForgotPasswordForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Limpa o erro do campo quando o usuário começa a digitar
      if (errors[field as keyof ForgotPasswordErrors]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as keyof ForgotPasswordErrors];
          return newErrors;
        });
      }
    };

  return (
    <div className="group-form" role="main">
      <img src={Logoswcs} alt="logotipo do sistema" />

      <form onSubmit={handleSubmit} noValidate>
        <div className="group-title" role="heading" aria-level={1}>
          <h1>Recuperar o acesso</h1>
          <p>Preencha os campos abaixos se esqueceu sua senha</p>
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
            <select
              id="role"
              name="role"
              aria-label="Selecione seu cargo"
              aria-required="true"
              aria-invalid={!!errors.tipo}
              aria-describedby={errors.tipo ? "role-error" : undefined}
              value={formData.tipo}
              onChange={handleInputChange("tipo")}
            >
              <option value="">Selecione o seu cargo</option>
              <option value="sumarista">Sumarista</option>
              <option value="professor">Professor</option>
            </select>
            {errors.tipo && (
              <span className="error-message" role="alert" id="role-error">
                {errors.tipo}
              </span>
            )}
          </div>
        </div>

        <div className="group-button">
          {success ? (
            <div className="success-message" role="alert">
              <p>E-mail de recuperação enviado com sucesso!</p>
              <p>
                Você será redirecionado para a página de login em instantes...
              </p>
            </div>
          ) : (
            <>
              <button
                type="submit"
                disabled={resetPassword.isPending}
                aria-busy={resetPassword.isPending}
                className={resetPassword.isPending ? "loading" : ""}
              >
                {resetPassword.isPending
                  ? "Enviando..."
                  : "Enviar e-mail de recuperação"}
              </button>
              <div className="group-button-other">
                <a
                  href="/"
                  className="login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Voltar para o login
                </a>
                <a
                  href="/signup"
                  className="access"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                >
                  Cadrastrar-se
                </a>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
