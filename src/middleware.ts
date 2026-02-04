import { NextRequest, NextResponse } from "next/server";
import getAuthUser from "./libs/getAuthUser";

const protectedRoutes = ['/', '/staff']
const publicRoutes = ['/signin', '/signup']

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path)
    const isPublic = publicRoutes.includes(path)

    const user = await getAuthUser();
    const nim = user?.nim;
    const role = user?.role;

    if (isProtected && !nim) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl))
    }

    if (isPublic && nim) {
        return NextResponse.redirect(new URL('/signup', req.nextUrl))
    }

    if (path.startsWith('/administrasi')) {
        const allowedRoles = ["KETUA", "MANAJER"];
        
        // Jika role user TIDAK ada di dalam daftar yang diizinkan
        if (!role || !allowedRoles.includes(role as string)) {
            // Redirect ke halaman utama (atau halaman unauthorized lain)
            return NextResponse.redirect(new URL('/', req.nextUrl));
        }
    }
    
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}