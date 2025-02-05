import { bebas_neue } from "@/app/ui/fonts";
import CardWrapper from "@/app/components/CardWrapper";
import ChartWrapper from "@/app/components/ChartWrapper";
import LatestInvoicesWrapper from "../components/LatestInvoicesWrapper";

const Dashboard = () => {
    return (
        <main>
             <h1 
             className={`${bebas_neue.className} mb-4 text-xl md:text-2xl`}
             >
                Dashboard
            </h1>
             <CardWrapper/>
             <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <div className="w-full md:col-span-4">
                    <h2 className={`${bebas_neue.className} mb-4 text-xl md:text-2xl`}>
                        Recent revenues
                    </h2>
                    <ChartWrapper/>
                </div>
                <div className="w-full md:col-span-4">
                    <h2 className={`${bebas_neue.className} mb-4 text-xl md:text-2xl`}>
                        Invoices
                    <LatestInvoicesWrapper/>
                    </h2>
                </div>
             </div>
        </main>
    )
}

export default Dashboard