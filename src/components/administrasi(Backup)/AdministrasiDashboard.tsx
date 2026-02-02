"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DatabaseAnggotaModal from "@/components/administrasi(Backup)/modals/DatabaseAnggotaModal";
import SistemAbsensiModal from "@/components/administrasi(Backup)/modals/SistemAbsensiModal";
import RepositoryDokumenModal from "@/components/administrasi(Backup)/modals/RepositoryDokumenModal";

type ModalType = "database" | "absensi" | "dokumen" | null;

const AdministrasiContent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const searchParams = useSearchParams();

  // Handle URL parameters to open specific modal
  useEffect(() => {
    const modal = searchParams.get('modal');
    if (modal === 'database' || modal === 'absensi' || modal === 'dokumen') {
      setActiveModal(modal);
    }
  }, [searchParams]);

  const closeModal = () => {
    setActiveModal(null);
    // Clear URL parameter when closing modal
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('modal');
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <>
      {/* Welcome Message */}
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Selamat Datang di Administrasi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Pilih fitur administrasi dari menu sidebar untuk mulai mengelola data organisasi.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Fitur Tersedia:</h3>
            <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li>• Database Anggota - Manajemen data profil</li>
              <li>• Sistem Absensi - QR Code & Geolocation</li>
              <li>• Repository Dokumen - E-Arsip digital</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "database" && (
        <DatabaseAnggotaModal onClose={closeModal} />
      )}
      
      {activeModal === "absensi" && (
        <SistemAbsensiModal onClose={closeModal} />
      )}
      
      {activeModal === "dokumen" && (
        <RepositoryDokumenModal onClose={closeModal} />
      )}
    </>
  );
};

const AdministrasiDashboard: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="text-center py-12">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2 max-w-xs"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto max-w-sm"></div>
        </div>
      </div>
    }>
      <AdministrasiContent />
    </Suspense>
  );
};

export default AdministrasiDashboard;