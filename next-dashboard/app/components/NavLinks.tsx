"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { FaHome, FaFileInvoice, FaUsers} from "react-icons/fa"
import { twMerge } from 'tailwind-merge'

const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: FaHome
    },
    {
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: FaFileInvoice
    },
    {
        name: "Customers",
        href: "/dashboard/customers",
        icon: FaUsers
    },
]

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <>
            {links.map (link => {
                const LinkIcon = link.icon

                return (
                    <Link 
                    key={link.name}
                    href={link.href}
                    className={twMerge ("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3", pathname === link.href && "bg-slate-600"
                    )}
                    >
                        <LinkIcon className="w-6"/>
                        <p className="hidden md:block">
                            {link.name}
                        </p>
                    </Link>
                )
            })}
        </>
    )
}

export default NavLinks