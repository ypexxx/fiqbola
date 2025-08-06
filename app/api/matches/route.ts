import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const connection = await db;
  const [rows]: any = await connection.query(
    "SELECT * FROM matches ORDER BY matchDate, matchTime"
  );
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const connection = await db;
  const query = `
    INSERT INTO matches (homeTeam, awayTeam, homeLogo, awayLogo, matchDate, matchTime, status, venue)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await connection.query(query, [
    data.homeTeam || null,
    data.awayTeam || null,
    data.homeLogo || null,
    data.awayLogo || null,
    data.matchDate || null,
    data.matchTime || null,
    data.status || null,
    data.venue || null, // ✅ venue ditambahkan
  ]);

  return NextResponse.json({ message: "Match added successfully" });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const connection = await db;
  const query = `
    UPDATE matches SET
      homeTeam = ?,
      awayTeam = ?,
      homeLogo = ?,
      awayLogo = ?,
      matchDate = ?,
      matchTime = ?,
      status = ?,
      venue = ?
    WHERE id = ?
  `;
  await connection.query(query, [
    data.homeTeam,
    data.awayTeam,
    data.homeLogo,
    data.awayLogo,
    data.matchDate,
    data.matchTime,
    data.status,
    data.venue, 
    data.id,
  ]);

  return NextResponse.json({ message: "Match updated successfully" });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "ID tidak ditemukan" },
      { status: 400 }
    );
  }

  const connection = await db;

  try {
    await connection.query("DELETE FROM matches WHERE id = ?", [id]);
    return NextResponse.json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Gagal menghapus:", error);
    return NextResponse.json({ message: "Gagal menghapus" }, { status: 500 });
  }
}
