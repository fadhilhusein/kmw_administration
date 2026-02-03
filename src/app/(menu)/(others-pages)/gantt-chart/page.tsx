import React from "react";
import GanttChart from "@/components/project-management/GanttChart";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

const GanttChartPage = () => {
  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Dashboard Timeline (Gantt Chart)" />
      <GanttChart />
    </div>
  );
};

export default GanttChartPage;