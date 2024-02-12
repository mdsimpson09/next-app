import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Session } from 'next-auth';
import DislikeButton from '@/app/components/profile/dislike-button';

const prisma = new PrismaClient();


// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const session = await getServerSession(authOptions);
//     // console.log('Session:', session);

//     if (!session?.user) {
//       console.log("No session");
//       return NextResponse.json(
//         { message: "Authentication required" },
//         { status: 401 }
//       );
//     }

//     const currentPlayerUsername = session.user.username;

//     const totalPlayers = await prisma.player.count({
//       where: {
//         username: { not: currentPlayerUsername },
//       },
//     });

//     if (totalPlayers === 0) {
//       return NextResponse.json({ message: "No other players found" });
//     }

//     // Generate a random offset
//     const randomOffset = Math.floor(Math.random() * totalPlayers);

//     // Fetch the player at the random offset
//     const randomPlayer = await prisma.player.findFirst({
//       where: {
//         username: { not: currentPlayerUsername },
//       },
//       select: {
//         first_name: true,
//         username: true,
//         bio: true,
//         looking_for: true,
//         image: true,
//         player_id: true,
//       },
//       take: 1,
//       skip: randomOffset,
//     });
//     // console.log("Player ID to Dislike:", randomPlayer?.player_id);

//     if (!randomPlayer) {
//       return NextResponse.json(
//         { message: "No other players found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ player: randomPlayer }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { message: "Something went wrong :(" },
//       { status: 500 }
//     );
//   }
// }
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response(JSON.stringify({ message: "Authentication required" }), { status: 401 });
    }

    const currentPlayerId = parseInt(session.user.id);

    if (isNaN(currentPlayerId)) {
      return new Response(JSON.stringify({ message: "Invalid player ID" }), { status: 400 });
    }

    // Ensure that we exclude players that the current player has liked or disliked
    const excludedPlayerIds = await prisma.$queryRaw`
      SELECT liked_player_id FROM "LikedProfile" WHERE player_id = ${currentPlayerId}
      UNION
      SELECT disliked_player_id FROM "DislikedProfile" WHERE player_id = ${currentPlayerId}
    `;

    const excludedIds = excludedPlayerIds.map((p: { liked_player_id: number; disliked_player_id?: number }) => p.liked_player_id || p.disliked_player_id);

    // Fetch a random player not liked or disliked by the current player
    const randomPlayer = await prisma.player.findFirst({
      where: {
        AND: [
          {
            player_id: {
              not: currentPlayerId,
              notIn: excludedIds,
            },
          },
        ],
      },
      select: {
        first_name: true,
        username: true,
        bio: true,
        looking_for: true,
        favorite_games: true,
        favorite_device: true,
        instagram: true, 
        facebook: true,
        twitter: true,
        discord: true,
        twitch: true,
        image: true,
        player_id: true,
      },
    });

    if (!randomPlayer) {
      return new Response(JSON.stringify({ message: "Out of player profiles. Check back later for more" }), { status: 200 });
    }

    return new Response(JSON.stringify({ player: randomPlayer }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Something went wrong :(" }), { status: 500 });
  }
}
