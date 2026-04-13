"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { deleteStaffAccount } from "@/action/staff";
import { useActionState } from "react";

interface Staff {
  id: string;
  name: string;
  nim: string;
  email: string;
  role: string;
  divisionCode: string;
  isActive: boolean;
}

interface DeleteStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
}

const DeleteStaffModal: React.FC<DeleteStaffModalProps> = ({
  isOpen,
  onClose,
  staff,
}) => {
  const [state, action, isPending] = useActionState<any, any>(
    async (state: any, formData: FormData) => {
      const nim = formData.get("nim") as string;
      return await deleteStaffAccount(nim);
    },
    undefined
  );

  React.useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    }
  }, [state, onClose]);

  if (!staff) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[500px] p-6 lg:p-8"
    >
      <div className="px-2">
        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            Hapus Staf?
          </h5>
          <p className="mb-1 text-sm text-gray-900 dark:text-white/90">
            {staff.name}
          </p>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            NIM: {staff.nim}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tindakan ini akan menonaktifkan akun staf. Staf yang dihapus
            tidak akan bisa login ke sistem.
          </p>
        </div>

        {/* Error Message */}
        {state?.message && !state?.success && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
            <p className="text-sm text-red-600 dark:text-red-400">
              {state.message}
            </p>
          </div>
        )}

        {/* Success Message */}
        {state?.success && (
          <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <p className="text-sm text-green-600 dark:text-green-400">
              Staf berhasil dihapus!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <form action={action}>
          <input type="hidden" name="nim" value={staff.nim} />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex w-full justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 sm:w-auto"
            >
              {isPending ? "Menghapus..." : "Hapus Staf"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteStaffModal;
