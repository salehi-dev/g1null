import React, { useEffect, useState } from 'react';
import { ArrowRight, VideoOff } from 'lucide-react';

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

  useEffect(() => {
    setCurrentSrc(thumbnailUrl);
    setHasError(false);
  }, [thumbnailUrl]);

  const handleImageError = () => {
    if (hasError) return;
    setHasError(true);
    setCurrentSrc(fallbackThumbnailUrl || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
  };

  return (
    <div className="midas-video-card__media">
      <img
        src={currentSrc}
        alt={title}
        loading="lazy"
        onError={handleImageError}
      />
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
        if (!res.ok) throw new Error('Failed to fetch videos');

        const data = await res.json();
        if (!isMounted) return;

        if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
          setVideos(data.videos.slice(0, 8));
        } else {
          setHasError(true);
        }
      } catch {
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadLatestVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="latest-g1null" className="catalog-section catalog-section--videos">
      <div className="catalog-container">
        <div className="catalog-heading-row catalog-heading-row--video">
          <h2 className="catalog-title">g1NULL Video</h2>
          <a
            href="https://www.youtube.com/@g1NULL"
            target="_blank"
            rel="noopener noreferrer"
            className="catalog-see-all"
          >
            <span>See all videos</span>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        {isLoading ? (
          <div className="midas-video-grid" aria-label="Loading videos">
            {Array.from({ length: 8 }, (_, index) => index + 1).map((idx) => (
              <div key={idx} className="midas-video-skeleton" aria-hidden="true">
                <div />
                <span />
                <small />
              </div>
            ))}
          </div>
        ) : hasError || videos.length === 0 ? (
          <div className="video-empty-state">
            <VideoOff aria-hidden="true" />
            <p>Latest videos are temporarily unavailable.</p>
            <a href="https://www.youtube.com/@g1NULL" target="_blank" rel="noopener noreferrer">
              Visit YouTube
            </a>
          </div>
        ) : (
          <div className="midas-video-grid">
            {videos.map((video) => (
              <a
                key={video.videoId}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`video-card-${video.videoId}`}
                className="midas-video-card"
              >
                <YouTubeThumbnail
                  videoId={video.videoId}
                  thumbnailUrl={video.thumbnailUrl}
                  fallbackThumbnailUrl={video.fallbackThumbnailUrl}
                  title={video.title}
                />
                <h3>{video.title}</h3>
                <p>g1NULL · YouTube</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
