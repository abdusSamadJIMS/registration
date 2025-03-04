import React from 'react'
import SearchBar from '../search-bar'

const Header = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex gap-2">
                <SearchBar />
            </div>
        </div>
    )
}

export default Header