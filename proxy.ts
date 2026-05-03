import { NextRequest, NextResponse } from 'next/server';

// Pisahkan rute ke dalam array agar mudah dikelola
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/register', '/'];
const authRoutes = ['/login', '/register'];

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isAuthenticated = !!token;
  const path = req.nextUrl.pathname;

  // Cek apakah rute saat ini adalah protected atau public
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  // Jika user belum login & mencoba akses halaman private -> redirect ke /login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Jika user sudah login & mencoba akses halaman public -> redirect ke /dashboard
  if (isPublicRoute && isAuthenticated) {
    if (isAuthRoute && isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Izinkan akses jika lolos filter
    return NextResponse.next();
  }
}

export const config = {
  // Mengecualikan API routes, Next.js static files, dan assets
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
