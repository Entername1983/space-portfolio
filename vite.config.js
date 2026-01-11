import { defineConfig } from "vite";

export default defineConfig({
  base: "",
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
