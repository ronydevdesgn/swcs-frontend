import './States.css';

export function LoadingSkeleton({
  message = 'Carregando...',
}: {
  message?: string;
}) {
  return (
    <div className="shared-loading">
      <div className="loader" />
      <span className="message">{message}</span>
    </div>
  );
}

export function EmptyState({
  message = 'Nenhum dado encontrado.',
}: {
  message?: string;
}) {
  return (
    <div className="shared-empty">
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({
  message = 'Ocorreu um erro.',
}: {
  message?: string;
}) {
  return (
    <div className="shared-error">
      <p>{message}</p>
    </div>
  );
}

export function LoadingSpinner({
  size = 'medium',
}: {
  size?: 'small' | 'medium' | 'large';
}) {
  return <div className={`spinner spinner-${size}`}>⌛</div>;
}
