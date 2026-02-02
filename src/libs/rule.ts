import { z } from "zod";

export const loginSchema = z.object({
    nama: z.string().min(5, {error: "Nama yang kamu masukan terlalu pendek!"}),
    nim: z.string().min(12, {
        error: "NIM yang anda masukan belum sesuai!"
    })
});