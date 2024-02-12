import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

import { hash } from 'bcrypt';
import * as z from 'zod';
import { getSession, useSession } from 'next-auth/react';
import { BioRhyme } from 'next/font/google';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient()

//define schema for input validation //

const updatePlayerSchema = z.object({
    bio: z.string().min(1, 'Bio is required'),
    looking_for: z.string().min(1, 'Looking for is required'),
    image: z.string().url('Invalid URL format').optional(),
    favorite_games: z.string().min(1, 'Favorite games is required'),
    favorite_device: z.string().min(1, 'Favorite device is required'),
    instagram: z.string().url('Invalid URL format').optional(),
    facebook: z.string().url('Invalid URL format').optional(),
    twitch: z.string().url('Invalid URL format').optional(),
    twitter: z.string().url('Invalid URL format').optional(),
    discord: z.string().url('Invalid URL format').optional(),
   
    // username: z.string().min(2, 'Username is required')
  })

export async function PUT(req: Request) {
  
  try{
    const session = await getServerSession(authOptions);
    // console.log('Session:', session);

    if (!session?.user) {
      console.log('No session');
        return NextResponse.json(
          { message: 'Authentication required' },
          { status: 401 }
        );
      }
  
    const body = await req.json();
      const {bio, looking_for, image, favorite_games, favorite_device, instagram, facebook, twitter, twitch, discord} = updatePlayerSchema.parse(body);
      
    

      const updatedPlayer = await prisma.player.update({
        where: {
            username: session.user.username // Assuming 'id' is the user's unique identifier
          },  
        data: {
              bio:bio,
              looking_for: looking_for,
              image:image,
              favorite_games:favorite_games,
              favorite_device:favorite_device,
              instagram:instagram,
              facebook:facebook,
              twitter:twitter,
              twitch:twitch,
              discord:discord
              
          }
      })


      return NextResponse.json({updatedPlayer: 'Player updated successfully'}, {status: 201})
  } 
  catch(error){
}

      return NextResponse.json({message: 'Something went wrong :('}, {status: 500})}
