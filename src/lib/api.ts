import axios from 'axios';
import { logger } from '../utils/logger';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';
logger.debug(`API Base URL configurada: ${API_BASE_URL}`);

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

// Request interceptor - adiciona token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@swcs:token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logger.debug('Fazendo requisição para:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    logger.error('Erro no request interceptor:', error);
    return Promise.reject(error);
  },
);

// Response interceptor - trata respostas e renova tokens automaticamente
api.interceptors.response.use(
  (response) => {
    logger.debug('Resposta recebida com sucesso.', {
      status: response.status,
      url: response.config.url,
      method: response.config.method?.toLowerCase(),
    });
    return response;
  },

  async (error) => {
    // Verificar se é erro de rede
    if (!error.response) {
      logger.error('Erro de rede ou servidor offline:', {
        message: error.message,
        code: error.code,
        config: {
          baseURL: error.config?.baseURL,
          url: error.config?.url,
          method: error.config?.method,
        },
      });

      // Criar erro mais descritivo
      const networkError = new Error(
        `Erro de conexão: Não foi possível conectar ao servidor em ${API_BASE_URL}. 
            Verifique se o backend está rodando.`,
      );
      networkError.name = 'NetworkError';
      return Promise.reject(networkError);
    }

    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    // Se o erro é 401 e não tentamos renovar ainda
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('@swcs:refreshToken');

      if (!refreshToken) {
        // Não há refresh token, redirecionar para login
        logger.error('Erro de autenticação (token):', error);
        localStorage.removeItem('@swcs:token');
        localStorage.removeItem('@swcs:refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        logger.debug('Tentando renovar token...');

        // Fazer a requisição de refresh sem interceptors para evitar loop
        const response = await axios.post<RefreshTokenResponse>(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            withCredentials: true,
            timeout: 15000,
          },
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Salvar novos tokens
        localStorage.setItem('@swcs:token', accessToken);
        localStorage.setItem('@swcs:refreshToken', newRefreshToken);

        logger.debug('Token renovado com sucesso.');

        // Atualizar o header da requisição original
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Repetir a requisição original
        return api(originalRequest);
      } catch (refreshError) {
        logger.error('Erro ao renovar token:', refreshError);

        // Falha na renovação, limpar tudo e redirecionar
        localStorage.removeItem('@swcs:token');
        localStorage.removeItem('@swcs:refreshToken');
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      const status = error.response.status;
      let message =
        error.response.data?.mensagem ||
        error.response.data?.message ||
        error.message;

      switch (status) {
        case 400:
          message = `Erro de validação: ${message}`;
          break;
        case 403:
          message = `Acesso negado: ${message}`;
          break;
        case 404:
          message = `Recurso não encontrado: ${message}`;
          break;
        case 500:
          message = `Erro interno do servidor: ${message}`;
          break;
        default:
          message = `Erro ${status}: ${message}`;
      }

      error.message = message;
    }

    return Promise.reject(error);
  },
);
