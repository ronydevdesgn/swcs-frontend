import { Card } from "../../components/Card/Card";
import { ArrowUp, ArrowDown, ArrowUpRight, RefreshCw } from "react-feather";
import { useDashboardStats } from "../../hooks/useDashboardStatus";
import "./index.css";

export function Dashboard() {
  const { data: stats, isLoading, error, refetch } = useDashboardStats();

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <section className="container-dashboard">
        <div className="error-message">
          <p>Erro ao carregar estatísticas. Tente novamente.</p>
          <button onClick={handleRefresh}>Tentar Novamente</button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Estatística</h2>
          <span>
            Confira os números de Professores, Cursos, Sumários e Relatórios
            registrados no sistema.
          </span>
        </div>
        <button onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? (
            <RefreshCw size={16} className="spinning" />
          ) : (
            "Atualizar nº"
          )}
        </button>
      </div>
      {/* main of page dashboard */}
      <div className="main-dashboard">
        <Card
          titleCard="Professores"
          numberCard={stats?.totalProfessores ?? 0}
          descriptionCard="Cadastrados no sistema."
          iconUp={<ArrowUpRight size={24} strokeWidth={4} />}
        />
        <Card
          titleCard="Cursos"
          numberCard={stats?.totalCursos ?? 0}
          descriptionCard="Existentes no sistema."
          iconUp={<ArrowUpRight size={24} strokeWidth={4} />}
        />
        <Card
          titleCard="Sumários"
          numberCard={stats?.totalSumarios ?? 0}
          descriptionCard={`${stats?.sumariosRecentes ?? 0} registrados nos últimos 30 dias.`}
          iconUp={<ArrowUp size={24} strokeWidth={4} />}
          iconDown={<ArrowDown size={24} strokeWidth={4} className="svgdown" />}
        />
        <Card
          titleCard="Presenças"
          numberCard={stats?.totalPresencas ?? 0}
          descriptionCard={`${stats?.totalFaltas ?? 0} faltas registradas.`}
          iconUp={<ArrowUpRight size={24} strokeWidth={4} />}
        />
      </div>
    </section>
  );
}
