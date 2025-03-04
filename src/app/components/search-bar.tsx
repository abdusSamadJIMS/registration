'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchBar() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1');
        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`${pathname}?${params.toString()}`)
    }, 1000)


    return <input
        onChange={(e) => {
            handleSearch(e.target.value)
        }}
        type="text"
        defaultValue={searchParams.get('query')?.toString()}
        placeholder="Search" className="input input-bordered w-24 md:w-auto" />

}