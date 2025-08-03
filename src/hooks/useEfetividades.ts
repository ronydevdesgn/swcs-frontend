import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Efetividade {
  id: string;
  data: string;
  horasTrabalhadas: number;
  professorId: string;
}

export interface EfetividadeStats {
  totalHoras: number;
  diasTrabalhados: number;
  mediaHorasDia: number;
}

export interface CreateEfetividadeInput {
  data: string;
  horasTrabalhadas: number;
  professorId: string;
}

interface EfetividadesQueryParams {
  page?: number;
  limit?: number;
  mes?: number;
  ano?: number;
}

interface StatsQueryParams {
  mes?: number;
  ano?: number;
  professorId?: string;
}

export function useEfetividades(params?: EfetividadesQueryParams) {
  return useQuery({
    queryKey: ["efetividades", params],
    queryFn: async () => {
      const response = await api.get("/efetividades", { params });
      return response.data;
    },
  });
}

export function useEfetividadeStats(params?: StatsQueryParams) {
  return useQuery({
    queryKey: ["efetividades", "stats", params],
    queryFn: async () => {
      const response = await api.get<EfetividadeStats>("/efetividades/stats", {
        params,
      });
      return response.data;
    },
    enabled: !!params?.professorId,
  });
}

export function useEfetividade(id: string) {
  return useQuery({
    queryKey: ["efetividades", id],
    queryFn: async () => {
      const response = await api.get<Efetividade>(`/efetividades/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateEfetividade() {
  return useMutation({
    mutationFn: async (data: CreateEfetividadeInput) => {
      const response = await api.post<Efetividade>("/efetividades", data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["efetividades"] });
      queryClient.invalidateQueries({
        queryKey: [
          "efetividades",
          "stats",
          { professorId: variables.professorId },
        ],
      });
    },
  });
}

export function useUpdateEfetividade() {
  return useMutation({
    mutationFn: async ({
      id,
      horasTrabalhadas,
    }: {
      id: string;
      horasTrabalhadas: number;
    }) => {
      const response = await api.put<Efetividade>(`/efetividades/${id}`, {
        horasTrabalhadas,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["efetividades"] });
      queryClient.invalidateQueries({ queryKey: ["efetividades", "stats"] });
    },
  });
}

export function useDeleteEfetividade() {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/efetividades/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["efetividades"] });
      queryClient.invalidateQueries({ queryKey: ["efetividades", "stats"] });
    },
  });
}
