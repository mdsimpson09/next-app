import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from '@prisma/client'; 
import { Url } from "next/dist/shared/lib/router/router";

declare module "next-auth" {
  interface Player {
    player_id: number; 
    username: string | null;
    email: string;
    first_name: string;
    last_name: string;
    bio: string;
    looking_for: string;
    image: Url; 
  }

  interface Session {
    player: {
      player_id: number | string; 
      username: string;
      email: string;
      id: number | string;
    };
    token: JWT & {
      id: string;
      username: string;
      email: string;
    };
  }
}

declare global {
  interface Request {
    user: string;
    prisma: PrismaClient;
    player: {  
      player_id: number; 
      username: string;
      email: string;
    };
  }

  // Extend the existing Response interface
  interface Response {
    user: string;
    prisma: PrismaClient;
    player: {
      player_id: number;
      username: string;
      email: string;      
    };
  }
}


// import NextAuth from "next-auth"
// import type { DefaultSession } from 'next-auth';

// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//     interface Session {
//         username: string
       
//     }

//     interface User {
//         user: User & {
//             username: string
//         }
//         token: {
//             username: string
// }
// }}


//////////******************************* */
// import NextAuth from "next-auth";
// import { JWT } from "next-auth/jwt";
// import { PrismaClient } from '@prisma/client'; 

// // declare module "next-auth" {
// //   interface User {
// //     id: string;
// //     username: string | null;
// //     email: string;
// //   }
// declare module "next-auth" {
//   interface Player {
//     id: int;
//     username: string | null;
//     email: string;
//   }

//   interface Session {
//       player: {
//       player_id: int;
//       username: string;
//       email: string;
//     };
//   // interface Session {
//   //   user: User & {
//   //     id: string;
//   //     username: string;
//   //     email: string;
//   //   };
//     token: JWT & {
//       id: string;
//       username: string;
//       email: string;
//     };
//   }
// }
// declare global {
//     interface Request {
//       user: string;
//       prisma: PrismaClient;
//       player: {  player_id: int;
//         username: string;
//         email: string;
//       };
//     }
//   }

//   declare global {
//     // Extend the existing Response interface
//     interface Response {
//       user: string;
//       prisma: PrismaClient;
//       player: {
//         player_id: number; 
//         username: string;
//         email: string;      
//       };
//     }
//   }