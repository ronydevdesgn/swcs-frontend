import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Sumario {
  id: string;
  data: string;
  conteudo: string;
  cursoId: string;
  professorId: string;
}

export interface CreateSumarioInput {
  data: string;
  conteudo: string;
  cursoId: string;
  professorId: string;
}

interface SumariosQueryParams {
  page?: number;
  limit?: number;
  cursoId?: string;
  dataInicio?: string;
}

export function useSumarios(params?: SumariosQueryParams) {
  return useQuery({
    queryKey: ["sumarios", params],
    queryFn: async () => {
      const response = await api.get("/sumarios", { params });
      return response.data;
    },
  });
}

export function useSumario(id: string) {
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sumarios"] });
      queryClient.invalidateQueries({
        queryKey: ["sumarios", { cursoId: variables.cursoId }],
      });
    },
  });
}

export function useUpdateSumario() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
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
    mutationFn: async (id: string) => {
      await api.delete(`/sumarios/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sumarios"] });
    },
  });
}
