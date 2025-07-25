import { useEffect, useState } from "react";

export function useTimedLink() {
  const [showLink, setShowLink] = useState(true); // awalnya tampil

  useEffect(() => {
    const lastClickedAt = Number(
      localStorage.getItem("timedLinkLastClicked") || 0
    );
    const now = Date.now();
    const elapsed = now - lastClickedAt;

    if (elapsed >= 20000) {
      setShowLink(true); // sudah lewat 20 detik, tampilkan link
    } else {
      setShowLink(false); // belum waktunya
      const remaining = 20000 - elapsed;

      const timer = setTimeout(() => {
        setShowLink(true);
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Setelah tampil kembali, kita akan terus periksa apakah dia disembunyikan dan waktunya sudah lewat
    let interval: NodeJS.Timeout | null = null;

    if (!showLink) {
      interval = setInterval(() => {
        const lastClickedAt = Number(
          localStorage.getItem("timedLinkLastClicked") || 0
        );
        const now = Date.now();
        const elapsed = now - lastClickedAt;

        if (elapsed >= 20000) {
          setShowLink(true);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showLink]);

  const handleClick = () => {
    localStorage.setItem("timedLinkLastClicked", Date.now().toString());
    setShowLink(false);
  };

  return { showLink, handleClick };
}
