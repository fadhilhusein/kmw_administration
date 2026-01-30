"use client";
import React, { useState } from "react";
import { CloseIcon, UserCircleIcon, PlusIcon, PencilIcon, TrashBinIcon } from "@/icons";
import { useSidebar } from "@/context/SidebarContext";

interface DatabaseAnggotaModalProps {
  onClose: () => void;
}

interface Anggota {
  id: number;
  nama: string;
  nim: string;
  jabatan: string;
  divisi: string;
  status: "Aktif" | "Non-Aktif";
  email: string;
  phone: string;
}

const DatabaseAnggotaModal: React.FC<DatabaseAnggotaModalProps> = ({ onClose }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState<"list" | "add" | "structure">("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - nanti akan diganti dengan API call
  const [anggotaList] = useState<Anggota[]>([
    {
      id: 1,
      nama: "Ahmad Rizki",
      nim: "2021001",
      jabatan: "Ketua",
      divisi: "Eksekutif",
      status: "Aktif",
      email: "ahmad.rizki@email.com",
      phone: "081234567890"
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      nim: "2021002",
      jabatan: "Sekretaris",
      divisi: "Eksekutif",
      status: "Aktif",
      email: "siti.nurhaliza@email.com",
      phone: "081234567891"
    },
    {
      id: 3,
      nama: "Budi Santoso",
      nim: "2020015",
      jabatan: "Anggota",
      divisi: "Humas",
      status: "Non-Aktif",
      email: "budi.santoso@email.com",
      phone: "081234567892"
    }
  ]);

  const filteredAnggota = anggotaList.filter(anggota =>
    anggota.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anggota.nim.includes(searchTerm) ||
    anggota.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex-shrink-0">
              <UserCircleIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                Database Anggota
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                Kelola data profil & struktur
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0 ml-1 sm:ml-2"
          >
            <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide bg-white dark:bg-gray-900">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "list"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Daftar
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "add"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Tambah
          </button>
          <button
            onClick={() => setActiveTab("structure")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "structure"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Struktur
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            {activeTab === "list" && (
              <div className="space-y-4">
                {/* Search */}
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Cari anggota..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm whitespace-nowrap">
                    <PlusIcon className="w-4 h-4" />
                    <span>Tambah</span>
                  </button>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="hidden sm:table-header-group bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">Nama</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">NIM</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">Jabatan</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white text-sm">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="sm:table-row-group">
                        {filteredAnggota.map((anggota) => (
                          <tr key={anggota.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 block sm:table-row mb-4 sm:mb-0 bg-white dark:bg-gray-900 rounded-lg sm:rounded-none shadow-sm sm:shadow-none">
                            {/* Mobile Card Layout */}
                            <td className="block sm:table-cell sm:py-3 sm:px-4 p-4">
                              <div className="sm:hidden space-y-2">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{anggota.nama}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{anggota.email}</div>
                                    <div className="text-xs text-gray-500 mt-1">NIM: {anggota.nim}</div>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                                    anggota.status === "Aktif"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  }`}>
                                    {anggota.status}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {anggota.jabatan} • {anggota.divisi}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                      <PencilIcon className="w-3.5 h-3.5 text-gray-500" />
                                    </button>
                                    <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                      <TrashBinIcon className="w-3.5 h-3.5 text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* Desktop Table Layout */}
                              <div className="hidden sm:block">
                                <div className="font-medium text-gray-900 dark:text-white">{anggota.nama}</div>
                                <div className="text-sm text-gray-500">{anggota.email}</div>
                              </div>
                            </td>
                            <td className="hidden sm:table-cell py-3 px-4 text-gray-900 dark:text-white">{anggota.nim}</td>
                            <td className="hidden sm:table-cell py-3 px-4 text-gray-900 dark:text-white">{anggota.jabatan}</td>
                            <td className="hidden sm:table-cell py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                anggota.status === "Aktif"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}>
                                {anggota.status}
                              </span>
                            </td>
                            <td className="hidden sm:table-cell py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                  <PencilIcon className="w-4 h-4 text-gray-500" />
                                </button>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                  <TrashBinIcon className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "add" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Tambah Anggota Baru
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          NIM
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Masukkan NIM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Masukkan email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          No. Telepon
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Masukkan no. telepon"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Jabatan
                        </label>
                        <select className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Pilih Jabatan</option>
                          <option value="Ketua">Ketua</option>
                          <option value="Wakil Ketua">Wakil Ketua</option>
                          <option value="Sekretaris">Sekretaris</option>
                          <option value="Bendahara">Bendahara</option>
                          <option value="Koordinator">Koordinator</option>
                          <option value="Anggota">Anggota</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Divisi
                        </label>
                        <select className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Pilih Divisi</option>
                          <option value="Eksekutif">Eksekutif</option>
                          <option value="Humas">Humas</option>
                          <option value="Acara">Acara</option>
                          <option value="Keuangan">Keuangan</option>
                          <option value="Akademik">Akademik</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Simpan Anggota
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "structure" && (
              <div className="max-w-6xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                      Struktur Organisasi KMW
                    </h3>
                    
                    {/* Organizational Chart */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                      <div className="space-y-12">
                        {/* Level 1 - Ketua */}
                        <div className="flex justify-center">
                          <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg text-center min-w-[200px]">
                            <div className="font-medium text-gray-900 dark:text-white text-lg">Ahmad Rizki</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ketua</div>
                          </div>
                        </div>
                        
                        {/* Level 2 - Wakil & Sekretaris & Bendahara */}
                        <div className="flex justify-center space-x-8 flex-wrap gap-4">
                          <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg text-center min-w-[180px]">
                            <div className="font-medium text-gray-900 dark:text-white">Sarah Putri</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Wakil Ketua</div>
                          </div>
                          <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg text-center min-w-[180px]">
                            <div className="font-medium text-gray-900 dark:text-white">Siti Nurhaliza</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sekretaris</div>
                          </div>
                          <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg text-center min-w-[180px]">
                            <div className="font-medium text-gray-900 dark:text-white">Andi Pratama</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bendahara</div>
                          </div>
                        </div>
                        
                        {/* Level 3 - Koordinator Divisi */}
                        <div className="flex justify-center space-x-6 flex-wrap gap-4">
                          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center min-w-[160px]">
                            <div className="font-medium text-gray-900 dark:text-white">Rini Astuti</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Koordinator Humas</div>
                          </div>
                          <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg text-center min-w-[160px]">
                            <div className="font-medium text-gray-900 dark:text-white">Dedi Kurniawan</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Koordinator Acara</div>
                          </div>
                          <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded-lg text-center min-w-[160px]">
                            <div className="font-medium text-gray-900 dark:text-white">Maya Sari</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Koordinator Akademik</div>
                          </div>
                        </div>
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

  export default DatabaseAnggotaModal;