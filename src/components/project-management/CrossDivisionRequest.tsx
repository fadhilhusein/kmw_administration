"use client";
import React, { useState } from "react";
import { PlusIcon, PaperPlaneIcon, CheckCircleIcon, CloseIcon } from "@/icons";

interface Request {
  id: number;
  title: string;
  description: string;
  fromDivision: string;
  toDivision: string;
  requestType: "task" | "resource" | "collaboration" | "support";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "approved" | "rejected" | "in-progress" | "completed";
  createdAt: string;
  dueDate: string;
  requester: string;
  assignedTo?: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  message: string;
  timestamp: string;
  division: string;
}

const CrossDivisionRequest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "sent" | "received" | "create">("all");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showModal, setShowModal] = useState(false);

  const divisions = [
    { id: "acara", name: "Divisi Acara" },
    { id: "pelatihan", name: "Divisi Pelatihan" },
    { id: "sosial", name: "Divisi Sosial" },
    { id: "humas", name: "Divisi Humas" },
    { id: "it", name: "Divisi IT" },
    { id: "keuangan", name: "Divisi Keuangan" }
  ];

  const [requests] = useState<Request[]>([
    {
      id: 1,
      title: "Bantuan Desain Poster Seminar",
      description: "Membutuhkan bantuan desain poster untuk seminar nasional teknologi. Poster harus mencakup informasi speaker, jadwal, dan sponsor.",
      fromDivision: "acara",
      toDivision: "humas",
      requestType: "task",
      priority: "high",
      status: "pending",
      createdAt: "2024-02-15T10:00:00Z",
      dueDate: "2024-03-01",
      requester: "Ahmad Rizki",
      comments: [
        {
          id: 1,
          author: "Ahmad Rizki",
          message: "Poster ini sangat penting untuk promosi acara. Mohon bantuan segera.",
          timestamp: "2024-02-15T10:05:00Z",
          division: "acara"
        }
      ]
    },
    {
      id: 2,
      title: "Kolaborasi Workshop Programming",
      description: "Mengundang divisi IT untuk berkolaborasi dalam workshop programming. Divisi IT akan menjadi trainer utama.",
      fromDivision: "pelatihan",
      toDivision: "it",
      requestType: "collaboration",
      priority: "medium",
      status: "approved",
      createdAt: "2024-02-10T14:30:00Z",
      dueDate: "2024-03-15",
      requester: "Siti Nurhaliza",
      assignedTo: "Andi Pratama",
      comments: [
        {
          id: 2,
          author: "Siti Nurhaliza",
          message: "Workshop ini akan sangat bermanfaat untuk anggota. Terima kasih atas kolaborasinya.",
          timestamp: "2024-02-10T14:35:00Z",
          division: "pelatihan"
        },
        {
          id: 3,
          author: "Andi Pratama",
          message: "Siap! Kami akan menyiapkan materi dan trainer terbaik.",
          timestamp: "2024-02-11T09:00:00Z",
          division: "it"
        }
      ]
    },
    {
      id: 3,
      title: "Dukungan Teknis Website",
      description: "Membutuhkan dukungan teknis untuk maintenance website organisasi dan penambahan fitur baru.",
      fromDivision: "humas",
      toDivision: "it",
      requestType: "support",
      priority: "medium",
      status: "in-progress",
      createdAt: "2024-02-12T16:00:00Z",
      dueDate: "2024-02-28",
      requester: "Maya Sari",
      assignedTo: "Lina Kusuma",
      comments: []
    },
    {
      id: 4,
      title: "Permintaan Dana Kegiatan Baksos",
      description: "Mengajukan permintaan dana untuk kegiatan bakti sosial bulan depan. Total kebutuhan Rp 5.000.000.",
      fromDivision: "sosial",
      toDivision: "keuangan",
      requestType: "resource",
      priority: "high",
      status: "pending",
      createdAt: "2024-02-14T11:00:00Z",
      dueDate: "2024-02-25",
      requester: "Budi Santoso",
      comments: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case "task":
        return "📋";
      case "resource":
        return "💰";
      case "collaboration":
        return "🤝";
      case "support":
        return "🛠️";
      default:
        return "📄";
    }
  };

  const getDivisionName = (divisionId: string) => {
    return divisions.find(d => d.id === divisionId)?.name || divisionId;
  };

  const filteredRequests = requests.filter(request => {
    switch (activeTab) {
      case "sent":
        return request.fromDivision === "acara"; // Assuming current user is from "acara"
      case "received":
        return request.toDivision === "acara"; // Assuming current user is from "acara"
      default:
        return true;
    }
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
              <PaperPlaneIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cross-Division Request System
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sistem permintaan kerja antar divisi
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab("create")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Buat Permintaan</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide bg-white dark:bg-gray-900">
        {[
          { id: "all", label: "Semua" },
          { id: "sent", label: "Dikirim" },
          { id: "received", label: "Diterima" },
          { id: "create", label: "Buat Baru" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 sm:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? "border-green-500 text-green-600 dark:text-green-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {activeTab === "create" ? (
          /* Create Request Form */
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Buat Permintaan Baru
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Divisi Tujuan
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Pilih Divisi</option>
                    {divisions.map(division => (
                      <option key={division.id} value={division.id}>{division.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Jenis Permintaan
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Pilih Jenis</option>
                    <option value="task">Task/Tugas</option>
                    <option value="resource">Resource/Sumber Daya</option>
                    <option value="collaboration">Kolaborasi</option>
                    <option value="support">Dukungan Teknis</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prioritas
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                    <option value="urgent">Mendesak</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Permintaan
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Masukkan judul permintaan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi Detail
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Jelaskan detail permintaan Anda..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Kirim Permintaan
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Request List */
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedRequest(request);
                  setShowModal(true);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg">{getRequestTypeIcon(request.requestType)}</span>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {request.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {request.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        Dari: <strong>{getDivisionName(request.fromDivision)}</strong>
                      </span>
                      <span>
                        Ke: <strong>{getDivisionName(request.toDivision)}</strong>
                      </span>
                      <span>
                        Deadline: {new Date(request.dueDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(request.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setShowModal(false)}></div>
            
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detail Permintaan
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getRequestTypeIcon(selectedRequest.requestType)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                          {selectedRequest.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                          {selectedRequest.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Dari:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {getDivisionName(selectedRequest.fromDivision)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Ke:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {getDivisionName(selectedRequest.toDivision)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Peminta:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest.requester}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Deadline:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {new Date(selectedRequest.dueDate).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Deskripsi:</span>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {selectedRequest.description}
                    </p>
                  </div>

                  {/* Comments */}
                  {selectedRequest.comments.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3">Komentar</h5>
                      <div className="space-y-3">
                        {selectedRequest.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(comment.timestamp).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {comment.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {selectedRequest.status === "pending" && (
                    <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Setujui</span>
                      </button>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                        <CloseIcon className="w-4 h-4" />
                        <span>Tolak</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossDivisionRequest;