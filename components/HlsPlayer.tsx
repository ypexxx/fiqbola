import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type HlsPlayerProps = {
  src: string;
  urlAds: string;
};

const HlsPlayer: React.FC<HlsPlayerProps> = ({ src, urlAds }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastPopTime = useRef(0);
  const isPlaying = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
      });

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => setIsLoading(false));
    } else {
      alert("HLS tidak didukung di browser ini.");
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !urlAds) return;

    const onPlay = () => {
      isPlaying.current = true;
    };

    const onVideoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Pastikan kliknya di area video, bukan di kontrol
      if (target.tagName.toLowerCase() !== "video") return;

      const now = Date.now();
      if (isPlaying.current && now - lastPopTime.current >= 15000) {
        lastPopTime.current = now;

        // Popup iklan
        const newWin = window.open(urlAds, "_blank");
        if (newWin) {
          newWin.blur();
          window.focus();
          setTimeout(() => window.focus(), 300);
        }
      }
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("click", onVideoClick);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("click", onVideoClick);
    };
  }, [urlAds]);

  return (
    <div className="relative w-[92%] max-w-4xl mx-auto m-4 aspect-video bg-black border-2 border-white rounded-lg shadow-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="w-full h-full object-contain"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-sm">
          Loading video...
        </div>
      )}
    </div>
  );
};

export default HlsPlayer;
