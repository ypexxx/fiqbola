"use client"; // Dibutuhkan karena kita memanggil komponen client-side

import HlsPlayer from "@/components/HlsPlayer";

export default function StreamPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-black">
      <HlsPlayer src="https://murah123.b-cdn.net/test.m3u8" />
    </main>
  );
}
