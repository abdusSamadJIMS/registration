import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const adminPassword = process.env.ADMIN_PASSWORD; // Read password from env
    const cookiePassword = req.cookies.get("admin-auth")?.value;

    // If already authenticated, allow access
    if (cookiePassword === adminPassword) {
        return NextResponse.next();
    }

    // Redirect to login page if trying to access /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin-login", req.url));
    }

    return NextResponse.next();
}

// Apply middleware only to /admin route
export const config = {
    matcher: "/admin/:path*",
};
