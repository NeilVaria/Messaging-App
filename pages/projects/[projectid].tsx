import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TaskData } from "../../pages/api/taskData";

const ProjectPage = () => {
  const router = useRouter();
  const { projectid } = router.query;
  const [tasks, setTasks] = useState<TaskData[]>([]);

  async function fetchTaskData(projectId: string | string[] | undefined) {
    try {
      const response = await fetch(`/api/taskData?projectId=${projectId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const taskData = await response.json();
      setTasks(taskData);
      console.log(taskData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      fetchTaskData(projectid);
    }
  }, [router.isReady, projectid]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mb-4">
        <div className="text-2xl font-bold">Project id:</div>
        <div className="flex text-2xl font-semi-bold justify-center items-center ml-2">{projectid}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="max-w-md mx-auto my-4 p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{task.name}</h2>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">{task.description}</p>
            </div>
            <div className="mb-4">
              <span className="text-gray-700">Employees: {task.member}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-700">Deadline: {task.deadline}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-700">Status: </span>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold ${
                  task.completed ? "text-green-700 bg-green-200" : "text-red-700 bg-red-200"
                } rounded-full`}
              >
                {task.completed ? "Completed" : "Incomplete"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
