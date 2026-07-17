import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "BotanicalGardenTheme",
      fileName: (format) => `index.${format}.js`,
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "@joinme/theme-sdk"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@joinme/theme-sdk": "JoinMeSDK"
        }
      }
    }
  }
});
