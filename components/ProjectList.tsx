import React from "react";
import ProjectCard from "./ProjectCard";
import { ProjectData } from "../pages/api/projectData";
import Link from "next/link";

interface ProjectListProps {
  projects: ProjectData[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="flex flex-wrap">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          taskCount={project.taskCount}
          deadline={project.deadline}
          memberCount={project.memberCount}
          progress={project.progress}
        />
      ))}
    </div>
  );
};

export default ProjectList;
