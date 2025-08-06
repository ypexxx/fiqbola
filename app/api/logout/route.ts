// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout berhasil" });

  // Hapus cookie dengan cara overwrite dan set maxAge = 0
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
