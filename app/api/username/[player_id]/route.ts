//app/api/username/[player_id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { player_id: string } }
) {
  const id = params.player_id;
  const user = await prisma.player.findUnique({
    where: {
      player_id: parseInt(id, 10),
    },
    select: {
      username: true, // Assuming the field to fetch is 'username'
    },
  });

  if (user) {
    return NextResponse.json({ username: user.username });
  } else {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
