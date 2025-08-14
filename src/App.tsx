// All screen (todas as telas do aplicativo)
import { Login } from "./pages/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
// import { PrivateRoute } from "./components/PrivateRoute";
import { Cursos } from "./pages/Cursos";
import { Dashboard } from "./pages/Dashboard";
import { Efetividade } from "./pages/Efetividade";
import { Perfil } from "./pages/Perfil";
import { Professores } from "./pages/Professores";
import { Relatorios } from "./pages/Relatorios";
import { SignUp } from "./pages/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Definicoes } from "./pages/Definicoes";

// All routes (todas as rotas)
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  // Private routes (rotas privadas)
  // These routes require authentication (estas rotas requerem autenticação)
  {
    // element: <PrivateRoute />,
    // children: [
    //   {
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
        path: "/perfil",
        element: <Perfil />,
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
        path: "/definicoes",
        element: <Definicoes />,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
    //   },
    // ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

// Main component of the application
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routers} />
      {/* <Layout/> */}
    </AuthProvider>
  );
}

export default App;
