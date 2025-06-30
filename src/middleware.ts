
import { log } from "console";
import { cookies } from "next/headers"

import { NextResponse } from "next/server";
export async function middleware(req: Request) {

  console.log("La url actual: ",req.url);
  
    if (req.url.endsWith("/")) {
        return NextResponse.next(); // Permite el acceso a las rutas de la API
    }

    const token = (await cookies()).get("auth_token")?.value;    

    const publicPaths = ["/auth/login", "/auth/register", "/auth/forgot-password"];
    const isPublicPath = publicPaths.some(path => req.url.includes(path));
    

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/chat/10', req.url));
    }
      

    return NextResponse.next();
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)', // Excluye archivos estáticos
    ],
};