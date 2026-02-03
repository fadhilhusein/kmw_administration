import { loginMember } from "@/action/auth";
import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMW ADMIN | SignIn",
  // description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function SignIn() {
  return <SignInForm handler={loginMember}/>;
}
