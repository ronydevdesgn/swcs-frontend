export type UserRole = "sumarista" | "professor";

export interface User {
  id?: string;
  name: string;
  email: string;
  tipo: UserRole;
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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  tipo: UserRole;
}

export interface SignupFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  tipo?: string;
  submit?: string;
}

export interface ForgotPasswordFormData {
  email: string;
  tipo: UserRole;
}

export interface ForgotPasswordFormErrors {
  email?: string;
  tipo?: string;
  submit?: string;
}

export interface ForgotPasswordForm {
  email: string;
  tipo: UserRole;
}

export interface ForgotPasswordErrors {
  email?: string;
  tipo?: string;
  submit?: string;
}

export interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
}
