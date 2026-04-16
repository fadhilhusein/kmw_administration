import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function StaffTableSkeleton() {
  return (
    <>
      {/* Search Bar Skeleton */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1">
            <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto sm:block">
          <Table className="w-full">
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              <TableRow>
                <TableCell isHeader className="py-3.5 px-4">Nama</TableCell>
                <TableCell isHeader className="py-3.5 px-4">NIM</TableCell>
                <TableCell isHeader className="py-3.5 px-4">Jabatan</TableCell>
                <TableCell isHeader className="py-3.5 px-4">Divisi</TableCell>
                <TableCell isHeader className="py-3.5 px-4">Status</TableCell>
                <TableCell isHeader className="py-3.5 px-4 text-center">Aksi</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-b border-gray-100 dark:border-gray-800">
                  <TableCell className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    <div className="h-5 w-12 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  </TableCell>
                  <TableCell className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card Skeleton */}
        <div className="space-y-3 p-4 sm:hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
