import { defineConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  base: "https://pf-itemcalc.github.io/pf-itemcalc",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
