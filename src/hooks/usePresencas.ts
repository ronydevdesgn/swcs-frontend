import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";
import { PaginatedResponse, Presenca, PresencaForm } from "../types/entities";

interface PresencasQueryParams {
  inicio?: string;
  fim?: string;
  estado?: "PRESENTE" | "FALTA";
  professorId?: number;
}

export function usePresencas(params?: PresencasQueryParams) {
  return useQuery<PaginatedResponse<Presenca>>({
    queryKey: ["presencas", params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Presenca>>("/presencas", { params });
      return response.data;
    },
  });
}

export function usePresenca(id: number) {
  return useQuery({
    queryKey: ["presencas", id],
    queryFn: async () => {
      const response = await api.get<Presenca>(`/presencas/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreatePresenca() {
  return useMutation({
    mutationFn: async (data: PresencaForm) => {
      const response = await api.post<Presenca>("/presencas", data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
      queryClient.invalidateQueries({
        queryKey: ["presencas", { professorId: variables.professorId }],
      });
    },
  });
}

export function useCreatePresencasEmLote() {
  return useMutation({
    mutationFn: async (presencas: PresencaForm[]) => {
      const response = await api.post<{ registrosCriados: number }>("/presencas/batch", {
        presencas,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
    },
  });
}

export function useUpdatePresenca() {
  return useMutation({
    mutationFn: async ({
      id,
      estado,
    }: {
      id: number;
      estado: Presenca["estado"];
    }) => {
      const response = await api.put<Presenca>(`/presencas/${id}`, { estado });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
      queryClient.invalidateQueries({ queryKey: ["presencas", variables.id] });
    },
  });
}

export function useDeletePresenca() {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/presencas/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
    },
  });
}