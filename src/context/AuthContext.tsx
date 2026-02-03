"use client";

import React, { createContext, useContext } from "react";

// Definisikan tipe data User (sesuaikan dengan output getAuthUser Anda)
interface User {
  name: string;
  nim: string;
  role: string;
  divisi: string;
  // ... field lainnya
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any; // Data awal dari server layout
}) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook agar mudah dipanggil
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}