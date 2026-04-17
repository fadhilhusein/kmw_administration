export default function Loading() {
  return (
    <div>
      {/* Breadcrumb Skeleton */}
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6 dark:bg-gray-700"></div>

      {/* Form Card Skeleton */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Form Title Skeleton */}
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6 dark:bg-gray-700"></div>

        {/* Form Fields Skeleton */}
        <div className="space-y-6">
          {/* Nama Anggota */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2 dark:bg-gray-700"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
          </div>

          {/* Nim Anggota */}
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2 dark:bg-gray-700"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
          </div>

          {/* Email Anggota */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2 dark:bg-gray-700"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
          </div>

          {/* Divisi Anggota */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2 dark:bg-gray-700"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
          </div>

          {/* Posisi Anggota */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2 dark:bg-gray-700"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"></div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="h-10 w-24 bg-blue-200 rounded animate-pulse dark:bg-blue-900"></div>
        </div>
      </div>
    </div>
  );
}
