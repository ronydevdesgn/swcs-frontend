// Efetividade
// Observação: o ID é gerado pelo backend; a entidade registra a data, horas trabalhadas
// e referências (chaves estrangeiras) para professor e, opcionalmente, curso.
export interface EfetividadeForm {
  data: string;
  horasTrabalhadas: number;
  professorId: string;
  cursoId?: string;
}

export interface Efetividade extends EfetividadeForm {
  efetividadeId: string;
}

// Presença: estado que pode ser 'presenca' ou 'falta' e é associado a uma efetividade
export type PresencaStatus = 'presenca' | 'falta';

export interface PresencaForm {
  data: string;
  status: PresencaStatus;
}

export interface Presenca extends PresencaForm {
  presencaId: string;
  efetividadeId: string;
  professorId: string;
  cursoId?: string;
}
export interface SumarioForm {
  data: string;
  curso: string;
  professor: string;
  conteudo: string;
}
export interface Sumario extends SumarioForm {
  sumarioId: string;
}

// O curso vem de uma tabela separada, por isso não é obrigatório
export interface ProfessorForm {
  nome: string;
  departamento: string;
  cargaHoraria: string;
  // cursoId?: string; // Se quiser referenciar o curso por ID
  curso?: string;
}

export interface Professor extends Omit<ProfessorForm, 'cargaHoraria'> {
  professorId: string;
  cargaHoraria: number;
}

export interface CursoForm {
  // codigo: string; Id é gerado automaticamente
  nome: string;
  descricao: string;
}

export interface Curso extends Omit<CursoForm, 'cargaHoraria'> {
  cursosId: string;
}
