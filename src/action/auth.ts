"use server"

import { loginSchema } from "@/libs/rule";
import { apiService, RegisterMemberRequest } from "@/services/api";
import { success } from "zod";


export async function registerMember(state:any, formData:any) {
    const NAMA_ANGGOTA = formData.get("namaAnggota");
    const NIM_ANGGOTA = formData.get("nimAnggota");
    const DIVISI_ANGGOTA = formData.get("divisiAnggota");
    const JABATAN_ANGGOTA = formData.get("jabatanAnggota");
    
    // Validasi Input
    const validatedFields = loginSchema.safeParse({
        nama: NAMA_ANGGOTA,
        nim: NIM_ANGGOTA
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                divisi: DIVISI_ANGGOTA,
                jabatan: JABATAN_ANGGOTA
            }
        }
    }

    const registerAnggota:RegisterMemberRequest = {
        name: NAMA_ANGGOTA,
        nim: NIM_ANGGOTA,
        divisionCode: DIVISI_ANGGOTA,
        role: JABATAN_ANGGOTA
    }

    try {
        const response = await apiService.registerMember(registerAnggota);
    
        if (response.success) {
            return {
                success: true,
                message: "Berhasil menambahkan anggota!"
            }
        } else {
            return {
                success: false,
                message: "Gagal menambahkan anggota!"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Terdapat kesalahan teknis silahkan hubungi admin!"
        }
    }
}

export async function activateMember(state:any, formData:any) {
    
}


