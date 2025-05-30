import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ?? 'client_id';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? 'secret';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET }),
  ],
  callbacks: {
    // Usually not needed here, we are facing a bug in nextauth
    async session({ session, user }) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
