import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface Professor {
  professorId: number;
  nome: string;
  departamento: 'INFORMATICA' | 'OUTROS';
  cargaHoraria: number;
  email?: string;
  cursos?: Curso[];
}

export interface Curso {
  cursoId: number;
  nome: string;
}

export interface CreateProfessorInput {
  Nome: string;
  Email: string;
  Senha: string;
  Departamento: 'INFORMATICA' | 'OUTROS';
  CargaHoraria: number;
}

export function useProfessores(
  options?: PaginationQuery & { departamento?: string }
) {
  return useQuery({
    queryKey: ["professores", options],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Professor>>(
        "/professores",
        {
          params: options,
        }
      );
      return response.data;
    },
  });
}

export function useProfessor(id: number) {
  return useQuery({
    queryKey: ["professores", id],
    queryFn: async () => {
      const response = await api.get<Professor>(`/professores/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateProfessor() {
  return useMutation({
    mutationFn: async (data: CreateProfessorInput) => {
      const response = await api.post<Professor>("/professores", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professores"] });
    },
  });
}

export function useUpdateProfessor() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<CreateProfessorInput, 'Senha'>>;
    }) => {
      const response = await api.put<Professor>(`/professores/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professores"] });
    },
  });
}

export function useDeleteProfessor() {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/professores/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professores"] });
    },
  });
}
