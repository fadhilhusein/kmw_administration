export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      {/* Text */}
      <p className="text-gray-500 dark:text-gray-400">Memuat dashboard...</p>
    </div>
  );
}
