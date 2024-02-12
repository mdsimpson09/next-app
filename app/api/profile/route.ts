// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { getSession, useSession } from 'next-auth/react';
// import * as z from 'zod';
// import { authOptions } from '@/lib/auth';
// import { getServerSession } from 'next-auth';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {

//   try {
//    const session = await getServerSession(authOptions);
   
//     // console.log('Session:', session);

//     if (!session?.user) {
//         console.log('No session');
//       return NextResponse.json(
//         { message: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     const player = await prisma.player.findUnique({
//       where: {
//         username: session.user.username,
//       },
//       select: {
//         first_name: true,
//         username: true,
//         bio: true,
//         looking_for: true,
//         image: true,
//       },
//     });

//     if (!player) {
//       return NextResponse.json({ message: 'Player not found' }, { status: 404 });
//     }

//     return NextResponse.json({ player }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Something went wrong :(' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import * as z from 'zod';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    let username = req.nextUrl.searchParams.get("username");
    console.log("Username in API route:", username);

    if (!username && session?.user) {
      username = session.user.username;
    }

    // console.log('Session:', session);

    if (!session?.user) {
      console.log("No session");
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const player = await prisma.player.findUnique({
      where: {
        username: username,
      },
      select: {
        first_name: true,
        username: true,
        bio: true,
        looking_for: true,
        favorite_device:true,
        favorite_games: true, 
        instagram: true,
        facebook: true,
        twitter: true,
        twitch: true,
        discord: true,
        image: true,
      },
    });

  console.log("Player found in DB:", player); 
  
    if (!player) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ player }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong :(" },
      { status: 500 }
    );
  }
}
export async function DELETE( 
  request: Request, 
  { params }: {params: { player_id: string }} 
  ) {
  const id = params.player_id;
  const deleted = await prisma.player.delete({
      where:{
          player_id: parseInt(id, 10)
      } 
  
  })
  return NextResponse.json(deleted)
}