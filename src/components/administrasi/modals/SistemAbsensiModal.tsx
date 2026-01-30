"use client";
import React, { useState } from "react";
import { CloseIcon, CheckCircleIcon, CalenderIcon } from "@/icons";
import { useSidebar } from "@/context/SidebarContext";

interface SistemAbsensiModalProps {
  onClose: () => void;
}

interface RapatAbsensi {
  id: number;
  namaRapat: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  totalPeserta: number;
  hadir: number;
  tidakHadir: number;
  status: "Berlangsung" | "Selesai" | "Akan Datang";
  qrCode?: string;
}

const SistemAbsensiModal: React.FC<SistemAbsensiModalProps> = ({ onClose }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState<"current" | "history" | "create">("current");

  // Sample data - nanti akan diganti dengan API call
  const [rapatList] = useState<RapatAbsensi[]>([
    {
      id: 1,
      namaRapat: "Rapat Koordinasi Bulanan",
      tanggal: "2024-01-29",
      waktu: "14:00 - 16:00",
      lokasi: "Ruang Rapat KMW",
      totalPeserta: 25,
      hadir: 22,
      tidakHadir: 3,
      status: "Berlangsung",
      qrCode: "QR123456"
    },
    {
      id: 2,
      namaRapat: "Evaluasi Program Kerja",
      tanggal: "2024-01-25",
      waktu: "09:00 - 11:00",
      lokasi: "Aula Fakultas",
      totalPeserta: 30,
      hadir: 28,
      tidakHadir: 2,
      status: "Selesai"
    },
    {
      id: 3,
      namaRapat: "Rapat Persiapan Event",
      tanggal: "2024-02-01",
      waktu: "13:00 - 15:00",
      lokasi: "Ruang Meeting",
      totalPeserta: 15,
      hadir: 0,
      tidakHadir: 0,
      status: "Akan Datang"
    }
  ]);

  const currentRapat = rapatList.filter(r => r.status === "Berlangsung");
  const historyRapat = rapatList.filter(r => r.status === "Selesai");
  const upcomingRapat = rapatList.filter(r => r.status === "Akan Datang");

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
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <CheckCircleIcon className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white">
                Sistem Absensi Digital
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                QR Code & Geolocation
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

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide bg-white dark:bg-gray-900">
          <button
            onClick={() => setActiveTab("current")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "current"
                ? "border-green-500 text-green-600 dark:text-green-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "history"
                ? "border-green-500 text-green-600 dark:text-green-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Riwayat
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === "create"
                ? "border-green-500 text-green-600 dark:text-green-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Buat Sesi
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            {activeTab === "current" && (
              <div className="space-y-6">
                {currentRapat.length > 0 ? (
                  currentRapat.map((rapat) => (
                    <div key={rapat.id} className="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {rapat.namaRapat}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>📅 {rapat.tanggal} • ⏰ {rapat.waktu}</p>
                            <p>📍 {rapat.lokasi}</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                          {rapat.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900 dark:text-white">Statistik Kehadiran</h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Peserta</span>
                                <span className="font-medium text-gray-900 dark:text-white">{rapat.totalPeserta}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Hadir</span>
                                <span className="font-medium text-green-600">{rapat.hadir}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Tidak Hadir</span>
                                <span className="font-medium text-red-600">{rapat.tidakHadir}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Persentase</span>
                                <span className="font-medium text-blue-600">
                                  {Math.round((rapat.hadir / rapat.totalPeserta) * 100)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900 dark:text-white">QR Code Absensi</h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                            <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                              <span className="text-gray-500 text-sm">QR Code</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              Scan untuk absen
                            </p>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                              Generate Ulang
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                          Lihat Detail Peserta
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">
                          Export Data
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                          Tutup Sesi
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                      <CalenderIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Tidak Ada Rapat Aktif
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Belum ada sesi absensi yang sedang berlangsung
                      </p>
                      <button
                        onClick={() => setActiveTab("create")}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                      >
                        Buat Sesi Absensi
                      </button>
                    </div>
                  </div>
                )}

                {upcomingRapat.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Rapat Mendatang
                    </h3>
                    <div className="space-y-3">
                      {upcomingRapat.map((rapat) => (
                        <div key={rapat.id} className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{rapat.namaRapat}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {rapat.tanggal} • {rapat.waktu} • {rapat.lokasi}
                              </p>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                              Mulai Absensi
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Riwayat Absensi
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      />
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">
                        Filter
                      </button>
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Nama Rapat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Tanggal</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Waktu</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Kehadiran</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Persentase</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyRapat.map((rapat) => (
                          <tr key={rapat.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{rapat.namaRapat}</div>
                                <div className="text-sm text-gray-500">{rapat.lokasi}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">{rapat.tanggal}</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-white">{rapat.waktu}</td>
                            <td className="py-3 px-4">
                              <div className="text-sm">
                                <div className="text-green-600 font-medium">Hadir: {rapat.hadir}</div>
                                <div className="text-red-600">Tidak: {rapat.tidakHadir}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-blue-600 font-medium">
                                {Math.round((rapat.hadir / rapat.totalPeserta) * 100)}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">Detail</button>
                                <button className="text-green-600 hover:text-green-800 text-sm">Export</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {historyRapat.map((rapat) => (
                      <div key={rapat.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {rapat.namaRapat}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              📍 {rapat.lokasi}
                            </p>
                          </div>
                          <span className="text-blue-600 font-medium text-sm ml-2">
                            {Math.round((rapat.hadir / rapat.totalPeserta) * 100)}%
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal & Waktu</p>
                            <p className="text-sm text-gray-900 dark:text-white">{rapat.tanggal}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">{rapat.waktu}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Kehadiran</p>
                            <div className="text-xs">
                              <span className="text-green-600 font-medium">✓ {rapat.hadir}</span>
                              <span className="text-gray-400 mx-1">•</span>
                              <span className="text-red-600 font-medium">✗ {rapat.tidakHadir}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-3">
                          <button className="text-blue-600 hover:text-blue-800 text-xs">Detail</button>
                          <button className="text-green-600 hover:text-green-800 text-xs">Export</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "create" && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Buat Sesi Absensi Baru
                  </h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nama Rapat
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Masukkan nama rapat"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tanggal
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Waktu Mulai
                        </label>
                        <input
                          type="time"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Waktu Selesai
                        </label>
                        <input
                          type="time"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Lokasi
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Masukkan lokasi rapat"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deskripsi (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="Masukkan deskripsi rapat"
                      ></textarea>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Pengaturan Absensi</h4>
                      
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Aktifkan QR Code untuk absensi
                          </span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Validasi lokasi geografis
                          </span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Kirim notifikasi otomatis ke peserta
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                      >
                        Buat Sesi Absensi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default SistemAbsensiModal;