'use client';
import { SearchInput } from "anjrot-components";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    //El useDebouncedCallback se encarga de evitar que se ejecute el callback siempre que cambia el valor de la entrada de búsqueda
    const handleOnChange = useDebouncedCallback(
        (value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set('query', value)
        } else {
            params.delete('query')
        };
        replace(`${pathname}?${params.toString()}`)
        }
        ,1000)
    return <SearchInput
    placeholder="Search..."
    onChange={(e) => handleOnChange(e.target.value)}
        />
    }

export default Search