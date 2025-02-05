const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGVmNzAwMmYzNGFjMWVlY2UxNzc2ZCIsImVtYWlsIjoibmV4dFR1dG9yaWFsQHRlc3QuY29tIiwibmFtZSI6Im5leHRUdXRvcmlhbCIsImlhdCI6MTczODc2NDk2Mn0.-G1OEGIAy0mCerwM1YALCcQiGoYw5vVX5V2tMSIW64c"
}

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