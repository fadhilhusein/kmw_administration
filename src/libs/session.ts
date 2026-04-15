import "server-only"

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey);


// //* Encrypt data (data tidak dipakai karena data sudah di encrypt di backend)
// export async function ecnrypt(payload:any) {
//     return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(encodedKey);
// }

//* Decrypt the encrypt data
export async function decrypt(session:any) {
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Fail to decrypt session")
    }
}


//* Making a session - Dual storage (cookie + localStorage)
export async function createSession(token:any) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = token;
    const cookieStore = await cookies()

    // Simpan di cookie (untuk sistem lain yang membaca cookie)
    cookieStore.set("user_session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    })

    // Simpan juga di localStorage untuk API calls (client-side)
    if (typeof window !== 'undefined') {
        localStorage.setItem('user_session', session);
    }
}

//* Get token from localStorage (untuk API calls)
export function getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('user_session');
    }
    return null;
}

//* Clear token from both storage
export function clearToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user_session');
    }
}