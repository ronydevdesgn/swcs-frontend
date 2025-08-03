import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Presenca {
  id: string;
  data: string;
  estado: "PRESENTE" | "FALTA" | "JUSTIFICADO";
  professorId: string;
  cursoId: string;
}

export interface CreatePresencaInput {
  data: string;
  estado: "PRESENTE" | "FALTA" | "JUSTIFICADO";
  professorId: string;
  cursoId: string;
}

interface PresencasQueryParams {
  page?: number;
  limit?: number;
  data?: string;
  cursoId?: string;
}

export function usePresencas(params?: PresencasQueryParams) {
  return useQuery({
    queryKey: ["presencas", params],
    queryFn: async () => {
      const response = await api.get("/presencas", { params });
      return response.data;
    },
  });
}

export function usePresenca(id: string) {
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
    mutationFn: async (data: CreatePresencaInput) => {
      const response = await api.post<Presenca>("/presencas", data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
      queryClient.invalidateQueries({
        queryKey: ["presencas", { cursoId: variables.cursoId }],
      });
    },
  });
}

export function useCreatePresencasEmLote() {
  return useMutation({
    mutationFn: async (presencas: CreatePresencaInput[]) => {
      const response = await api.post<{ count: number }>("/presencas/batch", {
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
      id: string;
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
    mutationFn: async (id: string) => {
      await api.delete(`/presencas/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
    },
  });
}
