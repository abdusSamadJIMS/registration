'use client'
import { shortAgeGroupToNormal } from '@/lib/utils'
import { Gymnast } from '@prisma/client'
import React, { useRef } from 'react'

const GymnastModal = ({ gymnasts, id }: { id: string, gymnasts: Gymnast[] }) => {
    const ref = useRef<HTMLDialogElement | null>(null)
    return (
        <>
            <button
                onClick={() => {
                    ref.current?.show()
                }}
                className="btn btn-ghost btn-xs">
                {gymnasts.length} x Gymnast
            </button>
            <dialog
                ref={ref}
                id={`my-modal-gymnast-${id}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Discipline</th>
                                    <th>Level</th>
                                    <th>Name</th>
                                    <th>Father{"'"}s Name</th>
                                    <th>DOB</th>
                                    <th>Age Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    gymnasts.map((gymnast, i) => (
                                        <tr key={gymnast.id}>
                                            <th>{i + 1}</th>
                                            <td>{gymnast.discipline === "mag" ? "Men's Artistic Gymnastics" : "Women's Artistic Gymnastics"}</td>
                                            <td>{gymnast.level.toUpperCase().replace("-", " ")}</td>
                                            <td>{gymnast.gymnastName}</td>
                                            <td>{gymnast.fatherName}</td>
                                            <td>{gymnast.dob}</td>
                                            <td>{shortAgeGroupToNormal(gymnast.ageCategory)}</td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
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

export default GymnastModal