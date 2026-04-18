import { confirmResetPassword } from "@/action/auth";
import { Metadata } from "next";
import ConfirmResetPasswordForm from "@/components/auth/ConfirmResetPasswordForm";

export const metadata: Metadata = {
    title: "KMW ADMIN | Confirm Password Reset",
    // description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
    // other metadata
};

export default function ConfirmResetPassword() {
    return <ConfirmResetPasswordForm handler={confirmResetPassword}/>;
}