"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Staff page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Terjadi Kesalahan
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          {error.message || "Gagal memuat halaman kelola staf"}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            Coba Lagi
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Refresh Halaman
          </button>
        </div>
      </div>
    </div>
  );
}
