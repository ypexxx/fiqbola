"use client"; // Dibutuhkan karena kita memanggil komponen client-side

import HlsPlayer from "@/components/HlsPlayer";
import Footer from "@/components/Footer";
import MatchSchedule from "@/components/MatchSchedule";;
import FloatingLink from "@/app/stream/FloatingLink";
import dynamic from "next/dynamic";

const AdBanner = dynamic(() => import("@/components/AdBanner"), {
  ssr: false,
})

export default function StreamPage() {
  return (
    <>
      <main className="">
        <div className="flex items-center flex-col justify-center min-h-screen w-full">
          <FloatingLink />
          <img
            src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=1749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover object-center min-h-screen w-full absolute -z-10"
          />
          <HlsPlayer src="https://stream111.b-cdn.net/stream1.m3u8" />
          <MatchSchedule />
          <div className="mt-5"><AdBanner /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
