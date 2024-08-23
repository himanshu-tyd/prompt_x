import "@styles/globals.css";
import Nav from "@components/Nav";
import SessionProvider from "@components/SessionProvider";
import { auth } from "@auth";

export const metadata = {
  title: "Prompt-X",
  description: "Discover & Share AI Prompts",
};

const RootLayout = async ({ children }) => {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
