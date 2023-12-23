import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '@/lib/prisma';
import { Noto_Kufi_Arabic } from 'next/font/google';
import { compare } from 'bcrypt';
// import Providers from `next-auth/providers`



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login' 
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const existingPlayer = await prisma.player.findUnique({
          where: {
            email: credentials?.email
          }
        });
        
        if (!existingPlayer) {
          return null;
        }

        const passwordMatches = await compare(credentials?.password, existingPlayer.password);

        if(!passwordMatches){
            return null;
        }
        return {
          id: `${existingPlayer.player_id}`,
          username: existingPlayer.username,
          email: existingPlayer.email
        };
      }
    })
  ]
};
