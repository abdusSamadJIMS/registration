'use client'
import { toggleVerificationStatus } from '@/lib/action'
import React, { useState } from 'react'

const VerifyToggle = ({ id, paymentVerified }: { id: string, paymentVerified: boolean }) => {
    const [loading, setLoading] = useState(false)
    return (
        <label>
            <input
                onChange={async (e) => {
                    setLoading(true)
                    const verified = e.target.checked;
                    await toggleVerificationStatus(id, verified)
                    setLoading(false)
                }}

                defaultChecked={paymentVerified}
                disabled={loading}
                type="checkbox" className="checkbox" />
        </label>
    )
}

export default VerifyToggle