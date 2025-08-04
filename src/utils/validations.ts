export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "E-mail é obrigatório";
  if (!emailRegex.test(email)) return "E-mail inválido";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password.trim()) return "Senha é obrigatória";
  if (password.length < 6) return "A senha deve ter no mínimo 6 caracteres";
  if (!/(?=.*[A-Z])/.test(password))
    return "A senha deve conter pelo menos uma letra maiúscula";
  if (!/(?=.*[0-9])/.test(password))
    return "A senha deve conter pelo menos um número";
  return undefined;
}

export function validateRole(role: string): string | undefined {
  if (!role) return "Cargo é obrigatório";
  return undefined;
}

export function validateName(name: string): string | undefined {
  if (!name.trim()) return "Nome é obrigatório";
  if (name.length < 3) return "Nome deve ter no mínimo 3 caracteres";
  return undefined;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | undefined {
  if (password !== confirmPassword) return "As senhas não coincidem";
  return undefined;
}
