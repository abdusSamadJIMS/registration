"use client";
import { useState } from "react";

export default function ImageUpload() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        if (!image) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("UPLOADED: " + data)
            if (res.ok) {
                setImageUrl(data.imageUrl);
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert(`Upload failed: ${error instanceof Error ? error.message : "Upload failed"}`,);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-4 border rounded-md">
            <input type="file" onChange={handleFileChange} className="mb-2" />
            {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover mb-2" />}
            <button onClick={uploadImage} disabled={uploading} className="bg-blue-500 text-white px-4 py-2 rounded-sm">
                {uploading ? "Uploading..." : "Upload to Imgur"}
            </button>

            {imageUrl && (
                <div className="mt-2">
                    <p>Image URL:</p>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {imageUrl}
                    </a>
                </div>
            )}
        </div>
    );
}
