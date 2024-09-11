import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import connectToDB from "@utils/database";
import User from "@models/user";

const authOption = {
  providers: [
    google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,

  callback: {
    async session({ session }) {
      try {
      await connectToDB();


        const sessionUser = await User.findOne({ email: session.user.email });

        session.user.id = sessionUser._id.toString();

        return session;
      } catch (e) {
        console.log("ERROR IN SESSION", e);
      }
    },

    async signIn({ profile }) {
      try {
        const res=await connectToDB();
        console.log('res database',res);

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (e) {
        console.log("ERROR IN SINGIN", e);
      }
    },
  },
};

export const { auth, handlers} = NextAuth(authOption);
