export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  if (!email?.trim()) return "E-mail é obrigatório";
  if (!emailRegex.test(email.trim())) return "E-mail inválido";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password?.trim()) return "Senha é obrigatória";
  if (password.length < 6) return "A senha deve ter no mínimo 6 caracteres";
  if (password.length > 100) return "A senha é muito longa (máximo 100 caracteres)";
  
  // Validações mais flexíveis alinhadas com o backend
  if (!/(?=.*[A-Za-z])/.test(password)) {
    return "A senha deve conter pelo menos uma letra";
  }
  if (!/(?=.*[0-9])/.test(password)) {
    return "A senha deve conter pelo menos um número";
  }
  
  return undefined;
}

export function validateRole(role: string): string | undefined {
  if (!role?.trim()) return "Cargo é obrigatório";
  const validRoles = ["FUNCIONARIO", "PROFESSOR"];
  if (!validRoles.includes(role.trim().toUpperCase())) {
    return "Cargo deve ser Funcionário ou Professor";
  }
  return undefined;
}

export function validateName(name: string): string | undefined {
  if (!name?.trim()) return "Nome é obrigatório";
  if (name.trim().length < 3) return "Nome deve ter no mínimo 3 caracteres";
  if (name.trim().length > 100) return "Nome é muito longo (máximo 100 caracteres)";
  return undefined;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | undefined {
  if (!confirmPassword?.trim()) return "Confirmação de senha é obrigatória";
  if (password !== confirmPassword) return "As senhas não coincidem";
  return undefined;
}

// Novas validações específicas do sistema
export function validateCargaHoraria(cargaHoraria: number | string): string | undefined {
  const valor = typeof cargaHoraria === 'string' ? parseInt(cargaHoraria) : cargaHoraria;
  
  if (isNaN(valor)) return "Carga horária deve ser um número";
  if (valor < 1) return "Carga horária deve ser maior que 0";
  if (valor > 40) return "Carga horária não pode exceder 40 horas";
  
  return undefined;
}

export function validateDepartamento(departamento: string): string | undefined {
  if (!departamento?.trim()) return "Departamento é obrigatório";
  const validDepartments = ["INFORMATICA", "OUTROS"];
  if (!validDepartments.includes(departamento.trim().toUpperCase())) {
    return "Departamento deve ser Informática ou Outros";
  }
  return undefined;
}

export function validateCargo(cargo: string): string | undefined {
  if (!cargo?.trim()) return "Cargo é obrigatório";
  const validCargos = ["SUMARISTA", "SECRETARIO", "ADMINISTRATIVO", "OUTROS"];
  if (!validCargos.includes(cargo.trim().toUpperCase())) {
    return "Cargo inválido";
  }
  return undefined;
}

export function validateCursoNome(nome: string): string | undefined {
  if (!nome?.trim()) return "Nome do curso é obrigatório";
  if (nome.trim().length < 3) return "Nome do curso deve ter no mínimo 3 caracteres";
  if (nome.trim().length > 100) return "Nome do curso é muito longo";
  return undefined;
}

export function validateCursoDescricao(descricao: string): string | undefined {
  if (!descricao?.trim()) return "Descrição é obrigatória";
  if (descricao.trim().length < 10) return "Descrição deve ter no mínimo 10 caracteres";
  if (descricao.trim().length > 500) return "Descrição é muito longa";
  return undefined;
}

export function validateSumarioConteudo(conteudo: string): string | undefined {
  if (!conteudo?.trim()) return "Conteúdo do sumário é obrigatório";
  if (conteudo.trim().length < 10) return "Conteúdo deve ter no mínimo 10 caracteres";
  return undefined;
}

export function validateDate(date: string): string | undefined {
  if (!date?.trim()) return "Data é obrigatória";
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "Data inválida";
  
  return undefined;
}

export function validateHorasTrabalhadas(horas: number | string): string | undefined {
  const valor = typeof horas === 'string' ? parseFloat(horas) : horas;
  
  if (isNaN(valor)) return "Horas trabalhadas deve ser um número";
  if (valor < 0) return "Horas trabalhadas não pode ser negativo";
  if (valor > 24) return "Horas trabalhadas não pode exceder 24 horas por dia";
  
  return undefined;
}