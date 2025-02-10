'use client'
import { CreateForm, CreateFormState, CustomerField, InvoiceForm } from "anjrot-components"  
import { FC, useActionState } from "react"
import Link from "next/link";

const FormEditWrapper: FC<{customers: CustomerField[]; invoice: InvoiceForm}> = ({customers, invoice}) => {
    const initialState: CreateFormState = {message: null, errors: {}};
    // const [state,formAction] = useActionState(createInvoice, initialState);
    
    return (
            <CreateForm customers={customers} state={initialState} AnchorElement={Link} invoice={invoice}/>
    );
};

export default FormEditWrapper;