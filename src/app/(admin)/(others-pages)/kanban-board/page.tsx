import React from "react";
import KanbanBoard from "@/components/project-management/KanbanBoard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";

const KanbanBoardPage = () => {
  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Kanban Board Divisi" />
      <KanbanBoard />
    </div>
  );
};

export default KanbanBoardPage;