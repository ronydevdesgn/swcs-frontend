export type UserRole = "sumarista" | "professor";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  role?: string;
  submit?: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface SignupFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  submit?: string;
}

export interface ForgotPasswordFormData {
  email: string;
  role: UserRole;
}

export interface ForgotPasswordFormErrors {
  email?: string;
  role?: string;
  submit?: string;
}

export interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
}
