import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.player.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      username: 'alicecooper',
      first_name: 'Alice',
      last_name: 'Cooper',
      email: 'alice@prisma.io',
      password: 'mypassword123',
    },
  })
  const bob = await prisma.player.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      username: 'bbailey', 
      first_name: 'bob',
      last_name: 'bailey',
      email: 'bob@prisma.io',
      password: 'mypassword123',
    }
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })