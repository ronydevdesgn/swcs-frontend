import { createContext, useState, ReactNode, useEffect } from 'react';
import { LoginFormData, User, AuthContextData } from '../types/auth';
import { SplashScreen } from '../components/SplashScreen';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

// Interface para validação do usuário logado
interface ValidateUserResponse {
  data: {
    id: number;
    nome: string;
    email: string;
    tipo: string;
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateStoredToken();
  }, []);

  // Função para validar token armazenado
  async function validateStoredToken() {
    try {
      const token = localStorage.getItem("@swcs:token");
      const refreshToken = localStorage.getItem("@swcs:refreshToken");

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
          tipo: userData.tipo as "FUNCIONARIO" | "PROFESSOR"
        });
      }
    } catch (error: any) {
      // Se a validação falhar, limpar tokens
      if (error.response?.status === 401) {
        console.log('Token inválido ou expirado, limpando credenciais...');
        localStorage.removeItem("@swcs:token");
        localStorage.removeItem("@swcs:refreshToken");
      } else {
        console.warn('Erro ao validar token:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function signIn(data: LoginFormData): Promise<void> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        email: data.email,
        senha: data.password,
        // tipo: "FUNCIONARIO" // Ou detectar dinamicamente
      });

      const { token, refreshToken, user: userData } = response.data;

      // Salvar tokens no localStorage
      localStorage.setItem("@swcs:token", token);
      localStorage.setItem("@swcs:refreshToken", refreshToken);

      // Atualizar estado do usuário
      setUser(userData);

      toast.success("Login realizado com sucesso!");

    } catch (error: any) {
      const errorMessage = error.response?.data?.mensagem || 
                          error.message || 
                          'Erro na autenticação';
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  function signOut(): void {
    // Fazer logout no backend
    api.post('/auth/logout').catch(() => {
      // Ignorar erros de logout no backend
    });

    // Limpar tokens do localStorage
    localStorage.removeItem("@swcs:token");
    localStorage.removeItem("@swcs:refreshToken");
    
    // Limpar estado do usuário
    setUser(null);
    
    toast.info('Você foi desconectado.');
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
