
import Image from "next/image";
import { fetchFilteredInvocies } from "@/app/helpers/api";
import { InvoiceTable } from "anjrot-components";
import { FC } from "react";
import { deleteInvoice } from "@/app/helpers/actions";

interface InvoiceWrapperProps {
    query?: string
    page?: number
}

const InvoiceWrapper: FC<InvoiceWrapperProps> = async ({query, page}) => {
    const getInvoices = await fetchFilteredInvocies(query || "", page);
    return (
        <InvoiceTable 
        invoices={getInvoices}
        ImgComponent={Image}
        className="bg-slate-700"
        tableHeader={{className: "text-white"}}
        deleteAction={deleteInvoice}/>
    )
}

export default InvoiceWrapper