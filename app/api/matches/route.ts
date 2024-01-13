// pages/api/matches/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse){
  try {
    const session = await getServerSession(authOptions);
     // console.log('Session:', session);
 
     if (!session?.user) {
         console.log('No session');
       return NextResponse.json(
         { message: 'Authentication required' },
         { status: 401 }
       );
     }
     const playerId = session?.user?.id;
     console.log('playerId:', playerId)

     // Fetch matched profiles where the current user is player_id_1
     const matchesAsPlayer1 = await prisma.matchedProfile.findMany({
       where: { player_id_1: Number(playerId) },
       include: { player2: true }
     });
 
     // Fetch matched profiles where the current user is player_id_2
     const matchesAsPlayer2 = await prisma.matchedProfile.findMany({
       where: { player_id_2: Number(playerId) },
       include: { player1: true }
     });
     const combinedMatches = [
      ...matchesAsPlayer1.map(match => match.player2.username),
      ...matchesAsPlayer2.map(match => match.player1.username)
    ]; 
    console.log('Matches from DB:', combinedMatches);
    return NextResponse.json({ matches: combinedMatches });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error', error });
  }
}
     // session.user.id may be player_id_1 or player_id_2 on the matched profile table 
     // once session.user.id= player_id_1 or player_id_2, pull the player_id_1 or player_id_2 from the matched profile table

//     const playerId = session?.user?.id;
//     console.log('playerId:', playerId)
//     const matches = await prisma.matchedProfile.findMany({
//       where: {
//          player_id_1: playerId,
//       }
//     });
//     const matches2 = await prisma.matchedProfile.findMany({
//       where: {
//          player_id_2:  playerId,
//       }
//     });
//     console.log("***************************")
//     console.log('Matches from DB:', matches)
//     return NextResponse.json({ matches2 }); 
//   } catch (error) {
//    return NextResponse.json({ message: 'Internal server error', error});
//   }
// }
