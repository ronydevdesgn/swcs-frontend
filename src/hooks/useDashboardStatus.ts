import { useQuery } from "@tanstack/react-query";
import { usePresencas } from "./usePresencas";
import { useSumarios } from "./useSumarios";
import { useProfessores } from "./useProfessores";
import { useCursos } from "./useCursos";

interface DashboardStats {
  totalProfessores: number;
  totalCursos: number;
  totalSumarios: number;
  totalPresencas: number;
  totalFaltas: number;
  professoresAtivos: number;
  sumariosRecentes: number; // últimos 30 dias
  presencasRecentes: number; // últimos 30 dias
}

export function useDashboardStats() {
  // Buscar todos os professores
  const { data: professoresData, isLoading: isLoadingProfessores } = useProfessores({ 
    limit: 1000 // Buscar todos para contagem
  });

  // Buscar todos os cursos
  const { data: cursosData, isLoading: isLoadingCursos } = useCursos({ 
    limit: 1000 
  });

  // Buscar todos os sumários
  const { data: sumariosData, isLoading: isLoadingSumarios } = useSumarios({ 
    limit: 1000 
  });

  // Buscar todas as presenças
  const { data: presencasData, isLoading: isLoadingPresencas } = usePresencas();

  // Buscar sumários dos últimos 30 dias
  const dataInicio30Dias = new Date();
  dataInicio30Dias.setDate(dataInicio30Dias.getDate() - 30);
  
  const { data: sumariosRecentes } = useSumarios({
    dataInicio: dataInicio30Dias.toISOString().split('T')[0],
    limit: 1000
  });

  // Buscar presenças dos últimos 30 dias
  const { data: presencasRecentes } = usePresencas({
    inicio: dataInicio30Dias.toISOString().split('T')[0]
  });

  return useQuery({
    queryKey: ['dashboard-stats', {
      professores: professoresData?.meta?.total,
      cursos: cursosData?.meta?.total,
      sumarios: sumariosData?.meta?.total,
      presencas: presencasData?.meta?.total,
      presencasPorEstado: presencasData?.meta?.porEstado
    }],
    queryFn: (): DashboardStats => {
      return {
        totalProfessores: professoresData?.meta?.total ?? 0,
        totalCursos: cursosData?.meta?.total ?? 0,
        totalSumarios: sumariosData?.meta?.total ?? 0,
        totalPresencas: presencasData?.meta?.porEstado?.PRESENTE ?? 0,
        totalFaltas: presencasData?.meta?.porEstado?.FALTA ?? 0,
        professoresAtivos: professoresData?.data?.length ?? 0,
        sumariosRecentes: sumariosRecentes?.meta?.total ?? 0,
        presencasRecentes: presencasRecentes?.meta?.total ?? 0,
      };
    },
    enabled: !isLoadingProfessores && !isLoadingCursos && !isLoadingSumarios && !isLoadingPresencas,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}