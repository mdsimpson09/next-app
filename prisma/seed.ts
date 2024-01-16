// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// async function main() {
//   const alice = await prisma.player.upsert({
//     where: { email: 'alice@prisma.io' },
//     update: {},
//     create: {
//       username: 'alicecooper',
//       first_name: 'Alice',
//       last_name: 'Cooper',
//       email: 'alice@prisma.io',
//       password: 'mypassword123',
//     },
//   })
//   const bob = await prisma.player.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       username: 'bbailey', 
//       first_name: 'bob',
//       last_name: 'bailey',
//       email: 'bob@prisma.io',
//       password: 'mypassword123',
//     }
//   })
//   console.log({ alice, bob })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//   const alice = await prisma.player.upsert({
//     where: { email: 'alice@prisma.io' },
//     update: {},
//     create: {
//       username: 'alicecooper',
//       first_name: 'Alice',
//       last_name: 'Cooper',
//       email: 'alice@prisma.io',
//       password: 'mypassword123',
//     },
//   })

//   const bob = await prisma.player.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       username: 'bbailey',
//       first_name: 'Bob',
//       last_name: 'Bailey',
//       email: 'bob@prisma.io',
//       password: 'mypassword123',
//     },
//   })

//   const carol = await prisma.player.upsert({
//     where: { email: 'carol@prisma.io' },
//     update: {},
//     create: {
//       username: 'carolsmith',
//       first_name: 'Carol',
//       last_name: 'Smith',
//       email: 'carol@prisma.io',
//       password: 'mypassword123',
//     },
//   })

//   const david = await prisma.player.upsert({
//     where: { email: 'david@prisma.io' },
//     update: {},
//     create: {
//       username: 'davidthomas',
//       first_name: 'David',
//       last_name: 'Thomas',
//       email: 'david@prisma.io',
//       password: 'mypassword123',
//     },
//   })

//   const eve = await prisma.player.upsert({
//     where: { email: 'eve@prisma.io' },
//     update: {},
//     create: {
//       username: 'evegreen',
//       first_name: 'Eve',
//       last_name: 'Green',
//       email: 'eve@prisma.io',
//       password: 'mypassword123',
//     },
//   })

//   const frank = await prisma.player.upsert({
//     where: { email: 'frank@prisma.io' },
//     update: {},
//     create: {
//       username: 'frankwhite',
//       first_name: 'Frank',
//       last_name: 'White',
//       email: 'frank@prisma.io',
//       password: 'mypassword123',
//     },
//   })

//   // Define disliking relationships
//   await prisma.dislikedProfile.createMany({
//     data: [
//       { player_id: alice.player_id, disliked_player_id: bob.player_id },
//       { player_id: alice.player_id, disliked_player_id: carol.player_id },
//       { player_id: bob.player_id, disliked_player_id: eve.player_id },
//     ],
//   })

//   // Define liking relationships
//   await prisma.likedProfile.createMany({
//     data: [
//       { player_id: alice.player_id, liked_player_id: david.player_id },
//       { player_id: alice.player_id, liked_player_id: eve.player_id },
//       { player_id: bob.player_id, liked_player_id: alice.player_id },
//       { player_id: bob.player_id, liked_player_id: carol.player_id },
//       { player_id: carol.player_id, liked_player_id: bob.player_id },
//       { player_id: carol.player_id, liked_player_id: david.player_id },
//     ],
//   })

//   console.log('Profiles and relationships created successfully.')
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create new and unique user profiles
    const user1 = await prisma.player.create({
      data: {
        username: 'jonisdope',
        first_name: 'Jon',
        last_name: 'Dope',
        email: 'user1332@prisma.io',
        password: 'password123',
      },
    })

    const user2 = await prisma.player.create({
      data: {
        username: 'Janesmith22',
        first_name: 'Janice',
        last_name: 'Smith',
        email: 'user223@prisma.io',
        password: 'password123',
      },
    })

    const user3 = await prisma.player.create({
      data: {
        username: 'GilmoreMichel',
        first_name: 'Michel',
        last_name: 'Johnson',
        email: 'user31@prisma.io',
        password: 'password123',
      },
    })

    const user4 = await prisma.player.create({
      data: {
        username: 'EmBrown',
        first_name: 'Em',
        last_name: 'Brown',
        email: 'user41@prisma.io',
        password: 'password123',
      },
    })

    const user5 = await prisma.player.create({
      data: {
        username: 'willtaylor',
        first_name: 'Will',
        last_name: 'Taylor',
        email: 'user52@prisma.io',
        password: 'password123',
      },
    })

    const user6 = await prisma.player.create({
      data: {
        username: 'OliveBranch',
        first_name: 'Olive',
        last_name: 'Wilson12',
        email: 'user61@prisma.io',
        password: 'password123',
      },
    })

    // Define disliking relationships
    await prisma.dislikedProfile.createMany({
      data: [
        { player_id: user1.player_id, disliked_player_id: user2.player_id },
        { player_id: user1.player_id, disliked_player_id: user3.player_id },
        { player_id: user2.player_id, disliked_player_id: user6.player_id },
      ],
    })

    // Define liking relationships
    await prisma.likedProfile.createMany({
      data: [
        { player_id: user1.player_id, liked_player_id: user4.player_id },
        { player_id: user1.player_id, liked_player_id: user6.player_id },
        { player_id: user2.player_id, liked_player_id: user1.player_id },
        { player_id: user2.player_id, liked_player_id: user3.player_id },
        { player_id: user3.player_id, liked_player_id: user2.player_id },
        { player_id: user3.player_id, liked_player_id: user4.player_id },
      ],
    })

    // Define matched profiles (A liked B and B liked A)
    await prisma.matchedProfile.createMany({
      data: [
        { player_id_1: user1.player_id, player_id_2: user2.player_id },
        { player_id_1: user2.player_id, player_id_2: user1.player_id },
        { player_id_1: user2.player_id, player_id_2: user3.player_id },
        { player_id_1: user3.player_id, player_id_2: user2.player_id },
      ],
    })

    // console.log('Profiles, relationships, and matches created successfully.')
  } catch (error) {
    console.error('Error creating user profiles and relationships:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()