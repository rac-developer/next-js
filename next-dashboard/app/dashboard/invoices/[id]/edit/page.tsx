import { Breadcrumbs } from "anjrot-components";
import { bebas_neue } from "@/app/ui/fonts";
import { FC } from "react";
import { fetchCutomers, fetchInvoiceById } from "@/app/helpers/api";
import FormEditWrapper from "@/app/components/FormEditWrapper";

interface EditInvoiceProps {
    params: Promise<{id: string}>
}

const EditInvoice: FC<EditInvoiceProps> = async ({params}) => {
    const path = await params;
    console.log("props :>> ", path)
    // En el path."id", lo que esta entre comillas en el nombre que le vas a poner a la carpeta de las ids
    const id = path.id
    const breadCrumbs = [
        {
            label: "Invoices",
            href: "/dashboard/invoices",
        },
        {
            label: "Edit Invoice",
            href: `/dashboard/invoices/create/${id}/edit`,
            active: true
        }
    ];

    const [getCustomers, invoice] = await Promise.all([fetchCutomers(), fetchInvoiceById(id)]);

    return (
        <main>
            <Breadcrumbs breadcrumb={breadCrumbs} className={bebas_neue.className}/>
            <FormEditWrapper customers={getCustomers} invoice={invoice}/>
        </main>
    )
}

export default EditInvoice