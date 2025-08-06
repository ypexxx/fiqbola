"use client";

import { useState, useEffect } from "react";

type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  matchDate: string;
  matchTime: string;
  status: string;
  venue: string;
};


const initialForm = {
  id: "",
  homeTeam: "",
  awayTeam: "",
  homeLogo: "",
  awayLogo: "",
  matchTime: "",
  matchDate: "",
  status: "",
  venue: "",
};

const teams = [
  // Liga 1 Indonesia
  { name: "Arema FC", logo: "/images/club/arema.png" },
  { name: "Bali United", logo: "/images/club/baliUnited.png" },
  { name: "Bhayangkara", logo: "/images/club/bhayangkara.png" },
  { name: "Borneo FC", logo: "/images/club/borneo.png" },
  { name: "Dewa United", logo: "/images/club/dewaUnited.png" },
  { name: "Madura United", logo: "/images/club/maduraUnited.png" },
  { name: "Malut United", logo: "/images/club/malutUnited.png" },
  { name: "Persebaya Surabaya", logo: "/images/club/persebayaSurabaya.png" },
  { name: "Persib Bandung", logo: "/images/club/persibBandung.png" },
  { name: "Persija Jakarta", logo: "/images/club/persijaJakarta.png" },
  { name: "Persijap Jepara", logo: "/images/club/persijapJepara.png" },
  { name: "Persis Solo", logo: "/images/club/persisSolo.png" },
  { name: "Persita Tangerang", logo: "/images/club/persitaTangerang.png" },
  { name: "PSBS Biak", logo: "/images/club/psbsBiak.png" },
  { name: "PSIM Yogyakarta", logo: "/images/club/psimYogyakarta.png" },
  { name: "PSM Makassar", logo: "/images/club/psmMakassar.png" },
  { name: "Semen Padang", logo: "/images/club/semenPadang.png" },

  // Premiere League
  { name: "Arsenal", logo: "/images/club/arsenal.png" },
  { name: "Aston Filla", logo: "/images/club/astonFilla.png" },
  { name: "Bournemouth", logo: "/images/club/bournemouth.png" },
  { name: "Brentford", logo: "/images/club/brentford.png" },
  { name: "Brighton", logo: "/images/club/brighton.png" },
  { name: "Burnley", logo: "/images/club/burnley.png" },
  { name: "Chelsea", logo: "/images/club/chelsea.png" },
  { name: "Crystal Palace", logo: "/images/club/crystalPalace.png" },
  { name: "Everton", logo: "/images/club/everton.png" },
  { name: "Fulham", logo: "/images/club/fulham.png" },
  { name: "Leeds United", logo: "/images/club/leedsUnited.png" },
  { name: "Liverpool", logo: "/images/club/liverpool.png" },
  { name: "Manchester City", logo: "/images/club/manchesterCity.png" },
  { name: "Manchester United", logo: "/images/club/manchesterUnited.png" },
  { name: "Newcastle United", logo: "/images/club/newcastleUnited.png" },
  { name: "Nottingham Forest", logo: "/images/club/nottinghamForest.png" },
  { name: "Sunderland", logo: "/images/club/sunderland.png" },
  { name: "Tottenham Hotspur", logo: "/images/club/tottenhamHotspur.png" },
  { name: "West Ham", logo: "/images/club/westhamUnited.png" },
  { name: "Wolverhampton", logo: "/images/club/wolverhampton.png" },

  // La liga
  { name: "Alaves", logo: "/images/club/alaves.png" },
  { name: "Athletic Bilbao", logo: "/images/club/athleticBilbao.png" },
  { name: "Atletico Madrid", logo: "/images/club/atleticoMadrid.png" },
  { name: "Barcelona FC", logo: "/images/club/barcelona.png" },
  { name: "Celta Vigo", logo: "/images/club/celtaVigo.png" },
  { name: "Elche", logo: "/images/club/elche.png" },
  { name: "Espanyol", logo: "/images/club/espanyol.png" },
  { name: "Getafe", logo: "/images/club/getafe.png" },
  { name: "Girona", logo: "/images/club/girona.png" },
  { name: "Levante", logo: "/images/club/levante.png" },
  { name: "Mallorca", logo: "/images/club/mallorca.png" },
  { name: "Osasuna", logo: "/images/club/osasuna.png" },
  { name: "Rayo Vallecano", logo: "/images/club/rayoVallecano.png" },
  { name: "Real Betis", logo: "/images/club/realBetis.png" },
  { name: "Real Madrid", logo: "/images/club/realMadrid.png" },
  { name: "Real Oviedo", logo: "/images/club/realOviedo.png" },
  { name: "Real Sociedad", logo: "/images/club/realSociedad.png" },
  { name: "Sevilla", logo: "/images/club/sevilla.png" },
  { name: "Valencia", logo: "/images/club/valencia.png" },
  { name: "Villarreal", logo: "/images/club/villarreal.png" },
];

const statuses = ["Upcoming", "Live", "Finished"];

export default function MatchForm() {
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "homeTeam") {
      const selectedTeam = teams.find((team) => team.name === value);
      setForm({ ...form, homeTeam: value, homeLogo: selectedTeam?.logo || "" });
    } else if (name === "awayTeam") {
      const selectedTeam = teams.find((team) => team.name === value);
      setForm({ ...form, awayTeam: value, awayLogo: selectedTeam?.logo || "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const isFormValid = () => {
    return (
      form.homeTeam &&
      form.awayTeam &&
      form.matchDate &&
      form.matchTime &&
      form.status
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Semua field wajib diisi.");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const res = await fetch("/api/matches", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Berhasil disimpan!");
      setForm(initialForm);
      setIsEditing(false);
      setShowModal(false);
      setError("");
      fetchMatches();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus jadwal ini?")) return;
    const res = await fetch(`/api/matches?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Jadwal berhasil dihapus.");
      fetchMatches();
    }
  };

  const fetchMatches = async () => {
    const res = await fetch("/api/matches");
    const data = await res.json();
    setMatches(data);
  };

  useEffect(() => {
    fetchMatches();
    const handleEdit = (e: CustomEvent) => {
      setForm({
        id: e.detail.id || "",
        homeTeam: e.detail.homeTeam || "",
        awayTeam: e.detail.awayTeam || "",
        homeLogo: e.detail.homeLogo || "",
        awayLogo: e.detail.awayLogo || "",
        matchTime: e.detail.matchTime || "",
        matchDate: e.detail.matchDate || "",
        status: e.detail.status || "",
        venue: e.detail.venue || "", // ✅ Ambil venue
      });
      setIsEditing(true);
      setShowModal(true);
      setError("");
    };
    window.addEventListener("edit-match", handleEdit as EventListener);
    return () =>
      window.removeEventListener("edit-match", handleEdit as EventListener);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <button
        onClick={() => {
          setForm(initialForm);
          setIsEditing(false);
          setShowModal(true);
          setError("");
        }}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Tambah Jadwal
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {isEditing
                ? "Edit Jadwal Pertandingan"
                : "Tambah Jadwal Pertandingan"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 grid-cols-1 sm:grid-cols-2"
            >
              <div>
                <label className="block mb-1 font-medium">Tim Tuan Rumah</label>
                <select
                  name="homeTeam"
                  value={form.homeTeam}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Pilih Tim</option>
                  {teams.map((team) => (
                    <option key={team.name} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Tim Tamu</label>
                <select
                  name="awayTeam"
                  value={form.awayTeam}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Pilih Tim</option>
                  {teams.map((team) => (
                    <option key={team.name} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Tanggal Pertandingan
                </label>
                <input
                  type="date"
                  name="matchDate"
                  value={form.matchDate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Waktu Pertandingan
                </label>
                <input
                  type="time"
                  name="matchTime"
                  value={form.matchTime}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="col-span-full">
                <label className="block mb-1 font-medium">
                  Event Pertandingan
                </label>
                <input
                  type="text"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Status Pertandingan
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Pilih Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="col-span-full text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="col-span-full">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Tambah"} Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="p-4 bg-white border rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              {match.homeLogo && (
                <img
                  src={match.homeLogo}
                  alt="home"
                  className="h-8 w-8 object-contain"
                />
              )}
              <span className="font-semibold">{match.homeTeam}</span>
              <span className="mx-2">vs</span>
              <span className="font-semibold">{match.awayTeam}</span>
              {match.awayLogo && (
                <img
                  src={match.awayLogo}
                  alt="away"
                  className="h-8 w-8 object-contain"
                />
              )}
            </div>
            <div className="text-sm text-gray-600 text-right">
              {match.matchDate} - {match.matchTime} ({match.status})<br />
              <span className="italic">{match.venue}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("edit-match", { detail: match })
                  )
                }
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(match.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
