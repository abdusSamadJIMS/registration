import React, { ReactNode } from 'react'
import Header from '../components/layout/header'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default layout