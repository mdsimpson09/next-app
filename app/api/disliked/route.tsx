import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    const currentPlayer_id = session.user.player_id;

    const { player_id, disliked_player_id } = await req.json();

    // Check if the player to dislike exists
    const randomPlayer = await prisma.player.findFirst({
        where: {
          NOT: {
            dislikedPlayers: {
              some: {
                disliked_player_id: currentPlayer_id,
              },
            },
          },
          player_id: { not: currentPlayer_id },
        },
        select: {
          first_name: true,
          username: true,
          bio: true,
          looking_for: true,
          image: true,
        },
      });

    // if (!dislikedPlayer) {
    //   return NextResponse.json({ message: 'Player to dislike not found' }, { status: 404 });
    // }

    // Check if the player to dislike is not the same as the logged-in user
    if (disliked_player_id === session.user.player_id) {
      return NextResponse.json(
        { message: "You cannot dislike yourself" },
        { status: 400 }
      );
    }

    // Check if the dislike relationship already exists
    const existingDislike = await prisma.dislikedProfile.findFirst({
      where: {
        player_id,
        disliked_player_id,
      },
    });

    if (existingDislike) {
      return NextResponse.json(
        { message: "You have already disliked this player" },
        { status: 400 }
      );
    }

    // Create the dislike relationship
    await prisma.DislikedProfile.create({
      data: {
        player_id,
        disliked_player_id,
      },
    });

    return NextResponse.json(
      { message: "Player disliked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong :(" },
      { status: 500 }
    );
  }
}
