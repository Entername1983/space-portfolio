import { defineConfig } from "vite";

export default defineConfig({
  base: "",
  esbuild: {
    drop: ["console", "debugger"],
  },
  css: {
    devSourcemap: true,
    postcss: {
      map: true,
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
