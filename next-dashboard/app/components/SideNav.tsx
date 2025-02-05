import Logo from "../components/logo"
import { FaPowerOff } from "react-icons/fa"
import NavLinks from "../components/NavLinks"
import Link from "next/link"

const SideNav = () => {
    return (
        <div className="h-full flex flex-col px-3 py-4 md:px-2">
            {/* Logo */}
            
                <Link href="#" className="mb-2 flex h-20 items-end justify-start bg-slate-900 p-4 md:h-40">
                    <div className="w-32 text-white md:w-40">
                        <Logo/>
                    </div>
                </Link>
            {/* Button */}
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                    <NavLinks/>
                    {/* Su altura se ajusta automáticamente según su contenido */}
                        <div className="hidden h-auto w-full grow md:block"></div>
                    {/* logout */}
                        <Link
                        href="/dashboard"
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-500 p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
                        >
                            <FaPowerOff className="w-6"/>
                            <p className="hidden md:block">
                                Logout
                            </p>
                        </Link>
                </div> 
        </div>
    )
}

export default SideNav