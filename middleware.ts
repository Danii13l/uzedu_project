import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(req: NextRequest) {
    let varify = req.cookies.get('userInfo');
    let url = req.url;

    if (!varify && (url.includes("/admin") )) {
        return NextResponse.redirect("http://127.0.0.1:3000/login");
    }

}

export const config = {
    matcher: ['/admin', '/admin/:path*', "/cabinet"],
};


