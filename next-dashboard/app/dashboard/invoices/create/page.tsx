import { bebas_neue } from "@/app/ui/fonts"
import { Breadcrumbs } from "anjrot-components"
import { fetchCutomers } from "@/app/helpers/api";
import { CreateForm } from "anjrot-components";
import Link from "next/link";

const breadCrumbs = [
    {
        label: "Invoices",
        href: "/dashboard/invoices",
    },
    {
        label: "Create Invoice",
        href: "/dashboard/invoices/create",
        active: true
    }
]

const page = async () => {
    const state = {message: null, errors: {}}
    const getCustomers = await fetchCutomers();
    return (
        <main>
            <Breadcrumbs breadcrumb={breadCrumbs} className={bebas_neue.className}/>
            <CreateForm customers={getCustomers} state={state} AnchorElement={Link}/>
        </main>
    )
}

export default page