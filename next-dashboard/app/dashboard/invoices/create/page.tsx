import { bebas_neue } from "@/app/ui/fonts"
import { Breadcrumbs } from "anjrot-components"
import { fetchCutomers } from "@/app/helpers/api";
import FormWrapper from "@/app/components/FormWrapper";

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
];

const page = async () => {
    const getCustomers = await fetchCutomers();

    return (
        <main>
            <Breadcrumbs breadcrumb={breadCrumbs} className={bebas_neue.className}/>
            <FormWrapper customers={getCustomers}/>
        </main>
    )
}

export default page