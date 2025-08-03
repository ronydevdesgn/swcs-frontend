import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuthentication";

/**
 * O componente PrivateRoute verifica se o usuário está autenticado.
 * Se autenticado, ele renderiza os componentes filhos (Outlet).
 * Se não autenticado, ele redireciona para a página de login.
 */

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
