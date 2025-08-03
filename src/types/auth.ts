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

export interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
}
