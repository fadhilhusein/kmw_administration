"use server"
import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getAuthUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get("user_session")?.value
    if (session) {
        const user = await decrypt(session)
        return user
    }
}