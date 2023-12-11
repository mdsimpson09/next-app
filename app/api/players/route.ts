import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';

const prisma = new PrismaClient()


export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {first_name, last_name, username, email, password} = body;

        const existingUserByEmail = await prisma.player.findUnique({
            where: { email:email }
        });
        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'User with this Email already exists'}, {status: 409 });
        }

        const existingUserByUsername = await prisma.player.findUnique({
            where: { username:username }
        });
        if(existingUserByUsername) {
            return NextResponse.json({ user: null, message: 'Username already exists'}, {status: 409 });
        }

        return NextResponse.json(body);
    } catch(error){
 }
}





// const createPlayerSchema = z.object({
//   username: z.string().min(5).max(30),
//   first_name: z.string().min(2).max(30),
//   last_name: z.string().min(2).max(30),
//   email: z.string().email().min(2).max(30),
//   password: z.string().min(8).max(30)

// })



// export async function POST(request: NextRequest) {
    
//     const body = await request.json();
//     const validation = createPlayerSchema.safeParse(body);
//     if (!validation.success) {
//         return NextResponse.json(validation.error.errors, {status:400})
//     }
//     const newPlayer = await prisma.player.create({
//         data: {
//             username: body.username,
//             first_name: body.first_name,
//             last_name: body.last_name,
//             email: body.email,
//             password: body.password
//         }
//     })
//     // TODO: Create player in database
//    return NextResponse.json({newPlayer, message: 'Player created successfully'})
// }

