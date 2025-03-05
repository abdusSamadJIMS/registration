import React from 'react'

const Footer = () => {
    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
            {Array.from({ length: 20 }).map((im, index) => (
                <div key={index} className="mb-4 break-inside-avoid">
                    <img
                        src={`/image/insides/${index + 1}.png`}
                        alt={`Masonry Image ${index}`}
                        className="w-full rounded-lg shadow-md"
                    />
                </div>
            ))}
        </div>
    )
}

export default Footer