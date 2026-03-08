import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";
import { PaginatedResponse, Sumario, SumarioForm } from "../types/entities";

interface SumariosQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  cursoId?: number;
  professorId?: number;
  dataInicio?: string;
  dataFim?: string;
}

export function useSumarios(params?: SumariosQueryParams) {
  return useQuery<PaginatedResponse<Sumario>>({
    queryKey: ["sumarios", params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Sumario>>("/sumarios", { params });
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
    mutationFn: async (data: SumarioForm) => {
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
      data: Partial<SumarioForm>;
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