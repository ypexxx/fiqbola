"use client";

export default function Dashboard() {
  async function handleLogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        // Redirect ke halaman login
        window.location.href = "/login";
      } else {
        console.error("Gagal logout");
      }
    } catch (err) {
      console.error("Error saat logout:", err);
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
