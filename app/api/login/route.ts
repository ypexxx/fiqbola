// app/api/login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  const connection = await db;
  const [rows]: any = await connection.query(
    "SELECT * FROM admins WHERE username = ?",
    [username]
  );
  const user = rows[0];

  if (!user) {
    return NextResponse.json(
      { error: "User tidak ditemukan" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const token = signToken({ id: user.id, username: user.username });

  const response = NextResponse.json({ message: "Login berhasil" });
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
