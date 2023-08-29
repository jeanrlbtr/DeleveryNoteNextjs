import { NextResponse, type NextRequest } from 'next/server';
import { UserDetail } from './types/index.d';

export async function middleware(req: NextRequest) {
   const token = req.cookies.get('access_token')?.value;
   const userData = async () => {
      if (token) {
         const res = await fetch(
            'https://staging.saptakarsa.com/gtw/delivery/v1/user/me',
            {
               method: 'GET',
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         const response: UserDetail = await res.json();
         return response.access;
      }
   };
   const theAccess = await userData();

   const access: string[] = theAccess || [''];
   const matcher: string[] = [
      'login',
      'users',
      'notes',
      '/',
      'item',
      'level',
      'progress',
   ];

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

   if (req.nextUrl.pathname !== '/login' && token) {
      const urlname: string = req.nextUrl.pathname || '';
      const pageAccess = matcher.filter((item) => {
         if (access.includes(item)) {
            if (item == urlname.split('/')[1] || item == urlname) {
               return item;
            }
         }
      });
      if (pageAccess.length > 0) {
         return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/404', url));
   }
}

export const config = {
   matcher: [
      '/login',
      '/users',
      '/notes/:path*',
      '/',
      '/approve',
      '/level',
      '/item',
      '/progress',
   ],
};
