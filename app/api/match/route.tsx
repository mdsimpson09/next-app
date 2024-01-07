
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type MatchType = {
  player1_id: number;
  player2_id: number;
};
// Define the matching function
async function findAndStoreMatches() {
  try {
    const matches = await prisma.$queryRaw<MatchType[]>` 
      SELECT 
          lp1.player_id AS player1_id, 
          lp1.liked_player_id AS player2_id 
      FROM 
          LikedProfile AS lp1
      INNER JOIN 
          LikedProfile AS lp2 
      ON 
          lp1.player_id = lp2.liked_player_id 
          AND lp1.liked_player_id = lp2.player_id
    `;

    // Insert logic to store these matches in the MatchedProfile table
    // ...

    console.log('Matches processed');
  } catch (error) {
    console.error('Error finding matches:', error);
  }
}

// Schedule the task to run every hour (adjust the timing as needed)
cron.schedule('0 * * * *', () => {
  console.log('Running a task every hour');
  findAndStoreMatches();
});



// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function match(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       // Start a transaction
//       const result = await prisma.$transaction(async (prisma) => {
//         // Find mutual likes (matches)
//         const matches = await prisma.$queryRaw`
//           SELECT 
//               lp1.player_id AS player1_id, 
//               lp1.liked_player_id AS player2_id 
//           FROM 
//               LikedProfile AS lp1
//           INNER JOIN 
//               LikedProfile AS lp2 
//           ON 
//               lp1.player_id = lp2.liked_player_id 
//               AND lp1.liked_player_id = lp2.player_id
//         `;

//         // Insert matches into MatchedProfile
//         const insertPromises = matches.map((match) =>
//           prisma.matchedProfile.create({
//             data: {
//               player_id_1: match.player1_id,
//               player_id_2: match.player2_id,
//             },
//           })
//         );

//         // Wait for all inserts to complete
//         return await Promise.all(insertPromises);
//       });

//       res.status(200).json(result);
//     } catch (error) {
//       console.error('Match processing error:', error);
//       res.status(500).json({ error: 'Failed to process matches' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// type MatchType = {
//   player1_id: number;
//   player2_id: number;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       // Here you would adjust your logic to fetch and process all matches
//       // For example, finding mutual likes and adding them to the MatchedProfile table
//       // This is a simplified placeholder for your matching logic
//       const matches = await prisma.$queryRaw<MatchType[]>` 
//         SELECT 
//             lp1.player_id AS player1_id, 
//             lp1.liked_player_id AS player2_id 
//         FROM 
//             LikedProfile AS lp1
//         INNER JOIN 
//             LikedProfile AS lp2 
//         ON 
//             lp1.player_id = lp2.liked_player_id 
//             AND lp1.liked_player_id = lp2.player_id
//       `;

//       // You may want to add further logic here to process these matches
//       // and insert them into the MatchedProfile table

//       res.status(200).json(matches);
//     } catch (error) {
//       console.error('Error fetching matches:', error);
//       res.status(500).json({ message: 'Error fetching matches' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }