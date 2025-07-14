'use client'
import { updateInvoice } from "@/app/helpers/actions";
import { CreateForm, CreateFormState, CustomerField, InvoiceForm } from "anjrot-components"  
import { FC, useActionState } from "react"
import Link from "next/link";

const FormEditWrapper: FC<{customers: CustomerField[]; invoice: InvoiceForm}> = ({customers, invoice}) => {
    const initialState: CreateFormState = {message: null, errors: {}};
    const [state,formAction] = useActionState(updateInvoice, initialState);
    
    return <CreateForm customers={customers} state={state} action={formAction} AnchorElement={Link} invoice={invoice}/>;
};

export default FormEditWrapper;