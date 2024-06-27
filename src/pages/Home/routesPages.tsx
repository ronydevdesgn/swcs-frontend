import { createBrowserRouter } from "react-router-dom";
import { Sumario } from "../Sumario";
import { Relatorios } from "../Relatorios";
import { Professores } from "../Professores";
import { Efetividade } from "../Efetividade";
import { Cursos } from "../Cursos";
import { Dashboard } from "../Dashboard";

export const router = createBrowserRouter([
  {
    path: "/Home/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Home/Cursos",
    element: <Cursos />,
  },
  {
    path: "/Home/Efetividade",
    element: <Efetividade />,
  },
  {
    path: "/Home/Professores",
    element: <Professores />,
  },
  {
    path: "/Home/Relatórios",
    element: <Relatorios />,
  },
  {
    path: "/Home/Sumário",
    element: <Sumario />,
  },
]);
