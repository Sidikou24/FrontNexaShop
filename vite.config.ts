// Changez en format ESM
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({ vueTsc: true })      // vérification de type en parallèle
  ],
  base: "",
  resolve: {
    alias: {
      '@': '/src'
    },
  },
  build: {
    outDir: "dist",
  },
});