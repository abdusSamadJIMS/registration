"use client"

import { exportEntriesToExcel } from "@/lib/utils"
import { useState } from "react"

const ExportButton = () => {
    const [loading, setLoading] = useState(false)
    const handleClick = async () => {
        setLoading(true)
        await exportEntriesToExcel()
        setLoading(false)
        alert("Export successful!")
    }
    return (
        <button
            disabled={loading}
            onClick={handleClick}
            className="btn btn-primary">{
                loading ? "Exporting..." : "Export to Excel"
            }</button>
    )
}

export default ExportButton