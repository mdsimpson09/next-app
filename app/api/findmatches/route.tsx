// api/findmatches/route.tsx

import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function findAndStoreMatches(): Promise<void> {
  // Fetch all liked profiles
  const likedProfiles = await prisma.likedProfile.findMany();
  
  // Check for mutual likes
  for (const profile of likedProfiles) {
    const mutualLike = await prisma.likedProfile.findFirst({
      where: {
        player_id: profile.liked_player_id,
        liked_player_id: profile.player_id,
      },
    });

    if (mutualLike) {
      // Check if match already exists
      const matchExists = await prisma.matchedProfile.findFirst({
        where: {
          OR: [
            { player_id_1: profile.player_id, player_id_2: profile.liked_player_id },
            { player_id_1: profile.liked_player_id, player_id_2: profile.player_id },
          ],
        },
      });

      if (!matchExists) {
        // Create a new match
        await prisma.matchedProfile.create({
          data: {
            player_id_1: profile.player_id,
            player_id_2: profile.liked_player_id,
          },
        });
      }
    }
  }
}

export async function POST(req: NextRequest, res: NextResponse) {


  try {
    await findAndStoreMatches();
    return NextResponse.json({ message: 'Match check complete' }); 
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error'}, { status: 500 });
  }
}