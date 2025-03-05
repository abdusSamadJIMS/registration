'use client'

import Image from 'next/image'
import React, { useRef } from 'react'

const PaymentInfoModal = ({ paymentScreenShot, id, }: { id: string, paymentScreenShot: string }) => {
    const ref = useRef<HTMLDialogElement | null>(null)
    return (
        <>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.showModal()
                    }
                }}
                className="btn btn-ghost btn-xs">Payment Screenshot</button>

            <dialog
                ref={ref}
                id={`my-modal-payment-${id}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl flex justify-center items-center flex-col">

                    <Image
                        src={paymentScreenShot}
                        alt="Banner"
                        width={300}
                        height={300}
                    />

                    {/* download banner button */}
                    <a
                        className="btn btn-ghost btn-xs"
                        href={paymentScreenShot}
                        download
                        target='_blank'
                    >Download</a>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default PaymentInfoModal