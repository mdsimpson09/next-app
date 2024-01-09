// // pages/api/matches/[userId].ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { getSession } from 'next-auth/react';
// import { PrismaClient } from '@prisma/client';
// import { authOptions } from '@/lib/auth';

// const prisma = new PrismaClient();

// export default async function handler(req: NextRequest, res: NextResponse) {
//   const { userId } = req.query;

//   const session = await getServerSession(authOptions);
//   if (!session) {
//     NextResponse.json({ message: 'Unauthorized' });
//     return;
//   }

//   try {
//     const matches = await prisma.matchedProfile.findMany({
//       where: {
//         OR: [
//           { player_id_1: parseInt(userId as string) },
//           { player_id_2: parseInt(userId as string) }
//         ]
//       },
//       // Include additional fields or related data as needed
//     });

//     NextResponse.json({ matches });
//   } catch (error) {
//     NextResponse.json({ message: 'Internal server error', error: error.message });
//   }
// }

// pages/api/matches/[userId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

  export async function GET(req: NextRequest, res: NextResponse) {
    const userId = parseInt(req.query.userId as string, 10);

      const session = await getServerSession(authOptions);
      // console.log('Session:', session);
  
      if (!session?.user) {
        console.log("No session");
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }

    try {
    const matches = await prisma.matchedProfile.findMany({
      where: {
        OR: [
          { player_id_1: userId },
          { player_id_2: userId }
        ],
      },
      include: {
        player1: userId !== userId ? { select: { username: true } } : false,
        player2: userId !== userId ? { select: { username: true } } : false,
      }
    });

    // Filter out the logged-in user's data from each match
    const matchData = matches.map(match => {
      return userId === match.player_id_1 ? match.player2 : match.player1;
    });
    NextResponse.json({ matches: matchData });
  } catch (error) {
    NextResponse.json({ message: 'Internal server error'});
  }
}