import * as React from "react";
import {FC} from "react";
import {Link} from "@inertiajs/react";

type SidebarItemProps = {
    text: string
    href: string
    active?: boolean
    prepend?: React.ReactNode
    append?: React.ReactNode
}

export const SidebarItem: FC<SidebarItemProps> = (props) => {

    const {text, href, active, prepend, append} = props;

    return (
        <Link href={href} className={`text-gray-300 block px-6 h-16 border-b border-gray-700 flex items-center hover:bg-zinc-700 transition-colors${active ? ' bg-zinc-700 text-gray-100' : ''}`}>
            <>
                {
                    prepend && prepend
                }
                {text}
                {
                    append && append
                }
            </>
        </Link>
    )
}

export default SidebarItem;
