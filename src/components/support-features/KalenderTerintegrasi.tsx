"use client";
import React, { useState } from "react";
import { CalenderIcon, PlusIcon, CloseIcon, CheckCircleIcon } from "@/icons";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "rapat" | "deadline" | "acara";
  priority: "low" | "medium" | "high" | "urgent";
  division: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  attendees?: string[];
  location?: string;
}

const KalenderTerintegrasi: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Rapat Koordinasi Bulanan",
      description: "Rapat evaluasi program kerja bulan ini dan perencanaan bulan depan",
      date: "2024-03-15",
      time: "09:00",
      type: "rapat",
      priority: "high",
      division: "Semua Divisi",
      status: "upcoming",
      attendees: ["Ahmad Rizki", "Siti Nurhaliza", "Budi Santoso"],
      location: "Ruang Rapat Utama"
    },
    {
      id: 2,
      title: "Deadline Proposal Workshop",
      description: "Batas akhir pengumpulan proposal workshop programming",
      date: "2024-03-20",
      time: "23:59",
      type: "deadline",
      priority: "urgent",
      division: "Divisi Pelatihan",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Seminar Nasional Teknologi",
      description: "Pelaksanaan seminar nasional dengan tema teknologi terkini",
      date: "2024-03-25",
      time: "08:00",
      type: "acara",
      priority: "high",
      division: "Divisi Acara",
      status: "upcoming",
      location: "Auditorium Utama"
    },
    {
      id: 4,
      title: "Workshop Programming",
      description: "Workshop pemrograman untuk anggota organisasi",
      date: "2024-03-30",
      time: "13:00",
      type: "acara",
      priority: "medium",
      division: "Divisi IT",
      status: "upcoming",
      location: "Lab Komputer"
    },
    {
      id: 5,
      title: "Rapat Divisi Humas",
      description: "Rapat internal divisi humas membahas strategi promosi",
      date: "2024-03-18",
      time: "15:00",
      type: "rapat",
      priority: "medium",
      division: "Divisi Humas",
      status: "upcoming",
      location: "Ruang Meeting"
    },
    {
      id: 6,
      title: "Deadline Laporan Keuangan",
      description: "Batas akhir pengumpulan laporan keuangan bulanan",
      date: "2024-03-31",
      time: "17:00",
      type: "deadline",
      priority: "high",
      division: "Bendahara",
      status: "upcoming"
    },
    {
      id: 7,
      title: "Bakti Sosial Komunitas",
      description: "Kegiatan bakti sosial di desa sekitar kampus",
      date: "2024-03-23",
      time: "07:00",
      type: "acara",
      priority: "medium",
      division: "Divisi Sosial",
      status: "upcoming",
      location: "Desa Sukamaju"
    },
    {
      id: 8,
      title: "Evaluasi Urgent - Krisis PR",
      description: "Rapat darurat untuk menangani isu PR yang mendesak",
      date: "2024-03-16",
      time: "14:00",
      type: "rapat",
      priority: "urgent",
      division: "Divisi Humas",
      status: "upcoming",
      location: "Ruang Rapat Darurat"
    },
    {
      id: 9,
      title: "Presentasi Sponsor",
      description: "Presentasi proposal kepada calon sponsor utama",
      date: "2024-03-22",
      time: "10:00",
      type: "rapat",
      priority: "high",
      division: "Divisi Humas",
      status: "upcoming",
      location: "Ruang Presentasi"
    },
    {
      id: 10,
      title: "Training Leadership",
      description: "Pelatihan kepemimpinan untuk pengurus organisasi",
      date: "2024-03-28",
      time: "09:00",
      type: "acara",
      priority: "low",
      division: "Divisi Pelatihan",
      status: "upcoming",
      location: "Aula Serbaguna"
    }
  ]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "rapat":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "acara":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getCalendarCellBackground = (dayEvents: Event[], isToday: boolean) => {
    if (isToday) {
      return "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border-blue-300 dark:border-blue-600";
    }
    
    if (dayEvents.length === 0) {
      return "bg-white dark:bg-gray-900";
    }

    // Check for high priority or urgent events
    const hasUrgentEvent = dayEvents.some(event => event.priority === "urgent");
    const hasHighPriorityEvent = dayEvents.some(event => event.priority === "high");
    const hasDeadline = dayEvents.some(event => event.type === "deadline");
    const hasMeeting = dayEvents.some(event => event.type === "rapat");
    const hasEvent = dayEvents.some(event => event.type === "acara");

    if (hasUrgentEvent || (hasDeadline && hasHighPriorityEvent)) {
      return "bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-red-200 dark:border-red-800";
    } else if (hasHighPriorityEvent || hasDeadline) {
      return "bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 border-orange-200 dark:border-orange-800";
    } else if (hasMeeting) {
      return "bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 border-purple-200 dark:border-purple-800";
    } else if (hasEvent) {
      return "bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border-green-200 dark:border-green-800";
    } else {
      return "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border-yellow-200 dark:border-yellow-800";
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = formatDate(date);
      const dayEvents = getEventsForDate(dateString);
      const isToday = dateString === formatDate(new Date());
      const cellBackground = getCalendarCellBackground(dayEvents, isToday);

      days.push(
        <div
          key={day}
          className={`h-24 border p-1 cursor-pointer transition-all duration-200 hover:shadow-md ${cellBackground}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex items-center justify-between mb-1">
            <div className={`text-sm font-medium ${isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}>
              {day}
            </div>
            {dayEvents.length > 0 && (
              <div className="flex items-center space-x-1">
                {dayEvents.some(e => e.priority === "urgent") && (
                  <div className="w-2 h-2 bg-red-500 rounded-full" title="Urgent"></div>
                )}
                {dayEvents.some(e => e.priority === "high") && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full" title="High Priority"></div>
                )}
                {dayEvents.some(e => e.type === "deadline") && (
                  <div className="w-2 h-2 bg-red-400 rounded-full" title="Deadline"></div>
                )}
                {dayEvents.some(e => e.type === "rapat") && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full" title="Meeting"></div>
                )}
                {dayEvents.some(e => e.type === "acara") && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Event"></div>
                )}
              </div>
            )}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                +{dayEvents.length - 2} lainnya
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
              <CalenderIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Kalender Terintegrasi
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Jadwal rapat, deadline, dan acara organisasi
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as "month" | "week" | "day")}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="month">Bulanan</option>
              <option value="week">Mingguan</option>
              <option value="day">Harian</option>
            </select>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
              <PlusIcon className="w-4 h-4" />
              <span>Tambah Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 sm:p-6">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Keterangan Warna & Indikator
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Background Colors */}
            <div>
              <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Warna Latar Belakang:</h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Urgent / Deadline Penting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 border border-orange-200 dark:border-orange-800 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Prioritas Tinggi / Deadline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 border border-purple-200 dark:border-purple-800 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Ada Rapat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Ada Acara</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-300 dark:border-blue-600 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Hari Ini</span>
                </div>
              </div>
            </div>

            {/* Dot Indicators */}
            <div>
              <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Indikator Titik:</h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Urgent / Deadline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Prioritas Tinggi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Rapat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Acara</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 <strong>Tips:</strong> Klik pada tanggal untuk melihat detail, atau klik langsung pada event untuk membuka detail event.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Event Mendatang
        </h4>
        <div className="space-y-3">
          {events.filter(event => event.status === "upcoming").slice(0, 5).map((event) => (
            <div
              key={event.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setSelectedEvent(event);
                setShowEventModal(true);
              }}
            >
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                    {event.title}
                  </h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{new Date(event.date).toLocaleDateString('id-ID')}</span>
                  <span>{event.time}</span>
                  <span>{event.division}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setShowEventModal(false)}></div>
            
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detail Event
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                      {selectedEvent.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(selectedEvent.type)}`}>
                        {selectedEvent.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEvent.status)}`}>
                        {selectedEvent.status}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(selectedEvent.priority)}`}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Tanggal:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {new Date(selectedEvent.date).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Waktu:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {selectedEvent.time}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Divisi:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {selectedEvent.division}
                      </div>
                    </div>
                    {selectedEvent.location && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Lokasi:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {selectedEvent.location}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Deskripsi:</span>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Peserta:</span>
                      <div className="mt-1 space-y-1">
                        {selectedEvent.attendees.map((attendee, index) => (
                          <div key={index} className="text-sm text-gray-900 dark:text-white">
                            • {attendee}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KalenderTerintegrasi;