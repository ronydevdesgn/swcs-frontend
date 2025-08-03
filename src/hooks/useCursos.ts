import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Curso {
  id: string;
  nome: string;
  descricao: string;
  professorId: string;
}

export interface CreateCursoInput {
  nome: string;
  descricao: string;
  professorId: string;
}

interface CursosQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useCursos(params?: CursosQueryParams) {
  return useQuery({
    queryKey: ["cursos", params],
    queryFn: async () => {
      const response = await api.get("/cursos", { params });
      return response.data;
    },
  });
}

export function useCurso(id: string) {
  return useQuery({
    queryKey: ["cursos", id],
    queryFn: async () => {
      const response = await api.get<Curso>(`/cursos/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateCurso() {
  return useMutation({
    mutationFn: async (data: CreateCursoInput) => {
      const response = await api.post<Curso>("/cursos", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
}

export function useUpdateCurso() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateCursoInput>;
    }) => {
      const response = await api.put<Curso>(`/cursos/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
      queryClient.invalidateQueries({ queryKey: ["cursos", variables.id] });
    },
  });
}

export function useDeleteCurso() {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/cursos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
}
