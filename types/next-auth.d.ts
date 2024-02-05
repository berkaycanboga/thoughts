// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    phone: string;
  }
  interface Session {
    user: User & {
      id: number;
      username: string;
      fullName: string;
      email: string;
      phone: string;
    };
    token: {
      id: number;
      username: string;
      fullName: string;
      email: string;
      phone: string;
    };
  }
}
