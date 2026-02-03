import React from "react";
import KalenderTerintegrasi from "@/components/support-features/KalenderTerintegrasi";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

const KalenderTerintegrasiPage = () => {
  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Kalender Terintegrasi" />
      <KalenderTerintegrasi />
    </div>
  );
};

export default KalenderTerintegrasiPage;