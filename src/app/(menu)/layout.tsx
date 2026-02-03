// src/app/(admin)/layout.tsx
import React from "react";
import getAuthUser from "@/libs/getAuthUser"; // Sesuaikan path import
import DashboardLayout from "./DashboardLayout";
import { AuthProvider } from "@/context/AuthContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Ambil data user di sisi Server
  const user = await getAuthUser();

  // 2. Kirim data user sebagai props ke AdminLayout
  return (
    <AuthProvider user={user}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthProvider>
  );
}