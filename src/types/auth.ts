// Assuming role is a string that can be 'sumarista' or 'professor'
// Adjust the type if you have a specific enum or union type for roles
export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserRole = "sumarista" | "professor";

export interface LoginFormData extends User {}

export interface LoginFormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  submit?: string;
}
