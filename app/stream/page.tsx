"use client"; // Dibutuhkan karena kita memanggil komponen client-side

import Image from "next/image";
import HlsPlayer from "@/components/HlsPlayer";
import Footer from "@/components/Footer";
import FloatingLink from "@/app/stream/FloatingLink";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const AdBanner = dynamic(() => import("@/components/AdBanner"), {
  ssr: false,
});

export default function StreamPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex items-center flex-col justify-center min-h-screen w-full relative">
          <FloatingLink />
          <Image
            src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=1749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Streaming background"
            layout="fill"
            objectFit="cover"
            className="-z-10"
            priority
          />
          <HlsPlayer src="https://stream1111.b-cdn.net//stream1.m3u8" />
          <div className="mt-5">
            <AdBanner />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
