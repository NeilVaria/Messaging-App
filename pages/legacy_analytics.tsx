import React from 'react'
import { useState } from "react";
import DonutChart from '@/components/totalTasks';
import MyDemo from '@/components/manHrsChart';
import router from "next/router";
import { ThemeProvider } from "@material-tailwind/react";
import Head from "next/head";
import { Card, Dropdown, DropdownItem, Text, Title } from "@tremor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from '@/components/ProjectCard';

const projects = [
  { name: 'Project A', actualCompletionDate: '2023-09-20', predictedCompletionDate: '2023-04-01' },
  { name: 'Project B', actualCompletionDate: '2023-05-05', predictedCompletionDate: '2023-06-04' },
  { name: 'Project C', actualCompletionDate: '2023-01-18', predictedCompletionDate: '2023-02-25' },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(projects[0].name);



  const handleProjectChange = (event: any) => {
    setSelectedProject(event.target.value);
  };



  const projectAData = {
    label: 'Project A',
    labels: ['Complete', 'Incomplete', 'Overdue Complete', 'Overdue Incomplete'],
    datasets: [{
      label: 'Tasks',
      backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
      data: [1, 3, 1, 1]
    },
    ],
  };

  const projectBData = {
    label: 'Project B',
    labels: ['Complete', 'Incomplete', 'Overdue Complete', 'Overdue Incomplete'],
    datasets: [{
      label: 'Tasks',
      backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
      data: [8, 2, 3, 6]
    },
    ],
  };

  const projectCData = {
    label: 'Project C',
    labels: ['Complete', 'Incomplete', 'Overdue Complete', 'Overdue Incomplete'],
    datasets: [{
      label: 'Tasks',
      backgroundColor: ['#f1c40f', '#e67e22', '#16a085', '#2980b9'],
      data: [4, 6, 11, 9]
    },
    ],
  };

    return (
      <>
        <ThemeProvider>
          <Head>
            <title>Analytics</title>
          </Head>
          <main className="w-screen h-full justify-center bg-gray-100 p-6 sm:p-10">
          <div className="flex justify-between items-center space-x-3">
            <div className="flex space-x-3">
              <FontAwesomeIcon icon={faHome} onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <Title>Dashboard</Title>
            </div>
            <Dropdown className="flex pl-6 w-1/2 justify-right col-span-3">
              <DropdownItem value="1" text={" Show all"} />
              <DropdownItem value="2" text={"Project A"} />
              <DropdownItem value="3" text={"Project B"} />
              <DropdownItem value="4" text={"Project C"} />
            </Dropdown>
          </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className="flex col-span-1">
                <Card>
                  Deadline
                </Card>
              </div>
              <div className="flex col-span-1">
                <Card>
                  Man Hours
                </Card>
              </div>
              <div className="flex col-span-1">
                <Card>
                  Total Task
                </Card>
              </div>
              <div className="col-span-2">
                <Card className="h-2/5 overflow-auto">
                  <MyDemo projectsId={"all" as string} />
                </Card>
              </div>
              <div className="col-span-1">
                <Card className="h-2/5 overflow-auto">
                  <Text className="mb-2 text-gray-800">Task Performance</Text>
                </Card>
              </div>
            </div>

          </main>
        </ThemeProvider>
      </>
      
    );

};       