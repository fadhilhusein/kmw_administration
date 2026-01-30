"use client";
import React, { useState } from "react";
import { PlusIcon, UserCircleIcon, CalenderIcon } from "@/icons";

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  tags: string[];
  division: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const KanbanBoard: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  
  const divisions = [
    { id: "all", name: "Semua Divisi" },
    { id: "acara", name: "Divisi Acara" },
    { id: "pelatihan", name: "Divisi Pelatihan" },
    { id: "sosial", name: "Divisi Sosial" },
    { id: "humas", name: "Divisi Humas" },
    { id: "it", name: "Divisi IT" }
  ];

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-100 dark:bg-gray-800",
      tasks: [
        {
          id: 1,
          title: "Persiapan Seminar Nasional",
          description: "Menyiapkan venue, speaker, dan materi seminar",
          assignee: "Ahmad Rizki",
          priority: "high",
          dueDate: "2024-03-15",
          tags: ["Event", "Seminar"],
          division: "acara"
        },
        {
          id: 2,
          title: "Desain Poster Workshop",
          description: "Membuat desain poster untuk workshop programming",
          assignee: "Siti Nurhaliza",
          priority: "medium",
          dueDate: "2024-03-10",
          tags: ["Design", "Workshop"],
          division: "humas"
        },
        {
          id: 3,
          title: "Survey Lokasi Baksos",
          description: "Mencari dan survey lokasi untuk kegiatan bakti sosial",
          assignee: "Budi Santoso",
          priority: "medium",
          dueDate: "2024-03-20",
          tags: ["Survey", "Baksos"],
          division: "sosial"
        }
      ]
    },
    {
      id: "progress",
      title: "In Progress",
      color: "bg-blue-100 dark:bg-blue-900",
      tasks: [
        {
          id: 4,
          title: "Pengembangan Website",
          description: "Membuat website organisasi dengan fitur lengkap",
          assignee: "Andi Pratama",
          priority: "high",
          dueDate: "2024-04-01",
          tags: ["Development", "Website"],
          division: "it"
        },
        {
          id: 5,
          title: "Koordinasi dengan Sponsor",
          description: "Menghubungi dan bernegosiasi dengan calon sponsor",
          assignee: "Maya Sari",
          priority: "high",
          dueDate: "2024-03-25",
          tags: ["Sponsor", "Negosiasi"],
          division: "humas"
        }
      ]
    },
    {
      id: "review",
      title: "Review",
      color: "bg-yellow-100 dark:bg-yellow-900",
      tasks: [
        {
          id: 6,
          title: "Proposal Workshop Programming",
          description: "Review dan finalisasi proposal workshop",
          assignee: "Dina Marlina",
          priority: "medium",
          dueDate: "2024-03-12",
          tags: ["Proposal", "Workshop"],
          division: "pelatihan"
        }
      ]
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-100 dark:bg-green-900",
      tasks: [
        {
          id: 7,
          title: "Rapat Koordinasi Bulanan",
          description: "Rapat evaluasi dan perencanaan bulan depan",
          assignee: "Rizky Aditya",
          priority: "low",
          dueDate: "2024-02-28",
          tags: ["Meeting", "Koordinasi"],
          division: "acara"
        },
        {
          id: 8,
          title: "Update Database Anggota",
          description: "Memperbarui data anggota organisasi",
          assignee: "Lina Kusuma",
          priority: "low",
          dueDate: "2024-02-25",
          tags: ["Database", "Update"],
          division: "it"
        }
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getDivisionColor = (division: string) => {
    const colors = {
      acara: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      pelatihan: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      sosial: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      humas: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      it: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
    };
    return colors[division as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: selectedDivision === "all" 
      ? column.tasks 
      : column.tasks.filter(task => task.division === selectedDivision)
  }));

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("text/plain"));
    
    // Find and move task between columns
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      let taskToMove: Task | null = null;
      
      // Remove task from current column
      newColumns.forEach(column => {
        const taskIndex = column.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          taskToMove = column.tasks.splice(taskIndex, 1)[0];
        }
      });
      
      // Add task to new column
      if (taskToMove) {
        const targetColumn = newColumns.find(column => column.id === columnId);
        if (targetColumn) {
          targetColumn.tasks.push(taskToMove);
        }
      }
      
      return newColumns;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
              <UserCircleIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Kanban Board Divisi
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Papan kerja digital untuk internal divisi
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {divisions.map(division => (
                <option key={division.id} value={division.id}>{division.name}</option>
              ))}
            </select>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
              <PlusIcon className="w-4 h-4" />
              <span>Tambah Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredColumns.map((column) => (
            <div
              key={column.id}
              className={`${column.color} rounded-lg p-4`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {column.title}
                </h3>
                <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-medium">
                  {column.tasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-shadow"
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {task.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>

                    {/* Task Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDivisionColor(task.division)}`}>
                        {divisions.find(d => d.id === task.division)?.name.replace('Divisi ', '')}
                      </span>
                    </div>

                    {/* Task Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <UserCircleIcon className="w-3 h-3" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalenderIcon className="w-3 h-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Task Button */}
                <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <PlusIcon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">Tambah Task</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredColumns.map((column) => (
            <div key={column.id} className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {column.tasks.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {column.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;