import SignUpForm from "@/components/auth/SignUpForm";
import { activateMember } from "@/action/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMW ADMIN | SignUp",
  // description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm handler={activateMember}/>;
}
