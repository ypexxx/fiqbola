"use client"; // WAJIB jika pakai App Router

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key' : '36258ce007a46210cc5318e2c502b8a2',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src =
      "//pasteldrowsyaboriginal.com/36258ce007a46210cc5318e2c502b8a2/invoke.js";

    if (adRef.current) {
      adRef.current.innerHTML = "";
      adRef.current.appendChild(script1);
      adRef.current.appendChild(script2);
    }
  }, []);

  return <div ref={adRef} className="my-6 text-center" />;
}
