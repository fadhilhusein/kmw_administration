"use client";

import DashboardStats from "@/components/administrasi/DashboardStats";
import KalenderTerintegrasi from "@/components/support-features/KalenderTerintegrasi";
import Notifikasi from "@/components/support-features/Notifikasi";
import TransparansiKas from "@/components/support-features/TransparansiKas";
import DatabaseAnggotaCard from "@/components/administrasi(Backup)/DatabaseAnggotaCard";
import RepositoryDokumenCard from "@/components/administrasi(Backup)/RepositoryDokumenCard";
import SistemAbsensiCard from "@/components/administrasi(Backup)/SistemAbsensiCard";
import DashboardEvent from "@/components/administrasi/DashboardEvent";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Selamat Datang di Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ringkasan aktivitas dan statistik organisasi KMW
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Event Calendar */}
      <DashboardEvent />

      {/* Transparansi Kas */}
      <TransparansiKas />
    </div>
  );
}
