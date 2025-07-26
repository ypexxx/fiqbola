"use client";
import Image from "next/image";

const scheduleData = [
  {
    id: 1,
    event: "ASEAN Mandiri CUP",
    teams: [
      { name: "INDONESIA U-23", flag: "/images/country/indonesia.png" },
      { name: "VIETNAM U-23", flag: "/images/country/vietnam.png" },
    ],
    day: "Selasa, 28 Juli 2025",
    time: "20.00 WIB",
    status: "SOON",
  },
//   {
//     id: 2,
//     event: "BRI Liga 1",
//     teams: [
//       { name: "PSS Sleman", flag: "/logo.png" },
//       { name: "PERSIJA Jakarta", flag: "/logo.png" },
//     ],
//     day: "Today",
//     time: "17.30 WIB",
//     status: "SOON",
//   },
];

const MatchSchedule = () => {
  return (
    <section className="w-full max-w-xl">
      <div className="mt-10 mb-5 mx-4  rounded-md overflow-hidden">
        <h2 className="bg-[#171D8D] p-1 text-[#00F4E6] font-bold text-xl text-center border-b-2">
          SCHEDULE
        </h2>

        <div className="max-h-[400px] overflow-y-auto backdrop-blur-sm">
          {scheduleData.map(({ id, event, teams, day, time, status }) => (
            <div key={id} className="p-2 border-b-2 border-dotted border-white">
              <div className="flex justify-between">
                <h1 className="text-base font-medium text-black">{event}</h1>
                <span
                  className={`font-bold ${
                    status === "LIVE" ? "text-red-600" : "text-amber-300"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="flex justify-between mt-1">
                <div>
                  {teams.map((team, index) => (
                    <p
                      key={index}
                      className="text-sm text-black flex items-center gap-2"
                    >
                      <Image
                        src={team.flag}
                        alt={team.name}
                        width={20}
                        height={20}
                        className="inline"
                      />
                      {team.name}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col justify-end text-right">
                  <p className="text-base">{day}</p>
                  <p className="text-base">{time}</p>
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
