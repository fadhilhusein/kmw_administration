import FormTambahAnggota from "@/components/administrasi/FormTambahAnggota";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { registerMember } from "@/action/auth";

export const metadata: Metadata = {
  title: "Admin | Tambah Anggota",
  // description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default function BlankPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Tambah Anggota" />
      <FormTambahAnggota handler={registerMember}/>
    </div>
  );
}
