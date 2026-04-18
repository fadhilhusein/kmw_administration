import { resetPassword } from "@/action/auth";
import { Metadata } from "next";
import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";

export const metadata: Metadata = {
    title: "KMW ADMIN | Forgot Password",
    // description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
    // other metadata
};

export default function ForgetPassword() {
    return <ForgetPasswordForm handler={resetPassword}/>;
}
