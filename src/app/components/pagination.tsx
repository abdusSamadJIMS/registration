'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const { replace } = useRouter()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };
    const prev = () => {
        if (currentPage > 1) {
            createPageURL(currentPage - 1)
        }
        return null
    }
    const next = () => {
        if (currentPage < totalPages) {
            createPageURL(currentPage + 1)
        }
        return null
    }
    return (
        <div className="join grid grid-cols-2 fixed  bottom-0 right-0 z-40">
            <button
                disabled={currentPage === 1}
                onClick={prev}
                className="join-item btn btn-outline">Previous page</button>
            <button
                disabled={currentPage === totalPages}
                onClick={next}
                className="join-item btn btn-outline">Next</button>
        </div>
    )
}