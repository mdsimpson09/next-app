
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
    image: z.string().url('Invalid URL format'),
    
  })

  ////updated profile schema////

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {first_name, last_name, username, email, password, image} = playerSchema.parse(body);

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
                password: hashedPassword,
                image: image
            }
        
        })
        const { password: newPlayerPassword, ...rest } = newPlayer;


        return NextResponse.json({newPlayer: rest, message: 'Player created successfully'}, {status: 201})
    } 
    catch(error){
        return NextResponse.json({message: 'Something went wrong :('}, {status: 500})}}

