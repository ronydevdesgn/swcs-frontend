import { useQuery } from "@tanstack/react-query";
import { usePresencas } from "./usePresencas";
import { useSumarios } from "./useSumarios";
import { useProfessores } from "./useProfessores";

export interface RelatorioData {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  tipo: 'PRESENCA_SEMANAL' | 'PRESENCA_MENSAL' | 'SUMARIO_SEMANAL' | 'SUMARIO_MENSAL' | 'GERAL';
  dados: any;
}

export function useRelatoriosData() {
  // Dados da semana atual
  const inicioSemana = new Date();
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
  
  // Dados do mês atual
  const inicioMes = new Date();
  inicioMes.setDate(1);

  // Queries para diferentes períodos
  const { data: presencasSemana } = usePresencas({
    inicio: inicioSemana.toISOString().split('T')[0]
  });

  const { data: presencasMes } = usePresencas({
    inicio: inicioMes.toISOString().split('T')[0]
  });

  const { data: sumariosSemana } = useSumarios({
    dataInicio: inicioSemana.toISOString().split('T')[0],
    limit: 1000
  });

  const { data: sumariosMes } = useSumarios({
    dataInicio: inicioMes.toISOString().split('T')[0],
    limit: 1000
  });

  const { data: professores } = useProfessores({ limit: 1000 });

  return useQuery({
    queryKey: ['relatorios-data', {
      presencasSemana: presencasSemana?.meta?.total,
      presencasMes: presencasMes?.meta?.total,
      sumariosSemana: sumariosSemana?.meta?.total,
      sumariosMes: sumariosMes?.meta?.total,
    }],
    queryFn: (): RelatorioData[] => {
      const relatorios: RelatorioData[] = [];

      // Relatório semanal de presenças
      if (presencasSemana) {
        relatorios.push({
          id: 1,
          titulo: 'Relatório Semanal de Presenças',
          descricao: `Presenças: ${presencasSemana.meta.porEstado?.PRESENTE ?? 0}, Faltas: ${presencasSemana.meta.porEstado?.FALTA ?? 0}`,
          data: new Date().toISOString().split('T')[0],
          tipo: 'PRESENCA_SEMANAL',
          dados: presencasSemana
        });
      }

      // Relatório mensal de presenças
      if (presencasMes) {
        relatorios.push({
          id: 2,
          titulo: 'Relatório Mensal de Presenças',
          descricao: `Presenças: ${presencasMes.meta.porEstado?.PRESENTE ?? 0}, Faltas: ${presencasMes.meta.porEstado?.FALTA ?? 0}`,
          data: new Date().toISOString().split('T')[0],
          tipo: 'PRESENCA_MENSAL',
          dados: presencasMes
        });
      }

      // Relatório semanal de sumários
      if (sumariosSemana) {
        relatorios.push({
          id: 3,
          titulo: 'Relatório Semanal de Sumários',
          descricao: `${sumariosSemana.meta.total} sumários registrados esta semana`,
          data: new Date().toISOString().split('T')[0],
          tipo: 'SUMARIO_SEMANAL',
          dados: sumariosSemana
        });
      }

      // Relatório mensal de sumários
      if (sumariosMes) {
        relatorios.push({
          id: 4,
          titulo: 'Relatório Mensal de Sumários',
          descricao: `${sumariosMes.meta.total} sumários registrados este mês`,
          data: new Date().toISOString().split('T')[0],
          tipo: 'SUMARIO_MENSAL',
          dados: sumariosMes
        });
      }

      // Relatório geral
      relatorios.push({
        id: 5,
        titulo: 'Relatório Geral do Sistema',
        descricao: `${professores?.meta?.total ?? 0} professores cadastrados`,
        data: new Date().toISOString().split('T')[0],
        tipo: 'GERAL',
        dados: {
          professores: professores?.meta?.total ?? 0,
          presencasTotal: (presencasMes?.meta.porEstado?.PRESENTE ?? 0) + (presencasMes?.meta.porEstado?.FALTA ?? 0),
          sumariosTotal: sumariosMes?.meta?.total ?? 0
        }
      });

      return relatorios;
    },
    enabled: true,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}