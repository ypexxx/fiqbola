import Image from "next/image";
import Navbar from "@/components/Navbar";
import MatchSchedule from "@/components/MatchSchedule";
import LeagueCards from "@/components/LeagueCards";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <img
          src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=1749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="fixed top-0 left-0 w-full h-full object-cover object-center -z-10 will-change-transform translate-z-0"
        />

        <div className="container min-w-screen flex flex-col items-center text-center">
          <div className="mx-auto flex flex-col items-center mt-20">
            <img
              src="/logo.png"
              className="mb-5"
              width="200"
              height="200"
              alt="Logo"
            />
            <a href="/stream">
              <button
                type="button"
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                🎥 Watch Live!
              </button>
            </a>
            <LeagueCards />
          </div>

          <MatchSchedule />
        </div>
      </main>
    </>
  );
}
