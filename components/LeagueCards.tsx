// components/LeagueCards.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const leagues = [
  {
    name: "Liga 1",
    logo: "/briLiga1.png",
    link: "/stream",
  },
  {
    name: "EPL",
    logo: "/epl.png",
    link: "/stream",
  },
  {
    name: "La Liga",
    logo: "/laliga.png",
    link: "/stream",
  },
];

export default function LeagueCards() {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-2 lg:gap-5 justify-center items-center p-1 mt-15">
      {leagues.map((league, index) => (
        <div
          key={index}
          onClick={() => router.push(league.link)}
          className="w-30 h-30 lg:w-42 lg:h-40 cursor-pointer bg-white/30 backdrop-blur-md rounded-2xl shadow-md border border-white/20 hover:scale-105 transition-transform flex flex-col items-center justify-center text-white"
        >
          <Image
            src={league.logo}
            alt={`${league.name} logo`}
            width={64}
            height={64}
            className="mb-4"
          />
          <h2 className="text-xl font-semibold text-white">
            {league.name}
          </h2>
        </div>
      ))}
    </div>
  );
}
