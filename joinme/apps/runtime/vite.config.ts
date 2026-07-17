import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

function serveThemesPlugin() {
  return {
    name: "serve-themes",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith("/themes/")) {
          const relativePath = req.url.replace(/^\/themes\//, "");
          const cleanPath = relativePath.split("?")[0];
          const filePath = path.resolve(__dirname, "../../themes", cleanPath);
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = "application/octet-stream";
            if (ext === ".js" || ext === ".mjs") contentType = "application/javascript";
            else if (ext === ".css") contentType = "text/css";
            else if (ext === ".json") contentType = "application/json";
            else if (ext === ".html") contentType = "text/html";
            
            res.setHeader("Content-Type", contentType);
            res.end(fs.readFileSync(filePath));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveThemesPlugin()],
  resolve: {
    alias: {
      "@joinme/theme-sdk": path.resolve(__dirname, "../../packages/theme-sdk/src/index.ts")
    }
  }
});
