export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'sumarista' | 'professor';

export interface LoginFormData extends User {}

export interface LoginFormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  submit?: string;
}
