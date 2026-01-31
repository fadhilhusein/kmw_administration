import ActivateAccountForm from "@/components/auth/ActivateAccountForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activate Account | KMW Administration",
  description: "Activate your KMW Administration account",
};

export default function ActivateAccountPage() {
  return <ActivateAccountForm />;
}