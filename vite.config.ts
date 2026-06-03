import { resolve } from "node:path";
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
    plugins: [
      react(),
      tsconfigPaths(),
      basePlugin(),
      // htmlPlugin(mode)
    ],
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

// TODO: Assess whether the below is needed

// Replace %ENV_VARIABLES% in index.html
// https://vitejs.dev/guide/api-plugin.html#transformindexhtml
// Migration guide: Follow the guide below, you may need to rename your environment variable to a name that begins with VITE_ instead of REACT_APP_
// https://vitejs.dev/guide/env-and-mode.html#html-env-replacement
// function htmlPlugin(mode: string): Plugin {
//   const env = loadEnv(mode, ".", ["REACT_APP_", "NODE_ENV", "PUBLIC_URL"]);
//   console.log("env", env);
//   return {
//     name: "html-plugin",
//     transformIndexHtml: {
//       order: "pre",
//       handler(html) {
//         // console.log("handled", html);
//         return html.replace(/%(.*?)%/g, (match, p1) => {
//           console.log("matched", match, p1, env[p1]);
//           return env[p1] ?? match;
//         });
//       },
//     },
//   };
// }
