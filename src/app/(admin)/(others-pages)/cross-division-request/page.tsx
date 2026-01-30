import React from "react";
import CrossDivisionRequest from "@/components/project-management/CrossDivisionRequest";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

const CrossDivisionRequestPage = () => {
  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Cross-Division Request System" />
      <CrossDivisionRequest />
    </div>
  );
};

export default CrossDivisionRequestPage;