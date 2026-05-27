import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

interface DashboardStatsResponse {
  data: {
    professores: number;
    cursos: number;
    sumarios: number;
    presencas: number;
    totalFaltas: number;
    funcionarios: number;
    sumariosRecentes: number;
    presencasRecentes: number;
  };
}

export interface DashboardStats {
  totalProfessores: number;
  totalCursos: number;
  totalSumarios: number;
  totalPresencas: number;
  totalFaltas: number;
  totalFuncionarios: number;
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
        totalPresencas: stats.presencas,
        totalFaltas: stats.totalFaltas,
        totalFuncionarios: stats.funcionarios,
        sumariosRecentes: stats.sumariosRecentes,
        presencasRecentes: stats.presencasRecentes,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,
  });
}