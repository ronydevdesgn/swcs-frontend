import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { queryClient } from "../lib/react-query";

export interface Permissao {
  permissaoId: number;
  descricao: string;
  usuarios?: Array<{
    usuario: {
      nome: string;
      email: string;
      tipo: string;
    };
  }>;
}

export interface UsuarioComPermissoes {
  usuarioId: number;
  nome: string;
  email: string;
  tipo: string;
  permissoes: Array<{
    permissaoId: number;
    permissao: {
      permissaoId: number;
      descricao: string;
    };
  }>;
}

// Listar todas as permissões disponíveis
export function usePermissoes() {
  return useQuery<Permissao[]>({
    queryKey: ["permissoes"],
    queryFn: async () => {
      const { data } = await api.get<{ data: Permissao[] }>("/permissoes");
      return data.data;
    },
  });
}

// Buscar permissões de um usuário específico
export function usePermissoesUsuario(usuarioId: number) {
  return useQuery({
    queryKey: ["permissoes", "usuario", usuarioId],
    queryFn: async () => {
      const { data } = await api.get(`/permissoes/usuario/${usuarioId}`);
      return data.data;
    },
    enabled: !!usuarioId,
  });
}

// Criar nova permissão
export function useCreatePermissao() {
  return useMutation({
    mutationFn: async (descricao: string) => {
      const { data } = await api.post("/permissoes", { descricao });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissoes"] });
    },
  });
}

// Atribuir permissão a um usuário
export function useAtribuirPermissao() {
  return useMutation({
    mutationFn: async ({ usuarioId, permissaoId }: { usuarioId: number; permissaoId: number }) => {
      const { data } = await api.post("/permissoes/atribuir", { usuarioId, permissaoId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissoes"] });
    },
  });
}

// Deletar permissão
export function useDeletePermissao() {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/permissoes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissoes"] });
    },
  });
}
