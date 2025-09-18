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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token salvo e tentar recuperar dados do usuário
    const token = localStorage.getItem("@swcs:token");
    if (token) {
      // TODO: Implementar verificação de token válido com o backend
      // Por agora, apenas define loading como false
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  async function signIn(data: LoginFormData): Promise<void> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        email: data.email,
        senha: data.password,
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
