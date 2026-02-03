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


//* Making a session
export async function createSession(token:any) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = token;
    const cookieStore = await cookies()

    cookieStore.set("user_session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    })
}