import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cs = await cookies()
    cs.set("admin-auth", "", { expires: new Date(0) }); // Remove cookie
    return NextResponse.json({ success: true });
}
