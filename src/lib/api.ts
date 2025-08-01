import axios from "axios";

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@swcs:token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("@swcs:refreshToken");
        const response = await api.post<RefreshTokenResponse>("/auth/refresh", {
          refreshToken,
        });

        const { token, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("@swcs:token", token);
        localStorage.setItem("@swcs:refreshToken", newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("@swcs:token");
        localStorage.removeItem("@swcs:refreshToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
