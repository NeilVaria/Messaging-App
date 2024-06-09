import React, { useState } from "react";
import Head from "next/head";
import { Card, Text, Title } from "@tremor/react";
import classNames from "classnames";
import router from "next/router";

const projectsData = [
  { id: 1, name: "Project Charlotte", status: "complete" },
  { id: 2, name: "Project Caroline", status: "complete" },
  { id: 3, name: "Project Abu", status: "incomplete" },
  { id: 4, name: "Project Neil", status: "complete" },
  { id: 5, name: "Project Manara", status: "incomplete" },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredProjects = projectsData.filter((project) => {
    if (project.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterTerm === "" || project.status === filterTerm)) {
      return true;
    }
    return false;
  });

  const sortedProjects = filteredProjects.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sortOrder === "asc") {
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    } else {
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
    }
    return 0;
  });

  const handleSortChange = (event: any) => {
    setSortOrder(event.target.value);
  };

  const handleCardClick = (id: number) => {
    console.log(`Card with ID ${id} clicked`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Head>
        <title>Project Dashboard</title>
      </Head>
      <div className="flex flex-wrap justify-between mb-8">
        <h1 className="text-4xl font-bold mb-4 w-full md:w-auto md:flex-none">Project Dashboard</h1>
        <div className="flex flex-wrap items-center mb-4 w-full md:w-auto md:flex-none">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-l-md w-full md:w-auto md:rounded md:border-l-0 m-2"
          />
          <select value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} className="p-2 rounded-md w-full md:w-auto md:rounded-none md:border-l-0">
            <option value="">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <ul className="flex flex-wrap -mx-4">
        {sortedProjects.map((project) => (
          <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4" key={project.id}>
            <Card onClick={() => router.push("/analytics")} className="cursor-pointer">
              <Title>{project.name}</Title>
              <Text
                className={classNames({
                  "text-green-500": project.status === "complete",
                  "text-red-500": project.status === "incomplete",
                })}
              >
                Status: {project.status}
              </Text>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
