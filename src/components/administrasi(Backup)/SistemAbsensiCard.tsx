"use client";
import React from "react";
import { CalenderIcon, CheckCircleIcon } from "@/icons";

interface SistemAbsensiCardProps {
  onOpenModal: () => void;
}

const SistemAbsensiCard: React.FC<SistemAbsensiCardProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
            <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sistem Absensi Digital
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              QR Code & Geolocation
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Rapat Hari Ini</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Hadir</span>
          <span className="text-sm font-medium text-green-600">89%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Tidak Hadir</span>
          <span className="text-sm font-medium text-red-600">11%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Sesi</span>
          <span className="text-sm font-medium text-blue-600">24</span>
        </div>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Pencatatan kehadiran otomatis
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • QR Code untuk check-in/out
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Validasi lokasi geografis
        </p>
      </div>

      <button
        onClick={onOpenModal}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 mt-auto"
      >
        Kelola Absensi
      </button>
    </div>
  );
};

export default SistemAbsensiCard;