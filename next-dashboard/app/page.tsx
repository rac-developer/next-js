
import Header from "@/app/components/header";
import { bebas_neue } from "@/app/ui/fonts";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
    return (
        <main className="flex min-h-screen flex-col">
            <Header/>

            <div className="mt-4 mx-auto flex grow flex-col gap-4 md:flex-row w-4/5">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <p className={`${bebas_neue.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        <strong> Welcome to r-AC </strong> Tutorial Next js
                    </p>
                    <a 
                    href="#"
                    className="flex - items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600 md:text-base"
                    >
                        <span>login</span> <BsArrowRight></BsArrowRight>
                    </a>
                </div>
                {/* Hero */}
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28">
                    {/* Desktop */}
                    <img src="/hero-desktop.png" alt="Screenshot of the dashboard" width={1000} height={700}  className="hidden md:block"/>
                    {/* Mobile */}
                    <img src="/hero-mobile.png" alt="Screenshot of the dashboard" width={560} height={620}  className="block md:hidden"/>
                </div>
            </div>

        </main>
    );
};

export default Home;