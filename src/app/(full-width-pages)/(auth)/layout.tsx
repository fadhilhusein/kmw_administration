import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
          {children}
          <div className="relative lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden overflow-hidden">
            <div className="items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-center">
                <h1 className="text-5xl font-bold italic bg-gradient-to-r from-[#F6BA09] to-[#E07C06] bg-clip-text text-transparent px-2">KMW FEB UNDIP</h1>
                <p className="text-center text-gray-400 dark:text-white/60">
                  The next level administration for collage organization
                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
