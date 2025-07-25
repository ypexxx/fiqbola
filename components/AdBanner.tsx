"use client"; // WAJIB jika pakai App Router

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key' : '9552af4780abcbd8bc0322966ff0c489',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src =
      "//www.highperformanceformat.com/9552af4780abcbd8bc0322966ff0c489/invoke.js";

    if (adRef.current) {
      adRef.current.innerHTML = "";
      adRef.current.appendChild(script1);
      adRef.current.appendChild(script2);
    }
  }, []);

  return <div ref={adRef} className="my-6 text-center" />;
}
