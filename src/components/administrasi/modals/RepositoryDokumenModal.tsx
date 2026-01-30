"use client";
import React, { useState } from "react";
import { CloseIcon, DocsIcon, FolderIcon, DownloadIcon, PlusIcon, FileIcon } from "@/icons";
import { useSidebar } from "@/context/SidebarContext";

interface RepositoryDokumenModalProps {
  onClose: () => void;
}

interface Dokumen {
  id: number;
  nama: string;
  jenis: "Proposal" | "LPJ" | "Template" | "Surat";
  kategori: string;
  tanggalUpload: string;
  ukuran: string;
  status: "Approved" | "Pending" | "Rejected";
  uploadedBy: string;
}

const RepositoryDokumenModal: React.FC<RepositoryDokumenModalProps> = ({ onClose }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState<"browse" | "upload" | "templates">("browse");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [dokumenList] = useState<Dokumen[]>([
    {
      id: 1,
      nama: "Proposal Kegiatan Seminar Nasional 2024",
      jenis: "Proposal",
      kategori: "Akademik",
      tanggalUpload: "2024-01-25",
      ukuran: "2.5 MB",
      status: "Approved",
      uploadedBy: "Ahmad Rizki"
    },
    {
      id: 2,
      nama: "LPJ Workshop Programming",
      jenis: "LPJ",
      kategori: "Pelatihan",
      tanggalUpload: "2024-01-20",
      ukuran: "1.8 MB",
      status: "Approved",
      uploadedBy: "Siti Nurhaliza"
    },
    {
      id: 3,
      nama: "Template Surat Undangan Resmi",
      jenis: "Template",
      kategori: "Administrasi",
      tanggalUpload: "2024-01-15",
      ukuran: "0.5 MB",
      status: "Approved",
      uploadedBy: "System Admin"
    },
    {
      id: 4,
      nama: "Proposal Bakti Sosial Q1 2024",
      jenis: "Proposal",
      kategori: "Sosial",
      tanggalUpload: "2024-01-28",
      ukuran: "3.2 MB",
      status: "Pending",
      uploadedBy: "Budi Santoso"
    }
  ]);

  const categories = ["all", "Akademik", "Pelatihan", "Administrasi", "Sosial", "Event"];

  const filteredDokumen = dokumenList.filter(doc => {
    const matchesCategory = selectedCategory === "all" || doc.kategori === selectedCategory;
    const matchesSearch = doc.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.jenis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getJenisColor = (jenis: string) => {
    switch (jenis) {
      case "Proposal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "LPJ":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Template":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Surat":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-white dark:bg-gray-900 z-30 ${
        isMobileOpen 
          ? '' 
          : isExpanded || isHovered 
          ? 'lg:left-[290px]' 
          : 'lg:left-[90px]'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-purple-50 dark:bg-purple-500 dark:bg-opacity-10 rounded-lg">
              <DocsIcon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white">
                Repository Dokumen (E-Arsip)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Bank data proposal, LPJ, dan template surat organisasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide bg-white dark:bg-gray-900">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "browse"
                ? "border-purple-500 text-purple-600 dark:text-purple-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Jelajahi
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "upload"
                ? "border-purple-500 text-purple-600 dark:text-purple-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "templates"
                ? "border-purple-500 text-purple-600 dark:text-purple-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Template
          </button>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {activeTab === "browse" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari dokumen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    <option value="all">Semua Kategori</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
                    <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-3 sm:p-4 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">156</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Proposal</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-3 sm:p-4 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-green-600">89</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">LPJ</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 p-3 sm:p-4 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-purple-600">23</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Template</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 p-3 sm:p-4 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-orange-600">45</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Surat</div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredDokumen.map((doc) => (
                  <div key={doc.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="p-1.5 sm:p-2 bg-white dark:bg-gray-900 rounded-lg flex-shrink-0">
                          <FileIcon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm sm:text-base">
                            {doc.nama}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJenisColor(doc.jenis)}`}>
                              {doc.jenis}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              {doc.kategori}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              {doc.ukuran}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Upload: {doc.tanggalUpload} oleh {doc.uploadedBy}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 ml-2 flex-shrink-0">
                        <button className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                          <DownloadIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="max-w-2xl">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-4 sm:mb-6">
                Upload Dokumen Baru
              </h3>
              
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Dokumen
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Masukkan nama dokumen"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jenis Dokumen
                    </label>
                    <select className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                      <option value="">Pilih Jenis</option>
                      <option value="Proposal">Proposal</option>
                      <option value="LPJ">LPJ</option>
                      <option value="Template">Template</option>
                      <option value="Surat">Surat</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kategori
                    </label>
                    <select className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                      <option value="">Pilih Kategori</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Pelatihan">Pelatihan</option>
                      <option value="Administrasi">Administrasi</option>
                      <option value="Sosial">Sosial</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Masukkan deskripsi dokumen"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    File Dokumen
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 text-center">
                    <FolderIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                      Drag & drop file atau klik untuk browse
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      Mendukung: PDF, DOC, DOCX, XLS, XLSX (Max: 10MB)
                    </p>
                    <button
                      type="button"
                      className="mt-3 sm:mt-4 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm"
                    >
                      Pilih File
                    </button>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Pengaturan Akses</h4>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      Dapat diakses oleh semua anggota
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      Memerlukan persetujuan admin
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      Kirim notifikasi ke admin
                    </span>
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 sm:px-6 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                  >
                    Upload Dokumen
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                  Template Library
                </h3>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
                  <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Tambah Template</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                      <FileIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        Surat Undangan Resmi
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Template undangan acara
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Digunakan 45x
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">
                        Preview
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-xs sm:text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                      <FileIcon className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        Format Proposal Kegiatan
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Template proposal standar
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Digunakan 78x
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">
                        Preview
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-xs sm:text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
                      <FileIcon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        Format LPJ Kegiatan
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Template laporan pertanggungjawaban
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Digunakan 32x
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">
                        Preview
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-xs sm:text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryDokumenModal;