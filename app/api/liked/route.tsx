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
    const existingLike = await prisma.likedProfile.findUnique({
      where: {
        player_id_liked_player_id: {
          player_id: currentPlayerId,
          liked_player_id: liked_player_id,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json({
        message: "You have already liked this player",
      });
    }

    // Create the like relationship
    await prisma.likedProfile.create({
      data: {
        player_id: currentPlayerId,
        liked_player_id,
      },
    });

//     return NextResponse.json({ message: "Player liked successfully route.tsx" }) 
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ message: "Something went wrong" });
//   }
// }
/////////////////////////////////////////////////////////////////////////////////
  // Check for mutual like
const mutualLike = await prisma.likedProfile.findUnique({
  where: {
    player_id_liked_player_id: {
      player_id: likedPlayerId,
      liked_player_id: currentPlayerId,
    },
  },
});


  if (mutualLike) {
    // Check if the match already exists in MatchedProfile to prevent duplicates
    const existingMatch = await prisma.matchedProfile.findUnique({
      where: {
        player_id_1_player_id_2: {
          player_id_1: currentPlayerId < likedPlayerId ? currentPlayerId : likedPlayerId,
          player_id_2: currentPlayerId > likedPlayerId ? currentPlayerId : likedPlayerId,
        },
      },
    });

    if (!existingMatch) {
      // If it doesn't exist, insert the new match
      await prisma.matchedProfile.create({
        data: {
          player_id_1: currentPlayerId < likedPlayerId ? currentPlayerId : likedPlayerId, // Ensure consistent ordering of player IDs
          player_id_2: currentPlayerId > likedPlayerId ? currentPlayerId : likedPlayerId,
        },
      });

      // Return success response along with match information
      return NextResponse.json({ message: "It's a match!", player1: currentPlayerId, player2: likedPlayerId });
    }
  }

  return NextResponse.json({ message: `Player ${likedPlayerId} liked successfully`  });

} catch (error) {
  console.error("Error:", error);
  return NextResponse.json({ message: "Something went wrong" });
}
}
