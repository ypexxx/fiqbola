"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MatchSchedule = () => {
  const [matches, setMatches] = useState<any[]>([]);

  const fetchMatches = async () => {
    const res = await fetch("/api/matches");
    const data = await res.json();
    setMatches(data);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const formatTanggal = (dateStr: string): string => {
    if (!dateStr) return "Tanggal tidak valid";

    // Buat objek Date tanpa menyertakan zona waktu eksplisit
    const date = new Date(dateStr);

    // Gunakan toLocaleDateString dengan opsi zona waktu Indonesia
    return date.toLocaleDateString("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  };


  const formatWaktu = (timeStr: string): string => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    return `${hour}.${minute} WIB`;
  };

  return (
    <section className="w-full max-w-xl">
      <div className="mt-10 mb-5 mx-4 rounded-md overflow-hidden">
        <h2 className="backdrop-blur-lg bg-[#171D8D] p-1 text-[#00F4E6] font-bold text-xl text-center border-b-2">
          SCHEDULE
        </h2>

        <div className="max-h-[400px] overflow-y-auto backdrop-blur-sm">
          {matches.map((match) => (
            <div
              key={match.id}
              className="p-2 border-b-2 border-dotted bg-white/10 border-white"
            >
              <div className="flex justify-between">
                <h1 className="text-base font-medium text-black">
                  {match.venue}
                </h1>
                <span
                  className={`font-bold ${
                    match.status === "Live" ? "text-red-600" : "text-black/80"
                  }`}
                >
                  {match.status?.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between mt-1">
                <div>
                  <p className="text-sm text-black/80 flex items-center gap-2 mb-1">
                    {match.homeLogo && (
                      <Image
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        width={20}
                        height={20}
                      />
                    )}
                    {match.homeTeam}
                  </p>
                  <p className="text-sm text-black/80 flex items-center gap-2">
                    {match.awayLogo && (
                      <Image
                        src={match.awayLogo}
                        alt={match.awayTeam}
                        width={20}
                        height={20}
                      />
                    )}
                    {match.awayTeam}
                  </p>
                </div>
                <div className="flex flex-col justify-end text-right">
                  <p className="text-base text-black/80">
                    {formatTanggal(match.matchDate)}
                  </p>
                  <p className="text-base text-black/80">
                    {formatWaktu(match.matchTime)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchSchedule;
