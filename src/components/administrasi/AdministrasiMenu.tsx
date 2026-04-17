"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


function AdministrasiMenu() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <DotLottieReact
        className="h-100"
        src="https://lottie.host/0309ba7e-d861-4453-9c26-a988ed503f1d/frAm8erVG0.lottie"
        loop
        autoplay
      />
      <h1 className="text-3xl md:text-start text-center">Dalam tahap pembangunan</h1>
    </div>
    // <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      
    //   {/* <!-- Metric Item Start --> */}
    //   {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    //     <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
    //       <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
    //     </div>
    //     <p>Coming Soon</p>
    //   </div> */}
    //   {/* <!-- Metric Item End --> */}

    //   {/* <!-- Metric Item Start --> */}
    //   {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    //     <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
    //       <BoxIconLine className="text-gray-800 dark:text-white/90" />
    //     </div>
    //     <div className="flex items-end justify-between mt-5">
    //       <div>
    //         <span className="text-sm text-gray-500 dark:text-gray-400">
    //           Orders
    //         </span>
    //         <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
    //           5,359
    //         </h4>
    //       </div>

    //       <Badge color="error">
    //         <ArrowDownIcon className="text-error-500" />
    //         9.05%
    //       </Badge>
    //     </div>
    //   </div> */}
    //   {/* <!-- Metric Item End --> */}
    // </div>
  )
}

export default AdministrasiMenu