import { createContext, useState, ReactNode, useEffect } from 'react';
import { LoginFormData, User } from '../types/auth';
import { SplashScreen } from '../components/SplashScreen';
import { toast } from 'react-toastify';

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const API_BASE_URL = "http://localhost:3333";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would check for a stored token here
    // and validate it with the backend to re-authenticate the user.
    // For now, we'll just simulate a quick check.
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

  async function signIn(data: LoginFormData) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Erro na autenticação');
        throw new Error(errorData.message || 'Erro na autenticação');
      }

      const userData = await response.json();
      // Assuming your backend returns user data upon successful login
      setUser(userData.user);
      toast.success('Login realizado com sucesso!');

    } catch (error) {
      console.error("Authentication error:", error);
      if (error instanceof TypeError) {
        toast.error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
      } else {
        toast.error(error.message || 'Ocorreu um erro inesperado.');
      }
      throw error;
    }
  }

  function signOut() {
    setUser(null);
    // In a real application, you would also clear any stored tokens here
    toast.info('Você foi desconectado.');
  }

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

