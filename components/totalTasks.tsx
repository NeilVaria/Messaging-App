import { useEffect, useState } from 'react';
import { Card, Title} from "@tremor/react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend } from 'chart.js';
Chart.register(ArcElement, Legend);

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

interface Project {
  id: string;
  name: string;
  description: string;
  completionDate: string | null;
  deadline: string;
  completed: boolean;
  members: {
    id: string;
    name: string;
    username: string;
    role: string;
    email: string;
    image: string | null;
    password: string;
  }[];
}

interface DonutChartProps {
  project: Project;
  tasks: Task[];
}

const DonutChart: React.FC<DonutChartProps> = ({ project, tasks }) => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);

  useEffect(() => {
    const filteredTasks = tasks.filter(task => task.projectsId === project.id);

    const completed = filteredTasks.filter(task => task.completed);
    const incomplete = filteredTasks.filter(task => !task.completed && new Date(task.dueDate) >= new Date());
    const overdue = filteredTasks.filter(task => !task.completed && new Date(task.dueDate) < new Date());

    setCompletedTasks(completed);
    setIncompleteTasks(incomplete);
    setOverdueTasks(overdue);
  }, [project, tasks]);

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = 'bolder 15px sans-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      //sum of all tasks
      const sum = data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2];
      ctx.fillText(`Tasks:${sum}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    },
  };

  return (
    <div>
      <Card>
        <Title>Task Completion Status</Title>
        <Doughnut
          data={{
            labels:['Complete', 'Incomplete', 'Overdue'],
            datasets: [
              {
                label: 'Task Completion Status',
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
                data: [completedTasks.length, incompleteTasks.length, overdueTasks.length]
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }}
          plugins={[textCenter]}
          ></Doughnut>
        <div className="mt-3">
          <div>Completed Tasks: {completedTasks.length}</div>
          <div>Incomplete Tasks: {incompleteTasks.length}</div>
          <div>Overdue Tasks: {overdueTasks.length}</div>
        </div>
      </Card>
    </div>
  );
};

export default DonutChart;
