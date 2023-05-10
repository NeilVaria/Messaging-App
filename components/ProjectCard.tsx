import React, { useState } from "react";
import Link from "next/link";

interface ProjectProps {
  id: string;
  name: String;
  taskCount: number;
  deadline: string;
  memberCount: number;
  progress: number;
  description: String;
}

const ProjectCard: React.FC<ProjectProps> = ({ id, name, description, taskCount, deadline, memberCount, progress }) => {
  return (
    <div className="w-1/4 mx-auto my-10 p-4 bg-white rounded-lg shadow-md cursor-pointer">
      <Link href={`/projects/${id}`}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">{name}</h2>
          <span className="text-gray-700 ml-4 text-sm">Deadline: {deadline}</span>
        </div>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700">Tasks: {taskCount}</span>
          <span className="text-gray-700">Members: {memberCount}</span>
        </div>
        <div className="mb-4"></div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-gray-700">Progress: {progress}%</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
