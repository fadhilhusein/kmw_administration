"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Pagination from "@/components/tables/Pagination";
import EditStaffModal from "./EditStaffModal";
import DeleteStaffModal from "./DeleteStaffModal";
import { PencilIcon, TrashBinIcon } from "@/icons";

export interface Staff {
  id: string;
  name: string;
  nim: string;
  email: string;
  role: string;
  divisionCode: string;
  divisionName?: string;
  isActive: boolean;
  createdAt?: string;
}

interface StaffTableProps {
  staff: Staff[];
  currentUserRole: string;
}

const DIVISION_NAMES: Record<string, string> = {
  CM: "Creative Media",
  BPH: "Board of Supervisors",
  EO: "Event Organizer",
  BD: "Business Development",
  BE: "Business Education",
  HRD: "Human Resources",
  NP: "Public Relations",
  DR: "Director",
  VDR: "Vice Director",
};

const ROLE_NAMES: Record<string, string> = {
  STAFF: "Staff",
  MANAJER: "Manajer",
  KETUA: "Ketua",
};

const ITEMS_PER_PAGE = 10;

const StaffTable: React.FC<StaffTableProps> = ({ staff, currentUserRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Debounce search term (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter staff by debounced search term (memoized for performance)
  const filteredStaff = useMemo(() => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    return staff.filter(
      (s) =>
        s.name.toLowerCase().includes(searchLower) ||
        s.nim.includes(debouncedSearchTerm)
    );
  }, [staff, debouncedSearchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const handleEdit = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setEditModalOpen(true);
  };

  const handleDelete = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setDeleteModalOpen(true);
  };

  const isKetua = currentUserRole === "KETUA";
  const isSearching = searchTerm !== debouncedSearchTerm;

  return (
    <>
      {/* Search Bar */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari staf berdasarkan nama atau NIM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-brand-500" />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                {filteredStaff.length}
              </span>{" "}
              staf ditemukan
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto sm:block">
          <Table className="w-full">
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              <TableRow>
                <TableCell isHeader className="py-3.5 px-4 text-left font-semibold text-gray-900 dark:text-white">
                  Nama
                </TableCell>
                <TableCell isHeader className="py-3.5 px-4 text-left font-semibold text-gray-900 dark:text-white">
                  NIM
                </TableCell>
                <TableCell isHeader className="py-3.5 px-4 text-left font-semibold text-gray-900 dark:text-white">
                  Jabatan
                </TableCell>
                <TableCell isHeader className="py-3.5 px-4 text-left font-semibold text-gray-900 dark:text-white">
                  Divisi
                </TableCell>
                <TableCell isHeader className="py-3.5 px-4 text-left font-semibold text-gray-900 dark:text-white">
                  Status
                </TableCell>
                <TableCell isHeader className="py-3.5 px-4 text-center font-semibold text-gray-900 dark:text-white">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStaff.length > 0 ? (
                paginatedStaff.map((staffMember) => (
                  <TableRow
                    key={staffMember.nim}
                    className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                  >
                    <TableCell className="py-3.5 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {staffMember.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {staffMember.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 px-4 text-sm text-gray-900 dark:text-white">
                      {staffMember.nim}
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <Badge variant="light" color="primary" size="sm">
                        {ROLE_NAMES[staffMember.role] || staffMember.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5 px-4 text-sm text-gray-900 dark:text-white">
                      {DIVISION_NAMES[staffMember.divisionCode] || staffMember.divisionCode}
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <Badge
                        variant="light"
                        color={staffMember.isActive ? "success" : "error"}
                        size="sm"
                      >
                        {staffMember.isActive ? "Aktif" : "Non-Aktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(staffMember)}
                          className="rounded p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="Edit"
                        >
                          <PencilIcon/>
                        </button>
                        <button
                          onClick={() => handleDelete(staffMember)}
                          className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          title="Hapus"
                        >
                          <TrashBinIcon/>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="py-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tidak ada staf yang ditemukan
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card Layout */}
        <div className="space-y-3 p-4 sm:hidden">
          {paginatedStaff.length > 0 ? (
            paginatedStaff.map((staffMember) => (
              <div
                key={staffMember.nim}
                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {staffMember.name}
                      </p>
                      <Badge
                        variant="light"
                        color={staffMember.isActive ? "success" : "error"}
                        size="sm"
                      >
                        {staffMember.isActive ? "Aktif" : "Non-Aktif"}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {staffMember.email}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      NIM: {staffMember.nim}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="light" color="primary" size="sm">
                        {ROLE_NAMES[staffMember.role] || staffMember.role}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {DIVISION_NAMES[staffMember.divisionCode] || staffMember.divisionCode}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(staffMember)}
                      className="rounded p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <PencilIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(staffMember)}
                      className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <TrashBinIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak ada staf yang ditemukan
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditStaffModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        staff={selectedStaff}
        currentUserRole={currentUserRole}
      />

      {/* Delete Modal */}
      <DeleteStaffModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        staff={selectedStaff}
      />
    </>
  );
};

export default StaffTable;
