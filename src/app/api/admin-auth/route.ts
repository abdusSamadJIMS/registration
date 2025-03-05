import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
        const cs = await cookies()
        cs.set("admin-auth", adminPassword!, { httpOnly: true, secure: true });
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false }, { status: 401 });
    }
}
