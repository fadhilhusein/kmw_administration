import React from "react";
import Notifikasi from "@/components/support-features/Notifikasi";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

const NotifikasiPage = () => {
  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Sistem Notifikasi" />
      <Notifikasi />
    </div>
  );
};

export default NotifikasiPage;