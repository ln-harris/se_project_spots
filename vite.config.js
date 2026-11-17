import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/se_project_spots/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
