import "./Header.css";
import { useAuth } from "../../hooks/useAuthentication";

export function Header() {
  const { user } = useAuth();

  return (
    <div className="header-container">
      <div className="user-info">
        <span>Olá, {user?.name}</span>
      </div>
    </div>
  );
}
