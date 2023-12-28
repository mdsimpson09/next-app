// Import necessary modules and types
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Player } from '@prisma/client';
import { getServerSession } from 'next-auth';
import NodeCache from 'node-cache';

import { Session } from 'next-auth'; // Import the type for session

// Initialize Prisma and cache
const prisma = new PrismaClient();
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Define the type for your cached data
type CachedPlayer = Player | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: Session | null = await getServerSession(req, res, authOptions);
    console.log('Session:', session);

    if (!session?.user) {
      console.log('No session');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const currentPlayerUsername = session.user.username;
    const cacheKey = 'randomPlayer';

    // Try fetching the data from cache first
    let randomPlayer: CachedPlayer = myCache.get<CachedPlayer>(cacheKey);

    if (!randomPlayer) {
      // Data not in cache, fetch from the database
      randomPlayer = await prisma.player.findFirst({
        where: { 
          username: { not: currentPlayerUsername },
        },
        orderBy: {
          player_id: 'desc', // Adjust according to your schema
        },
        select: {
          first_name: true,
          username: true,
          bio: true,
          looking_for: true,
          image: true,
        },
        take: 1,
      });

      // If a player is found, cache the result
      if (randomPlayer) {
        myCache.set<CachedPlayer>(cacheKey, randomPlayer);
      }
    }

    if (!randomPlayer) {
      return res.status(404).json({ message: 'No other players found' });
    }

    return res.status(200).json({ player: randomPlayer });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Something went wrong :(' });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

// const prisma = new PrismaClient();


// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     console.log('Session:', session);

//     if (!session?.user) {
//       console.log('No session');
//       return NextResponse.json(
//         { message: 'Authentication required' }, 
//         { status: 401 }
//         );
//     }

//     const currentPlayerUsername = session.user.username;

//     // Find a random player excluding the current user
//     const randomPlayer = await prisma.player.findFirst({
//       where: { 
//           username: { not: currentPlayerUsername },
//       },
//       orderBy: {
//         // Ordering by a random function
//         player_id: 'desc',
//       },
//       select: {
//         first_name: true,
//         username: true,
//         bio: true,
//         looking_for: true,
//         image: true,
//       },
//       take: 1,
//     });

//     if (!randomPlayer) {
//       return NextResponse.json({ message: 'No other players found' }, { status: 404 });
//     }

//     return NextResponse.json({ player: randomPlayer }, { status: 200 });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ message: 'Something went wrong :(' }, { status: 500 });
//   }
// }
