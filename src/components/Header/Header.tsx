import "./Header.css";
import { useAuth, useLogout } from "../../hooks/useAuthentication";

export function Header() {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <div className="header-container">
      <div className="user-info">
        <span>Olá, {user?.name}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
}
