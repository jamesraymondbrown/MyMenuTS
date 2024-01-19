import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      // console.log(session);

      return session;
    },
    async signIn({ profile }: any) {
      console.log("profile", profile);
      try {
        const res = await fetch(`http://localhost:8000/users`)
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log("USERLOG", responseJSON);
          });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
