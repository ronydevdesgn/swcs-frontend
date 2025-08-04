import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { api } from "../lib/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { AuthContextData, LoginFormData, User, UserRole } from "../types/auth";

// Tipos
interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

interface ResetPasswordData {
  email: string;
}

interface ChangePasswordData {
  token: string;
  novaSenha: string;
  confirmarSenha: string;
}

interface ApiError {
  response?: {
    data?: {
      mensagem?: string;
    };
  };
}

// Hook principal de autenticação que fornece acesso ao contexto
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// Hooks específicos para operações de autenticação
export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await api.post<AuthResponse>("/auth/login", {
        email: credentials.email,
        senha: credentials.password,
        tipo: credentials.role.toUpperCase(),
      });
      return response.data;
    },
    onSuccess: async (data) => {
      // Salvar tokens
      localStorage.setItem("@swcs:token", data.token);
      localStorage.setItem("@swcs:refreshToken", data.refreshToken);

      // Atualizar contexto via signIn
      await signIn({
        email: data.user.email,
        password: "", // Não precisamos da senha aqui
        role: data.user.role,
      });

      toast.success("Login realizado com sucesso!");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.mensagem || "Erro ao fazer login");
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await api.post<{ mensagem: string }>(
        "/auth/reset-password",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email de recuperação enviado com sucesso!");
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.mensagem ||
          "Erro ao solicitar recuperação de senha"
      );
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      const response = await api.post<{ mensagem: string }>(
        "/auth/change-password",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.mensagem || "Erro ao alterar senha");
    },
  });
}

// Hook para criação de usuário
export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
    }) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Conta criada com sucesso! Você já pode fazer login.");
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.mensagem ||
          "Erro ao criar conta. Tente novamente."
      );
    },
  });
}

// Função auxiliar para logout
export function useLogout() {
  const { signOut } = useAuth();

  return () => {
    localStorage.removeItem("@swcs:token");
    localStorage.removeItem("@swcs:refreshToken");
    signOut();
    toast.success("Logout realizado com sucesso!");
  };
}
