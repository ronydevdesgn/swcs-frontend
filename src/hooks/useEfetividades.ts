import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Efetividade {
  EfetividadeID: number;
  Data: string;
  HorasTrabalhadas: number;
  Professor: {
    ProfessorID: number;
    Nome: string;
    Departamento: string;
    CargaHoraria: number;
  };
  Curso?: {
    CursoID: number;
    Nome: string;
  };
}

export interface CreateEfetividadeInput {
  Data: string;
  HorasTrabalhadas: number;
  ProfessorID: number;
  CursoID?: number;
}

export interface EfetividadesListResponse {
  data: Efetividade[];
}

export function useEfetividades(params?: {
  inicio?: string;
  fim?: string;
  professorId?: number;
}) {
  return useQuery<EfetividadesListResponse>({
    queryKey: ["efetividades", params],
    queryFn: async () => {
      // Se há filtros de período, usar o endpoint específico
      if (params?.inicio || params?.fim) {
        const response = await api.get<{
          data: Efetividade[];
          meta: any;
        }>("/efetividades/periodo", {
          params: {
            dataInicio: params.inicio,
            dataFim: params.fim,
          },
        });
        return { data: response.data.data };
      }
      
      // Se há filtro por professor, usar o endpoint específico
      if (params?.professorId) {
        const response = await api.get<{
          data: Efetividade[];
          meta: any;
        }>(`/efetividades/professor/${params.professorId}`, {
          params: {
            inicio: params.inicio,
            fim: params.fim,
          },
        });
        return { data: response.data.data };
      }
      
      // Caso contrário, usar o endpoint geral
      const response = await api.get<EfetividadesListResponse>("/efetividades");
      return response.data;
    },
  });
}

export function useCreateEfetividade() {
  return useMutation({
    mutationFn: async (data: CreateEfetividadeInput) => {
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
      data: Partial<CreateEfetividadeInput>;
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