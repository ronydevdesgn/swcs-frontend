import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";
import { Efetividade, EfetividadeForm, PaginatedResponse } from "../types/entities";

interface EfetividadesQueryParams {
  inicio?: string;
  fim?: string;
  professorId?: number;
}

export function useEfetividades(params?: EfetividadesQueryParams) {
  return useQuery<PaginatedResponse<Efetividade>>({
    queryKey: ["efetividades", params],
    queryFn: async () => {
      // Se há filtros de período, usar o endpoint específico
      if (params?.inicio || params?.fim) {
        const response = await api.get<PaginatedResponse<Efetividade>>("/efetividades/periodo", {
          params: {
            dataInicio: params.inicio,
            dataFim: params.fim,
          },
        });
        return response.data;
      }
      
      // Se há filtro por professor, usar o endpoint específico
      if (params?.professorId) {
        const response = await api.get<PaginatedResponse<Efetividade>>(`/efetividades/professor/${params.professorId}`, {
          params: {
            inicio: params.inicio,
            fim: params.fim,
          },
        });
        return response.data;
      }
      
      // Caso contrário, usar o endpoint geral
      const response = await api.get<PaginatedResponse<Efetividade>>("/efetividades");
      return response.data;
    },
  });
}

export function useCreateEfetividade() {
  return useMutation({
    mutationFn: async (data: EfetividadeForm) => {
      const response = await api.post<Efetividade>("/efetividades", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["efetividades"] });
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
    },
  });
}

export function useUpdateEfetividade() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<EfetividadeForm>;
    }) => {
      const response = await api.put<Efetividade>(`/efetividades/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["efetividades"] });
    },
  });
}

export function useDeleteEfetividade() {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/efetividades/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["efetividades"] });
    },
  });
}