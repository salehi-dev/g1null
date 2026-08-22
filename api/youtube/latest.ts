import { fetchLatestG1NullVideos } from "../../src/server/youtube";

interface ApiRequest {
  method?: string;
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(statusCode: number): ApiResponse;
  json(body: unknown): void;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({
      success: false,
      error: "Method not allowed.",
      videos: [],
    });
  }

  try {
    const videos = await fetchLatestG1NullVideos();
    response.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    return response.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("[API Error /api/youtube/latest]", error);
    return response.status(500).json({
      success: false,
      error: "Latest videos are temporarily unavailable.",
      videos: [],
    });
  }
}
