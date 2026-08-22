export interface YouTubeVideoItem {
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

const CACHE_DURATION_MS = 30 * 60 * 1000;
const VIDEO_DISPLAY_LIMIT = 8;
const YOUTUBE_CHANNEL_ID = "UCEntWOceT_4muzGj1xYKauQ";

async function readYouTubeResponse(response: Response, requestName: string) {
  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || `${requestName} failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

function normalizeApiKey(value: string | undefined) {
  const trimmedValue = value?.trim();
  if (!trimmedValue) return "";

  const quotedValue = trimmedValue.match(/^(["'])(.*)\1$/s);
  return (quotedValue?.[2] || trimmedValue).trim();
}

function decodeXml(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function fetchLatestVideosFromPublicFeed(): Promise<YouTubeVideoItem[]> {
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
  );

  if (!response.ok) {
    throw new Error(`YouTube public feed failed with status ${response.status}`);
  }

  const xml = await response.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  return entries
    .map((entry): YouTubeVideoItem | null => {
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      if (!videoId || !title) return null;

      return {
        videoId,
        title: decodeXml(title.trim()),
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        fallbackThumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      };
    })
    .filter((video): video is YouTubeVideoItem => video !== null)
    .slice(0, VIDEO_DISPLAY_LIMIT);
}

async function fetchLatestVideosFromDataApi(apiKey: string): Promise<YouTubeVideoItem[]> {
  let channelResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=g1NULL&key=${encodeURIComponent(apiKey)}`,
  );
  let channelData = await readYouTubeResponse(channelResponse, "YouTube channels request");

  if (!channelData.items?.length) {
    channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=%40g1NULL&key=${encodeURIComponent(apiKey)}`,
    );
    channelData = await readYouTubeResponse(channelResponse, "YouTube channels request");
  }

  if (!channelData.items?.length) {
    throw new Error("YouTube channel g1NULL was not found.");
  }

  const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    throw new Error("The YouTube uploads playlist was not found.");
  }

  const videos: YouTubeVideoItem[] = [];
  let nextPageToken: string | undefined;
  let pageCount = 0;

  while (videos.length < VIDEO_DISPLAY_LIMIT && pageCount < 4) {
    pageCount += 1;
    const pageToken = nextPageToken
      ? `&pageToken=${encodeURIComponent(nextPageToken)}`
      : "";
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${encodeURIComponent(uploadsPlaylistId)}&maxResults=20${pageToken}&key=${encodeURIComponent(apiKey)}`,
    );
    const playlistData = await readYouTubeResponse(
      playlistResponse,
      "YouTube playlist request",
    );

    if (!playlistData.items?.length) break;

    const videoIds: string[] = [];
    for (const item of playlistData.items) {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      if (videoId && !videoIds.includes(videoId)) videoIds.push(videoId);
    }

    if (!videoIds.length) break;

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails,contentDetails&id=${videoIds.join(",")}&key=${encodeURIComponent(apiKey)}`,
    );
    const videosData = await readYouTubeResponse(videosResponse, "YouTube videos request");
    const detailsById = new Map<string, any>();

    for (const video of videosData.items || []) {
      detailsById.set(video.id, video);
    }

    for (const videoId of videoIds) {
      const details = detailsById.get(videoId);
      if (!details) continue;

      const isLiveStream =
        Boolean(details.liveStreamingDetails) ||
        (details.snippet?.liveBroadcastContent &&
          details.snippet.liveBroadcastContent !== "none");
      if (isLiveStream) continue;

      const thumbnails = details.snippet?.thumbnails || {};
      videos.push({
        videoId,
        title: details.snippet?.title || "g1NULL Video",
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl:
          thumbnails.maxres?.url ||
          thumbnails.standard?.url ||
          thumbnails.high?.url ||
          thumbnails.medium?.url ||
          thumbnails.default?.url ||
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        fallbackThumbnailUrl:
          thumbnails.high?.url ||
          thumbnails.medium?.url ||
          thumbnails.default?.url ||
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      });

      if (videos.length >= VIDEO_DISPLAY_LIMIT) break;
    }

    nextPageToken = playlistData.nextPageToken;
    if (!nextPageToken) break;
  }

  return videos.slice(0, VIDEO_DISPLAY_LIMIT);
}

export async function fetchLatestG1NullVideos(): Promise<YouTubeVideoItem[]> {
  const now = Date.now();
  if (videoCache && videoCache.expiresAt > now && videoCache.videos.length > 0) {
    return videoCache.videos;
  }

  const apiKey = normalizeApiKey(process.env.YOUTUBE_API_KEY);
  let latestVideos: YouTubeVideoItem[] = [];

  if (apiKey) {
    try {
      latestVideos = await fetchLatestVideosFromDataApi(apiKey);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown YouTube API error";
      console.warn(`[YouTube Data API] ${message}; using the public feed fallback.`);
    }
  } else {
    console.warn("[YouTube Data API] YOUTUBE_API_KEY is missing; using the public feed fallback.");
  }

  if (latestVideos.length === 0) {
    latestVideos = await fetchLatestVideosFromPublicFeed();
  }

  if (latestVideos.length === 0) {
    throw new Error("YouTube returned no videos.");
  }

  videoCache = {
    videos: latestVideos,
    expiresAt: now + CACHE_DURATION_MS,
  };

  return latestVideos;
}
