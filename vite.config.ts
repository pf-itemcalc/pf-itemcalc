import { readFileSync } from "node:fs";
import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  setEnv(mode);
  return {
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: "build",
    },
    plugins: [react(), tsconfigPaths(), basePlugin()],
  };
});

function setEnv(mode: string) {
  Object.assign(
    process.env,
    loadEnv(mode, ".", ["REACT_APP_", "NODE_ENV", "PUBLIC_URL"]),
  );
  process.env.NODE_ENV ||= mode;
  const { homepage } = JSON.parse(readFileSync("package.json", "utf-8"));
  process.env.PUBLIC_URL ||= homepage
    ? `${
        homepage.startsWith("http") || homepage.startsWith("/")
          ? homepage
          : `/${homepage}`
      }`.replace(/\/$/, "")
    : "";
}

function basePlugin(): Plugin {
  return {
    name: "base-plugin",
    config(_, { mode }) {
      const { PUBLIC_URL } = loadEnv(mode, ".", ["PUBLIC_URL"]);
      return {
        base: PUBLIC_URL || "",
      };
    },
  };
}
