import argon2 from "argon2";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "../../../../utils/prisma";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        identifier: {
          label: "Username or Email",
          placeholder: "e.g. john_doe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials?.identifier },
              { email: credentials?.identifier },
            ],
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await argon2.verify(
          user.password,
          credentials!.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email as string,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          fullName: token.fullName,
          email: token.email,
        },
      };
    },
  },
};
