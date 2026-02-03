"use client";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import Input from "../form/input/InputField";
import { addToast } from "@heroui/react";

const ActivateAccountForm:React.FC<{handler:any}> = ({handler}) => {
  const [state, action, isPending] = useActionState(handler ,undefined);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success !== undefined) {
      if (state.success) {
        addToast({
          title: "Berhasil mengaktifkan akun",
          description: "Akun anda berhasil diaktifkan silahkan login akun anda!",
          color: "success",
        })
      } else if (!state.success) {
        addToast({
          title: "Gagal mengaktifkan akun",
          description: state.message,
          color: "danger",
        })
      }
    }
  }, [state])

  const handleInputChange = (value:any) => {
    return console.log(value);
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Activate Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukan NIM, kode aktivasi, dan password untuk mengaktifkan akun
            </p>
          </div>
          <div>
            <form action={action}>
              <div className="space-y-5">
                {/* NIM */}
                <div>
                  <Label>
                    NIM<span className="text-error-500">*</span>
                  </Label>
                  <input
                    type="text"
                    id="nim"
                    name="nim"
                    onChange={handleInputChange}
                    placeholder="Masukan NIM mahasiswa kamu"
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    required
                    defaultValue={state?.fields?.nim}
                  />
                </div>

                {/* Activation Code */}
                <div>
                  <Label>
                    Kode Aktivasi<span className="text-error-500">*</span>
                  </Label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    onChange={handleInputChange}
                    placeholder="Masukan kode aktivasi"
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={handleInputChange}
                      placeholder="Masukan password baru"
                      className="w-full px-3 py-2 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      require={true}
                      defaultValue={state?.fields?.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {state?.errors?.password ? (
                    <div className="bg-red-800 border border-red-600 mt-4 p-2 rounded-md text-red-200">
                      <p>Password setidaknya:</p>
                      <ul className="list-disc list-inside ml-4">
                        {state?.errors?.password.map((error:any, index:any) => {
                          return <li key={index}>{error}</li>
                        })}
                      </ul>
                    </div>
                  ) : ""}
                </div>

                {/* Submit Button */}
                <div>
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengaktifkan...
                      </>
                    ) : (
                      'Activate Account'
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Akun sudah aktif?{' '}
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivateAccountForm;