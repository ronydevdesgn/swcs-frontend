type UserRole = 'sumarista' | 'professor';

interface LoginFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface LoginFormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  submit?: string; // Erro global do formulário
}

export type { UserRole, LoginFormData, LoginFormErrors };