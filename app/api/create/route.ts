

// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import { hash } from 'bcrypt';
// import * as z from 'zod';

// const prisma = new PrismaClient();

// // Define schema for input validation for POST request
// const playerSchema = z.object({
//   email: z.string().min(2, 'Email is required').email('Invalid Email'),
//   first_name: z.string().min(2, 'First name is required'),
//   last_name: z.string().min(2, 'Last name is required'),
//   password: z.string().min(1, 'Password is required').min(8, 'Password must have 8 characters'),
//   username: z.string().min(1, 'Username is required').min(8),
// });

// // Define schema for input validation for PUT request
// const updatePlayerSchema = z.object({
//   bio: z.string().optional(),
//   looking_for: z.string().optional(),
//   image: z.string().url().optional(), // Validate as URL if you expect an image URL
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { first_name, last_name, username, email, password } = playerSchema.parse(req.body);

//       // Check if email is unique
//       const existingUserByEmail = await prisma.player.findUnique({ where: { email } });
//       if (existingUserByEmail) {
//         return res.status(409).json({ message: 'User with this Email already exists' });
//       }

//       // Check if username is unique
//       const existingUserByUsername = await prisma.player.findUnique({ where: { username } });
//       if (existingUserByUsername) {
//         return res.status(409).json({ message: 'Username already exists' });
//       }

//       const hashedPassword = await hash(password, 10);

//       const newPlayer = await prisma.player.create({
//         data: {
//           username,
//           first_name,
//           last_name,
//           email,
//           password: hashedPassword,
//         },
//       });

//       // Exclude password from response
//       const { password: newPlayerPassword, ...rest } = newPlayer;

//       return res.status(201).json({ newPlayer: rest, message: 'Player created successfully' });
//     } catch (error) {
//       console.error('Failed to create player:', error);
//       return res.status(500).json({ message: 'Something went wrong :(' });
//     }
//   } else if (req.method === 'PUT') {
//     try {
//       const playerId = parseInt(req.query.player_id as string); // Adjust as needed to get the player's ID
//       const updates = updatePlayerSchema.parse(req.body);

//       const updatedPlayer = await prisma.player.update({
//         where: { player_id: playerId },
//         data: updates,
//       });

//       return res.status(200).json(updatedPlayer);
//     } catch (error) {
//       console.error('Failed to update player:', error);
//       if (error instanceof z.ZodError) {
//         // If validation fails
//         return res.status(400).json({ message: 'Invalid input', errors: error.errors });
//       }
//       return res.status(500).json({ message: 'Failed to update player' });
//     }
//   } else {
//     // Handle any other HTTP method
//     res.setHeader('Allow', ['POST', 'PUT']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

///////********************************************************** */


import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
// import { z } from 'zod';
import { hash } from 'bcrypt';
import * as z from 'zod';

const prisma = new PrismaClient()

//define schema for input validation //

const playerSchema = z.object({
    email: z.string().min(2, 'Email is required').email('Invalid Email'),
    first_name: z.string().min(2, 'First name is required'),
    last_name: z.string().min(2, 'Last name is required'),
    password: z.string().min(1, 'Passowrd is required').min(8, 'Password must have 8 characters'),
    username: z.string().min(1, 'Username is required').min(8),
    
  })

  ////updated profile schema////

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {first_name, last_name, username, email, password} = playerSchema.parse(body);

            //email is unique

        const existingUserByEmail = await prisma.player.findUnique({
            where: { email:email }
        });
        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'User with this Email already exists'}, {status: 409 });
        }

            //username is unique

        const existingUserByUsername = await prisma.player.findUnique({
            where: { username:username }
        });
        if(existingUserByUsername) {
            return NextResponse.json({ user: null, message: 'Username already exists'}, {status: 409 });
        }
        const hashedPassword = await hash(password, 10);

        const newPlayer = await prisma.player.create({
            data: {
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword
            }
        
        })
        const { password: newPlayerPassword, ...rest } = newPlayer;


        return NextResponse.json({newPlayer: rest, message: 'Player created successfully'}, {status: 201})
    } 
    catch(error){
        return NextResponse.json({message: 'Something went wrong :('}, {status: 500})}}

