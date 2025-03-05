
// 'use client';
// import { useShallow } from 'zustand/react/shallow';
// import useRegistrationStore from '@/lib/store/formStore';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// const PaymentInformation = () => {
//     const { payment, coachAcademy, gymnasts, setPayment, validationErrors } = useRegistrationStore(
//         useShallow((state) => ({
//             payment: state.payment,
//             coachAcademy: state.coachAcademy,
//             gymnasts: state.gymnasts,
//             setPayment: state.setPayment,
//             validationErrors: state.validationErrors
//         }))
//     );

//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const isDelhi = coachAcademy.clubLocation.toLowerCase() === "delhi";
//     const perGymnastFee = isDelhi ? 1999 : 3999;
//     const totalFees = perGymnastFee * gymnasts.length;

//     // Handle image upload and preview
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         // Validate file type and size
//         if (!file.type.startsWith('image/')) {
//             alert('Only image files are allowed (JPEG, PNG)');
//             return;
//         }

//         if (file.size > 1024 * 1024 * 10) {
//             alert('File size must be less than 10MB');
//             return;
//         }

//         // Create preview and persist
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const result = e.target?.result as string;
//             setPreviewUrl(result);
//             localStorage.setItem('paymentScreenshot', result);
//         };
//         reader.readAsDataURL(file);

//         setPayment({ paymentScreenshot: file });
//     };

//     // Clear preview on unmount
//     useEffect(() => {
//         return () => {
//             if (previewUrl) {
//                 URL.revokeObjectURL(previewUrl);
//             }
//         };
//     }, [previewUrl]);

//     // Restore image preview on mount
//     useEffect(() => {
//         const storedImage = localStorage.getItem('paymentScreenshot');
//         if (storedImage && storedImage.startsWith('data:image/')) {
//             setPreviewUrl(storedImage);
//         }
//     }, []);

//     return (
//         <div className='flex flex-col gap-4 w-full'>
//             {/* Fee Calculation */}
//             <div className='w-full bg-base-200 p-4 rounded-lg sticky top-0'>
//                 <h3 className='font-bold mb-2'>Fee Details</h3>
//                 <p className='text-sm'>
//                     {isDelhi ? '₹1,999/- per gymnast (Delhi/NCR)' : '₹3,999/- per gymnast'} × {gymnasts.length} gymnasts
//                 </p>
//                 <p className='font-bold mt-2'>Total Fees: ₹{totalFees.toLocaleString()}</p>
//             </div>

//             {/* Payment Method */}
//             <div className='w-full'>
//                 <select
//                     value={payment.paymentMode}
//                     onChange={(e) => setPayment({ paymentMode: e.target.value })}
//                     className="select select-bordered w-full"
//                 >
//                     <option disabled value="">Payment Method</option>
//                     <option value="upi">UPI Transfer</option>
//                     <option value="bank">Bank Transfer</option>
//                 </select>
//                 {validationErrors.paymentMode && (
//                     <p className="text-error text-sm mt-1">{validationErrors.paymentMode}</p>
//                 )}
//             </div>
//             {
//                 payment.paymentMode.length > 0 && (
//                     <div
//                         className='w-full bg-base-200 p-4 rounded-lg'
//                     >
//                         {
//                             payment.paymentMode === "bank" ? (
//                                 <>
//                                     <h3 className='font-bold mb-2'>Bank Details</h3>
//                                     <p className='text-sm'>Account No. 9898 9898 9898</p>
//                                     <p className='text-sm'>IFSC Code sbi000111</p>
//                                 </>
//                             ) : (
//                                 <>
//                                     <h3 className='font-bold mb-2'>Bank Details</h3>
//                                     <div className='flex justify-between items-start flex-wrap'>
//                                         <div>

//                                             <p className='text-sm'>UPI ID samad@okici</p>
//                                             <p className='text-sm'>UPI Number 80101010</p>
//                                         </div>
//                                         <Image
//                                             width={150}
//                                             height={150}
//                                             src={'/window.svg'}
//                                             alt='QR'
//                                         />
//                                     </div>
//                                 </>
//                             )
//                         }
//                     </div>
//                 )
//             }

//             {/* Image Upload & Preview */}
//             <div className='w-full'>
//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Payment Proof (JPEG, PNG - Max 10MB)</span>
//                     </label>

//                     <input
//                         type="file"
//                         onChange={handleFileChange}
//                         className="file-input file-input-bordered w-full "
//                         accept="image/*"
//                         id='img'
//                         key={payment.paymentScreenshot?.name}
//                     />


//                     {previewUrl && (
//                         <label htmlFor='img' className="mt-4 border rounded-lg p-2 bg-base-100">
//                             <p className="text-sm mb-2">Image Preview:</p>
//                             <Image
//                                 width={200}
//                                 height={200}
//                                 src={previewUrl}
//                                 alt="Payment proof preview"
//                                 className="max-h-40 object-contain mx-auto rounded-sm"
//                             />
//                         </label>
//                     )}

//                     {validationErrors.paymentScreenshot && (
//                         <p className="text-error text-sm mt-1">
//                             {validationErrors.paymentScreenshot}
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* Consent Checkboxes */}
//             <div className='w-full space-y-4'>
//                 <div className="form-control">
//                     <label className="label cursor-pointer justify-start gap-4">
//                         <input
//                             type="checkbox"
//                             checked={payment.eligibility}
//                             onChange={(e) => setPayment({ eligibility: e.target.checked })}
//                             className="checkbox checkbox-primary"
//                         />
//                         <span className="label-text">
//                             I confirm all gymnasts are club members and meet eligibility criteria
//                         </span>
//                     </label>
//                 </div>

//                 <div className="form-control">
//                     <label className="label cursor-pointer justify-start gap-4">
//                         <input
//                             type="checkbox"
//                             checked={payment.understand}
//                             onChange={(e) => setPayment({ understand: e.target.checked })}
//                             className="checkbox checkbox-primary"
//                         />
//                         <span className="label-text">
//                             I understand the registration fee is non-refundable
//                         </span>
//                     </label>
//                 </div>

//                 {(validationErrors.eligibility || validationErrors.understand) && (
//                     <div className="text-error text-sm">
//                         {validationErrors.eligibility || validationErrors.understand}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PaymentInformation;

// 'use client';
// import { useShallow } from 'zustand/react/shallow';
// import useRegistrationStore from '@/lib/store/formStore';
// import { useState } from 'react';
// import Image from 'next/image';
// import { uploadImage } from '@/lib/utils';

// const PaymentInformation = () => {
//     const { payment, coachAcademy, gymnasts, setPayment, validationErrors, setBannerPromotion } = useRegistrationStore(
//         useShallow((state) => ({
//             payment: state.payment,
//             coachAcademy: state.coachAcademy,
//             gymnasts: state.gymnasts,
//             setPayment: state.setPayment,
//             setBannerPromotion: state.setBannerPromotion,
//             validationErrors: state.validationErrors
//         }))
//     );

//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);
//     const [includeBanner, setIncludeBanner] = useState(false);
//     // const [paymentScreenShot, setPaymentScreenShot] = useState<File | null>(null)

//     const isDelhi = coachAcademy.clubLocation.toLowerCase() === "delhi";
//     const perGymnastFee = isDelhi ? 1999 : 3999;
//     const baseTotalFees = perGymnastFee * gymnasts.length;
//     const totalFees = includeBanner ? baseTotalFees + 1500 : baseTotalFees;

//     // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'payment' | 'banner') => {
//     //     if (e.target.files && e.target.files[0]) {
//     //         const file = e.target.files[0];
//     //         if (!file) return;

//     //         const allowedTypes = type === 'banner' ? ['image/jpeg', 'image/png'] : ['image/jpeg', 'image/png'];
//     //         if (!allowedTypes.includes(file.type)) {
//     //             alert(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
//     //             return;
//     //         }

//     //         if (file.size > 1024 * 1024) {
//     //             alert('File size must be less than 1MB');
//     //             return;
//     //         }

//     //         if (type === "payment") {
//     //             setPaymentScreenShot(file)
//     //         }
//     //     }
//     // };
//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'payment' | 'banner') => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const allowedTypes = type === 'banner' ? ['image/jpeg', 'image/png'] : ['image/jpeg', 'image/png'];
//         if (!allowedTypes.includes(file.type)) {
//             alert(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
//             return;
//         }

//         if (file.size > 1024 * 1024) {
//             alert('File size must be less than 1MB');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = async (e) => {
//             const result = e.target?.result as string;
//             if (type === 'payment') {
//                 setPreviewUrl(result);
//                 const res = await uploadImage(file)
//                 if (res && res.imageUrl) {
//                     setPayment({ paymentScreenshot: res.imageUrl });
//                 }

//             } else {
//                 setBannerPreviewUrl(result);
//                 const res = await uploadImage(file)
//                 if (res && res.imageUrl) {
//                     setBannerPromotion({ bannerFile: res.imageUrl });
//                 }
//             }
//         };
//         reader.readAsDataURL(file);
//     };

//     return (
//         <div className='flex flex-col gap-4 w-full'>
//             {/* Fee Calculation */}
//             <div className='w-full bg-base-200 p-4 rounded-lg sticky top-0 z-20'>
//                 <h3 className='font-bold mb-2'>Fee Details</h3>
//                 <p className='text-sm'>
//                     {isDelhi ? '₹1,999/- per gymnast (Delhi/NCR)' : '₹3,999/- per gymnast'} × {gymnasts.length} gymnasts
//                 </p>
//                 {includeBanner && <p className='text-sm text-primary'>+ ₹1,500 (Banner Promotion)</p>}
//                 <p className='font-bold mt-2'>Total Fees: ₹{totalFees.toLocaleString()}</p>
//             </div>


//             {/* Payment Method */}
//             <div className='w-full'>
//                 <select
//                     value={payment.paymentMode}
//                     onChange={(e) => {
//                         // setPayment({ paymentMode: e.target.value })
//                         setPayment({ paymentMode: e.target.value });

//                     }}
//                     className="select select-bordered w-full"
//                 >
//                     <option disabled value="">Payment Method</option>
//                     <option value="upi">UPI Transfer</option>
//                     <option value="bank">Bank Transfer</option>
//                 </select>
//             </div>

//             {/* Banner Promotion */}
//             <div className="form-control">
//                 <label className="label cursor-pointer justify-start gap-4">
//                     <input
//                         type="checkbox"
//                         checked={includeBanner}
//                         onChange={(e) => {
//                             const checked = e.target.checked;
//                             setIncludeBanner(checked);
//                             setBannerPromotion({ wantBanner: checked })
//                         }}
//                         className="checkbox checkbox-primary"
//                     />
//                     <span className="label-text">Include Banner Promotion (+ ₹1,500)</span>
//                 </label>
//             </div>
//             {includeBanner && (
//                 <div className='w-full'>
//                     <label className="label">
//                         <span className="label-text">Upload Banner (JPEG, PNG, PDF - Max 1MB)</span>
//                     </label>
//                     <input
//                         type="file"
//                         onChange={async (e) => {
//                             handleFileChange(e, 'banner')

//                         }}
//                         className="file-input file-input-bordered w-full"
//                         accept="image/jpeg, image/png, application/pdf"
//                     />
//                     {bannerPreviewUrl && (
//                         <div className="mt-4 border rounded-lg p-2 bg-base-100">
//                             <p className="text-sm mb-2">Banner Preview:</p>
//                             <Image
//                                 width={200}
//                                 height={200}
//                                 src={bannerPreviewUrl}
//                                 alt="Banner preview"
//                                 className="max-h-40 object-contain mx-auto rounded-sm"
//                             />
//                         </div>
//                     )}
//                 </div>
//             )}

//             {/* Payment Proof Upload */}
//             <div className='w-full'>
//                 <label className="label">
//                     <span className="label-text">Payment Proof (JPEG, PNG - Max 1MB)</span>
//                 </label>
//                 <input
//                     type="file"
//                     onChange={(e) => handleFileChange(e, 'payment')}
//                     className="file-input file-input-bordered w-full"
//                     accept="image/*"
//                 />
//                 {previewUrl && (
//                     <div className="mt-4 border rounded-lg p-2 bg-base-100">
//                         <p className="text-sm mb-2">Payment Proof Preview:</p>
//                         <Image
//                             width={200}
//                             height={200}
//                             src={previewUrl}
//                             alt="Payment proof preview"
//                             className="max-h-40 object-contain mx-auto rounded-sm"
//                         />
//                     </div>
//                 )}
//             </div>
//             Consent Checkboxes
//             <div className='w-full space-y-4'>
//                 <div className="form-control">
//                     <label className="label cursor-pointer justify-start gap-4">
//                         <input
//                             type="checkbox"
//                             checked={payment.eligibility}
//                             onChange={(e) => setPayment({ eligibility: e.target.checked })}
//                             className="checkbox checkbox-primary"
//                         />
//                         <span className="label-text">
//                             I confirm all gymnasts are club members and meet eligibility criteria
//                         </span>
//                     </label>
//                 </div>

//                 <div className="form-control">
//                     <label className="label cursor-pointer justify-start gap-4">
//                         <input
//                             type="checkbox"
//                             checked={payment.understand}
//                             onChange={(e) => setPayment({ understand: e.target.checked })}
//                             className="checkbox checkbox-primary"
//                         />
//                         <span className="label-text">
//                             I understand the registration fee is non-refundable
//                         </span>
//                     </label>
//                 </div>

//                 {(validationErrors.eligibility || validationErrors.understand) && (
//                     <div className="text-error text-sm">
//                         {validationErrors.eligibility || validationErrors.understand}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PaymentInformation;

'use client';
import { useShallow } from 'zustand/react/shallow';
import useRegistrationStore from '@/lib/store/formStore';
import { useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/utils';
import qr from "@/../public/image/upiQR.jpg"

const PaymentInformation = () => {
    const {
        payment,
        coachAcademy,
        gymnasts,
        bannerPromotion,
        setPayment,
        setBannerPromotion,
        validationErrors,
    } = useRegistrationStore(
        useShallow((state) => ({
            payment: state.payment,
            coachAcademy: state.coachAcademy,
            gymnasts: state.gymnasts,
            bannerPromotion: state.bannerPromotion,
            setPayment: state.setPayment,
            setBannerPromotion: state.setBannerPromotion,
            validationErrors: state.validationErrors,
        }))
    );

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const isDelhi = coachAcademy.clubLocation.toLowerCase() === "delhi";
    const perGymnastFee = isDelhi ? 1800 : 1800;
    const baseTotalFees = perGymnastFee * gymnasts.length;
    const totalFees = bannerPromotion.wantBanner ? baseTotalFees + 1500 : baseTotalFees;

    // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'payment' | 'banner') => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;

    //     const allowedTypes = ['image/jpeg', 'image/png'];
    //     if (!allowedTypes.includes(file.type)) {
    //         alert(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
    //         return;
    //     }

    //     if (file.size > 1024 * 1024) { // 1MB limit
    //         alert('File size must be less than 1MB');
    //         return;
    //     }

    //     setUploading(true);
    //     const reader = new FileReader();
    //     reader.onload = async (e) => {
    //         const result = e.target?.result as string;
    //         try {
    //             const res = await uploadImage(file);
    //             if (res && res.imageUrl) {
    //                 if (type === 'payment') {
    //                     setPreviewUrl(result);
    //                     setPayment({ paymentScreenshot: res.imageUrl });
    //                 } else {
    //                     setBannerPreviewUrl(result);
    //                     setBannerPromotion({ bannerFile: res.imageUrl });
    //                 }
    //             }
    //         } catch (error) {
    //             alert(`Failed to upload ${type === 'payment' ? 'payment proof' : 'banner'}. Please try again.`);
    //         } finally {
    //             setUploading(false);
    //         }
    //     };
    //     reader.readAsDataURL(file);
    // };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'payment' | 'banner') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
            return;
        }

        if (file.size > 1024 * 1024 * 2) { // 1MB limit
            alert('File size must be less than 2MB');
            return;
        }

        setUploading(true);

        try {
            // Step 1: Read the file using FileReader for preview
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (type === 'payment') {
                    setPreviewUrl(result); // Set local preview for payment proof
                } else {
                    setBannerPreviewUrl(result); // Set local preview for banner
                }
            };
            reader.readAsDataURL(file);

            // Step 2: Upload the file to the server
            const res = await uploadImage(file);
            console.log('Upload result:', res); // Log the upload result

            if (res && res.ok && res.imageUrl) {
                if (type === 'payment') {
                    setPayment({ paymentScreenshot: res.imageUrl }); // Update Zustand store with payment proof URL
                } else {
                    setBannerPromotion({ bannerFile: res.imageUrl }); // Update Zustand store with banner URL
                }
            } else {
                alert('Failed to upload file. Please try again.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('An error occurred during upload. Please try again.');
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className='flex flex-col gap-4 w-full'>
            {/* Fee Calculation */}
            <div className='w-full bg-base-200 p-4 rounded-lg sticky top-0 z-20'>
                <h3 className='font-bold mb-2'>Fee Details</h3>
                <p className='text-sm'>
                    {'₹1,800/- per gymnast '} × {gymnasts.length} gymnasts
                    {/* {isDelhi ? '₹1,999/- per gymnast (Delhi/NCR)' : '₹3,999/- per gymnast'} × {gymnasts.length} gymnasts */}
                </p>
                {bannerPromotion.wantBanner && <p className='text-sm text-neutral'>+ ₹1,500 (Banner Promotion)</p>}
                <p className='font-bold mt-2'>Total Fees: ₹{totalFees.toLocaleString()}</p>
            </div>

            {/* Payment Method */}
            <div className='w-full'>
                <select
                    value={payment.paymentMode}
                    onChange={(e) => setPayment({ paymentMode: e.target.value })}
                    className="select select-bordered w-full"
                >
                    <option disabled value="">Payment Method</option>
                    <option value="upi">UPI Transfer</option>
                    <option value="bank">Bank Transfer</option>
                </select>
                {validationErrors.paymentMode && (
                    <p className="text-error text-sm mt-1">{validationErrors.paymentMode}</p>
                )}
            </div>

            {/* Payment Method Details */}
            {
                payment.paymentMode && (
                    <div className="w-full bg-base-200 p-4 rounded-lg ">
                        <h3 className='pb-5'>{payment.paymentMode === "upi" ? "Upi Information" : "Bank Details"}</h3>
                        {payment.paymentMode === "upi" && (
                            <div>
                                <Image src={qr} alt='QR' width={170} height={170} />
                                <p>Scan the QR code with your UPI app to make the payment.</p>
                                <p>UPI ID: stas-05@idfcbank</p>
                            </div>
                        )}

                        {
                            payment.paymentMode === "bank" && (
                                <div>
                                    <p>Account Name: SAURVIK TEXTILE AND SPORTS</p>
                                    <p>Account Number: 10175408073</p>
                                    <p>IFSC: IDFB0021015</p>
                                    <p>Swift Code: IDFBINBBMUM</p>
                                    <p>Bank name: IDFC FIRST</p>
                                    <p>Branch: GURGAON - MANESAR BRANCH</p>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {/* Banner Promotion */}
            <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                    <input
                        type="checkbox"
                        checked={bannerPromotion.wantBanner || false}
                        onChange={(e) => setBannerPromotion({ wantBanner: e.target.checked })}
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">Include Banner Promotion (+ ₹1,500)</span>
                </label>
            </div>
            {bannerPromotion.wantBanner && (
                <div className='w-full'>
                    <label className="label">
                        <span className="label-text">Upload Banner (JPEG, PNG - Max 1MB)</span>
                    </label>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'banner')}
                        className="file-input file-input-bordered w-full"
                        accept="image/jpeg, image/png"
                    />
                    {bannerPreviewUrl && (
                        <div className="mt-4 border rounded-lg p-2 bg-base-100">
                            <p className="text-sm mb-2">Banner Preview:</p>
                            <Image
                                width={200}
                                height={200}
                                src={bannerPreviewUrl}
                                alt="Banner preview"
                                className="max-h-40 object-contain mx-auto rounded-sm"
                            />
                        </div>
                    )}
                    {validationErrors.bannerFile && (
                        <p className="text-error text-sm mt-1">{validationErrors.bannerFile}</p>
                    )}
                </div>
            )}

            {/* Payment Proof Upload */}
            <div className='w-full'>
                <label className="label">
                    <span className="label-text">Payment Proof (JPEG, PNG - Max 1MB)</span>
                </label>
                <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'payment')}
                    className="file-input file-input-bordered w-full"
                    accept="image/jpeg, image/png"
                />
                {previewUrl && (
                    <div className="mt-4 border rounded-lg p-2 bg-base-100">
                        <p className="text-sm mb-2">Payment Proof Preview:</p>
                        <Image
                            width={200}
                            height={200}
                            src={previewUrl}
                            alt="Payment proof preview"
                            className="max-h-40 object-contain mx-auto rounded-sm"
                        />
                    </div>
                )}
                {validationErrors.paymentScreenshot && (
                    <p className="text-error text-sm mt-1">{validationErrors.paymentScreenshot}</p>
                )}
                {uploading && <p className="text-sm text-info">Uploading...</p>}
            </div>

            {/* Consent Checkboxes */}
            <div className='w-full space-y-4'>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                        <input
                            type="checkbox"
                            checked={payment.eligibility}
                            onChange={(e) => setPayment({ eligibility: e.target.checked })}
                            className="checkbox checkbox-primary"
                        />
                        <span className="label-text">
                            I confirm all gymnasts are club members and meet eligibility criteria
                        </span>
                    </label>
                    {validationErrors.eligibility && (
                        <p className="text-error text-sm mt-1">{validationErrors.eligibility}</p>
                    )}
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                        <input
                            type="checkbox"
                            checked={payment.understand}
                            onChange={(e) => setPayment({ understand: e.target.checked })}
                            className="checkbox checkbox-primary"
                        />
                        <span className="label-text">
                            I understand the registration fee is non-refundable
                        </span>
                    </label>
                    {validationErrors.understand && (
                        <p className="text-error text-sm mt-1">{validationErrors.understand}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentInformation;