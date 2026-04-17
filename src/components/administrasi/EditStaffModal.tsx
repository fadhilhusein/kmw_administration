"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import Badge from "@/components/ui/badge/Badge";
import { updateStaffStatus, updateStaffRole } from "@/action/staff";
import { useActionState } from "react";
import Radio from "../form/input/Radio";

interface Staff {
  id: string;
  name: string;
  nim: string;
  email: string;
  role: string;
  divisionCode: string;
  divisionName?: string;
  isActive: boolean;
}

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  currentUserRole: string;
}

const DIVISIONS = [
  { value: "CM", label: "Creative Media" },
  { value: "BPH", label: "Board of Supervisors" },
  { value: "EO", label: "Event Organizer" },
  { value: "BD", label: "Business Development" },
  { value: "BE", label: "Business Education" },
  { value: "HRD", label: "Human Resources" },
  { value: "NP", label: "Public Relations" },
  { value: "DR", label: "Director" },
  { value: "VDR", label: "Vice Director" },
];

const ROLES = [
  { value: "STAFF", label: "Staff" },
  { value: "MANAJER", label: "Manajer" },
  { value: "KETUA", label: "Ketua" },
];

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  isOpen,
  onClose,
  staff,
  currentUserRole,
}) => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(true);
  const [role, setRole] = React.useState("");
  const [divisionCode, setDivisionCode] = React.useState("");

  const [statusState, statusAction, statusPending] = useActionState<any, any>(
    async (state: any, formData: FormData) => {
      const nim = formData.get("nim") as string;
      const isActiveValue = formData.get("isActive") === "true";
      return await updateStaffStatus(nim, isActiveValue);
    },
    undefined
  );

  const [roleState, roleAction, rolePending] = useActionState<any, any>(
    async (state: any, formData: FormData) => {
      const nim = formData.get("nim") as string;
      const roleValue = formData.get("role") as string;
      const divisionValue = formData.get("divisionCode") as string;
      return await updateStaffRole(nim, roleValue, divisionValue);
    },
    undefined
  );

  useEffect(() => {
    if (staff) {
      setIsActive(staff.isActive);
      setRole(staff.role);
      setDivisionCode(staff.divisionCode);
    }
  }, [staff]);

  useEffect(() => {
    if (statusState?.success || roleState?.success) {
      setTimeout(() => {
        onClose();
        router.refresh();
      }, 1000);
    }
  }, [statusState, roleState, onClose, router]);

  if (!staff) return null;

  const isKetua = currentUserRole === "KETUA";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[600px] p-6 lg:p-8"
    >
      <div className="flex flex-col px-2">
        <div className="mb-6">
          <h5 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Edit Staf
          </h5>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {staff.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {staff.nim} • {staff.email}
              </p>
            </div>
            <Badge
              variant="light"
              color={staff.isActive ? "success" : "error"}
              size="sm"
            >
              {staff.isActive ? "Aktif" : "Non-Aktif"}
            </Badge>
          </div>
        </div>

        {/* Update Status Form - Available for all */}
        <form action={statusAction} className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <h6 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
            Status Akun
          </h6>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {/* <input
                type="radio"
                name="isActive"
                id="active"
                value="true"
                checked={isActive}
                onChange={() => setIsActive(true)}
                disabled={statusPending}
                className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              <label
                htmlFor="active"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Aktif
              </label> */}
              <Radio name="isActive" label="Aktif"  id="active" value="true" checked={isActive} onChange={() => setIsActive(true)} disabled={statusPending} />
            </div>
            <div className="flex items-center gap-3">
              {/* <input
                type="radio"
                name="isActive"
                id="inactive"
                value="false"
                checked={!isActive}
                onChange={() => setIsActive(false)}
                disabled={statusPending}
                className="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              <label
                htmlFor="inactive"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Non-Aktif
              </label> */}
              <Radio name="isActive" label="Non-Aktif" id="inactive" value="false" checked={!isActive} onChange={() => setIsActive(false)} disabled={statusPending} />
            </div>
            <input type="hidden" name="nim" value={staff.nim} />
            <button
              type="submit"
              disabled={statusPending}
              className="ml-auto rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            >
              {statusPending ? "Menyimpan..." : "Simpan Status"}
            </button>
          </div>
          {statusState?.message && !statusState?.success && (
            <p className="mt-2 text-sm text-red-500">{statusState.message}</p>
          )}
          {statusState?.success && (
            <p className="mt-2 text-sm text-green-600">
              Status berhasil diupdate!
            </p>
          )}
        </form>

        {/* Update Role & Division - Only for KETUA */}
        {isKetua && (
          <form action={roleAction} className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <h6 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Role & Divisi (Ketua Only)
            </h6>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Jabatan
                </label>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={rolePending}
                  className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Divisi
                </label>
                <select
                  name="divisionCode"
                  value={divisionCode}
                  onChange={(e) => setDivisionCode(e.target.value)}
                  disabled={rolePending}
                  className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input type="hidden" name="nim" value={staff.nim} />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={rolePending}
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
              >
                {rolePending ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
            {roleState?.message && !roleState?.success && (
              <p className="mt-2 text-sm text-red-500">{roleState.message}</p>
            )}
            {roleState?.success && (
              <p className="mt-2 text-sm text-green-600">
                Role & divisi berhasil diupdate!
              </p>
            )}
          </form>
        )}

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditStaffModal;
