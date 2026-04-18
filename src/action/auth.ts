"use server"

import { loginSchema, activateScheme, registerSchema, resetPasswordSchema, confirmResetPasswordSchema } from "@/libs/rule";
import { createSession } from "@/libs/session";
import { apiService, RegisterMemberRequest, ActivateAccountRequest, LoginAccountRequest, ResetPasswordRequest } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function registerMember(state:any, formData:any) {
    const NAMA_ANGGOTA = formData.get("namaAnggota");
    const NIM_ANGGOTA = formData.get("nimAnggota");
    const DIVISI_ANGGOTA = formData.get("divisiAnggota");
    const JABATAN_ANGGOTA = formData.get("jabatanAnggota");
    const EMAIL_ANGGOTA = formData.get("emailAnggota")
    
    // Validasi Input
    const validatedFields = registerSchema.safeParse({
        nama: NAMA_ANGGOTA,
        nim: NIM_ANGGOTA,
        email: EMAIL_ANGGOTA
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                nama: NAMA_ANGGOTA,
                nim: NIM_ANGGOTA,
                email: EMAIL_ANGGOTA,
                divisi: DIVISI_ANGGOTA,
                jabatan: JABATAN_ANGGOTA
            }
        }
    }

    const registerAnggota:RegisterMemberRequest = {
        name: NAMA_ANGGOTA,
        nim: NIM_ANGGOTA,
        email: EMAIL_ANGGOTA,
        divisionCode: DIVISI_ANGGOTA,
        role: JABATAN_ANGGOTA
    }

    try {
        const response = await apiService.registerMember(registerAnggota);
    
        if (response.success) {
            return {
                success: true,
                message: response.data
            }
        } else {
            return {
                success: false,
                message: response.error
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
    const KODE_AKTIVASI = formData.get("code");
    const NIM_ANGGOTA = formData.get("nim");
    const PASSWORD_ANGGOTA = formData.get("password");

    // Validasit input terlebih dahulu
    const validatedFields = activateScheme.safeParse({
        nim: NIM_ANGGOTA,
        password: PASSWORD_ANGGOTA
    });

    // Tangkap hasil validasi
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                nim: NIM_ANGGOTA,
                password: PASSWORD_ANGGOTA
            }
        }
    }

    const activateData:ActivateAccountRequest = {
        nim: NIM_ANGGOTA,
        code: KODE_AKTIVASI,
        password: PASSWORD_ANGGOTA
    };

    try {
        const response = await apiService.activateAccount(activateData);

        if (response.success) {
            return {
                success: true,
                message: 'Berhasil mengaktifkan akun silahkan login!'
            }
        } else {
            return {
                success: false,
                message: response.error
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Terdapat kesalahan teknis silahkan hubungi admin!"
        }
    }
}

export async function loginMember(state:any, formData:any) {
    const NIM_ANGGOTA = formData.get("nimAnggota");
    const PASSWORD_ANGGOTA = formData.get('passwordAnggota');

    // Validasi Input
    const validatedFields = loginSchema.safeParse({
        nim: NIM_ANGGOTA,
    })

    // Ambil hasil validasi
    // Tangkap hasil validasi
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                nim: NIM_ANGGOTA,
                password: PASSWORD_ANGGOTA
            }
        }
    }

    const loginData:LoginAccountRequest = {
        nim: NIM_ANGGOTA,
        password: PASSWORD_ANGGOTA
    };

    let isSuccess = false; // Flag untuk redirect di luar try-catch

    try {
        const response = await apiService.signIn(loginData);

        if (response.success) {
            await createSession(response.data?.token);
            isSuccess = true; // Tandai sukses
        } else {
            return {
                success: false,
                message: response.error
            }
        }
    } catch (errors) {
        // Hanya tangkap error jaringan atau crash server
        return {
            success: false,
            message: "Terdapat kesalahan teknis silahkan hubungi admin: " + (errors as Error)?.message
        }
    }

    // Lakukan redirect di sini, di luar try-catch
    if (isSuccess) {
        redirect("/");
    }
}

export async function resetPassword(state?:any, formData?:any) {
    const NIM_ANGGOTA = formData?.get("nim");

    // Validasi Input
    const validatedFields = resetPasswordSchema.safeParse({
        nim: NIM_ANGGOTA,
    })

    // Kembalikan error apabila validasi gagal
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                nim: NIM_ANGGOTA
            }
        }
    }

    const resetData: ResetPasswordRequest = {
        nim: NIM_ANGGOTA
    }

    try {
        const response = await apiService.requestPasswordReset(resetData);

        if (response?.success) {
            return {
                success: true,
                message: response.data || "Permintaan reset password berhasil, silahkan cek email anda!"
            }
        } else {
            return {
                success: false,
                message: response.error || "Gagal mengirimkan email reset password"
            }
        }

    } catch (errors) {
        return {
            success: false,
            message: "Terdapat kesalahan teknis silahkan hubungi admin: " + (errors as Error)?.message
        }
    }
}

export async function confirmResetPassword(state:any, formData:any) {
    const TOKEN = formData.get("token");
    const NIM_ANGGOTA = formData.get("nim");
    const PASSWORD_BARU = formData.get("password");

    // Validasi Input
    const validatedFields = confirmResetPasswordSchema.safeParse({
        password: PASSWORD_BARU
    })

    // Kembalikan error apabila validasi gagal
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                password: PASSWORD_BARU
            }
        }
    }

    const confirmData = {
        nim: NIM_ANGGOTA,
        token: TOKEN,
        password: PASSWORD_BARU
    }

    try {
        const response = await apiService.confirmResetPassword(confirmData);

        if (response?.success) {
            return {
                success: true,
                message: response.data?.message || "Password berhasil direset!"
            }
        } else {
            return {
                success: false,
                message: response.error || "Gagal mereset password"
            }
        }
    } catch (errors) {
        return {
            success: false,
            message: "Terdapat kesalahan teknis silahkan hubungi admin: " + (errors as Error)?.message
        }
    }
}


export async function logoutMember() {
  // 1. Akses cookie store
  const cookieStore = await cookies();

  // 2. Hapus cookie session (untuk sistem lain)
  cookieStore.delete("user_session");

  // 3. Redirect ke halaman Sign In
  redirect("/signin");
}