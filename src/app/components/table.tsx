
import { getEntries } from '@/lib/action'
import React from 'react'
import GymnastModal from './gymnast-modal'
import BannerInfoModal from './banner-info-modal'

const Table = async ({ currentPage, query }: { query: string, currentPage: number }) => {
    const res = await getEntries(currentPage, query)
    if (!res.ok) {
        return <h1>{res.error}</h1>
    }
    const { data } = res
    return (

        <div className="overflow-x-auto pb-20 ">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            Verified
                        </th>
                        <th>Club</th>
                        <th>Coach</th>
                        <th>Gymnast</th>
                        <th>Banner</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        data?.map((d) => (
                            <tr key={d.id}>
                                <th>
                                    <label>
                                        <input
                                            defaultChecked={d.paymentVerified}
                                            type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">

                                        <div>
                                            <div className="font-bold">{d.clubName}</div>
                                            <div className="text-sm opacity-50 capitalize">{d.clubLocation}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {d.coachName}
                                    <br />
                                    <div className='flex flex-col'>
                                        <span className="text-xs">{d.phone}</span>
                                        <span className="text-xs">{d.email}</span>
                                    </div>
                                </td>
                                <td>
                                    <GymnastModal
                                        id={d.id}
                                        gymnasts={d.gymnasts}
                                    />
                                </td>
                                <th>
                                    <BannerInfoModal
                                        bannerImage={d.bannerFile || ""}
                                        id={d.id}
                                        wantBanner={d.wantBanner}
                                    />
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Club</th>
                        <th>Coach</th>
                        <th>Gymnast</th>
                        <th>Banner</th>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default Table