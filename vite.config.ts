import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        // outras opções do SVGR podem ser adicionadas aqui
      },
    }),
    react(),
  ],
  server: {
    hmr: {
      overlay: false,
    },
  },
});
