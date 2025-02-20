import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const imageFile = formData.get("image") as File;

        if (!imageFile) {
            return NextResponse.json({ error: "No image file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const base64Image = buffer.toString("base64");

        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image, type: "base64" }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.data.error);
        console.log("Response: ", data)

        return NextResponse.json({ imageUrl: data.data.link }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
