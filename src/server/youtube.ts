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

async function readYouTubeResponse(response: Response, requestName: string) {
  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || `${requestName} failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export async function fetchLatestG1NullVideos(): Promise<YouTubeVideoItem[]> {
  const now = Date.now();
  if (videoCache && videoCache.expiresAt > now && videoCache.videos.length > 0) {
    return videoCache.videos;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not configured on the server.");
  }

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

  const latestVideos = videos.slice(0, VIDEO_DISPLAY_LIMIT);
  videoCache = {
    videos: latestVideos,
    expiresAt: now + CACHE_DURATION_MS,
  };

  return latestVideos;
}
