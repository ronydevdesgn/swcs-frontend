import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Funcionario {
  FuncionarioID: number;
  Nome: string;
  Email: string;
  Cargo: string;
  UsuarioID: number;
  Usuario?: {
    Email: string;
    Tipo: string;
    Permissoes: Array<{
      Permissao: {
        PermissaoID: number;
        Descricao: string;
      };
    }>;
  };
}

export interface CreateFuncionarioInput {
  Nome: string;
  Email: string;
  Cargo: string;
  Senha: string;
}

export interface FuncionariosListResponse {
  data: Funcionario[];
  meta: {
    total: number;
    porCargo: Record<string, number>;
  };
}

interface FuncionariosQueryParams {
  search?: string;
  cargo?: string;
}

export function useFuncionarios(params?: FuncionariosQueryParams) {
  return useQuery<FuncionariosListResponse>({
    queryKey: ["funcionarios", params],
    queryFn: async () => {
      const response = await api.get<FuncionariosListResponse>("/funcionarios", { params });
      return response.data;
    },
  });
}

export function useFuncionario(id: number) {
  return useQuery({
    queryKey: ["funcionarios", id],
    queryFn: async () => {
      const response = await api.get<{ data: Funcionario }>(`/funcionarios/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateFuncionario() {
  return useMutation({
    mutationFn: async (data: CreateFuncionarioInput) => {
      const response = await api.post<{ data: Funcionario }>("/funcionarios", data);
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
      id: number;
      data: Partial<Omit<CreateFuncionarioInput, 'Senha'>>;
    }) => {
      const response = await api.put<{ data: Funcionario }>(`/funcionarios/${id}`, data);
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
    mutationFn: async (id: number) => {
      await api.delete(`/funcionarios/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
    },
  });
}