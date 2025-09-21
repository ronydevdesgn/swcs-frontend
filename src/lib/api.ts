import axios from "axios";

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adiciona token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@swcs:token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Erro no request interceptor:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - trata respostas e renova tokens automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    // Se o erro é 401 e não tentamos renovar ainda
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("@swcs:refreshToken");
      
      if (!refreshToken) {
        // Não há refresh token, redirecionar para login
        console.log('Nenhum refresh token encontrado, redirecionando para login...');
        localStorage.removeItem("@swcs:token");
        localStorage.removeItem("@swcs:refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        console.log('Tentando renovar token...');
        
        // Fazer a requisição de refresh sem interceptors para evitar loop
        const response = await axios.post<RefreshTokenResponse>(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/auth/refresh`,
          { refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Salvar novos tokens
        localStorage.setItem("@swcs:token", accessToken);
        localStorage.setItem("@swcs:refreshToken", newRefreshToken);

        console.log('Token renovado com sucesso');

        // Atualizar o header da requisição original
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Repetir a requisição original
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Erro ao renovar token:', refreshError);
        
        // Falha na renovação, limpar tudo e redirecionar
        localStorage.removeItem("@swcs:token");
        localStorage.removeItem("@swcs:refreshToken");
        window.location.href = "/login";
        
        return Promise.reject(refreshError);
      }
    }

    // Para outros erros, apenas rejeitar
    return Promise.reject(error);
  }
);
