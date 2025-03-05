import React from 'react'
import SearchBar from '../search-bar'
import ExportButton from '../export-button'
import Image from 'next/image'
import logo from "@/../public/image/logo.jpg"
import LogoutButton from '../logout-button'

const Header = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Image
                    src={logo}
                    alt="Logo"
                    width={80}
                    height={80}

                />
            </div>
            <div className="flex gap-2">
                <div>
                    <ExportButton />
                </div>
                <SearchBar />
                <LogoutButton />
            </div>
        </div>
    )
}

export default Header