import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type HlsPlayerProps = {
  src: string;
  urlAds: string;
};

const HlsPlayer: React.FC<HlsPlayerProps> = ({ src, urlAds }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const overlayTimer = useRef<NodeJS.Timeout | null>(null);

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

  // Fungsi untuk membuka popunder
  const openPopunder = () => {
    const adWin = window.open(urlAds, "_blank");
    if (adWin) {
      try {
        adWin.blur();
        window.focus();
        setTimeout(() => window.focus(), 200);
      } catch (err) {
        console.error("Popunder gagal:", err);
      }
    }
  };

  // Fungsi klik overlay
  const handleOverlayClick = () => {
    setShowOverlay(false);
    openPopunder();

    // Munculkan lagi overlay setelah 15 detik
    if (overlayTimer.current) clearTimeout(overlayTimer.current);
    overlayTimer.current = setTimeout(() => {
      setShowOverlay(true);
    }, 15000);
  };

  useEffect(() => {
    return () => {
      if (overlayTimer.current) clearTimeout(overlayTimer.current);
    };
  }, []);

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

      {/* Overlay penuh */}
      {showOverlay && !isLoading && (
        <div
          onClick={handleOverlayClick}
          className="absolute inset-0 bg-transparent cursor-pointer z-20"
        />
      )}
    </div>
  );
};

export default HlsPlayer;
