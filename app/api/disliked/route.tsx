import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

// export default async function handler(req: NextRequest, res: NextResponse) {
//   if (req.method !== 'POST') {
//     return NextResponse.json({ message: 'Method not allowed' }); 
//   }

//   try {
//     const session = await getSession({ req });

//     if (!session?.user) {
//       return NextResponse.json({ message: "Authentication required" });
//     }

//     const currentPlayerId = session.user.player_id; 
//     const body = await req.json();
//     const { disliked_player_id } = body;

//     // Check if the player is trying to dislike themselves
//     if (disliked_player_id === currentPlayerId) {
//       return NextResponse.json({ message: "You cannot dislike yourself" });
//     }

//     // Check if the dislike relationship already exists
//     const existingDislike = await prisma.dislikedProfile.findUnique({
//       where: {
//         player_id_disliked_player_id: {
//           player_id: currentPlayerId,
//           disliked_player_id: disliked_player_id,
//         },
//       },
//     });

//     if (existingDislike) {
//       return NextResponse.json({ message: "You have already disliked this player" }); 
//     }

//     // Create the dislike relationship
//     await prisma.dislikedProfile.create({
//       data: {
//         player_id: currentPlayerId,
//         disliked_player_id,
//       },
//     });

//     return NextResponse.json({ message: "Player disliked successfully" });

//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ message: "Something went wrong :(" });
//   }
// }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const session = await getSession({ req });
      if (!session?.user || !session.user.player_id) {
        return res.status(401).json({ message: "Authentication required" });
      }
  
      const currentPlayerId = session.user.player_id;
      const { disliked_player_id } = req.body;
  
      if (disliked_player_id === currentPlayerId) {
        return res.status(400).json({ message: "You cannot dislike yourself" });
      }
  
      const existingDislike = await prisma.dislikedProfile.findUnique({
        where: {
          player_id_disliked_player_id: { player_id: currentPlayerId, disliked_player_id },
        },
      });
  
      if (existingDislike) {
        return res.status(400).json({ message: "You have already disliked this player" });
      }
  
      await prisma.dislikedProfile.create({
        data: { player_id: currentPlayerId, disliked_player_id },
      });
  
      return res.status(200).json({ message: "Player disliked successfully" });
  
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Something went wrong :(" });
    }}