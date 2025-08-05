import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Não recarrega os dados quando a janela recebe foco
      retry: 1, // Número de tentativas em caso de erro
      staleTime: 5 * 60 * 1000, // Tempo que os dados são considerados "frescos" (5 minutos)
      gcTime: 10 * 60 * 1000, // Tempo antes do garbage collector limpar os dados (10 minutos)
    },
    mutations: {
      retry: 1, // Número de tentativas para mutações em caso de erro
    },
  },
});
