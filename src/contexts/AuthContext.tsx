import { createContext, useState, ReactNode, useEffect } from 'react';
import { LoginFormData, User, AuthContextData } from '../types/auth';
import { SplashScreen } from '../components/SplashScreen';
import { api } from '../lib/api';
import { toast } from 'react-toastify';
import { logger } from '../utils/logger';

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Interface para validação do usuário logado
interface ValidateUserResponse {
  data: {
    id: number;
    nome: string;
    email: string;
    tipo?: string;
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    validateStoredToken();
  }, []);

  // Função para validar token armazenado
  async function validateStoredToken() {
    try {
      const token = localStorage.getItem('@swcs:token');
      const refreshToken = localStorage.getItem('@swcs:refreshToken');

      if (!token || !refreshToken) {
        setLoading(false);
        return;
      }

      // Tentar fazer uma requisição autenticada para validar o token
      // Usando qualquer endpoint protegido - vou usar /usuarios para pegar dados do usuário atual
      const response = await api.get<ValidateUserResponse>('/auth/me');

      if (response.data?.data) {
        const userData = response.data.data;
        setUser({
          id: userData.id.toString(),
          nome: userData.nome,
          email: userData.email,
          tipo: userData.tipo as 'FUNCIONARIO' | 'PROFESSOR',
        });
      }
    } catch (error: any) {
      // Se a validação falhar, limpar tokens
      if (error.response?.status === 401) {
        console.log('Token inválido ou expirado, limpando credenciais...');
        localStorage.removeItem('@swcs:token');
        localStorage.removeItem('@swcs:refreshToken');
      } else {
        console.warn('Erro ao validar token:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function signIn(data: LoginFormData): Promise<void> {
    try {
      logger.debug('Tentando fazer login...', { email: data.email });

      const response = await api.post<AuthResponse>('/auth/login', {
        email: data.email,
        senha: data.password,
      });

      const { accessToken, refreshToken, user: userData } = response.data;

      // Salvar tokens no localStorage
      localStorage.setItem('@swcs:token', accessToken);
      localStorage.setItem('@swcs:refreshToken', refreshToken);

      // Atualizar estado do usuário
      setUser(userData);
      setError(null)
    } catch (error: any) {
      logger.error('Erro no login:', error);

      let errorMessage = 'Erro na autenticação';

      // Verificar tipo de erro
      if (error.name === 'NetworkError') {
        errorMessage =
          'Erro de conexão: Verifique se o servidor está funcionando.';
      } else if (error.response?.data?.mensagem) {
        errorMessage = error.response.data.mensagem;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      setError(errorMessage)
      throw new Error(error)
    }
  }

  async function signOut() {
    // Fazer logout no backend
    await api.post('/auth/logout')

    // Limpar tokens do localStorage
    localStorage.removeItem('@swcs:token');
    localStorage.removeItem('@swcs:refreshToken');

    // Limpar estado do usuário
    setUser(null);
    toast.info('Você foi desconectado.');
    // navigate("/login", {replace: true});
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
