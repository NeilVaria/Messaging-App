import { useState, useEffect } from "react";
import ProjectsCard from "@/components/ProjectCard";
import ProjectList from "@/components/ProjectList";
import { ProjectData } from "./api/projectData";
import EmpTbl from '@/components/EmployeeTbl';
import EmpTblSingle from '@/components/EmployeeTbl';
import MyDemo from "@/components/manHrsChart";
import { Card, Dropdown, DropdownItem, Text, Title } from "@tremor/react";
import Head from "next/head";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "complete" | "overdue" | "incomplete">("all");
  const [progressSortOrder, setProgressSortOrder] = useState<"ascending" | "descending">("ascending");
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch("/api/projectData");
      const projectData = await res.json();
      setProjects(projectData);
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    // Filter based on status
    if (statusFilter === "complete") {
      filtered = filtered.filter((project) => project.progress === 100);
    } else if (statusFilter === "overdue") {
      filtered = filtered.filter((project) => project.progress < 100 && new Date(project.deadline) < new Date());
    } else if (statusFilter === "incomplete") {
      filtered = filtered.filter((project) => project.progress < 100);
    }

    // Filter based on search term
    if (searchTerm !== "") {
      filtered = filtered.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sort based on progress
    if (progressSortOrder === "ascending") {
      filtered.sort((a, b) => a.progress - b.progress);
    } else if (progressSortOrder === "descending") {
      filtered.sort((a, b) => b.progress - a.progress);
    }

    setFilteredProjects(filtered);
  }, [projects, statusFilter, searchTerm, progressSortOrder]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleStatusFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(e.target.value as typeof statusFilter);
  }

  function handleProgressSortOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    setProgressSortOrder(e.target.value as typeof progressSortOrder);
  }


  return (
    <>
    <Head>
      <title>Analytics</title>
    </Head>
      <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search projects"
          className="border border-gray-300 px-4 py-2 rounded-md w-1/2 mr-4"
          value={searchTerm}
          onChange={handleSearch} />
        <select
          className="border border-gray-300 px-4 py-2 rounded-md w-1/4"
          value={statusFilter}
          onChange={handleStatusFilter}
        >
          <option value="all">All projects</option>
          <option value="complete">Completed projects</option>
          <option value="overdue">Overdue projects</option>
          <option value="incomplete">Incomplete projects</option>
        </select>
        <select
          className="border border-gray-300 px-4 py-2 rounded-md w-1/4"
          value={progressSortOrder}
          onChange={handleProgressSortOrder}
        >
          <option value="ascendingending">Sort by ascending progress</option>
          <option value="descendingending">Sort by descending progress</option>
        </select>
      </div>
      <div className="grid grid-cols-5 gap-6 mt-6">
        <div className="flex col-span-5">
          <ProjectList projects={filteredProjects} />
        </div>
        <div className="col-span-3">
          <Card className="h-4/5 overflow-auto">
            <EmpTbl />
          </Card>
        </div>
        <div className="col-span-2">
          <Card className="h-4/5 overflow-auto">
            <MyDemo projectsId={"all"} />
          </Card>
        </div>
      </div>
    </div></>
    
  );
  
  }
