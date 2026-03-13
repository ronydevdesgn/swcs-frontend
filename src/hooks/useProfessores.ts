import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";
import { PaginatedResponse, Professor, ProfessorForm } from "../types/entities";

interface ProfessoresQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  departamento?: string;
}

export function useProfessores(params?: ProfessoresQueryParams) {
  return useQuery<PaginatedResponse<Professor>>({
    queryKey: ["professores", params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Professor>>("/professores", { params });
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
    mutationFn: async (data: ProfessorForm) => {
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
      data: Partial<Omit<ProfessorForm, 'senha'>>;
    }) => {
      //const response = await api.get<Professor>(`/professores/${id}`); // Validation check?? (old code had put)
      const updateResponse = await api.put<Professor>(`/professores/${id}`, data);
      return updateResponse.data;
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
