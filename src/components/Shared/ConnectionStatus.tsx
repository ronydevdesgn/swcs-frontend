import { useEffect, useState } from 'react';
import { logger } from '../../utils/logger';

interface BackendStatus {
  isOnline: boolean;
  version?: string;
  message?: string;
  error?: string;
}

export function ConnectionStatus() {
  const [status, setStatus] = useState<BackendStatus>({ isOnline: false });
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    setIsChecking(true);
    try {
      logger.debug('Verificando status do backend...');

      const response = await fetch('http://localhost:3333/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus({
          isOnline: true,
          version: data.version || '1.0.0',
          message: data.message || 'Backend conectado',
        });
        logger.info('Backend conectado:', data);
      } else {
        throw new Error(`Status: ${response.status}`);
      }
    } catch (error: any) {
      setStatus({
        isOnline: false,
        error: error.message || 'Erro de conexão',
      });
      logger.error('Backend offline:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div
      className={`connection-status ${status.isOnline ? 'online' : 'offline'}`}
    >
      {isChecking ? (
        <span>⏳ Verificando conexão...</span>
      ) : status.isOnline ? (
        <span>
          🟢 Backend Online (v{status.version}) - {status.message}
        </span>
      ) : (
        <div>
          <span>🔴 Backend Offline</span>
          <p>Erro: {status.error}</p>
          <p>Verifique se o backend está rodando na porta 3333</p>
        </div>
      )}
      <button onClick={checkBackendStatus} disabled={isChecking}>
        {isChecking ? 'Verificando...' : 'Verificar Novamente'}
      </button>
    </div>
  );
}
