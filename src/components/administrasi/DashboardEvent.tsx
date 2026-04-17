import { Calendar, ChevronDownIcon } from "lucide-react"
import Select from "../form/Select"
import Button from "../ui/button/Button"

export default function DashboardEvent() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Jadwal Program Kerja
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kumpulan jadwal program kerja yang akan datang
                        </p>
                        </div>
                    </div>
                
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Select
                                options={[
                                { value: "2024-03", label: "Maret 2024" },
                                { value: "2024-02", label: "Februari 2024" },
                                { value: "2024-01", label: "Januari 2024" }
                                ]}
                                placeholder="Pilih Periode"
                                onChange={(value) => (value)}
                                className="dark:bg-gray-800"
                            />
                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                <ChevronDownIcon/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="p-4 sm:p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fitur ini masih dalam tahap pengembangan
                </p>
            </div>
        </div>

    )
}