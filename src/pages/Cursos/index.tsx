import { InputSearch } from "../../components/InputSearch/InputSearch";
import "./index.css";
export function Cursos() {
  return (
    // CSS deste container vem do CSS da página do dashboard, sem o input
    // OBS: Apenas o cabeçalho do header do main
     <section className="container-dashboard">
          <div className="header-dashboard">
            <div className="title">
              <h2>Lista de cursos</h2>
              <span>
                Cursos cadastrados
              </span>
            </div>
            {/* component Input de pesquisa*/}
            <InputSearch Placeholder="Pesquisar por curso" />
            <button>Cadastrar</button>
          </div>
          <div className="main-cursos">
           
          </div>
        </section>
  )
}
