import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-6xl">📭</div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Halaman yang Anda cari tidak tersedia
        </p>
        <Link
          href="/dashboard"
          className="inline-block rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
