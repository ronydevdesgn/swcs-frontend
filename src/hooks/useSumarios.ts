import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

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

export interface CreateSumarioInput {
  Data: string;
  Conteudo: string;
  CursoID: number;
  ProfessorID: number;
}

export interface SumariosListResponse {
  data: Sumario[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function useSumarios(params?: {
  page?: number;
  limit?: number;
  search?: string;
  cursoId?: number;
  professorId?: number;
  dataInicio?: string;
  dataFim?: string;
}) {
  return useQuery<SumariosListResponse>({
    queryKey: ["sumarios", params],
    queryFn: async () => {
      const response = await api.get<SumariosListResponse>("/sumarios", { params });
      return response.data;
    },
  });
}

export function useSumario(id: number) {
  return useQuery({
    queryKey: ["sumarios", id],
    queryFn: async () => {
      const response = await api.get<Sumario>(`/sumarios/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateSumario() {
  return useMutation({
    mutationFn: async (data: CreateSumarioInput) => {
      const response = await api.post<Sumario>("/sumarios", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sumarios"] });
    },
  });
}

export function useUpdateSumario() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateSumarioInput>;
    }) => {
      const response = await api.put<Sumario>(`/sumarios/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sumarios"] });
      queryClient.invalidateQueries({ queryKey: ["sumarios", variables.id] });
    },
  });
}

export function useDeleteSumario() {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/sumarios/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sumarios"] });
    },
  });
}