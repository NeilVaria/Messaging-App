import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import Head from "next/head";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{
  spec: any;
}>(import("swagger-ui-react") as any, { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>API Documentation</title>
      </Head>
      <SwaggerUI spec={spec} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "RESTful API Documentation",
        description: "Compresensive documentation for the RESTful API for the Text Chat and Data Analytics Subsystems. All API endpoints are protected by JWT authentication, so you must first login to the system to access the API.",

      },
    },
    apiFolder: "/pages/api", //make sure this is the correct path to your api folder
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc; 