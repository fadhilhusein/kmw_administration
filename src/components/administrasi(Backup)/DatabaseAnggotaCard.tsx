"use client";
import React from "react";
import { UserCircleIcon, GroupIcon } from "@/icons";

interface DatabaseAnggotaCardProps {
  onOpenModal: () => void;
}

const DatabaseAnggotaCard: React.FC<DatabaseAnggotaCardProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
            <UserCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Database Anggota
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manajemen Data Profil
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Anggota</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">245</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Aktif</span>
          <span className="text-sm font-medium text-green-600">198</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Non-Aktif</span>
          <span className="text-sm font-medium text-red-600">47</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
          <span className="text-sm font-medium text-yellow-600">12</span>
        </div>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Penyimpanan data profil anggota
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Manajemen jabatan & divisi
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Struktur hierarki organisasi
        </p>
      </div>

      <button
        onClick={onOpenModal}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 mt-auto"
      >
        Kelola Database
      </button>
    </div>
  );
};

export default DatabaseAnggotaCard;