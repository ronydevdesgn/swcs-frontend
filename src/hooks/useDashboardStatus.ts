import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

interface DashboardStatsResponse {
  data: {
    professores: number;
    cursos: number;
    sumarios: number;
    presencas: number;
    funcionarios: number;
  };
}

export interface DashboardStats {
  totalProfessores: number;
  totalCursos: number;
  totalSumarios: number;
  totalPresencas: number;
  totalFaltas: number;
  professoresAtivos: number;
  sumariosRecentes: number;
  presencasRecentes: number;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const { data } = await api.get<DashboardStatsResponse>('/dashboard/stats');
      const stats = data.data;
      
      return {
        totalProfessores: stats.professores,
        totalCursos: stats.cursos,
        totalSumarios: stats.sumarios,
        totalPresencas: stats.presencas, // Nota: Atualmente retorna contagem total de registros
        totalFaltas: 0, // Não implementado no backend v1
        professoresAtivos: 0, // Não implementado no backend v1
        sumariosRecentes: 0, // Não implementado no backend v1
        presencasRecentes: 0, // Não implementado no backend v1
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,
  });
}