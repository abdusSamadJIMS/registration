import React, { useState } from "react";
import useRegistrationStore from "@/lib/store/formStore";

const BannerPromotion = () => {
    const { bannerPromotion, setBannerPromotion, validationErrors, payment } = useRegistrationStore();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleRadioChange = (value: boolean) => {
        setBannerPromotion({ wantBanner: value, bannerFile: value ? null : null });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
            const maxSize = 1024 * 1024; // 1MB

            if (!allowedFormats.includes(file.type)) {
                alert("Invalid file format. Only JPEG, PNG, and PDF are allowed.");
                return;
            }
            if (file.size > maxSize) {
                alert("File size exceeds 1MB. Please upload a smaller file.");
                return;
            }
            setSelectedFile(file);
            setBannerPromotion({ bannerFile: file });
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Club/Academy Logo Banner Promotion</h2>
            <p className="mb-4">Would you like to promote your club/academy with a banner? (Additional ₹1,500)</p>

            <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="bannerPromotion"
                        checked={bannerPromotion.wantBanner === true}
                        onChange={() => handleRadioChange(true)}
                        className="accent-blue-600"
                    />
                    Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="bannerPromotion"
                        checked={bannerPromotion.wantBanner === false}
                        onChange={() => handleRadioChange(false)}
                        className="accent-blue-600"
                    />
                    No
                </label>
            </div>

            {bannerPromotion.wantBanner && (
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Upload Banner (JPEG, PNG, PDF - Max 1MB)</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, application/pdf"
                        onChange={handleFileChange}
                        className="block w-full border border-gray-300 p-2 rounded-lg"
                    />
                    {selectedFile && (
                        <p className="mt-2 text-green-600">Selected: {selectedFile.name}</p>
                    )}
                    {validationErrors.bannerFile && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.bannerFile}</p>
                    )}
                </div>
            )}

            <div className="mt-4 font-semibold">Total Fees: ₹{payment.fees}</div>
        </div>
    );
};

export default BannerPromotion;
