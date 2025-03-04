'use client'

import Image from 'next/image'
import React, { useRef } from 'react'

const BannerInfoModal = ({ bannerImage, id, wantBanner }: { id: string, bannerImage: string, wantBanner: boolean }) => {
    const ref = useRef<HTMLDialogElement | null>(null)
    return (
        <>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.showModal()
                    }
                }}
                className="btn btn-ghost btn-xs" disabled={!wantBanner}>{wantBanner ? "Yes" : "No"}</button>

            <dialog
                ref={ref}
                id={`my-modal-banner-${id}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl flex justify-center items-center flex-col">
                    {
                        wantBanner && bannerImage.length > 0 && (
                            <Image
                                src={bannerImage}
                                alt="Banner"
                                width={700}
                                height={700}
                            />
                        )
                    }
                    {/* download banner button */}
                    <a
                        className="btn btn-ghost btn-xs"
                        href={bannerImage}
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

export default BannerInfoModal