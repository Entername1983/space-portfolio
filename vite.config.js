import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isProduction = command === "build";

  return {
    base: "",
    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
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
      legalComments: "none",
    },
    assetsInclude: ["src/templates/**/*.html"],
  };
});
