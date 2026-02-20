import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const appRoot = __dirname;

function firstExistingPath(paths: string[]): string {
  const found = paths.find((candidate) =>
    fs.existsSync(path.resolve(appRoot, candidate)),
  );
  if (!found) {
    throw new Error(`No valid alias path found. Checked: ${paths.join(", ")}`);
  }

  return path.resolve(appRoot, found);
}

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      {
        find: /^fast-deep-equal$/,
        replacement: path.resolve(appRoot, "src/vendor/fastDeepEqual.ts"),
      },
      {
        find: "src",
        replacement: path.resolve(appRoot, "src"),
      },
      {
        find: "react-controls",
        replacement: firstExistingPath([
          "externals/react-controls/src",
          "node_modules/react-controls/src",
        ]),
      },
    ],
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      mode === "production" ? "production" : "development",
    ),
    "process.env.REACT_APP_BUILD_MODE": JSON.stringify("WEB"),
    "process.env.REACT_APP_BUILD_DATE": JSON.stringify(String(Date.now())),
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        quietDeps: true,
        silenceDeprecations: [
          "legacy-js-api",
          "import",
          "global-builtin",
          "slash-div",
          "color-functions",
          "if-function",
        ],
      },
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    host: "localhost",
    port: 9090,
    strictPort: true,
  },
}));
