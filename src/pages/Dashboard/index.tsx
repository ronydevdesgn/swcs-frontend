import { Card } from "../../components/Card/Card";
import "./index.css";
export function Dashboard() {
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
        <button>Atualizar nº</button>
      </div>
      <div className="main-dashboard">
        <Card
          titleCard="Professores"
          numberCard={88}
          descriptionCard="Cadastro feito no sistema."
          emojiUp="↗"
        />
        <Card
          titleCard="Cursos"
          numberCard={56}
          descriptionCard="Existentes no sistema."
          emojiUp="↗"
        />
        <Card
          titleCard="Sumários"
          numberCard={124}
          descriptionCard="Já cumpridos e não cumpridos até a data de hoje."
          emojiUp="↑↓"
        />
        <Card
          titleCard="Relatórios"
          numberCard={48}
          descriptionCard="Prontos para impressão ou serem baixado e guardados."
          emojiUp="↗"
        />
      </div>
    </section>
  );
}
