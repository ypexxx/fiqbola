"use client";

import { useEffect } from "react";

export default function AntiInspect() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // cegah menu klik kanan

      // Buat event klik kiri palsu
      const leftClickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 0, // 0 = klik kiri
      });

      // Trigger klik kiri di elemen target
      e.target && (e.target as HTMLElement).dispatchEvent(leftClickEvent);
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null;
}
