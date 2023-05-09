import { useRouter } from "next/router";

const ProjectPage = () => {
  const { projectid } = useRouter().query;

  // query db using projectid to get project data and get tasks for that project, make sure to use a useEffect hook to prevent server-side rendering errors
  // set dependency for useEffect hook to "router.isReady"

  return (
    <div className=" flex justify-center">
      <div className=" text-2xl font-bold">Project id:</div>
      <div className=" flex text-2xl font-semi-bold justify-center items-center ml-2">{projectid}</div>
    </div>
  );
};

export default ProjectPage;
