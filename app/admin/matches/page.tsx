import MatchForm from "./MatchForm";

export default function AdminPage() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Panel Admin - Jadwal Pertandingan
      </h1>
      <MatchForm />
    </div>
  );
}