import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider, useSession } from "next-auth/react";
config.autoAddCss = false;

import type { AppProps } from "next/app";
import { useState } from "react";
import { Socket } from "socket.io";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} socket={socket} setSocket={setSocket} />
    </SessionProvider>
  );
}
