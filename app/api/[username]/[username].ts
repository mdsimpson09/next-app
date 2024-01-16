//app/api/[username]/[username].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");

  try {
    const player = await prisma.player.findUnique({
      where: {
        username: username,
      },
      select: {
        first_name: true,
        username: true,
        bio: true,
        looking_for: true,
        image: true,
      },
    });

    if (!player) {
      return NextResponse.json(
        { message: "Player not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ player }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong :(" },
       { status: 500 }
    );
  }
}
