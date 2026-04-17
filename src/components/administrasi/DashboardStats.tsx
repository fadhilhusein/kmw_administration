"use client";

import React from "react";
import Badge from "../ui/badge/Badge";
import {
  GroupIcon,
  CalenderIcon,
  BellIcon,
  DollarLineIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@/icons";
import { BellSimpleIcon } from "@phosphor-icons/react";

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend: {
    value: string;
    direction: "up" | "down" | "neutral";
    color: "success" | "error" | "warning" | "info";
  };
  description: string;
}

export const DashboardStats: React.FC = () => {
  const stats: StatCard[] = [
    {
      icon: <GroupIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />,
      title: "Total Anggota",
      value: "245",
      trend: {
        value: "12%",
        direction: "up",
        color: "success",
      },
      description: "Aktif & Non-aktif",
    },
    {
      icon: <CalenderIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />,
      title: "Event Aktif",
      value: "8",
      trend: {
        value: "3",
        direction: "up",
        color: "success",
      },
      description: "Event bulan ini",
    },
    {
      icon: <BellSimpleIcon className="w-6 h-6" />,
      title: "Notifikasi Baru",
      value: "12",
      trend: {
        value: "4",
        direction: "neutral",
        color: "info",
      },
      description: "Perlu ditinjau",
    },
    {
      icon: <DollarLineIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />,
      title: "Saldo Kas",
      value: "Rp 28.5 Jt",
      trend: {
        value: "8.5%",
        direction: "up",
        color: "success",
      },
      description: "Saldo saat ini",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {stat.icon}
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {stat.value}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.description}
              </p>
            </div>
            <Badge color={stat.trend.color}>
              {stat.trend.direction === "up" && <ArrowUpIcon />}
              {stat.trend.direction === "down" && <ArrowDownIcon />}
              {stat.trend.value}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
