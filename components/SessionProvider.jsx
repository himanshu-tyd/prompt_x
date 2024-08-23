"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import Loader from "./Loader";

const SessionProvider = ({ children, session }) => {
  return (
    <NextAuthSessionProvider>
      {session ? (
        children
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
