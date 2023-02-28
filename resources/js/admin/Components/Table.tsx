import * as React from "react";
import {FC} from "react";
import {HasChildren, HasClassName} from "../types/general";

type TableItem = {} & HasChildren & HasClassName

const Table: FC<TableItem> = ({children, className}) => {

    return (
        <table className={`border-collapse table-auto w-full${className ? ' ' + className : ''}`}>
            {children}
        </table>
    )
}

const Head: FC<TableItem> = ({children, className}) => {
    return (
        <thead className={`border-b border-slate-300 ${className}`}>
        {children}
        </thead>
    )
}

const Body: FC<TableItem> = ({children, className}) => {
    return (
        <tbody className={`bg-white dark:bg-slate-800${className ? ' ' + className : ''}`}>
        {children}
        </tbody>
    )
}

const Tr: FC<TableItem> = ({children, className}) => {
    return (
        <tr className={`table-row border-b border-slate-200 last:border-none dark:border-slate-700 ` + className}>
        {children}
        </tr>
    )
}

const Th: FC<TableItem> = ({children, className}) => {
    return (
        <th className={`dark:border-slate-600 font-medium p-4 text-slate-500 dark:text-slate-200 text-left${className ? ' ' + className : ''}`}>
            {children}
        </th>
    )
}

const Td: FC<TableItem> = ({children, className}) => {
    return (
        <td className={`p-4 text-slate-700 dark:text-slate-400${className ? ' ' + className : ''}`}>
            {children}
        </td>
    )
}

export {
    Head,
    Body,
    Tr,
    Th,
    Td,
}

export default Table
