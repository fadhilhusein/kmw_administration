"use client";
import React, { useState } from "react";
import { CalenderIcon, ChevronDownIcon, PlusIcon } from "@/icons";

interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: "not-started" | "in-progress" | "completed" | "delayed";
  assignee: string;
  division: string;
  dependencies?: number[];
}

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "planning" | "active" | "completed" | "on-hold";
  tasks: Task[];
}

const GanttChart: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: "Program Kerja Semester Genap 2024",
      description: "Pelaksanaan seluruh program kerja divisi untuk semester genap",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      status: "active",
      tasks: [
        {
          id: 1,
          name: "Seminar Nasional Teknologi",
          startDate: "2024-02-15",
          endDate: "2024-03-15",
          progress: 75,
          status: "in-progress",
          assignee: "Divisi Acara",
          division: "Acara"
        },
        {
          id: 2,
          name: "Workshop Programming",
          startDate: "2024-03-01",
          endDate: "2024-03-30",
          progress: 45,
          status: "in-progress",
          assignee: "Divisi Pelatihan",
          division: "Pelatihan"
        },
        {
          id: 3,
          name: "Bakti Sosial Q1",
          startDate: "2024-03-15",
          endDate: "2024-04-15",
          progress: 20,
          status: "not-started",
          assignee: "Divisi Sosial",
          division: "Sosial"
        },
        {
          id: 4,
          name: "Evaluasi Program Kerja",
          startDate: "2024-06-01",
          endDate: "2024-06-30",
          progress: 0,
          status: "not-started",
          assignee: "Divisi Evaluasi",
          division: "Evaluasi",
          dependencies: [1, 2, 3]
        }
      ]
    },
    {
      id: 2,
      name: "Pengembangan Sistem Informasi",
      description: "Digitalisasi proses administrasi organisasi",
      startDate: "2024-01-01",
      endDate: "2024-05-31",
      status: "active",
      tasks: [
        {
          id: 5,
          name: "Analisis Kebutuhan Sistem",
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          progress: 100,
          status: "completed",
          assignee: "Tim IT",
          division: "IT"
        },
        {
          id: 6,
          name: "Desain UI/UX",
          startDate: "2024-02-01",
          endDate: "2024-02-28",
          progress: 90,
          status: "in-progress",
          assignee: "Tim Design",
          division: "IT"
        },
        {
          id: 7,
          name: "Development Backend",
          startDate: "2024-03-01",
          endDate: "2024-04-30",
          progress: 60,
          status: "in-progress",
          assignee: "Tim Backend",
          division: "IT"
        }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "delayed":
        return "bg-red-500";
      case "not-started":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const calculateTaskWidth = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(duration * 2, 60); // Minimum width 60px
  };

  const calculateTaskPosition = (startDate: string, projectStartDate: string) => {
    const start = new Date(startDate);
    const projectStart = new Date(projectStartDate);
    const offset = Math.ceil((start.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(offset * 2, 0);
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
              <CalenderIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Dashboard Timeline (Gantt Chart)
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Visualisasi jadwal seluruh Program Kerja (Proker)
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as "month" | "week" | "day")}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="month">Bulanan</option>
              <option value="week">Mingguan</option>
              <option value="day">Harian</option>
            </select>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
              <PlusIcon className="w-4 h-4" />
              <span>Tambah Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Info */}
      {currentProject && (
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {currentProject.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {currentProject.description}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {currentProject.startDate} - {currentProject.endDate}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(currentProject.status)}`}>
                  {currentProject.status}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentProject.tasks.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gantt Chart */}
      {currentProject && (
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Timeline Header */}
              <div className="flex mb-4">
                <div className="w-64 flex-shrink-0"></div>
                <div className="flex-1 grid grid-cols-12 gap-1 text-xs text-gray-500 dark:text-gray-400">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="text-center py-2 border-l border-gray-200 dark:border-gray-700">
                      {new Date(2024, i).toLocaleDateString('id-ID', { month: 'short' })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {currentProject.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    {/* Task Info */}
                    <div className="w-64 flex-shrink-0 pr-4">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {task.name}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {task.division}
                          </span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {task.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                          <div
                            className={`h-1.5 rounded-full ${getStatusColor(task.status)}`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Bar */}
                    <div className="flex-1 relative h-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid grid-cols-12 h-full">
                        {Array.from({ length: 12 }, (_, i) => (
                          <div key={i} className="border-l border-gray-200 dark:border-gray-700"></div>
                        ))}
                      </div>
                      
                      {/* Task Bar */}
                      <div
                        className={`absolute top-2 h-8 ${getStatusColor(task.status)} rounded-md flex items-center px-2`}
                        style={{
                          left: `${calculateTaskPosition(task.startDate, currentProject.startDate)}px`,
                          width: `${calculateTaskWidth(task.startDate, task.endDate)}px`
                        }}
                      >
                        <span className="text-white text-xs font-medium truncate">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Delayed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Not Started</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;