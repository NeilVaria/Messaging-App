import { useState, useEffect } from "react";
import ProjectsCard from "@/components/ProjectCard";
import ProjectList from "@/components/ProjectList";
import { ProjectData } from "./api/projectData";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
    const filtered = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProjects(filtered);
  }, [projects, searchTerm]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search projects"
          className="border border-gray-300 px-4 py-2 rounded-md w-1/2 mr-4"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select className="border border-gray-300 px-4 py-2 rounded-md w-1/4" onChange={() => {}}>
          <option value="">All categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      <ProjectList projects={filteredProjects} />
    </div>
  );
}
