import { Metadata } from "next";
import getAuthUser from "@/libs/getAuthUser";
import StaffTable from "@/components/administrasi/StaffTable";
import { getStaffList } from "@/action/staff";

export const metadata: Metadata = {
  title: "Admin | Kelola Staf",
};

export default async function KelolaStafPage() {
  const user = await getAuthUser();

  // Redirect if not authenticated
  if (!user?.nim) {
    return null;
  }

  // Fetch staff data based on user role
  const staffResult = await getStaffList(
    user.role === "MANAJER" ? user.divisi as string : undefined
  );

  const staffList = staffResult?.success ? staffResult.data : [];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Kelola Staf
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user.role === "KETUA"
            ? "Kelola semua staf KMW"
            : `Kelola staf di divisi ${user.divisi}`}
        </p>
      </div>

      {staffResult?.success ? (
        <StaffTable staff={staffList.data} currentUserRole={user.role as string} />
      ) : (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm font-medium text-red-900 dark:text-red-200">
            {staffResult?.message || "Gagal memuat data staf. Silakan coba lagi."}
          </p>
        </div>
      )}
    </div>
  );
}
