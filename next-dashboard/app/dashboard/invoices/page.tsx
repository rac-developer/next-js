import { bebas_neue } from "@/app/ui/fonts";
import { InvoiceSkeleton } from "@/app/components/Skeleton";
import { FC, Suspense } from "react";
import { fetchInvoicesPages } from "@/app/helpers/api";
import { TableButtons } from "anjrot-components"
import PaginationWrapper from "@/app/components/PaginationWrapper";
import Search from "@/app/components/Search";
import InvoiceWrapper from "@/app/components/InvoiceWrapper";
import Link from "next/link";

interface InvoicesProps {
    searchParams?: Promise<{query?: string, page?: number}> 
}

const Invoices: FC<InvoicesProps> = async ({searchParams}) => {
    const params = await searchParams;
    
    const totalPages = await fetchInvoicesPages(params?.query || "");

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${bebas_neue.className} text-2xl`}>
                    Invoices
                </h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 w-full flex-grow">
                <Search/>
                <TableButtons ButtonType={Link} title="Create Invoice" href="/dashboard/invoices/create"/>
            </div>
                <Suspense fallback={<InvoiceSkeleton/>}>
                    <InvoiceWrapper query={params?.query} page={params?.page}/>
                </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <PaginationWrapper totalpages={totalPages}/>
            </div>
        </div>
    )
}

export default Invoices