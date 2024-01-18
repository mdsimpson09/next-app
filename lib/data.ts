import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient() 

export async function fetchPlayer(username: string) {
  return prisma.player.findUnique({
    where: {
      username
    }
  })
}


