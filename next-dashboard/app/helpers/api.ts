const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGVmNzAwMmYzNGFjMWVlY2UxNzc2ZCIsImVtYWlsIjoibmV4dFR1dG9yaWFsQHRlc3QuY29tIiwibmFtZSI6Im5leHRUdXRvcmlhbCIsImlhdCI6MTczODc2NDk2Mn0.-G1OEGIAy0mCerwM1YALCcQiGoYw5vVX5V2tMSIW64c"
}

//urls

export const fetchCardData = async () => {
    try {
        const [getCustomerCount, getInvoicesCount, getInvoicesStatusCount] = await Promise.all([
            fetch (`${process.env.BACKEND_URL}/customer/count`, { headers }),
            fetch (`${process.env.BACKEND_URL}/invoices/count`, { headers }),
            fetch (`${process.env.BACKEND_URL}/invoices/status-count`, { headers })
        ]);

        const resultCustomerCount = await getCustomerCount.json();
        const resultInvoicesCount = await getInvoicesCount.json();
        const resultInvoicesStatusCount = await getInvoicesStatusCount.json();

        const numberOfInvoices = Number(resultInvoicesCount ?? "0");
        const numberOfCustomers = Number(resultCustomerCount ?? "0");
        const totalPaidInvoices = resultInvoicesStatusCount.paid ?? "0";
        const totalPendingInvoices = resultInvoicesStatusCount.pending ?? "0";

        return {
            numberOfInvoices,
            numberOfCustomers,
            totalPaidInvoices,  
            totalPendingInvoices
        }
    } catch (error) {
        console.log("error :>> ", error);
        throw new Error("Failed to fetch card data");
    }
}

export const fetchRevenues = async () => {
    try {
        const fetchRevenues = await fetch(`${process.env.BACKEND_URL}/revenues`, { headers });
        const revenueResult = await fetchRevenues.json();
        console.log("Fetching Revenue data...")
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("Data completed afteree 3 seconds")

        return revenueResult;
    } catch (error) {
        console.log("error :>> ", error);
        throw new Error("Failed to fetch revenues");
    }
}

export const fetchLatestInvocies = async () => {
    try {
        const fetchInvoices = await fetch(`${process.env.BACKEND_URL}/invoices`, { headers });
        const resultFetchInvoices = await fetchInvoices.json();

        return resultFetchInvoices;
    } catch (error) {
        console.log("error :>> ", error);
        throw new Error("Failed to fetch invoices");
    }
}

//Search
export const fetchFilteredInvocies = async (query?: string,currentPage?: number) => {
    try {
        const fetchFilteredInvocies = await fetch(`${process.env.BACKEND_URL}/invoices/paginate?q=${query}&page=${currentPage}`, { headers });
        const resultFetchFilteredInvocies = await fetchFilteredInvocies.json();

        return resultFetchFilteredInvocies;
    } catch (error) {
        console.log("error :>> ", error);
        throw new Error("Failed to fetch resultFetchFilteredInvocies");
    }
}

//Search --> total pages

export const fetchInvoicesPages = async (query: string) => {
    try {
        const getInvoicesPages = await fetch(`${process.env.BACKEND_URL}/invoices/page-count?q=${query}`, { headers });
        const resultGetInvoicesPages = await getInvoicesPages.json();

        return resultGetInvoicesPages;
    } catch (error) {
        console.log("error :>> ", error);
        throw new Error("Failed to fetch resultGetInvoicesPages data");
    }
}

// Customers

export const fetchCutomers = async () => {
    try {
        const getCustomers = await fetch(`${process.env.BACKEND_URL}/customer`, { headers });
        const resultGetCustomers = await getCustomers.json();

        return resultGetCustomers;
    } catch (error) {
        console.log("error :>> ", error);
        throw new Error("Failed to fetch customers data");
    }
}

//Id bill

export const fetchInvoiceById = async (id:string) => {
    try {
        const getInvoiceById = await fetch(`${process.env.BACKEND_URL}/invoice/${id}`, { headers });

        if (getInvoiceById.status === 404) return null;
        if (getInvoiceById.status !== 200) return null;
        
        const resultInvoiceById = await getInvoiceById.json();

        return resultInvoiceById;
    } catch (error) {
        console.log("error :>> ", error);
        throw new Error("Failed to fetch resultInvoiceById data");
    }
}

console.log('data :>>', fetchInvoiceById)
