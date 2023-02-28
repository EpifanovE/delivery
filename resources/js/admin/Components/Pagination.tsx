import * as React from "react";
import {FC} from "react";
import {Link} from "@inertiajs/react";
import {LinkData} from "../types/general";

type PaginationProps = {
    links: LinkData[]
}

const Pagination: FC<PaginationProps> = (props) => {

    const {links} = props;

    return (
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            {
                links.map((link, index) => {
                    if ((link.url && !link.active)) {
                        return <Link
                            key={index}
                            href={link.url}
                            disabled={link.active || !link.url}
                            className={`relative border-gray-300 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 h-[42px] flex items-center first:rounded-l-sm first:rounded-l-sm last:rounded-r-sm last:rounded-r-sm`}
                            dangerouslySetInnerHTML={{__html: link.label}}
                        />
                    }

                    return <span
                        key={index}
                        className={`relative h-[42px] first:rounded-l-sm first:rounded-l-sm last:rounded-r-sm last:rounded-r-sm border-gray-300 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20${link.active ? ' z-10 border-indigo-500 bg-indigo-50 text-indigo-600' : ''}`}
                        dangerouslySetInnerHTML={{__html: link.label}}
                    />
                })
            }
        </nav>
    )
}

export default Pagination;
