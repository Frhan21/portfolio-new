import { NextRequest, NextResponse } from "next/server";

export function middleware (req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const isAuthenticated = token

    if(req.nextUrl.pathname.startsWith('/dashboard')) {
        if(!isAuthenticated) {
            return NextResponse.redirect(new URL('/login', req.url))        
        }
    }

    if(isAuthenticated && (req.nextUrl.pathname === '/login') || (req.nextUrl.pathname === '/register')) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/dashboard/:path*']
}