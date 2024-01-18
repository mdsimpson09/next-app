// //app/api/[username]/[username].ts
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';


// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   const username = req.nextUrl.searchParams.get("username");

//   try {
//     const player = await prisma.player.findUnique({
//       where: {
//         username: username,
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
//       return NextResponse.json(
//         { message: "Player not found" }, 
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ player }, { status: 200 });

//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { message: "Something went wrong :(" },
//        { status: 500 }
//     );
//   }
// }

// app/api/users/[username].ts
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   // Extracting the username from the URL path
//   const username = req.nextUrl.pathname.split('/').pop();

//   try {
//     const player = await prisma.player.findUnique({
//       where: {
//         username: username,
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

// app/api/users/[username].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  try {
    const player = await prisma.player.findUnique({
      where: {
        username: username as string,
      },
      select: {
        username: true,
        first_name: true,
        bio: true,
        looking_for: true,
      },
    });
    if (!player) {
      return Response.json({ message: 'Player not found' })
    }

    Response.json(player)

  } catch (error) {
    console.error(error)
    Response.json({ message: 'Error fetching player' })
  }

}

