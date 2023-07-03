import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  const url = req.url;
  if (req.nextUrl.pathname.startsWith('/login') && !token) {
    return;
  }
  if (req.nextUrl.pathname !== '/login' && !token) {
    return NextResponse.redirect(new URL('/login', url));
  }
  if (url.includes('/login') && token) {
    return NextResponse.redirect(new URL('/', url));
  }
}
export const config = {
  matcher: ['/login', '/users', '/profile', '/notes/:path*', '/', '/approve', '/level'],
};
