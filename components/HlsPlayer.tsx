"use client"; // wajib jika pakai useEffect di App Router

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type HlsPlayerProps = {
  src: string;
};

const HlsPlayer: React.FC<HlsPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      alert("HLS tidak didukung di browser ini.");
    }
  }, [src]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full max-w-4xl border-4 border-white rounded-lg shadow-lg"
      />
    </div>
  );
};

export default HlsPlayer;
