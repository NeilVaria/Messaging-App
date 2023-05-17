import { useRouter } from "next/router";
import router from "next/router";

import { useEffect, useState } from "react";
import { Card, Text, Title } from "@tremor/react";
import DonutChart from "@/components/totalTasks";
import EmpTblSingle from "@/components/EmpTblSingle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import MyDemo from "@/components/manHrsChart";
import Head from "next/head";

interface Task {
  id: string;
  name: string;
  description: string;
  hours: number;
  dueDate: string;
  completed: boolean;
  completionDate: string | null;
  manhours: number;
  projectsId: string;
}

const ProjectPage: React.FC = () => {
  const { projectid } = useRouter().query;
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [projectData, setProjectData] = useState(null);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch("/api/projectData");
        const data = await response.json();
        const project = data.find((proj: any) => proj.id === projectid);
        setProjectData(project);
      } catch (error) {
        console.error(error);
      }
    };

    if (projectid) {
      fetchProjectData();
    }
  }, [projectid]);

  // Fetch the tasks and update the state variable
  useEffect(() => {
    fetch("/api/taskData")
      .then((response) => response.json())
      .then((data) => {
        setAllTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const [projectTasks, setProjectTasks] = useState<Task[]>([]);

  useEffect(() => {
    const startIndex = pageIndex * 3;
    const endIndex = startIndex + 3;
    const tasksToDisplay = projectTasks.slice(startIndex, endIndex);
    setDisplayedTasks(tasksToDisplay);
  }, [pageIndex, projectTasks]);

  useEffect(() => {
    if (projectData && allTasks.length > 0) {
      const filteredTasks = allTasks.filter((task) => task.projectsId === projectid);
      setProjectTasks(filteredTasks);
    }
  }, [projectData, allTasks, projectid]);

  const handleNextPage = () => {
    setPageIndex((prevIndex) => prevIndex + 1);
  };

  if (!projectData) {
    return null; // You can display a loading spinner or message here
  }

  const { name, description, taskCount, deadline, progress, id } = projectData;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="bg-gray-100 m-0 p-0">
        <div className="m-3">
          <FontAwesomeIcon icon={faHome} onClick={() => router.push("/index")} className="text-gray-600 hover:text-gray-800 cursor-pointer" />

          <div className="w-1/2 mb-6 mx-auto">
            <div className="relative h-5 border-2 border-black rounded">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-900 via-green-500 to-green-400 " style={{ width: `${progress}%` }}>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold ">{progress}%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Title className="text-4xl font-bold">{name}</Title>
          </div>
          <hr className="my-4 border-1 border-black" />
          <div className="grid grid-cols-3 gap-4">
            <Card className="shadow-lg bg-gradient-to-r from-cyan-300 via-blue-500 to-blue-600">
              <Title className="font-bold text-white text-center">Deadline</Title>
              <Text className="font-bold text-white text-center">{deadline}</Text>
            </Card>
            <Card className="shadow-lg bg-gradient-to-r from-pink-300 via-pink-500 to-red-300">
              <Title className="font-bold text-white text-center">Description</Title>
              <Text className="font-bold text-white text-center">{description}</Text>
            </Card>
            <Card className="shadow-lg bg-gradient-to-r from-teal-300 via-green-400 to-teal-400">
              <Title className="font-bold text-white text-center">Total Tasks</Title>
              <Text className="font-bold text-white text-center text-xl">{taskCount}</Text>
            </Card>
          </div>
          <div className="flex mt-6">
            <div className="w-2/3 pr-4">
              <Card className="h-max-content">
                <Title className="text-center">Tasks</Title>
                <hr className="my-2 border-1 border-black" />
                {displayedTasks.length > 0 ? (
                  displayedTasks.map((task) => (
                    <div key={task.id} className="border-2 border-black rounded p-4 mb-4">
                      <Title className="font-bold">{task.name}</Title>
                      <Text className="text-sm">{task.description}</Text>
                      <Text className="text-sm">Hours: {task.hours}</Text>
                      <Text className="text-sm">Due Date: {task.dueDate}</Text>
                      <Text className="text-sm">Status: {task.completed ? "Completed" : "Incomplete"}</Text>
                      {task.completed && <Text className="text-sm">Completion Date: {task.completionDate}</Text>}
                      <Text className="text-sm">Manhours: {task.manhours}</Text>
                    </div>
                  ))
                ) : (
                  <Text>No tasks available</Text>
                )}
                {(projectTasks.length > 3 || pageIndex > 0) && (
                  <div className="flex justify-between">
                    {pageIndex > 0 && (
                      <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4 ml-4" onClick={() => setPageIndex((prevIndex) => prevIndex - 1)}>
                        Back
                      </button>
                    )}
                    {projectTasks.length > (pageIndex + 1) * 3 && (
                      <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4" onClick={handleNextPage}>
                        Next
                      </button>
                    )}
                  </div>
                )}
              </Card>
              <div className="col-span-2">
                <Card className="h-4/5 overflow-auto">
                  <MyDemo projectsId={projectid as string} />
                </Card>
              </div>
            </div>
            <div className="w-1/3">
              <Card className="shadow h-max-content overflow-y-auto overflow-x-hidden">
                <Title className="mx-auto text-center">Member List</Title>
                <hr className="my-2 border-1 border-black" />
                {/* Place your member list here */}
                <EmpTblSingle projectsId={projectid as string} />
              </Card>
              <div className="mt-2">
                <div className="w-full">
                  <DonutChart project={projectData} tasks={allTasks} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
