"use client";

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
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi mobile
  useEffect(() => {
    const mobileCheck = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

  // Load HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => setIsLoading(false));
    } else {
      alert("HLS tidak didukung di browser ini.");
    }
  }, [src]);

  // Track play state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      isPlaying.current = true;
    };
    const onPause = () => {
      isPlaying.current = false;
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    // Event klik iklan di desktop
    const onClickWhilePlaying = () => {
      if (!isMobile) {
        const now = Date.now();
        if (isPlaying.current && now - lastPopTime.current >= 15000) {
          lastPopTime.current = now;
          const newWin = window.open(urlAds, "_blank");
          if (newWin) {
            newWin.blur();
            window.focus();
          }
        }
      }
    };
    if (!isMobile) {
      video.addEventListener("click", onClickWhilePlaying);
    }

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      if (!isMobile) {
        video.removeEventListener("click", onClickWhilePlaying);
      }
    };
  }, [urlAds, isMobile]);

  // Klik iklan + play/pause (untuk mobile overlay)
  const handleAdClickMobile = (e: React.MouseEvent) => {
    const now = Date.now();

    // Buka iklan (cooldown 15 detik)
    if (isPlaying.current && now - lastPopTime.current >= 15000) {
      lastPopTime.current = now;
      const newWin = window.open(urlAds, "_blank");
      if (newWin) {
        newWin.blur();
        window.focus();
      }
    }

    // Simulasikan klik kiri video (play/pause)
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <div className="relative w-[92%] max-w-4xl mx-auto m-4 aspect-video bg-black border-2 border-white rounded-lg shadow-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        playsInline
        className="w-full h-full object-contain"
      />

      {/* Overlay hanya muncul di mobile */}
      {isMobile && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleAdClickMobile}
        />
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-sm z-20">
          Loading video...
        </div>
      )}
    </div>
  );
};

export default HlsPlayer;
