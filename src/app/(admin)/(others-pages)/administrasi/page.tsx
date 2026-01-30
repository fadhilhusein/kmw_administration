import type { Metadata } from "next";
import React from "react";
import AdministrasiDashboard from "@/components/administrasi/AdministrasiDashboard";

export const metadata: Metadata = {
  title: "Administrasi & Keanggotaan | KMW Administration",
  description: "Modul A: Core System untuk manajemen database anggota, sistem absensi digital, dan repository dokumen",
};

export default function AdministrasiPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          Administrasi & Keanggotaan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
          Modul A: Core System untuk pengelolaan data anggota, absensi digital, dan dokumen organisasi
        </p>
      </div>
      
      <AdministrasiDashboard />
    </div>
  );
}