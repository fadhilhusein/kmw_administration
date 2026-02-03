import React from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import { CheckCircleIcon } from "@/icons";

const ApprovalSystemPage = () => {
  return (
    <div className="space-y-6">
      <PageBreadCrumb pageTitle="Sistem Approval Berjenjang" />
      
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sistem Approval Berjenjang
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mekanisme persetujuan konsep/proposal secara digital (Staff → Kadiv → Ketua → Pembina)
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500 dark:bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Sistem Approval Berjenjang
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Fitur ini akan segera tersedia untuk mengelola proses persetujuan proposal dan dokumen secara digital.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Fitur yang Akan Tersedia:</h4>
                <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <li>• Alur persetujuan berjenjang (Staff → Kadiv → Ketua → Pembina)</li>
                  <li>• Tracking status proposal real-time</li>
                  <li>• Sistem komentar dan feedback</li>
                  <li>• Notifikasi otomatis untuk approver</li>
                  <li>• Dashboard analytics approval</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalSystemPage;