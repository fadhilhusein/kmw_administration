"use client";
import React, { useState } from "react";
import { DollarLineIcon, EyeIcon, CalenderIcon, DownloadIcon } from "@/icons";

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  division: string;
  receipt?: string;
  approvedBy: string;
  status: "approved" | "pending" | "rejected";
}

interface BudgetItem {
  id: number;
  category: string;
  allocated: number;
  used: number;
  remaining: number;
  percentage: number;
}

const TransparansiKas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "budget">("overview");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("2024-03");

  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2024-03-15",
      description: "Dana Seminar Nasional Teknologi",
      type: "expense",
      amount: 15000000,
      category: "Event",
      division: "Divisi Acara",
      receipt: "receipt-001.pdf",
      approvedBy: "Ketua Organisasi",
      status: "approved"
    },
    {
      id: 2,
      date: "2024-03-10",
      description: "Sponsorship PT. Tech Indonesia",
      type: "income",
      amount: 25000000,
      category: "Sponsorship",
      division: "Divisi Humas",
      approvedBy: "Bendahara",
      status: "approved"
    },
    {
      id: 3,
      date: "2024-03-08",
      description: "Pembelian Peralatan Workshop",
      type: "expense",
      amount: 5000000,
      category: "Equipment",
      division: "Divisi IT",
      receipt: "receipt-002.pdf",
      approvedBy: "Ketua Organisasi",
      status: "approved"
    },
    {
      id: 4,
      date: "2024-03-05",
      description: "Iuran Anggota Bulan Maret",
      type: "income",
      amount: 3000000,
      category: "Membership",
      division: "Bendahara",
      approvedBy: "Bendahara",
      status: "approved"
    },
    {
      id: 5,
      date: "2024-03-03",
      description: "Biaya Konsumsi Rapat Bulanan",
      type: "expense",
      amount: 1500000,
      category: "Meeting",
      division: "Sekretaris",
      receipt: "receipt-003.pdf",
      approvedBy: "Bendahara",
      status: "approved"
    },
    {
      id: 6,
      date: "2024-03-01",
      description: "Dana Kegiatan Bakti Sosial",
      type: "expense",
      amount: 8000000,
      category: "Social",
      division: "Divisi Sosial",
      receipt: "receipt-004.pdf",
      approvedBy: "Ketua Organisasi",
      status: "pending"
    }
  ]);

  const [budgetItems] = useState<BudgetItem[]>([
    {
      id: 1,
      category: "Event & Seminar",
      allocated: 50000000,
      used: 15000000,
      remaining: 35000000,
      percentage: 30
    },
    {
      id: 2,
      category: "Equipment & Technology",
      allocated: 20000000,
      used: 5000000,
      remaining: 15000000,
      percentage: 25
    },
    {
      id: 3,
      category: "Social Activities",
      allocated: 25000000,
      used: 8000000,
      remaining: 17000000,
      percentage: 32
    },
    {
      id: 4,
      category: "Operational",
      allocated: 15000000,
      used: 1500000,
      remaining: 13500000,
      percentage: 10
    },
    {
      id: 5,
      category: "Marketing & Promotion",
      allocated: 10000000,
      used: 0,
      remaining: 10000000,
      percentage: 0
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getTransactionTypeColor = (type: string) => {
    return type === "income" 
      ? "text-green-600 dark:text-green-400" 
      : "text-red-600 dark:text-red-400";
  };

  const calculateTotals = () => {
    const totalIncome = transactions
      .filter(t => t.type === "income" && t.status === "approved")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === "expense" && t.status === "approved")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;
    
    return { totalIncome, totalExpense, balance };
  };

  const { totalIncome, totalExpense, balance } = calculateTotals();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
              <DollarLineIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Transparansi Kas (Finance View)
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Rekap arus kas masuk/keluar organisasi (View Only)
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="2024-03">Maret 2024</option>
              <option value="2024-02">Februari 2024</option>
              <option value="2024-01">Januari 2024</option>
            </select>
            
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm">
              <DownloadIcon className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide bg-white dark:bg-gray-900">
        {[
          { id: "overview", label: "Ringkasan" },
          { id: "transactions", label: "Transaksi" },
          { id: "budget", label: "Anggaran" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 sm:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? "border-green-500 text-green-600 dark:text-green-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Pemasukan</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {formatCurrency(totalIncome)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">Total Pengeluaran</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      {formatCurrency(totalExpense)}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 dark:bg-red-800 rounded-full">
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`${balance >= 0 ? 'bg-blue-50 dark:bg-blue-900' : 'bg-orange-50 dark:bg-orange-900'} dark:bg-opacity-20 rounded-lg p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                      Saldo Akhir
                    </p>
                    <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'}`}>
                      {formatCurrency(balance)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-orange-100 dark:bg-orange-800'}`}>
                    <DollarLineIcon className={`w-6 h-6 ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Transaksi Terbaru
              </h3>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}>
                        <svg className={`w-4 h-4 ${getTransactionTypeColor(transaction.type)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {transaction.type === 'income' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {transaction.description}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{new Date(transaction.date).toLocaleDateString('id-ID')}</span>
                          <span>•</span>
                          <span>{transaction.division}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${getTransactionTypeColor(transaction.type)}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Daftar Transaksi
              </h3>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm">
                  <option value="all">Semua Transaksi</option>
                  <option value="income">Pemasukan</option>
                  <option value="expense">Pengeluaran</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Tanggal</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Deskripsi</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Kategori</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Divisi</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Jumlah</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {transaction.description}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {transaction.category}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {transaction.division}
                      </td>
                      <td className={`py-3 px-4 text-right font-semibold ${getTransactionTypeColor(transaction.type)}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <EyeIcon className="w-4 h-4 text-gray-500" />
                          </button>
                          {transaction.receipt && (
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                              <DownloadIcon className="w-4 h-4 text-gray-500" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "budget" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Anggaran per Kategori
            </h3>
            
            <div className="space-y-4">
              {budgetItems.map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {item.category}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.percentage}% terpakai
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full ${
                        item.percentage > 80 ? 'bg-red-500' : 
                        item.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Dialokasikan:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.allocated)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Terpakai:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.used)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Sisa:</span>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.remaining)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransparansiKas;