import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { api } from '../lib/api';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { AuthContextData, UserRole } from '../types/auth';

// Tipos específicos para este hook
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
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Hook para recuperação de senha
export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await api.post<{ mensagem: string }>(
        '/auth/forgot-password',
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Email de recuperação enviado com sucesso!');
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.mensagem ||
          'Erro ao solicitar recuperação de senha',
      );
    },
  });
}

// Hook para alteração de senha
export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      const response = await api.post<{ mensagem: string }>(
        '/auth/reset-password',
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!');
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.mensagem || 'Erro ao alterar senha');
    },
  });
}

// Hook para criação de usuário (registro)
export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: {
      nome: string;
      email: string;
      senha: string;
      tipo: UserRole;
    }) => {
      const response = await api.post('/auth/register', {
        Nome: data.nome, // Backend espera PascalCase
        Email: data.email,
        Senha: data.senha,
        Tipo: data.tipo,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Conta criada com sucesso! Você já pode fazer login.');
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.mensagem ||
          'Erro ao criar conta. Tente novamente.',
      );
    },
  });
}

// Hook para logout (simplificado)
export function useLogout() {
  const { signOut } = useAuth();
  return signOut;
}
