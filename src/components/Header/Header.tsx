import "./Header.css";
// Defina as propriedades esperadas para o cabeçalho (titulo)
interface HeaderProps {
  pageTitle: string;
}

export function Header({ pageTitle }: HeaderProps) {
  // Aqui você pode adicionar lógica adicional, se necessário.
  return (
    <div className="header-container">
      <div className="user-info">
        <h1>{pageTitle}</h1>
        <span>Header</span>
      </div>
    </div>
  );
}
