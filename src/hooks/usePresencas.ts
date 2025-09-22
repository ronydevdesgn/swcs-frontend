import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Presenca {
  PresencaID: number;
  Data: string;
  Estado: "PRESENTE" | "FALTA";
  ProfessorID: number;
  Professor?: {
    Nome: string;
    Departamento: string;
  };
}

export interface CreatePresencaInput {
  Data: string;
  Estado: "PRESENTE" | "FALTA";
  ProfessorID: number;
}

export interface PresencasListResponse {
  data: Presenca[];
  meta: {
    total: number;
    porEstado: Record<"PRESENTE" | "FALTA", number>;
    periodo?: {
      inicio: string;
      fim: string;
    };
  };
}

interface PresencasQueryParams {
  inicio?: string;
  fim?: string;
  estado?: "PRESENTE" | "FALTA";
  professorId?: number;
}

export function usePresencas(params?: PresencasQueryParams) {
  return useQuery<PresencasListResponse>({
    queryKey: ["presencas", params],
    queryFn: async () => {
      const response = await api.get<PresencasListResponse>("/presencas", { params });
      return response.data;
    },
  });
}

export function usePresenca(id: number) {
  return useQuery({
    queryKey: ["presencas", id],
    queryFn: async () => {
      const response = await api.get<{ data: Presenca }>(`/presencas/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreatePresenca() {
  return useMutation({
    mutationFn: async (data: CreatePresencaInput) => {
      const response = await api.post<{ data: Presenca }>("/presencas", data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["presencas"] });
      queryClient.invalidateQueries({
        queryKey: ["presencas", { professorId: variables.ProfessorID }],
      });
    },
  });
}

export function useCreatePresencasEmLote() {
  return useMutation({
    mutationFn: async (presencas: CreatePresencaInput[]) => {
      const response = await api.post<{ data: { registrosCriados: number } }>("/presencas/batch", {
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
      estado: Presenca["Estado"];
    }) => {
      const response = await api.put<{ data: Presenca }>(`/presencas/${id}`, { Estado: estado });
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