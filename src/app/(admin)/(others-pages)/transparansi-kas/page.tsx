import React from "react";
import TransparansiKas from "@/components/support-features/TransparansiKas";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

const TransparansiKasPage = () => {
  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Transparansi Kas (Finance View)" />
      <TransparansiKas />
    </div>
  );
};

export default TransparansiKasPage;