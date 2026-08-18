import React, { useEffect, useState } from 'react';
import { Play, Youtube, ArrowRight, VideoOff } from 'lucide-react';

export interface YouTubeVideoItem {
  videoId: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  fallbackThumbnailUrl?: string;
}

interface YouTubeThumbnailProps {
  thumbnailUrl: string;
  fallbackThumbnailUrl?: string;
  videoId: string;
  title: string;
}

export function YouTubeThumbnail({
  thumbnailUrl,
  fallbackThumbnailUrl,
  videoId,
  title,
}: YouTubeThumbnailProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(thumbnailUrl);
  const [hasError, setHasError] = useState<boolean>(false);

  // Update src if thumbnailUrl changes
  useEffect(() => {
    setCurrentSrc(thumbnailUrl);
    setHasError(false);
  }, [thumbnailUrl]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback =
        fallbackThumbnailUrl ||
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      setCurrentSrc(fallback);
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#080A0D]">
      {/* Full-bleed YouTube thumbnail taking full width of card */}
      <img
        src={currentSrc}
        alt={title}
        loading="lazy"
        onError={handleImageError}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Clean Hover Play Indicator */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
        <div className="w-11 h-11 rounded-full bg-[#25D9F8] text-[#080A0D] flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-200">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
      </div>
    </div>
  );
}

export default function LatestFromG1Null() {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadLatestVideos() {
      try {
        setIsLoading(true);
        setHasError(false);

        const res = await fetch('/api/youtube/latest');
        if (!res.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await res.json();
        if (isMounted) {
          if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
            setVideos(data.videos.slice(0, 3));
          } else {
            setHasError(true);
          }
        }
      } catch (err) {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadLatestVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="latest-g1null" className="py-12 sm:py-16 border-b border-white/[0.06] bg-[#080A0D] relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-tactical-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#11161D] border border-white/[0.08] text-[#25D9F8] text-xs font-semibold uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D9F8]" />
              <span>YOUTUBE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
              LATEST VIDEOS
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-1.5">
              Recent gameplay, competitive highlights, and guides.
            </p>
          </div>

          <div>
            <a
              href="https://www.youtube.com/@g1NULL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#11161D] hover:bg-[#161C24] border border-white/[0.08] hover:border-white/[0.2] text-xs font-bold uppercase tracking-wider text-[#F5F7FA] hover:text-[#25D9F8] transition-colors"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Visit My Channel</span>
            </a>
          </div>
        </div>

        {/* Dynamic Video Rendering: Loading Skeletons, Error State, or 3 Video Cards */}
        {isLoading ? (
          /* 3 Skeleton placeholders matching video card dimensions */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex flex-col animate-pulse">
                <div className="aspect-video w-full rounded-lg bg-[#11161D] mb-3.5" />
                <div className="h-5 bg-[#11161D] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#11161D] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : hasError || videos.length === 0 ? (
          /* Subtle Error State */
          <div className="p-8 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#11161D] text-[#8B95A5] flex items-center justify-center mx-auto">
              <VideoOff className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#C5CEDD]">
                Latest videos are temporarily unavailable.
              </p>
              <p className="text-xs text-[#7E8B9F] mt-1">
                You can browse all recent uploads and highlights directly on YouTube.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://www.youtube.com/@g1NULL"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D9F8] hover:bg-[#18C4E2] text-[#080A0D] font-bold text-xs uppercase tracking-wider transition-all duration-150"
              >
                <span>Visit My YouTube</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* 3 Active Video Cards Grid — flat, image-first, no card shell */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {videos.map((video) => (
              <a
                key={video.videoId}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`video-card-${video.videoId}`}
                className="group flex flex-col cursor-pointer"
              >
                {/* 1. Full-Width 16:9 Thumbnail — fills the card, no border/frame */}
                <div className="rounded-lg overflow-hidden">
                  <YouTubeThumbnail
                    videoId={video.videoId}
                    thumbnailUrl={video.thumbnailUrl}
                    fallbackThumbnailUrl={video.fallbackThumbnailUrl}
                    title={video.title}
                  />
                </div>

                {/* 2. Title + Watch Action */}
                <h3 className="mt-3.5 font-heading font-bold text-sm sm:text-base text-[#F5F7FA] uppercase tracking-tight group-hover:text-[#25D9F8] transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B95A5] group-hover:text-[#25D9F8] transition-colors">
                  <span>WATCH VIDEO</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
