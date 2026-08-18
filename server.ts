import express from "express";
import path from "path";
import http from "http";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

interface YouTubeVideoItem {
  videoId: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  fallbackThumbnailUrl?: string;
}

interface CacheState {
  videos: YouTubeVideoItem[];
  expiresAt: number;
}

let videoCache: CacheState | null = null;
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

async function fetchLatestG1NullVideos(): Promise<YouTubeVideoItem[]> {
  const now = Date.now();
  if (videoCache && videoCache.expiresAt > now && videoCache.videos.length > 0) {
    return videoCache.videos;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error("[YouTube API] YOUTUBE_API_KEY environment variable is not defined.");
    throw new Error("YOUTUBE_API_KEY is not configured on the server.");
  }

  // 1. Retrieve channel information using handle: g1NULL
  // Use channels.list with part=contentDetails&forHandle=g1NULL
  let channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=g1NULL&key=${encodeURIComponent(apiKey)}`
  );

  // If forHandle=g1NULL fails or returns no items, try forHandle=@g1NULL
  let channelData = await channelRes.json();
  if (!channelData.items || channelData.items.length === 0) {
    const retryRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=%40g1NULL&key=${encodeURIComponent(apiKey)}`
    );
    channelData = await retryRes.json();
  }

  if (!channelData.items || channelData.items.length === 0) {
    console.error("[YouTube API] Channel g1NULL not found or invalid response:", channelData.error?.message || "No items");
    throw new Error("YouTube channel not found");
  }

  const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    console.error("[YouTube API] Could not find uploads playlist ID for channel.");
    throw new Error("Uploads playlist not found");
  }

  // 2. Fetch uploads in batches and filter out livestreams / archived streams using videos.list
  const normalVideos: YouTubeVideoItem[] = [];
  let nextPageToken: string | undefined = undefined;
  let pageCount = 0;
  const maxPages = 4; // Safety cap to avoid infinite loops

  while (normalVideos.length < 3 && pageCount < maxPages) {
    pageCount++;
    const pageTokenParam = nextPageToken ? `&pageToken=${encodeURIComponent(nextPageToken)}` : "";
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${encodeURIComponent(uploadsPlaylistId)}&maxResults=20${pageTokenParam}&key=${encodeURIComponent(apiKey)}`;

    const playlistRes = await fetch(playlistUrl);
    const playlistData = await playlistRes.json();

    if (!playlistData.items || !Array.isArray(playlistData.items) || playlistData.items.length === 0) {
      break;
    }

    // Preserve the order of video IDs from the uploads playlist (newest first)
    const playlistVideoIds: string[] = [];
    for (const item of playlistData.items) {
      const vidId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      if (vidId && !playlistVideoIds.includes(vidId)) {
        playlistVideoIds.push(vidId);
      }
    }

    if (playlistVideoIds.length === 0) {
      break;
    }

    // Query videos.list to check for liveStreamingDetails and contentDetails
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails,contentDetails&id=${playlistVideoIds.join(",")}&key=${encodeURIComponent(apiKey)}`
    );
    const videosData = await videosRes.json();

    const videoDetailsMap = new Map<string, any>();
    if (videosData.items && Array.isArray(videosData.items)) {
      for (const v of videosData.items) {
        videoDetailsMap.set(v.id, v);
      }
    }

    // Process in playlist order (newest first)
    for (const vidId of playlistVideoIds) {
      const videoDetail = videoDetailsMap.get(vidId);
      if (!videoDetail) continue;

      // Filter out live streams, upcoming live streams, and archived/completed live streams:
      // Any video with liveStreamingDetails or non-'none' liveBroadcastContent is a livestream
      const isLiveStream =
        Boolean(videoDetail.liveStreamingDetails) ||
        (videoDetail.snippet?.liveBroadcastContent && videoDetail.snippet.liveBroadcastContent !== "none");

      if (isLiveStream) {
        continue;
      }

      const title = videoDetail.snippet?.title || "g1NULL Video";
      const youtubeUrl = `https://www.youtube.com/watch?v=${vidId}`;
      const thumbnails = videoDetail.snippet?.thumbnails || {};

      // Choose the highest useful available quality: maxres -> standard -> high -> medium -> default
      const thumbnailUrl =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;

      const fallbackThumbnailUrl =
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;

      normalVideos.push({
        videoId: vidId,
        title,
        youtubeUrl,
        thumbnailUrl,
        fallbackThumbnailUrl,
      });

      if (normalVideos.length >= 3) {
        break;
      }
    }

    nextPageToken = playlistData.nextPageToken;
    if (!nextPageToken) {
      break;
    }
  }

  const finalVideos = normalVideos.slice(0, 3);

  // Store in cache for 30 minutes
  videoCache = {
    videos: finalVideos,
    expiresAt: now + CACHE_DURATION_MS,
  };

  return finalVideos;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
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
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
