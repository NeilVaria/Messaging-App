import {
  Card,
  CardBody,
  Typography,
  ThemeProvider,
  Button
} from "@material-tailwind/react";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    router.push("/landingpage");
  } else {
    return (
      <>
        <ThemeProvider>
          <Head>
            <title>Home Page</title>
          </Head>
          <div className="flex flex-col w-screen h-screen justify-center items-center p-8">
            <div className="grid grid-cols-3 gap-4 w-full mb-8">
              <Card onClick={() => router.push("/chat")} className="cursor-pointer">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Chatroom
                  </Typography>
                  <Typography>
                    Text Chat Subsystem - Create and join chatrooms with other users.
                  </Typography>
                </CardBody>
              </Card>
              <Card onClick={() => router.push("/analytics")} className="cursor-pointer">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Data Analytics
                  </Typography>
                  <Typography>
                    Data Analytics Subsystem - View and analyze data on projects and tasks.
                  </Typography>
                </CardBody>
              </Card>
              <Card onClick={() => router.push("/api-documentation")} className="cursor-pointer">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    API Documentation
                  </Typography>
                  <Typography>
                    API Documentation - View the documentation for the RESTful API.
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 text-white bg-red-500 rounded"
            >
              Sign Out
            </button>
          </div>
        </ThemeProvider>
      </>
    );
  }
}
