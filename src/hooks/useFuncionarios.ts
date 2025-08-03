import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
}

export interface CreateFuncionarioInput {
  nome: string;
  email: string;
  cargo: string;
}

interface FuncionariosQueryParams {
  page?: number;
  limit?: number;
  cargo?: string;
}

export function useFuncionarios(params?: FuncionariosQueryParams) {
  return useQuery({
    queryKey: ["funcionarios", params],
    queryFn: async () => {
      const response = await api.get("/funcionarios", { params });
      return response.data;
    },
  });
}

export function useFuncionario(id: string) {
  return useQuery({
    queryKey: ["funcionarios", id],
    queryFn: async () => {
      const response = await api.get<Funcionario>(`/funcionarios/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateFuncionario() {
  return useMutation({
    mutationFn: async (data: CreateFuncionarioInput) => {
      const response = await api.post<Funcionario>("/funcionarios", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
    },
  });
}

export function useUpdateFuncionario() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateFuncionarioInput>;
    }) => {
      const response = await api.put<Funcionario>(`/funcionarios/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
      queryClient.invalidateQueries({
        queryKey: ["funcionarios", variables.id],
      });
    },
  });
}

export function useDeleteFuncionario() {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/funcionarios/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
    },
  });
}
