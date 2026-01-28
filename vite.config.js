import { resolve } from "path"; // <--- Add this import
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isProduction = command === "build";

  return {
    base: "./", // Use "./" for relative paths in the built index.html
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
      minify: "esbuild",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          "coming-soon": resolve(__dirname, "src/templates/coming-soon.html"),
          bio: resolve(__dirname, "src/templates/bio.html"),
          buttons: resolve(__dirname, "src/templates/buttons.html"),
          design: resolve(__dirname, "src/templates/design.html"),
          log: resolve(__dirname, "src/templates/log.html"),
          projects: resolve(__dirname, "src/templates/projects.html"),
        },
      },
    },
  };
});
