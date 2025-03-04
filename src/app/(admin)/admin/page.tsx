import Pagination from '@/app/components/pagination';
import Table from '@/app/components/table';
import { getTotalPages } from '@/lib/action';
import React, { Suspense } from 'react'

const page = async (props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) => {

    const searchParams = await props.searchParams
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page || 1)
    const totalPage = await getTotalPages() || 1;



    return (
        <main>
            {/* <h1>Entries</h1> */}
            <Suspense key={query + currentPage}>
                <Table
                    currentPage={currentPage}
                    query={query}
                />
            </Suspense>
            <Pagination totalPages={totalPage} />
        </main>
    )
}

export default page