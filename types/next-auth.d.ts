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


import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     username: string | null;
//     email: string;
//   }
declare module "next-auth" {
  interface Player {
    id: int;
    username: string | null;
    email: string;
  }

  interface Session {
      player: {
      player_id: int;
      username: string;
      email: string;
    };
  // interface Session {
  //   user: User & {
  //     id: string;
  //     username: string;
  //     email: string;
  //   };
    token: JWT & {
      id: string;
      username: string;
      email: string;
    };
  }
}


