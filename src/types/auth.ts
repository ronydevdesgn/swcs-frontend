export type UserRole = "FUNCIONARIO" | "PROFESSOR";

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: UserRole;
  permissoes?: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  tipo?: string;
  submit?: string;
}

export interface SignupFormData {
  nome: string;
  email: string;
  senha: string;
  confirmPassword: string;
  tipo: UserRole;
}

export interface SignupFormErrors {
  nome?: string;
  email?: string;
  senha?: string;
  confirmPassword?: string;
  tipo?: string;
  submit?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordFormErrors {
  email?: string;
  submit?: string;
}

// Interface principal do contexto de autenticação
export interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
  error: string | null;
  loading: boolean;
}