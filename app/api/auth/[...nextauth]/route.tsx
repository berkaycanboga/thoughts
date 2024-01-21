import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../utils/prisma";
import { comparePassword } from "../../../../utils/bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        identifier: {
          label: "Username or Email Or Phone",
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
              { phone: credentials?.identifier },
            ],
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = comparePassword(
          credentials?.password || "",
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
