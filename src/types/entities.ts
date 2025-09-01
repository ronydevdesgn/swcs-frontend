export interface SumarioForm {
  data: string;
  curso: string;
  professor: string;
  conteudo: string;
}

export interface Sumario extends SumarioForm {
  sumarioId: string;
}

export interface ProfessorForm {
  nome: string;
  departamento: string;
  cargaHoraria: string;
}

export interface Professor extends Omit<ProfessorForm, 'cargaHoraria'> {
  professorId: string;
  cargaHoraria: number;
}

export interface CursoForm {
  nome: string;
  codigo: string;
  departamento: string;
  cargaHoraria: string;
  nivel: string;
}

export interface Curso extends Omit<CursoForm, 'cargaHoraria'> {
  cursosId: string;
}
