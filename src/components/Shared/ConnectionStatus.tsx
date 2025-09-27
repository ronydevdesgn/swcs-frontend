import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { logger } from '../../utils/logger';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [backendVersion, setBackendVersion] = useState<string>('');

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await api.get('/');
      setIsOnline(true);
      setBackendVersion('1.0.0');
      logger.info('Backend conectado:', response.data);
    } catch (error) {
      setIsOnline(false);
      logger.error('Backend offline:', error);
    }
  };

  if (isOnline === null) {
    return <div className="connection-status loading">Verificando conexão...</div>;
  }

  return (
    <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? (
        <span>🟢 Backend Online (v{backendVersion})</span>
      ) : (
        <span>🔴 Backend Offline - Verifique se está rodando na porta 3333</span>
      )}
      <button onClick={checkBackendStatus}>Reconfirmar</button>
    </div>
  );
}