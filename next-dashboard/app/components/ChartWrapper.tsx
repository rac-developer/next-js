import { fetchRevenues } from "../helpers/api";
import { RevenueChart } from "anjrot-components";

const ChartWrapper = async () => {
    const revenue = await fetchRevenues();
    return <RevenueChart revenues={revenue} chartHeight={350} className="bg-slate-700"/>
};

export default ChartWrapper