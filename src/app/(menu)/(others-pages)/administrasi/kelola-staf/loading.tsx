import StaffTableSkeleton from "@/components/administrasi/StaffTableSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <div className="h-7 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-4 w-60 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      <StaffTableSkeleton />
    </div>
  );
}
