import { Button } from "@material-tailwind/react";
import Head from "next/head";

export default function Home() {
    return(
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="w-1/2 h-full flex justify-center items-center"><Button className="transition-all w-1/5 h-12 bg-gradient-to-tr from-yellow-700 to-amber-900 rounded-md hover:shadow-lg hover:bg-amber-300 text-white font-bold py-2 px-4 border-2 border-yellow-700 shadow-yellow-500/20 hover:shadow-yellow-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"data-ripple-light="true">Chatroom</Button></div>
        <div className="w-1/2 h-full flex justify-center items-center"><Button className="transition-all w-1/5 h-12 bg-gradient-to-bl from-yellow-700 to-amber-900 rounded-md hover:shadow-lg hover:bg-amber-300 text-white font-bold py-2 px-4 border-2 border-yellow-700 shadow-yellow-500/20 hover:shadow-yellow-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"data-ripple-light="true">Analytics</Button></div>
      </div>
    )
}