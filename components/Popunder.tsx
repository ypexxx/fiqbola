"use client";

import { useEffect, useRef } from "react";

export default function ExternalAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Bersihkan isi sebelum inject script
    adRef.current.innerHTML = "";

    // Buat elemen script eksternal
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//pasteldrowsyaboriginal.com/ee/20/07/ee200799c6ff3cae04099ba1c85d4caa.js";

    adRef.current.appendChild(script);
  }, []);

  return <div ref={adRef} className="my-6 text-center" />;
}
