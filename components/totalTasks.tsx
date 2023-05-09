import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Legend } from 'chart.js';
import { Card, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
Chart.register(ArcElement, Legend, Title);

interface Task {
  id: string;
  name: string;
  username: string;
  hours: string;
  members: string[];
  project: string;
  dueDate: string;
  completed: boolean;
  completionDate: string;
  manhours: string;
  projectsId: string;
}

interface DonutChartData {
  complete: number;
  incomplete: number;
  overdue: number;
}


const DonutChart = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [chartData, setChartData] = useState<DonutChartData>({
    complete: 0,
    incomplete: 0,
    overdue: 0,
  });
  

  useEffect(() => {
    fetch('/api/taskData')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    const completeCount = tasks.filter((task) => task.completed).length;
    const incompleteCount = tasks.filter((task) => !task.completed && new Date(task.dueDate) >= new Date()).length;
    const overdueCount = tasks.filter((task) => !task.completed && new Date(task.dueDate) < new Date()).length;

    setChartData({
      complete: completeCount,
      incomplete: incompleteCount,
      overdue: overdueCount,
    });
  }, [tasks]);

  const { complete, incomplete, overdue } = chartData;

  //text in the middle of the chart
  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = 'bolder 15px sans-serif';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      //sum of all tasks
      const sum = data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2];
      ctx.fillText(`Value: ${sum}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    },
  };

  return (
    <div>
      <Card className="mb-4 drop-shadow-md">
        <Text className="text-gray-800">Task Completion Status</Text>
        <Doughnut
          data={{
            labels: ['Complete', 'Incomplete', 'Overdue'],
            datasets: [
              {
                label: 'Task Completion Status',
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
                data: [complete, incomplete, overdue],
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
          height={100}
          width={200}
        ></Doughnut>
      </Card>
    </div>
  );
};

export default DonutChart;