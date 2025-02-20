// import React from 'react'

// type Payment = {
//     paymentMode: string;
//     fees: number;
//     paymentScreenshot: File | undefined;
//     eligibility: boolean;
//     understand: boolean;
// }

// const PaymentInformation = ({ payment, setPayment }: { payment: Payment, setPayment: React.Dispatch<React.SetStateAction<Payment>> }) => {
//     return (
//         <div className='flex flex-col items-center gap-2  '>
//             <select
//                 onChange={e => {
//                     setPayment({ ...payment, paymentMode: e.target?.value as string })
//                 }}
//                 defaultValue={payment.paymentMode}
//                 className="select select-bordered w-full ">
//                 <option disabled value={""}>Payment Mode</option>
//                 <option value={"upi"}>UPI</option>
//                 <option value={"bank"}>Bank Transfer</option>
//             </select>
//             <label className="form-control w-full ">
//                 <div className="label">
//                     <span className="label-text">Payment Screenshot</span>
//                 </div>
//                 <input
//                     onChange={(e) => setPayment({ ...payment, paymentScreenshot: e.target?.files?.[0] })}
//                     type="file" className="file-input file-input-bordered w-full " />
//                 <div className="label">

//                 </div>
//             </label>

//             <div className="form-control  w-full  ">
//                 <label className="label cursor-pointer gap-2">
//                     <span className="label-text">I confirm that all the above gymnasts are members of our club and
//                         meet the eligibility criteria.</span>
//                     <input
//                         onChange={(e) => {
//                             setPayment({ ...payment, eligibility: e.target?.checked ?? false })
//                         }}
//                         defaultChecked={payment.eligibility}
//                         type="checkbox" className="checkbox justify-self-end " />
//                 </label>
//             </div>
//             <div className="form-control  w-full  ">
//                 <label className="label cursor-pointer gap-2">
//                     <span className="label-text">I understand that the registration fee is non-refundable.</span>
//                     <input
//                         onChange={e => {
//                             setPayment({ ...payment, understand: e.target?.checked ?? false })
//                         }}
//                         defaultChecked={payment.understand}
//                         type="checkbox" className="checkbox justify-self-end " />
//                 </label>
//             </div>
//         </div>
//     )
// }

// export default PaymentInformation

'use client';
import { useShallow } from 'zustand/react/shallow';
import useRegistrationStore from '@/lib/store/formStore';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const PaymentInformation = () => {
    const { payment, coachAcademy, gymnasts, setPayment, validationErrors } = useRegistrationStore(
        useShallow((state) => ({
            payment: state.payment,
            coachAcademy: state.coachAcademy,
            gymnasts: state.gymnasts,
            setPayment: state.setPayment,
            validationErrors: state.validationErrors
        }))
    );

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const isDelhi = coachAcademy.clubLocation.toLowerCase() === "delhi";
    const perGymnastFee = isDelhi ? 1999 : 3999;
    const totalFees = perGymnastFee * gymnasts.length;

    // Handle image upload and preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed (JPEG, PNG)');
            return;
        }

        if (file.size > 1024 * 1024 * 10) {
            alert('File size must be less than 10MB');
            return;
        }

        // Create preview and persist
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreviewUrl(result);
            localStorage.setItem('paymentScreenshot', result);
        };
        reader.readAsDataURL(file);

        setPayment({ paymentScreenshot: file });
    };

    // Clear preview on unmount
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Restore image preview on mount
    useEffect(() => {
        const storedImage = localStorage.getItem('paymentScreenshot');
        if (storedImage && storedImage.startsWith('data:image/')) {
            setPreviewUrl(storedImage);
        }
    }, []);

    return (
        <div className='flex flex-col gap-4 w-full'>
            {/* Fee Calculation */}
            <div className='w-full bg-base-200 p-4 rounded-lg sticky top-0'>
                <h3 className='font-bold mb-2'>Fee Details</h3>
                <p className='text-sm'>
                    {isDelhi ? '₹1,999/- per gymnast (Delhi/NCR)' : '₹3,999/- per gymnast'} × {gymnasts.length} gymnasts
                </p>
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
            {
                payment.paymentMode.length > 0 && (
                    <div
                        className='w-full bg-base-200 p-4 rounded-lg'
                    >
                        {
                            payment.paymentMode === "bank" ? (
                                <>
                                    <h3 className='font-bold mb-2'>Bank Details</h3>
                                    <p className='text-sm'>Account No. 9898 9898 9898</p>
                                    <p className='text-sm'>IFSC Code sbi000111</p>
                                </>
                            ) : (
                                <>
                                    <h3 className='font-bold mb-2'>Bank Details</h3>
                                    <div className='flex justify-between items-start flex-wrap'>
                                        <div>

                                            <p className='text-sm'>UPI ID samad@okici</p>
                                            <p className='text-sm'>UPI Number 80101010</p>
                                        </div>
                                        <Image
                                            width={150}
                                            height={150}
                                            src={'/window.svg'}
                                            alt='QR'
                                        />
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            }

            {/* Image Upload & Preview */}
            <div className='w-full'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Payment Proof (JPEG, PNG - Max 10MB)</span>
                    </label>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full "
                        accept="image/*"
                        id='img'
                        key={payment.paymentScreenshot?.name}
                    />


                    {previewUrl && (
                        <label htmlFor='img' className="mt-4 border rounded-lg p-2 bg-base-100">
                            <p className="text-sm mb-2">Image Preview:</p>
                            <Image
                                width={200}
                                height={200}
                                src={previewUrl}
                                alt="Payment proof preview"
                                className="max-h-40 object-contain mx-auto rounded"
                            />
                        </label>
                    )}

                    {validationErrors.paymentScreenshot && (
                        <p className="text-error text-sm mt-1">
                            {validationErrors.paymentScreenshot}
                        </p>
                    )}
                </div>
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
                </div>

                {(validationErrors.eligibility || validationErrors.understand) && (
                    <div className="text-error text-sm">
                        {validationErrors.eligibility || validationErrors.understand}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentInformation;