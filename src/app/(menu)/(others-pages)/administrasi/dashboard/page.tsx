import AdministrasiMenu from "@/components/administrasi/AdministrasiMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
  // description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default function BlankPage() {
  return (
    <div>
      <AdministrasiMenu />
    </div>
  );
}
