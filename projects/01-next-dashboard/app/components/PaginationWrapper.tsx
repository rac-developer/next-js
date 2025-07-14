'use client';
import { Pagination } from "anjrot-components";
import { usePathname, useSearchParams} from "next/navigation";
import { FC } from "react";
import Link from "next/link";

//Cambia el parametro de la url al numero de paginacion
const PaginationWrapper: FC<{totalpages: number}> = ({totalpages}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    //Valor de la pagina actual
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    return <Pagination totalPages={totalpages} currentPage={currentPage} createPageURL={createPageURL} AnchorElement={Link}/>
}

export default PaginationWrapper