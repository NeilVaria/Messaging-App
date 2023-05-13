import Head from "next/head";
import { useRouter } from "next/router";


export default function Home() {
    
const { employeeid } = useRouter().query;
    return (
        <>
        <Head>
            {/* change to employee name */}
            <title>{employeeid}</title>
        </Head>
        <div>
            <div>
            <h1>Employee Details: {employeeid}</h1>
            </div>
        </div>
         </>
    );
  }
  