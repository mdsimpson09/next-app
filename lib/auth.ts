import { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '@/lib/prisma';
import { Noto_Kufi_Arabic } from 'next/font/google';
import { compare } from 'bcrypt';
import { Session } from 'next-auth';
import { JWT, getToken } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
// import Providers from `next-auth/providers`



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET, //////////////////
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login' 
  },
  providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        
      }),
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

        if(existingPlayer.password){
        const passwordMatches = await compare(credentials?.password, existingPlayer.password);
        if(!passwordMatches){
            return null;
        }}

        return {
          id: `${existingPlayer.player_id}`,
          username: existingPlayer.username,
          email: existingPlayer.email
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          email: user.email
        };
      }
      // console.log(token);
      return token;
      
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email
        }
      };
    },
  }
};

// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
