"use client";
import Label from "@/components/form/Label";
import Link from "next/link";
import Input from "../form/input/InputField";
import React, { useActionState, useEffect, useState } from "react";
import { addToast } from "@heroui/react";
import { EyeIcon, TriangleAlertIcon } from "lucide-react";
import { emailNotification } from "@/action/email";
import { useSearchParams } from "next/navigation";
import { EyeCloseIcon } from "@/icons";

const ConfirmResetPasswordForm:React.FC<{handler:any}> = ({handler}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const nim = searchParams.get("nim");

  const [state, action, isPending] = useActionState<any, any>(handler ,undefined);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success !== undefined) {
      console.log(state);
      if (state.success) {
        addToast({
          title: "Berhasil mereset password",
          description: state.message,
          color: "success",
        })        
      } else if (!state.success) {
        addToast({
          title: "Gagal mereset password",
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
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukan password baru untuk akun kamu
            </p>
          </div>
          <div>
            <form action={action}>
              <div className="space-y-5">
                {/* Password */}
                <div>
                  <Label>
                    Password Baru<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <input type="text" name="nim" className="hidden" value={nim ? nim : ""} readOnly/>
                    <input type="text" name="token" className="hidden" value={token ? token : ""} readOnly/>
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
                        Loading...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Ingat password akun kamu?{' '}
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

export default ConfirmResetPasswordForm;