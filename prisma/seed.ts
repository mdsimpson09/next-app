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

//seed.ts 

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create new and unique user profiles
    const user1 = await prisma.player.create({
      data: {
        username: 'jessiclaw',
        first_name: 'Jessica',
        last_name: 'vaughn',
        email: 'jessica@gmail.com',
        password: '123123123',
        bio: 'I live in chicago and love games',
        looking_for: 'friends',
        favorite_games: 'League of Legends, Apex Legends, Call of Duty',
        favorite_device: 'PC',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://twitter.com/?lang=en',
        facebook: 'https://www.facebook.com/',
        twitch: 'https://www.twitch.com/',
        discord: 'https://www.discord.com/',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    })


    const user3 = await prisma.player.create({
      data: {
        username: 'GilmoreMichel',
        first_name: 'Michel',
        last_name: 'Johnson',
        email: 'michel@gmail.com',
        password: '123123123',
        bio: 'I live in chicago and love games',
        looking_for: 'friends',
        favorite_games: 'League of Legends, Apex Legends, Call of Duty',
        favorite_device: 'PC',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://twitter.com/?lang=en',
        facebook: 'https://www.facebook.com/',
        twitch: 'https://www.twitch.com/',
        discord: 'https://www.discord.com/',
        image: 'https://plus.unsplash.com/premium_photo-1680124607787-9e54118b1624?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    })

    const user5 = await prisma.player.create({
      data: {
        username: 'willtaylor',
        first_name: 'Will',
        last_name: 'Taylor',
        email: 'will@gmail.com',
        password: '123123123',
        bio: 'I live in chicago and love games',
        looking_for: 'friends',
        favorite_games: 'League of Legends, Apex Legends, Call of Duty',
        favorite_device: 'PC',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://twitter.com/?lang=en',
        facebook: 'https://www.facebook.com/',
        twitch: 'https://www.twitch.com/',
        discord: 'https://www.discord.com/',
        image: 'https://images.unsplash.com/photo-1559969143-b2defc6419fd?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    })

    const user6 = await prisma.player.create({
      data: {
        username: 'OliveBranch',
        first_name: 'Olive',
        last_name: 'Wilson',
        email: 'olive@gmail.com',
        password: '123123123',
        bio: 'I am a software engineer and a musician. I love to play guitar and sing. I am a huge fan of the NBA',
        looking_for:'friends',
        favorite_games: 'League of Legends, Apex Legends, Call of Duty',
        favorite_device: 'PC',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://twitter.com/?lang=en',
        facebook: 'https://www.facebook.com/',
        twitch: 'https://www.twitch.com/',
        discord: 'https://www.discord.com/',
        image:'https://images.unsplash.com/photo-1685674594222-677108fd5d85?q=80&w=2714&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    })


    // console.log('Profiles, relationships, and matches created successfully.')
  } catch (error) {
    console.error('Error creating user profiles:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()