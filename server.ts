import express from "express";
import path from "path";
import http from "http";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { fetchLatestG1NullVideos } from "./src/server/youtube";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const httpServer = http.createServer(app);

  app.use(express.json());

  // API endpoint for latest YouTube videos
  app.get("/api/youtube/latest", async (req, res) => {
    try {
      const videos = await fetchLatestG1NullVideos();
      res.json({ success: true, videos });
    } catch (err: any) {
      console.error("[API Error /api/youtube/latest]:", err.message);
      res.status(500).json({
        success: false,
        error: "Latest videos are temporarily unavailable.",
        videos: [],
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        // Reuse the same HTTP server so the HMR WebSocket is served on the
        // same port as the app instead of spinning up a separate one, which
        // the preview proxy can't tunnel (causing "WebSocket closed without
        // opened" errors).
        hmr: { server: httpServer },
      },
      appType: "mpa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
