// Interfaces alinhadas com backend (camelCase)

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'FUNCIONARIO' | 'PROFESSOR';
  professor?: Professor | null;
  permissoes?: string[];
}

export interface CursoForm {
  nome: string;
  descricao: string;
  professorId: number;
}

export interface Curso {
  cursoId: number;
  nome: string;
  descricao: string;
  professores: Professor[];
  _count?: {
    sumarios: number;
  };
}

export interface ProfessorForm {
  nome: string;
  email: string;
  senha: string;
  departamento: 'INFORMATICA' | 'OUTROS';
  cargaHoraria: number;
}

export interface Professor {
  professorId: number;
  nome: string;
  departamento: 'INFORMATICA' | 'OUTROS';
  cargaHoraria: number;
  email?: string;
  cursos?: Curso[];
}

export interface FuncionarioForm {
  nome: string;
  email: string;
  cargo: string;
  senha?: string;
}

export interface Funcionario {
  funcionarioId: number;
  nome: string;
  email: string;
  cargo: string;
  usuarioId: number;
  usuario?: {
    email: string;
    tipo: string;
    permissoes: Array<{
      permissao: {
        permissaoId: number;
        descricao: string;
      };
    }>;
  };
}

export interface SumarioForm {
  data: string;
  conteudo: string;
  cursoId: number;
  professorId: number;
}

export interface Sumario {
  sumarioId: number;
  data: string;
  conteudo: string;
  curso: {
    cursoId: number;
    nome: string;
    descricao?: string;
  };
  professor: {
    professorId: number;
    nome: string;
    departamento?: string;
  };
}

export interface EfetividadeForm {
  data: string;
  horasTrabalhadas: number;
  professorId: number;
  cursoId?: number;
}

export interface Efetividade {
  efetividadeId: number;
  data: string;
  horasTrabalhadas: number;
  professor: {
    professorId: number;
    nome: string;
    departamento?: string;
    cargaHoraria?: number;
  };
  curso?: {
    cursoId: number;
    nome: string;
  };
}

export interface PresencaForm {
  data: string;
  estado: 'PRESENTE' | 'FALTA';
  professorId: number;
  cursoId?: number;
}

export interface Presenca {
  presencaId: number;
  data: string;
  estado: 'PRESENTE' | 'FALTA';
  professor: {
    professorId: number;
    nome: string;
    departamento?: string;
  };
  curso?: {
    cursoId: number;
    nome: string;
  };
}

// Interfaces para listagens e selects
export interface SelectOption {
  label: string;
  value: string | number;
}

export interface ProfessorOption {
  professorId: number;
  nome: string;
}

export interface CursoOption {
  cursoId: number;
  nome: string;
}

// Common API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
    lastPage?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
    porEstado?: Record<string, number>;
    porCargo?: Record<string, number>;
  };
}