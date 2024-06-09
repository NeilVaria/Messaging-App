import { Button, ThemeProvider } from "@material-tailwind/react";
import Head from "next/head";
import router from "next/router";

export default function Home() {
    return (
      <>
        <ThemeProvider>
          <Head>
            <title>Landing Page</title>
          </Head>
          <div className="flex flex-col w-screen h-screen justify-center items-center gap-4 ">
            <div><Button onClick={() => router.push('/api/auth/signin')} size="lg">Login</Button></div>
            <div><Button onClick={() => router.push('/register')} size="lg">Register</Button></div>
          </div>
        </ThemeProvider>
      </>
    );
  }
  