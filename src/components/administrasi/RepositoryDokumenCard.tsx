"use client";
import React from "react";
import { DocsIcon, FolderIcon } from "@/icons";

interface RepositoryDokumenCardProps {
  onOpenModal: () => void;
}

const RepositoryDokumenCard: React.FC<RepositoryDokumenCardProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
            <DocsIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Repository Dokumen
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              E-Arsip Digital
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Dokumen</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">1,247</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Proposal</span>
          <span className="text-sm font-medium text-blue-600">156</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">LPJ</span>
          <span className="text-sm font-medium text-green-600">89</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Template</span>
          <span className="text-sm font-medium text-orange-600">23</span>
        </div>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Bank data proposal & LPJ
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Template surat resmi
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          • Sistem pencarian dokumen
        </p>
      </div>

      <button
        onClick={onOpenModal}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 mt-auto"
      >
        Kelola Dokumen
      </button>
    </div>
  );
};

export default RepositoryDokumenCard;