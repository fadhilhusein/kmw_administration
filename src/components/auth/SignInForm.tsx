"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { addToast } from "@heroui/react";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";

const SignInForm: React.FC<{handler: any}> = ({handler}) => {
  const [state, action, isPending] = useActionState(handler, undefined)
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (state?.success !== undefined) {
      if (!state.success) {
        console.log(state.message)
        addToast({
          title: "Gagal login",
          description: state.message,
          color: "danger",
        })
      }
    }
  }, [state])

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form action={action}>
              <div className="space-y-6">
                <div>
                  <Label>
                    NIM <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input require={true} defaultValue={state?.fields?.nim} placeholder="12010128410207" type="text" name="nimAnggota" hint={state?.errors?.nim ? state.errors.nim : ""} error={state?.errors?.nim}/>
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="passwordAnggota"
                      defaultValue={state?.fields?.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
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
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}
                <div>
                  <Button className="w-full" size="sm" disabled={isPending ? true : false}>
                    {isPending ? "Loading..." : "SignIn"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5 space-y-2">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Akun kamu belum aktif?{' '}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Activate Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;