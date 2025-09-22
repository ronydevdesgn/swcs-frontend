// Interfaces alinhadas com backend
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

export interface SumarioForm {
  data: string;
  conteudo: string;
  cursoId: number;
  professorId: number;
}

export interface Sumario {
  SumarioID: number;
  Data: string;
  Conteudo: string;
  Curso: {
    CursoID: number;
    Nome: string;
    Descricao?: string;
  };
  Professor: {
    ProfessorID: number;
    Nome: string;
    Departamento?: string;
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
  cursoId: number;
}

export interface Presenca {
  presencaId: number;
  data: string;
  estado: 'PRESENTE' | 'FALTA';
  professor: {
    professorId: number;
    nome: string;
  };
  curso: {
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