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

  const staffList = staffResult?.success ? (staffResult.data || []) : [];

  console.log("Staff List:", staffList);
  console.log("Fetch Staff Result:", staffResult);

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

      <StaffTable staff={staffList} currentUserRole={user.role as string} />
    </div>
  );
}
