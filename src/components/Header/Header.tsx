import "./Header.css";
import { useAuth } from "../../hooks/useAuthentication";

interface HeaderProps {
  pageTitle: string;
}

export function Header({ pageTitle }: HeaderProps) {
  const { user } = useAuth();

  return (
    <div className="header-container">
      <div className="user-info">
        <h1>{pageTitle}</h1>
        <span>Olá, {user?.name}</span>
      </div>
    </div>
  );
}
