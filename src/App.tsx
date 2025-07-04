// All screen
import { Login } from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { Cursos } from "./pages/Cursos";
import { Dashboard } from "./pages/Dashboard";
import { Efetividade } from "./pages/Efetividade";
import { Home } from "./pages/Home";
import { Professores } from "./pages/Professores";
import { Relatorios } from "./pages/Relatorios";
import { SignUp } from "./pages/Sign up";
import { Sumario } from "./pages/Sumario";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/cursos",
            element: <Cursos />,
          },
          {
            path: "/efetividade",
            element: <Efetividade />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/professores",
            element: <Professores />,
          },
          {
            path: "/relatorios",
            element: <Relatorios />,
          },
          {
            path: "/sumario",
            element: <Sumario />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routers} />
    </AuthProvider>
  );
}

export default App;
