import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Router from 'next/router';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Authentication required" });
    }

    // Fix: Access correct user property
    const currentPlayerId = Number(session.user.id);

    const body = await req.json();
    const { liked_player_id } = body;
    const likedPlayerId = Number(liked_player_id);

    // Check if the player is trying to dislike themselves
    if (liked_player_id === currentPlayerId) {
      return NextResponse.json({ message: "You cannot like yourself" });
    }

    // Check if the dislike relationship already exists
    const existingDislike = await prisma.likedProfile.findUnique({
      where: {
        player_id_liked_player_id: {
          player_id: currentPlayerId,
          liked_player_id: liked_player_id,
        },
      },
    });

    if (existingDislike) {
      return NextResponse.json({
        message: "You have already liked this player",
      });
    }

    // Create the dislike relationship
    await prisma.likedProfile.create({
      data: {
        player_id: currentPlayerId,
        liked_player_id,
      },
    });

    return NextResponse.json({ message: "Player liked successfully route.tsx" }) 
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}


