import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
// import { z } from 'zod';
import { hash } from 'bcrypt';
import * as z from 'zod';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()

//define schema for input validation //

const playerUpdateSchema = z.object({
    bio: z.string().min(1, 'Bio is required'),
    looking_for: z.string().min(1, 'Looking for is required'),
    image: z.string()
  })


export async function PUT(req: NextRequest) {
  const session = await getSession({ req });
  console.log('Session:', session);

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized - User not logged in' }, 
      { status: 401 }
    );
  }

  try {

      // Log request method and URL
      console.log('Request method:', req.method);
      console.log('Request URL:', req.url);
    
       // Log request headers
        console.log('Request headers:', req.headers);

    const body = await req.json();
    console.log('Request body:', body);
    const { bio, looking_for, image } = playerUpdateSchema.parse(body);

    // Assuming you have a valid player ID associated with the user
    const playerId = Number(session.player.player_id);
    console.log('Player ID:', playerId);

    const updatedPlayer = await prisma.player.update({
      where: { player_id: playerId },
     data: { bio, looking_for, image },
    });

    console.log('Update params:', {
        where: { player_id: playerId },
        data: {
          bio,
          looking_for,
          image
        }
      });


    return NextResponse.json(
      { updatedPlayer, message: 'Player updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong'},
      { status: 500 }
    );
  }
}
