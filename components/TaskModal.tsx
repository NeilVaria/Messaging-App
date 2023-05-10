import React, { useState } from "react";
import Modal from "react-modal";

interface ProjectProps {
    id: string;
    name: String;
    taskCount: number;
    deadline: string;
    memberCount: number;
    progress: number;
    description: String;
  }
  

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  project: ProjectProps;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onRequestClose, project }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Create a new task for {project.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="task-name">
              Task Name
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-md"
              type="text"
              name="task-name"
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="task-description">
              Task Description
            </label>
            <textarea
              className="w-full border border-gray-400 p-2 rounded-md"
              name="task-description"
              id="task-description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="task-due-date">
              Due Date
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-md"
              type="date"
              name="task-due-date"
              id="task-due-date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-600"
            >
              Create Task
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 ml-4 px-4 py-2 rounded-md font-bold hover:bg-gray-400"
              onClick={onRequestClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;
