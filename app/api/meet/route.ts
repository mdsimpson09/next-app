import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Session } from 'next-auth';

const prisma = new PrismaClient();


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session?.user) {
      console.log('No session');
      return NextResponse.json(
        { message: 'Authentication required' }, 
        { status: 401 }
        );
    }

    const currentPlayerUsername = session.user.username;


    const totalPlayers = await prisma.player.count({
      where: { 
        username: { not: currentPlayerUsername },
      },
    });
    
    if (totalPlayers === 0) {
      return NextResponse.json({ message: 'No other players found' });
    }

    // Generate a random offset
    const randomOffset = Math.floor(Math.random() * totalPlayers);

 // Fetch the player at the random offset
 const randomPlayer = await prisma.player.findFirst({
  where: { 
    username: { not: currentPlayerUsername },
  },
  select: {
        first_name: true,
        username: true,
        bio: true,
        looking_for: true,
        image: true,
      },
  take: 1,
  skip: randomOffset,
});
console.log("Random Player:", randomPlayer);
    // // Find a random player excluding the current user
    // const randomPlayer = await prisma.player.findFirst({
    //   where: { 
    //       username: { not: currentPlayerUsername },
    //   },
    //   orderBy: {
    //     // Ordering by a random function
    //     player_id: 'desc',
    //   },
    //   select: {
    //     first_name: true,
    //     username: true,
    //     bio: true,
    //     looking_for: true,
    //     image: true,
    //   },
    //   take: 1,
    // });

    if (!randomPlayer) {
      return NextResponse.json({ message: 'No other players found' }, { status: 404 });
    }
    

    return NextResponse.json({ player: randomPlayer }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Something went wrong :(' }, { status: 500 });
  }
}



// ////excluding disliked players 

// const randomOffset = Math.floor(Math.random() * totalPlayers);

// // Fetch the player at the random offset, excluding disliked players
// const randomPlayer = await prisma.player.findFirst({
//   where: {
//     username: { not: currentPlayerUsername },
//     NOT: {
//       dislikedPlayers: { some: { disliked_player_id: session?.user?.id } }, // Exclude disliked players
//     },
//   },
//   select: {
//     first_name: true,
//     username: true,
//     bio: true,
//     looking_for: true,
//     image: true,
//   },
//   take: 1,
//   skip: randomOffset,
// });

// // ...