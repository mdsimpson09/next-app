//app/api/match-profile.ts/[username].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // console.log('Session:', session);

    if (!session?.user?.username) {
      console.log('No session or username');
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const player = await prisma.player.findUnique({
      where: {
        username: session.user.username,
      },
      select: {
        first_name: true,
        username: true,
        bio: true,
        looking_for: true,
        image: true,
      },
    });

    if (!player) {
      return NextResponse.json({ message: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json({ player }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Something went wrong :(' }, { status: 500 });
  }
}