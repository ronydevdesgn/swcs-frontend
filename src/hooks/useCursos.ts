import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";
import { Curso, CursoForm, PaginatedResponse } from "../types/entities";

interface CursosQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  departamento?: string;
}

export function useCursos(params?: CursosQueryParams) {
  return useQuery<PaginatedResponse<Curso>>({
    queryKey: ["cursos", params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Curso>>("/cursos", { params });
      return response.data;
    },
  });
}

export function useCurso(id: number) {
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
    mutationFn: async (data: CursoForm) => {
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
      id: number;
      data: Partial<CursoForm>;
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
    mutationFn: async (id: number) => {
      await api.delete(`/cursos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
}