import { z } from "zod";

export const registerSchema = z.object({
    nama: z.string().min(5, {error: "Nama yang kamu masukan terlalu pendek!"}),
    nim: z.string().min(12, {
        error: "NIM yang anda masukan belum sesuai!"
    }),
    email: z.email({
        error: "Email yang anda masukan belum sesuai!"
    })
});

export const activateScheme = z.object({
    nim: z.string().min(12, {
        error: "NIM yang anda masukan belum sesuai!"
    }),
    password: z.string()
            .min(1, {
                message: "Harus memasukan password"
            })
            .min(5, {
                message: "Password setidaknya 5 karakter"
            })
            .regex(/[a-zA-Z]/, {
                message: "Mengandung setidaknya huruf besar dan kecil!"
            })
            .regex(/[0-9]/, {
                message: "Mengandung setidaknya 1 angka"
            })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Mengandung setidaknya 1 karakter spesial"
            })
            .trim(),
})

export const loginSchema = z.object({
    nim: z.string().min(12, {
        error: "NIM yang anda masukan belum sesuai!"
    }),
})