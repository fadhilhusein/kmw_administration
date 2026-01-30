"use client";
import React, { useState } from "react";
import { BellIcon, MailLineIcon, CheckCircleIcon, CloseIcon, PlusIcon } from "@/icons";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "task" | "meeting" | "deadline" | "announcement" | "approval";
  priority: "low" | "medium" | "high" | "urgent";
  status: "unread" | "read" | "archived";
  createdAt: string;
  sender: string;
  division: string;
  actionRequired?: boolean;
  relatedId?: number;
}

interface NotificationSettings {
  email: boolean;
  whatsapp: boolean;
  push: boolean;
  taskReminders: boolean;
  meetingReminders: boolean;
  deadlineAlerts: boolean;
  approvalRequests: boolean;
}

const Notifikasi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent" | "settings">("inbox");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Tugas Baru: Persiapan Seminar",
      message: "Anda mendapat tugas baru untuk mempersiapkan seminar nasional teknologi. Deadline: 15 Maret 2024.",
      type: "task",
      priority: "high",
      status: "unread",
      createdAt: "2024-03-10T09:00:00Z",
      sender: "Ahmad Rizki",
      division: "Divisi Acara",
      actionRequired: true,
      relatedId: 1
    },
    {
      id: 2,
      title: "Rapat Koordinasi Besok",
      message: "Pengingat: Rapat koordinasi bulanan akan dilaksanakan besok pukul 09:00 di ruang rapat utama.",
      type: "meeting",
      priority: "medium",
      status: "unread",
      createdAt: "2024-03-09T16:30:00Z",
      sender: "Sistem",
      division: "Semua Divisi"
    },
    {
      id: 3,
      title: "Deadline Proposal Workshop",
      message: "Deadline pengumpulan proposal workshop programming tinggal 3 hari lagi. Pastikan proposal sudah siap.",
      type: "deadline",
      priority: "urgent",
      status: "unread",
      createdAt: "2024-03-08T14:00:00Z",
      sender: "Sistem",
      division: "Divisi Pelatihan"
    },
    {
      id: 4,
      title: "Permintaan Persetujuan Dana",
      message: "Permintaan persetujuan dana untuk kegiatan bakti sosial sebesar Rp 8.000.000 menunggu persetujuan Anda.",
      type: "approval",
      priority: "high",
      status: "read",
      createdAt: "2024-03-07T11:15:00Z",
      sender: "Budi Santoso",
      division: "Divisi Sosial",
      actionRequired: true,
      relatedId: 4
    },
    {
      id: 5,
      title: "Pengumuman: Update Website",
      message: "Website organisasi telah diperbarui dengan fitur-fitur baru. Silakan cek dan berikan feedback.",
      type: "announcement",
      priority: "low",
      status: "read",
      createdAt: "2024-03-06T13:45:00Z",
      sender: "Lina Kusuma",
      division: "Divisi IT"
    },
    {
      id: 6,
      title: "Reminder: Submit Laporan Bulanan",
      message: "Pengingat untuk submit laporan kegiatan bulanan. Deadline: Akhir bulan ini.",
      type: "task",
      priority: "medium",
      status: "read",
      createdAt: "2024-03-05T10:00:00Z",
      sender: "Sistem",
      division: "Semua Divisi"
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    whatsapp: true,
    push: true,
    taskReminders: true,
    meetingReminders: true,
    deadlineAlerts: true,
    approvalRequests: true
  });

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case "task":
        return "📋";
      case "meeting":
        return "📅";
      case "deadline":
        return "⏰";
      case "announcement":
        return "📢";
      case "approval":
        return "✅";
      default:
        return "📄";
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "meeting":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "announcement":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "approval":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, status: "read" as const }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, status: "read" as const }))
    );
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterStatus === "all") return true;
    return notif.status === filterStatus;
  });

  const unreadCount = notifications.filter(notif => notif.status === "unread").length;

  const updateSettings = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg relative">
              <BellIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sistem Notifikasi
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pengingat otomatis via Email/WhatsApp Gateway
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Tandai Semua Dibaca
              </button>
            )}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
              <PlusIcon className="w-4 h-4" />
              <span>Kirim Notifikasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide bg-white dark:bg-gray-900">
        {[
          { id: "inbox", label: "Kotak Masuk", count: unreadCount },
          { id: "sent", label: "Terkirim" },
          { id: "settings", label: "Pengaturan" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 sm:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 flex items-center space-x-2 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count && tab.count > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {activeTab === "inbox" && (
          <div className="space-y-4">
            {/* Filter */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Notifikasi Masuk
              </h3>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">Semua</option>
                <option value="unread">Belum Dibaca</option>
                <option value="read">Sudah Dibaca</option>
              </select>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    notification.status === "unread"
                      ? "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border-blue-200 dark:border-blue-800"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedNotification(notification);
                    setShowModal(true);
                    if (notification.status === "unread") {
                      markAsRead(notification.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getNotificationTypeIcon(notification.type)}</span>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium text-sm ${
                            notification.status === "unread" 
                              ? "text-gray-900 dark:text-white" 
                              : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {notification.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNotificationTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          {notification.actionRequired && (
                            <span className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded-full text-xs font-medium">
                              Perlu Tindakan
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>Dari: {notification.sender}</span>
                          <span>•</span>
                          <span>{notification.division}</span>
                          <span>•</span>
                          <span>{new Date(notification.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {notification.status === "unread" && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      >
                        <CloseIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Tidak ada notifikasi
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "sent" && (
          <div className="text-center py-8">
            <MailLineIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Fitur notifikasi terkirim akan segera hadir
            </p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Pengaturan Notifikasi
            </h3>

            {/* Notification Channels */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Saluran Notifikasi
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MailLineIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Terima notifikasi via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.email}
                      onChange={(e) => updateSettings("email", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">WhatsApp</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Terima notifikasi via WhatsApp</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.whatsapp}
                      onChange={(e) => updateSettings("whatsapp", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Push Notification</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Terima notifikasi push di browser</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.push}
                      onChange={(e) => updateSettings("push", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Jenis Notifikasi
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Pengingat Tugas</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notifikasi untuk tugas baru dan deadline</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.taskReminders}
                      onChange={(e) => updateSettings("taskReminders", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Pengingat Rapat</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notifikasi untuk jadwal rapat</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.meetingReminders}
                      onChange={(e) => updateSettings("meetingReminders", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Alert Deadline</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Peringatan untuk deadline yang mendekat</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.deadlineAlerts}
                      onChange={(e) => updateSettings("deadlineAlerts", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Permintaan Persetujuan</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notifikasi untuk permintaan yang perlu disetujui</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.approvalRequests}
                      onChange={(e) => updateSettings("approvalRequests", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Simpan Pengaturan
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {showModal && selectedNotification && (
        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setShowModal(false)}></div>
            
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detail Notifikasi
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <CloseIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getNotificationTypeIcon(selectedNotification.type)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {selectedNotification.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNotificationTypeColor(selectedNotification.type)}`}>
                          {selectedNotification.type}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(selectedNotification.priority)}`}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Pengirim:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {selectedNotification.sender}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Divisi:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {selectedNotification.division}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Waktu:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {new Date(selectedNotification.createdAt).toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Prioritas:</span>
                      <div className="font-medium text-gray-900 dark:text-white capitalize">
                        {selectedNotification.priority}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Pesan:</span>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {selectedNotification.message}
                    </p>
                  </div>

                  {selectedNotification.actionRequired && (
                    <div className="bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <span className="font-medium text-orange-800 dark:text-orange-200">
                          Tindakan Diperlukan
                        </span>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Notifikasi ini memerlukan tindakan dari Anda. Silakan klik tombol di bawah untuk melanjutkan.
                      </p>
                      <button className="mt-3 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm">
                        Ambil Tindakan
                      </button>
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

export default Notifikasi;