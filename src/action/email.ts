"use server"

import nodemailer from "nodemailer";

export async function emailNotification(messageType: string, targetEmail: string, namaAnggota: string, activationCode: string, nim?: string) {
    // Konfigurasi transport SMTP Gmail
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.GMAIL_USER, // Email Gmail Anda
        pass: process.env.GMAIL_APP_PASSWORD, // 16 digit App Password
        },
    });

    try {
        await transporter.sendMail({
        from: `"KMW Admin" <${process.env.GMAIL_USER}>`,
        to: targetEmail,
        subject: messageType === "activation" ? "Notifikasi Pendaftaran Anggota Baru" : "Notifikasi Lupa Password",
        html: messageType === "activation" ?`
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e4e7ec; border-radius: 8px;">
            <h2 style="color: #465fff;">Halo, ${namaAnggota}!</h2>
            <p>Selamat, Anda telah terdaftar sebagai anggota baru di Kelompok Mahasiswa Wirausaha.</p>
            <p>Berikut adalah kode aktivasi akun kamu: ${activationCode}</p>
            <a href=${process.env.LINK_SIGNIN}>Aktivasi Akun Kamu Sekarang.</a>
            <hr style="border: 0; border-top: 1px solid #e4e7ec; margin: 20px 0;" />
            <p style="font-size: 12px; color: #667085;">Email ini dikirim otomatis oleh sistem KMW Admin.</p>
            </div>
        ` : 
        `            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e4e7ec; border-radius: 8px;">
            <h2 style="color: #465fff;">Halo, ${namaAnggota}!</h2>
            <p>Kami menerima permintaan untuk mereset password akun kamu.</p>
            <p>Berikut adalah link untuk mereset password:</p>
            <a href=${process.env.LINK_CONFIRM_RESET_PASSWORD}?token=${activationCode}&nim=${nim}>Reset Password</a>
            <hr style="border: 0; border-top: 1px solid #e4e7ec; margin: 20px 0;" />
            <p style="font-size: 12px; color: #667085;">Email ini dikirim otomatis oleh sistem KMW Admin.</p>
            </div>
        `});
        return { success: true };
    } catch (error) {
        console.error("Gagal kirim email:", error);
        return { success: false };
    }
}